import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  DollarSign, 
  Users, 
  Flame, 
  Share2, 
  Printer, 
  Edit3, 
  Zap, 
  ArrowRight,
  Copy,
  Check,
  Award,
  Activity,
  Target,
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import HealthGauge from './HealthGauge';
import FunnelVisualizer from './FunnelVisualizer';
import RecommendationsList from './RecommendationsList';
import SimulatorModal from './SimulatorModal';
import ShareModal from './ShareModal';

export default function AuditDashboard({ result, onEdit, onReset, onApplySimulation }) {
  const [activeTab, setActiveTab] = useState('summary'); // 'summary' | 'funnel' | 'penalties' | 'simulator' | 'roadmap'
  const [showShareModal, setShowShareModal] = useState(false);
  const [quickCopied, setQuickCopied] = useState(false);

  const {
    id,
    timestamp,
    inputs,
    industry,
    platformObj,
    cpl,
    funnel,
    budget,
    unitEconomics,
    leakage,
    performance,
    logicAlerts = [],
    penalties,
    recommendations
  } = result;

  const handlePrint = () => {
    window.print();
  };

  const handleQuickCopyReport = () => {
    const text = `📊 MARKETING & BUDJET AUDITI (${inputs.businessName || industry.shortName})

🏥 Biznes holati:
• 📂 CRM: ${inputs.hasCrm === 'full_crm' ? '✅ Mavjud' : inputs.hasCrm === 'excel' ? '🟡 Excelda' : '❌ Yo\'q'}
• 👥 Sotuv bo‘limi: ${inputs.hasSalesTeam === 'full_dept' ? '✅ To\'liq bo\'lim' : inputs.hasSalesTeam === 'small_team' ? '👥 1-2 ta menejer' : '❌ Yo\'q, o\'zim sotaman'}
• 📱 Ijtimoiy tarmoq: ${inputs.socialStatus === 'excellent' ? '✅ Ha, zo\'r holatda' : inputs.socialStatus === 'fair' ? '🟡 O\'rtacha' : '❌ Zaif'}
• ⚠️ Xavf darajasi: ${performance.riskLevel.status === 'Yuqori' ? '🔴 Yuqori' : performance.riskLevel.status === 'O\'rta' ? '🟡 O\'rta' : '🟢 Barqaror'}

🎯 Moliyaviy maqsad:
• Oylik daromad: $${funnel.targetRevenue.toLocaleString()}
• O‘rtacha chek: $${funnel.averageTicket}
• Kerakli mijozlar soni: ${funnel.requiredClients} ta

📈 Funnel hisob-kitobi:
• Sotuv konversiyasi: ${funnel.conversionRate}%
• Kerakli lidlar: ${funnel.requiredLeads} ta
• Formula: $${funnel.targetRevenue} / $${funnel.averageTicket} / ${funnel.conversionRate}%

💡 Reklama byudjeti:
• Platforma: ${platformObj?.short || inputs.platformId}
• Lid narxi: $${cpl.min} - $${cpl.max} (Benchmark)
• Minimal byudjet: $${budget.realMin.toLocaleString()}
• Optimal byudjet: $${budget.realOptimal.toLocaleString()}

⚠️ Muhim ogohlantirishlar (Samaradorlik jarimasi):
${penalties.length > 0 ? penalties.map(p => `❌ ${p.label} (+${p.percent}%)`).join('\n') : '✅ Tizimli jarimalar yo\'q'}

${budget.totalPenaltyPercent > 0 ? `Sizda tizim bo'lmagani uchun real byudjet ${budget.totalPenaltyPercent}% ga qimmatroq tushishi mumkin.` : ''}

✅ Tavsiyalar:
${recommendations.slice(0, 4).map((r, i) => `${i + 1}. ${r.title}`).join('\n')}`;

    navigator.clipboard.writeText(text);
    setQuickCopied(true);
    setTimeout(() => setQuickCopied(false), 2500);
  };

  return (
    <div className="w-full max-w-1440 mx-auto space-y-7 animate-fade-in pb-16">
      {/* Executive Command Header */}
      <div className="glass-panel rounded-2xl p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 print:hidden">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono font-bold text-slate-400 bg-slate-900 px-2.5 py-0.5 rounded-md border border-slate-800">
              {id}
            </span>
            <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
              {industry.shortName}
            </span>
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              Kanal: {platformObj?.short || inputs.platformId}
            </span>
            <span className="text-xs text-slate-500 hidden sm:inline">• {timestamp}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1.5">
            {inputs.businessName ? `${inputs.businessName} — ` : ''}Marketing & Budjet Auditi
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handleQuickCopyReport}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-extrabold bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 transition"
          >
            {quickCopied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Hisobot Nusxalandi!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>1-Klikda Matnni Nusxalash</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setShowShareModal(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-extrabold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25 transition"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Telegramga Ulashish</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">PDF / Chop etish</span>
          </button>

          <button
            type="button"
            onClick={onEdit}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Savollarni tahrirlash</span>
          </button>
        </div>
      </div>

      {/* High-Priority Penalty & Waste Alert Banner */}
      {budget.totalPenaltyPercent > 0 && (
        <div className="bg-gradient-to-r from-red-950/70 via-red-900/30 to-slate-900 border border-red-500/35 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-red-500/20 border border-red-500/30 text-red-400 shrink-0">
              <Flame className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-red-400">
                  Samaradorlik Jarimasi Aniqlandi!
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-red-500/25 text-red-200 font-extrabold border border-red-500/40">
                  +{budget.totalPenaltyPercent}% Qimmatlashuv
                </span>
              </div>
              <p className="text-sm sm:text-base text-slate-200 mt-1 leading-relaxed">
                Sizda tizim (CRM / Sotuv bo'limi) to'liq bo'lmagani uchun real byudjet <strong>{budget.totalPenaltyPercent}% ga qimmatroq</strong> tushмоqda: 
                ideal <strong className="text-emerald-400 font-mono">${budget.idealOptimal.toLocaleString()}</strong> o'rniga <strong className="text-red-400 font-mono">${budget.realOptimal.toLocaleString()}</strong> sarflanadi 
                (Har oy <strong className="text-red-400 font-mono">${budget.realWaste.toLocaleString()}</strong>, yiliga <strong className="text-red-400 font-mono">${leakage.annualWastedMoney.toLocaleString()}</strong> yo'qotish).
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start lg:self-center shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab('simulator')}
              className="px-4 py-2.5 rounded-xl text-xs font-extrabold bg-red-500/20 hover:bg-red-500/30 text-red-200 border border-red-500/40 transition flex items-center gap-1.5"
            >
              <span>Simulyatorda tejashni ko'rish</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* 1440px 12-Column Executive Bento KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-5">
        {/* Col 1-3: Health Gauge & Mini Radar */}
        <div className="md:col-span-2 xl:col-span-3">
          <HealthGauge 
            score={performance.healthScore} 
            riskLevel={performance.riskLevel} 
            radarMetrics={performance.radarMetrics} 
          />
        </div>

        {/* Col 4-12: 4 Executive Financial & Funnel Cards */}
        <div className="md:col-span-2 xl:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* KPI 1: Moliyaviy Maqsad */}
          <div className="glass-panel glass-panel-hover rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-[11px] font-extrabold uppercase tracking-wider">Moliyaviy Maqsad</span>
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <DollarSign className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl xl:text-3xl font-extrabold text-white tracking-tight font-mono mt-3">
                ${funnel.targetRevenue.toLocaleString()}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Oylik yalpi daromad (B nuqta)
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Hozirgi (A nuqta):</span>
                <span className="font-mono font-bold text-slate-200">${funnel.currentRevenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">O'rtacha chek:</span>
                <span className="font-mono font-bold text-emerald-400">${funnel.averageTicket}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Kerakli mijozlar:</span>
                <span className="font-mono font-extrabold text-white">{funnel.requiredClients} ta</span>
              </div>
            </div>
          </div>

          {/* KPI 2: Funnel & Lidlar */}
          <div className="glass-panel glass-panel-hover rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-[11px] font-extrabold uppercase tracking-wider">Kerakli Lidlar</span>
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl xl:text-3xl font-extrabold text-amber-400 tracking-tight font-mono mt-3">
                {funnel.requiredLeads.toLocaleString()} <span className="text-sm font-normal text-slate-300">ta</span>
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Sotuv konversiyasi: <strong className="text-white">{funnel.conversionRate}%</strong>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Kunlik lid normasi:</span>
                <span className="font-mono font-bold text-amber-300">~{funnel.dailyLeadsNeeded} ta/kun</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Kunlik sotuv:</span>
                <span className="font-mono font-bold text-indigo-300">~{funnel.dailyClientsNeeded} ta/kun</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Sifatli lidlar (SQL):</span>
                <span className="font-mono font-bold text-slate-200">{funnel.qualifiedLeads} ta</span>
              </div>
            </div>
          </div>

          {/* KPI 3: Reklama Byudjeti (Exact Prompt Match) */}
          <div className="glass-panel glass-panel-hover rounded-2xl p-5 flex flex-col justify-between border-indigo-500/30">
            <div>
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-[11px] font-extrabold uppercase tracking-wider">Reklama Byudjeti</span>
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                  <BarChart3 className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl xl:text-3xl font-extrabold text-white tracking-tight font-mono mt-3">
                ${budget.realOptimal.toLocaleString()}
              </div>
              <div className="text-xs text-indigo-300 font-semibold mt-1">
                Optimal byudjet (Min: ${budget.realMin.toLocaleString()})
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Lid narxi (CPL):</span>
                <span className="font-mono font-bold text-emerald-400">${cpl.min} – ${cpl.max}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Tizimli ideal byudjet:</span>
                <span className="font-mono font-bold text-slate-300">${budget.idealOptimal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Test uchun start:</span>
                <span className="font-mono font-bold text-amber-400">${budget.recommendedTestBudget}</span>
              </div>
            </div>
          </div>

          {/* KPI 4: Unit-Ekonomika & Sof Foyda */}
          <div className="glass-panel glass-panel-hover rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-[11px] font-extrabold uppercase tracking-wider">Sof Marjinal Foyda</span>
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                  <Activity className="w-4 h-4" />
                </div>
              </div>
              <div className={`text-2xl xl:text-3xl font-extrabold tracking-tight font-mono mt-3 ${
                unitEconomics.netProfitAfterRealAds >= 0 ? 'text-emerald-400' : 'text-red-400'
              }`}>
                ${unitEconomics.netProfitAfterRealAds.toLocaleString()}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Reklama chegirilgandan so'ng ({unitEconomics.profitMargin}% marja)
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">1 mijoz narxi (CAC):</span>
                <span className="font-mono font-bold text-white">${unitEconomics.realCAC}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">1 mijozdan marja:</span>
                <span className="font-mono font-bold text-emerald-400">${unitEconomics.grossProfitPerClient}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">ROAS / LTV:CAC:</span>
                <span className="font-mono font-bold text-indigo-300">{unitEconomics.projectedROAS}x / {unitEconomics.ltvCacRatio}x</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800 print:hidden scrollbar-none">
        {[
          { id: 'summary', label: '📊 Audit Xulosasi & Unit-Ekonomika' },
          { id: 'funnel', label: '📈 Funnel & Kunlik Planerka' },
          { id: 'penalties', label: `⚠️ Jarimalar & Teshiklar (+${budget.totalPenaltyPercent}%)` },
          { id: 'simulator', label: '🎛️ "What-If" Foyda Simulyatori' },
          { id: 'roadmap', label: `✅ Yo'l Xaritasi & Sotuv Skripti (${recommendations.length})` }
        ].map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 sm:px-5 py-3 rounded-xl font-extrabold text-xs sm:text-sm whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-slate-900/70 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: SUMMARY + CLASSIC REPORT + UNIT ECONOMICS + BENCHMARKS */}
      {activeTab === 'summary' && (
        <div className="space-y-6 animate-fade-in">
          {/* Logic Anomaly Alerts if any */}
          {logicAlerts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {logicAlerts.map((alert, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border flex items-start gap-3.5 ${
                    alert.type === 'critical'
                      ? 'bg-red-950/40 border-red-500/40 text-red-200'
                      : alert.type === 'warning'
                      ? 'bg-amber-950/30 border-amber-500/30 text-amber-200'
                      : 'bg-indigo-950/30 border-indigo-500/30 text-indigo-200'
                  }`}
                >
                  <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                  <div className="text-xs leading-relaxed">
                    <div className="font-extrabold text-sm text-white mb-0.5">{alert.title}</div>
                    <p className="text-slate-300">{alert.message}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 1440px 12-Col Split: Classic Audit Card (6 cols) + Deep Analytics & Benchmarks (6 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left 6 Cols: Structured Audit Report Card (Exact Prompt Format) */}
            <div className="lg:col-span-6 glass-panel rounded-2xl p-6 sm:p-8 border border-indigo-500/30 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-400">
                    Rasmiy Xulosa Bayonnomasi
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold text-white mt-0.5">
                    📊 MARKETING & BUDJET AUDITI
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={handleQuickCopyReport}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center gap-1.5"
                >
                  {quickCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{quickCopied ? 'Nusxalandi' : 'Nusxa olish'}</span>
                </button>
              </div>

              {/* 1. Biznes holati */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                  🏥 Biznes holati:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm">
                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between">
                    <span className="text-slate-400">📂 CRM:</span>
                    <span className="font-bold text-white">
                      {inputs.hasCrm === 'full_crm' ? '✅ Mavjud' : inputs.hasCrm === 'excel' ? '🟡 Excelda' : '❌ Yo\'q'}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between">
                    <span className="text-slate-400">👥 Sotuv bo‘limi:</span>
                    <span className="font-bold text-white">
                      {inputs.hasSalesTeam === 'full_dept' ? '✅ To\'liq bo\'lim' : inputs.hasSalesTeam === 'small_team' ? '👥 1-2 menejer' : '❌ Yo\'q, o\'zim sotaman'}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between">
                    <span className="text-slate-400">📱 Ijtimoiy tarmoq:</span>
                    <span className="font-bold text-white">
                      {inputs.socialStatus === 'excellent' ? '✅ Ha, zo\'r holatda' : inputs.socialStatus === 'fair' ? '🟡 O\'rtacha' : '❌ Zaif holatda'}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between">
                    <span className="text-slate-400">⚠️ Xavf darajasi:</span>
                    <span className="font-bold text-white">
                      {performance.riskLevel.status === 'Yuqori' ? '🔴 Yuqori' : performance.riskLevel.status === 'O\'rta' ? '🟡 O\'rta' : '🟢 Barqaror'}
                    </span>
                  </div>
                </div>
              </div>

              {/* 2. Moliyaviy maqsad & 3. Funnel hisob-kitobi */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2 text-xs sm:text-sm">
                  <div className="font-extrabold text-indigo-400 uppercase text-xs mb-2">
                    🎯 Moliyaviy maqsad:
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">• Oylik daromad:</span>
                    <strong className="font-mono text-white">${funnel.targetRevenue.toLocaleString()}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">• O‘rtacha chek:</span>
                    <strong className="font-mono text-white">${funnel.averageTicket}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">• Kerakli mijozlar:</span>
                    <strong className="font-mono text-emerald-400">{funnel.requiredClients} ta</strong>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2 text-xs sm:text-sm">
                  <div className="font-extrabold text-amber-400 uppercase text-xs mb-2">
                    📈 Funnel hisob-kitobi:
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">• Sotuv konversiyasi:</span>
                    <strong className="font-mono text-white">{funnel.conversionRate}%</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">• Kerakli lidlar:</span>
                    <strong className="font-mono text-amber-400">{funnel.requiredLeads} ta</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">• Formula:</span>
                    <strong className="font-mono text-indigo-300 text-xs">${funnel.targetRevenue} / ${funnel.averageTicket} / {funnel.conversionRate}%</strong>
                  </div>
                </div>
              </div>

              {/* 4. Reklama byudjeti */}
              <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/30 space-y-2.5 text-xs sm:text-sm">
                <div className="font-extrabold text-emerald-400 uppercase text-xs">
                  💡 Reklama byudjeti:
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex justify-between pr-2">
                    <span className="text-slate-400">• Platforma:</span>
                    <strong className="text-white">{platformObj?.short || inputs.platformId}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">• Lid narxi:</span>
                    <strong className="font-mono text-emerald-400">${cpl.min} - ${cpl.max}</strong>
                  </div>
                  <div className="flex justify-between pr-2">
                    <span className="text-slate-400">• Minimal byudjet:</span>
                    <strong className="font-mono text-white text-base">${budget.realMin.toLocaleString()}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">• Optimal byudjet:</span>
                    <strong className="font-mono text-emerald-400 text-base">${budget.realOptimal.toLocaleString()}</strong>
                  </div>
                </div>
              </div>

              {/* 5. Muhim ogohlantirishlar */}
              <div className="space-y-2">
                <div className="font-extrabold text-red-400 uppercase text-xs">
                  ⚠️ Muhim ogohlantirishlar (Samaradorlik jarimasi):
                </div>
                {penalties.length > 0 ? (
                  <div className="space-y-1.5 text-xs">
                    {penalties.map(p => (
                      <div key={p.key} className="p-2.5 rounded-lg bg-red-950/30 border border-red-500/20 text-slate-200 flex items-center justify-between">
                        <span>❌ {p.label}</span>
                        <strong className="font-mono text-red-400">+{p.percent}%</strong>
                      </div>
                    ))}
                    <p className="text-xs text-amber-300 pt-1 font-medium">
                      Sizda tizim bo'lmagani uchun real byudjet <strong>{budget.totalPenaltyPercent}% ga qimmatroq</strong> tushishi mumkin (Ideal tizimda: ${budget.idealMin} – ${budget.idealOptimal}).
                    </p>
                  </div>
                ) : (
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300">
                    ✅ Jarimalar yo'q — tizimingiz optimal holatda!
                  </div>
                )}
              </div>

              {/* 6. Qisqa Tavsiyalar */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div className="font-extrabold text-emerald-400 uppercase text-xs">
                  ✅ Asosiy Tavsiyalar:
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {recommendations.slice(0, 4).map((r, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="font-bold text-indigo-400">{i + 1}.</span>
                      <span>{r.title} — <strong className="text-emerald-400">{r.impact}</strong></span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right 6 Cols: Unit Economics & Industry Benchmark Comparison */}
            <div className="lg:col-span-6 space-y-6">
              {/* Unit Economics Deep Card */}
              <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400">
                      Moliyaviy Rentabellik Rentgeni
                    </span>
                    <h3 className="text-lg sm:text-xl font-extrabold text-white mt-0.5">
                      🔬 Unit-Ekonomika (1 ta Mijoz Anatomiyasi)
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-xs font-mono font-bold text-indigo-300">
                    ROMI: {unitEconomics.projectedROMI}%
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                    <div className="text-[11px] text-slate-400">O'rtacha Chek (AOV)</div>
                    <div className="text-lg font-extrabold text-white font-mono mt-1">
                      ${funnel.averageTicket}
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                    <div className="text-[11px] text-slate-400">Sof Marja ({unitEconomics.profitMargin}%)</div>
                    <div className="text-lg font-extrabold text-emerald-400 font-mono mt-1">
                      ${unitEconomics.grossProfitPerClient}
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                    <div className="text-[11px] text-slate-400">1 Mijoz Narxi (CAC)</div>
                    <div className="text-lg font-extrabold text-amber-400 font-mono mt-1">
                      ${unitEconomics.realCAC}
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                    <div className="text-[11px] text-slate-400">1-Xariddan Sof Foyda</div>
                    <div className={`text-lg font-extrabold font-mono mt-1 ${
                      unitEconomics.netProfitPerClientFirstSale >= 0 ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      ${unitEconomics.netProfitPerClientFirstSale}
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                    <div className="text-[11px] text-slate-400">Mijoz LTV Qiymati</div>
                    <div className="text-lg font-extrabold text-indigo-400 font-mono mt-1">
                      ${unitEconomics.ltvRevenue}
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                    <div className="text-[11px] text-slate-400">LTV : CAC Nisbati</div>
                    <div className={`text-lg font-extrabold font-mono mt-1 ${
                      unitEconomics.ltvCacRatio >= 3 ? 'text-emerald-400' : 'text-amber-400'
                    }`}>
                      {unitEconomics.ltvCacRatio}x <span className="text-[10px] font-normal text-slate-500">(Norma 3x+)</span>
                    </div>
                  </div>
                </div>

                {/* Ideal vs Real Budget Comparison Bar */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-300">Byudjet Taqqoslovi (Tizimli vs Hozirgi):</span>
                    <span className="text-emerald-400 font-mono font-bold">
                      Farq: ${budget.realWaste.toLocaleString()}/oy
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-slate-400">✅ Tizimli Ideal Byudjet (0% jarima):</span>
                        <span className="font-mono font-bold text-emerald-400">${budget.idealMin} – ${budget.idealOptimal}</span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${Math.round((budget.idealOptimal / budget.realOptimal) * 100)}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-slate-400">⚠️ Hozirgi Real Byudjet (+{budget.totalPenaltyPercent}% jarima):</span>
                        <span className="font-mono font-bold text-red-400">${budget.realMin} – ${budget.realOptimal}</span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-indigo-500 to-red-500 rounded-full w-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Market Benchmark Radar Comparison Card */}
              <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400">
                      Raqobatchilar Tahlili
                    </span>
                    <h3 className="text-lg font-extrabold text-white mt-0.5">
                      🏆 Sizning Biznesingiz vs Top 10% Bozor Liderlari
                    </h3>
                  </div>
                </div>

                <div className="space-y-3">
                  {performance.radarMetrics.map((m) => (
                    <div key={m.id} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-200">{m.label}</span>
                        <div className="font-mono text-[11px] flex items-center gap-2">
                          <span className={m.score >= m.benchmark ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                            Sizda: {m.score}%
                          </span>
                          <span className="text-slate-500">|</span>
                          <span className="text-indigo-300">Top 10%: {m.benchmark}%</span>
                        </div>
                      </div>
                      <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden relative">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${
                            m.score >= m.benchmark ? 'bg-emerald-500' : m.score >= 55 ? 'bg-amber-400' : 'bg-red-500'
                          }`}
                          style={{ width: `${m.score}%` }}
                        />
                        <div
                          className="absolute top-0 bottom-0 w-0.5 bg-indigo-400"
                          style={{ left: `${m.benchmark}%` }}
                          title={`Top 10% norma: ${m.benchmark}%`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: FUNNEL & DAILY QUOTA */}
      {activeTab === 'funnel' && (
        <div className="animate-fade-in">
          <FunnelVisualizer 
            funnel={funnel} 
            budget={budget} 
            unitEconomics={unitEconomics}
            platformName={platformObj?.short || inputs.platformId.toUpperCase()} 
            industry={industry}
          />
        </div>
      )}

      {/* TAB 3: PENALTIES & LEAKAGE */}
      {activeTab === 'penalties' && (
        <div className="space-y-6 animate-fade-in">
          <div className="glass-panel rounded-2xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-red-400">
                  Samaradorlik Jarimalari Rentgeni
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-0.5">
                  ⚠️ Biznesingiz Qayerda Pul Yo'qotmoqda?
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Quyidagi tizimli kamchiliklar reklama byudjetingizni qimmatlashtirmoqda va tayyor mijozlarni raqobatchilarga sovg'a qilmoqda.
                </p>
              </div>

              <div className="px-4 py-2 rounded-xl bg-red-500/15 border border-red-500/30 text-right shrink-0">
                <div className="text-[10px] uppercase font-bold text-red-300">Jami Byudjet Jarimasi</div>
                <div className="text-xl font-extrabold text-red-400 font-mono">+{budget.totalPenaltyPercent}%</div>
              </div>
            </div>

            {penalties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-6">
                {penalties.map(p => {
                  const monthlyLoss = Math.round(budget.idealOptimal * (p.percent / 100));
                  return (
                    <div key={p.key} className="p-5 rounded-2xl bg-slate-950/80 border border-red-500/25 flex flex-col justify-between hover:border-red-500/50 transition">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300">
                            {p.category}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-red-500/20 text-red-300 border border-red-500/30 font-mono">
                            +{p.percent}% Jarima
                          </span>
                        </div>

                        <h4 className="text-base font-extrabold text-white">
                          ❌ {p.label}
                        </h4>
                        <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                          {p.description}
                        </p>

                        {p.solution && (
                          <div className="mt-3 p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-[11px] text-emerald-300">
                            <strong>💡 Yechim:</strong> {p.solution}
                          </div>
                        )}
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                        <span className="text-slate-400">Oylik moliyaviy zarar:</span>
                        <strong className="text-red-400 font-mono text-sm">
                          -${monthlyLoss.toLocaleString()} / oy
                        </strong>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="mt-6 p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-extrabold text-white">Tabriklaymiz! Tizimli Jarimalar Yo'q</h4>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  Sizda CRM, sotuv bo'limi, tezkor aloqa va upakovka to'g'ri yo'lga qo'yilgan. Reklama byudjetingiz 100% samaradorlik bilan ishlaydi.
                </p>
              </div>
            )}

            {/* Total Annual Leakage Callout */}
            <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-red-950/35 to-slate-900 border border-red-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-xs font-extrabold uppercase tracking-wider text-red-400">
                  1 Yillik Umumiy Yo'qotish Прогнози (Byudjet + Boy berilgan mijozlar)
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                  ${leakage.annualWastedMoney.toLocaleString()} <span className="text-xs sm:text-sm font-normal text-slate-400">ortiqcha reklama xarajati / yil</span>
                </div>
                <p className="text-xs text-slate-400">
                  Shuningdek, javobsiz qolgan va sovugan lidlar tufayli oyiga ~{leakage.missedClientsMonthly} ta mijoz (${leakage.missedRevenueMonthly.toLocaleString()}/oy tushum) boy berilmoqda.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveTab('roadmap')}
                className="px-6 py-3 rounded-xl text-xs font-extrabold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20 transition shrink-0 self-start md:self-center"
              >
                Yechimlar va Yo'l Xaritasiga O'tish →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SIMULATOR */}
      {activeTab === 'simulator' && (
        <div className="animate-fade-in">
          <SimulatorModal 
            baseData={inputs} 
            baseResult={result} 
            onApplySimulation={(newSimData) => {
              if (onApplySimulation) {
                onApplySimulation(newSimData);
                setActiveTab('summary');
              }
            }}
          />
        </div>
      )}

      {/* TAB 5: ROADMAP & PLAYBOOKS */}
      {activeTab === 'roadmap' && (
        <div className="animate-fade-in">
          <RecommendationsList 
            recommendations={recommendations} 
            savingsMonthly={budget.realWaste} 
            industry={industry}
          />
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <ShareModal result={result} onClose={() => setShowShareModal(false)} />
      )}
    </div>
  );
}
