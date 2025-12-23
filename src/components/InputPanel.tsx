import { FileText, Briefcase, Zap, Loader2, ChevronDown } from 'lucide-react';

export type ProviderType = 'gemini' | 'perplexity';

export const MODELS = {
    gemini: [
        { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash (Fast)' },
        { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro (Reasoning)' },
        { id: 'gemini-2.0-flash-exp', name: 'Gemini 2.0 Flash Exp (New)' },
    ],
    perplexity: [
        { id: 'sonar-pro', name: 'Sonar Pro (Best)' },
        { id: 'sonar', name: 'Sonar (Fast)' },
        { id: 'sonar-reasoning', name: 'Sonar Reasoning' }
    ]
};

interface InputPanelProps {
    masterResume: string;
    setMasterResume: (val: string) => void;
    jobDescription: string;
    setJobDescription: (val: string) => void;
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
    jobDescription,
    setJobDescription,
    provider,
    setProvider,
    modelId,
    setModelId,
    onGenerate,
    isGenerating
}: InputPanelProps) {

    const handleProviderChange = (newProvider: ProviderType) => {
        setProvider(newProvider);
        // Default to the first model of the new provider
        setModelId(MODELS[newProvider][0].id);
    };

    return (
        <div className="flex flex-col h-full gap-6">
            <div className="flex-1 min-h-[300px] flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-400" />
                    Master LaTeX Resume
                </label>
                <textarea
                    value={masterResume}
                    onChange={(e) => setMasterResume(e.target.value)}
                    placeholder="Paste your Master Overleaf/LaTeX code here..."
                    className="flex-1 w-full bg-slate-900/50 border border-slate-700/50 rounded-lg p-4 text-sm font-mono text-slate-300 placeholder-slate-600 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none resize-none transition-all"
                />
            </div>

            <div className="flex-1 min-h-[300px] flex flex-col gap-2">
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
                    {/* Provider Selection */}
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

                    {/* Sub-Model Selection */}
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
                    disabled={isGenerating || !masterResume || !jobDescription}
                    className="flex-1 h-[100px] bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-900/20 active:scale-[0.98]"
                >
                    {isGenerating ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Building...
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
