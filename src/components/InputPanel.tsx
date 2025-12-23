import { FileText, Briefcase, Zap, Loader2, ChevronDown, FileUser } from 'lucide-react';
import type { DocumentType } from '../services/api';

export type ProviderType = 'gemini' | 'perplexity';

export const MODELS = {
    gemini: [
        { id: 'gemini-2.0-flash-exp', name: 'Gemini 2.0 Flash Exp (Latest)' },
        { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro (Reasoning)' },
        { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash (Fast)' },
    ],
    perplexity: [
        { id: 'sonar-pro', name: 'Sonar Pro (Best)' },
        { id: 'sonar-reasoning', name: 'Sonar Reasoning' },
        { id: 'sonar', name: 'Sonar (Fast)' },
    ]
};

interface InputPanelProps {
    // Resume State
    masterResume: string;
    setMasterResume: (val: string) => void;
    // Cover Letter State
    masterCoverLetter: string;
    setMasterCoverLetter: (val: string) => void;
    // Shared State
    jobDescription: string;
    setJobDescription: (val: string) => void;
    docType: DocumentType;
    setDocType: (val: DocumentType) => void;

    provider: ProviderType;
    setProvider: (val: ProviderType) => void;
    modelId: string;
    setModelId: (val: string) => void;
    onGenerate: () => void;
    isGenerating: boolean;
}

export function InputPanel({
    masterResume,
    setMasterResume,
    masterCoverLetter,
    setMasterCoverLetter,
    jobDescription,
    setJobDescription,
    docType,
    setDocType,
    provider,
    setProvider,
    modelId,
    setModelId,
    onGenerate,
    isGenerating
}: InputPanelProps) {

    const handleProviderChange = (newProvider: ProviderType) => {
        setProvider(newProvider);
        setModelId(MODELS[newProvider][0].id);
    };

    const currentContent = docType === 'resume' ? masterResume : masterCoverLetter;
    const setContent = docType === 'resume' ? setMasterResume : setMasterCoverLetter;

    return (
        <div className="flex flex-col h-full gap-5">
            {/* Top Toggle: Resume vs Cover Letter */}
            <div className="bg-slate-900 p-1 rounded-lg border border-slate-800 flex">
                <button
                    onClick={() => setDocType('resume')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium flex items-center justify-center gap-2 transition-all ${docType === 'resume'
                            ? 'bg-slate-800 text-white shadow-sm'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                >
                    <FileUser className="w-4 h-4" />
                    Resume
                </button>
                <button
                    onClick={() => setDocType('cover_letter')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium flex items-center justify-center gap-2 transition-all ${docType === 'cover_letter'
                            ? 'bg-slate-800 text-white shadow-sm'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                >
                    <FileText className="w-4 h-4" />
                    Cover Letter
                </button>
            </div>

            <div className="flex-1 min-h-[300px] flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                    {docType === 'resume' ? (
                        <><FileUser className="w-4 h-4 text-blue-400" /> Master LaTeX Resume</>
                    ) : (
                        <><FileText className="w-4 h-4 text-purple-400" /> Master LaTeX Cover Letter</>
                    )}
                </label>
                <textarea
                    value={currentContent}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder={docType === 'resume'
                        ? "Paste your Master Resume LaTeX code here..."
                        : "Paste your Master Cover Letter LaTeX code here..."}
                    className="flex-1 w-full bg-slate-900/50 border border-slate-700/50 rounded-lg p-4 text-sm font-mono text-slate-300 placeholder-slate-600 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none resize-none transition-all"
                />
            </div>

            <div className="flex-1 min-h-[250px] flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-green-400" />
                    Job Description
                </label>
                <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste the Job Description here..."
                    className="flex-1 w-full bg-slate-900/50 border border-slate-700/50 rounded-lg p-4 text-sm text-slate-300 placeholder-slate-600 focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 outline-none resize-none transition-all"
                />
            </div>

            <div className="flex items-center gap-4 bg-slate-900 p-4 rounded-xl border border-slate-800">
                <div className="flex-1 flex flex-col gap-3">
                    <div className="flex gap-2">
                        <button
                            onClick={() => handleProviderChange('gemini')}
                            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${provider === 'gemini'
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                                }`}
                        >
                            Gemini
                        </button>
                        <button
                            onClick={() => handleProviderChange('perplexity')}
                            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${provider === 'perplexity'
                                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/20'
                                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                                }`}
                        >
                            Perplexity
                        </button>
                    </div>

                    <div className="relative">
                        <select
                            value={modelId}
                            onChange={(e) => setModelId(e.target.value)}
                            className="w-full appearance-none bg-slate-950 border border-slate-700 text-slate-300 text-sm rounded-lg px-4 py-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                        >
                            {MODELS[provider].map((m) => (
                                <option key={m.id} value={m.id}>
                                    {m.name}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                </div>

                <button
                    onClick={onGenerate}
                    disabled={isGenerating || !currentContent || !jobDescription}
                    className="flex-1 h-[100px] bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-900/20 active:scale-[0.98]"
                >
                    {isGenerating ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Building {docType === 'resume' ? 'Resume' : 'Cover Letter'}...
                        </>
                    ) : (
                        <>
                            <Zap className="w-5 h-5 fill-current" />
                            Generate
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
