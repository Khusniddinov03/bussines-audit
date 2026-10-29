import React, { useState, useMemo } from 'react';
import { 
  Sliders, 
  TrendingDown, 
  TrendingUp,
  DollarSign, 
  Percent, 
  Sparkles, 
  RefreshCw, 
  Zap,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { calculateAudit } from '../utils/auditEngine';

export default function SimulatorModal({ baseData, baseResult, onApplySimulation }) {
  const [simData, setSimData] = useState({
    ...baseData,
    hasCrm: 'full_crm',
    hasSalesTeam: 'full_dept',
    responseSpeed: 'fast_5m',
    hasSalesScript: 'yes',
    conversionRate: Math.min(65, Math.round(baseData.conversionRate * 1.25)),
    averageTicket: Math.round(baseData.averageTicket * 1.15)
  });

  const simResult = useMemo(() => calculateAudit(simData), [simData]);

  // Deltas
  const budgetSavedMonthly = baseResult.budget.realOptimal - simResult.budget.realOptimal;
  const netProfitDeltaMonthly = simResult.unitEconomics.netProfitAfterRealAds - baseResult.unitEconomics.netProfitAfterRealAds;
  const leadsSaved = baseResult.funnel.requiredLeads - simResult.funnel.requiredLeads;
  const healthDelta = simResult.performance.healthScore - baseResult.performance.healthScore;

  const applyQuickScenario = (type) => {
    if (type === 'fix_system') {
      setSimData({
        ...baseData,
        hasCrm: 'full_crm',
        hasSalesTeam: 'full_dept',
        responseSpeed: 'fast_5m',
        hasSalesScript: 'yes'
      });
    } else if (type === 'boost_metrics') {
      setSimData({
        ...baseData,
        hasCrm: 'full_crm',
        hasSalesTeam: 'full_dept',
        conversionRate: Math.min(65, baseData.conversionRate + 10),
        averageTicket: Math.round(baseData.averageTicket * 1.25)
      });
    } else if (type === 'scale_2x') {
      setSimData({
        ...baseData,
        hasCrm: 'full_crm',
        hasSalesTeam: 'full_dept',
        responseSpeed: 'fast_5m',
        socialStatus: 'excellent',
        hasDatabaseRetention: 'active',
        targetRevenue: baseData.targetRevenue * 2,
        conversionRate: Math.max(baseData.conversionRate, baseResult.industry.top10Conversion)
      });
    } else {
      setSimData({ ...baseData });
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Control Header */}
      <div className="glass-panel rounded-2xl p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-indigo-400" />
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              🎛️ "What-If" Biznes & Foyda Simulyatori
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Ko'rsatkichlarni o'zgartirib ko'ring: CRM o'rnatilsa, konversiya oshsa yoki o'rtacha chek ko'tarilsa qancha sof foyda qoladi?
          </p>
        </div>

        {/* Quick Scenario Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => applyQuickScenario('fix_system')}
            className="px-3 py-2 rounded-xl text-xs font-bold bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-300 border border-indigo-500/30 transition"
          >
            🛠️ Faqat CRM + Sotuvchi qo'shish
          </button>
          <button
            type="button"
            onClick={() => applyQuickScenario('boost_metrics')}
            className="px-3 py-2 rounded-xl text-xs font-bold bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 transition"
          >
            📈 Konversiya +10% & Chek +25%
          </button>
          <button
            type="button"
            onClick={() => applyQuickScenario('scale_2x')}
            className="px-3 py-2 rounded-xl text-xs font-bold bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 transition"
          >
            🚀 2x Masshtablash (Top 10%)
          </button>
          <button
            type="button"
            onClick={() => applyQuickScenario('reset')}
            className="p-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
            title="Boshlang'ich holatga qaytarish"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main 12-Col Simulator Workspace */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left 7 Columns: Interactive Sliders & System Toggles */}
        <div className="xl:col-span-7 glass-panel rounded-2xl p-6 space-y-6">
          <div className="text-xs font-extrabold uppercase tracking-wider text-indigo-400 border-b border-slate-800 pb-3">
            1. Parametrlarni Boshqarish (Slayderlar)
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Slider 1: Conversion Rate */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/90 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <Percent className="w-3.5 h-3.5 text-amber-400" />
                  Sotuv konversiyasi
                </span>
                <span className="text-base font-extrabold text-amber-400 font-mono">
                  {simData.conversionRate}%
                </span>
              </div>
              <input
                type="range"
                min="3"
                max="70"
                step="1"
                value={simData.conversionRate}
                onChange={(e) => setSimData(prev => ({ ...prev, conversionRate: Number(e.target.value) }))}
                className="w-full"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>Hozir: {baseData.conversionRate}%</span>
                <span>Top 10%: {baseResult.industry.top10Conversion}%</span>
              </div>
            </div>

            {/* Slider 2: Average Ticket */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/90 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                  O'rtacha chek ($)
                </span>
                <span className="text-base font-extrabold text-emerald-400 font-mono">
                  ${simData.averageTicket}
                </span>
              </div>
              <input
                type="range"
                min={Math.max(5, Math.round(baseData.averageTicket * 0.4))}
                max={Math.round(baseData.averageTicket * 3)}
                step={baseData.averageTicket >= 200 ? 25 : 5}
                value={simData.averageTicket}
                onChange={(e) => setSimData(prev => ({ ...prev, averageTicket: Number(e.target.value) }))}
                className="w-full"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>Hozir: ${baseData.averageTicket}</span>
                <span>+25% Upsell: ${Math.round(baseData.averageTicket * 1.25)}</span>
              </div>
            </div>

            {/* Slider 3: Target Revenue */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/90 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
                  Daromad maqsadi ($)
                </span>
                <span className="text-base font-extrabold text-indigo-400 font-mono">
                  ${simData.targetRevenue.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min={Math.max(1000, Math.round(baseData.targetRevenue * 0.5))}
                max={Math.round(baseData.targetRevenue * 3)}
                step="1000"
                value={simData.targetRevenue}
                onChange={(e) => setSimData(prev => ({ ...prev, targetRevenue: Number(e.target.value) }))}
                className="w-full"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>Hozirgi maqsad: ${baseData.targetRevenue.toLocaleString()}</span>
                <span>2x: ${(baseData.targetRevenue * 2).toLocaleString()}</span>
              </div>
            </div>

            {/* Slider 4: Profit Margin */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/90 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <Percent className="w-3.5 h-3.5 text-purple-400" />
                  Sof marjinallik (%)
                </span>
                <span className="text-base font-extrabold text-purple-400 font-mono">
                  {simData.profitMargin}%
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="85"
                step="5"
                value={simData.profitMargin}
                onChange={(e) => setSimData(prev => ({ ...prev, profitMargin: Number(e.target.value) }))}
                className="w-full"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>Hozir: {baseData.profitMargin}%</span>
                <span>Soha: {baseResult.industry.defaultMargin}%</span>
              </div>
            </div>
          </div>

          {/* System Toggles */}
          <div className="pt-2 space-y-3">
            <div className="text-xs font-extrabold uppercase tracking-wider text-indigo-400 border-b border-slate-800 pb-2">
              2. Tizim & Infratuzilma Kalitlari
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Toggle CRM */}
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">📂 CRM Tizimi (AmoCRM)</div>
                  <div className="text-[10px] text-slate-400">20% lid yo'qotilishini to'xtatadi</div>
                </div>
                <button
                  type="button"
                  onClick={() => setSimData(prev => ({ ...prev, hasCrm: prev.hasCrm === 'full_crm' ? 'no' : 'full_crm' }))}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    simData.hasCrm === 'full_crm'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-red-500/20 text-red-300 border border-red-500/40'
                  }`}
                >
                  {simData.hasCrm === 'full_crm' ? '✅ Yoqilgan' : '❌ O\'chirilgan'}
                </button>
              </div>

              {/* Toggle Sales Team */}
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">👥 Sotuv Bo'limi & ROP</div>
                  <div className="text-[10px] text-slate-400">20% konversiya jarimasini yechadi</div>
                </div>
                <button
                  type="button"
                  onClick={() => setSimData(prev => ({ ...prev, hasSalesTeam: prev.hasSalesTeam === 'full_dept' ? 'founder_only' : 'full_dept' }))}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    simData.hasSalesTeam === 'full_dept'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-red-500/20 text-red-300 border border-red-500/40'
                  }`}
                >
                  {simData.hasSalesTeam === 'full_dept' ? '✅ Yoqilgan' : '❌ O\'zim sotaman'}
                </button>
              </div>

              {/* Toggle SLA */}
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">⚡ 5 Daqiqalik SLA Javob</div>
                  <div className="text-[10px] text-slate-400">Issiq lidlar sovib qolmasligi uchun</div>
                </div>
                <button
                  type="button"
                  onClick={() => setSimData(prev => ({ ...prev, responseSpeed: prev.responseSpeed === 'fast_5m' ? 'slow_hours' : 'fast_5m' }))}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    simData.responseSpeed === 'fast_5m'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-red-500/20 text-red-300 border border-red-500/40'
                  }`}
                >
                  {simData.responseSpeed === 'fast_5m' ? '✅ 5 daqiqa' : '🐢 2+ soat'}
                </button>
              </div>

              {/* Toggle LTV */}
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">🔄 Qayta Sotuv (LTV Bazasi)</div>
                  <div className="text-[10px] text-slate-400">Eski mijozlarga takroriy sotuv</div>
                </div>
                <button
                  type="button"
                  onClick={() => setSimData(prev => ({ ...prev, hasDatabaseRetention: prev.hasDatabaseRetention === 'active' ? 'no' : 'active' }))}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    simData.hasDatabaseRetention === 'active'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-red-500/20 text-red-300 border border-red-500/40'
                  }`}
                >
                  {simData.hasDatabaseRetention === 'active' ? '✅ Faol LTV' : '❌ Yo\'q'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right 5 Columns: Live Comparison Results */}
        <div className="xl:col-span-5 glass-panel rounded-2xl p-6 border border-indigo-500/40 space-y-5 relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400">
                Jonli Taqqoslov Natijasi
              </span>
              <h4 className="text-lg font-extrabold text-white">
                Hozirgi Holat vs Simulyatsiya
              </h4>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-mono text-xs font-bold">
              {simResult.performance.healthScore} ball ({healthDelta >= 0 ? `+${healthDelta}` : healthDelta})
            </span>
          </div>

          {/* Comparison Cards */}
          <div className="space-y-3">
            {/* 1. Optimal Budget */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-400">Zarur Reklama Byudjeti</div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-extrabold text-white font-mono">
                    ${simResult.budget.realOptimal.toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-500 line-through font-mono">
                    ${baseResult.budget.realOptimal.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-lg inline-block font-mono ${
                  budgetSavedMonthly >= 0 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                }`}>
                  {budgetSavedMonthly >= 0 
                    ? `-$${budgetSavedMonthly.toLocaleString()} tejaldi` 
                    : `+$${Math.abs(budgetSavedMonthly).toLocaleString()}`}
                </span>
              </div>
            </div>

            {/* 2. Required Leads & CAC */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                <div className="text-[11px] text-slate-400">Kerakli Lidlar</div>
                <div className="text-xl font-extrabold text-amber-400 font-mono mt-0.5">
                  {simResult.funnel.requiredLeads} ta
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  Oldin: {baseResult.funnel.requiredLeads} ta ({leadsSaved >= 0 ? `-${leadsSaved}` : `+${Math.abs(leadsSaved)}`})
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                <div className="text-[11px] text-slate-400">1 Mijoz Narxi (CAC)</div>
                <div className="text-xl font-extrabold text-indigo-400 font-mono mt-0.5">
                  ${simResult.unitEconomics.realCAC}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  Oldin: ${baseResult.unitEconomics.realCAC}
                </div>
              </div>
            </div>

            {/* 3. Net Profit After Ads */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/50 via-slate-900 to-slate-900 border border-emerald-500/30">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-300">
                  Reklamadan Keyingi Sof Marjinal Foyda:
                </span>
                <span className="text-xs font-mono text-emerald-400 font-bold">
                  ROAS: {simResult.unitEconomics.projectedROAS}x
                </span>
              </div>
              <div className="flex items-baseline justify-between mt-2">
                <div>
                  <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                    ${simResult.unitEconomics.netProfitAfterRealAds.toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-400"> / oy</span>
                </div>
                {netProfitDeltaMonthly > 0 && (
                  <span className="text-xs font-extrabold text-emerald-400 font-mono">
                    +${netProfitDeltaMonthly.toLocaleString()}/oy o'sish!
                  </span>
                )}
              </div>
            </div>

            {/* 4. 12-Month Cumulative Benefit */}
            <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-indigo-200">
                  1 Yillik Qo'shimcha Moliyaviy Foyda:
                </div>
                <div className="text-[11px] text-slate-400">
                  Ushbu o'zgarishlarning 12 oylik samarasi
                </div>
              </div>
              <div className="text-xl font-extrabold text-emerald-400 font-mono">
                +${Math.max(0, netProfitDeltaMonthly * 12).toLocaleString()}
              </div>
            </div>
          </div>

          {onApplySimulation && (
            <button
              type="button"
              onClick={() => onApplySimulation(simData)}
              className="w-full py-3 px-4 rounded-xl text-xs font-extrabold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/25 transition flex items-center justify-center gap-2"
            >
              <span>Ushbu Parametrlarni Asosiy Hisobotga Qo'llash</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
