import React, { useState, useRef } from 'react';
import { Upload, FileImage, Trash2, ShieldAlert, Scan, Sparkles, Image } from 'lucide-react';

export default function ImageUpload({
  selectedFile,
  previewUrl,
  onFileSelect,
  onRemove,
  onAnalyze,
  isLoading
}) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

  const handleFile = (file) => {
    if (!file) return;
    if (!allowedTypes.includes(file.type)) {
      setError('Unsupported file type. Please upload a JPG, PNG, or WEBP image.');
      return;
    }
    setError('');
    onFileSelect(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setIsDragActive(true);
    else if (e.type === 'dragleave') setIsDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) handleFile(e.target.files[0]);
  };

  const formatBytes = (bytes, decimals = 1) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
  };

  return (
    <div className="glass-card w-full" style={{ padding: '28px' }}>
      {/* Header */}
      <div className="mb-6 space-y-1">
        <div className="flex items-center gap-2 mb-1">
          <div className="flex items-center justify-center w-7 h-7 rounded-lg"
            style={{ background: 'rgba(52,211,153,0.15)', border: '1px solid rgba(52,211,153,0.25)' }}>
            <Image className="h-3.5 w-3.5" style={{ color: '#34d399' }} />
          </div>
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#34d399' }}>
            Image Input
          </span>
        </div>
        <h2 className="text-xl font-bold" style={{ color: '#f1f5f9', fontFamily: 'Outfit, sans-serif' }}>
          Scan Skin Condition
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>
          Upload a clear, well-lit close-up of the affected area for AI analysis.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 mb-4 px-4 py-3 rounded-xl animate-fade-in"
          style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.25)', color: '#fca5a5' }}>
          <ShieldAlert className="h-4 w-4 flex-shrink-0" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {/* Upload Zone */}
      {!previewUrl ? (
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current.click()}
          className={`upload-zone${isDragActive ? ' drag-active' : ''} flex flex-col items-center justify-center cursor-pointer`}
          style={{ padding: '48px 24px', marginBottom: '20px' }}
        >
          <input ref={fileInputRef} type="file" className="hidden" accept=".jpg,.jpeg,.png,.webp" onChange={handleChange} />

          {/* Icon */}
          <div className="relative mb-5 animate-float">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl transition-all duration-300"
              style={{
                background: isDragActive ? 'rgba(52,211,153,0.2)' : 'rgba(255,255,255,0.05)',
                border: `1px solid ${isDragActive ? 'rgba(52,211,153,0.4)' : 'rgba(255,255,255,0.08)'}`,
                boxShadow: isDragActive ? '0 0 30px rgba(52,211,153,0.3)' : 'none'
              }}>
              <Upload className="h-8 w-8" style={{ color: isDragActive ? '#34d399' : '#475569' }} />
            </div>
          </div>

          <p className="text-sm font-semibold mb-1" style={{ color: '#cbd5e1' }}>
            Drag & drop your image, or{' '}
            <span style={{ color: '#34d399' }}>browse files</span>
          </p>
          <p className="text-xs" style={{ color: '#475569' }}>
            Supports JPG, PNG, WEBP · Max 10MB
          </p>
        </div>
      ) : (
        /* Preview */
        <div className="space-y-3 mb-5 animate-fade-in">
          {/* Image preview with scan overlay */}
          <div className="relative rounded-2xl overflow-hidden scan-overlay"
            style={{
              maxHeight: '280px',
              border: '1px solid rgba(52,211,153,0.2)',
              background: '#080d14',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 0 1px rgba(52,211,153,0.05), inset 0 0 40px rgba(0,0,0,0.4)'
            }}>
            <img
              src={previewUrl}
              alt="Skin area preview"
              style={{ maxHeight: '280px', width: 'auto', objectFit: 'contain', display: 'block' }}
            />
          </div>

          {/* File info row */}
          <div className="flex items-center justify-between px-4 py-3 rounded-xl"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0"
                style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.2)' }}>
                <FileImage className="h-4 w-4" style={{ color: '#34d399' }} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium truncate" style={{ color: '#e2e8f0' }}>
                  {selectedFile?.name}
                </p>
                <p className="text-xs" style={{ color: '#475569' }}>
                  {selectedFile ? formatBytes(selectedFile.size) : ''}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onRemove}
              disabled={isLoading}
              className="flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 disabled:opacity-40"
              style={{ color: '#f87171', background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.2)' }}
              onMouseEnter={e => { if (!isLoading) { e.currentTarget.style.background = 'rgba(248,113,113,0.2)'; e.currentTarget.style.boxShadow = '0 0 10px rgba(248,113,113,0.3)'; } }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(248,113,113,0.1)'; e.currentTarget.style.boxShadow = 'none'; }}
              title="Remove image"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Analyze Button */}
      <button
        id="analyze-btn"
        type="button"
        onClick={onAnalyze}
        disabled={!selectedFile || isLoading}
        className="btn-primary w-full py-4 flex items-center justify-center gap-2 text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
        style={{ letterSpacing: '0.01em' }}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Analyzing Skin Condition...</span>
          </>
        ) : (
          <>
            <Scan className="h-4 w-4" />
            <span>Run AI Analysis</span>
            <Sparkles className="h-4 w-4 opacity-70" />
          </>
        )}
      </button>
    </div>
  );
}
