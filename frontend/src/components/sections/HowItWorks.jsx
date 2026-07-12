import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Cpu, FileText, ShieldCheck } from 'lucide-react';

const STEPS = [
  { num: '01', icon: Upload,      title: 'Upload Image',      desc: 'Drag & drop or select a clear, close-up photo of the affected skin area (JPG, PNG, WEBP).', color: '#3DD9EB' },
  { num: '02', icon: Cpu,         title: 'AI Analysis',       desc: 'Our ResNet deep learning model processes your image, extracting 128+ visual features.',       color: '#00FFA3' },
  { num: '03', icon: FileText,    title: 'Prediction Result', desc: 'Receive instant classification with confidence scores across 5 disease categories.',          color: '#7C5CFC' },
  { num: '04', icon: ShieldCheck, title: 'Recommendations',   desc: 'Get medical insights, possible causes, suggested medications, and whether to visit a doctor.', color: '#FFB547' },
];

export default function HowItWorks() {
  return (
    <section id="how" style={{ padding: '80px 24px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <span className="section-tag" style={{ marginBottom: 16, display: 'inline-flex' }}>Process</span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginTop: 16, letterSpacing: '-0.02em' }}>
            How it <span className="text-grad">works</span>
          </h2>
        </motion.div>

        <div style={{ position: 'relative' }}>
          {/* Vertical connector */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute', left: 24, top: 52, bottom: 0,
              width: 2, transformOrigin: 'top',
              background: 'linear-gradient(180deg, #3DD9EB, #7C5CFC, transparent)',
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div key={step.num}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  style={{ display: 'flex', gap: 24, paddingBottom: i < STEPS.length - 1 ? 40 : 0, position: 'relative' }}
                >
                  <div style={{ flexShrink: 0 }}>
                    <div style={{
                      width: 50, height: 50, borderRadius: '50%',
                      background: `${step.color}15`, border: `2px solid ${step.color}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: `0 0 20px ${step.color}30`, position: 'relative', zIndex: 1,
                    }}>
                      <Icon size={20} style={{ color: step.color }} />
                    </div>
                  </div>
                  <div className="glass glass-hover" style={{ flex: 1, padding: '20px 24px' }}>
                    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: step.color, textTransform: 'uppercase' }}>Step {step.num}</span>
                    <h3 style={{ fontSize: 17, fontWeight: 700, marginTop: 6, marginBottom: 8, color: '#fff' }}>{step.title}</h3>
                    <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.7 }}>{step.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
