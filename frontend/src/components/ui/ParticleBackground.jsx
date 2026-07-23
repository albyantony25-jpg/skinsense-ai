import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const PARTICLES = [
  { x: 8,  y: 18, size: 3, color: '#3DD9EB', duration: 4.0, delay: 0.0 },
  { x: 85, y: 12, size: 2, color: '#00FFA3', duration: 5.2, delay: 0.5 },
  { x: 22, y: 68, size: 4, color: '#7C5CFC', duration: 6.1, delay: 1.0 },
  { x: 70, y: 58, size: 2, color: '#3DD9EB', duration: 3.7, delay: 1.5 },
  { x: 48, y: 83, size: 3, color: '#00FFA3', duration: 5.5, delay: 0.8 },
  { x: 92, y: 42, size: 2, color: '#7C5CFC', duration: 4.5, delay: 2.0 },
  { x: 13, y: 52, size: 2, color: '#3DD9EB', duration: 6.3, delay: 0.3 },
  { x: 60, y: 28, size: 3, color: '#00FFA3', duration: 4.0, delay: 1.8 },
  { x: 33, y: 38, size: 2, color: '#7C5CFC', duration: 5.0, delay: 0.7 },
  { x: 77, y: 79, size: 4, color: '#3DD9EB', duration: 3.2, delay: 2.5 },
  { x: 5,  y: 85, size: 2, color: '#00FFA3', duration: 4.8, delay: 1.2 },
  { x: 95, y: 72, size: 3, color: '#FF4D6D', duration: 5.8, delay: 0.9 },
  { x: 42, y: 10, size: 2, color: '#3DD9EB', duration: 3.9, delay: 1.7 },
  { x: 67, y: 45, size: 2, color: '#7C5CFC', duration: 6.0, delay: 0.4 },
  { x: 20, y: 95, size: 3, color: '#FFB547', duration: 4.3, delay: 2.1 },
];

const Particle = ({ x, y, size, color, duration, delay }) => (
  <motion.div
    style={{
      position: 'absolute',
      left: `${x}%`,
      top: `${y}%`,
      width: size,
      height: size,
      borderRadius: '50%',
      background: color,
      boxShadow: `0 0 ${size * 4}px ${color}`,
    }}
    animate={{ y: [0, -28, 0], opacity: [0.35, 1, 0.35] }}
    transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
  />
);

export default function ParticleBackground() {
  const [mouse, setMouse] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const onMove = e => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>

      {/* Subtle grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(61,217,235,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(61,217,235,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />

      {/* Aurora blob 1 — cyan/teal */}
      <motion.div
        style={{
          position: 'absolute', top: '-25%', left: '-20%',
          width: 800, height: 800, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(61,217,235,0.09) 0%, rgba(61,217,235,0.03) 40%, transparent 70%)',
        }}
        animate={{ x: [0, 80, -20, 0], y: [0, -50, 30, 0], scale: [1, 1.08, 0.97, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Aurora blob 2 — violet */}
      <motion.div
        style={{
          position: 'absolute', bottom: '-25%', right: '-20%',
          width: 700, height: 700, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,92,252,0.09) 0%, rgba(124,92,252,0.03) 40%, transparent 70%)',
        }}
        animate={{ x: [0, -60, 20, 0], y: [0, 60, -30, 0], scale: [1, 1.1, 0.95, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />

      {/* Aurora blob 3 — green (middle) */}
      <motion.div
        style={{
          position: 'absolute', top: '35%', left: '30%',
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,255,163,0.06) 0%, rgba(0,255,163,0.02) 45%, transparent 70%)',
        }}
        animate={{ x: [0, 50, -40, 0], y: [0, -40, 25, 0] }}
        transition={{ duration: 27, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
      />

      {/* Aurora blob 4 — orange accent (top right) */}
      <motion.div
        style={{
          position: 'absolute', top: '-10%', right: '10%',
          width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,181,71,0.05) 0%, transparent 65%)',
        }}
        animate={{ x: [0, -30, 0], y: [0, 40, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 9 }}
      />

      {/* Mouse-follow cursor glow */}
      <div style={{
        position: 'absolute',
        left: mouse.x,
        top: mouse.y,
        width: 560,
        height: 560,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(61,217,235,0.06) 0%, transparent 65%)',
        transform: 'translate(-50%, -50%)',
        transition: 'left 0.12s ease, top 0.12s ease',
        pointerEvents: 'none',
      }} />

      {/* Particles */}
      {PARTICLES.map((p, i) => <Particle key={i} {...p} />)}
    </div>
  );
}
