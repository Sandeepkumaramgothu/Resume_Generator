import { useState } from 'react';
import { Copy, Check, FileCode, MonitorPlay, GitCompare } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { DiffViewer } from './DiffViewer';

interface OutputPanelProps {
    generatedCode: string;
    originalCode: string;
}

export function OutputPanel({ generatedCode, originalCode }: OutputPanelProps) {
    const [copied, setCopied] = useState(false);
    const [activeTab, setActiveTab] = useState<'code' | 'diff' | 'preview'>('code');

    const handleCopy = async () => {
        if (!generatedCode) return;
        await navigator.clipboard.writeText(generatedCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!generatedCode) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 bg-slate-900/30 rounded-xl border-2 border-dashed border-slate-800 p-8">
                <FileCode className="w-16 h-16 opacity-20 mb-4" />
                <p className="text-lg font-medium">Ready to Generate</p>
                <p className="text-sm text-center max-w-xs mt-2 opacity-60">
                    Paste your Master Resume and Job Description on the left, then click Generate.
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-4 py-3 bg-slate-800/50 border-b border-slate-800">
                <div className="flex items-center gap-2">
                    <div className="flex p-1 bg-slate-950 rounded-lg border border-slate-800">
                        <button
                            onClick={() => setActiveTab('code')}
                            className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-2 transition-all ${activeTab === 'code' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                                }`}
                        >
                            <FileCode className="w-3.5 h-3.5" />
                            LaTeX Code
                        </button>
                        <button
                            onClick={() => setActiveTab('diff')}
                            className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-2 transition-all ${activeTab === 'diff' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                                }`}
                        >
                            <GitCompare className="w-3.5 h-3.5" />
                            Diff View
                        </button>
                        <button
                            onClick={() => setActiveTab('preview')}
                            className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-2 transition-all ${activeTab === 'preview' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                                }`}
                        >
                            <MonitorPlay className="w-3.5 h-3.5" />
                            Preview (Experimental)
                        </button>
                    </div>
                </div>

                <button
                    onClick={handleCopy}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${copied
                            ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                            : 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20'
                        }`}
                >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copied!' : 'Copy Code'}
                </button>
            </div>

            <div className="flex-1 overflow-hidden relative">
                {activeTab === 'code' && (
                    <div className="absolute inset-0 overflow-auto custom-scrollbar">
                        <SyntaxHighlighter
                            language="latex"
                            style={vscDarkPlus}
                            customStyle={{
                                margin: 0,
                                padding: '1.5rem',
                                fontSize: '0.9rem',
                                fontFamily: 'JetBrains Mono, monospace',
                                background: 'transparent',
                            }}
                            showLineNumbers={true}
                            wrapLines={true}
                        >
                            {generatedCode}
                        </SyntaxHighlighter>
                    </div>
                )}

                {activeTab === 'diff' && (
                    <div className="absolute inset-0 overflow-auto custom-scrollbar bg-slate-900">
                        <DiffViewer oldText={originalCode} newText={generatedCode} />
                    </div>
                )}

                {activeTab === 'preview' && (
                    <div className="h-full flex flex-col items-center justify-center p-8 text-center text-slate-400">
                        <MonitorPlay className="w-12 h-12 mb-4 text-slate-600" />
                        <h3 className="text-lg font-medium text-slate-200 mb-2">PDF Preview Unavailable</h3>
                        <p className="max-w-md text-sm leading-relaxed mb-6">
                            Client-side LaTeX compilation requires heavy WebAssembly libraries (e.g. SwiftLaTeX) which are currently not integrated.
                        </p>
                        <p className="text-sm bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-700 font-mono text-blue-300">
                            Please copy the code and paste it into Overleaf.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
