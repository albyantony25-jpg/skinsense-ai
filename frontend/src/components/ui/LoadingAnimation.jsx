import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain } from 'lucide-react';

const TEXTS = [
  'Scanning image pixels…',
  'Analyzing pigmentation variation…',
  'Isolating lesion contours…',
  'Feeding feature maps to ResNet model…',
  'Generating soft-max class distributions…',
  'Assembling final report…',
];

export default function LoadingAnimation({ isLoading }) {
  const [idx, setIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!isLoading) { setIdx(0); setProgress(0); return; }
    const textTimer = setInterval(() => setIdx(i => (i + 1) % TEXTS.length), 1200);
    const progTimer = setInterval(() => setProgress(p => Math.min(p + Math.random() * 9, 95)), 300);
    return () => { clearInterval(textTimer); clearInterval(progTimer); };
  }, [isLoading]);

  // Canvas Neural Network Animation
  useEffect(() => {
    if (!isLoading || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let frame = 0;

    // Define simple node coordinates: 3 layers
    const layers = [
      [ {x: 30, y: 30}, {x: 30, y: 70}, {x: 30, y: 110} ], // Input
      [ {x: 110, y: 20}, {x: 110, y: 50}, {x: 110, y: 80}, {x: 110, y: 120} ], // Hidden
      [ {x: 190, y: 45}, {x: 190, y: 95} ] // Output
    ];

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      // Draw Connections (Synapses)
      for (let l = 0; l < layers.length - 1; l++) {
        const curr = layers[l];
        const next = layers[l + 1];
        for (let i = 0; i < curr.length; i++) {
          for (let j = 0; j < next.length; j++) {
            ctx.beginPath();
            ctx.moveTo(curr[i].x, curr[i].y);
            ctx.lineTo(next[j].x, next[j].y);
            ctx.strokeStyle = 'rgba(61, 217, 235, 0.12)';
            ctx.lineWidth = 1;
            ctx.stroke();

            // Animated light pulses passing along synapses
            const progress = (frame * 0.02 + (i + j) * 0.25) % 1;
            const px = curr[i].x + (next[j].x - curr[i].x) * progress;
            const py = curr[i].y + (next[j].y - curr[i].y) * progress;
            ctx.beginPath();
            ctx.circle(px, py, 2);
            ctx.fillStyle = 'var(--primary)';
            ctx.fill();
          }
        }
      }

      // Draw Nodes
      layers.forEach((layer, l) => {
        layer.forEach((node) => {
          ctx.beginPath();
          ctx.circle(node.x, node.y, 5);
          ctx.fillStyle = l === 2 ? 'var(--secondary)' : 'var(--primary)';
          ctx.fill();

          // Node glow pulse
          const pulse = Math.sin(frame * 0.15 + node.y) * 3;
          ctx.beginPath();
          ctx.circle(node.x, node.y, 5 + Math.abs(pulse));
          ctx.strokeStyle = l === 2 ? 'rgba(0, 255, 163, 0.2)' : 'rgba(61, 217, 235, 0.2)';
          ctx.lineWidth = 1;
          ctx.stroke();
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
      }}
    >
      {/* Visual Neural Net Canvas */}
      <div style={{ position: 'relative', width: 220, height: 140 }}>
        <canvas ref={canvasRef} width="220" height="140" style={{ display: 'block' }} />
        
        {/* Overlay scanner effect */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(circle, transparent 40%, var(--bg2) 90%)',
          pointerEvents: 'none',
        }} />
      </div>

      {/* Changing text messages */}
      <AnimatePresence mode="wait">
        <motion.p key={idx}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          style={{ color: 'var(--primary)', fontWeight: 600, fontSize: 13, minHeight: 20, textAlign: 'center' }}
        >
          {TEXTS[idx]}
        </motion.p>
      </AnimatePresence>

      {/* Progress slider bar */}
      <div style={{ width: '100%', maxWidth: 280 }}>
        <div className="prog-track">
          <motion.div
            className="prog-fill"
            style={{ width: `${progress}%`, background: 'linear-gradient(90deg, var(--primary), var(--secondary))' }}
          />
        </div>
        <p style={{ textAlign: 'right', fontSize: 11, color: 'var(--muted)', marginTop: 6 }}>
          {Math.round(progress)}%
        </p>
      </div>
    </motion.div>
  );
}
