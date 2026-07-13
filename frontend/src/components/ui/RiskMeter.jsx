import React from 'react';
import { motion } from 'framer-motion';

const RISK_CONFIG = {
  high: { label: 'High Risk', color: '#FF4D6D', angle: 150 },
  moderate: { label: 'Moderate Risk', color: '#FFB547', angle: 90 },
  low: { label: 'Low Risk', color: '#22C55E', angle: 30 },
  none: { label: 'No Concern', color: '#3DD9EB', angle: 15 },
};

export default function RiskMeter({ severity = 'none' }) {
  const config = RISK_CONFIG[severity] || RISK_CONFIG.none;
  const needleAngle = config.angle;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px 0', width: '100%' }}>
      <h4 style={{ fontSize: 13, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>
        Risk Level Meter
      </h4>

      <div style={{ position: 'relative', width: 220, height: 120, overflow: 'hidden' }}>
        {/* Semi-circle Track */}
        <svg width="220" height="120" style={{ display: 'block' }}>
          {/* Defs for gradients */}
          <defs>
            <linearGradient id="gauge-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22C55E" />
              <stop offset="50%" stopColor="#FFB547" />
              <stop offset="100%" stopColor="#FF4D6D" />
            </linearGradient>
            <filter id="needle-glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Track Arc */}
          <path
            d="M 20 110 A 90 90 0 0 1 200 110"
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="14"
            strokeLinecap="round"
          />

          {/* Colored Gradient Arc */}
          <path
            d="M 20 110 A 90 90 0 0 1 200 110"
            fill="none"
            stroke="url(#gauge-grad)"
            strokeWidth="12"
            strokeLinecap="round"
            style={{ opacity: 0.9 }}
          />

          {/* Pivot Point */}
          <circle cx="110" cy="110" r="10" fill="var(--bg)" stroke="var(--border)" strokeWidth="3" />
        </svg>

        {/* Needle pointer */}
        <motion.div
          initial={{ rotate: -90 }}
          animate={{ rotate: needleAngle - 90 }}
          transition={{ type: 'spring', damping: 15, stiffness: 80, delay: 0.5 }}
          style={{
            position: 'absolute', bottom: 10, left: 107,
            width: 6, height: 85,
            background: config.color,
            borderRadius: '4px 4px 0 0',
            transformOrigin: '50% 100%',
            filter: 'url(#needle-glow)',
            boxShadow: `0 0 12px ${config.color}`,
          }}
        />
      </div>

      <div style={{ display: 'flex', gap: 24, marginTop: 10, fontSize: 11, fontWeight: 700, color: 'var(--muted)', letterSpacing: '0.04em' }}>
        <span style={{ color: '#22C55E' }}>LOW</span>
        <span style={{ color: '#FFB547' }}>MEDIUM</span>
        <span style={{ color: '#FF4D6D' }}>HIGH</span>
      </div>

      <div style={{
        marginTop: 14, padding: '6px 16px', borderRadius: 20,
        background: `${config.color}15`, border: `1px solid ${config.color}35`,
        color: config.color, fontWeight: 800, fontSize: 13, textTransform: 'uppercase',
      }}>
        {config.label}
      </div>
    </div>
  );
}
