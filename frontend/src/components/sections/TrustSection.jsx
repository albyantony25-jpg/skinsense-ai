import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, Target, Database } from 'lucide-react';

const CARDS = [
  { icon: Brain,    title: 'Deep Learning',  desc: 'Powered by ResNet CNN trained on the HAM10000 dermatology dataset with 10,000+ labeled images.', color: '#3DD9EB', glow: 'rgba(61,217,235,0.15)' },
  { icon: Zap,      title: 'Fast Prediction', desc: 'Get AI-powered skin disease predictions in under 2 seconds with real-time confidence scoring.',   color: '#00FFA3', glow: 'rgba(0,255,163,0.15)' },
  { icon: Target,   title: 'High Accuracy',   desc: 'Our model achieves 98%+ validation accuracy across 5 clinically significant skin disease classes.', color: '#7C5CFC', glow: 'rgba(124,92,252,0.15)' },
  { icon: Database, title: 'Medical Dataset',  desc: 'Trained exclusively on professionally curated dermatology data — melanoma, nevus, BCC, eczema.',  color: '#FFB547', glow: 'rgba(255,181,71,0.15)' },
];

export default function TrustSection() {
  return (
    <section style={{ padding: '80px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          <span className="section-tag" style={{ marginBottom: 16, display: 'inline-flex' }}>Why SkinSense</span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginTop: 16, letterSpacing: '-0.02em' }}>
            Built for <span className="text-grad">precision</span>
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
          {CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="glass glass-hover"
                style={{ padding: 28 }}
              >
                <div style={{
                  width: 52, height: 52, borderRadius: 14,
                  background: card.glow, border: `1px solid ${card.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 20, boxShadow: `0 0 20px ${card.glow}`,
                }}>
                  <Icon size={24} style={{ color: card.color }} />
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10, color: '#fff' }}>{card.title}</h3>
                <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.7 }}>{card.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
