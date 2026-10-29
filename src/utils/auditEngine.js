import { INDUSTRIES, PLATFORMS } from '../data/benchmarks';

export function calculateAudit(formData) {
  const {
    businessName = 'Mening Biznesim',
    isBusinessOwner = 'yes',
    hasCrm = 'no', // 'no' | 'excel' | 'full_crm'
    hasSalesTeam = 'founder_only', // 'founder_only' | 'small_team' | 'full_dept'
    responseSpeed = 'slow_hours', // 'fast_5m' | 'medium_30m' | 'slow_hours'
    hasSalesScript = 'no', // 'no' | 'partial' | 'yes'
    socialStatus = 'excellent', // 'poor' | 'fair' | 'excellent'
    hasMarketingTracking = 'no', // 'no' | 'basic' | 'advanced'
    hasDatabaseRetention = 'rarely', // 'no' | 'rarely' | 'active'
    industryId = 'ecommerce',
    platformId = 'instagram',
    currentRevenue = 4000,
    targetRevenue = 10000,
    averageTicket = 60,
    profitMargin = 35,
    conversionRate = 30,
    customCplMin = null,
    customCplMax = null
  } = formData;

  const validCurrentRev = Math.max(0, Number(currentRevenue) || 0);
  const validTarget = Math.max(100, Number(targetRevenue) || 10000);
  const validTicket = Math.max(1, Number(averageTicket) || 60);
  const validMargin = Math.max(5, Math.min(95, Number(profitMargin) || 35));
  const validConversion = Math.max(0.5, Math.min(95, Number(conversionRate) || 30));

  const industry = INDUSTRIES.find(i => i.id === industryId) || INDUSTRIES[0];
  const platformObj = PLATFORMS.find(p => p.id === platformId) || PLATFORMS[0];
  const platformCpl = industry.cpl[platformId] || industry.cpl.instagram;

  const cplMin = customCplMin && Number(customCplMin) > 0 ? Number(customCplMin) : platformCpl.min;
  const cplMax = customCplMax && Number(customCplMax) > 0 ? Number(customCplMax) : platformCpl.max;
  const cplAvg = Number(((cplMin + cplMax) / 2).toFixed(2));

  // 1. FUNNEL VA KONVERSIYA MATEMATIKASI
  const requiredClients = Math.ceil(validTarget / validTicket);
  const currentClients = validCurrentRev > 0 ? Math.floor(validCurrentRev / validTicket) : 0;
  const additionalClientsNeeded = Math.max(0, requiredClients - currentClients);
  const growthMultiplier = validCurrentRev > 0 ? Number((validTarget / validCurrentRev).toFixed(1)) : null;

  // Kerakli lidlar (Formula: Daromad / Chek / Konversiya)
  const requiredLeads = Math.ceil(requiredClients / (validConversion / 100));

  // Kvalifikatsiyalangan (sifatli) lidlar va voronka bosqichlari
  const qualifiedLeads = Math.ceil(requiredLeads * (industry.avgQualifiedRate / 100));
  const estimatedCTR = 1.25; // O'rtacha 1.25% CTR
  const landingConversion = 9.0; // Klikdan lidga o'tish ~9%
  const estimatedClicks = Math.ceil(requiredLeads / (landingConversion / 100));
  const estimatedImpressions = Math.ceil(estimatedClicks / (estimatedCTR / 100));

  // Kunlik norma (30 kunlik oy hisobida)
  const dailyLeadsNeeded = Math.ceil(requiredLeads / 30);
  const dailyClientsNeeded = Number((requiredClients / 30).toFixed(1));
  const dailyRevenueTarget = Math.round(validTarget / 30);

  // 2. SAMARADORLIK JARIMALARI (PENALTIES)
  const penalties = [];
  let corePenaltyPercent = 0; // Bevosita reklama byudjetini qimmatlashtiruvchi jarimalar
  let operationalRiskPoints = 0; // Qo'shimcha operatsion yo'qotish ballari

  // A. CRM tekshiruvi
  if (hasCrm === 'no') {
    penalties.push({
      key: 'crm_none',
      category: 'Infratuzilma',
      label: 'CRM tizimi yo\'qligi sababli yo\'qotishlar',
      shortLabel: 'CRM tizimi yo\'qligi',
      percent: 20,
      isCore: true,
      description: 'Lidlar Direct/Telegramda qolib ketadi, qayta qo\'ng\'iroq (follow-up) qilinmaydi va mijozlarning 20% gacha qismi unutiladi.',
      solution: 'AmoCRM yoki Bitrix24 o\'rnatib, barcha kanallarni bitta voronkaga ulash.',
      severity: 'high'
    });
    corePenaltyPercent += 20;
  } else if (hasCrm === 'excel') {
    penalties.push({
      key: 'crm_excel',
      category: 'Infratuzilma',
      label: 'CRM o\'rniga Excel / Qo\'lda yuritish',
      shortLabel: 'Excelda yuritish',
      percent: 10,
      isCore: true,
      description: 'Inson omili tufayli mijozlar kech kiritiladi, avtomatik eslatmalar va voronka analitikasi ishlamaydi.',
      solution: 'Exceldan avtomatlashtirilgan CRM tizimiga o\'tish va IP-telefoniya ulash.',
      severity: 'medium'
    });
    corePenaltyPercent += 10;
  }

  // B. Sotuv bo'limi tekshiruvi
  if (hasSalesTeam === 'no' || hasSalesTeam === 'founder_only') {
    penalties.push({
      key: 'sales_founder',
      category: 'Sotuv bo\'limi',
      label: 'Sotuvchilar yo\'qligi sababli past konversiya',
      shortLabel: 'Sotuv bo\'limi yo\'qligi',
      percent: 20,
      isCore: true,
      description: 'Biznes egasi operatsion ishlar bilan band bo\'lgani uchun lidlarga kech javob beradi va rad etgan mijozlar bilan qayta ishlamaydi.',
      solution: 'Kamida 1-2 ta alohida sotuv menejeri yollash va KPI (Fiksa + Bonus) tizimini joriy etish.',
      severity: 'high'
    });
    corePenaltyPercent += 20;
  } else if (hasSalesTeam === 'small_team') {
    penalties.push({
      key: 'sales_partial',
      category: 'Sotuv bo\'limi',
      label: 'Sotuv nazorati (ROP / Sifat auditi) yo\'qligi',
      shortLabel: 'Sotuv nazorati sustligi',
      percent: 5,
      isCore: false,
      description: 'Menejerlar bor, lekin ularning qo\'ng\'iroqlari eshitilmaydi va kunlik konversiya rejasi nazorat qilinmaydi.',
      solution: 'Haftalik qo\'ng\'iroqlar auditi va kunlik sotuv rejasi (Dashboard) o\'rnatish.',
      severity: 'low'
    });
    operationalRiskPoints += 5;
  }

  // C. Ijtimoiy tarmoqlar / Upakovka
  if (socialStatus === 'poor') {
    penalties.push({
      key: 'social_poor',
      category: 'Upakovka & Ishonch',
      label: 'Zaif ijtimoiy tarmoq va upakovka',
      shortLabel: 'Zaif upakovka',
      percent: 20,
      isCore: true,
      description: 'Reklamadan o\'tgan mijoz profilga kirganda ishonch uyg\'onmaydi, natijada lid narxi (CPL) 20% ga qimmatlashadi.',
      solution: 'Profil Bio, Highlights (Sharhlar, Keyslar, Jarayon) va 9 ta asosiy ekspert postini professional tayyorlash.',
      severity: 'high'
    });
    corePenaltyPercent += 20;
  } else if (socialStatus === 'fair') {
    penalties.push({
      key: 'social_fair',
      category: 'Upakovka & Ishonch',
      label: 'O\'rtacha upakovka (Video-sharhlar va UTP kamligi)',
      shortLabel: 'O\'rtacha upakovka',
      percent: 10,
      isCore: true,
      description: 'Sahifa yuritiladi, biroq kuchli offfer va jonli mijoz natijalari kamligi sababli konversiya to\'liq ochilmayapti.',
      solution: 'Mijozlarning jonli video-sharhlarini va aniq UTP (Nega aynan siz?) blokini qadab qo\'yish.',
      severity: 'medium'
    });
    corePenaltyPercent += 10;
  }

  // D. Lidga javob berish tezligi (SLA)
  if (responseSpeed === 'slow_hours') {
    penalties.push({
      key: 'sla_slow',
      category: 'Tezkorlik (SLA)',
      label: 'Lidlarga sekin javob berish (1-2 soatdan keyin)',
      shortLabel: 'Sekin javob berish (SLA)',
      percent: 15,
      isCore: false,
      description: 'Lid qoldirgan mijozga 15 daqiqa ichida bog\'lanilmasa, uning xaridga qiziqishi 3 baravar sovuydi yoki raqobatchidan oladi.',
      solution: '5 daqiqalik SLA standarti va birinchi soniyada javob beruvchi AI/Avto-javob botini ulash.',
      severity: 'high'
    });
    operationalRiskPoints += 15;
  } else if (responseSpeed === 'medium_30m') {
    penalties.push({
      key: 'sla_medium',
      category: 'Tezkorlik (SLA)',
      label: 'Javob berish vaqti 30-60 daqiqaga cho\'zilishi',
      shortLabel: '30-60 daqiqalik kechikish',
      percent: 8,
      isCore: false,
      description: 'Issiq mijoz kutib qolishi sababli qo\'ng\'iroqni ko\'tarmaslik (ne-dozvon) ulushi oshadi.',
      solution: 'Yangi lid tushishi bilan menejer Telegramiga tezkor ovozli bildirishnoma sozlash.',
      severity: 'medium'
    });
    operationalRiskPoints += 8;
  }

  // E. Sotuv skriptlari
  if (hasSalesScript === 'no') {
    penalties.push({
      key: 'script_none',
      category: 'Sotuv texnikasi',
      label: 'Sotuv skriptlari va e\'tirozlar jadvali yo\'qligi',
      shortLabel: 'Sotuv skripti yo\'qligi',
      percent: 10,
      isCore: false,
      description: 'Mijoz "Qimmat ekan" yoki "O\'ylab ko\'raman" deganda suhbat to\'xtab qoladi.',
      solution: '5 bosqichli sotuv skripti va eng ko\'p uchraydigan 10 ta e\'tirozga tayyor javoblar shablonini yozish.',
      severity: 'medium'
    });
    operationalRiskPoints += 10;
  }

  // F. Marketing analitikasi
  if (hasMarketingTracking === 'no') {
    penalties.push({
      key: 'tracking_none',
      category: 'Analitika',
      label: 'Reklama analitikasi (ROMI / UTM / Pixel) yo\'qligi',
      shortLabel: 'Analitika yo\'qligi',
      percent: 10,
      isCore: false,
      description: 'Qaysi reklama roligi haqiqiy pul to\'laydigan mijoz olib kelayotgani, qaysi biri esa byudjetni yeyayotgani ko\'rinmaydi.',
      solution: 'UTM teglar, Meta Pixel va har haftalik ROMI/CPL moliyaviy jadvalini yuritish.',
      severity: 'medium'
    });
    operationalRiskPoints += 10;
  }

  // G. Mijozlar bazasi (LTV)
  if (hasDatabaseRetention === 'no') {
    penalties.push({
      key: 'ltv_none',
      category: 'Qayta sotuv (LTV)',
      label: 'Eski mijozlar bazasi bilan ishlanmasligi (LTV = 0)',
      shortLabel: 'Qayta sotuv yo\'qligi',
      percent: 15,
      isCore: false,
      description: 'Har oy daromad qilish uchun faqat yangi reklama yoqishga majbursiz, eng oson sotib oladigan eski mijozlar esa e\'tiborsiz.',
      solution: 'Mijozlar bazasini RFM-segmentatsiya qilish va har oy maxsus yopiq aksiyalar yuborish.',
      severity: 'high'
    });
    operationalRiskPoints += 15;
  }

  // Asosiy jarima foizi (Byudjet multiplikatori uchun)
  const totalPenaltyPercent = corePenaltyPercent > 0 ? corePenaltyPercent : operationalRiskPoints;
  const combinedRiskPercent = corePenaltyPercent + operationalRiskPoints;

  // 3. REKLAMA BYUDJETI HISOBI (IDEAL VS REAL JARIMA BILAN)
  // Ideal (tizim 100% ishlaganda):
  const idealMinBudget = Math.round(requiredLeads * cplMin);
  const idealAvgBudget = Math.round(requiredLeads * cplAvg);
  const idealOptimalBudget = Math.round(requiredLeads * cplMax);

  // Real (Samaradorlik jarimasi bilan, masalan +40%):
  // $10,000 / $60 = 167 mijoz -> 557 lid * $0.8 * 1.4 = $624 (Min)
  // 557 lid * $1.5 * 1.4 = $1,170 (Optimal)
  const penaltyMultiplier = 1 + (totalPenaltyPercent / 100);
  const realMinBudget = Math.round(requiredLeads * cplMin * penaltyMultiplier);
  const realAvgBudget = Math.round(requiredLeads * cplAvg * penaltyMultiplier);
  const realOptimalBudget = Math.round(requiredLeads * cplMax * penaltyMultiplier);

  // Tizimsizlik tufayli ortiqcha to'lanayotgan / yo'qotilayotgan byudjet:
  const monthlyBudgetWaste = Math.max(0, realOptimalBudget - idealOptimalBudget);
  const annualBudgetWaste = monthlyBudgetWaste * 12;

  // Konversiya va LTV yo'qotishlari tufayli boy berilayotgan potentsial tushum (Lost Revenue):
  const missedClientsMonthly = Math.round(requiredClients * (Math.min(50, combinedRiskPercent) / 100) * 0.5);
  const missedRevenueMonthly = missedClientsMonthly * validTicket;
  const totalAnnualOpportunityLoss = (monthlyBudgetWaste + missedRevenueMonthly) * 12;

  // 4. UNIT-EKONOMIKA VA RENTABELLIK (CAC, LTV, ROAS, ROMI, SOF FOYDA)
  const idealCAC = Number((idealOptimalBudget / requiredClients).toFixed(2));
  const realCAC = Number((realOptimalBudget / requiredClients).toFixed(2));
  const grossProfitPerClient = Number((validTicket * (validMargin / 100)).toFixed(2));
  const netProfitPerClientFirstSale = Number((grossProfitPerClient - realCAC).toFixed(2));

  // LTV hisobi
  const repeatFactor = hasDatabaseRetention === 'active'
    ? industry.avgRepeatPurchases
    : hasDatabaseRetention === 'rarely'
      ? Math.max(1.2, Number((industry.avgRepeatPurchases * 0.55).toFixed(1)))
      : 1.0;

  const ltvRevenue = Math.round(validTicket * repeatFactor);
  const ltvGrossProfit = Math.round(ltvRevenue * (validMargin / 100));
  const ltvCacRatio = realCAC > 0 ? Number((ltvGrossProfit / realCAC).toFixed(1)) : 0;

  // Oylik yalpi marja va reklamadan keyingi sof foyda
  const totalMonthlyGrossProfit = Math.round(validTarget * (validMargin / 100));
  const netProfitAfterRealAds = totalMonthlyGrossProfit - realOptimalBudget;
  const netProfitAfterIdealAds = totalMonthlyGrossProfit - idealOptimalBudget;

  const projectedROAS = realOptimalBudget > 0 ? Number((validTarget / realOptimalBudget).toFixed(1)) : 0;
  const idealROAS = idealOptimalBudget > 0 ? Number((validTarget / idealOptimalBudget).toFixed(1)) : 0;
  const projectedROMI = realOptimalBudget > 0
    ? Math.round(((totalMonthlyGrossProfit - realOptimalBudget) / realOptimalBudget) * 100)
    : 0;

  // Test byudjeti (Dastlabki 5-7 kunlik sinov uchun)
  const recommendedTestBudget = Math.max(50, Math.min(300, Math.round(realMinBudget * 0.25)));

  // 5. MANTIQIY ANOMALIYALAR VA BIZNES DIAGNOSTIKA OGOHLANTIRISHLARI
  const logicAlerts = [];

  if (netProfitPerClientFirstSale < 0) {
    logicAlerts.push({
      type: 'critical',
      title: 'Manfiy Unit-Ekonomika Xavfi (CAC > Marjinal foyda)',
      message: `Bitta mijozni jalb qilish xarajati ($${realCAC}) bitta sotuvdan qoladigan sof marjadan ($${grossProfitPerClient}) oshib ketmoqda! Birinchi sotuvda zararga kirmaslik uchun o'rtacha chekni kamida $${Math.ceil((realCAC / (validMargin / 100)) * 1.3)} ga ko'tarish (Upsell) yoki konversiyani oshirish shart.`
    });
  } else if (realOptimalBudget > totalMonthlyGrossProfit * 0.5) {
    logicAlerts.push({
      type: 'warning',
      title: 'Reklama Xarajati Sof Foyda Ulushining 50% dan Ko\'prog\'ini Yemoqda',
      message: `Oylik marjinal foydangiz $${totalMonthlyGrossProfit.toLocaleString()}, lekin tizimsizlik bilan reklama byudjeti $${realOptimalBudget.toLocaleString()} ga yetmoqda. Tizimni (CRM va sotuv) to'g'rilash orqali $${monthlyBudgetWaste.toLocaleString()} tejab qolishingiz zarur.`
    });
  }

  if (validConversion > industry.top10Conversion) {
    logicAlerts.push({
      type: 'info',
      title: `Sovuq Trafikda Yuqori Konversiya (${validConversion}%) Kutilmoqda`,
      message: `${industry.shortName} sohasida o'rtacha konversiya ${industry.defaultConversion}%, top 10% kompaniyalarda esa ${industry.top10Conversion}%. Reklama ko'lamini kattalashtirganda (Scaling) konversiya biroz pasayishi mumkinligini hisobga oling.`
    });
  } else if (validConversion < industry.defaultConversion * 0.65) {
    logicAlerts.push({
      type: 'warning',
      title: `Sotuv Konversiyasi Soha Normasidan Past (${validConversion}% vs ${industry.defaultConversion}%)`,
      message: `Sizning sohangizda standart konversiya ~${industry.defaultConversion}% atrofida. Konversiyangizni faqatgina sotuv skripti va 5 daqiqalik javob berish orqali ${industry.defaultConversion}% ga chiqarsangiz, reklama xarajatingiz deyarli ${Math.round((1 - validConversion / industry.defaultConversion) * 100)}% ga arzonlashadi!`
    });
  }

  if (growthMultiplier && growthMultiplier >= 3) {
    logicAlerts.push({
      type: 'info',
      title: `Agressiv O'sish Maqsadi: ${growthMultiplier}x Sakrash ($${validCurrentRev.toLocaleString()} → $${validTarget.toLocaleString()})`,
      message: `Oyiga ${requiredLeads} ta lidni qayta ishlash uchun kuniga ~${dailyLeadsNeeded} ta murojaatga sifatli javob berish kerak. Bitta inson kuniga maksimal 25-30 ta yangi lid bilan sifatli gaplasha oladi — demak sizga kamida ${Math.max(1, Math.ceil(dailyLeadsNeeded / 25))} nafar sotuv menejeri kerak bo'ladi.`
    });
  }

  // 6. BIZNES SALOMATLIK INDEKSI (HEALTH SCORE: 0 - 100)
  let healthScore = 100;
  healthScore -= corePenaltyPercent * 0.95;
  healthScore -= operationalRiskPoints * 0.65;
  if (netProfitPerClientFirstSale < 0) healthScore -= 15;
  if (validConversion < industry.defaultConversion * 0.7) healthScore -= 8;
  healthScore = Math.max(14, Math.min(98, Math.round(healthScore)));

  // 6 ta yo'nalish bo'yicha Radar ko'rsatkichlari (0-100%)
  const radarMetrics = [
    {
      id: 'crm_infra',
      label: 'CRM & Avtomatizatsiya',
      score: hasCrm === 'full_crm' ? 95 : hasCrm === 'excel' ? 50 : 20,
      benchmark: 85
    },
    {
      id: 'sales_power',
      label: 'Sotuv Bo\'limi & Skript',
      score: Math.round(
        (hasSalesTeam === 'full_dept' ? 55 : hasSalesTeam === 'small_team' ? 35 : 12) +
        (hasSalesScript === 'yes' ? 40 : hasSalesScript === 'partial' ? 22 : 8)
      ),
      benchmark: 80
    },
    {
      id: 'speed_sla',
      label: 'Javob Tezligi (SLA)',
      score: responseSpeed === 'fast_5m' ? 95 : responseSpeed === 'medium_30m' ? 60 : 25,
      benchmark: 90
    },
    {
      id: 'packaging_trust',
      label: 'Upakovka & Brend Ishonchi',
      score: socialStatus === 'excellent' ? 92 : socialStatus === 'fair' ? 58 : 25,
      benchmark: 85
    },
    {
      id: 'unit_economics',
      label: 'Unit-Ekonomika & Konversiya',
      score: Math.min(96, Math.max(25, Math.round((validConversion / industry.defaultConversion) * 65 + (netProfitPerClientFirstSale > 0 ? 25 : 0)))),
      benchmark: 78
    },
    {
      id: 'retention_ltv',
      label: 'LTV & Analitika',
      score: Math.round(
        (hasDatabaseRetention === 'active' ? 50 : hasDatabaseRetention === 'rarely' ? 25 : 10) +
        (hasMarketingTracking === 'advanced' ? 45 : hasMarketingTracking === 'basic' ? 25 : 10)
      ),
      benchmark: 80
    }
  ];

  let riskLevel = {
    color: 'emerald',
    badge: '🟢 Barqaror Tizim',
    status: 'Barqaror',
    bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    summary: 'Biznesingiz asosiy poydevorga ega, asosiy e\'tiborni masshtablashga qaratish mumkin.'
  };

  if (healthScore < 50 || corePenaltyPercent >= 40) {
    riskLevel = {
      color: 'danger',
      badge: '🔴 Yuqori Xavf',
      status: 'Yuqori',
      bg: 'bg-red-500/10 text-red-400 border-red-500/30',
      summary: `Tizim bo'lmagani sababli real byudjet +${totalPenaltyPercent}% ga qimmat tushmoqda va lidlar yo'qotilmoqda.`
    };
  } else if (healthScore < 75) {
    riskLevel = {
      color: 'amber',
      badge: '🟡 O\'rta Xavf',
      status: 'O\'rta',
      bg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      summary: 'Potentsial bor, biroq konversiya va nazorat teshiklarini yopish orqali daromadni 1.5-2x oshirish mumkin.'
    };
  } else if (healthScore >= 85) {
    riskLevel = {
      color: 'indigo',
      badge: '🌟 Masshtablashga Tayyor',
      status: 'Mukammal',
      bg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
      summary: 'Ajoyib ko\'rsatkich! Tizimingiz katta reklama trafigini hazm qilishga to\'liq tayyor.'
    };
  }

  // 7. KENGAYTIRILGAN QIMMATLI TAVSIYALAR VA PLAYBOOK (ROADMAP)
  const recommendations = [];

  // 1-Tavsiya: CRM va Voronka
  if (hasCrm !== 'full_crm') {
    recommendations.push({
      priority: 1,
      phase: '1-Bosqich: Tezkor To\'xtatish (1–7 kun)',
      category: 'CRM & Tizimlashtirish',
      title: 'CRM tizimi (AmoCRM / Bitrix24) o\'rnating va barcha lidlarni bitta oynaga yig\'ing',
      timeline: '1 - 5 kun',
      impact: `Byudjetni 20% tejaydi (+$${Math.round(realOptimalBudget * 0.16).toLocaleString()}/oy sof tejamkorlik)`,
      roiBadge: 'Eng yuqori ROI',
      whyItMatters: 'CRM bo\'lmasa, menejerlar yoki o\'zingiz kuniga 15+ yozishmada chalkashib ketasiz. "Ertaga to\'layman" degan mijozlarning 60 foizi unutiladi.',
      steps: [
        `Instagram Direct, Telegram, Sayt va IP-telefoniyani AmoCRM yoki Bitrix24 ga integratsiya qiling (hech bir lid qo'lda kiritilmasin).`,
        `${industry.shortName} uchun maxsus voronka bosqichlarini oching: ${industry.crmStages.slice(0, 4).join(' → ')}.`,
        `"Keyingi qadam (Task) belgilanmagan bitim bo'lmasligi" qoidasini kiriting — har bir mijozda aniq qo'ng'iroq sanasi turishi shart.`,
        `Rad etilgan lidlar uchun "Rad etish sababi" (Qimmat, Boshqadan oldi, Telefon ko'tarmadi) ro'yxatini majburiy qiling.`
      ],
      deliverable: '100% saqlanadigan mijozlar bazasi va avtomatik voronka'
    });
  }

  // 2-Tavsiya: Sotuv bo'limi va Menejerlar
  if (hasSalesTeam !== 'full_dept') {
    const neededManagers = Math.max(1, Math.ceil(dailyLeadsNeeded / 25));
    recommendations.push({
      priority: recommendations.length + 1,
      phase: '1-Bosqich: Jamoa va Delegatsiya (3–10 kun)',
      category: 'Sotuv Bo\'limi & HR',
      title: `Lidlar kuyib ketmasligi uchun alohida sotuv menejeri yollang (${neededManagers} nafar tavsiya etiladi)`,
      timeline: '5 - 12 kun',
      impact: `Konversiyani ${validConversion}% dan ${Math.min(60, validConversion + 10)}% gacha oshiradi`,
      roiBadge: '+20% Samaradorlik',
      whyItMatters: `Oyiga ${requiredLeads} ta lid degani — kuniga ${dailyLeadsNeeded} ta yangi murojaat va 30-40 ta qayta qo'ng'iroq degani. Biznes egasi bunga jismonan ulgura olmaydi.`,
      steps: [
        `Tanlov asosida 2-3 nafar nomzodni 3 kunlik sinov (Test-drayv) rejimiga oling va eng faol ${neededManagers} nafarini olib qoling.`,
        `Motivatsion KPI tizimini o'rnating: ${industry.kpiFormula}.`,
        `Har kuni ertalab 09:00 da 10 daqiqalik "Planerka" o'tkazing: kechagi lidlar soni, konversiya % va bugungi kassa rejasi.`,
        `Sotuv skriptini joriy qiling: ${industry.salesScript}`
      ],
      deliverable: 'Muassis ishtirokisiz ishlaydigan tizimli sotuv mashinasi'
    });
  }

  // 3-Tavsiya: SLA va 5 daqiqalik javob tezligi
  if (responseSpeed !== 'fast_5m' || hasSalesScript !== 'yes') {
    recommendations.push({
      priority: recommendations.length + 1,
      phase: '2-Bosqich: Konversiya Maksimumi (7–15 kun)',
      category: 'SLA & Sotuv Skripti',
      title: '5 Daqiqalik SLA Standarti va "Narx aytmasdan oldin Qiymat sotish" skriptini kiriting',
      timeline: '3 - 7 kun',
      impact: 'Bir xil reklama byudjetidan 1.4x ko\'proq sotuv chiqaradi',
      roiBadge: '0$ Xarajat bilan o\'sish',
      whyItMatters: 'Tadqiqotlarga ko\'ra, 5 daqiqa ichida javob berilgan lidning sotib olish ehtimoli 30 daqiqadan keyin javob berilgan lidga qaraganda 21 baravar yuqori!',
      steps: [
        `Reklamadan lid tushgan soniyada mijozga "Salom! Arizangiz qabul qilindi, mutaxassisimiz 3 daqiqada bog'lanadi" degan avto-xabar va foydali PDF/video yuborilsin.`,
        `Menejerlar uchun "Narxi qancha?" savoliga bitta raqam bilan javob berishni qat'iyan taqiqlang: avval 2 ta kvalifikatsion savol berib, so'ngra yechim va narxni aytsin.`,
        `Kun oxirida javob berilmagan yoki "o'ylab ko'raman" degan barcha mijozlarga 48 soatlik maxsus bonus (masalan: bepul yetkazib berish yoki qo'shimcha xizmat) yuboring.`
      ],
      deliverable: '5 daqiqalik tezkor aloqa va yuqori konversiyali skript'
    });
  }

  // 4-Tavsiya: Test Reklama va CPL Optimizatsiyasi
  recommendations.push({
    priority: recommendations.length + 1,
    phase: '2-Bosqich: Trafik va Test (7–20 kun)',
    category: 'Performance Marketing',
    title: `Reklamani kichik summa ($${recommendedTestBudget} Test byudjet) bilan boshlab, haqiqiy CPL ni aniqlang`,
    timeline: '5 - 7 kunlik test',
    impact: `Lid narxini $${cplMax} dan $${cplMin} gacha tushirish imkoniyati`,
    roiBadge: 'Xavfsiz Start',
    whyItMatters: `Birdaniga $${realOptimalBudget.toLocaleString()} tikish xavfli. Avval kichik test orqali qaysi video va qaysi offfer eng arzon hamda to'lovga qodir mijoz olib kelishini topish kerak.`,
    steps: [
      `$${recommendedTestBudget} test byudjetini 4-5 ta turli xil reklama kreativiga (1: Muammo+Yechim, 2: Mijoz natijasi/Sharh, 3: Jonli obzor, 4: Maxsus Aksiya) bo'lib yoqing.`,
      `Dastlabki 72 soatda CTR ko'rsatkichi 1.2% dan past va lid narxi $${cplMax} dan qimmat bo'lgan roliklarni o'chiring.`,
      `Faqat arzon lid emas, balki CRM da "Sotuv" bosqichiga o'tgan kreativlarga asosiy byudjetni ($${idealOptimalBudget.toLocaleString()}) yo'naltiring.`,
      `${industry.topBottleneck} muammosini reklama bosqichidayoq filtrlaydigan saralovchi savol (Quiz yoki Lead-form) qo'shing.`
    ],
    deliverable: `Tasdiqlangan ishchi reklama bog'lamasi (CPL <= $${cplAvg})`
  });

  // 5-Tavsiya: Upakovka va Ishonch
  if (socialStatus !== 'excellent') {
    recommendations.push({
      priority: recommendations.length + 1,
      phase: '2-Bosqich: Brend va Ishonch (10–21 kun)',
      category: 'Upakovka & Kontent',
      title: 'Ijtimoiy tarmoqlar "Sotuvchi Upakovka"sini 7 ta ishonch bloki bilan qayta quring',
      timeline: '7 - 10 kun',
      impact: 'Reklama konversiyasini +15-20% ga yaxshilaydi',
      roiBadge: 'Brend kapitali',
      whyItMatters: 'Mijoz reklamangizni ko\'rib profilga kirganda 3 soniya ichida "Bularga ishonish mumkinmi?" degan savolga javob qidiradi.',
      steps: [
        `Bio (Shapka) qismini 4 qatorli formula asosida yozing: 1) Kimsiz va nima qilasiz, 2) Raqamlardagi tajriba/kafolat, 3) Bepul foyda (Lead-magnet), 4) Aloqa havolasi.`,
        `Aktualnoe (Highlights) bo'limiga 5 ta majburiy papka joylang: "Natijalar/Sharhlar", "Narxlar/Katalog", "Jarayon", "Ko'p beriladigan savollar", "Biz haqimizda".`,
        `Lenta boshiga 3 ta qadalgan (Pinned) Reels/Post qo'ying: 1) Kompaniya taqdimoti va UTP, 2) Eng kuchli mijoz keysi, 3) Hozirgi maxsus taklif.`
      ],
      deliverable: 'Mijozda birinchi qarashda ishonch uyg\'otuvchi sotuvchi vitrina'
    });
  }

  // 6-Tavsiya: LTV, O'rtacha Chek (Upsell) va Masshtablash
  recommendations.push({
    priority: recommendations.length + 1,
    phase: '3-Bosqich: Masshtablash va LTV (21–90 kun)',
    category: 'Unit-Ekonomika & LTV',
    title: `O'rtacha chekni +25% ga oshirish (Upsell) va eski mijozlar bazasidan qayta sotuv olish`,
    timeline: '20 - 60 kun',
    impact: `Qo'shimcha reklama xarajatisiz +$${Math.round(validTarget * 0.22).toLocaleString()}/oy daromad`,
    roiBadge: 'Sof Foyda Drayveri',
    whyItMatters: `Yangi mijozni jalb qilish eski mijozga qayta sotishdan 5-7 baravar qimmat. O'rtacha chekni $${validTicket} dan $${Math.round(validTicket * 1.25)} ga ko'tarish sof foydani keskin oshiradi.`,
    steps: [
      `Narxlar matritsasini 3 tarifli tizimga o'tkazing: "Standart ($${Math.round(validTicket * 0.85)})", "Optimal/Xit ($${validTicket})" va "VIP/Komplekt ($${Math.round(validTicket * 1.45)})". Mijozlarning 30% qismi VIP tarifni tanlaydi.`,
      `Xarid qilgan har bir mijozga 14-30 kundan so'ng avtomatik SMS/Telegram xabar yuborib, keyingi xarid uchun 10-15% yopiq kupon taqdim eting.`,
      `"Do'stingizga tavsiya qiling va bonus oling" (Referral) dasturini yo'lga qo'ying — har 5 ta mamnun mijoz kamida 1 ta yangi bepul mijoz olib keladi.`
    ],
    deliverable: `LTV:CAC nisbati > 3.5x bo'lgan yuqori marjinal biznes modeli`
  });

  return {
    id: `AUD-${Date.now().toString().slice(-6)}`,
    timestamp: new Date().toLocaleDateString('uz-UZ', { day: '2-digit', month: 'long', year: 'numeric' }),
    inputs: {
      ...formData,
      businessName,
      currentRevenue: validCurrentRev,
      targetRevenue: validTarget,
      averageTicket: validTicket,
      profitMargin: validMargin,
      conversionRate: validConversion
    },
    industry,
    platformObj,
    platformId,
    cpl: { min: cplMin, avg: cplAvg, max: cplMax },
    funnel: {
      currentClients,
      requiredClients,
      additionalClientsNeeded,
      growthMultiplier,
      requiredLeads,
      qualifiedLeads,
      estimatedClicks,
      estimatedImpressions,
      dailyLeadsNeeded,
      dailyClientsNeeded,
      dailyRevenueTarget,
      conversionRate: validConversion,
      averageTicket: validTicket,
      targetRevenue: validTarget,
      currentRevenue: validCurrentRev
    },
    budget: {
      // Ideal (tizimli) byudjet
      idealMin: idealMinBudget,
      idealAvg: idealAvgBudget,
      idealOptimal: idealOptimalBudget,
      // Real (jarima bilan, masalan $624 - $1,170)
      realMin: realMinBudget,
      realAvg: realAvgBudget,
      realOptimal: realOptimalBudget,
      // Legacy compatibility keys + explicit clarity
      baseMin: idealMinBudget,
      baseOptimal: idealOptimalBudget,
      adjustedMin: realMinBudget,
      adjustedOptimal: realOptimalBudget,
      realWaste: monthlyBudgetWaste,
      totalPenaltyPercent,
      corePenaltyPercent,
      operationalRiskPoints,
      recommendedTestBudget
    },
    unitEconomics: {
      profitMargin: validMargin,
      idealCAC,
      realCAC,
      grossProfitPerClient,
      netProfitPerClientFirstSale,
      repeatFactor,
      ltvRevenue,
      ltvGrossProfit,
      ltvCacRatio,
      totalMonthlyGrossProfit,
      netProfitAfterRealAds,
      netProfitAfterIdealAds,
      projectedROAS,
      idealROAS,
      projectedROMI
    },
    leakage: {
      monthlyWastedMoney: monthlyBudgetWaste,
      annualWastedMoney: annualBudgetWaste,
      missedClientsMonthly,
      missedRevenueMonthly,
      totalAnnualOpportunityLoss,
      potentialSavingsYearly: annualBudgetWaste
    },
    performance: {
      healthScore,
      riskLevel,
      radarMetrics,
      projectedROAS,
      potentialROAS: idealROAS
    },
    logicAlerts,
    penalties,
    recommendations
  };
}
