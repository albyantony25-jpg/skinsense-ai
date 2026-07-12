import React from 'react';
import { motion } from 'framer-motion';
import { Info, ShieldCheck, TriangleAlert, CircleCheck, Activity, Stethoscope, Printer } from 'lucide-react';
import CircularProgress from '../ui/CircularProgress';
import RiskMeter from '../ui/RiskMeter';
import ImageComparison from '../ui/ImageComparison';

const DISEASE_NAMES = {
  melanoma: 'Melanoma',
  nevus: 'Nevus (Benign Mole)',
  bcc: 'Basal Cell Carcinoma',
  eczema: 'Eczema',
  normal: 'Normal Skin',
};

const SEVERITY_MAP = {
  high:     { label: 'High Risk',     cls: 'badge-high',     color: '#FF4D6D', bar: 'linear-gradient(90deg,#FF4D6D,#ff6b6b)', ring: '#FF4D6D', Icon: TriangleAlert },
  moderate: { label: 'Moderate Risk', cls: 'badge-moderate', color: '#FFB547', bar: 'linear-gradient(90deg,#FFB547,#ffd080)', ring: '#FFB547', Icon: TriangleAlert },
  low:      { label: 'Low Risk',      cls: 'badge-low',      color: '#22C55E', bar: 'linear-gradient(90deg,#22C55E,#4ade80)', ring: '#22C55E', Icon: CircleCheck },
  none:     { label: 'No Concern',    cls: 'badge-none',     color: '#3DD9EB', bar: 'linear-gradient(90deg,#3DD9EB,#60e8f5)', ring: '#3DD9EB', Icon: CircleCheck },
};

