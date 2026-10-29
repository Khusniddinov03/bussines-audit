import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Zap, TrendingUp } from 'lucide-react';
import Header from './components/Header';
import WizardStep from './components/WizardStep';
import AuditDashboard from './components/AuditDashboard';
import { calculateAudit } from './utils/auditEngine';
import { DEMO_PRESETS } from './data/benchmarks';

const DEFAULT_FORM_DATA = {
  businessName: 'Mening Biznesim',
  isBusinessOwner: 'yes',
  hasCrm: 'no',
  hasSalesTeam: 'founder_only',
  responseSpeed: 'slow_hours',
  hasSalesScript: 'no',
  socialStatus: 'excellent',
  hasMarketingTracking: 'no',
  hasDatabaseRetention: 'rarely',
  industryId: 'ecommerce',
  platformId: 'instagram',
  currentRevenue: 4000,
  targetRevenue: 10000,
  averageTicket: 60,
  profitMargin: 35,
  conversionRate: 30,
  customCplMin: null,
  customCplMax: null
};

const STORAGE_KEY_HISTORY = 'biznes_audit_pro_history_v2';

export default function App() {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [currentStep, setCurrentStep] = useState(1);
  const [viewMode, setViewMode] = useState('wizard'); // 'wizard' | 'results'
  const [auditResult, setAuditResult] = useState(() => calculateAudit(DEFAULT_FORM_DATA));
  const [savedAudits, setSavedAudits] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_HISTORY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(savedAudits.slice(0, 10)));
    } catch {
      // ignore storage errors
    }
  }, [savedAudits]);

  const handleFormChange = (updates) => {
    setFormData(prev => {
      const next = { ...prev, ...updates };
      return next;
    });
  };

  const handleNextStep = () => {
    setCurrentStep(prev => Math.min(4, prev + 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToStep = (stepNumber) => {
    setCurrentStep(stepNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const saveAuditToHistory = (result) => {
    setSavedAudits(prev => {
      const filtered = prev.filter(item => item.id !== result.id);
      return [result, ...filtered].slice(0, 8);
    });
  };

  const handleSubmitAudit = () => {
    const result = calculateAudit(formData);
    setAuditResult(result);
    saveAuditToHistory(result);
    setViewMode('results');

    try {
      confetti({
        particleCount: 70,
        spread: 65,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoadPreset = (presetData) => {
    setFormData(presetData);
    const result = calculateAudit(presetData);
    setAuditResult(result);
    saveAuditToHistory(result);
    setViewMode('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSavedAudit = (savedItem) => {
    if (savedItem?.inputs) {
      setFormData(savedItem.inputs);
    }
    setAuditResult(savedItem);
    setViewMode('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearSavedAudits = () => {
    setSavedAudits([]);
    try {
      localStorage.removeItem(STORAGE_KEY_HISTORY);
    } catch {
      // ignore
    }
  };

  const handleApplySimulation = (simData) => {
    setFormData(simData);
    const result = calculateAudit(simData);
    setAuditResult(result);
    saveAuditToHistory(result);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setFormData(DEFAULT_FORM_DATA);
    setCurrentStep(1);
    setViewMode('wizard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEdit = () => {
    setViewMode('wizard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSwitchView = (targetMode) => {
    if (targetMode === 'results') {
      const result = calculateAudit(formData);
      setAuditResult(result);
      setViewMode('results');
    } else {
      setViewMode('wizard');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 bg-grid-pattern text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white relative">
      {/* Ambient Background Glows */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-[130px] pointer-events-none" />

      {/* Navigation Header */}
      <Header
        currentStep={currentStep}
        viewMode={viewMode}
        onSwitchView={handleSwitchView}
        onReset={handleReset}
        onLoadPreset={handleLoadPreset}
        hasResults={Boolean(auditResult)}
        savedAudits={savedAudits}
        onSelectSavedAudit={handleSelectSavedAudit}
        onClearSavedAudits={handleClearSavedAudits}
      />

      {/* Main 1440px Responsive Workspace */}
      <main className="flex-1 max-w-1440 w-full mx-auto px-4 sm:px-6 lg:px-10 2xl:px-12 py-6 sm:py-10 relative z-10">
        {viewMode === 'wizard' ? (
          <div className="space-y-8">
            {/* Compact Hero Header for 1440px Studio */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2">
              <div className="space-y-2.5 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>AI & Unit-Ekonomika Diagnostika Platformasi</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  Biznesingiz Qayerda Pul Yo'qotmoqda va Maqsadga Qancha Byudjet Kerak?
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Savollarga javob bering — o'ng tomondagi jonli monitor real vaqtda voronka matematikasi, reklama byudjeti va samaradorlik jarimalarini hisoblab boradi.
                </p>
              </div>

              {/* Quick 1-Click Demo Pills */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mr-1">
                  Tezkor namuna:
                </span>
                {DEMO_PRESETS.slice(0, 3).map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleLoadPreset(preset.data)}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-900/90 hover:bg-indigo-600/20 text-slate-300 hover:text-indigo-300 border border-slate-800 hover:border-indigo-500/40 transition flex items-center gap-1.5"
                  >
                    <Zap className="w-3 h-3 text-amber-400" />
                    <span>{preset.badge}</span>
                  </button>
                ))}
              </div>
            </div>

            <WizardStep
              currentStep={currentStep}
              formData={formData}
              onChange={handleFormChange}
              onNext={handleNextStep}
              onPrev={handlePrevStep}
              onGoToStep={handleGoToStep}
              onSubmit={handleSubmitAudit}
              totalSteps={4}
            />
          </div>
        ) : (
          <AuditDashboard
            result={auditResult}
            onEdit={handleEdit}
            onReset={handleReset}
            onApplySimulation={handleApplySimulation}
          />
        )}
      </main>

      {/* Executive Footer */}
      <footer className="border-t border-slate-900/90 bg-slate-950/90 py-6 text-xs text-slate-500 print:hidden relative z-10">
        <div className="max-w-1440 mx-auto px-4 sm:px-6 lg:px-10 2xl:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            <span className="font-bold text-slate-300">BIZNES AUDIT PRO 2.5</span>
            <span>— Moliyaviy, Marketing va Sotuv Voronkasi Analitikasi</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400 font-mono text-[11px]">
            <span>Formula: Daromad / Chek / Konversiya</span>
            <span>•</span>
            <span>Unit-Ekonomika (CAC & LTV)</span>
            <span>•</span>
            <span>9 ta Soha Benchmarki</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
