import React, { useEffect, useState } from 'react';
import { TriangleAlert, CircleCheck, Info, ShieldCheck, TrendingUp, Activity } from 'lucide-react';

const diseaseDisplayNames = {
  melanoma: 'Melanoma',
  nevus: 'Nevus (Benign Mole)',
  bcc: 'Basal Cell Carcinoma',
  eczema: 'Eczema',
  normal: 'Normal Skin'
};

const severityConfig = {
  high: {
    label: 'High Risk',
    badgeClass: 'badge-high',
    textColor: '#fca5a5',
    borderColor: 'rgba(248,113,113,0.4)',
    icon: TriangleAlert,
    glowColor: 'rgba(248,113,113,0.15)',
    barColor: 'linear-gradient(90deg, #f87171, #ef4444)'
  },
  moderate: {
    label: 'Moderate Risk',
    badgeClass: 'badge-moderate',
    textColor: '#fdba74',
    borderColor: 'rgba(251,146,60,0.4)',
    icon: TriangleAlert,
    glowColor: 'rgba(251,146,60,0.15)',
    barColor: 'linear-gradient(90deg, #fb923c, #f97316)'
  },
  low: {
    label: 'Low Risk',
    badgeClass: 'badge-low',
    textColor: '#6ee7b7',
    borderColor: 'rgba(52,211,153,0.4)',
    icon: CircleCheck,
    glowColor: 'rgba(52,211,153,0.15)',
    barColor: 'linear-gradient(90deg, #34d399, #10b981)'
  },
  none: {
    label: 'No Concern',
    badgeClass: 'badge-none',
    textColor: '#7dd3fc',
    borderColor: 'rgba(56,189,248,0.4)',
    icon: CircleCheck,
    glowColor: 'rgba(56,189,248,0.15)',
    barColor: 'linear-gradient(90deg, #38bdf8, #0ea5e9)'
  }
};

export default function ResultCard({ result }) {
  const { disease, confidence, description, severity, recommendation, all_probs } = result;
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(false);
    const timer = setTimeout(() => setAnimate(true), 80);
    return () => clearTimeout(timer);
  }, [result]);

  const sev = severityConfig[severity] || severityConfig.none;
  const displayName = diseaseDisplayNames[disease] || disease;
  const SevIcon = sev.icon;

  const sortedPredictions = all_probs
    ? Object.entries(all_probs)
        .map(([key, value]) => ({ key, value, label: diseaseDisplayNames[key] || key }))
        .sort((a, b) => b.value - a.value)
    : [];

  const confidencePercent = (confidence * (confidence <= 1 ? 100 : 1));

  return (
    <div className="glass-card glass-card-glow w-full animate-slide-right" style={{ padding: '28px' }}>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-1">
            <div className="flex items-center justify-center w-7 h-7 rounded-lg"
              style={{ background: 'rgba(52,211,153,0.15)', border: '1px solid rgba(52,211,153,0.25)' }}>
              <Activity className="h-3.5 w-3.5" style={{ color: '#34d399' }} />
            </div>
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#34d399' }}>
              Analysis Result
            </span>
          </div>
          <h2 className="text-2xl font-bold" style={{ color: '#f1f5f9', fontFamily: 'Outfit, sans-serif' }}>
            {displayName}
          </h2>
        </div>

        {/* Severity Badge */}
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${sev.badgeClass}`}
          style={{ flexShrink: 0, whiteSpace: 'nowrap' }}
        >
          <SevIcon className="h-3 w-3" />
          {sev.label}
        </span>
      </div>

      {/* Confidence Meter */}
      <div className="mb-6 p-4 rounded-2xl"
        style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.05)',
          boxShadow: `inset 0 0 20px ${sev.glowColor}`
        }}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#64748b' }}>
            Confidence Score
          </span>
          <span className="text-2xl font-extrabold" style={{ color: sev.textColor, fontFamily: 'Outfit, sans-serif' }}>
            {confidencePercent.toFixed(1)}%
          </span>
        </div>
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{
              width: animate ? `${Math.min(confidencePercent, 100).toFixed(1)}%` : '0%',
              background: sev.barColor
            }}
          />
        </div>
      </div>

      {/* Description */}
      <div className="mb-5 p-4 rounded-xl"
        style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
        <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-2"
          style={{ color: '#64748b' }}>
          <Info className="h-3.5 w-3.5" />
          Condition Overview
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: '#94a3b8' }}>
          {description}
        </p>
      </div>

      {/* Recommendation */}
      <div className="mb-6 p-4 rounded-xl"
        style={{
          background: 'rgba(52,211,153,0.06)',
          border: '1px solid rgba(52,211,153,0.2)',
          borderLeft: '3px solid #34d399'
        }}>
        <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-2"
          style={{ color: '#34d399' }}>
          <ShieldCheck className="h-3.5 w-3.5" />
          Recommended Next Steps
        </h3>
        <p className="text-sm font-medium" style={{ color: '#cbd5e1' }}>
          {recommendation}
        </p>
      </div>

      {/* Probability Distribution */}
      {sortedPredictions.length > 0 && (
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
          <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-4"
            style={{ color: '#64748b' }}>
            <TrendingUp className="h-3.5 w-3.5" />
            Probability Distribution
          </h3>
          <div className="space-y-3">
            {sortedPredictions.map((pred, i) => {
              const isTop = pred.key === disease;
              const pct = (pred.value * 100).toFixed(1);
              return (
                <div key={pred.key}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs font-medium" style={{ color: isTop ? '#e2e8f0' : '#64748b' }}>
                      {isTop && <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 mr-1.5 mb-0.5" style={{ background: '#34d399' }} />}
                      {pred.label}
                    </span>
                    <span className="text-xs font-bold tabular-nums"
                      style={{ color: isTop ? '#34d399' : '#475569' }}>
                      {pct}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full overflow-hidden"
                    style={{ background: 'rgba(255,255,255,0.04)' }}>
                    <div
                      className="h-full rounded-full transition-all ease-out"
                      style={{
                        width: animate ? `${pct}%` : '0%',
                        transitionDuration: `${800 + i * 100}ms`,
                        background: isTop
                          ? 'linear-gradient(90deg, #34d399, #38bdf8)'
                          : 'rgba(255,255,255,0.1)'
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
