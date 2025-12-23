import { GoogleGenerativeAI } from '@google/generative-ai';
import type { ProviderType } from '../components/InputPanel';

const SYSTEM_PROMPT = `You are a resume expert. Update the provided LaTeX code to tailor the experience bullet points to match the keywords in the Job Description. Do NOT change the LaTeX structure, preamble, or formatting. Only change the content text. Return ONLY the raw LaTeX code.`;

export async function generateResume(
    originalResume: string,
    jobDescription: string,
    provider: ProviderType,
    modelId: string,
    apiKeys: { geminiKey: string; perplexityKey: string }
): Promise<string> {
    const prompt = `
    MASTER RESUME (LaTeX):
    ${originalResume}

    JOB DESCRIPTION:
    ${jobDescription}
  `;

    if (provider === 'gemini') {
        if (!apiKeys.geminiKey) throw new Error('Gemini API Key is missing');

        const genAI = new GoogleGenerativeAI(apiKeys.geminiKey);
        // Use the specific modelId selected by the user
        const modelInstance = genAI.getGenerativeModel({ model: modelId });

        const result = await modelInstance.generateContent([SYSTEM_PROMPT, prompt]);
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
                model: modelId, // Use the specific modelId (e.g. sonar-pro, sonar-reasoning)
                messages: [
                    { role: "system", content: SYSTEM_PROMPT },
                    { role: "user", content: prompt }
                ],
                temperature: 0.2,
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
