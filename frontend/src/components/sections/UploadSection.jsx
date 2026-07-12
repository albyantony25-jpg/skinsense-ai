import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { Upload, FileImage, Trash2, ShieldAlert, Scan, Sparkles, CircleAlert } from 'lucide-react';
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
          <p style={{ color: '#94A3B8', marginTop: 12, fontSize: 15 }}>
            Drop a clear, well-lit close-up image of the affected skin area
          </p>
        </motion.div>

        {/* Demo mode warning */}
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
                <b>Offline Demo Mode</b> — API unreachable. Showing simulated prediction.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="glass"
          style={{ padding: 32 }}
        >
          {/* Error */}
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

          {/* Drop zone */}
          {!previewUrl ? (
            <div
              {...getRootProps()}
              className={`upload-zone${isDragActive ? ' drag-active' : ''}`}
              style={{ padding: '52px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}
            >
              <input {...getInputProps()} />
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  width: 72, height: 72, borderRadius: 20,
                  background: isDragActive ? 'rgba(61,217,235,0.15)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${isDragActive ? '#3DD9EB' : 'rgba(255,255,255,0.1)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.3s',
                  boxShadow: isDragActive ? '0 0 30px rgba(61,217,235,0.3)' : 'none',
                }}
              >
                <Upload size={28} style={{ color: isDragActive ? '#3DD9EB' : '#475569' }} />
              </motion.div>

              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: 15, fontWeight: 600, color: '#CBD5E1', marginBottom: 4 }}>
                  Drag & drop your image here, or{' '}
                  <span style={{ color: '#3DD9EB' }}>browse files</span>
                </p>
                <p style={{ fontSize: 13, color: '#475569' }}>Supports JPG, PNG, WEBP · Max 10MB</p>
              </div>
            </div>
          ) : (
            /* Preview state */
            <AnimatePresence mode="wait">
              <motion.div key="preview"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
              >
                {/* Image preview with scan overlay */}
                <div style={{
                  position: 'relative', borderRadius: 16, overflow: 'hidden',
                  border: '1px solid rgba(61,217,235,0.2)',
                  background: '#080d14',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  maxHeight: 300,
                }}>
                  <img src={previewUrl} alt="Preview"
                    style={{ maxHeight: 300, width: 'auto', objectFit: 'contain', display: 'block' }} />
                  {/* Scan line */}
                  {!isLoading && (
                    <div style={{
                      position: 'absolute', left: 0, right: 0, height: 2,
                      background: 'linear-gradient(90deg, transparent, #3DD9EB, transparent)',
                      animation: 'scanBeam 2.5s ease-in-out infinite',
                      boxShadow: '0 0 12px #3DD9EB',
                    }} />
                  )}
                </div>

                {/* File info */}
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
                      width: 34, height: 34, borderRadius: 8, border: 'none', cursor: 'pointer',
                      background: 'rgba(255,77,109,0.1)', color: '#FF4D6D',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.2s', flexShrink: 0,
                    }}
                    onMouseEnter={e => { if (!isLoading) e.currentTarget.style.background = 'rgba(255,77,109,0.2)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,77,109,0.1)'; }}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          )}

          {/* Loading */}
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
