import React, { useMemo } from 'react';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  DollarSign, 
  Flame, 
  Sparkles, 
  TrendingUp, 
  Users,
  Zap,
  ShieldAlert
} from 'lucide-react';
import { calculateAudit } from '../utils/auditEngine';

export default function LiveDiagnosticSidebar({ formData, onQuickSubmit }) {
  const liveAudit = useMemo(() => calculateAudit(formData), [formData]);

  const { funnel, budget, performance, penalties, unitEconomics, industry } = liveAudit;

  const score = performance.healthScore;
  const strokeColor = score < 50 ? '#ef4444' : score < 75 ? '#f59e0b' : '#10b981';

  return (
    <aside className="space-y-5 sticky top-24">
      {/* Live Monitor Card */}
      <div className="glass-panel rounded-2xl p-5 sm:p-6 shadow-2xl relative overflow-hidden border border-slate-800/90">
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-300">
              Jonli Diagnostika Monitori
            </span>
          </div>
          <span className="text-[11px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
            Real-Time
          </span>
        </div>

        {/* Live Health Score & Risk */}
        <div className="py-4 flex items-center justify-between gap-4 border-b border-slate-800/80">
          <div>
            <div className="text-xs text-slate-400">Biznes Salomatligi</div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-extrabold text-white font-mono">
                {score}
              </span>
              <span className="text-xs text-slate-500">/ 100 ball</span>
            </div>
            <div className={`mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${performance.riskLevel.bg}`}>
              <span>{performance.riskLevel.badge}</span>
            </div>
          </div>

          {/* Mini radial bar */}
          <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
            <svg className="w-20 h-20 transform -rotate-90">
              <circle
                cx="40"
                cy="40"
                r="32"
                stroke="currentColor"
                strokeWidth="7"
                fill="transparent"
                className="text-slate-800"
              />
              <circle
                cx="40"
                cy="40"
                r="32"
                stroke={strokeColor}
                strokeWidth="7"
                strokeDasharray={2 * Math.PI * 32}
                strokeDashoffset={2 * Math.PI * 32 * (1 - score / 100)}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-500 ease-out"
              />
            </svg>
            <Activity className="w-5 h-5 text-slate-300 absolute" />
          </div>
        </div>

        {/* Live Funnel Math */}
        <div className="py-4 space-y-3 border-b border-slate-800/80">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
            <span>Voronka Hisob-kitobi</span>
            <span className="text-indigo-400 font-mono">{industry.shortName}</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800/80">
              <div className="text-[11px] text-slate-400">Kerakli mijozlar</div>
              <div className="text-lg font-extrabold text-white font-mono mt-0.5">
                {funnel.requiredClients} <span className="text-xs font-normal text-slate-400">ta</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                Kuniga ~{funnel.dailyClientsNeeded} ta sotuv
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800/80">
              <div className="text-[11px] text-slate-400">Kerakli lidlar</div>
              <div className="text-lg font-extrabold text-amber-400 font-mono mt-0.5">
                {funnel.requiredLeads} <span className="text-xs font-normal text-slate-400">ta</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                Kuniga ~{funnel.dailyLeadsNeeded} ta lid
              </div>
            </div>
          </div>

          {/* Budget Box */}
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-indigo-950/60 via-slate-900 to-slate-900 border border-indigo-500/30 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300">Minimal byudjet:</span>
              <span className="font-mono font-bold text-white">
                ${budget.realMin.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-indigo-300 font-semibold">Optimal byudjet:</span>
              <span className="font-mono font-extrabold text-emerald-400 text-sm">
                ${budget.realOptimal.toLocaleString()}
              </span>
            </div>
            {budget.totalPenaltyPercent > 0 && (
              <div className="pt-1.5 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                <span className="text-red-400 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5" />
                  Tizimsizlik jarimasi (+{budget.totalPenaltyPercent}%):
                </span>
                <span className="font-mono font-bold text-red-400">
                  +${budget.realWaste.toLocaleString()}/oy
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Active Penalties List */}
        <div className="py-4 space-y-2.5">
          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400">
            <span>Aniqlangan Teshiklar ({penalties.length} ta)</span>
            {budget.totalPenaltyPercent > 0 ? (
              <span className="text-red-400">+{budget.totalPenaltyPercent}% qimmatlashuv</span>
            ) : (
              <span className="text-emerald-400">0% yo'qotish</span>
            )}
          </div>

          {penalties.length > 0 ? (
            <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
              {penalties.map(p => (
                <div 
                  key={p.key} 
                  className="px-3 py-2 rounded-lg bg-red-950/25 border border-red-500/20 flex items-center justify-between gap-2 text-xs"
                >
                  <span className="text-slate-300 truncate flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                    {p.shortLabel}
                  </span>
                  <span className="font-mono font-bold text-red-400 shrink-0">
                    +{p.percent}%
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Barcha operatsion tizimlar a'lo darajada sozlangan!</span>
            </div>
          )}
        </div>

        {/* Instant Jump to Full Report */}
        <button
          type="button"
          onClick={onQuickSubmit}
          className="w-full mt-2 py-3 px-4 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-emerald-500 hover:from-indigo-500 hover:to-emerald-400 shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 group"
        >
          <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
          <span>To'liq Audit Hisobotini Ochish</span>
        </button>
      </div>

      {/* Industry Insight Mini Card */}
      <div className="glass-panel rounded-2xl p-4 border border-slate-800/80 text-xs space-y-1.5">
        <div className="font-bold text-indigo-400 flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5" />
          <span>{industry.shortName}: Soha Siri</span>
        </div>
        <p className="text-slate-300 leading-relaxed text-[11px]">
          <strong>Asosiy og'riq:</strong> {industry.topBottleneck}.
        </p>
      </div>
    </aside>
  );
}