export default function ResultSection({ result, imageUrl }) {
  const { disease, confidence, description, severity, recommendation, symptoms, medicines, visitDoctor, all_probs } = result;

  const sev = SEVERITY_MAP[severity] || SEVERITY_MAP.none;
  const SevIcon = sev.Icon;
  const displayName = DISEASE_NAMES[disease] || disease;
  const confPercent = confidence <= 1 ? confidence * 100 : confidence;

  const sorted = all_probs
    ? Object.entries(all_probs).map(([k, v]) => ({ key: k, pct: v * 100, label: DISEASE_NAMES[k] || k })).sort((a, b) => b.pct - a.pct)
    : [];

  const handlePrint = () => {
    window.print();
  };

  return (
    <section style={{ padding: '20px 24px 60px' }} className="printable-report">
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 36 }} className="no-print">
          <span className="section-tag" style={{ display: 'inline-flex', marginBottom: 16 }}>
            <Activity size={12} />
            Diagnostic Analysis
          </span>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 800, marginTop: 12, letterSpacing: '-0.02em', color: 'var(--text)' }}>
            Analysis <span className="text-grad">Report</span>
          </h2>
        </div>

        {/* Printable Report Title (Only visible in Print) */}
        <div style={{ display: 'none' }} className="print-only">
          <div style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: 16, marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a' }}>SkinSense AI Clinical Report</h1>
              <p style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>Date: {new Date().toLocaleString()}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#0284c7' }}>Reference ID: SS-{Math.floor(100000 + Math.random() * 900000)}</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 24 }} id="result-grid">
          
          {/* Left Panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Main Result Card */}
            <motion.div className="glass"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ padding: 28 }}
            >
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
                <div>
                  <p style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: 6 }}>Detected Condition</p>
                  <h3 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)' }}>{displayName}</h3>
                </div>
                <span className={sev.cls}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '6px 12px', borderRadius: 999, fontSize: 12, fontWeight: 700 }}>
                  <SevIcon size={12} />
                  {sev.label}
                </span>
              </div>

              {/* Score indicators */}
              <div style={{ display: 'flex', gap: 20, justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', marginBottom: 24 }}>
                <CircularProgress value={parseFloat(confPercent.toFixed(1))} color={sev.ring} size={150} stroke={9} />
                <RiskMeter severity={severity} />
              </div>

              {/* Description */}
              <div style={{
                padding: '14px 16px', borderRadius: 12, marginBottom: 16,
                background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                  <Info size={13} style={{ color: 'var(--muted)' }} />
                  <span style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Overview</span>
                </div>
                <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{description}</p>
              </div>

              {/* Recommendation */}
              <div style={{
                padding: '14px 16px', borderRadius: 12,
                background: 'rgba(61,217,235,0.05)',
                border: '1px solid rgba(61,217,235,0.2)',
                borderLeft: '3px solid var(--primary)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                  <ShieldCheck size={13} style={{ color: 'var(--primary)' }} />
                  <span style={{ fontSize: 11, color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Recommendation</span>
                </div>
                <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.6, fontWeight: 500 }}>{recommendation}</p>
              </div>
            </motion.div>

            {/* Print Action / Medical Action */}
            <div style={{ display: 'flex', gap: 12 }} className="no-print">
              <button
                onClick={handlePrint}
                className="btn-outline"
                style={{ flex: 1, padding: '14px', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
              >
                <Printer size={16} />
                Print Clinical Report
              </button>
            </div>
          </div>

          {/* Right Panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Image Comparison Zoom */}
            {imageUrl && (
              <motion.div className="glass"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                style={{ padding: 20 }}
              >
                <ImageComparison imageUrl={imageUrl} />
              </motion.div>
            )}

            {/* Probability Distribution */}
            <motion.div className="glass"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ padding: 24 }}
            >
              <h4 style={{ fontSize: 13, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>
                Probability Distribution
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {sorted.map((p, i) => (
                  <div key={p.key}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                      <span style={{ fontSize: 12, color: p.key === disease ? 'var(--text)' : 'var(--muted)', fontWeight: p.key === disease ? 600 : 400 }}>
                        {p.key === disease && <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: sev.color, marginRight: 6 }} />}
                        {p.label}
                      </span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: p.key === disease ? sev.color : 'var(--muted)' }}>
                        {p.pct.toFixed(1)}%
                      </span>
                    </div>
                    <div className="prog-track">
                      <motion.div className="prog-fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${p.pct}%` }}
                        transition={{ duration: 1.2, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                        style={{ background: p.key === disease ? sev.bar : 'var(--border)' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Symptoms */}
            {symptoms && (
              <motion.div className="glass"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                style={{ padding: 24 }}
              >
                <h4 style={{ fontSize: 13, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>
                  Symptoms
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {symptoms.map(s => (
                    <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: sev.color, flexShrink: 0 }} />
                      <span style={{ fontSize: 13, color: 'var(--muted)' }}>{s}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Doctor Card */}
            {visitDoctor !== undefined && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                style={{
                  padding: '16px 20px', borderRadius: 16,
                  background: visitDoctor ? 'rgba(255,77,109,0.08)' : 'rgba(34,197,94,0.08)',
                  border: `1px solid ${visitDoctor ? 'rgba(255,77,109,0.25)' : 'rgba(34,197,94,0.25)'}`,
                  display: 'flex', alignItems: 'center', gap: 12,
                }}
              >
                <Stethoscope size={20} style={{ color: visitDoctor ? '#FF4D6D' : '#22C55E', flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: visitDoctor ? '#FF4D6D' : '#22C55E', marginBottom: 2 }}>
                    {visitDoctor ? 'Consult a Doctor' : 'Monitor at Home'}
                  </p>
                  <p style={{ fontSize: 12, color: 'var(--muted)' }}>
                    {visitDoctor ? 'This condition requires professional medical evaluation.' : 'Monitor for changes and follow skincare routine.'}
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Medicines */}
        {medicines && (
          <motion.div className="glass"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{ padding: 24, marginTop: 20 }}
          >
            <h4 style={{ fontSize: 13, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>
              Suggested Medications / Treatment
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {medicines.map(m => (
                <span key={m} style={{
                  padding: '6px 14px', borderRadius: 8, fontSize: 13,
                  background: 'var(--bg)', border: '1px solid var(--border)',
                  color: 'var(--muted)',
                }}>{m}</span>
              ))}
            </div>
            <p style={{ fontSize: 11, color: '#ef4444', marginTop: 12 }}>
              ⚠️ Disclaimer: Information provided by AI. Always consult a licensed physician before consuming any medications.
            </p>
          </motion.div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          #result-grid { grid-template-columns: 1fr !important; }
        }
        @media print {
          .print-only { display: block !important; }
          #result-grid { grid-template-columns: 1fr !important; }
          .glass {
            background: #ffffff !important;
            border: 1px solid #e2e8f0 !important;
            box-shadow: none !important;
            color: #0f172a !important;
          }
        }
      `}</style>
    </section>
  );
}
