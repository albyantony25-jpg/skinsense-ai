import React, { useState, useEffect, useRef } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { motion, useScroll, useSpring } from 'framer-motion';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ParticleBackground from './components/ui/ParticleBackground';
import Hero from './components/sections/Hero';
import TrustSection from './components/sections/TrustSection';
import HowItWorks from './components/sections/HowItWorks';
import UploadSection from './components/sections/UploadSection';
import ResultSection from './components/sections/ResultSection';
import ExplainableAI from './components/sections/ExplainableAI';
import FeaturesSection from './components/sections/FeaturesSection';
import StatsSection from './components/sections/StatsSection';
import FAQ from './components/sections/FAQ';
import About from './components/sections/About';
import ScanHistory from './components/sections/ScanHistory';

import './index.css';
import './App.css';

/* ── Disease metadata ──────────────────────── */
const DISEASE_DETAILS = {
  melanoma: {
    disease: 'melanoma',
    description: 'A serious form of skin cancer that begins in melanocytes (pigment-producing cells). It is the most dangerous type of skin cancer and can spread to other parts of the body.',
    severity: 'high',
    recommendation: 'Seek immediate dermatologist consultation. Early detection is critical for successful treatment.',
    symptoms: ['Asymmetric mole', 'Irregular border', 'Multiple colors', 'Diameter > 6mm', 'Evolving shape or size'],
    medicines: ['Immunotherapy (Pembrolizumab)', 'Targeted therapy (Dabrafenib)', 'Chemotherapy'],
    visitDoctor: true,
  },
  nevus: {
    disease: 'nevus',
    description: 'A common benign (non-cancerous) mole formed by clusters of melanocytes. Most nevus are harmless but should be monitored for changes.',
    severity: 'low',
    recommendation: 'Monitor for changes in size, shape, or color. Schedule annual dermatology check-ups.',
    symptoms: ['Uniform color', 'Defined border', 'Stable size', 'Small diameter', 'No itching or bleeding'],
    medicines: ['No medication required', 'Sunscreen SPF 50+', 'Vitamin D supplement'],
    visitDoctor: false,
  },
  bcc: {
    disease: 'bcc',
    description: 'Basal Cell Carcinoma — the most common form of skin cancer. Develops in the basal cells and is usually found in sun-exposed areas. Rarely spreads but requires treatment.',
    severity: 'moderate',
    recommendation: 'Schedule a dermatology appointment within 2 weeks for proper biopsy and treatment planning.',
    symptoms: ['Pearly or waxy bump', 'Flat flesh-colored lesion', 'Bleeding or scabbing sore', 'Pink growth with raised edges'],
    medicines: ['Topical chemotherapy (5-FU)', 'Photodynamic therapy', 'Surgical excision'],
    visitDoctor: true,
  },
  eczema: {
    disease: 'eczema',
    description: 'A chronic inflammatory skin condition causing red, itchy, and inflamed patches. Often triggered by environmental factors, allergens, or stress.',
    severity: 'moderate',
    recommendation: 'Use fragrance-free moisturizers, identify and avoid triggers. Consult a dermatologist for prescription treatment if severe.',
    symptoms: ['Red, inflamed skin', 'Intense itching', 'Dry, scaly patches', 'Skin thickening', 'Fluid-filled blisters'],
    medicines: ['Topical corticosteroids', 'Antihistamines (Cetirizine)', 'Moisturizing creams (CeraVe)', 'Dupilumab (severe cases)'],
    visitDoctor: false,
  },
  normal: {
    disease: 'normal',
    description: 'No significant skin condition detected in the uploaded image. Your skin appears healthy based on our AI analysis.',
    severity: 'none',
    recommendation: 'Continue regular skincare routine. Apply SPF 30+ sunscreen daily and stay hydrated.',
    symptoms: ['No visible lesions', 'Uniform skin tone', 'Normal texture', 'No inflammation'],
    medicines: ['Sunscreen SPF 30+', 'Gentle cleanser', 'Daily moisturizer'],
    visitDoctor: false,
  },
};

