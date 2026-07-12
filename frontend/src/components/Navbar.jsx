import React from 'react';
import { Activity, Zap, GitBranch } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 px-4 sm:px-6 py-4" style={{
      background: 'rgba(8,13,20,0.85)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      boxShadow: '0 1px 0 rgba(52,211,153,0.08)'
    }}>
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2.5">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl"
            style={{
              background: 'linear-gradient(135deg, #34d399, #10b981)',
              boxShadow: '0 0 20px rgba(52,211,153,0.4)'
            }}>
            <Activity className="h-5 w-5 text-black" />
          </div>
          <span className="text-xl font-extrabold tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
            <span className="text-white">Skin</span>
            <span className="text-gradient">Sense</span>
          </span>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
            style={{
              background: 'rgba(52,211,153,0.12)',
              border: '1px solid rgba(52,211,153,0.25)',
              color: '#34d399'
            }}>
            <Zap className="h-3 w-3" />
            AI · Beta
          </span>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200"
            style={{ color: '#64748b', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#34d399'; e.currentTarget.style.borderColor = 'rgba(52,211,153,0.3)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#64748b'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; }}
          >
            <GitBranch className="h-4 w-4" />
          </a>
        </div>
      </div>
    </nav>
  );
}
