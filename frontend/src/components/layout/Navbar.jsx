import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Zap, Menu, X, Sun, Moon, History } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const NAV_LINKS = [
  { label: 'Home',         href: '#hero'       },
  { label: 'Features',     href: '#features'   },
  { label: 'How It Works', href: '#how'        },
  { label: 'FAQ',          href: '#faq'        },
  { label: 'About',        href: '#about'      },
];

export default function Navbar({ onUploadClick, theme, toggleTheme, onHistoryClick }) {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: scrolled ? 'var(--bg2)' : 'transparent',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'all 0.3s ease',
        padding: scrolled ? '12px 0' : '18px 0',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyBetween: 'space-between', justifyContent: 'space-between' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 20px rgba(61,217,235,0.4)',
          }}>
            <Activity size={18} color="#050816" />
          </div>
          <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)' }}>
            <span>Skin</span>
            <span className="text-grad">Sense</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 6 }} className="hidden-mobile">
          {NAV_LINKS.map(l => (
            <a key={l.label} href={l.href}
              style={{
                padding: '6px 14px', borderRadius: 8, fontSize: 14, fontWeight: 500,
                color: 'var(--muted)', textDecoration: 'none', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.target.style.color = 'var(--text)'; e.target.style.background = 'rgba(255,255,255,0.05)'; }}
              onMouseLeave={e => { e.target.style.color = 'var(--muted)'; e.target.style.background = 'transparent'; }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* History Button */}
          <button onClick={onHistoryClick}
            style={{
              width: 36, height: 36, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--muted)', background: 'var(--card)', border: '1px solid var(--border)',
              transition: 'all 0.2s', cursor: 'pointer',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--primary)'; e.currentTarget.style.borderColor = 'var(--primary)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
            title="Scan History"
          >
            <History size={16} />
          </button>

          {/* Theme Toggle */}
          <button onClick={toggleTheme}
            style={{
              width: 36, height: 36, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--muted)', background: 'var(--card)', border: '1px solid var(--border)',
              transition: 'all 0.2s', cursor: 'pointer',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--primary)'; e.currentTarget.style.borderColor = 'var(--primary)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Github Button */}
          <a href="https://github.com" target="_blank" rel="noopener noreferrer"
            style={{
              width: 36, height: 36, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--muted)', background: 'var(--card)', border: '1px solid var(--border)',
              transition: 'all 0.2s', textDecoration: 'none',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--primary)'; e.currentTarget.style.borderColor = 'var(--primary)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
          >
            <FaGithub size={16} />
          </a>

          <button onClick={onUploadClick} className="btn-primary"
            style={{ padding: '8px 18px', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Zap size={14} />
            Upload Image
          </button>

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(o => !o)}
            style={{
              display: 'none', width: 36, height: 36, borderRadius: 8,
              background: 'var(--card)', border: '1px solid var(--border)',
              color: 'var(--muted)', cursor: 'pointer', alignItems: 'center', justifyContent: 'center',
            }}
            id="mobile-menu-btn"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden', borderTop: '1px solid var(--border)' }}
          >
            <div style={{ padding: '12px 24px', display: 'flex', flexDirection: 'column', gap: 4 }}>
              {NAV_LINKS.map(l => (
                <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)}
                  style={{
                    padding: '10px 12px', borderRadius: 8, fontSize: 14, fontWeight: 500,
                    color: 'var(--muted)', textDecoration: 'none',
                  }}>
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          #mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </motion.nav>
  );
}
