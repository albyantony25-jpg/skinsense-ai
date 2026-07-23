import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Cpu, FileText, ShieldCheck } from 'lucide-react';

const STEPS = [
  {
    num: '01', icon: Upload,
    title: 'Upload Image',
    desc: 'Drag & drop or select a clear, close-up photo of the affected skin area. Supports JPG, PNG, WEBP up to 10MB.',
    color: '#3DD9EB',
  },
  {
    num: '02', icon: Cpu,
    title: 'AI Analysis',
    desc: 'Our MobileNetV2 deep learning model processes your image, extracting 128+ visual features from the lesion.',
    color: '#00FFA3',
  },
  {
    num: '03', icon: FileText,
    title: 'Prediction Result',
    desc: 'Receive instant classification with confidence scores across 5 disease categories in under 2 seconds.',
    color: '#7C5CFC',
  },
  {
    num: '04', icon: ShieldCheck,
    title: 'Recommendations',
    desc: 'Get medical insights, possible causes, suggested medications, risk level, and whether to visit a doctor.',
    color: '#FFB547',
  },
];

export default function HowItWorks() {
  return (
    <section id="how" style={{ padding: '80px 24px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>

        {/* Header */}
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
          <p style={{ color: 'var(--muted)', marginTop: 12, fontSize: 15, maxWidth: 440, margin: '12px auto 0' }}>
            From upload to diagnosis in four simple steps.
          </p>
        </motion.div>

        <div style={{ position: 'relative' }}>
          {/* Vertical timeline line — aligned to center of step circles (25px = half of 50px circle) */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute',
              left: 24,           /* half of 50px circle — centered on icon */
              top: 25,            /* start from center of first circle */
              bottom: 25,         /* end at center of last circle */
              width: 2,
              transformOrigin: 'top',
              background: 'linear-gradient(180deg, #3DD9EB 0%, #7C5CFC 50%, transparent 100%)',
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
                  style={{
                    display: 'flex', gap: 24,
                    paddingBottom: i < STEPS.length - 1 ? 44 : 0,
                    position: 'relative',
                  }}
                >
                  {/* Step icon circle */}
                  <div style={{ flexShrink: 0, position: 'relative', zIndex: 1 }}>
                    <div style={{
                      width: 50, height: 50, borderRadius: '50%',
                      background: `${step.color}15`,
                      border: `2px solid ${step.color}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: `0 0 20px ${step.color}35`,
                    }}>
                      <Icon size={20} style={{ color: step.color }} />
                    </div>
                  </div>

                  {/* Card */}
                  <motion.div className="glass glass-hover"
                    style={{ flex: 1, padding: '20px 24px' }}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                      <span style={{
                        fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
                        color: step.color, textTransform: 'uppercase',
                      }}>
                        Step {step.num}
                      </span>
                      <div style={{
                        height: 1, flex: 1,
                        background: `linear-gradient(90deg, ${step.color}30, transparent)`,
                      }} />
                    </div>
                    <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8, color: 'var(--text)' }}>{step.title}</h3>
                    <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>{step.desc}</p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
