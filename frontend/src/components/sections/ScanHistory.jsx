import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Calendar, FileText, Activity, Clock } from 'lucide-react';

const SEVERITY_COLORS = {
  high:     '#FF4D6D',
  moderate: '#FFB547',
  low:      '#22C55E',
  none:     '#3DD9EB',
};

const SEVERITY_LABELS = {
  high:     'High Risk',
  moderate: 'Moderate',
  low:      'Low Risk',
  none:     'No Concern',
};

function timeAgo(timestamp) {
  const now = new Date();
  const then = new Date(timestamp);
  const diffMs = now - then;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1)    return 'Just now';
  if (diffMins < 60)   return `${diffMins}m ago`;
  if (diffHours < 24)  return `${diffHours}h ago`;
  if (diffDays < 30)   return `${diffDays}d ago`;
  return then.toLocaleDateString();
}

export default function ScanHistory({ isOpen, onClose, history, onClearAll, onSelectRecord, onDeleteRecord }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.55 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0, background: '#000', zIndex: 100,
              backdropFilter: 'blur(4px)',
            }}
          />

          {/* Slide-in panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed', right: 0, top: 0, bottom: 0, width: '100%', maxWidth: 420,
              background: 'var(--bg2)', borderLeft: '1px solid var(--border)', zIndex: 101,
              padding: '24px', display: 'flex', flexDirection: 'column',
              boxShadow: '-15px 0 40px rgba(0,0,0,0.35)',
              color: 'var(--text)',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: 'rgba(61,217,235,0.12)', border: '1px solid rgba(61,217,235,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Activity size={17} style={{ color: 'var(--primary)' }} />
                </div>
                <div>
                  <h3 style={{ fontSize: 17, fontWeight: 800 }}>Scan History</h3>
                  <p style={{ fontSize: 11, color: 'var(--muted)' }}>
                    {history.length} {history.length === 1 ? 'scan' : 'scans'} saved locally
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)',
                  cursor: 'pointer', color: 'var(--muted)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: 'var(--border)', marginBottom: 16 }} />

            {/* List */}
            <div
              style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10, paddingRight: 2 }}
              className="no-scrollbar"
            >
              {history.length === 0 ? (
                <div style={{
                  flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
                  justifyContent: 'center', gap: 14, textAlign: 'center', opacity: 0.7, padding: '40px 0',
                }}>
                  <FileText size={52} style={{ color: 'var(--muted)' }} />
                  <div>
                    <p style={{ fontWeight: 600, fontSize: 15 }}>No scans yet</p>
                    <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 6 }}>
                      Upload and analyze an image to see your history here.
                    </p>
                  </div>
                </div>
              ) : (
                history.map((h, i) => {
                  const sevColor = SEVERITY_COLORS[h.severity] || 'var(--muted)';
                  const sevLabel = SEVERITY_LABELS[h.severity] || h.severity;
                  return (
                    <motion.div
                      key={h.id || i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      style={{
                        background: 'var(--card)', border: '1px solid var(--border)',
                        borderRadius: 14, padding: '14px 16px',
                        cursor: 'pointer', position: 'relative',
                        transition: 'border-color 0.2s, background 0.2s',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = 'rgba(61,217,235,0.35)';
                        e.currentTarget.style.background = 'rgba(61,217,235,0.03)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = 'var(--border)';
                        e.currentTarget.style.background = 'var(--card)';
                      }}
                      onClick={() => { onSelectRecord(h); onClose(); }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 0 }}>
                          {/* Severity dot */}
                          <div style={{
                            width: 9, height: 9, borderRadius: '50%', flexShrink: 0,
                            background: sevColor, boxShadow: `0 0 8px ${sevColor}60`,
                          }} />
                          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {h.diseaseName || h.disease}
                          </span>
                        </div>
                        <button
                          onClick={e => { e.stopPropagation(); onDeleteRecord(h.id); }}
                          style={{
                            background: 'none', border: 'none', cursor: 'pointer',
                            color: 'var(--muted)', opacity: 0.5, transition: 'opacity 0.2s, color 0.2s',
                            padding: '2px 4px', borderRadius: 4, flexShrink: 0,
                          }}
                          onMouseEnter={e => { e.currentTarget.style.opacity = 1; e.currentTarget.style.color = '#FF4D6D'; }}
                          onMouseLeave={e => { e.currentTarget.style.opacity = 0.5; e.currentTarget.style.color = 'var(--muted)'; }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                        {/* Severity badge */}
                        <span style={{
                          fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 6,
                          background: `${sevColor}15`, border: `1px solid ${sevColor}30`,
                          color: sevColor,
                        }}>
                          {sevLabel}
                        </span>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 11, color: 'var(--muted)' }}>
                          <span style={{ fontWeight: 700, color: 'var(--text)' }}>
                            {Math.round(h.confidence * 100)}%
                          </span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                            <Clock size={10} />
                            {timeAgo(h.timestamp)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Clear All */}
            {history.length > 0 && (
              <div style={{ marginTop: 16 }}>
                <div style={{ height: 1, background: 'var(--border)', marginBottom: 12 }} />
                <button
                  onClick={onClearAll}
                  style={{
                    width: '100%', padding: '11px', border: '1px solid rgba(239,68,68,0.2)',
                    borderRadius: 12, background: 'rgba(239,68,68,0.05)', color: '#FF4D6D',
                    fontWeight: 600, fontSize: 13, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.1)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.05)'; }}
                >
                  <Trash2 size={14} />
                  Clear All Scans
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
