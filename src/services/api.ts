import { GoogleGenerativeAI } from '@google/generative-ai';
import type { ProviderType } from '../components/InputPanel';

export type DocumentType = 'resume' | 'cover_letter';

const SYSTEM_PROMPT_RESUME = `You are a resume expert. Update the provided LaTeX code to tailor the experience bullet points to match the keywords in the Job Description. Do NOT change the LaTeX structure, preamble, or formatting. Only change the content text. Return ONLY the raw LaTeX code.`;

const SYSTEM_PROMPT_COVER_LETTER = `You are an expert career coach and copywriter. Update the provided LaTeX Cover Letter to specifically address the Job Description. 
1. rewriting the body paragraphs to connect the candidate's skills (implied from the JD) to the requirements.
2. Keep the tone professional but persuasive.
3. CRITICAL: Do NOT change the LaTeX structure, header, footer, or formatting commands. Only change the body text content.
4. Return ONLY the raw LaTeX code.`;

export async function generateDocument(
    originalContent: string,
    jobDescription: string,
    provider: ProviderType,
    modelId: string,
    docType: DocumentType,
    apiKeys: { geminiKey: string; perplexityKey: string }
): Promise<string> {
    const prompt = `
    MASTER ${docType === 'resume' ? 'RESUME' : 'COVER LETTER'} (LaTeX):
    ${originalContent}

    JOB DESCRIPTION:
    ${jobDescription}
  `;

    const systemPrompt = docType === 'resume' ? SYSTEM_PROMPT_RESUME : SYSTEM_PROMPT_COVER_LETTER;

    if (provider === 'gemini') {
        if (!apiKeys.geminiKey) throw new Error('Gemini API Key is missing');

        const genAI = new GoogleGenerativeAI(apiKeys.geminiKey);
        const modelInstance = genAI.getGenerativeModel({ model: modelId });

        const result = await modelInstance.generateContent([systemPrompt, prompt]);
        const response = await result.response;
        const text = response.text();

        return cleanResponse(text);
    }

    if (provider === 'perplexity') {
        if (!apiKeys.perplexityKey) throw new Error('Perplexity API Key is missing');

        const options = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKeys.perplexityKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: modelId,
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: prompt }
                ],
                temperature: 0.2, // Slightly higher for cover letters? Keep strict for LaTeX safety.
            })
        };

        const response = await fetch('https://api.perplexity.ai/chat/completions', options);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`Perplexity API Error: ${response.status} ${errorData.error || ''}`);
        }

        const data = await response.json();
        return cleanResponse(data.choices[0].message.content);
    }

    throw new Error('Invalid provider selected');
}

function cleanResponse(text: string): string {
    // Remove markdown code blocks ```latex ... ``` or ``` ... ```
    let cleaned = text.replace(/```latex/gi, '').replace(/```/g, '');
    return cleaned.trim();
}
