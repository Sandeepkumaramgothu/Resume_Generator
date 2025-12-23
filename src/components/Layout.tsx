import type { ReactNode } from 'react';
import { Settings, FileText } from 'lucide-react';

interface LayoutProps {
    children: ReactNode;
    onOpenSettings: () => void;
}

export function Layout({ children, onOpenSettings }: LayoutProps) {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-500/30">
            <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md px-6 py-4 sticky top-0 z-50">
                <div className="mx-auto max-w-[1600px] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500/10 rounded-lg">
                            <FileText className="w-6 h-6 text-blue-500" />
                        </div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                            Auto-Resume Architect
                        </h1>
                    </div>
                    <button
                        onClick={onOpenSettings}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all duration-200 border border-transparent hover:border-slate-700"
                    >
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                    </button>
                </div>
            </header>
            <main className="flex-1 mx-auto w-full max-w-[1600px] p-6">
                {children}
            </main>
        </div>
    );
}
