import React from 'react';
import { Activity } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 sm:px-6 py-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Activity className="h-6 w-6 text-primary" />
          <span className="text-xl font-extrabold tracking-tight text-slate-800">
            Skin<span className="text-primary">Sense</span>
          </span>
        </div>
        <div>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary-bg text-primary border border-emerald-100/50 shadow-sm">
            AI &middot; Beta
          </span>
        </div>
      </div>
    </nav>
  );
}
