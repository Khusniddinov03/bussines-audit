import React, { useState } from 'react';
import { Copy, Check, Send, X, Share2, FileText } from 'lucide-react';

export default function ShareModal({ result, onClose }) {
  const [copied, setCopied] = useState(false);
  const [reportStyle, setReportStyle] = useState('classic'); // 'classic' | 'detailed'

  const {
    inputs,
    industry,
    platformObj,
    cpl,
    funnel,
    budget,
    unitEconomics,
    performance,
    penalties,
    recommendations
  } = result;

  const classicReport = `📊 MARKETING & BUDJET AUDITI (${inputs.businessName || industry.shortName})

🏥 Biznes holati:
• 📂 CRM: ${inputs.hasCrm === 'full_crm' ? '✅ Mavjud' : inputs.hasCrm === 'excel' ? '🟡 Excelda' : '❌ Yo\'q'}
• 👥 Sotuv bo‘limi: ${inputs.hasSalesTeam === 'full_dept' ? '✅ To\'liq bo\'lim' : inputs.hasSalesTeam === 'small_team' ? '👥 1-2 ta menejer' : '❌ Yo\'q, o\'zim sotaman'}
• 📱 Ijtimoiy tarmoq: ${inputs.socialStatus === 'excellent' ? '✅ Ha, zo\'r holatda' : inputs.socialStatus === 'fair' ? '🟡 O\'rtacha' : '❌ Zaif holatda'}
• ⚠️ Xavf darajasi: ${performance.riskLevel.status === 'Yuqori' ? '🔴 Yuqori' : performance.riskLevel.status === 'O\'rta' ? '🟡 O\'rta' : '🟢 Barqaror'} (${performance.healthScore}/100 ball)

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
${penalties.length > 0 ? penalties.map(p => `❌ ${p.label} (+${p.percent}%)`).join('\n') : '✅ Tizimli jarimalar aniqlanmadi'}

${budget.totalPenaltyPercent > 0 ? `Sizda tizim bo'lmagani uchun real byudjet ${budget.totalPenaltyPercent}% ga qimmatroq tushishi mumkin (Har oy $${budget.realWaste.toLocaleString()} yo'qotish).` : 'Tizimingiz optimal sozlangan!'}

✅ Tavsiyalar:
${recommendations.slice(0, 4).map((r, i) => `${i + 1}. ${r.title} (${r.impact})`).join('\n')}`;

  const detailedReport = `${classicReport}

——————————————
🔬 UNIT-EKONOMIKA VA KUNLIK NORMA:
• 1 ta mijoz narxi (Real CAC): $${unitEconomics.realCAC}
• 1 ta sotuvdan marjinal foyda (${unitEconomics.profitMargin}%): $${unitEconomics.grossProfitPerClient}
• Reklamadan keyingi sof foyda: $${unitEconomics.netProfitAfterRealAds.toLocaleString()}/oy
• ROAS (Reklama qaytimi): ${unitEconomics.projectedROAS}x
• Kunlik reja: ${funnel.dailyLeadsNeeded} ta lid → ${funnel.dailyClientsNeeded} ta sotuv ($${funnel.dailyRevenueTarget}/kun)

📞 Tavsiya etilgan Sotuv Skripti:
${industry.salesScript}`;

  const activeText = reportStyle === 'classic' ? classicReport : detailedReport;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(activeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const shareToTelegram = () => {
    const url = `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(activeText)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-2xl p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-2">
          <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-white tracking-tight">
              Audit Hisobotini Ulashish & Nusxalash
            </h3>
            <p className="text-xs text-slate-400">
              Telegram, WhatsApp yoki mijozga yuborish uchun tayyor formatlangan hisobot
            </p>
          </div>
        </div>

        {/* Format Toggle */}
        <div className="flex items-center gap-2 my-4">
          <button
            type="button"
            onClick={() => setReportStyle('classic')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
              reportStyle === 'classic'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            📱 Standart Telegram Format
          </button>
          <button
            type="button"
            onClick={() => setReportStyle('detailed')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
              reportStyle === 'detailed'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            🔬 Kengaytirilgan (Unit-Ekonomika + Skript)
          </button>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-slate-200 max-h-80 overflow-y-auto whitespace-pre-wrap leading-relaxed select-all">
          {activeText}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6 pt-4 border-t border-slate-800">
          <button
            onClick={copyToClipboard}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Matndan nusxa olindi!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Matnni nusxalash</span>
              </>
            )}
          </button>

          <button
            onClick={shareToTelegram}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-extrabold bg-[#229ED9] hover:bg-[#1e8cc0] text-white shadow-lg shadow-sky-500/20 transition"
          >
            <Send className="w-4 h-4" />
            <span>Telegram Orqali Yuborish</span>
          </button>
        </div>
      </div>
    </div>
  );
}
