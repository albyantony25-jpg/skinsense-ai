import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, Database, Lock, Target, Smartphone } from 'lucide-react';

const FEATURES = [
  {
    icon: Brain,      num: '01',
    title: 'AI Detection',
    desc: 'MobileNetV2 CNN trained on 10,000+ dermatology images with balanced class weights for precise pattern recognition.',
    color: '#3DD9EB',
  },
  {
    icon: Zap,        num: '02',
    title: 'Instant Results',
    desc: 'Real-time inference — get full predictions with confidence scores and risk assessment in under 2 seconds.',
    color: '#00FFA3',
  },
  {
    icon: Database,   num: '03',
    title: 'Medical Dataset',
    desc: 'HAM10000 — a gold-standard dermatology dataset used in academic research with expert-verified labels.',
    color: '#7C5CFC',
  },
  {
    icon: Lock,       num: '04',
    title: 'Privacy Protected',
    desc: 'Images processed entirely in-memory. Nothing stored on our servers. Zero data retention policy.',
    color: '#FF4D6D',
  },
  {
    icon: Target,     num: '05',
    title: 'High Accuracy',
    desc: '~98% validation accuracy across 5 disease classes. Model trained with transfer learning on ImageNet weights.',
    color: '#FFB547',
  },
  {
    icon: Smartphone, num: '06',
    title: 'Fully Responsive',
    desc: 'Optimized for desktop, tablet, and mobile — beautiful experience on every screen size, no compromise.',
    color: '#22C55E',
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" style={{ padding: '80px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          <span className="section-tag" style={{ marginBottom: 16, display: 'inline-flex' }}>Features</span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginTop: 16, letterSpacing: '-0.02em' }}>
            Everything you <span className="text-grad">need</span>
          </h2>
          <p style={{ color: 'var(--muted)', marginTop: 14, fontSize: 15, maxWidth: 500, margin: '14px auto 0' }}>
            A complete AI-powered skin analysis platform built with modern ML and healthcare-grade standards.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: 20 }}>
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="glass glass-hover"
                style={{
                  padding: '28px 24px',
                  display: 'flex', gap: 18, alignItems: 'flex-start',
                  position: 'relative', overflow: 'hidden',
                }}
              >
                {/* Top color accent line */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                  background: `linear-gradient(90deg, ${f.color}, transparent)`,
                }} />

                <div style={{
                  width: 48, height: 48, borderRadius: 14, flexShrink: 0,
                  background: `${f.color}15`, border: `1px solid ${f.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: `0 0 18px ${f.color}20`,
                }}>
                  <Icon size={22} style={{ color: f.color }} />
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>{f.title}</h3>
                    <span style={{
                      fontSize: 10, fontWeight: 700, color: f.color,
                      background: `${f.color}15`, border: `1px solid ${f.color}25`,
                      padding: '2px 6px', borderRadius: 4, letterSpacing: '0.05em',
                    }}>
                      {f.num}
                    </span>
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{f.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
