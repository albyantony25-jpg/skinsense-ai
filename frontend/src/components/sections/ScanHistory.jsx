import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Calendar, FileText, Activity } from 'lucide-react';

const SEVERITY_COLORS = {
  high: '#FF4D6D',
  moderate: '#FFB547',
  low: '#22C55E',
  none: '#3DD9EB',
};

export default function ScanHistory({ isOpen, onClose, history, onClearAll, onSelectRecord, onDeleteRecord }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0, background: '#000', zIndex: 100,
              backdropFilter: 'blur(4px)',
            }}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed', right: 0, top: 0, bottom: 0, width: '100%', maxWidth: 420,
              background: 'var(--bg2)', borderLeft: '1px solid var(--border)', zIndex: 101,
              padding: '24px', display: 'flex', flexDirection: 'column',
              boxShadow: '-10px 0 30px rgba(0,0,0,0.25)',
              color: 'var(--text)',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Activity size={20} style={{ color: 'var(--primary)' }} />
                <h3 style={{ fontSize: 18, fontWeight: 800 }}>Scan History</h3>
              </div>
              <button
                onClick={onClose}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 4,
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* List */}
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }} className="no-scrollbar">
              {history.length === 0 ? (
                <div style={{
                  flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
                  justifyContent: 'center', gap: 12, textAlign: 'center', opacity: 0.7,
                }}>
                  <FileText size={48} style={{ color: 'var(--muted)' }} />
                  <div>
                    <p style={{ fontWeight: 600, fontSize: 15 }}>No historical scans found</p>
                    <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>
                      Analyzed scans will be automatically saved to your browser.
                    </p>
                  </div>
                </div>
              ) : (
                history.map((h, i) => (
                  <motion.div
                    key={h.id || i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    style={{
                      background: 'var(--card)', border: '1px solid var(--border)',
                      borderRadius: 12, padding: 14, cursor: 'pointer', position: 'relative',
                      transition: 'border-color 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(61,217,235,0.4)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; }}
                    onClick={() => {
                      onSelectRecord(h);
                      onClose();
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                      <span style={{
                        fontSize: 13, fontWeight: 700,
                        color: SEVERITY_COLORS[h.severity] || 'var(--text)',
                      }}>
                        {h.diseaseName || h.disease}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteRecord(h.id);
                        }}
                        style={{
                          background: 'none', border: 'none', cursor: 'pointer', color: 'var(--danger)',
                          opacity: 0.6, transition: 'opacity 0.2s', padding: 4,
                        }}
                        onMouseEnter={e => { e.currentTarget.style.opacity = 1; }}
                        onMouseLeave={e => { e.currentTarget.style.opacity = 0.6; }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11, color: 'var(--muted)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Calendar size={11} />
                        {new Date(h.timestamp).toLocaleDateString()}
                      </span>
                      <span style={{ fontWeight: 700 }}>
                        {Math.round(h.confidence * 100)}% Confidence
                      </span>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Clear All */}
            {history.length > 0 && (
              <button
                onClick={onClearAll}
                style={{
                  width: '100%', padding: '12px', border: '1px solid rgba(239, 68, 68, 0.2)',
                  borderRadius: 12, background: 'rgba(239, 68, 68, 0.05)', color: '#FF4D6D',
                  fontWeight: 600, fontSize: 13, cursor: 'pointer', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 16,
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.05)'; }}
              >
                <Trash2 size={14} />
                Clear Scan History
              </button>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
