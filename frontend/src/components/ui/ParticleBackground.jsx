import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

/* Floating particle dot */
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
      boxShadow: `0 0 ${size * 3}px ${color}`,
    }}
    animate={{ y: [0, -30, 0], opacity: [0.4, 1, 0.4] }}
    transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
  />
);

const PARTICLES = [
  { x: 10, y: 20, size: 3, color: '#3DD9EB', duration: 4,  delay: 0   },
  { x: 85, y: 15, size: 2, color: '#00FFA3', duration: 5,  delay: 0.5 },
  { x: 25, y: 70, size: 4, color: '#7C5CFC', duration: 6,  delay: 1   },
  { x: 70, y: 60, size: 2, color: '#3DD9EB', duration: 3.5,delay: 1.5 },
  { x: 50, y: 85, size: 3, color: '#00FFA3', duration: 5.5,delay: 0.8 },
  { x: 92, y: 45, size: 2, color: '#7C5CFC', duration: 4.5,delay: 2   },
  { x: 15, y: 55, size: 2, color: '#3DD9EB', duration: 6,  delay: 0.3 },
  { x: 60, y: 30, size: 3, color: '#00FFA3', duration: 4,  delay: 1.8 },
  { x: 35, y: 40, size: 2, color: '#7C5CFC', duration: 5,  delay: 0.7 },
  { x: 78, y: 80, size: 4, color: '#3DD9EB', duration: 3,  delay: 2.5 },
];

export default function ParticleBackground() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {/* Grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(61,217,235,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(61,217,235,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
      }} />

      {/* Mouse-follow glow */}
      <div style={{
        position: 'absolute',
        left: mouse.x,
        top: mouse.y,
        width: 500,
        height: 500,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(61,217,235,0.07) 0%, transparent 65%)',
        transform: 'translate(-50%, -50%)',
        transition: 'left 0.1s ease, top 0.1s ease',
        pointerEvents: 'none',
      }} />

      {/* Gradient blobs */}
      <motion.div
        style={{
          position: 'absolute', top: '-20%', left: '-15%',
          width: 700, height: 700, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(61,217,235,0.08) 0%, transparent 70%)',
        }}
        animate={{ x: [0, 60, 0], y: [0, -40, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        style={{
          position: 'absolute', bottom: '-20%', right: '-15%',
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,92,252,0.08) 0%, transparent 70%)',
        }}
        animate={{ x: [0, -50, 0], y: [0, 50, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        style={{
          position: 'absolute', top: '40%', left: '40%',
          width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,255,163,0.05) 0%, transparent 70%)',
        }}
        animate={{ x: [0, 40, -30, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
      />

      {/* Particles */}
      {PARTICLES.map((p, i) => <Particle key={i} {...p} />)}
    </div>
  );
}
