import { useState } from 'react';
import { Layout } from './components/Layout';
import { ApiKeyModal } from './components/ApiKeyModal';
import { InputPanel, type ModelType } from './components/InputPanel';
import { OutputPanel } from './components/OutputPanel';
import { generateResume } from './services/api';
import { getStoredKeys } from './lib/storage';
import { AlertCircle } from 'lucide-react';

function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // State for inputs
  const [masterResume, setMasterResume] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [model, setModel] = useState<ModelType>('gemini');

  // State for output
  const [generatedCode, setGeneratedCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setError(null);
    setIsGenerating(true);

    try {
      const keys = getStoredKeys();
      if ((model === 'gemini' && !keys.geminiKey) || (model === 'perplexity' && !keys.perplexityKey)) {
        setIsSettingsOpen(true);
        throw new Error(`Please configure your ${model === 'gemini' ? 'Gemini' : 'Perplexity'} API Key in settings.`);
      }

      const result = await generateResume(masterResume, jobDescription, model, keys);
      setGeneratedCode(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Layout onOpenSettings={() => setIsSettingsOpen(true)}>
      <ApiKeyModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400 animate-in fade-in slide-in-from-top-2">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-140px)] min-h-[600px]">
        {/* Left Panel: Inputs */}
        <section className="bg-slate-900/50 rounded-xl border border-slate-800/50 p-6 flex flex-col h-full overflow-hidden shadow-xl">
          <InputPanel
            masterResume={masterResume}
            setMasterResume={setMasterResume}
            jobDescription={jobDescription}
            setJobDescription={setJobDescription}
            model={model}
            setModel={setModel}
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
          />
        </section>

        {/* Right Panel: Output */}
        <section className="h-full flex flex-col overflow-hidden">
          <OutputPanel generatedCode={generatedCode} originalCode={masterResume} />
        </section>
      </div>
    </Layout>
  );
}

export default App;
