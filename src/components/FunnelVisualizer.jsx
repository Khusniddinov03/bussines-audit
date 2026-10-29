import React, { useState } from 'react';
import { 
  Eye, 
  MousePointerClick, 
  UserCheck, 
  Filter, 
  CheckCircle2, 
  DollarSign, 
  ArrowDown, 
  Calendar, 
  Clock, 
  Users,
  Sparkles
} from 'lucide-react';

export default function FunnelVisualizer({ funnel, budget, unitEconomics, platformName, industry }) {
  const [period, setPeriod] = useState('monthly'); // 'monthly' | 'daily'

  const divisor = period === 'daily' ? 30 : 1;

  const fmt = (val) => Math.max(1, Math.round(val / divisor)).toLocaleString();

  const stages = [
    {
      id: 'impressions',
      step: '1-Bosqich',
      label: 'Reklama Qamrovi (Impressions)',
      count: fmt(funnel.estimatedImpressions),
      unit: 'marta ko\'rish',
      conversionBadge: '100% Oqim',
      costMetric: `CPM: ~$${((budget.realOptimal / (funnel.estimatedImpressions / 1000)) || 2.5).toFixed(2)}`,
      subtext: `${platformName} da maqsadli auditoriyaga ko'rinish`,
      icon: Eye,
      color: 'from-blue-600/90 to-indigo-600/90',
      widthClass: 'w-full'
    },
    {
      id: 'clicks',
      step: '2-Bosqich',
      label: 'Qiziqish & Kliklar (CTR ~1.25%)',
      count: fmt(funnel.estimatedClicks),
      unit: 'tashrif',
      conversionBadge: 'CTR: 1.25%',
      costMetric: `CPC: ~$${(budget.realOptimal / funnel.estimatedClicks).toFixed(2)}`,
      subtext: 'Reklamani bosib sahifa / bot / Directga o\'tganlar',
      icon: MousePointerClick,
      color: 'from-indigo-600/90 to-violet-600/90',
      widthClass: 'w-full lg:w-[90%]'
    },
    {
      id: 'leads',
      step: '3-Bosqich',
      label: 'Jami Murojaatlar & Lidlar (Leads)',
      count: fmt(funnel.requiredLeads),
      unit: 'ta lid',
      conversionBadge: 'Konv: 9.0%',
      costMetric: `Real CPL: $${(budget.realOptimal / funnel.requiredLeads).toFixed(2)}`,
      subtext: 'Raqam qoldirgan yoki Direct/Telegramdan yozgan barcha murojaatlar',
      icon: UserCheck,
      color: 'from-violet-600/90 to-purple-600/90',
      widthClass: 'w-full lg:w-[80%]'
    },
    {
      id: 'qualified',
      step: '4-Bosqich',
      label: `Sifatli (Kvalifikatsiya) Lidlar (~${industry?.avgQualifiedRate || 70}%)`,
      count: fmt(funnel.qualifiedLeads),
      unit: 'sifatli lid',
      conversionBadge: `${industry?.avgQualifiedRate || 70}% Sifat`,
      costMetric: `SQL narxi: $${(budget.realOptimal / funnel.qualifiedLeads).toFixed(2)}`,
      subtext: 'To\'lovga qodir va haqiqiy ehtiyoji bor maqsadli mijozlar',
      icon: Filter,
      color: 'from-purple-600/90 to-amber-500/90',
      widthClass: 'w-full lg:w-[70%]'
    },
    {
      id: 'deals',
      step: '5-Bosqich',
      label: `Muvaffaqiyatli Sotuvlar (Konversiya: ${funnel.conversionRate}%)`,
      count: period === 'daily' ? funnel.dailyClientsNeeded : funnel.requiredClients.toLocaleString(),
      unit: 'ta xaridor',
      conversionBadge: `Sotuv: ${funnel.conversionRate}%`,
      costMetric: `Real CAC: $${unitEconomics.realCAC}`,
      subtext: `Kassaga pul to'lagan mijozlar (O'rtacha chek: $${funnel.averageTicket})`,
      icon: CheckCircle2,
      color: 'from-amber-500/90 to-emerald-500/90',
      widthClass: 'w-full lg:w-[60%]'
    },
    {
      id: 'revenue',
      step: 'Yakuniy Natija',
      label: period === 'daily' ? 'Kunlik Kassa Tushumi' : 'Oylik Maqsadli Daromad',
      count: `$${fmt(funnel.targetRevenue)}`,
      unit: 'yalpi tushum',
      conversionBadge: `Marja: ${unitEconomics.profitMargin}%`,
      costMetric: `Sof marja: $${fmt(unitEconomics.totalMonthlyGrossProfit)}`,
      subtext: `Reklama chegirilgandan keyingi sof foyda: $${fmt(unitEconomics.netProfitAfterRealAds)}`,
      icon: DollarSign,
      color: 'from-emerald-500 to-teal-400',
      widthClass: 'w-full lg:w-[50%]'
    }
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
      {/* Left 8 Columns: Visual Funnel Pipeline */}
      <div className="xl:col-span-8 glass-panel rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-indigo-400">
              Matematik Voronka Dekompozitsiyasi
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-0.5">
              📈 Reklamadan Kassagacha Bo'lgan Yo'l (Funnel)
            </h3>
          </div>

          {/* Monthly vs Daily Switcher */}
          <div className="inline-flex bg-slate-900 p-1 rounded-xl border border-slate-800 self-start">
            <button
              type="button"
              onClick={() => setPeriod('monthly')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                period === 'monthly'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Oylik (30 kun)</span>
            </button>
            <button
              type="button"
              onClick={() => setPeriod('daily')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                period === 'daily'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Kunlik Norma (1 kun)</span>
            </button>
          </div>
        </div>

        {/* Funnel Bars */}
        <div className="mt-8 space-y-3 flex flex-col items-center">
          {stages.map((stage, idx) => {
            const IconComp = stage.icon;
            return (
              <div key={stage.id} className="w-full flex flex-col items-center">
                <div 
                  className={`${stage.widthClass} p-[1.5px] rounded-2xl bg-gradient-to-r ${stage.color} shadow-lg transition-all duration-300 hover:scale-[1.01]`}
                >
                  <div className="bg-slate-950/95 backdrop-blur-xl rounded-[14px] p-4 sm:px-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start sm:items-center gap-3.5">
                      <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-indigo-400 shrink-0">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                            {stage.step}
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-white">
                            {stage.label}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1">
                          {stage.subtext}
                        </p>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 border-slate-800/80 pt-2 sm:pt-0 shrink-0">
                      <div className="text-lg sm:text-xl font-extrabold text-white font-mono">
                        {stage.count} <span className="text-xs font-normal text-slate-400">{stage.unit}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          {stage.costMetric}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {idx < stages.length - 1 && (
                  <div className="my-1 text-slate-600">
                    <ArrowDown className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Right 4 Columns: Daily Quota & Formula Breakdown */}
      <div className="xl:col-span-4 space-y-6">
        {/* Daily Sales Plan Card */}
        <div className="glass-panel rounded-2xl p-6 border border-indigo-500/30 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-400" />
              <h4 className="text-base font-extrabold text-white">
                Sotuv Bo'limi Kunlik Normasi
              </h4>
            </div>
            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
              Planerka
            </span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Oylik <strong className="text-white">${funnel.targetRevenue.toLocaleString()}</strong> maqsadga chiqish uchun jamoangiz har kuni bajarishi shart bo'lgan reja:
          </p>

          <div className="space-y-2.5">
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-300">1. Kunlik yangi lidlar oqimi:</span>
              <span className="font-mono font-extrabold text-amber-400 text-base">
                {funnel.dailyLeadsNeeded} ta / kun
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-300">2. Kunlik sotuvlar (Bitim):</span>
              <span className="font-mono font-extrabold text-indigo-400 text-base">
                {funnel.dailyClientsNeeded} ta / kun
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-300">3. Kunlik kassa tushumi:</span>
              <span className="font-mono font-extrabold text-emerald-400 text-base">
                ${funnel.dailyRevenueTarget.toLocaleString()} / kun
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-300">4. Tavsiya etilgan sotuvchilar:</span>
              <span className="font-mono font-bold text-white text-sm">
                {Math.max(1, Math.ceil(funnel.dailyLeadsNeeded / 25))} nafar menejer
              </span>
            </div>
          </div>
        </div>

        {/* Formula Explanation Card */}
        <div className="glass-panel rounded-2xl p-6 space-y-3">
          <div className="text-xs font-extrabold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            <span>Aniq Matematik Formula</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2 text-slate-300">
            <div>
              <span className="text-slate-500">// 1. Mijozlar soni:</span>
              <br />
              ${funnel.targetRevenue.toLocaleString()} ÷ ${funnel.averageTicket} = <strong className="text-white">{funnel.requiredClients} ta mijoz</strong>
            </div>
            <div>
              <span className="text-slate-500">// 2. Kerakli lidlar:</span>
              <br />
              {funnel.requiredClients} ÷ {funnel.conversionRate}% = <strong className="text-amber-400">{funnel.requiredLeads} ta lid</strong>
            </div>
            <div>
              <span className="text-slate-500">// 3. Real Byudjet (+{budget.totalPenaltyPercent}% jarima):</span>
              <br />
              {funnel.requiredLeads} lid × CPL × {1 + budget.totalPenaltyPercent / 100} = <strong className="text-emerald-400">${budget.realMin.toLocaleString()} – ${budget.realOptimal.toLocaleString()}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
