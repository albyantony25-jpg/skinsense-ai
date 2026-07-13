import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, Database, Lock, Target, Smartphone } from 'lucide-react';

const FEATURES = [
  { icon: Brain,      title: 'AI Detection',     desc: 'ResNet CNN trained on 10,000+ dermatology images for precise pattern recognition.', color: '#3DD9EB' },
  { icon: Zap,        title: 'Instant Results',   desc: 'Real-time inference — get full predictions with confidence scores in ~2 seconds.',  color: '#00FFA3' },
  { icon: Database,   title: 'Medical Dataset',   desc: 'HAM10000 — a gold-standard dermatology dataset used in academic research.',         color: '#7C5CFC' },
  { icon: Lock,       title: 'Privacy Protected', desc: 'Images processed in-memory. Nothing stored on our servers. Zero data retention.',   color: '#FF4D6D' },
  { icon: Target,     title: 'High Accuracy',     desc: '98%+ validation accuracy across 5 disease classes with balanced class weights.',     color: '#FFB547' },
  { icon: Smartphone, title: 'Fully Responsive',  desc: 'Optimized for desktop, tablet, and mobile without compromise.',                     color: '#22C55E' },
];

export default function FeaturesSection() {
  return (
    <section id="features" style={{ padding: '80px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
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
          <p style={{ color: '#64748B', marginTop: 14, fontSize: 15, maxWidth: 500, margin: '14px auto 0' }}>
            A complete AI-powered skin analysis platform built with modern ML and healthcare standards.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="glass glass-hover"
                style={{ padding: '28px 24px', display: 'flex', gap: 18, alignItems: 'flex-start' }}
              >
                <div style={{
                  width: 46, height: 46, borderRadius: 13, flexShrink: 0,
                  background: `${f.color}15`, border: `1px solid ${f.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: `0 0 16px ${f.color}20`,
                }}>
                  <Icon size={20} style={{ color: f.color }} />
                </div>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{f.title}</h3>
                  <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.7 }}>{f.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
