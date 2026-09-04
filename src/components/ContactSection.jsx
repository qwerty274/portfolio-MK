import React, { useState } from 'react';
import { Mail, MessageSquare, Send, Calendar, CheckCircle2, Globe, Clock } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './Icons';
import confetti from 'canvas-confetti';

export default function ContactSection({ profile, isOpenModal, onCloseModal }) {
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'Project Discussion', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [scheduleModal, setScheduleModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitted(true);

    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
    } catch (err) {}

    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: 'Project Discussion', message: '' });
      if (isOpenModal) onCloseModal();
    }, 2500);
  };

  const content = (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '1.5rem' }}>
      
      {/* Contact Info Side (5 cols) */}
      <div className="glass-card" style={{ gridColumn: 'span 5', padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <span className="badge badge-blue" style={{ marginBottom: '0.75rem' }}>
            Get In Touch
          </span>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
            Let's build something extraordinary together.
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
            Whether you have a full-time engineering opportunity, consulting inquiry, or open-source project idea—my inbox is always open!
          </p>

          <div style={{ display: 'grid', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(59,130,246,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-blue)' }}>
                <Mail size={18} />
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Direct Email</div>
                <a href={`mailto:${profile.email}`} style={{ fontSize: '0.9rem', color: 'var(--text-main)', textDecoration: 'none', fontWeight: '600' }}>
                  {profile.email}
                </a>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-emerald)' }}>
                <Clock size={18} />
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Response Time</div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: '600' }}>
                  Under 12 Hours (PST)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Schedule Call CTA */}
        <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Calendar size={15} color="var(--accent-purple)" /> Schedule 1-on-1 Call
            </span>
            <span style={{ fontSize: '0.7rem', color: 'var(--accent-emerald)', fontWeight: '600' }}>15 Min</span>
          </div>
          <button 
            type="button" 
            onClick={() => setScheduleModal(true)} 
            className="btn btn-outline" 
            style={{ width: '100%', fontSize: '0.78rem', marginTop: '0.5rem' }}
          >
            Pick a Time Slot
          </button>
        </div>
      </div>

      {/* Message Form (7 cols) */}
      <div className="glass-card" style={{ gridColumn: 'span 7', padding: '1.75rem' }}>
        {submitted ? (
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem 0' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(16,185,129,0.15)', color: '#34d399', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <CheckCircle2 size={32} />
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '0.5rem' }}>Message Dispatched!</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Thank you for reaching out, {formData.name}. I will get back to you shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '600', color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Jane Doe"
                  style={{
                    width: '100%',
                    background: 'rgba(0,0,0,0.3)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    padding: '0.65rem 0.85rem',
                    color: '#fff',
                    outline: 'none',
                    fontSize: '0.85rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '600', color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="jane@company.com"
                  style={{
                    width: '100%',
                    background: 'rgba(0,0,0,0.3)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    padding: '0.65rem 0.85rem',
                    color: '#fff',
                    outline: 'none',
                    fontSize: '0.85rem'
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '600', color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                Subject
              </label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                style={{
                  width: '100%',
                  background: 'rgba(17, 24, 39, 0.95)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  padding: '0.65rem 0.85rem',
                  color: '#fff',
                  outline: 'none',
                  fontSize: '0.85rem'
                }}
              >
                <option value="Project Discussion">Full-Time Role Opportunity</option>
                <option value="Freelance / Consulting">Freelance / Consulting Project</option>
                <option value="Coffee & Chat">Networking / General Chat</option>
              </select>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '600', color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                Message *
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell me about your project, timeline, or role requirements..."
                style={{
                  width: '100%',
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  padding: '0.65rem 0.85rem',
                  color: '#fff',
                  outline: 'none',
                  fontSize: '0.85rem',
                  resize: 'vertical'
                }}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              <Send size={16} /> Send Direct Message
            </button>
          </form>
        )}
      </div>

      {/* Schedule Modal Simulation */}
      {scheduleModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 90,
          background: 'rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }} onClick={() => setScheduleModal(false)}>
          <div className="glass-panel" style={{ maxWidth: '420px', width: '100%', padding: '1.5rem', textAlign: 'center' }} onClick={e => e.stopPropagation()}>
            <Calendar size={32} color="var(--accent-purple)" style={{ margin: '0 auto 0.75rem auto' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.35rem' }}>Book 15-Min Intro Call</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Available slots for this week (PST):
            </p>
            
            <div style={{ display: 'grid', gap: '0.5rem', marginBottom: '1.25rem' }}>
              {['Tomorrow, 10:00 AM PST', 'Tomorrow, 2:30 PM PST', 'Friday, 11:00 AM PST', 'Friday, 4:00 PM PST'].map(slot => (
                <button
                  key={slot}
                  onClick={() => {
                    alert(`Slot selected: ${slot}. Confirmation sent!`);
                    setScheduleModal(false);
                  }}
                  className="btn btn-secondary"
                  style={{ fontSize: '0.8rem', padding: '0.5rem' }}
                >
                  {slot}
                </button>
              ))}
            </div>

            <button onClick={() => setScheduleModal(false)} className="btn btn-outline" style={{ width: '100%', fontSize: '0.75rem' }}>
              Close Calendar
            </button>
          </div>
        </div>
      )}

    </div>
  );

  if (isOpenModal) {
    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 75,
        background: 'rgba(0,0,0,0.8)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem'
      }} onClick={onCloseModal}>
        <div className="glass-panel" style={{ maxWidth: '850px', width: '100%', padding: '1.5rem', maxHeight: '90vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.5rem' }}>
            <button onClick={onCloseModal} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}>Close ✕</button>
          </div>
          {content}
        </div>
      </div>
    );
  }

  return (
    <section className="glass-panel" style={{ padding: '1.75rem', marginBottom: '3rem' }}>
      {content}
    </section>
  );
}
