import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  FileText, 
  Moon, 
  Sun, 
  Sparkles, 
  Clock, 
  MapPin, 
  CircleDot,
  Send,
  Code2
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export default function Header({ profile, onOpenTerminal, onOpenResume, onOpenContact, theme, setTheme }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const cycleTheme = () => {
    if (theme === 'dark') setTheme('cyberpunk');
    else if (theme === 'cyberpunk') setTheme('emerald');
    else setTheme('dark');
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 40,
      background: 'rgba(9, 13, 22, 0.85)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '0.85rem 1.5rem',
      marginBottom: '2rem'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        {/* Brand & Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '800',
            fontSize: '1.25rem',
            color: '#fff',
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)'
          }}>
            {profile.name.charAt(0)}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h1 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-main)' }}>
                {profile.name}
              </h1>
              <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>
                <CircleDot size={10} style={{ animation: 'pulse-slow 2s infinite' }} />
                Open to Work
              </span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <MapPin size={12} /> {profile.location}
            </p>
          </div>
        </div>

        {/* Live Clock & Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '0.4rem 0.8rem',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)'
          }}>
            <Clock size={13} color="var(--accent-cyan)" />
            <span>{time || '12:00 PM'} {profile.timezone.split(' ')[0]}</span>
          </div>

          {/* Social icons */}
          <div style={{ display: 'flex', gap: '0.35rem' }}>
            <a href={profile.github} target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ padding: '0.45rem 0.65rem' }} title="GitHub Profile">
              <GithubIcon size={16} />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ padding: '0.45rem 0.65rem' }} title="LinkedIn Profile">
              <LinkedinIcon size={16} />
            </a>
            {profile.leetcode && (
              <a href={profile.leetcode} target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ padding: '0.45rem 0.65rem' }} title="LeetCode Profile">
                <Code2 size={16} color="#f59e0b" />
              </a>
            )}
          </div>

          <button onClick={onOpenTerminal} className="btn btn-secondary" title="Open Interactive CLI Terminal" style={{ fontSize: '0.8rem' }}>
            <Terminal size={15} color="var(--accent-cyan)" />
            <span>CLI Terminal</span>
          </button>

          <button onClick={onOpenResume} className="btn btn-outline" style={{ fontSize: '0.8rem' }}>
            <FileText size={15} />
            <span>Resume</span>
          </button>

          <button onClick={onOpenContact} className="btn btn-primary" style={{ fontSize: '0.8rem' }}>
            <Send size={15} />
            <span>Contact</span>
          </button>

          <button onClick={cycleTheme} className="btn btn-secondary" style={{ padding: '0.45rem 0.65rem' }} title={`Theme: ${theme}`}>
            {theme === 'dark' ? <Moon size={16} color="#38bdf8" /> : <Sun size={16} color="#fbbf24" />}
          </button>
        </div>
      </div>
    </header>
  );
}
