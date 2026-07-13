import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TEXTS = [
  'Loading AI model…',
  'Detecting skin lesion…',
  'Extracting visual features…',
  'Running deep learning inference…',
  'Generating class probabilities…',
  'Assembling your report…',
];

export default function LoadingAnimation({ isLoading }) {
  const [idx, setIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!isLoading) { setIdx(0); setProgress(0); return; }
    const textTimer = setInterval(() => setIdx(i => (i + 1) % TEXTS.length), 1400);
    const progTimer = setInterval(() => setProgress(p => Math.min(p + Math.random() * 8, 95)), 280);
    return () => { clearInterval(textTimer); clearInterval(progTimer); };
  }, [isLoading]);

  /* ── Canvas Neural Network Animation ── */
  useEffect(() => {
    if (!isLoading || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let frame = 0;

    // 3-layer network: input → hidden → output
    const layers = [
      [{ x: 35, y: 25 }, { x: 35, y: 65 }, { x: 35, y: 105 }],
      [{ x: 110, y: 15 }, { x: 110, y: 48 }, { x: 110, y: 81 }, { x: 110, y: 115 }],
      [{ x: 185, y: 45 }, { x: 185, y: 85 }],
    ];

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      // Draw connections (synapses)
      for (let l = 0; l < layers.length - 1; l++) {
        const curr = layers[l];
        const next = layers[l + 1];
        for (let i = 0; i < curr.length; i++) {
          for (let j = 0; j < next.length; j++) {
            // Static synapse line
            ctx.beginPath();
            ctx.moveTo(curr[i].x, curr[i].y);
            ctx.lineTo(next[j].x, next[j].y);
            ctx.strokeStyle = 'rgba(61,217,235,0.12)';
            ctx.lineWidth = 1;
            ctx.stroke();

            // Animated light pulse along synapse
            const t = (frame * 0.018 + (i * 0.3 + j * 0.15)) % 1;
            const px = curr[i].x + (next[j].x - curr[i].x) * t;
            const py = curr[i].y + (next[j].y - curr[i].y) * t;
            ctx.beginPath();
            // ✅ FIXED: ctx.arc() not ctx.circle()
            ctx.arc(px, py, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = l === 0 ? '#3DD9EB' : '#7C5CFC';
            ctx.fill();
          }
        }
      }

      // Draw nodes
      layers.forEach((layer, l) => {
        layer.forEach(node => {
          const pulse = Math.abs(Math.sin(frame * 0.08 + node.y * 0.05)) * 4;
          const nodeColor = l === 2 ? '#00FFA3' : l === 1 ? '#7C5CFC' : '#3DD9EB';
          const glowColor = l === 2 ? 'rgba(0,255,163,0.25)' : l === 1 ? 'rgba(124,92,252,0.25)' : 'rgba(61,217,235,0.25)';

          // Glow ring
          ctx.beginPath();
          ctx.arc(node.x, node.y, 6 + pulse, 0, Math.PI * 2);
          ctx.strokeStyle = glowColor;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Solid node
          ctx.beginPath();
          ctx.arc(node.x, node.y, 5, 0, Math.PI * 2);
          ctx.fillStyle = nodeColor;
          ctx.fill();
        });
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      style={{
        padding: '32px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20,
        background: 'var(--bg2)',
        borderRadius: 20,
        border: '1px solid var(--border)',
        boxShadow: '0 0 40px rgba(61,217,235,0.05)',
      }}
    >
      {/* Neural Net Canvas */}
      <div style={{ position: 'relative', width: 220, height: 140 }}>
        <canvas ref={canvasRef} width="220" height="140" style={{ display: 'block' }} />
        {/* Vignette overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 50%, var(--bg2) 95%)',
          pointerEvents: 'none',
        }} />
      </div>

      {/* Animated status text */}
      <AnimatePresence mode="wait">
        <motion.p key={idx}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          style={{
            color: 'var(--primary)', fontWeight: 600, fontSize: 13,
            minHeight: 20, textAlign: 'center',
          }}
        >
          {TEXTS[idx]}
        </motion.p>
      </AnimatePresence>

      {/* Progress bar */}
      <div style={{ width: '100%', maxWidth: 300 }}>
        <div className="prog-track">
          <motion.div
            className="prog-fill"
            style={{ width: `${progress}%`, background: 'linear-gradient(90deg, var(--primary), var(--secondary), var(--accent))' }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
          <span style={{ fontSize: 11, color: 'var(--muted)' }}>Analyzing…</span>
          <span style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 700 }}>{Math.round(progress)}%</span>
        </div>
      </div>
    </motion.div>
  );
}
