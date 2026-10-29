import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Zap, 
  ChevronDown, 
  ChevronUp, 
  Copy, 
  Check, 
  FileText, 
  Layers, 
  Award,
  Sparkles,
  Target
} from 'lucide-react';

export default function RecommendationsList({ recommendations, savingsMonthly, industry }) {
  const [completedItems, setCompletedItems] = useState({});
  const [expandedItem, setExpandedItem] = useState(1);
  const [copiedScript, setCopiedScript] = useState(false);

  const toggleComplete = (id) => {
    setCompletedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleExpand = (id) => {
    setExpandedItem(prev => prev === id ? null : id);
  };

  const handleCopyScript = () => {
    if (!industry?.salesScript) return;
    navigator.clipboard.writeText(industry.salesScript);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2500);
  };

  const completedCount = Object.values(completedItems).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / recommendations.length) * 100);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
      {/* Left 8 Columns: Actionable Roadmap Steps */}
      <div className="xl:col-span-8 space-y-5">
        <div className="glass-panel rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-400">
              Amaliy Harakatlar Rejasi (90 Kunlik Yo'l Xaritasi)
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-0.5">
              ✅ Bosqichma-Bosqich Tizimlashtirish & Tavsiyalar
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Har bir qadamni bajarganingizda belgilab boring — bu tizimsizlik jarimalarini yo'q qiladi.
            </p>
          </div>

          <div className="flex flex-col items-start sm:items-end shrink-0">
            <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-extrabold flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>Potentsial tejamkorlik: +${savingsMonthly.toLocaleString()}/oy</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1.5 font-mono">
              Bajarildi: {completedCount}/{recommendations.length} ({progressPercent}%)
            </div>
          </div>
        </div>

        {/* Recommendations Accordion Cards */}
        <div className="space-y-4">
          {recommendations.map((rec) => {
            const isDone = completedItems[rec.priority];
            const isExpanded = expandedItem === rec.priority;

            return (
              <div
                key={rec.priority}
                className={`rounded-2xl border transition-all duration-300 ${
                  isDone
                    ? 'border-emerald-500/40 bg-emerald-950/15'
                    : isExpanded
                    ? 'border-indigo-500/50 bg-slate-900/90 shadow-xl shadow-indigo-500/5'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                }`}
              >
                <div 
                  className="p-5 sm:p-6 flex items-start justify-between gap-4 cursor-pointer"
                  onClick={() => toggleExpand(rec.priority)}
                >
                  <div className="flex items-start gap-3.5">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleComplete(rec.priority);
                      }}
                      className={`mt-1 w-6 h-6 rounded-lg border flex items-center justify-center transition shrink-0 ${
                        isDone
                          ? 'border-emerald-500 bg-emerald-500 text-slate-950'
                          : 'border-slate-700 hover:border-indigo-400 bg-slate-800/80 text-transparent'
                      }`}
                      title="Bajarildi deb belgilash"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>

                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                          {rec.priority}-QADAM • {rec.category}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1 bg-slate-800/80 px-2 py-0.5 rounded-full">
                          <Clock className="w-3 h-3 text-amber-400" />
                          {rec.timeline}
                        </span>
                        <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                          {rec.impact}
                        </span>
                      </div>

                      <h4 className={`text-base sm:text-lg font-extrabold tracking-tight ${
                        isDone ? 'line-through text-slate-400' : 'text-white'
                      }`}>
                        {rec.title}
                      </h4>

                      {rec.whyItMatters && (
                        <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                          <strong className="text-slate-300">Nima uchun muhim:</strong> {rec.whyItMatters}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="text-slate-400 hover:text-white p-1 shrink-0">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-5 sm:px-6 pb-6 pt-3 border-t border-slate-800/80 space-y-4 animate-fade-in">
                    <div>
                      <div className="text-[11px] font-extrabold text-indigo-400 uppercase tracking-wider mb-2.5">
                        Aniq bajariladigan amaliy qadamlar (Checklist):
                      </div>
                      <ul className="space-y-2.5">
                        {rec.steps.map((step, sIdx) => (
                          <li key={sIdx} className="text-xs sm:text-sm text-slate-200 flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/60">
                            <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                              {sIdx + 1}
                            </span>
                            <span className="leading-relaxed">{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {rec.deliverable && (
                      <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between text-xs">
                        <span className="text-emerald-300 flex items-center gap-2">
                          <Target className="w-4 h-4 text-emerald-400 shrink-0" />
                          <strong>Kutilayotgan natija:</strong> {rec.deliverable}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Right 4 Columns: Industry Playbook (Sales Script, CRM Stages, KPI) */}
      <div className="xl:col-span-4 space-y-6">
        {/* 1. Ready Sales Script Card */}
        {industry && (
          <div className="glass-panel rounded-2xl p-6 border border-indigo-500/30 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-400" />
                <div>
                  <h4 className="text-sm font-extrabold text-white">
                    Tayyor Sotuv Skripti
                  </h4>
                  <p className="text-[10px] text-slate-400">{industry.shortName} uchun</p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopyScript}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 transition"
              >
                {copiedScript ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Olindi</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Nusxa</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 leading-relaxed italic">
              {industry.salesScript}
            </div>
          </div>
        )}

        {/* 2. Recommended CRM Pipeline Stages */}
        {industry?.crmStages && (
          <div className="glass-panel rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <Layers className="w-5 h-5 text-emerald-400" />
              <div>
                <h4 className="text-sm font-extrabold text-white">
                  AmoCRM / Bitrix24 Voronka Shablon
                </h4>
                <p className="text-[10px] text-slate-400">Sohangiz uchun tavsiya etilgan bosqichlar</p>
              </div>
            </div>

            <div className="space-y-2">
              {industry.crmStages.map((stage, i) => (
                <div 
                  key={i} 
                  className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-2.5 text-xs"
                >
                  <span className="w-5 h-5 rounded-lg bg-emerald-500/15 text-emerald-400 font-mono text-[11px] font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-slate-200 font-medium">{stage}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. Sales Manager KPI Formula */}
        {industry?.kpiFormula && (
          <div className="glass-panel rounded-2xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-amber-400">
              <Award className="w-5 h-5" />
              <h4 className="text-sm font-extrabold text-white">
                Sotuvchi KPI va Motivatsiya Formulasi
              </h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              {industry.kpiFormula}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
