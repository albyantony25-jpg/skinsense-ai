import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Zap, Menu, X, Sun, Moon, History } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const NAV_LINKS = [
  { label: 'Home',         href: '#hero',     section: 'hero'     },
  { label: 'Features',     href: '#features', section: 'features' },
  { label: 'How It Works', href: '#how',      section: 'how'      },
  { label: 'FAQ',          href: '#faq',      section: 'faq'      },
  { label: 'About',        href: '#about',    section: 'about'    },
];

const GITHUB_URL = 'https://github.com/albyantony25-jpg/skinsense-ai';

export default function Navbar({ onUploadClick, theme, toggleTheme, onHistoryClick }) {
  const [scrolled,       setScrolled]       = useState(false);
  const [menuOpen,       setMenuOpen]       = useState(false);
  const [activeSection,  setActiveSection]  = useState('hero');

  /* ── Scroll detection ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Active section via IntersectionObserver ── */
  useEffect(() => {
    const ids = NAV_LINKS.map(l => l.section);
    const observers = [];

    ids.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: scrolled ? 'rgba(11,17,32,0.85)' : 'transparent',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'all 0.3s ease',
        padding: scrolled ? '12px 0' : '18px 0',
      }}
    >
      <div style={{
        maxWidth: 1200, margin: '0 auto', padding: '0 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="/logo.png" alt="SkinSense AI Logo" style={{ width: 36, height: 36, borderRadius: 10, boxShadow: '0 0 20px rgba(61,217,235,0.4)', objectFit: 'cover' }} />
          <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)' }}>
            <span>Skin</span>
            <span className="text-grad">Sense</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', marginLeft: 3, verticalAlign: 'middle' }}>AI</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="nav-desktop">
          {NAV_LINKS.map(l => {
            const isActive = activeSection === l.section;
            return (
              <a key={l.label} href={l.href}
                style={{
                  padding: '6px 14px', borderRadius: 8, fontSize: 14, fontWeight: isActive ? 600 : 500,
                  color: isActive ? 'var(--primary)' : 'var(--muted)',
                  textDecoration: 'none', transition: 'all 0.2s',
                  background: isActive ? 'rgba(61,217,235,0.08)' : 'transparent',
                  border: isActive ? '1px solid rgba(61,217,235,0.15)' : '1px solid transparent',
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    e.currentTarget.style.color = 'var(--text)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.currentTarget.style.color = 'var(--muted)';
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                {l.label}
              </a>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* History */}
          <button onClick={onHistoryClick} id="history-btn"
            style={{
              width: 36, height: 36, borderRadius: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--muted)', background: 'var(--card)', border: '1px solid var(--border)',
              transition: 'all 0.2s', cursor: 'pointer',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--primary)'; e.currentTarget.style.borderColor = 'rgba(61,217,235,0.4)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
            title="Scan History"
          >
            <History size={16} />
          </button>

          {/* Theme Toggle */}
          <button onClick={toggleTheme} id="theme-toggle-btn"
            style={{
              width: 36, height: 36, borderRadius: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--muted)', background: 'var(--card)', border: '1px solid var(--border)',
              transition: 'all 0.2s', cursor: 'pointer',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--primary)'; e.currentTarget.style.borderColor = 'rgba(61,217,235,0.4)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* GitHub */}
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" id="github-link"
            style={{
              width: 36, height: 36, borderRadius: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--muted)', background: 'var(--card)', border: '1px solid var(--border)',
              transition: 'all 0.2s', textDecoration: 'none',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--primary)'; e.currentTarget.style.borderColor = 'rgba(61,217,235,0.4)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
            title="View on GitHub"
          >
            <FaGithub size={16} />
          </a>

          {/* CTA */}
          <button onClick={onUploadClick} id="nav-upload-btn" className="btn-primary nav-cta-btn"
            style={{ padding: '8px 18px', fontSize: 13 }}>
            <Zap size={14} />
            Analyze Now
          </button>

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(o => !o)} id="mobile-menu-btn"
            className="nav-hamburger"
            style={{
              width: 36, height: 36, borderRadius: 8,
              background: 'var(--card)', border: '1px solid var(--border)',
              color: 'var(--muted)', cursor: 'pointer',
              display: 'none', alignItems: 'center', justifyContent: 'center',
            }}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden', borderTop: '1px solid var(--border)' }}
          >
            <div style={{ padding: '12px 24px 20px', display: 'flex', flexDirection: 'column', gap: 4 }}>
              {NAV_LINKS.map((l, i) => (
                <motion.a key={l.label} href={l.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  style={{
                    padding: '12px 14px', borderRadius: 10, fontSize: 15, fontWeight: 500,
                    color: activeSection === l.section ? 'var(--primary)' : 'var(--muted)',
                    textDecoration: 'none', display: 'block',
                    background: activeSection === l.section ? 'rgba(61,217,235,0.08)' : 'transparent',
                  }}
                >
                  {l.label}
                </motion.a>
              ))}
              <button onClick={() => { onUploadClick(); setMenuOpen(false); }}
                className="btn-primary"
                style={{ padding: '12px', fontSize: 14, marginTop: 8 }}>
                <Zap size={14} /> Analyze Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
          .nav-cta-btn { display: none !important; }
        }
      `}</style>
    </motion.nav>
  );
}
