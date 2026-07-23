import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, Upload } from 'lucide-react';

const FAQS = [
  {
    q: 'How accurate is the AI?',
    a: 'Our MobileNetV2 model achieves approximately 98% validation accuracy on the HAM10000 test set across 5 skin disease categories. However, real-world accuracy may vary based on image quality, lighting conditions, and skin tone diversity. Always treat results as preliminary guidance only.',
  },
  {
    q: 'Can this replace a dermatologist?',
    a: 'No. SkinSense AI is an educational tool designed to provide preliminary insights and increase awareness. It is NOT a substitute for professional medical diagnosis or treatment. Always consult a licensed dermatologist for any skin concerns.',
  },
  {
    q: 'What kind of image should I upload?',
    a: 'Upload a clear, well-lit, close-up photograph of the affected skin area. Good lighting and sharp focus significantly improve prediction accuracy. Avoid blurry, distant, or low-resolution images. Supported formats: JPG, PNG, WEBP — maximum 10MB.',
  },
  {
    q: 'Is my image stored anywhere?',
    a: 'No. Your image is processed in memory during inference and immediately discarded after the prediction. We do not store, log, cache, or retain any uploaded images on our servers. Your privacy is fully protected.',
  },
  {
    q: 'What skin conditions can it detect?',
    a: 'SkinSense classifies 5 conditions: Melanoma (high-risk skin cancer), Nevus (benign mole), Basal Cell Carcinoma (BCC), Eczema (chronic inflammatory condition), and Normal Skin. More disease classes are planned for future releases.',
  },
  {
    q: 'Is SkinSense free to use?',
    a: 'Yes, SkinSense AI is completely free for educational and personal use. This is a research-grade demo built as a KTU final year capstone project using open-source tools including React, FastAPI, and TensorFlow.',
  },
  {
    q: 'Why does the backend sometimes take longer?',
    a: 'SkinSense is hosted on Render\'s free tier, which spins down the backend after periods of inactivity. The first request after inactivity may take 20–40 seconds to cold-start. Subsequent requests are fast (~2s). If the backend is unreachable, the app automatically enters demo mode.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section id="faq" style={{ padding: '80px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 52 }}
        >
          <span className="section-tag" style={{ marginBottom: 16, display: 'inline-flex' }}>
            <HelpCircle size={12} />
            FAQ
          </span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginTop: 16, letterSpacing: '-0.02em' }}>
            Common <span className="text-grad">questions</span>
          </h2>
          <p style={{ color: 'var(--muted)', marginTop: 12, fontSize: 15, maxWidth: 440, margin: '12px auto 0' }}>
            Everything you need to know about SkinSense AI.
          </p>
        </motion.div>

        {/* FAQ items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {FAQS.map((faq, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="glass"
              style={{
                overflow: 'hidden',
                border: open === i ? '1px solid rgba(61,217,235,0.3)' : '1px solid rgba(255,255,255,0.07)',
                transition: 'border-color 0.3s',
              }}
            >
              <button
                id={`faq-item-${i}`}
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: '100%', padding: '18px 22px',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  background: 'transparent', border: 'none', cursor: 'pointer', gap: 16, textAlign: 'left',
                }}
              >
                {/* Number badge */}
                <span style={{
                  flexShrink: 0, width: 26, height: 26, borderRadius: 8,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 800, letterSpacing: '0.02em',
                  background: open === i ? 'rgba(61,217,235,0.15)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${open === i ? 'rgba(61,217,235,0.3)' : 'rgba(255,255,255,0.08)'}`,
                  color: open === i ? 'var(--primary)' : 'var(--muted)',
                  transition: 'all 0.3s',
                }}>
                  {String(i + 1).padStart(2, '0')}
                </span>

                <span style={{ fontSize: 15, fontWeight: 600, color: open === i ? 'var(--text)' : '#CBD5E1', flex: 1 }}>
                  {faq.q}
                </span>

                <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.3 }} style={{ flexShrink: 0 }}>
                  <ChevronDown size={18} style={{ color: open === i ? 'var(--primary)' : 'var(--muted)' }} />
                </motion.div>
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{
                      padding: '0 22px 18px 64px', /* indent to align with question text (26px badge + 16px gap + 22px padding) */
                      borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 14,
                    }}>
                      <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8 }}>{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            marginTop: 48, textAlign: 'center',
            padding: '32px', borderRadius: 20,
            background: 'linear-gradient(135deg, rgba(61,217,235,0.06) 0%, rgba(124,92,252,0.06) 100%)',
            border: '1px solid rgba(61,217,235,0.15)',
          }}
        >
          <p style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>
            Ready to analyze your skin?
          </p>
          <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 20 }}>
            Upload an image and get AI-powered insights in seconds.
          </p>
          <a href="#upload">
            <button className="btn-primary" id="faq-cta-btn" style={{ padding: '13px 28px', fontSize: 14 }}>
              <Upload size={15} />
              Analyze Now
            </button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
