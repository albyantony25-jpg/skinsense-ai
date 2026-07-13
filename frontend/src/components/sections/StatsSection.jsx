import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { Target, Shield, Zap, BookOpen } from 'lucide-react';

const STATS = [
  { end: 98,    suffix: '%',  label: 'Model Accuracy',       sub: 'on HAM10000 test set',    color: '#3DD9EB', Icon: Target   },
  { end: 5,     suffix: '',   label: 'Disease Classes',       sub: 'classified by AI',         color: '#00FFA3', Icon: Shield   },
  { end: 2,     suffix: 's',  label: 'Avg Prediction Time',   sub: 'end-to-end inference',     color: '#7C5CFC', Icon: Zap      },
  { end: 10000, suffix: '+',  label: 'Training Images',       sub: 'expert-verified labels',   color: '#FFB547', Icon: BookOpen },
];

/* Single animated stat cell — hooks used properly at component level */
function StatCell({ stat, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [value, setValue] = useState(0);
  const Icon = stat.Icon;

  useEffect(() => {
    if (!isInView) return;
    const timer = setTimeout(() => {
      const controls = animate(0, stat.end, {
        duration: 2,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: v => setValue(Math.round(v)),
      });
      return controls.stop;
    }, index * 150);
    return () => clearTimeout(timer);
  }, [isInView, stat.end, index]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{ textAlign: 'center', position: 'relative' }}
    >
      {/* Vertical divider (not for last) */}
      {index < STATS.length - 1 && (
        <div style={{
          position: 'absolute', right: 0, top: '15%', bottom: '15%',
          width: 1, background: 'rgba(255,255,255,0.06)',
        }} />
      )}

      {/* Icon */}
      <div style={{
        width: 44, height: 44, borderRadius: 12,
        background: `${stat.color}15`, border: `1px solid ${stat.color}30`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 14px',
      }}>
        <Icon size={20} style={{ color: stat.color }} />
      </div>

      {/* Animated counter */}
      <div style={{ marginBottom: 8 }}>
        <span style={{
          color: stat.color, fontWeight: 900,
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          letterSpacing: '-0.03em', lineHeight: 1,
        }}>
          {stat.end >= 1000 ? value.toLocaleString() : value}{stat.suffix}
        </span>
      </div>

      <p style={{ fontSize: 14, color: 'var(--text)', fontWeight: 600, marginBottom: 4 }}>{stat.label}</p>
      <p style={{ fontSize: 12, color: 'var(--muted)' }}>{stat.sub}</p>
    </motion.div>
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
            position: 'relative', overflow: 'hidden',
          }}
        >
          {/* Background radial glow */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)', width: 600, height: 300,
            background: 'radial-gradient(ellipse, rgba(61,217,235,0.05) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div className="stats-grid">
            {STATS.map((stat, i) => (
              <StatCell key={stat.label} stat={stat} index={i} />
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          position: relative;
        }
        @media (max-width: 640px) {
          .stats-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </section>
  );
}
