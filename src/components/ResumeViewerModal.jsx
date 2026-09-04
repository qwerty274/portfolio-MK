import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Upload, 
  Printer, 
  FileText, 
  Check, 
  Sparkles, 
  Copy,
  RefreshCw,
  Sliders
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { parseResumeText } from '../data/profileData';

export default function ResumeViewerModal({ profile, onClose, onUpdateProfile }) {
  const [activeTab, setActiveTab] = useState('view'); // 'view' | 'import'
  const [inputText, setInputText] = useState(profile.resumeText || '');
  const [copied, setCopied] = useState(false);
  const [parseNotice, setParseNotice] = useState('');

  const handleCopy = () => {
    navigator.clipboard.writeText(profile.resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleImportSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const updated = parseResumeText(inputText);
    if (updated) {
      onUpdateProfile(updated);
      setParseNotice('Resume successfully imported! Dashboard profile updated live.');
      
      // Trigger festive confetti celebrate effect
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // ignore
      }

      setTimeout(() => {
        setParseNotice('');
        setActiveTab('view');
      }, 1500);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const text = evt.target.result;
        setInputText(text);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 70,
      background: 'rgba(0, 0, 0, 0.82)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }} onClick={onClose}>
      
      <div className="glass-panel" style={{
        maxWidth: '850px',
        width: '100%',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        padding: '0',
        overflow: 'hidden'
      }} onClick={e => e.stopPropagation()}>

        {/* Modal Header */}
        <div style={{
          padding: '1.25rem 1.75rem',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(17, 24, 39, 0.9)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <FileText size={20} color="var(--accent-cyan)" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--text-main)' }}>
              Interactive Resume Dashboard
            </h3>
          </div>

          {/* Modal Navigation Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(255,255,255,0.05)', padding: '0.2rem', borderRadius: '8px' }}>
            <button
              onClick={() => setActiveTab('view')}
              style={{
                background: activeTab === 'view' ? 'var(--accent-blue)' : 'transparent',
                color: activeTab === 'view' ? '#fff' : 'var(--text-muted)',
                border: 'none',
                padding: '0.35rem 0.85rem',
                borderRadius: '6px',
                fontSize: '0.8rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Document View
            </button>
            <button
              onClick={() => setActiveTab('import')}
              style={{
                background: activeTab === 'import' ? 'var(--accent-purple)' : 'transparent',
                color: activeTab === 'import' ? '#fff' : 'var(--text-muted)',
                border: 'none',
                padding: '0.35rem 0.85rem',
                borderRadius: '6px',
                fontSize: '0.8rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              <Upload size={13} /> Import Resume
            </button>
          </div>

          <button 
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '0.35rem'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.75rem', overflowY: 'auto', flexGrow: 1 }}>
          {activeTab === 'view' ? (
            <div>
              {/* Toolbar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                <span className="badge badge-emerald">
                  <Sparkles size={12} /> Formatted Resume Version
                </span>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={handleCopy} className="btn btn-secondary" style={{ fontSize: '0.78rem', padding: '0.4rem 0.75rem' }}>
                    {copied ? <Check size={14} color="#34d399" /> : <Copy size={14} />}
                    {copied ? 'Copied!' : 'Copy Text'}
                  </button>
                  <button onClick={handlePrint} className="btn btn-secondary" style={{ fontSize: '0.78rem', padding: '0.4rem 0.75rem' }}>
                    <Printer size={14} /> Print / Export PDF
                  </button>
                </div>
              </div>

              {/* Formatted Paper View */}
              <div style={{
                background: '#0d131f',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '2rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                lineHeight: '1.7',
                color: '#d1d5db',
                whiteSpace: 'pre-wrap'
              }}>
                {profile.resumeText}
              </div>
            </div>
          ) : (
            <div>
              <div style={{ marginBottom: '1.25rem' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.35rem' }}>
                  Import Your Own Resume Data
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Paste raw resume text or text file below to auto-populate contact details, skills, and summary directly onto this live dashboard profile.
                </p>
              </div>

              {parseNotice && (
                <div style={{
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid rgba(16, 185, 129, 0.4)',
                  color: '#34d399',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <Check size={16} /> {parseNotice}
                </div>
              )}

              <form onSubmit={handleImportSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-main)' }}>
                      Resume Plain Text / Markdown
                    </label>
                    <label style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Upload size={12} /> Load from File (.txt/.md)
                      <input type="file" accept=".txt,.md,.text" onChange={handleFileUpload} style={{ display: 'none' }} />
                    </label>
                  </div>
                  <textarea
                    rows={12}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Paste your resume contents here (Name, email, summary, work history, skills)..."
                    style={{
                      width: '100%',
                      background: 'rgba(0, 0, 0, 0.4)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '8px',
                      padding: '1rem',
                      color: 'var(--text-main)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.85rem',
                      resize: 'vertical',
                      outline: 'none'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                  <button type="button" onClick={() => setInputText(profile.resumeText)} className="btn btn-secondary">
                    <RefreshCw size={14} /> Reset Default
                  </button>
                  <button type="submit" className="btn btn-primary">
                    <Sparkles size={14} /> Parse & Apply to Dashboard
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
