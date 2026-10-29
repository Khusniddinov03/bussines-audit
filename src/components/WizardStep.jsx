import React from 'react';
import { 
  Building2, 
  Users, 
  Smartphone, 
  Briefcase, 
  DollarSign, 
  Percent, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle,
  Sparkles,
  Send,
  Globe,
  Video,
  PhoneCall,
  ShoppingBag,
  PackageSearch,
  GraduationCap,
  UtensilsCrossed,
  Stethoscope,
  Factory,
  Clock,
  FileText,
  BarChart2,
  Repeat,
  TrendingUp,
  Layers
} from 'lucide-react';
import { INDUSTRIES, PLATFORMS } from '../data/benchmarks';
import LiveDiagnosticSidebar from './LiveDiagnosticSidebar';

const INDUSTRY_ICONS = {
  services_b2b: Briefcase,
  education: GraduationCap,
  retail_clothing: ShoppingBag,
  ecommerce: PackageSearch,
  real_estate_construction: Building2,
  restaurant_horeca: UtensilsCrossed,
  medicine_clinic: Stethoscope,
  beauty_fitness: Sparkles,
  production_manufacturing: Factory
};

const PLATFORM_ICONS = {
  instagram: Smartphone,
  telegram: Send,
  google: Globe,
  tiktok: Video,
  bloggers: Sparkles,
  cold_outreach: PhoneCall
};

const STEPS_META = [
  { id: 1, title: '1. Biznes & Tizim', subtitle: 'CRM, Sotuv bo\'limi va Upakovka' },
  { id: 2, title: '2. SLA & Sotuv Sifati', subtitle: 'Tezkorlik, Skriptlar va LTV' },
  { id: 3, title: '3. Soha & Reklama', subtitle: 'Yo\'nalish va Trafik Kanali' },
  { id: 4, title: '4. Moliyaviy Maqsad', subtitle: 'Daromad, Chek, Konversiya & Marja' }
];

