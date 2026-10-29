import React, { useState, useRef, useEffect } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  RefreshCw, 
  History, 
  ChevronDown, 
  CheckCircle2, 
  BarChart3, 
  Sliders, 
  Trash2,
  ArrowUpRight
} from 'lucide-react';
import { DEMO_PRESETS } from '../data/benchmarks';

export default function Header({ 
  currentStep, 
  viewMode, 
  onSwitchView, 
  onReset, 
  onLoadPreset, 
  hasResults, 
  savedAudits = [], 
  onSelectSavedAudit,
  onClearSavedAudits
}) {
  const [presetMenuOpen, setPresetMenuOpen] = useState(false);
  const [historyMenuOpen, setHistoryMenuOpen] = useState(false);
  const presetRef = useRef(null);
  const historyRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (presetRef.current && !presetRef.current.contains(e.target)) {
        setPresetMenuOpen(false);
      }
      if (historyRef.current && !historyRef.current.contains(e.target)) {
        setHistoryMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-xl sticky top-0 z-40 print:hidden">
      <div className="max-w-1440 mx-auto px-4 sm:px-6 lg:px-10 2xl:px-12 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div 
          className="flex items-center gap-3.5 cursor-pointer group shrink-0" 
          onClick={onReset}
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 p-[1.5px] shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all duration-300 group-hover:scale-105">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-400 group-hover:text-emerald-400 transition-colors" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base sm:text-lg text-white tracking-tight">
                BIZNES AUDIT
              </span>
              <span className="text-[10px] uppercase font-extrabold tracking-widest px-2 py-0.5 rounded-full bg-gradient-to-r from-indigo-500/20 to-emerald-500/20 text-indigo-300 border border-indigo-500/30">
                PRO 2.5
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-400 hidden xs:block">
              Marketing, Funnel & Unit-Ekonomika Diagnostikasi
            </p>
          </div>
        </div>

        {/* Center Mode Switcher (Desktop) */}
        <div className="hidden md:flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => onSwitchView('wizard')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'wizard'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Diagnostika Savollari</span>
            <span className={`px-1.5 py-0.2 rounded text-[10px] ${
              viewMode === 'wizard' ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-800 text-slate-400'
            }`}>
              {currentStep}/4
            </span>
          </button>

          <button
            type="button"
            onClick={() => onSwitchView('results')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'results'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Audit Hisoboti & Simulyator</span>
            {hasResults && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            )}
          </button>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Demo Presets Dropdown */}
          <div className="relative" ref={presetRef}>
            <button
              type="button"
              onClick={() => setPresetMenuOpen(prev => !prev)}
              className="flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-slate-200 hover:text-white hover:bg-slate-800 border border-slate-700/80 transition shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Tayyor Keyslar</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${presetMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {presetMenuOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 shadow-2xl p-2.5 z-50 animate-scale-in">
                <div className="flex items-center justify-between px-2.5 py-1.5 border-b border-slate-800 mb-1.5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    1-klikda namuna yuklash:
                  </span>
                  <span className="text-[10px] text-indigo-400 font-medium">
                    4 ta real keys
                  </span>
                </div>
                <div className="space-y-1">
                  {DEMO_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => {
                        onLoadPreset(preset.data);
                        setPresetMenuOpen(false);
                      }}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-indigo-600/15 border border-transparent hover:border-indigo-500/30 transition group flex items-start justify-between gap-2"
                    >
                      <div>
                        <div className="font-bold text-xs text-white group-hover:text-indigo-300 flex items-center gap-2">
                          <span>{preset.title}</span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                          {preset.subtitle}
                        </div>
                      </div>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 group-hover:bg-indigo-500/20 group-hover:text-indigo-300 shrink-0">
                        {preset.badge}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Saved Audits History Dropdown */}
          {savedAudits.length > 0 && (
            <div className="relative" ref={historyRef}>
              <button
                type="button"
                onClick={() => setHistoryMenuOpen(prev => !prev)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800 transition"
                title="Saqlangan auditlar tarixi"
              >
                <History className="w-3.5 h-3.5 text-indigo-400" />
                <span className="hidden sm:inline">Tarix</span>
                <span className="px-1.5 py-0.2 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold">
                  {savedAudits.length}
                </span>
              </button>

              {historyMenuOpen && (
                <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 shadow-2xl p-2.5 z-50 animate-scale-in">
                  <div className="flex items-center justify-between px-2.5 py-1.5 border-b border-slate-800 mb-1.5">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Oxirgi hisoblangan auditlar
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        onClearSavedAudits();
                        setHistoryMenuOpen(false);
                      }}
                      className="text-[10px] text-red-400 hover:text-red-300 flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      Tozalash
                    </button>
                  </div>
                  <div className="max-h-64 overflow-y-auto space-y-1">
                    {savedAudits.map((item, idx) => (
                      <button
                        key={item.id || idx}
                        type="button"
                        onClick={() => {
                          onSelectSavedAudit(item);
                          setHistoryMenuOpen(false);
                        }}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-slate-800/90 transition flex items-center justify-between gap-2"
                      >
                        <div>
                          <div className="text-xs font-bold text-white flex items-center gap-1.5">
                            <span>{item.inputs?.businessName || item.industry?.shortName}</span>
                            <span className="text-[10px] font-mono text-emerald-400">
                              ${item.funnel?.targetRevenue?.toLocaleString()}
                            </span>
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {item.industry?.shortName} • Byudjet: ${item.budget?.realOptimal?.toLocaleString()}
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.performance?.riskLevel?.bg || ''}`}>
                            {item.performance?.healthScore} ball
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Reset Button */}
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800 transition"
            title="Yangi audit boshlash"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">Yangi audit</span>
          </button>
        </div>
      </div>
    </header>
  );
}
