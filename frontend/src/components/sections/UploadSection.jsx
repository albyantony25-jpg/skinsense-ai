import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { Upload, FileImage, Trash2, ShieldAlert, Scan, Sparkles, CircleAlert, Lock } from 'lucide-react';
import LoadingAnimation from '../ui/LoadingAnimation';

export default function UploadSection({
  selectedFile, previewUrl, isLoading,
  onFileSelect, onRemove, onAnalyze, isDemoMode,
}) {
  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop: (accepted) => { if (accepted[0]) onFileSelect(accepted[0]); },
    accept: { 'image/jpeg': [], 'image/png': [], 'image/webp': [] },
    maxSize: 10 * 1024 * 1024,
    multiple: false,
    disabled: isLoading,
  });

  const rejected = fileRejections[0]?.errors[0]?.message;

  const fmt = (b) => {
    if (b === 0) return '0 B';
    const k = 1024, sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(b) / Math.log(k));
    return `${(b / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
  };

  return (
    <section id="upload" style={{ padding: '80px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 40 }}
        >
          <span className="section-tag" style={{ marginBottom: 16, display: 'inline-flex' }}>
            <Scan size={12} />
            Analysis
          </span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginTop: 16, letterSpacing: '-0.02em' }}>
            Upload &amp; <span className="text-grad">Analyze</span>
          </h2>
          <p style={{ color: 'var(--muted)', marginTop: 12, fontSize: 15 }}>
            Drop a clear, well-lit close-up photo of the affected skin area for instant AI analysis.
          </p>
        </motion.div>

        {/* Offline demo warning */}
        <AnimatePresence>
          {isDemoMode && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20,
                padding: '12px 16px', borderRadius: 12,
                background: 'rgba(255,181,71,0.08)', border: '1px solid rgba(255,181,71,0.25)',
              }}
            >
              <CircleAlert size={16} style={{ color: '#FFB547', flexShrink: 0 }} />
              <p style={{ fontSize: 13, color: '#FFB547' }}>
                <b>Offline Demo Mode</b> — API unreachable. Showing simulated prediction based on local model data.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="glass"
          style={{ padding: 32 }}
        >
          {/* File error */}
          {rejected && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16,
              padding: '10px 14px', borderRadius: 10,
              background: 'rgba(255,77,109,0.1)', border: '1px solid rgba(255,77,109,0.25)',
            }}>
              <ShieldAlert size={15} style={{ color: '#FF4D6D' }} />
              <span style={{ fontSize: 13, color: '#FF4D6D' }}>{rejected}</span>
            </div>
          )}

          {/* Drop zone or preview */}
          {!previewUrl ? (
            <div
              {...getRootProps()}
              className={`upload-zone${isDragActive ? ' drag-active' : ''}`}
              style={{ padding: '56px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}
            >
              <input {...getInputProps()} />

              <motion.div
                animate={isDragActive
                  ? { scale: [1, 1.1, 1], rotate: [0, -5, 5, 0] }
                  : { y: [0, -8, 0] }
                }
                transition={{ duration: isDragActive ? 0.4 : 3, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  width: 76, height: 76, borderRadius: 22,
                  background: isDragActive ? 'rgba(61,217,235,0.15)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${isDragActive ? '#3DD9EB' : 'rgba(255,255,255,0.1)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.3s',
                  boxShadow: isDragActive ? '0 0 35px rgba(61,217,235,0.35)' : 'none',
                }}
              >
                <Upload size={30} style={{ color: isDragActive ? '#3DD9EB' : '#475569' }} />
              </motion.div>

              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: 15, fontWeight: 600, color: '#CBD5E1', marginBottom: 4 }}>
                  {isDragActive ? 'Release to upload' : <>Drag &amp; drop your image, or <span style={{ color: '#3DD9EB' }}>browse files</span></>}
                </p>
                <p style={{ fontSize: 13, color: '#475569' }}>Supports JPG, PNG, WEBP · Max 10MB</p>
              </div>

              {/* Tips */}
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', marginTop: 4 }}>
                {['Well-lit photo', 'Close-up shot', 'Clear focus'].map(tip => (
                  <span key={tip} style={{
                    fontSize: 11, color: 'var(--muted)', fontWeight: 500,
                    padding: '3px 10px', borderRadius: 6,
                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                  }}>
                    ✓ {tip}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div key="preview"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
              >
                {/* Image preview */}
                <div style={{
                  position: 'relative', borderRadius: 16, overflow: 'hidden',
                  border: '1px solid rgba(61,217,235,0.2)',
                  background: '#080d14',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  maxHeight: 300,
                }}>
                  <img src={previewUrl} alt="Skin image preview"
                    style={{
                      maxHeight: 300, width: 'auto', objectFit: 'contain', display: 'block',
                      filter: isLoading ? 'brightness(0.5)' : 'none',
                      transition: 'filter 0.3s',
                    }}
                  />

                  {/* Scan line (only when not loading) */}
                  {!isLoading && (
                    <div style={{
                      position: 'absolute', left: 0, right: 0, height: 2,
                      background: 'linear-gradient(90deg, transparent, #3DD9EB, transparent)',
                      animation: 'scanBeam 2.5s ease-in-out infinite',
                      boxShadow: '0 0 12px #3DD9EB',
                    }} />
                  )}

                  {/* Loading overlay */}
                  {isLoading && (
                    <div style={{
                      position: 'absolute', inset: 0,
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8,
                    }}>
                      <Lock size={22} style={{ color: '#3DD9EB' }} />
                      <span style={{ fontSize: 12, color: '#3DD9EB', fontWeight: 600 }}>Analyzing…</span>
                    </div>
                  )}
                </div>

                {/* File info bar */}
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '12px 16px', borderRadius: 12,
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                      background: 'rgba(61,217,235,0.1)', border: '1px solid rgba(61,217,235,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <FileImage size={16} style={{ color: '#3DD9EB' }} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <p style={{ fontSize: 13, fontWeight: 600, color: '#E2E8F0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {selectedFile?.name}
                      </p>
                      <p style={{ fontSize: 12, color: '#475569' }}>{selectedFile ? fmt(selectedFile.size) : ''}</p>
                    </div>
                  </div>
                  <button onClick={onRemove} disabled={isLoading}
                    style={{
                      width: 34, height: 34, borderRadius: 8, border: 'none', cursor: isLoading ? 'not-allowed' : 'pointer',
                      background: 'rgba(255,77,109,0.1)', color: '#FF4D6D',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.2s', flexShrink: 0, opacity: isLoading ? 0.4 : 1,
                    }}
                    onMouseEnter={e => { if (!isLoading) e.currentTarget.style.background = 'rgba(255,77,109,0.22)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,77,109,0.1)'; }}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          )}

          {/* Loading animation */}
          {isLoading && (
            <div style={{ marginTop: 20 }}>
              <LoadingAnimation isLoading={isLoading} />
            </div>
          )}

          {/* Analyze button */}
          {!isLoading && (
            <motion.button
              id="analyze-btn"
              onClick={onAnalyze}
              disabled={!selectedFile}
              className="btn-primary"
              whileHover={selectedFile ? { scale: 1.01 } : {}}
              whileTap={selectedFile ? { scale: 0.98 } : {}}
              style={{ width: '100%', padding: '16px', fontSize: 15, marginTop: 20 }}
            >
              <Scan size={18} />
              Run AI Analysis
              <Sparkles size={16} />
            </motion.button>
          )}
        </motion.div>
      </div>
    </section>
  );
}