export default function App() {
  const [selectedFile, setSelectedFile]  = useState(null);
  const [previewUrl,   setPreviewUrl]    = useState(null);
  const [isLoading,    setIsLoading]     = useState(false);
  const [result,       setResult]        = useState(null);
  const [isDemoMode,   setIsDemoMode]    = useState(false);

  // Upgrade Level 2 States
  const [theme, setTheme] = useState(() => localStorage.getItem('skinsense_theme') || 'dark');
  const [scanHistory, setScanHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('skinsense_history')) || [];
    } catch {
      return [];
    }
  });
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const resultRef  = useRef(null);
  const uploadRef  = useRef(null);

  /* Scroll progress bar */
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  /* Set HTML attributes on theme change */
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('skinsense_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(t => t === 'dark' ? 'light' : 'dark');
  };

  /* ── Handlers ───────────────────── */
  const handleFileSelect = (file) => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setResult(null);
    setIsDemoMode(false);
  };

  const handleRemove = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedFile(null);
    setPreviewUrl(null);
    setResult(null);
    setIsDemoMode(false);
  };

  const saveScanToHistory = (disease, confidence, severity) => {
    const newRecord = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      disease,
      diseaseName: DISEASE_DETAILS[disease] ? (disease === 'melanoma' ? 'Melanoma' : disease === 'nevus' ? 'Nevus (Benign Mole)' : disease === 'bcc' ? 'Basal Cell Carcinoma' : disease === 'eczema' ? 'Eczema' : 'Normal Skin') : disease,
      confidence,
      severity,
    };
    const updated = [newRecord, ...scanHistory];
    setScanHistory(updated);
    localStorage.setItem('skinsense_history', JSON.stringify(updated));
  };

  const clearHistory = () => {
    setScanHistory([]);
    localStorage.setItem('skinsense_history', JSON.stringify([]));
    toast.success('History cleared');
  };

  const deleteRecord = (id) => {
    const updated = scanHistory.filter(h => h.id !== id);
    setScanHistory(updated);
    localStorage.setItem('skinsense_history', JSON.stringify(updated));
    toast.success('Record removed');
  };

  const handleSelectRecord = (record) => {
    const details = DISEASE_DETAILS[record.disease] || DISEASE_DETAILS.normal;
    // Reconstruct all_probs with the selected disease as high score
    const probs = {};
    Object.keys(DISEASE_DETAILS).forEach(k => {
      probs[k] = k === record.disease ? record.confidence : (1 - record.confidence) / 4;
    });
    setResult({
      ...details,
      confidence: record.confidence,
      all_probs: probs
    });
  };

  const generateMockResult = () => {
    const keys   = Object.keys(DISEASE_DETAILS);
    const picked = keys[Math.floor(Math.random() * keys.length)];
    const top    = parseFloat((0.65 + Math.random() * 0.30).toFixed(4));
    const rest   = 1.0 - top;
    const others = keys.filter(k => k !== picked);
    const w      = others.map(() => Math.random());
    const wSum   = w.reduce((a, b) => a + b, 0);
    const probs  = { [picked]: top };
    let cumOther = 0;
    others.forEach((k, i) => {
      const p = parseFloat(((w[i] / wSum) * rest).toFixed(4));
      probs[k] = p;
      cumOther += p;
    });
    const diff = parseFloat((1.0 - (top + cumOther)).toFixed(4));
    probs[others[0]] = parseFloat((probs[others[0]] + diff).toFixed(4));
    return { ...DISEASE_DETAILS[picked], confidence: top, all_probs: probs };
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    setIsLoading(true);
    setResult(null);
    setIsDemoMode(false);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const res = await fetch('https://skinsense-ai-93p9.onrender.com/predict', {
        method: 'POST', body: formData,
      });
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      if (data?.disease && data.confidence !== undefined) {
        /* Merge rich details */
        const enriched = { ...DISEASE_DETAILS[data.disease], ...data };
        setResult(enriched);
        toast.success('Analysis complete!', { style: { background: 'var(--bg2)', color: 'var(--text)', border: '1px solid rgba(61,217,235,0.3)' } });
        
        // Save scan to history
        saveScanToHistory(data.disease, data.confidence, enriched.severity);
      } else {
        throw new Error('Malformed response');
      }
    } catch (err) {
      console.warn('API failed, using mock:', err);
      await new Promise(r => setTimeout(r, 2000));
      const mockResult = generateMockResult();
      setResult(mockResult);
      setIsDemoMode(true);
      toast('Demo mode — backend offline', { icon: '⚡', style: { background: 'var(--bg2)', color: '#FFB547', border: '1px solid rgba(255,181,71,0.3)' } });
      
      // Save scan to history
      saveScanToHistory(mockResult.disease, mockResult.confidence, mockResult.severity);
    } finally {
      setIsLoading(false);
    }
  };

  /* Scroll to result when ready */
  useEffect(() => {
    if (result && resultRef.current) {
      setTimeout(() => resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' }), 200);
    }
  }, [result]);

  const scrollToUpload = () => uploadRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Background elements */}
      <ParticleBackground />
      <div className="noise" />

      {/* Scroll progress */}
      <motion.div className="scroll-bar" style={{ scaleX, height: '3px', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999 }} />

      {/* Toast */}
      <Toaster position="top-right" />

      {/* Slide-out Scan History */}
      <ScanHistory
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={scanHistory}
        onClearAll={clearHistory}
        onSelectRecord={handleSelectRecord}
        onDeleteRecord={deleteRecord}
      />

      {/* Layout wrapper */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <Navbar
          onUploadClick={scrollToUpload}
          theme={theme}
          toggleTheme={toggleTheme}
          onHistoryClick={() => setIsHistoryOpen(true)}
        />

        <main>
          <Hero onUploadClick={scrollToUpload} />
          <TrustSection />
          <HowItWorks />

          <div ref={uploadRef}>
            <UploadSection
              selectedFile={selectedFile}
              previewUrl={previewUrl}
              isLoading={isLoading}
              onFileSelect={handleFileSelect}
              onRemove={handleRemove}
              onAnalyze={handleAnalyze}
              isDemoMode={isDemoMode}
            />
          </div>

          {result && (
            <div ref={resultRef}>
              <ResultSection result={result} imageUrl={previewUrl} />
              <ExplainableAI result={result} />
            </div>
          )}

          <FeaturesSection />
          <StatsSection />
          <FAQ />
          <About />
        </main>

        <Footer onUploadClick={scrollToUpload} />
      </div>
    </div>
  );
}
