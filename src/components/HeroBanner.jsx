import React from 'react';
import { 
  Download, 
  Terminal, 
  Sparkles, 
  Code2, 
  Layers, 
  Award, 
  GitCommit, 
  ExternalLink,
  Upload,
  Send
} from 'lucide-react';

export default function HeroBanner({ profile, onOpenResume, onOpenTerminal, onOpenContact }) {
  return (
    <section className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) auto',
        gap: '2rem',
        alignItems: 'center'
      }}>
        {/* Main Info */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
            <span className="badge badge-purple" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <Sparkles size={13} /> Software Engineer & Architect
            </span>
            <span className="badge badge-blue">
              React 19 & Full-Stack
            </span>
          </div>

          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            letterSpacing: '-0.02em',
            marginBottom: '0.5rem',
            lineHeight: 1.2
          }}>
            Hi, I'm <span className="gradient-text">{profile.name}</span>
          </h1>

          <p style={{
            fontSize: '1.1rem',
            color: 'var(--text-muted)',
            marginBottom: '1.5rem',
            maxWidth: '750px',
            lineHeight: 1.6
          }}>
            {profile.bio}
          </p>

          {/* Quick Metrics Bar */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '1rem',
            marginBottom: '1.75rem'
          }}>
            <div className="glass-card" style={{ padding: '0.85rem 1rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Code2 size={14} color="var(--accent-blue)" /> Experience
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-main)' }}>
                {profile.stats.yearsExperience}+ Yrs
              </div>
            </div>

            <div className="glass-card" style={{ padding: '0.85rem 1rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Layers size={14} color="var(--accent-purple)" /> Projects
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-main)' }}>
                {profile.stats.projectsCompleted}+ Built
              </div>
            </div>

            <div className="glass-card" style={{ padding: '0.85rem 1rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <GitCommit size={14} color="var(--accent-emerald)" /> Commits
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-main)' }}>
                {profile.stats.codeCommitsThisYear}
              </div>
            </div>

            <div className="glass-card" style={{ padding: '0.85rem 1rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Award size={14} color="var(--accent-amber)" /> GitHub Stars
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-main)' }}>
                {profile.stats.openSourceStars}+
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button onClick={onOpenResume} className="btn btn-primary">
              <Download size={16} /> View & Import Resume
            </button>

            <button onClick={onOpenContact} className="btn btn-secondary">
              <Send size={16} /> Get In Touch
            </button>

            <button onClick={onOpenTerminal} className="btn btn-outline">
              <Terminal size={16} /> Interactive CLI
            </button>
          </div>
        </div>

        {/* Right side avatar image card */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{
            position: 'relative',
            width: '210px',
            height: '210px',
            borderRadius: '24px',
            padding: '4px',
            background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple), var(--accent-cyan))',
            boxShadow: '0 12px 35px -10px rgba(59, 130, 246, 0.5)'
          }}>
            <img 
              src={profile.avatarUrl} 
              alt={profile.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '20px'
              }}
              onError={(e) => {
                // Fallback if image fails to load
                e.target.onerror = null;
                e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80";
              }}
            />
            <div style={{
              position: 'absolute',
              bottom: '-10px',
              right: '-10px',
              background: '#090d16',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '12px',
              padding: '0.4rem 0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.75rem',
              boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
            }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></span>
              <span style={{ fontWeight: '600' }}>Active Now</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
