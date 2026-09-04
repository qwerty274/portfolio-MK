import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';
import { Cpu, Activity, ShieldCheck, Code, Sparkles, Filter } from 'lucide-react';

export default function AnalyticsWidgets({ profile }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Frontend', 'Backend', 'Database', 'DevOps', 'AI/ML'];

  const filteredSkills = selectedCategory === 'All' 
    ? profile.skills 
    : profile.skills.filter(s => s.category === selectedCategory);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
      
      {/* Skill Proficiency Matrix (8 cols) */}
      <div className="glass-panel" style={{ gridColumn: 'span 8', padding: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Cpu size={18} color="var(--accent-cyan)" /> Technical Proficiency Matrix
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Core technologies, frameworks, and system engineering skill levels
            </p>
          </div>

          {/* Category Filter Pills */}
          <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  background: selectedCategory === cat ? 'var(--accent-blue)' : 'rgba(255, 255, 255, 0.05)',
                  color: selectedCategory === cat ? '#ffffff' : 'var(--text-muted)',
                  border: '1px solid',
                  borderColor: selectedCategory === cat ? 'var(--accent-blue)' : 'rgba(255, 255, 255, 0.08)',
                  borderRadius: '9999px',
                  padding: '0.25rem 0.65rem',
                  fontSize: '0.72rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem' }}>
          {filteredSkills.map(skill => (
            <div key={skill.name} className="glass-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <span style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                  {skill.name}
                </span>
                <span style={{ fontSize: '0.8rem', fontWeight: '700', color: skill.color || 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
                  {skill.level}%
                </span>
              </div>
              <div style={{
                height: '8px',
                width: '100%',
                background: 'rgba(255, 255, 255, 0.08)',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  height: '100%',
                  width: `${skill.level}%`,
                  background: `linear-gradient(90deg, ${skill.color || 'var(--accent-blue)'}, var(--accent-indigo))`,
                  borderRadius: '4px',
                  transition: 'width 0.8s ease-out'
                }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.35rem', fontSize: '0.68rem', color: 'var(--text-dim)' }}>
                <span>{skill.category}</span>
                <span>{skill.level > 90 ? 'Expert' : skill.level > 80 ? 'Proficient' : 'Intermediate'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Commit Activity & Telemetry (4 cols) */}
      <div className="glass-panel" style={{ gridColumn: 'span 4', padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <Activity size={18} color="var(--accent-emerald)" /> Commit Activity Heatmap
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            Weekly code velocity & contribution stream
          </p>

          <div style={{ height: '180px', width: '100%', marginTop: '0.5rem' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={profile.stats.githubContributions}>
                <XAxis dataKey="day" stroke="var(--text-dim)" fontSize={11} tickLine={false} />
                <YAxis stroke="var(--text-dim)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ background: '#111827', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }}
                  cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {profile.stats.githubContributions.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 2 ? '#38bdf8' : '#6366f1'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card" style={{ marginTop: '1rem', background: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', fontWeight: '600', color: '#34d399' }}>
            <ShieldCheck size={16} /> Verified Developer Metrics
          </div>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Clean code compliance • CI/CD Automated Pipelines • 99.8% Test Coverage
          </p>
        </div>
      </div>

    </div>
  );
}
