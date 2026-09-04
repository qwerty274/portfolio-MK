import React from 'react';
import { Briefcase, GraduationCap, Award, MapPin, Calendar, CheckCircle } from 'lucide-react';

export default function ExperienceTimeline({ experience, education, certifications }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
      
      {/* Work Experience Timeline (8 Cols) */}
      <div className="glass-panel" style={{ gridColumn: 'span 8', padding: '1.75rem' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <Briefcase size={20} color="var(--accent-blue)" /> Career History & Experience
        </h2>

        <div style={{ position: 'relative', paddingLeft: '1.5rem', borderLeft: '2px solid rgba(255, 255, 255, 0.1)' }}>
          {experience.map((exp, index) => (
            <div key={exp.id || index} style={{ marginBottom: '2rem', position: 'relative' }}>
              {/* Bullet Node */}
              <div style={{
                position: 'absolute',
                left: '-2.05rem',
                top: '0.2rem',
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                background: index === 0 ? 'var(--accent-cyan)' : 'var(--accent-indigo)',
                border: '3px solid #090d16',
                boxShadow: '0 0 10px rgba(56, 189, 248, 0.5)'
              }} />

              <div className="glass-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-main)' }}>
                      {exp.role}
                    </h3>
                    <div style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', fontWeight: '600' }}>
                      {exp.company}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.75rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Calendar size={13} /> {exp.period}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <MapPin size={13} /> {exp.location}
                    </span>
                  </div>
                </div>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                  {exp.description}
                </p>

                {/* Bullet accomplishments */}
                {exp.highlights && (
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 0.85rem 0', display: 'grid', gap: '0.35rem' }}>
                    {exp.highlights.map((item, i) => (
                      <li key={i} style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
                        <CheckCircle size={14} color="var(--accent-emerald)" style={{ marginTop: '0.2rem', flexShrink: 0 }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Tech badges */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {exp.skills.map(skill => (
                    <span key={skill} style={{
                      background: 'rgba(59, 130, 246, 0.1)',
                      color: '#93c5fd',
                      border: '1px solid rgba(59, 130, 246, 0.2)',
                      padding: '0.15rem 0.5rem',
                      borderRadius: '4px',
                      fontSize: '0.7rem',
                      fontFamily: 'var(--font-mono)'
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Education & Certifications (4 Cols) */}
      <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* Education */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <GraduationCap size={18} color="var(--accent-purple)" /> Education
          </h3>

          {education.map((edu, idx) => (
            <div key={idx} className="glass-card" style={{ marginBottom: '0.85rem' }}>
              <div style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-main)' }}>
                {edu.degree}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--accent-purple)', fontWeight: '600' }}>
                {edu.institution}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', margin: '0.25rem 0 0.5rem 0', fontFamily: 'var(--font-mono)' }}>
                {edu.period} • GPA: {edu.gpa}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {edu.highlights}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="glass-panel" style={{ padding: '1.5rem', flexGrow: 1 }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <Award size={18} color="var(--accent-amber)" /> Certifications & Credentials
          </h3>

          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {certifications.map((cert, idx) => (
              <div key={idx} className="glass-card" style={{ padding: '0.85rem' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-main)' }}>
                  {cert.name}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.25rem' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{cert.issuer}</span>
                  <span style={{ fontSize: '0.7rem', color: '#fbbf24', fontWeight: '600', fontFamily: 'var(--font-mono)' }}>{cert.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
