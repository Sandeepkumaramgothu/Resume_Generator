import { useState } from 'react';
import { Layout } from './components/Layout';
import { ApiKeyModal } from './components/ApiKeyModal';
import { InputPanel, type ProviderType, MODELS } from './components/InputPanel';
import { OutputPanel } from './components/OutputPanel';
import { generateResume } from './services/api';
import { getStoredKeys } from './lib/storage';
import { AlertCircle } from 'lucide-react';

function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // State for inputs
  const [masterResume, setMasterResume] = useState('');
  const [jobDescription, setJobDescription] = useState('');

  // New state for Provider + Model
  const [provider, setProvider] = useState<ProviderType>('gemini');
  // Default to the first model of the default provider
  const [modelId, setModelId] = useState<string>(MODELS.gemini[0].id);

  // State for output
  const [generatedCode, setGeneratedCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setError(null);
    setIsGenerating(true);

    try {
      const keys = getStoredKeys();
      if ((provider === 'gemini' && !keys.geminiKey) || (provider === 'perplexity' && !keys.perplexityKey)) {
        setIsSettingsOpen(true);
        throw new Error(`Please configure your ${provider === 'gemini' ? 'Gemini' : 'Perplexity'} API Key in settings.`);
      }

      // Pass both provider and specific modelId
      const result = await generateResume(masterResume, jobDescription, provider, modelId, keys);
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
            provider={provider}
            setProvider={setProvider}
            modelId={modelId}
            setModelId={setModelId}
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
