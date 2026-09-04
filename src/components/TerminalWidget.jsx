import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft } from 'lucide-react';

export default function TerminalWidget({ profile, isOpen, onClose, onOpenResume, onOpenContact, theme, setTheme }) {
  const [history, setHistory] = useState([
    { type: 'system', text: 'DevPortfolio OS v2.5.0 [Type "help" for a list of available commands]' },
    { type: 'system', text: `Welcome! Profile loaded: ${profile.name} (${profile.title})` }
  ]);
  const [inputVal, setInputVal] = useState('');
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...history, { type: 'user', text: `$ ${inputVal}` }];

    switch (cmd) {
      case 'help':
        newHistory.push({
          type: 'response',
          text: `Available CLI Commands:
  • help        - Display this menu
  • bio         - Print profile background summary
  • skills      - Output technical skill stack
  • projects    - List featured repositories & apps
  • experience  - Display work history timeline
  • resume      - Open interactive Resume viewer
  • contact     - Display contact info & social links
  • theme       - Cycle dashboard visual theme
  • sudo hire   - Run priority recruitment trigger
  • clear       - Clear terminal buffer`
        });
        break;

      case 'bio':
        newHistory.push({ type: 'response', text: `${profile.name} | ${profile.title}\nLocation: ${profile.location}\n\n${profile.bio}` });
        break;

      case 'skills':
        const skillList = profile.skills.map(s => `  - ${s.name.padEnd(25)} [${s.level}%] (${s.category})`).join('\n');
        newHistory.push({ type: 'response', text: `Technical Skills Matrix:\n${skillList}` });
        break;

      case 'projects':
        const projList = profile.projects.map(p => `  • ${p.title} (${p.category}) - ★ ${p.stars}\n    ${p.description}`).join('\n\n');
        newHistory.push({ type: 'response', text: `Featured Projects:\n${projList}` });
        break;

      case 'experience':
        const expList = profile.experience.map(e => `  • ${e.role} @ ${e.company} (${e.period})\n    ${e.description}`).join('\n\n');
        newHistory.push({ type: 'response', text: `Career Highlights:\n${expList}` });
        break;

      case 'resume':
        onOpenResume();
        newHistory.push({ type: 'response', text: 'Opening Resume Viewer Modal...' });
        break;

      case 'contact':
        newHistory.push({
          type: 'response',
          text: `Contact Coordinates:
  • Email:    ${profile.email}
  • GitHub:   ${profile.github}
  • LinkedIn: ${profile.linkedin}
  • Website:  ${profile.website}`
        });
        break;

      case 'theme':
        if (theme === 'dark') setTheme('cyberpunk');
        else if (theme === 'cyberpunk') setTheme('emerald');
        else setTheme('dark');
        newHistory.push({ type: 'response', text: `Theme updated to: ${theme}` });
        break;

      case 'sudo hire':
        newHistory.push({
          type: 'response',
          text: `⚡ [ACCESS GRANTED] Priority Candidate Protocol Activated!
Thank you for your interest! Please proceed to the Contact modal or send an email directly to ${profile.email}.`
        });
        onOpenContact();
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        newHistory.push({ type: 'error', text: `Command not found: "${cmd}". Type "help" for command list.` });
        break;
    }

    setHistory(newHistory);
    setInputVal('');
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 80,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }} onClick={onClose}>
      
      <div style={{
        maxWidth: '750px',
        width: '100%',
        height: '480px',
        background: '#090d16',
        border: '1px solid rgba(56, 189, 248, 0.3)',
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(6, 182, 212, 0.2)',
        overflow: 'hidden'
      }} onClick={e => e.stopPropagation()}>
        
        {/* Terminal Header Bar */}
        <div style={{
          background: '#111827',
          padding: '0.75rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }}></span>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b' }}></span>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981' }}></span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginLeft: '0.5rem' }}>
              dev@portfolio-cli: ~
            </span>
          </div>

          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={18} />
          </button>
        </div>

        {/* Output Area */}
        <div style={{
          flexGrow: 1,
          padding: '1.25rem',
          overflowY: 'auto',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.825rem',
          lineHeight: '1.6',
          color: '#38bdf8'
        }}>
          {history.map((item, idx) => (
            <div key={idx} style={{
              marginBottom: '0.6rem',
              color: item.type === 'user' ? '#f3f4f6' : item.type === 'error' ? '#f43f5e' : item.type === 'system' ? '#a855f7' : '#34d399',
              whiteSpace: 'pre-wrap'
            }}>
              {item.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input Prompt Form */}
        <form onSubmit={handleCommandSubmit} style={{
          padding: '0.75rem 1.25rem',
          background: '#0d131f',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <span style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', fontWeight: '700' }}>
            visitor@dev-cli:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type 'help', 'bio', 'projects', 'resume'..."
            style={{
              flexGrow: 1,
              background: 'transparent',
              border: 'none',
              color: '#ffffff',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              outline: 'none'
            }}
          />
          <button type="submit" style={{ background: 'transparent', border: 'none', color: 'var(--accent-cyan)', cursor: 'pointer' }}>
            <CornerDownLeft size={16} />
          </button>
        </form>

      </div>
    </div>
  );
}
