import React from 'react';
import { Activity, Heart } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const LINKS = [
  { title: 'Product', items: ['Features', 'How It Works', 'FAQ', 'Pricing'] },
  { title: 'Developers', items: ['API Docs', 'GitHub', 'Changelog', 'Status'] },
  { title: 'Company', items: ['About', 'Privacy Policy', 'Terms', 'Contact'] },
];

export default function Footer({ onUploadClick }) {
  return (
    <footer style={{
      background: '#050816',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '60px 24px 32px',
      position: 'relative',
      zIndex: 2,
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, marginBottom: 48 }}>

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: 'linear-gradient(135deg, #3DD9EB, #00FFA3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Activity size={18} color="#050816" />
              </div>
              <span style={{ fontSize: 20, fontWeight: 800 }}>
                <span style={{ color: '#fff' }}>Skin</span>
                <span className="text-grad">Sense</span>
              </span>
            </div>
            <p style={{ color: '#64748B', fontSize: 14, lineHeight: 1.7, maxWidth: 280 }}>
              AI-powered skin disease classification using deep learning. Built for healthcare innovation.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                style={{
                  width: 36, height: 36, borderRadius: 8,
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#64748B', textDecoration: 'none', transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#3DD9EB'; e.currentTarget.style.borderColor = 'rgba(61,217,235,0.3)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#64748B'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
              >
                <FaGithub size={16} />
              </a>
            </div>
          </div>

          {/* Nav columns */}
          {LINKS.map(col => (
            <div key={col.title}>
              <p style={{ color: '#94A3B8', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>
                {col.title}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {col.items.map(item => (
                  <a key={item} href="#"
                    style={{ color: '#475569', fontSize: 14, textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => { e.target.style.color = '#94A3B8'; }}
                    onMouseLeave={e => { e.target.style.color = '#475569'; }}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.05)',
          paddingTop: 24,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 12,
        }}>
          <p style={{ color: '#334155', fontSize: 13 }}>
            © {new Date().getFullYear()} SkinSense AI. All rights reserved.
          </p>
          <p style={{ color: '#334155', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
            Built with <Heart size={12} style={{ color: '#FF4D6D' }} /> using React · Flask · TensorFlow
          </p>
          <p style={{ color: '#1E293B', fontSize: 12 }}>
            ⚠️ Not a substitute for professional medical advice.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          footer .grid-cols-4 { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
