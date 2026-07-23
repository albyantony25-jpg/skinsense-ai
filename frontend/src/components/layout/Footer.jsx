import React from 'react';
import { Activity, Heart, ExternalLink } from 'lucide-react';
import { FaGithub, FaReact, FaPython } from 'react-icons/fa';
import { SiTensorflow, SiFastapi, SiTailwindcss } from 'react-icons/si';

const GITHUB_URL = 'https://github.com/albyantony25-jpg/skinsense-ai';

const LINKS = [
  {
    title: 'Product',
    items: [
      { label: 'Features',     href: '#features' },
      { label: 'How It Works', href: '#how'      },
      { label: 'FAQ',          href: '#faq'      },
      { label: 'About',        href: '#about'    },
    ],
  },
  {
    title: 'Developers',
    items: [
      { label: 'GitHub',      href: GITHUB_URL,                                 external: true },
      { label: 'API Docs',    href: 'https://skinsense-ai-93p9.onrender.com/docs', external: true },
      { label: 'Live Demo',   href: 'https://skinsense-ai-eight.vercel.app',      external: true },
    ],
  },
  {
    title: 'Legal',
    items: [
      { label: 'Disclaimer', href: '#faq' },
      { label: 'Privacy',    href: '#faq' },
    ],
  },
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

        {/* Top grid */}
        <div className="footer-grid" style={{ marginBottom: 48 }}>

          {/* Brand column */}
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
                <span style={{ fontSize: 12, fontWeight: 700, color: '#64748B', marginLeft: 3 }}>AI</span>
              </span>
            </div>
            <p style={{ color: '#64748B', fontSize: 14, lineHeight: 1.7, maxWidth: 280, marginBottom: 20 }}>
              AI-powered skin disease classification using deep learning. Built for healthcare accessibility and innovation.
            </p>

            {/* Tech badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
              {[
                { Icon: FaReact,      label: 'React',      color: '#61DAFB' },
                { Icon: SiFastapi,    label: 'FastAPI',    color: '#009688' },
                { Icon: SiTensorflow, label: 'TensorFlow', color: '#FF9900' },
                { Icon: SiTailwindcss,label: 'Tailwind',   color: '#38BDF8' },
              ].map(({ Icon, label, color }) => (
                <span key={label} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  padding: '4px 10px', borderRadius: 6,
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                  fontSize: 12, color: '#64748B',
                }}>
                  <Icon size={12} style={{ color }} />
                  {label}
                </span>
              ))}
            </div>

            {/* Social */}
            <div style={{ display: 'flex', gap: 10 }}>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer"
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

          {/* Link columns */}
          {LINKS.map(col => (
            <div key={col.title}>
              <p style={{
                color: '#94A3B8', fontSize: 12, fontWeight: 700,
                letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16,
              }}>
                {col.title}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {col.items.map(item => (
                  <a key={item.label} href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    style={{
                      color: '#475569', fontSize: 14, textDecoration: 'none',
                      transition: 'color 0.2s', display: 'inline-flex', alignItems: 'center', gap: 4,
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#94A3B8'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#475569'; }}
                  >
                    {item.label}
                    {item.external && <ExternalLink size={11} style={{ opacity: 0.5 }} />}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div style={{
          padding: '16px 20px', borderRadius: 12, marginBottom: 32,
          background: 'rgba(255,181,71,0.04)', border: '1px solid rgba(255,181,71,0.1)',
        }}>
          <p style={{ fontSize: 12, color: '#64748B', lineHeight: 1.6 }}>
            ⚠️ <strong style={{ color: '#94A3B8' }}>Medical Disclaimer:</strong> SkinSense AI is for educational purposes only. It is NOT a substitute for professional medical diagnosis or advice. Always consult a licensed dermatologist for medical concerns.
          </p>
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
            Built with <Heart size={12} style={{ color: '#FF4D6D' }} /> by the SkinSense Team
          </p>
        </div>
      </div>

      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 40px;
        }
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 600px) {
          .footer-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </footer>
  );
}