export default function WizardStep({ 
  currentStep, 
  formData, 
  onChange, 
  onNext, 
  onPrev, 
  onGoToStep,
  onSubmit, 
  totalSteps = 4 
}) {
  const selectedIndustry = INDUSTRIES.find(i => i.id === formData.industryId) || INDUSTRIES[0];
  const selectedPlatform = PLATFORMS.find(p => p.id === formData.platformId) || PLATFORMS[0];
  const currentCpl = selectedIndustry.cpl[formData.platformId] || selectedIndustry.cpl.instagram;

  return (
    <div className="w-full max-w-1440 mx-auto">
      {/* Interactive Step Navigation Pills */}
      <div className="mb-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
          {STEPS_META.map((step) => {
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => onGoToStep(step.id)}
                className={`p-3 sm:p-3.5 rounded-xl border text-left transition-all flex items-center justify-between gap-2 ${
                  isActive
                    ? 'border-indigo-500 bg-indigo-500/15 text-white shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500/50'
                    : isCompleted
                    ? 'border-emerald-500/30 bg-emerald-950/20 text-slate-200 hover:border-emerald-500/50'
                    : 'border-slate-800/90 bg-slate-900/50 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="min-w-0">
                  <div className={`text-xs sm:text-sm font-bold truncate ${isActive ? 'text-white' : isCompleted ? 'text-emerald-300' : 'text-slate-300'}`}>
                    {step.title}
                  </div>
                  <div className="text-[11px] text-slate-400 truncate hidden sm:block mt-0.5">
                    {step.subtitle}
                  </div>
                </div>
                <div className="shrink-0">
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <span className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
                      isActive ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {step.id}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 1440px 12-Column Split Studio Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-start">
        {/* Left/Main Wizard Column (8 Cols on Desktop) */}
        <div className="lg:col-span-8 glass-panel rounded-2xl p-5 sm:p-8 xl:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-24 -mt-24 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* STEP 1: BIZNES PROFILI & ASOSIY OPERATSION TIZIM */}
          {currentStep === 1 && (
            <div className="space-y-8 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800/80">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-indigo-400">
                    1-Bosqich • Infratuzilma Auditi
                  </span>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-1">
                    🏥 Biznesning Boshlang'ich Holati & Tizimi
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    CRM, sotuv bo'limi va ijtimoiy tarmoqlar holati reklama byudjetining qanchalik samarali ishlashini belgilaydi.
                  </p>
                </div>

                {/* Optional Business Name input */}
                <div className="sm:w-56 shrink-0">
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                    Biznes / Loyiha nomi:
                  </label>
                  <input
                    type="text"
                    value={formData.businessName || ''}
                    onChange={(e) => onChange({ businessName: e.target.value })}
                    placeholder="Masalan: Pro Brend"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-700/80 text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* 1-savol: Siz biznes egasimisiz? */}
              <div className="space-y-3">
                <label className="block text-sm font-bold text-slate-100">
                  1-savol: Siz biznes egasimisiz? (Kompaniyadagi rolingiz)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { value: 'yes', label: '👑 Ha, biznes egasiman', desc: 'Muassis / Asosiy qaror qabul qiluvchi' },
                    { value: 'director', label: '💼 Bosh direktor / ROP', desc: 'Operatsion boshqaruv va sotuv rahbari' },
                    { value: 'marketer', label: '📈 Marketolog / Targetolog', desc: 'Mijoz yoki kompaniya trafigiga mas\'ul' }
                  ].map(opt => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => onChange({ isBusinessOwner: opt.value })}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        formData.isBusinessOwner === opt.value
                          ? 'border-indigo-500 bg-indigo-500/15 text-white shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500/40'
                          : 'border-slate-800 bg-slate-900/50 text-slate-300 hover:border-slate-700 hover:bg-slate-800/60'
                      }`}
                    >
                      <div className="font-bold text-sm flex items-center justify-between gap-2">
                        <span>{opt.label}</span>
                        {formData.isBusinessOwner === opt.value && (
                          <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2-savol: Sizda CRM tizimi mavjudmi? */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="block text-sm font-bold text-slate-100">
                    2-savol: Sizda CRM tizimi mavjudmi?
                  </label>
                  <span className="text-[11px] text-amber-400 font-semibold flex items-center gap-1 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                    <AlertCircle className="w-3.5 h-3.5" />
                    CRM yo'qligi = +20% byudjet yo'qotish
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { 
                      value: 'no', 
                      label: '❌ Yo\'q, mavjud emas', 
                      desc: 'Lidlar Direct/Telegramda qoladi, eslatmalar yo\'q',
                      badge: '+20% Jarima',
                      good: false
                    },
                    { 
                      value: 'excel', 
                      label: '📊 Excel / Google Sheets', 
                      desc: 'Qo\'lda yoziladi, lekin avtomatika va telefoniya yo\'q',
                      badge: '+10% Jarima',
                      good: false
                    },
                    { 
                      value: 'full_crm', 
                      label: '✅ Ha, AmoCRM / Bitrix24', 
                      desc: 'Barcha murojaatlar avtomatik tushadi va nazoratda',
                      badge: '0% Yo\'qotish (Ideal)',
                      good: true
                    }
                  ].map(opt => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => onChange({ hasCrm: opt.value })}
                      className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                        formData.hasCrm === opt.value
                          ? 'border-indigo-500 bg-indigo-500/15 text-white shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500/40'
                          : 'border-slate-800 bg-slate-900/50 text-slate-300 hover:border-slate-700 hover:bg-slate-800/60'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-sm flex items-center justify-between gap-2">
                          <span>{opt.label}</span>
                          {formData.hasCrm === opt.value && (
                            <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">{opt.desc}</div>
                      </div>
                      <div className="mt-3 pt-2 border-t border-slate-800/80">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          opt.good ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
                        }`}>
                          {opt.badge}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 3-savol: Alohida sotuv bo'limi (Menejerlar) bormi? */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="block text-sm font-bold text-slate-100">
                    3-savol: Alohida sotuv bo'limi (Menejerlar) bormi?
                  </label>
                  <span className="text-[11px] text-amber-400 font-semibold flex items-center gap-1 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                    <AlertCircle className="w-3.5 h-3.5" />
                    O'zingiz sotsangiz = +20% jarima
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      value: 'founder_only',
                      label: '❌ Yo\'q, o\'zim sotaman',
                      desc: 'Mijozlarga o\'zim javob beraman, vaqt va fokus yetishmaydi',
                      badge: '+20% Jarima',
                      good: false
                    },
                    {
                      value: 'small_team',
                      label: '👥 1–2 ta sotuvchi bor',
                      desc: 'Menejerlar bor, lekin ROP va kunlik sifat nazorati yo\'q',
                      badge: '+5% Operatsion xavf',
                      good: true
                    },
                    {
                      value: 'full_dept',
                      label: '🏆 To\'liq bo\'lim & ROP',
                      desc: 'Menejerlar, KPI, skriptlar va doimiy nazorat mavjud',
                      badge: 'Maksimal Konversiya',
                      good: true
                    }
                  ].map(opt => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => onChange({ hasSalesTeam: opt.value })}
                      className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                        formData.hasSalesTeam === opt.value
                          ? 'border-indigo-500 bg-indigo-500/15 text-white shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500/40'
                          : 'border-slate-800 bg-slate-900/50 text-slate-300 hover:border-slate-700 hover:bg-slate-800/60'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-sm flex items-center justify-between gap-2">
                          <span>{opt.label}</span>
                          {formData.hasSalesTeam === opt.value && (
                            <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">{opt.desc}</div>
                      </div>
                      <div className="mt-3 pt-2 border-t border-slate-800/80">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          opt.good ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
                        }`}>
                          {opt.badge}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 4-savol: Ijtimoiy tarmoqlaringiz holati? (Upakovka) */}
              <div className="space-y-3">
                <label className="block text-sm font-bold text-slate-100">
                  4-savol: Ijtimoiy tarmoqlaringiz holati? (Upakovka & Brend ishonchi)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      value: 'poor',
                      label: '❌ Zaif / Nol holatda',
                      desc: 'Sahifa yangi yoki qarovsiz, mijozda ishonch uyg\'otmaydi',
                      badge: '+20% Qimmat lid'
                    },
                    {
                      value: 'fair',
                      label: '🟡 O\'rtacha holatda',
                      desc: 'Postlar bor, lekin video-sharhlar, keyslar va aniq UTP kam',
                      badge: '+10% Jarima'
                    },
                    {
                      value: 'excellent',
                      label: '✅ Ha, zo\'r holatda',
                      desc: 'Professional dizayn, jonli Reels, sharhlar va kuchli bio',
                      badge: 'Yuqori CTR & Ishonch'
                    }
                  ].map(opt => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => onChange({ socialStatus: opt.value })}
                      className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                        formData.socialStatus === opt.value
                          ? 'border-indigo-500 bg-indigo-500/15 text-white shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500/40'
                          : 'border-slate-800 bg-slate-900/50 text-slate-300 hover:border-slate-700 hover:bg-slate-800/60'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-sm flex items-center justify-between gap-2">
                          <span>{opt.label}</span>
                          {formData.socialStatus === opt.value && (
                            <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">{opt.desc}</div>
                      </div>
                      <div className="mt-3 pt-2 border-t border-slate-800/80">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          opt.value === 'excellent' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                        }`}>
                          {opt.badge}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: SOTUV SIFATI, SLA TEZKORLIGI, SKRIPT VA ANALITIKA */}
          {currentStep === 2 && (
            <div className="space-y-8 animate-fade-in">
              <div className="pb-5 border-b border-slate-800/80">
                <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-400">
                  2-Bosqich • Chuqurlashtirilgan Sotuv Auditi
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-1">
                  ⚡ Lidlar Bilan Ishlash Tezligi, Skriptlar & LTV
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Reklamadan lid kelishi — ishning 30 foizi. Qolgan 70% muvaffaqiyat lidga necha daqiqada va qanday javob berilishiga bog'liq.
                </p>
              </div>

              {/* 5-savol: SLA - Lidga javob berish tezligi */}
              <div className="space-y-3">
                <label className="block text-sm font-bold text-slate-100 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-indigo-400" />
                  <span>5-savol: Reklamadan yangi lid tushganda o'rtacha qancha vaqtda bog'laniladi?</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      value: 'fast_5m',
                      label: '⚡ 5–10 daqiqa ichida',
                      desc: 'Mijoz hali telefonni qo\'yib ulgurmasdan qo\'ng\'iroq qilinadi',
                      badge: 'Maksimal Konversiya'
                    },
                    {
                      value: 'medium_30m',
                      label: '⏳ 30–60 daqiqa ichida',
                      desc: 'Bo\'shaganda yoziladi yoki qo\'ng\'iroq qilinadi',
                      badge: '-10% Sovuydigan lidlar'
                    },
                    {
                      value: 'slow_hours',
                      label: '🐢 2+ soat / Ertasi kuni',
                      desc: 'Kech tushgan lidlar ertalabgacha qolib ketadi',
                      badge: '-20% Lid yo\'qotish'
                    }
                  ].map(opt => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => onChange({ responseSpeed: opt.value })}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        formData.responseSpeed === opt.value
                          ? 'border-indigo-500 bg-indigo-500/15 text-white shadow-lg ring-1 ring-indigo-500/40'
                          : 'border-slate-800 bg-slate-900/50 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="font-bold text-sm flex items-center justify-between">
                        <span>{opt.label}</span>
                        {formData.responseSpeed === opt.value && <CheckCircle2 className="w-4 h-4 text-indigo-400" />}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1.5">{opt.desc}</div>
                      <div className={`mt-2.5 inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        opt.value === 'fast_5m' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
                      }`}>
                        {opt.badge}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 6-savol: Sotuv skriptlari va e'tirozlar bilan ishlash */}
              <div className="space-y-3">
                <label className="block text-sm font-bold text-slate-100 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <span>6-savol: Sotuv skripti va "Qimmat / O'ylab ko'raman" e'tirozlariga tayyor shablon bormi?</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      value: 'no',
                      label: '❌ Yo\'q, faqat narx aytiladi',
                      desc: 'Mijoz narx so\'rasa, narx yoziladi va suhbat to\'xtaydi'
                    },
                    {
                      value: 'partial',
                      label: '🟡 Og\'zaki tushuncha bor',
                      desc: 'Yozma standart yo\'q, har kim o\'z tajribasiga qarab sotadi'
                    },
                    {
                      value: 'yes',
                      label: '✅ Yozma skript & Nazorat bor',
                      desc: 'Kvalifikatsiya, prezentatsiya va e\'tirozlarni yopish qoidalari aniq'
                    }
                  ].map(opt => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => onChange({ hasSalesScript: opt.value })}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        formData.hasSalesScript === opt.value
                          ? 'border-indigo-500 bg-indigo-500/15 text-white shadow-lg ring-1 ring-indigo-500/40'
                          : 'border-slate-800 bg-slate-900/50 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="font-bold text-sm flex items-center justify-between">
                        <span>{opt.label}</span>
                        {formData.hasSalesScript === opt.value && <CheckCircle2 className="w-4 h-4 text-indigo-400" />}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1.5">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 7-savol: Mijozlar bazasi va qayta sotuv (LTV) */}
              <div className="space-y-3">
                <label className="block text-sm font-bold text-slate-100 flex items-center gap-2">
                  <Repeat className="w-4 h-4 text-amber-400" />
                  <span>7-savol: Oldin xarid qilgan mijozlar bazasiga qayta sotuv (LTV) qilinadimi?</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      value: 'no',
                      label: '❌ Yo\'q, faqat yangi mijozlar',
                      desc: 'Eski mijozlar bazasi saqlanmaydi yoki ularga qayta chiqilmaydi'
                    },
                    {
                      value: 'rarely',
                      label: '🟡 Kamdan-kam (Bayramlarda)',
                      desc: 'Baza bor, lekin tizimli keshbek va oylik takliflar yo\'q'
                    },
                    {
                      value: 'active',
                      label: '✅ Ha, doimiy LTV tizimi bor',
                      desc: 'Muntazam SMS/Bot xabarlar, VIP karta va takroriy xaridlar'
                    }
                  ].map(opt => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => onChange({ hasDatabaseRetention: opt.value })}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        formData.hasDatabaseRetention === opt.value
                          ? 'border-indigo-500 bg-indigo-500/15 text-white shadow-lg ring-1 ring-indigo-500/40'
                          : 'border-slate-800 bg-slate-900/50 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="font-bold text-sm flex items-center justify-between">
                        <span>{opt.label}</span>
                        {formData.hasDatabaseRetention === opt.value && <CheckCircle2 className="w-4 h-4 text-indigo-400" />}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1.5">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 8-savol: Reklama analitikasi (ROMI / Pixel / UTM) */}
              <div className="space-y-3">
                <label className="block text-sm font-bold text-slate-100 flex items-center gap-2">
                  <BarChart2 className="w-4 h-4 text-indigo-400" />
                  <span>8-savol: Reklama samaradorligi (ROMI, CPL, qaysi video sotuv keltirgani) o'lchanadimi?</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      value: 'no',
                      label: '❌ Yo\'q, taxminan yoqiladi',
                      desc: 'Shunchaki pul tikiladi, qaysi reklama foyda keltirgani noma\'lum'
                    },
                    {
                      value: 'basic',
                      label: '📊 Faqat Lid narxi (CPL) ko\'riladi',
                      desc: 'Kabinetdagi lid narxini bilamiz, lekin qaysi lid pul to\'lagani hisoblanmaydi'
                    },
                    {
                      value: 'advanced',
                      label: '✅ To\'liq ROMI & ROAS nazorati',
                      desc: 'Har bir reklama roligidan tushgan sof foyda darajasigacha aniq'
                    }
                  ].map(opt => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => onChange({ hasMarketingTracking: opt.value })}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        formData.hasMarketingTracking === opt.value
                          ? 'border-indigo-500 bg-indigo-500/15 text-white shadow-lg ring-1 ring-indigo-500/40'
                          : 'border-slate-800 bg-slate-900/50 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="font-bold text-sm flex items-center justify-between">
                        <span>{opt.label}</span>
                        {formData.hasMarketingTracking === opt.value && <CheckCircle2 className="w-4 h-4 text-indigo-400" />}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1.5">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: BIZNES SOHASI VA REKLAMA PLATFORMASI */}
          {currentStep === 3 && (
            <div className="space-y-8 animate-fade-in">
              <div className="pb-5 border-b border-slate-800/80">
                <span className="text-[11px] font-bold uppercase tracking-widest text-amber-400">
                  3-Bosqich • Bozor Benchmarklari
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-1">
                  🎯 Biznesingiz Sohasi & Asosiy Reklama Platformasi
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Tushunarli! Endi sohangiz va reklama kanalingizga mos lid narxi (CPL) hamda konversiya normalarini tanlaymiz.
                </p>
              </div>

              {/* 9-savol: Biznesingiz qaysi sohada? */}
              <div className="space-y-3">
                <label className="block text-sm font-bold text-slate-100">
                  9-savol: Biznesingiz qaysi sohada faoliyat yuritadi?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                  {INDUSTRIES.map(industry => {
                    const IconComp = INDUSTRY_ICONS[industry.id] || Briefcase;
                    const isSelected = formData.industryId === industry.id;
                    return (
                      <button
                        key={industry.id}
                        type="button"
                        onClick={() => onChange({ 
                          industryId: industry.id,
                          averageTicket: industry.defaultTicket,
                          conversionRate: industry.defaultConversion,
                          profitMargin: industry.defaultMargin,
                          customCplMin: null,
                          customCplMax: null
                        })}
                        className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'border-indigo-500 bg-indigo-500/15 text-white ring-1 ring-indigo-500 shadow-lg'
                            : 'border-slate-800 bg-slate-900/50 text-slate-300 hover:border-slate-700 hover:bg-slate-800/60'
                        }`}
                      >
                        <div className="flex items-start gap-3 mb-3">
                          <div className={`p-2.5 rounded-xl shrink-0 ${
                            isSelected ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'bg-slate-800 text-slate-400'
                          }`}>
                            <IconComp className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="font-bold text-xs leading-snug text-white">
                              {industry.name}
                            </div>
                          </div>
                        </div>

                        <div className="pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                          <span>Chek: ~${industry.defaultTicket}</span>
                          <span>Konv: ~{industry.defaultConversion}%</span>
                          <span className="text-emerald-400">Marja: ~{industry.defaultMargin}%</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 10-savol: Asosiy reklama platformangiz? */}
              <div className="space-y-3">
                <label className="block text-sm font-bold text-slate-100">
                  10-savol: Asosiy reklama platformangiz qaysi?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                  {PLATFORMS.map(platform => {
                    const IconComp = PLATFORM_ICONS[platform.id] || Smartphone;
                    const isSelected = formData.platformId === platform.id;
                    const cplData = selectedIndustry.cpl[platform.id] || selectedIndustry.cpl.instagram;
                    return (
                      <button
                        key={platform.id}
                        type="button"
                        onClick={() => onChange({ 
                          platformId: platform.id,
                          customCplMin: null,
                          customCplMax: null
                        })}
                        className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'border-indigo-500 bg-indigo-500/15 text-white ring-1 ring-indigo-500 shadow-lg'
                            : 'border-slate-800 bg-slate-900/50 text-slate-300 hover:border-slate-700 hover:bg-slate-800/60'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2 font-bold text-sm">
                              <IconComp className="w-4 h-4 text-indigo-400 shrink-0" />
                              <span>{platform.name}</span>
                            </div>
                            {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />}
                          </div>
                          <p className="text-[11px] text-slate-400 mt-1">
                            {platform.desc}
                          </p>
                        </div>

                        <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                          <span className="text-slate-400">Benchmark CPL:</span>
                          <span className="font-mono font-bold text-emerald-400">
                            ${cplData.min} – ${cplData.max}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: MOLIYAVIY MAQSADLAR, O'RTACHA CHEK, KONVERSIYA VA MARJA */}
          {currentStep === 4 && (
            <div className="space-y-8 animate-fade-in">
              <div className="pb-5 border-b border-slate-800/80">
                <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-400">
                  4-Bosqich • Moliyaviy Maqsadlar & Unit-Ekonomika
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-1">
                  💰 Moliyaviy Maqsad, O'rtacha Chek & Konversiya
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Maqsadli daromadingiz va sotuv ko'rsatkichlaringizni kiriting — tizim aniq mijozlar soni, lidlar va optimal reklama byudjetini hisoblab beradi.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* 11-savol: Oylik DAROMAD maqsadingiz ($ da) */}
                <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs sm:text-sm font-bold text-white">
                      11-savol: Oylik DAROMAD maqsadingiz ($ da)
                    </label>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                      B Nuqta (Maqsad)
                    </span>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <DollarSign className="w-5 h-5 text-emerald-400" />
                    </div>
                    <input
                      type="number"
                      min="100"
                      step="500"
                      value={formData.targetRevenue}
                      onChange={(e) => onChange({ targetRevenue: Number(e.target.value) })}
                      className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono font-extrabold text-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                      placeholder="10000"
                    />
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {[5000, 10000, 15000, 30000, 50000, 100000].map(val => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => onChange({ targetRevenue: val })}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold transition ${
                          formData.targetRevenue === val
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                        }`}
                      >
                        ${val.toLocaleString()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Hozirgi oylik daromad (A nuqta) */}
                <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs sm:text-sm font-bold text-slate-200">
                      Hozirgi oylik daromadingiz ($ da, A nuqta)
                    </label>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                      A Nuqta (Hozir)
                    </span>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <TrendingUp className="w-5 h-5 text-indigo-400" />
                    </div>
                    <input
                      type="number"
                      min="0"
                      step="500"
                      value={formData.currentRevenue}
                      onChange={(e) => onChange({ currentRevenue: Number(e.target.value) })}
                      className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono font-extrabold text-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                      placeholder="4000"
                    />
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {[0, 2000, 4000, 8000, 15000, 25000].map(val => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => onChange({ currentRevenue: val })}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold transition ${
                          formData.currentRevenue === val
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                        }`}
                      >
                        {val === 0 ? 'Startap ($0)' : `$${val.toLocaleString()}`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 12-savol: O'rtacha chek qancha? ($ da) */}
                <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs sm:text-sm font-bold text-white">
                      12-savol: O'rtacha chek qancha? ($ da)
                    </label>
                    <span className="text-[10px] font-mono text-indigo-400">
                      Norma: ~${selectedIndustry.defaultTicket}
                    </span>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <DollarSign className="w-5 h-5 text-indigo-400" />
                    </div>
                    <input
                      type="number"
                      min="1"
                      step="5"
                      value={formData.averageTicket}
                      onChange={(e) => onChange({ averageTicket: Number(e.target.value) })}
                      className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono font-extrabold text-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                      placeholder="60"
                    />
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {[25, 45, 60, 100, 300, 1000].map(val => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => onChange({ averageTicket: val })}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold transition ${
                          formData.averageTicket === val
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                        }`}
                      >
                        ${val}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 13-savol: Sotuv konversiyasi necha foiz? */}
                <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs sm:text-sm font-bold text-white">
                      13-savol: Sotuv konversiyasi necha foiz? (%)
                    </label>
                    <span className="text-[10px] font-mono text-amber-400">
                      Soha normasi: {selectedIndustry.defaultConversion}%
                    </span>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <Percent className="w-5 h-5 text-amber-400" />
                    </div>
                    <input
                      type="number"
                      min="1"
                      max="95"
                      step="1"
                      value={formData.conversionRate}
                      onChange={(e) => onChange({ conversionRate: Number(e.target.value) })}
                      className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono font-extrabold text-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                      placeholder="30"
                    />
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {[10, 15, 20, 25, 30, 40].map(val => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => onChange({ conversionRate: val })}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold transition ${
                          formData.conversionRate === val
                            ? 'bg-amber-500 text-slate-950 font-bold'
                            : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                        }`}
                      >
                        {val}%
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 14-savol: Sof Foyda Marjasi (%) & CPL Benchmark Sozlamasi */}
              <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/90 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-200">
                      14-savol: Biznesning marjinalligi / Ustama foydasi (%)
                    </label>
                    <span className="text-sm font-mono font-bold text-emerald-400">
                      {formData.profitMargin || 35}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="85"
                    step="5"
                    value={formData.profitMargin || 35}
                    onChange={(e) => onChange({ profitMargin: Number(e.target.value) })}
                    className="w-full"
                  />
                  <p className="text-[11px] text-slate-400">
                    Tovar tannarxi va bevosita xarajatlardan keyin qoladigan marja (Unit-ekonomika va ROMI hisobi uchun).
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-200">
                      Lid narxi (CPL Benchmark — {selectedPlatform.short}):
                    </label>
                    <span className="text-xs font-mono font-bold text-indigo-400">
                      ${formData.customCplMin || currentCpl.min} – ${formData.customCplMax || currentCpl.max}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <span className="text-[10px] text-slate-400 block mb-1">Min CPL ($):</span>
                      <input
                        type="number"
                        step="0.1"
                        min="0.1"
                        placeholder={currentCpl.min}
                        value={formData.customCplMin ?? ''}
                        onChange={(e) => onChange({ customCplMin: e.target.value ? Number(e.target.value) : null })}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs font-mono text-white"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block mb-1">Max CPL ($):</span>
                      <input
                        type="number"
                        step="0.1"
                        min="0.2"
                        placeholder={currentCpl.max}
                        value={formData.customCplMax ?? ''}
                        onChange={(e) => onChange({ customCplMax: e.target.value ? Number(e.target.value) : null })}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs font-mono text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Wizard Navigation Footer */}
          <div className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-6 border-t border-slate-800/90">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={onPrev}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 transition"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Orqaga</span>
              </button>
            ) : (
              <div className="text-xs text-slate-500 hidden sm:block">
                Bosqich {currentStep} / {totalSteps}
              </div>
            )}

            <div className="flex items-center gap-3 ml-auto">
              {currentStep < totalSteps && (
                <button
                  type="button"
                  onClick={onSubmit}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-indigo-300 hover:text-white bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 transition hidden sm:inline-flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Darhol hisoblash</span>
                </button>
              )}

              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={onNext}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-extrabold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 transition transform hover:-translate-y-0.5"
                >
                  <span>Keyingi Bosqich</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onSubmit}
                  className="flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-extrabold text-white bg-gradient-to-r from-emerald-500 via-indigo-600 to-indigo-500 hover:from-emerald-400 hover:to-indigo-400 shadow-xl shadow-indigo-600/30 transition transform hover:-translate-y-0.5"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Auditi Yakunlash & Chuqur Tahlilni Ochish</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Sticky Column (4 Cols on Desktop): Live Real-Time Monitor */}
        <div className="lg:col-span-4">
          <LiveDiagnosticSidebar formData={formData} onQuickSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
}
