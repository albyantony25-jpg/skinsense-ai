import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Eye, ZoomIn, Layers } from 'lucide-react';

export default function ImageComparison({ imageUrl }) {
  const [activeTab, setActiveTab] = useState('compare'); // 'original', 'processed', 'compare'
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState(false);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <div style={{ margin: '24px 0', width: '100%' }}>
      <h4 style={{ fontSize: 13, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>
        Neural Image Processing
      </h4>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 16, background: 'var(--bg)', padding: 4, borderRadius: 10, border: '1px solid var(--border)' }}>
        {[
          { id: 'original', label: 'Original', icon: Eye },
          { id: 'processed', label: 'Feature Extraction', icon: Sparkles },
          { id: 'compare', label: 'Interactive Zoom', icon: ZoomIn },
        ].map(t => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                flex: 1, padding: '8px 12px', borderRadius: 8, fontSize: 12, fontWeight: 600,
                border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                background: activeTab === t.id ? 'var(--card)' : 'transparent',
                color: activeTab === t.id ? 'var(--primary)' : 'var(--muted)',
                transition: 'all 0.2s',
              }}
            >
              <Icon size={13} />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Viewport */}
      <div style={{
        position: 'relative', borderRadius: 16, overflow: 'hidden',
        border: '1px solid var(--border)', background: '#020617',
        aspectRatio: '4/3', width: '100%', maxWidth: 460, margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {activeTab === 'original' && (
          <img src={imageUrl} alt="Original" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        )}

        {activeTab === 'processed' && (
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            {/* Base image with medical filters */}
            <img
              src={imageUrl}
              alt="Processed"
              style={{
                width: '100%', height: '100%', objectFit: 'cover',
                filter: 'contrast(1.6) saturate(0.2) brightness(1.2) hue-rotate(180deg)',
              }}
            />
            {/* Glowing contours simulation overlay */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(circle, rgba(0, 255, 163, 0.15) 0%, transparent 80%)',
              mixBlendMode: 'screen', pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute', inset: 0,
              border: '2px solid var(--secondary)', opacity: 0.1,
              animation: 'pulseRing 3s ease-out infinite',
            }} />
          </div>
        )}

        {activeTab === 'compare' && (
          <div
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsZooming(true)}
            onMouseLeave={() => setIsZooming(false)}
            style={{ position: 'relative', width: '100%', height: '100%', cursor: 'zoom-in' }}
          >
            {/* Base Image */}
            <img src={imageUrl} alt="Base" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />

            {/* Lens Guide */}
            {isZooming && (
              <div style={{
                position: 'absolute',
                left: `${zoomPos.x}%`,
                top: `${zoomPos.y}%`,
                width: 100, height: 100,
                border: '2px solid var(--primary)',
                borderRadius: '50%',
                boxShadow: '0 0 15px rgba(61, 217, 235, 0.5), inset 0 0 10px rgba(0,0,0,0.5)',
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
                overflow: 'hidden',
                background: '#020617',
              }}>
                <img
                  src={imageUrl}
                  alt="Zoomed"
                  style={{
                    position: 'absolute',
                    width: '400%', height: '400%',
                    left: `${-zoomPos.x * 4 + 50}%`,
                    top: `${-zoomPos.y * 4 + 50}%`,
                    maxWidth: 'none',
                    objectFit: 'cover',
                  }}
                />
              </div>
            )}
          </div>
        )}
      </div>

      <p style={{ textAlign: 'center', fontSize: 11, color: 'var(--muted)', marginTop: 12 }}>
        {activeTab === 'compare' && 'Hover over the image to inspect lesion border structures.'}
        {activeTab === 'processed' && 'Edge contrast filter applied to expose pigmentation irregularities.'}
        {activeTab === 'original' && 'Unfiltered dermatological input image.'}
      </p>
    </div>
  );
}
