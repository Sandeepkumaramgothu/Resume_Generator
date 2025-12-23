import { useState, useEffect } from 'react';
import { X, Key, Save, ShieldCheck } from 'lucide-react';
import { getStoredKeys, storeKeys, type ApiKeys } from '../lib/storage';

interface ApiKeyModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ApiKeyModal({ isOpen, onClose }: ApiKeyModalProps) {
    const [keys, setKeys] = useState<ApiKeys>({ geminiKey: '', perplexityKey: '' });

    useEffect(() => {
        if (isOpen) {
            setKeys(getStoredKeys());
        }
    }, [isOpen]);

    const handleSave = () => {
        storeKeys(keys);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-800/50">
                    <div className="flex items-center gap-2 text-white">
                        <ShieldCheck className="w-5 h-5 text-green-400" />
                        <h2 className="font-semibold">API Configuration</h2>
                    </div>
                    <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded-md hover:bg-slate-700">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    <p className="text-sm text-slate-400">
                        Your API keys are stored locally in your browser and never sent to our servers.
                    </p>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                                <Key className="w-4 h-4 text-blue-400" />
                                Gemini API Key
                            </label>
                            <input
                                type="password"
                                value={keys.geminiKey}
                                onChange={(e) => setKeys(prev => ({ ...prev, geminiKey: e.target.value }))}
                                placeholder="AIzaSy..."
                                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                                <Key className="w-4 h-4 text-purple-400" />
                                Perplexity API Key (Sonar)
                            </label>
                            <input
                                type="password"
                                value={keys.perplexityKey}
                                onChange={(e) => setKeys(prev => ({ ...prev, perplexityKey: e.target.value }))}
                                placeholder="pplx-..."
                                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-600 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleSave}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-900/20"
                    >
                        <Save className="w-4 h-4" />
                        Save Configuration
                    </button>
                </div>
            </div>
        </div>
    );
}
