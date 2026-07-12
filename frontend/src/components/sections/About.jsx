import React from 'react';
import { motion } from 'framer-motion';
import { Shield, BookOpen, Layers, Award, Terminal } from 'lucide-react';

const TECH_ITEMS = [
  { name: 'React', desc: 'UI architecture with state management and interactive Framer Motion transitions.', color: '#61DAFB' },
  { name: 'TensorFlow', desc: 'ResNet deep convolutional network backend classifying 5 dermatology categories.', color: '#FF9900' },
  { name: 'Flask', desc: 'Lightweight REST API orchestrating image uploads and running predictions.', color: '#000000' },
  { name: 'Tailwind CSS', desc: 'PostCSS styling layer providing modern glassmorphism utility tokens.', color: '#38BDF8' },
];

export default function About() {
  return (
    <section id="about" style={{ padding: '80px 24px', background: 'var(--bg2)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="section-tag" style={{ display: 'inline-flex', marginBottom: 16 }}>About</span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginTop: 12, letterSpacing: '-0.02em', color: 'var(--text)' }}>
            Mission &amp; <span className="text-grad">Technology</span>
          </h2>
        </div>

        {/* Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 40, alignItems: 'start' }}>
          
          {/* Mission */}
          <div className="glass" style={{ padding: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <Shield size={20} style={{ color: 'var(--primary)' }} />
              <h3 style={{ fontSize: 18, fontWeight: 800 }}>Project Mission</h3>
            </div>
            <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 16 }}>
              SkinSense AI was built to demonstrate the capabilities of Deep Learning in primary medical screening. By utilizing convolutional neural networks, we aim to bridge the accessibility gap in dermatology.
            </p>
            <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 20 }}>
              Our model is trained on the HAM10000 ("Humans Against Machine") dataset, a curated open-source repository containing 10,000+ high-quality multi-source dermatological photos.
            </p>

            <div style={{ display: 'flex', gap: 16, alignItems: 'center', background: 'var(--bg)', padding: 16, borderRadius: 12, border: '1px solid var(--border)' }}>
              <Award size={32} style={{ color: 'var(--secondary)', flexShrink: 0 }} />
              <div>
                <p style={{ fontSize: 13, fontWeight: 700 }}>HAM10000 Certified Training</p>
                <p style={{ fontSize: 11, color: 'var(--muted)' }}>Includes expert histopathological confirmation for all ground-truth labels.</p>
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
              System Architecture
            </h3>

            {TECH_ITEMS.map((t, i) => (
              <div
                key={t.name}
                className="glass"
                style={{
                  padding: 16, display: 'flex', gap: 16, alignItems: 'flex-start',
                  transition: 'border-color 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(61, 217, 235, 0.3)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; }}
              >
                <div style={{
                  width: 38, height: 38, borderRadius: 8, background: 'rgba(255,255,255,0.02)',
                  border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Terminal size={16} style={{ color: 'var(--primary)' }} />
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{t.name}</p>
                  <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
      
      <style>{`
        @media (max-width: 768px) {
          #about > div > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
