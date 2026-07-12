import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  { q: 'How accurate is the AI?', a: 'Our model achieves 98%+ validation accuracy on the HAM10000 test set across 5 skin disease categories. However, real-world accuracy may vary based on image quality, lighting, and skin tone diversity.' },
  { q: 'Can this replace a dermatologist?', a: 'No. SkinSense is an educational AI tool designed to provide preliminary insights. It is not a substitute for professional medical diagnosis or treatment. Always consult a licensed dermatologist.' },
  { q: 'What kind of image should I upload?', a: 'Upload a clear, well-lit, close-up photo of the affected skin area. Good lighting and focus significantly improve prediction accuracy. Avoid blurry, distant, or low-resolution images. JPG, PNG, and WEBP up to 10MB are supported.' },
  { q: 'Is my image stored anywhere?', a: 'No. Your image is processed in memory during inference and immediately discarded. We do not store, log, or retain any uploaded images. Your privacy is fully protected.' },
  { q: 'What skin conditions can it detect?', a: 'SkinSense classifies 5 conditions: Melanoma (high-risk skin cancer), Nevus (benign mole), Basal Cell Carcinoma (BCC), Eczema, and Normal Skin. More classes are planned for future releases.' },
  { q: 'Is SkinSense free to use?', a: 'Yes, SkinSense is completely free for educational and personal use. This is a research-grade demo built with open-source tools including React, Flask, and TensorFlow.' },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section id="faq" style={{ padding: '80px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 52 }}
        >
          <span className="section-tag" style={{ marginBottom: 16, display: 'inline-flex' }}>FAQ</span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginTop: 16, letterSpacing: '-0.02em' }}>
            Common <span className="text-grad">questions</span>
          </h2>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {FAQS.map((faq, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="glass"
              style={{
                overflow: 'hidden',
                border: open === i ? '1px solid rgba(61,217,235,0.25)' : '1px solid rgba(255,255,255,0.07)',
                transition: 'border-color 0.3s',
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: '100%', padding: '18px 22px',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  background: 'transparent', border: 'none', cursor: 'pointer', gap: 12, textAlign: 'left',
                }}
              >
                <span style={{ fontSize: 15, fontWeight: 600, color: open === i ? '#fff' : '#CBD5E1', flex: 1 }}>
                  {faq.q}
                </span>
                <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.3 }} style={{ flexShrink: 0 }}>
                  <ChevronDown size={18} style={{ color: open === i ? '#3DD9EB' : '#475569' }} />
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
                    <div style={{ padding: '0 22px 18px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 16 }}>
                      <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.8 }}>{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
