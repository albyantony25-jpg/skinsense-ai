import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Award, Users, BookOpen, Server, Layers, Cpu, Code2 } from 'lucide-react';
import { FaReact, FaPython } from 'react-icons/fa';
import { SiTensorflow, SiFastapi, SiTailwindcss, SiVite } from 'react-icons/si';

const TECH_ITEMS = [
  { name: 'React + Vite',   desc: 'Reactive UI with lightning-fast HMR and component-based architecture.',    color: '#61DAFB', Icon: FaReact     },
  { name: 'FastAPI',        desc: 'High-performance Python REST API serving predictions asynchronously.',     color: '#009688', Icon: SiFastapi   },
  { name: 'TensorFlow',     desc: 'MobileNetV2 transfer learning backbone for skin disease classification.',  color: '#FF9900', Icon: SiTensorflow },
  { name: 'Tailwind CSS',   desc: 'Utility-first CSS with glassmorphism design tokens and dark mode.',       color: '#38BDF8', Icon: SiTailwindcss },
];

const TEAM = [
  { name: 'Alby A Jose',        role: 'Backend Lead',  sub: 'FastAPI · Model Integration · Deployment',  color: '#3DD9EB' },
  { name: 'Anirudh RS',         role: 'DevOps',        sub: 'Render · Vercel · CI/CD Configuration',     color: '#00FFA3' },
  { name: 'Felix Aby Thomas',   role: 'Frontend',      sub: 'React · Tailwind CSS · UI/UX Design',       color: '#7C5CFC' },
  { name: 'B Ananthakrishnan',  role: 'ML Engineer',   sub: 'MobileNetV2 · Training · Evaluation',       color: '#FFB547' },
];

export default function About() {
  return (
    <section id="about" style={{ padding: '80px 24px', background: 'var(--bg2)' }}>
      <div style={{ maxWidth: 1060, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="section-tag" style={{ display: 'inline-flex', marginBottom: 16 }}>About</span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginTop: 12, letterSpacing: '-0.02em', color: 'var(--text)' }}>
            Mission &amp; <span className="text-grad">Technology</span>
          </h2>
          <p style={{ color: 'var(--muted)', marginTop: 12, fontSize: 15, maxWidth: 500, margin: '12px auto 0' }}>
            A KTU final year capstone project — built to demonstrate the power of AI in accessible healthcare.
          </p>
        </div>

        {/* Mission + Tech row */}
        <div className="about-grid" style={{ marginBottom: 40 }}>

          {/* Mission card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass"
            style={{ padding: 32 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 12,
                background: 'rgba(61,217,235,0.12)', border: '1px solid rgba(61,217,235,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Shield size={18} style={{ color: 'var(--primary)' }} />
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 800 }}>Project Mission</h3>
            </div>
            <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 16 }}>
              SkinSense AI was built to demonstrate the capabilities of deep learning in primary medical screening. By utilizing convolutional neural networks trained on expert-curated dermatology data, we aim to bridge the accessibility gap in early skin disease detection.
            </p>
            <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 24 }}>
              Our model is trained on the <strong style={{ color: 'var(--text)' }}>HAM10000</strong> ("Humans Against Machine") dataset — a gold-standard open-source repository containing 10,000+ high-quality dermatological images with expert histopathological confirmation.
            </p>

            <div style={{
              display: 'flex', gap: 16, alignItems: 'center',
              background: 'var(--bg)', padding: '14px 16px', borderRadius: 12,
              border: '1px solid var(--border)',
            }}>
              <Award size={28} style={{ color: 'var(--secondary)', flexShrink: 0 }} />
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>HAM10000 Certified Dataset</p>
                <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>
                  Expert histopathological confirmation on all ground-truth labels. 5 disease classes.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Tech stack */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
              System Architecture
            </h3>
            {TECH_ITEMS.map((t, i) => {
              const TIcon = t.Icon;
              return (
                <motion.div key={t.name}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="glass"
                  style={{
                    padding: '14px 16px', display: 'flex', gap: 14, alignItems: 'center',
                    transition: 'border-color 0.2s, transform 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = `${t.color}40`; e.currentTarget.style.transform = 'translateX(4px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateX(0)'; }}
                >
                  <div style={{
                    width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                    background: `${t.color}12`, border: `1px solid ${t.color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <TIcon size={18} style={{ color: t.color }} />
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 2 }}>{t.name}</p>
                    <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.5 }}>{t.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <Users size={18} style={{ color: 'var(--secondary)' }} />
            <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>The Team</h3>
          </div>
          <div className="team-grid">
            {TEAM.map((member, i) => (
              <motion.div key={member.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="glass"
                style={{ padding: '20px 22px' }}
              >
                <div style={{
                  width: 42, height: 42, borderRadius: 12,
                  background: `${member.color}15`, border: `1px solid ${member.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 14,
                  fontSize: 18, fontWeight: 800, color: member.color,
                }}>
                  {member.name.charAt(0)}
                </div>
                <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{member.name}</p>
                <p style={{ fontSize: 12, fontWeight: 600, color: member.color, marginBottom: 6 }}>{member.role}</p>
                <p style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.5 }}>{member.sub}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        .about-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 32px; align-items: start; }
        .team-grid  { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        @media (max-width: 900px) { .about-grid { grid-template-columns: 1fr; } }
        @media (max-width: 700px) { .team-grid  { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 480px) { .team-grid  { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}
