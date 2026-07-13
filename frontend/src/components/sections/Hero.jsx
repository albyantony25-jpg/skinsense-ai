import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Upload, ChevronDown, Zap, Target, Shield } from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

const STATS = [
  { value: '98%',    label: 'Accuracy',         icon: Target },
  { value: '~2s',    label: 'Prediction Speed',  icon: Zap    },
  { value: '5',      label: 'Disease Classes',   icon: Shield },
  { value: '10K+',   label: 'Images Trained',    icon: Upload },
];

/* ── Animated AI Medical Orb ───────────────────────────── */
const MedicalOrb = () => (
  <div style={{ position: 'relative', width: 420, height: 420, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    {/* Outer glow */}
    <div style={{
      position: 'absolute', width: '100%', height: '100%', borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(61,217,235,0.12) 0%, transparent 65%)',
    }} />

    {/* Outermost ring */}
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      style={{
        position: 'absolute', width: 380, height: 380, borderRadius: '50%',
        border: '1px dashed rgba(61,217,235,0.15)',
      }}
    >
      {[0, 60, 120, 180, 240, 300].map(angle => (
        <div key={angle} style={{
          position: 'absolute', width: 6, height: 6, borderRadius: '50%',
          background: '#3DD9EB', boxShadow: '0 0 8px #3DD9EB',
          top: '50%', left: '50%',
          transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(189px)`,
        }} />
      ))}
    </motion.div>

    {/* Middle ring */}
    <motion.div
      animate={{ rotate: -360 }}
      transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      style={{
        position: 'absolute', width: 280, height: 280, borderRadius: '50%',
        border: '1px solid rgba(124,92,252,0.2)',
      }}
    >
      {[0, 90, 180, 270].map(angle => (
        <div key={angle} style={{
          position: 'absolute', width: 8, height: 8, borderRadius: '50%',
          background: '#7C5CFC', boxShadow: '0 0 10px #7C5CFC',
          top: '50%', left: '50%',
          transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(139px)`,
        }} />
      ))}
    </motion.div>

    {/* Inner ring */}
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      style={{
        position: 'absolute', width: 190, height: 190, borderRadius: '50%',
        border: '1px solid rgba(0,255,163,0.2)',
      }}
    >
      {[0, 120, 240].map(angle => (
        <div key={angle} style={{
          position: 'absolute', width: 6, height: 6, borderRadius: '50%',
          background: '#00FFA3', boxShadow: '0 0 8px #00FFA3',
          top: '50%', left: '50%',
          transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(94px)`,
        }} />
      ))}
    </motion.div>

    {/* Center sphere */}
    <motion.div
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        width: 120, height: 120, borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(61,217,235,0.3), rgba(124,92,252,0.3))',
        border: '2px solid rgba(61,217,235,0.5)',
        boxShadow: '0 0 40px rgba(61,217,235,0.3), 0 0 80px rgba(61,217,235,0.15), inset 0 0 30px rgba(61,217,235,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative',
      }}
    >
      {/* Scan beam */}
      <div style={{
        position: 'absolute', left: 0, right: 0, height: 2,
        background: 'linear-gradient(90deg, transparent, #3DD9EB, transparent)',
        animation: 'scanBeam 2s ease-in-out infinite',
        boxShadow: '0 0 10px #3DD9EB',
      }} />
      <span style={{ fontSize: 36 }}>🧬</span>
    </motion.div>

    {/* Floating data cards */}
    {[
      { x: -155, y: -60, text: 'Melanoma', sub: '98.2%', color: '#FF4D6D' },
      { x: 130,  y: -80, text: 'Analyzing', sub: '● Live', color: '#00FFA3' },
      { x: -140, y: 70,  text: 'Features', sub: '128 dims', color: '#7C5CFC' },
      { x: 120,  y: 80,  text: 'Confidence', sub: '0.94', color: '#3DD9EB' },
    ].map((card, i) => (
      <motion.div key={i}
        style={{
          position: 'absolute',
          left: '50%', top: '50%',
          transform: `translate(calc(-50% + ${card.x}px), calc(-50% + ${card.y}px))`,
          background: 'rgba(11,17,32,0.9)',
          border: `1px solid ${card.color}30`,
          borderRadius: 10, padding: '8px 12px',
          minWidth: 100,
        }}
        animate={{ y: [card.y, card.y - 6, card.y] }}
        transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
      >
        <p style={{ fontSize: 10, color: '#64748B', marginBottom: 2 }}>{card.text}</p>
        <p style={{ fontSize: 13, fontWeight: 700, color: card.color }}>{card.sub}</p>
      </motion.div>
    ))}
  </div>
);

export default function Hero({ onUploadClick }) {
  return (
    <section id="hero" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', padding: '80px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>

        {/* Left */}
        <div>
          <motion.div {...fadeUp(0.1)} style={{ marginBottom: 24 }}>
            <span className="section-tag">
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#3DD9EB', display: 'inline-block', animation: 'pulseRing 2s ease-out infinite' }} />
              Powered by Deep Learning
            </span>
          </motion.div>

          <motion.h1 {...fadeUp(0.2)} style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: 20, letterSpacing: '-0.03em' }}>
            AI Skin Disease
            <br />
            <span className="text-grad-animated">Detection</span>
          </motion.h1>

          <motion.p {...fadeUp(0.3)} style={{ fontSize: 17, color: '#94A3B8', lineHeight: 1.8, marginBottom: 36, maxWidth: 480 }}>
            Upload a close-up image and receive AI-powered skin disease prediction with confidence score and medical insights in seconds.
          </motion.p>

          <motion.div {...fadeUp(0.4)} style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 48 }}>
            <button onClick={onUploadClick} className="btn-primary" style={{ padding: '14px 28px', fontSize: 15 }}>
              <Upload size={16} />
              Upload Image
              <ArrowRight size={16} />
            </button>
            <button className="btn-outline" style={{ padding: '14px 28px', fontSize: 15 }}
              onClick={() => document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' })}>
              Learn More
              <ChevronDown size={16} />
            </button>
          </motion.div>

          {/* Stats row */}
          <motion.div {...fadeUp(0.55)} style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {STATS.map(({ value, label, icon: Icon }) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Icon size={14} style={{ color: '#3DD9EB' }} />
                  <span style={{ fontSize: 22, fontWeight: 800, color: '#fff' }}>{value}</span>
                </div>
                <span style={{ fontSize: 12, color: '#64748B', fontWeight: 500 }}>{label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <MedicalOrb />
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #hero > div { grid-template-columns: 1fr !important; }
          #hero > div > div:last-child { display: none; }
        }
      `}</style>
    </section>
  );
}
