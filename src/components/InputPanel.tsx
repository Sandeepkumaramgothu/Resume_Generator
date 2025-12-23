import { FileText, Briefcase, Zap, Loader2 } from 'lucide-react';

export type ModelType = 'gemini' | 'perplexity';

interface InputPanelProps {
    masterResume: string;
    setMasterResume: (val: string) => void;
    jobDescription: string;
    setJobDescription: (val: string) => void;
    model: ModelType;
    setModel: (val: ModelType) => void;
    onGenerate: () => void;
    isGenerating: boolean;
}

export function InputPanel({
    masterResume,
    setMasterResume,
    jobDescription,
    setJobDescription,
    model,
    setModel,
    onGenerate,
    isGenerating
}: InputPanelProps) {
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
                <div className="flex-1">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">
                        AI Model
                    </label>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setModel('gemini')}
                            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${model === 'gemini'
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                                }`}
                        >
                            Gemini Pro
                        </button>
                        <button
                            onClick={() => setModel('perplexity')}
                            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${model === 'perplexity'
                                ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/20'
                                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                                }`}
                        >
                            Perplexity
                        </button>
                    </div>
                </div>

                <button
                    onClick={onGenerate}
                    disabled={isGenerating || !masterResume || !jobDescription}
                    className="flex-1 h-[68px] bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-900/20 active:scale-[0.98]"
                >
                    {isGenerating ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Building Resume...
                        </>
                    ) : (
                        <>
                            <Zap className="w-5 h-5 fill-current" />
                            Generate Tailored Resume
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
