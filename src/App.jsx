import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import AnalyticsWidgets from './components/AnalyticsWidgets';
import ProjectShowcase from './components/ProjectShowcase';
import ExperienceTimeline from './components/ExperienceTimeline';
import ResumeViewerModal from './components/ResumeViewerModal';
import TerminalWidget from './components/TerminalWidget';
import ContactSection from './components/ContactSection';
import { defaultProfile } from './data/profileData';

export default function App() {
  const [profile, setProfile] = useState(defaultProfile);
  const [theme, setTheme] = useState('dark');
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleProfileUpdate = (updatedProfile) => {
    setProfile(updatedProfile);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Navbar */}
      <Header
        profile={profile}
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenContact={() => setIsContactModalOpen(true)}
        theme={theme}
        setTheme={setTheme}
      />

      {/* Main Content Workspace */}
      <main style={{ maxWidth: '1280px', width: '100%', margin: '0 auto', padding: '0 1.5rem', flexGrow: 1 }}>
        
        {/* Hero Section */}
        <HeroBanner
          profile={profile}
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenTerminal={() => setIsTerminalOpen(true)}
          onOpenContact={() => setIsContactModalOpen(true)}
        />

        {/* Analytics & Skill Proficiency Matrix */}
        <AnalyticsWidgets profile={profile} />

        {/* Filterable Projects Showcase */}
        <ProjectShowcase projects={profile.projects} />

        {/* Career Roadmap & Education Timeline */}
        <ExperienceTimeline
          experience={profile.experience}
          education={profile.education}
          certifications={profile.certifications}
        />

        {/* Contact Form Section */}
        <ContactSection profile={profile} />

      </main>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        background: 'rgba(9, 13, 22, 0.9)',
        padding: '1.5rem 0',
        marginTop: '3rem',
        fontSize: '0.8rem',
        color: 'var(--text-muted)'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            © {new Date().getFullYear()} {profile.name}. Computer Science Engineering Portfolio.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button onClick={() => setIsResumeOpen(true)} style={{ background: 'none', border: 'none', color: 'var(--accent-cyan)', cursor: 'pointer', fontSize: '0.8rem' }}>
              Resume Dashboard
            </button>
            <button onClick={() => setIsTerminalOpen(true)} style={{ background: 'none', border: 'none', color: 'var(--accent-purple)', cursor: 'pointer', fontSize: '0.8rem' }}>
              CLI Terminal
            </button>
          </div>
        </div>
      </footer>

      {/* Interactive Resume Modal & Importer */}
      {isResumeOpen && (
        <ResumeViewerModal
          profile={profile}
          onClose={() => setIsResumeOpen(false)}
          onUpdateProfile={handleProfileUpdate}
        />
      )}

      {/* Interactive Terminal Overlay */}
      <TerminalWidget
        profile={profile}
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenContact={() => setIsContactModalOpen(true)}
        theme={theme}
        setTheme={setTheme}
      />

      {/* Contact Triggered Modal */}
      {isContactModalOpen && (
        <ContactSection
          profile={profile}
          isOpenModal={true}
          onCloseModal={() => setIsContactModalOpen(false)}
        />
      )}

    </div>
  );
}
