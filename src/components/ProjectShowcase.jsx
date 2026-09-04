import React, { useState } from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  Star, 
  Layers, 
  X, 
  Sparkles, 
  CheckCircle2 
} from 'lucide-react';
import { GithubIcon } from './Icons';

export default function ProjectShowcase({ projects }) {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const tabs = ['All', 'Fullstack', 'AI/ML & React', 'Frontend', 'Backend & DevOps'];

  const filteredProjects = activeTab === 'All' 
    ? projects 
    : projects.filter(p => p.category.toLowerCase().includes(activeTab.toLowerCase().split(' ')[0]));

  return (
    <section className="glass-panel" style={{ padding: '1.75rem', marginBottom: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FolderGit2 size={20} color="var(--accent-purple)" /> Featured Projects & Applications
          </h2>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
            Selected full-stack web applications, AI canvases, and open-source tools
          </p>
        </div>

        {/* Filter Navigation */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: activeTab === tab ? 'var(--accent-purple)' : 'rgba(255, 255, 255, 0.05)',
                color: activeTab === tab ? '#ffffff' : 'var(--text-muted)',
                border: '1px solid',
                borderColor: activeTab === tab ? 'var(--accent-purple)' : 'rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                padding: '0.4rem 0.85rem',
                fontSize: '0.8rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {filteredProjects.map(project => (
          <div 
            key={project.id} 
            className="glass-card" 
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between',
              cursor: 'pointer',
              overflow: 'hidden',
              padding: '0'
            }}
            onClick={() => setSelectedProject(project)}
          >
            {/* Image Preview Container */}
            <div style={{ position: 'relative', height: '160px', width: '100%', overflow: 'hidden', background: '#0b0f19' }}>
              <img 
                src={project.image} 
                alt={project.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseOut={e => e.currentTarget.style.transform = 'scale(1.0)'}
              />
              <div style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'rgba(9, 13, 22, 0.8)',
                backdropFilter: 'blur(8px)',
                padding: '0.25rem 0.6rem',
                borderRadius: '9999px',
                fontSize: '0.72rem',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                color: '#fbbf24',
                border: '1px solid rgba(251, 191, 36, 0.3)'
              }}>
                <Star size={12} fill="#fbbf24" /> {project.stars}
              </div>
            </div>

            {/* Content Body */}
            <div style={{ padding: '1.25rem', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span className="badge badge-blue" style={{ marginBottom: '0.5rem', fontSize: '0.68rem' }}>
                  {project.category}
                </span>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.4rem', color: 'var(--text-main)' }}>
                  {project.title}
                </h3>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: 1.5 }}>
                  {project.description}
                </p>
              </div>

              <div>
                {/* Tech tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.25rem' }}>
                  {project.tags.map(tag => (
                    <span 
                      key={tag} 
                      style={{ 
                        background: 'rgba(255, 255, 255, 0.06)', 
                        color: 'var(--text-dim)', 
                        padding: '0.18rem 0.5rem', 
                        borderRadius: '4px', 
                        fontSize: '0.7rem',
                        fontFamily: 'var(--font-mono)'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer links */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '0.75rem' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--accent-emerald)', fontWeight: '600' }}>
                    {project.metrics}
                  </span>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      onClick={e => e.stopPropagation()} 
                      style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}
                      title="GitHub Repository"
                    >
                      <GithubIcon size={17} />
                    </a>
                    <a 
                      href={project.demoUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      onClick={e => e.stopPropagation()} 
                      style={{ color: 'var(--accent-cyan)', transition: 'color 0.2s' }}
                      title="Live Demo"
                    >
                      <ExternalLink size={17} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 60,
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem'
        }} onClick={() => setSelectedProject(null)}>
          <div className="glass-panel" style={{
            maxWidth: '650px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '1.75rem',
            position: 'relative'
          }} onClick={e => e.stopPropagation()}>
            
            <button 
              onClick={() => setSelectedProject(null)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: '#fff',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={18} />
            </button>

            <img 
              src={selectedProject.image} 
              alt={selectedProject.title} 
              style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '12px', marginBottom: '1.25rem' }} 
            />

            <span className="badge badge-purple" style={{ marginBottom: '0.5rem' }}>
              {selectedProject.category}
            </span>

            <h2 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '0.5rem' }}>
              {selectedProject.title}
            </h2>

            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
              {selectedProject.description}
            </p>

            <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
              Key Architecture & Features
            </h4>
            <div style={{ display: 'grid', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={16} color="var(--accent-emerald)" /> Optimized component rendering with zero unnecessary re-renders
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={16} color="var(--accent-emerald)" /> Clean REST & GraphQL API payload schema validation
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={16} color="var(--accent-emerald)" /> Fully responsive dark-mode glassmorphic user interface
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <a href={selectedProject.demoUrl} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ flex: 1 }}>
                <ExternalLink size={16} /> Open Live Application
              </a>
              <a href={selectedProject.githubUrl} target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ flex: 1 }}>
                <GithubIcon size={16} /> Source Code
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
