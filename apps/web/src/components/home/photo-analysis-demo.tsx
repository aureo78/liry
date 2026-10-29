import { useRef, useState } from 'react';
import { ImageUp, LoaderCircle, Sparkles } from 'lucide-react';

type Analysis = {
  mode: 'demo' | 'provider';
  playersDetected: number;
  ballDetected: boolean;
  possibleEvent: string;
  confidence: number;
  explanation: string;
  needsHumanReview: boolean;
};

export function PhotoAnalysisDemo() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function analyze(file: File) {
    setBusy(true);
    setError('');
    setPreview(URL.createObjectURL(file));
    setAnalysis(null);

    const form = new FormData();
    form.append('image', file);

    try {
      const response = await fetch('/api/analyze-image', { method: 'POST', body: form });
      const data = await response.json() as Analysis & { error?: string };
      if (!response.ok) throw new Error(data.error ?? 'Image analysis failed');
      setAnalysis(data);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Image analysis failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="photo-analysis-demo" aria-label="Photo analysis demo">
      <div className="photo-analysis-heading">
        <div>
          <span className="eyebrow">BACKEND DEMO</span>
          <h2><ImageUp size={17} /> Analyse a game photo</h2>
        </div>
        <span className="demo-mode"><Sparkles size={13} /> fallback ready</span>
      </div>
      <p>Upload a frame to test the backend. Until an AI key is configured, Liry returns a safe demo analysis.</p>
      <input ref={inputRef} hidden type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => {
        const file = event.target.files?.[0];
        if (file) void analyze(file);
      }} />
      <button className="photo-upload-button" onClick={() => inputRef.current?.click()} disabled={busy}>
        {busy ? <LoaderCircle className="spin" size={15} /> : <ImageUp size={15} />}
        {busy ? 'Analysing…' : 'Choose photo'}
      </button>
      {preview && <img className="photo-preview" src={preview} alt="Uploaded game frame" />}
      {error && <div className="photo-error">{error}</div>}
      {analysis && <div className="photo-result">
        <div className="photo-result-top"><strong>{analysis.possibleEvent}</strong><span>{analysis.confidence}% confidence</span></div>
        <p>{analysis.explanation}</p>
        <small>{analysis.playersDetected} players · ball {analysis.ballDetected ? 'detected' : 'not detected'} · {analysis.needsHumanReview ? 'referee review required' : 'automated result'}</small>
      </div>}
    </section>
  );
}
