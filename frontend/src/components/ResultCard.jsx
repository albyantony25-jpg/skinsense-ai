import React, { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle, Info, ShieldCheck } from 'lucide-react';

const diseaseDisplayNames = {
  melanoma: 'Melanoma',
  nevus: 'Nevus (Benign Mole)',
  bcc: 'Basal Cell Carcinoma (BCC)',
  eczema: 'Eczema',
  normal: 'Normal (No Condition)'
};

const severityStyles = {
  high: {
    label: 'High Risk',
    badge: 'bg-red-50 text-red-700 border-red-150',
    text: 'text-red-700'
  },
  moderate: {
    label: 'Moderate Risk',
    badge: 'bg-orange-50 text-orange-700 border-orange-150',
    text: 'text-orange-750'
  },
  low: {
    label: 'Low Risk',
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-150',
    text: 'text-emerald-700'
  },
  none: {
    label: 'No concern',
    badge: 'bg-teal-50 text-teal-700 border-teal-150',
    text: 'text-teal-700'
  }
};

export default function ResultCard({ result }) {
  const { disease, confidence, description, severity, recommendation, all_probs } = result;
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Reset animation state and trigger on new results
    setAnimate(false);
    const timer = setTimeout(() => setAnimate(true), 50);
    return () => clearTimeout(timer);
  }, [result]);

  const severityInfo = severityStyles[severity] || severityStyles.none;
  const displayName = diseaseDisplayNames[disease] || disease;

  // Convert all probabilities object into a sorted array
  const sortedPredictions = all_probs
    ? Object.entries(all_probs)
        .map(([key, value]) => ({
          key,
          value,
          label: diseaseDisplayNames[key] || key
        }))
        .sort((a, b) => b.value - a.value)
    : [];

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-6 animate-fade-in">
      {/* Header Info */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Analysis Result</p>
          <h2 className="text-2xl font-bold text-slate-800">{displayName}</h2>
        </div>
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-500 ${severityInfo.badge}`}
        >
          {severityInfo.label}
        </span>
      </div>

      {/* Main Confidence Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-slate-500">Analysis Confidence</span>
          <span className="font-bold text-slate-700">{(confidence * 100).toFixed(1)}%</span>
        </div>
        <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
            style={{ width: animate ? `${(confidence * 100).toFixed(1)}%` : '0%' }}
          />
        </div>
      </div>

      {/* Description */}
      <div className="space-y-1.5">
        <h3 className="text-sm font-semibold text-slate-700 flex items-center space-x-1.5">
          <Info className="h-4 w-4 text-slate-400" />
          <span>Condition Overview</span>
        </h3>
        <p className="text-sm leading-relaxed text-slate-600">
          {description}
        </p>
      </div>

      {/* Recommendation Box */}
      <div className="border-l-4 border-primary bg-emerald-50/20 rounded-r-xl p-4 space-y-1">
        <h3 className="text-sm font-bold text-primary flex items-center space-x-1.5">
          <ShieldCheck className="h-4 w-4" />
          <span>Recommended Next Steps</span>
        </h3>
        <p className="text-sm text-slate-750 font-medium">
          {recommendation}
        </p>
      </div>

      {/* All Predictions breakdown */}
      {sortedPredictions.length > 0 && (
        <div className="border-t border-slate-150 pt-5 space-y-4">
          <h3 className="text-sm font-bold text-slate-750">Probability Distribution</h3>
          <div className="space-y-3">
            {sortedPredictions.map((pred) => {
              // Highlight the top prediction (which matches the selected disease or is the first element)
              const isTop = pred.key === disease;
              const barColor = isTop ? 'bg-primary' : 'bg-emerald-200';
              const labelColor = isTop ? 'font-semibold text-slate-800' : 'text-slate-650';

              return (
                <div key={pred.key} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className={labelColor}>{pred.label}</span>
                    <span className={`font-medium ${isTop ? 'text-primary font-bold' : 'text-slate-500'}`}>
                      {(pred.value * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100/50">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ease-out ${barColor}`}
                      style={{ width: animate ? `${(pred.value * 100).toFixed(1)}%` : '0%' }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
