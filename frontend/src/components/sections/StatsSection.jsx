import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';

const STATS = [
  { end: 98,    suffix: '%',  label: 'Model Accuracy',      color: '#3DD9EB' },
  { end: 5,     suffix: '',   label: 'Disease Classes',      color: '#00FFA3' },
  { end: 2,     suffix: 's',  label: 'Avg Prediction Time',  color: '#7C5CFC' },
  { end: 10000, suffix: '+',  label: 'Training Images',      color: '#FFB547' },
];

function AnimatedCounter({ end, suffix, color, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const timer = setTimeout(() => {
      const controls = animate(0, end, {
        duration: 2,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (v) => setValue(Math.round(v)),
      });
      return controls.stop;
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [isInView, end, delay]);

  return (
    <span ref={ref} style={{ color, fontWeight: 900, fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.03em', lineHeight: 1 }}>
      {end >= 1000 ? value.toLocaleString() : value}{suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section style={{ padding: '80px 24px' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          style={{
            background: 'linear-gradient(135deg, rgba(61,217,235,0.06) 0%, rgba(124,92,252,0.06) 100%)',
            border: '1px solid rgba(61,217,235,0.15)',
            borderRadius: 24, padding: '52px 40px',
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20,
            position: 'relative', overflow: 'hidden',
          }}
        >
          {/* Radial glow */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)', width: 600, height: 300,
            background: 'radial-gradient(ellipse, rgba(61,217,235,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          {STATS.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{ textAlign: 'center', position: 'relative' }}
            >
              <div style={{ marginBottom: 8 }}>
                <AnimatedCounter end={s.end} suffix={s.suffix} color={s.color} delay={i * 0.2} />
              </div>
              <p style={{ fontSize: 14, color: '#64748B', fontWeight: 500 }}>{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          section > div > div[style*="repeat(4, 1fr)"] {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
