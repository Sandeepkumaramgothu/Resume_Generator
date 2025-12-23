import { useState } from 'react';
import { Save, CheckCircle, AlertTriangle } from 'lucide-react';

export function JobTrackerForm() {
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);

        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData as any).toString(),
        })
            .then(() => {
                setStatus('success');
                form.reset();
                setTimeout(() => setStatus('idle'), 3000);
            })
            .catch((error) => {
                console.error('Form error:', error);
                setStatus('error');
            });
    };

    return (
        <div className="w-full max-w-4xl mx-auto mt-12 mb-8 p-6 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl">
            <div className="mb-6 border-b border-slate-800 pb-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Save className="w-5 h-5 text-purple-400" />
                    Job Application Tracker
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                    Save details of this application directly to your Netlify dashboard.
                </p>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 mb-6 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                <div className="text-sm text-yellow-200/80">
                    <strong className="text-yellow-400 block mb-1">Security Warning</strong>
                    Credentials saved here are stored in <strong>plain text</strong> in your Netlify Forms dashboard.
                    Do not store highly sensitive banking or personal passwords here. Use at your own risk.
                </div>
            </div>

            <form
                name="job-tracker"
                method="POST"
                data-netlify="true"
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
                <input type="hidden" name="form-name" value="job-tracker" />

                <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-400">Company Name</label>
                    <input
                        type="text"
                        name="company"
                        required
                        placeholder="e.g. Google"
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 text-sm focus:ring-2 focus:ring-purple-500/50 outline-none"
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-400">Position</label>
                    <input
                        type="text"
                        name="position"
                        required
                        placeholder="e.g. Senior Software Engineer"
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 text-sm focus:ring-2 focus:ring-purple-500/50 outline-none"
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-400">Application Portal URL</label>
                    <input
                        type="url"
                        name="portal_url"
                        placeholder="https://..."
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 text-sm focus:ring-2 focus:ring-purple-500/50 outline-none"
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-400">Status</label>
                    <select
                        name="status"
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 text-sm focus:ring-2 focus:ring-purple-500/50 outline-none appearance-none"
                    >
                        <option value="Applied">Applied</option>
                        <option value="Interviewing">Interviewing</option>
                        <option value="Offer">Offer</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-400">Username / Email</label>
                    <input
                        type="text"
                        name="username"
                        placeholder="user@example.com"
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 text-sm focus:ring-2 focus:ring-purple-500/50 outline-none"
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-400">Password (Visible in Dashboard)</label>
                    <input
                        type="text"
                        name="password"
                        placeholder="password123"
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 text-sm focus:ring-2 focus:ring-purple-500/50 outline-none"
                    />
                </div>

                <div className="space-y-1 md:col-span-2">
                    <label className="text-xs font-medium text-slate-400">Notes</label>
                    <textarea
                        name="notes"
                        rows={3}
                        placeholder="Any additional notes..."
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 text-sm focus:ring-2 focus:ring-purple-500/50 outline-none resize-none"
                    />
                </div>

                <div className="md:col-span-2 mt-2">
                    <button
                        type="submit"
                        disabled={status === 'success'}
                        className={`w-full py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${status === 'success'
                                ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                                : 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/20'
                            }`}
                    >
                        {status === 'success' ? (
                            <>
                                <CheckCircle className="w-4 h-4" />
                                Saved to Netlify!
                            </>
                        ) : (
                            'Save Application Details'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
