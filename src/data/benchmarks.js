export const INDUSTRIES = [
  {
    id: 'ecommerce',
    name: 'E-commerce & Onlayn do\'kon (Gadjet, Texnika, Tovar)',
    shortName: 'E-commerce & Tovar',
    icon: 'PackageSearch',
    defaultTicket: 60,
    defaultConversion: 30,
    defaultMargin: 35,
    top10Conversion: 45,
    avgQualifiedRate: 75,
    avgRepeatPurchases: 2.2,
    cpl: {
      instagram: { min: 0.8, avg: 1.15, max: 1.5 },
      telegram: { min: 0.5, avg: 0.9, max: 1.4 },
      google: { min: 1.2, avg: 2.2, max: 3.8 },
      tiktok: { min: 0.4, avg: 0.8, max: 1.3 },
      bloggers: { min: 0.6, avg: 1.3, max: 2.5 },
      cold_outreach: { min: 3.0, avg: 5.5, max: 9.0 }
    },
    topBottleneck: 'Buyurtmani 15 daqiqa ichida tasdiqlamaslik va yetkazib berishdagi rad etishlar (otkaz)',
    keyAdvice: '5 daqiqalik tezkor qo\'ng\'iroq, Upsell (+30% chekni oshirish) va avtomatik Telegram bot bildirishnomalari',
    crmStages: [
      'Yangi murojaat (5 daqiqa SLA)',
      'Kvalifikatsiya & Ehtiyoj aniqlandi',
      'Komplekt (Upsell) taklif qilindi',
      'Manzil olindi / Dostavkada',
      'To\'lov qabul qilindi (Muvaffaqiyatli)',
      'Qayta xarid (30 kundan so\'ng)'
    ],
    salesScript: '«Assalomu alaykum [Ism]! Siz [Mahsulot] bo\'yicha murojaat qoldirgan edingiz. Ayni paytda ushbu modelimiz omborda 3 dona qoldi. Sizga o\'zingiz uchun kerakmi yoki sovg\'aga? Agar bugun rasmiylashtirsak, yetkazib berish + qo\'shimcha aksessuar sovg\'a sifatida qo\'shib beriladi!»',
    kpiFormula: 'Fiksa ($200) + Har bir tasdiqlangan buyurtmadan 3-5% + O\'rtacha chekni $75 dan oshirganlik uchun $100 bonus'
  },
  {
    id: 'education',
    name: 'Ta\'lim, O\'quv markazi & Infobiznes / Kurslar',
    shortName: 'Ta\'lim & Kurslar',
    icon: 'GraduationCap',
    defaultTicket: 80,
    defaultConversion: 20,
    defaultMargin: 55,
    top10Conversion: 35,
    avgQualifiedRate: 65,
    avgRepeatPurchases: 3.0,
    cpl: {
      instagram: { min: 0.6, avg: 1.2, max: 2.2 },
      telegram: { min: 0.4, avg: 0.85, max: 1.6 },
      google: { min: 1.2, avg: 2.4, max: 4.5 },
      tiktok: { min: 0.3, avg: 0.7, max: 1.3 },
      bloggers: { min: 0.5, avg: 1.1, max: 2.2 },
      cold_outreach: { min: 2.0, avg: 4.0, max: 7.5 }
    },
    topBottleneck: 'Sinov darsiga yozilgan o\'quvchilarning 50% gacha darsga kelmasligi (No-show)',
    keyAdvice: 'Sinov darsidan oldin 3 bosqichli SMS/Telegram isitish voronkasi va dars tugashi bilan 24 soatlik maxsus chegirma',
    crmStages: [
      'Yangi Lid (Bepul dars / Vebinar)',
      'Daraja aniqlandi & Sinov darsiga yozildi',
      '2 soat qolganda eslatma yuborildi',
      'Sinov darsida qatnashdi',
      'Kurs to\'lovi kutilmoqda (24 soatlik offfer)',
      'O\'quvchi guruhga qo\'shildi'
    ],
    salesScript: '«[Ism], sizning asosiy maqsadingiz [Natija, m-n: IELTS 7.0 / Dasturlashni o\'rganish] ekan. Bizning metodikamiz orqali 84% o\'quvchilarimiz 3 oyda bu natijaga chiqishmoqda. Keling, ertaga soat 18:00 dagi diagnostik darsimizga joyingizni band qilaman, ustozimiz shaxsan darajangizni tekshirib beradilar!»',
    kpiFormula: 'Fiksa ($150) + Sinov darsiga kelish konversiyasi (>60% bo\'lsa bonus) + Sotilgan kursdan 6-8%'
  },
  {
    id: 'services_b2b',
    name: 'B2B Xizmatlar, IT, Marketing & Konsalting',
    shortName: 'B2B & Agentlik',
    icon: 'Briefcase',
    defaultTicket: 400,
    defaultConversion: 20,
    defaultMargin: 60,
    top10Conversion: 32,
    avgQualifiedRate: 55,
    avgRepeatPurchases: 4.5,
    cpl: {
      instagram: { min: 1.5, avg: 3.2, max: 6.0 },
      telegram: { min: 1.0, avg: 2.2, max: 4.5 },
      google: { min: 3.0, avg: 6.0, max: 12.0 },
      tiktok: { min: 1.2, avg: 2.5, max: 5.0 },
      bloggers: { min: 2.0, avg: 4.5, max: 9.0 },
      cold_outreach: { min: 3.5, avg: 7.0, max: 15.0 }
    },
    topBottleneck: 'To\'g\'ridan-to\'g\'ri qimmat xizmatni sotishga urinish va uzoq muzokara davrida mijozni unutish',
    keyAdvice: '2 bosqichli sotuv: Avval bepul ekspress-audit yoki Zoom-razbor, keyin shaxsiy Tijoriy Taklif (KP) himoyasi',
    crmStages: [
      'Yangi B2B Lid',
      'Kvalifikatsiya (Byudjet va LPR aniqlandi)',
      'Zoom Audit / Uchrashuv belgilandi',
      'Audit o\'tkazildi & KP taqdim etildi',
      'Shartnoma va Hisob-faktura yuborildi',
      'To\'lov tushdi (Loyiha boshlandi)'
    ],
    salesScript: '«[Ism], sizning sohangizda [Muammo] sababli kompaniyalar oyiga 30% byudjet yo\'qotishadi. Biz yaqinda xuddi shunday loyihada sotuvni 2.4 baravarga oshirdik. Keling, 15 daqiqalik Zoom uchrashuvda sizning voronkangizni bepul audit qilib, 3 ta o\'sish nuqtasini ko\'rsatib beramiz!»',
    kpiFormula: 'Fiksa ($300) + O\'tkazilgan har bir sifatli Zoom uchrashuv uchun $5 + Yopilgan shartnomadan 8-12%'
  },
  {
    id: 'retail_clothing',
    name: 'Kiyim-kechak, Poyabzal, Aksessuar & Retail',
    shortName: 'Kiyim & Retail',
    icon: 'ShoppingBag',
    defaultTicket: 45,
    defaultConversion: 35,
    defaultMargin: 45,
    top10Conversion: 50,
    avgQualifiedRate: 80,
    avgRepeatPurchases: 2.8,
    cpl: {
      instagram: { min: 0.4, avg: 0.9, max: 1.6 },
      telegram: { min: 0.3, avg: 0.65, max: 1.2 },
      google: { min: 0.8, avg: 1.8, max: 3.2 },
      tiktok: { min: 0.25, avg: 0.6, max: 1.1 },
      bloggers: { min: 0.4, avg: 0.85, max: 1.8 },
      cold_outreach: { min: 2.5, avg: 5.0, max: 9.0 }
    },
    topBottleneck: 'Direct va izohlarda "Narxi qancha?" degan savolga faqat narxni yozib, muloqotni uzib qo\'yish',
    keyAdvice: 'Narxni aytishdan oldin o\'lchamni so\'rash, jonli videoda ko\'rsatish va "2 ta olsangiz 3-siga 40% chegirma" aksiyasi',
    crmStages: [
      'Direct / Telegram murojaat',
      'Razmer va rang aniqlandi',
      'Jonli foto/video va obraz yuborildi',
      'Do\'konga kelish yoki Dostavka tanlandi',
      'To\'lov amalga oshirildi',
      'VIP klub / Karta ochildi'
    ],
    salesScript: '«Xush kelibsiz [Ism]! Bu modelimiz 100% tabiiy matodan tikilgan, yuvilganda kirishmaydi. Siz odatda qaysi razmer kiyasiz — M yoki L? Hozir bo\'yingiz va vazningizni aytsangiz, sizga eng ideal tushadigan o\'lchamini o\'lchab rasmini tashlab beraman!»',
    kpiFormula: 'Fiksa ($180) + Sotuvdan 4% + "2+1 komplekt" sotilgan har bir chek uchun qo\'shimcha 2% bonus'
  },
  {
    id: 'real_estate_construction',
    name: 'Ko\'chmas mulk, Qurilish, Mebel & Ta\'mirlash',
    shortName: 'Qurilish & Mebel',
    icon: 'Building2',
    defaultTicket: 1500,
    defaultConversion: 10,
    defaultMargin: 30,
    top10Conversion: 18,
    avgQualifiedRate: 45,
    avgRepeatPurchases: 1.2,
    cpl: {
      instagram: { min: 2.5, avg: 5.5, max: 11.0 },
      telegram: { min: 1.8, avg: 4.0, max: 8.5 },
      google: { min: 4.0, avg: 8.5, max: 18.0 },
      tiktok: { min: 1.5, avg: 3.5, max: 7.0 },
      bloggers: { min: 3.0, avg: 6.5, max: 14.0 },
      cold_outreach: { min: 6.0, avg: 12.0, max: 25.0 }
    },
    topBottleneck: 'Telefonda narx aytib mijozni yo\'qotish; shourumga yoki bepul o\'lcham olishga (zamer) chiqarmaslik',
    keyAdvice: 'Telefon qo\'ng\'irog\'ining yagona maqsadi — bepul 3D loyiha / Zamer yoki Shourumga tashrifni sotish bo\'lishi shart',
    crmStages: [
      'Yangi murojaat (Katalog so\'rovi)',
      'Katalog yuborildi & Ehtiyoj aniqlandi',
      'Bepul Zamer / Shourumga uchrashuv belgilandi',
      '3D Dizayn va Smeta taqdim etildi',
      'Shartnoma va Avans to\'lovi',
      'Topshirildi & Video-sharh olindi'
    ],
    salesScript: '«[Ism], aniq narx xonangiz o\'lchami va furnitura turiga qarab 20-30% farq qiladi. Keling, ertaga ustamiz borib 15 daqiqada lazerda o\'lcham olib, sizga 3 xil byudjetdagi 3D dizaynni BEPUL tayyorlab beradi. Bu sizga hech qanday majburiyat yuklamaydi!»',
    kpiFormula: 'Fiksa ($250) + Har bir chiqilgan Zamer/Uchrashuv uchun $5 + Shartnoma summasidan 2-4%'
  },
  {
    id: 'medicine_clinic',
    name: 'Tibbiyot, Stomatologiya & Diagnostika Klinikasi',
    shortName: 'Tibbiyot & Klinika',
    icon: 'Stethoscope',
    defaultTicket: 120,
    defaultConversion: 25,
    defaultMargin: 50,
    top10Conversion: 42,
    avgQualifiedRate: 70,
    avgRepeatPurchases: 2.5,
    cpl: {
      instagram: { min: 1.2, avg: 2.5, max: 4.8 },
      telegram: { min: 0.8, avg: 1.8, max: 3.5 },
      google: { min: 2.0, avg: 4.2, max: 8.5 },
      tiktok: { min: 0.7, avg: 1.5, max: 3.0 },
      bloggers: { min: 1.0, avg: 2.2, max: 4.5 },
      cold_outreach: { min: 4.0, avg: 7.5, max: 14.0 }
    },
    topBottleneck: 'Koll-markaz xodimlari shifokor qabuliga yozish o\'rniga telefon orqali tibbiy maslahat berib yuborishi',
    keyAdvice: 'Birlamchi konsultatsiya + diagnostika paketini maxsus narxda taklif etib, bemorni klinikaga olib kelish',
    crmStages: [
      'Yangi bemor murojaati',
      'Simptomlar tinglandi & Shifokor tanlandi',
      'Qabul vaqti belgilandi (Bron)',
      '1 kun oldin SMS/Qo\'ng\'iroq tasdiq',
      'Ko\'rikdan o\'tdi & Davolash rejasi tuzildi',
      'To\'liq davolash kursi sotildi'
    ],
    salesScript: '«[Ism], siz aytgan belgilarga ko\'ra telefon orqali tashxis qo\'yish xavfli bo\'lishi mumkin. Bosh shifokorimiz [Ism Familiya] (12 yillik tajriba) ertaga soat 11:00 va 15:00 da bo\'sh vaqtlari bor. Aynan shu haftada birlamchi ko\'rik + UZI 50% chegirmada. Qaysi vaqtga yozib qo\'yay?»',
    kpiFormula: 'Fiksa ($200) + Klinikaga yetib kelgan har bir bemor uchun $2 + Davolash rejasidan 3%'
  },
  {
    id: 'beauty_fitness',
    name: 'Go\'zallik saloni, Kosmetologiya, Spa & Fitnes',
    shortName: 'Go\'zallik & Fitnes',
    icon: 'Sparkles',
    defaultTicket: 40,
    defaultConversion: 30,
    defaultMargin: 55,
    top10Conversion: 48,
    avgQualifiedRate: 75,
    avgRepeatPurchases: 4.0,
    cpl: {
      instagram: { min: 0.5, avg: 1.1, max: 2.2 },
      telegram: { min: 0.35, avg: 0.8, max: 1.6 },
      google: { min: 1.0, avg: 2.2, max: 4.5 },
      tiktok: { min: 0.3, avg: 0.65, max: 1.3 },
      bloggers: { min: 0.4, avg: 0.95, max: 2.0 },
      cold_outreach: { min: 2.5, avg: 5.0, max: 9.0 }
    },
    topBottleneck: 'Mijoz bir marta kelib qaytib kelmasligi; abonement yoki kurs sifatida sotilmasligi',
    keyAdvice: 'Birinchi tashrif uchun "Test-drayv" paketi va chiqib ketayotganda 3/6 oylik abonementga maxsus bonus',
    crmStages: [
      'Yangi Lid (Instagram/Telegram)',
      'Sinov muolajasi / Mashg\'ulotga yozildi',
      'Tashrif buyurdi',
      'Kurs / Abonement taklif qilindi',
      'Doimiy mijoz (LTV bazasi)',
      'Qayta eslatma (21 kundan keyin)'
    ],
    salesScript: '«Go\'zallik va salomatlik — bu tizimli natija! Bugungi birinchi muolajangizdan so\'ng teringiz qanchalik yangilanganini ko\'rdingiz. Agar bugun 5 martalik to\'liq kursni band qilsangiz, 1 ta muolaja mutlaqo BEPUL sovg\'a qilinadi!»',
    kpiFormula: 'Administrator fiksasi ($180) + Yozilgan mijozlarning kelish % + Abonement sotuvidan 5%'
  },
  {
    id: 'restaurant_horeca',
    name: 'Restoran, Kafe, Fast-Food, Yetkazib berish & HoReCa',
    shortName: 'Restoran & HoReCa',
    icon: 'UtensilsCrossed',
    defaultTicket: 25,
    defaultConversion: 40,
    defaultMargin: 42,
    top10Conversion: 60,
    avgQualifiedRate: 85,
    avgRepeatPurchases: 5.0,
    cpl: {
      instagram: { min: 0.35, avg: 0.75, max: 1.4 },
      telegram: { min: 0.2, avg: 0.5, max: 1.0 },
      google: { min: 0.6, avg: 1.4, max: 2.8 },
      tiktok: { min: 0.2, avg: 0.45, max: 0.9 },
      bloggers: { min: 0.25, avg: 0.6, max: 1.3 },
      cold_outreach: { min: 2.0, avg: 4.0, max: 8.0 }
    },
    topBottleneck: 'Mijozlar kontakt bazasi yig\'ilmasligi va o\'rtacha chekni oshiruvchi Kombo-menyu yo\'qligi',
    keyAdvice: 'Telegram bot / QR-keshbek tizimi orqali mijoz raqamini olish va har juma/dam olish kunlari push-xabar yuborish',
    crmStages: [
      'Bot / Telefon orqali buyurtma yoki Bron',
      'Kombo / Desert qo\'shimcha taklif qilindi',
      'Buyurtma yetkazildi / Mehmon kutib olindi',
      'Keshbek kartasi ochildi (Baza)',
      'Sifat bahosi (1-5 yulduz) olindi',
      'Haftalik aksiya yuborildi'
    ],
    salesScript: '«Buyurtmangiz qabul qilindi! Aytgancha, bugun bizda asosiy taom yoniga yangi "Chef-desert" va tabiiy limonad olsangiz 35% arzon tushadi. Qo\'shib qo\'yaymi?»',
    kpiFormula: 'Koll-markaz / Ofitsiant fiksasi + O\'rtacha chek rejasi bajarilganda +5% bonus'
  },
  {
    id: 'production_manufacturing',
    name: 'Ishlab chiqarish, Zavod & Ulgurji savdo (Optom / B2B)',
    shortName: 'Ishlab chiqarish (Optom)',
    icon: 'Factory',
    defaultTicket: 1800,
    defaultConversion: 15,
    defaultMargin: 28,
    top10Conversion: 25,
    avgQualifiedRate: 50,
    avgRepeatPurchases: 6.0,
    cpl: {
      instagram: { min: 2.0, avg: 4.5, max: 9.5 },
      telegram: { min: 1.5, avg: 3.2, max: 7.0 },
      google: { min: 3.0, avg: 6.5, max: 14.0 },
      tiktok: { min: 1.2, avg: 2.8, max: 6.0 },
      bloggers: { min: 2.5, avg: 5.5, max: 12.0 },
      cold_outreach: { min: 4.0, avg: 8.5, max: 18.0 }
    },
    topBottleneck: 'Dilerlar va ulgurji xaridorlarga narxlar jadvali (Prays-list) yuborilgach, qayta aloqa qilinmasligi',
    keyAdvice: 'Sinov partiyasini (Test zakaz) xavfsiz kafolat bilan sotish va hududiy dilerlarni har 14 kunda avtomatik tekshirish',
    crmStages: [
      'Ulgurji so\'rov / Dilerlik arizasi',
      'Hajm va hudud aniqlandi',
      'Prays-list va Namuna (Sample) yuborildi',
      'Sinov partiyasi (Test zakaz) to\'lovi',
      'Doimiy shartnoma imzolandi',
      'Har oylik qayta yuklama (Re-order)'
    ],
    salesScript: '«[Ism], ulgurji prays-listimizni Telegramingizga yubordim. Sizning hududingizda eng tez sotiladigan 5 ta xit pozitsiyamizdan iborat "Sinov to\'plami" bor — agar 30 kunda sotilmasa, boshqa xaridorgir modelga almashtirib berish kafolatini beramiz!»',
    kpiFormula: 'Fiksa ($300) + Yangi jalb qilingan diler uchun $30 bonus + Ulgurji tushumdan 1-2%'
  }
];

export const PLATFORMS = [
  { id: 'instagram', name: 'Instagram & Facebook Target', short: 'Instagram Ads', icon: 'Smartphone', desc: 'Vizual va video kreativlar orqali tezkor lidlar' },
  { id: 'telegram', name: 'Telegram Ads & Kanallar', short: 'Telegram', icon: 'Send', desc: 'O\'zbekistonda eng faol auditoriya va bot voronkalari' },
  { id: 'google', name: 'Google Qidiruv & YouTube', short: 'Google Ads', icon: 'Globe', desc: 'Aniq ehtiyoji bor "issiq" mijozlar oqimi' },
  { id: 'tiktok', name: 'TikTok Ads & Organik Reels', short: 'TikTok', icon: 'Video', desc: 'Arzon qamrov va viral video trafigi' },
  { id: 'bloggers', name: 'Blogerlar & Influencerlar', short: 'Blogerlar', icon: 'Sparkles', desc: 'Shaxsiy ishonch orqali yuqori konversiyali sotuv' },
  { id: 'cold_outreach', name: 'B2B Sovuq Qo\'ng\'iroq / Outreach', short: 'B2B Outreach', icon: 'PhoneCall', desc: 'Yirik korporativ mijozlarga to\'g\'ridan-to\'g\'ri chiqish' }
];

export const DEMO_PRESETS = [
  {
    id: 'prompt_case',
    title: '🔥 Sizning Asosiy Keysingiz ($10,000)',
    badge: 'Asosiy Misol',
    subtitle: 'Maqsad $10,000 • Chek $60 • Konversiya 30% • CRM va Sotuvchi yo\'q',
    data: {
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
      customCplMin: 0.8,
      customCplMax: 1.5
    }
  },
  {
    id: 'education_center',
    title: '🎓 O\'quv Markazi & Kurslar ($15,000)',
    badge: 'Ta\'lim',
    subtitle: 'Maqsad $15,000 • Chek $80 • Konversiya 20% • Telegram Ads',
    data: {
      businessName: 'Pro Academy',
      isBusinessOwner: 'yes',
      hasCrm: 'excel',
      hasSalesTeam: 'small_team',
      responseSpeed: 'medium_30m',
      hasSalesScript: 'partial',
      socialStatus: 'fair',
      hasMarketingTracking: 'basic',
      hasDatabaseRetention: 'no',
      industryId: 'education',
      platformId: 'telegram',
      currentRevenue: 6500,
      targetRevenue: 15000,
      averageTicket: 80,
      profitMargin: 55,
      conversionRate: 20,
      customCplMin: null,
      customCplMax: null
    }
  },
  {
    id: 'b2b_agency',
    title: '💼 B2B IT & Marketing Agentligi ($30,000)',
    badge: 'B2B / Xizmat',
    subtitle: 'Maqsad $30,000 • Chek $500 • Konversiya 20% • To\'liq tizim',
    data: {
      businessName: 'Apex B2B Agency',
      isBusinessOwner: 'yes',
      hasCrm: 'full_crm',
      hasSalesTeam: 'full_dept',
      responseSpeed: 'fast_5m',
      hasSalesScript: 'yes',
      socialStatus: 'excellent',
      hasMarketingTracking: 'advanced',
      hasDatabaseRetention: 'active',
      industryId: 'services_b2b',
      platformId: 'instagram',
      currentRevenue: 14000,
      targetRevenue: 30000,
      averageTicket: 500,
      profitMargin: 60,
      conversionRate: 20,
      customCplMin: null,
      customCplMax: null
    }
  },
  {
    id: 'real_estate_mebel',
    title: '🛋️ Mebel & Qurilish Kompaniya ($45,000)',
    badge: 'Yirik Chek',
    subtitle: 'Maqsad $45,000 • Chek $1,500 • Konversiya 10% • Instagram',
    data: {
      businessName: 'Lux Interior & Mebel',
      isBusinessOwner: 'director',
      hasCrm: 'no',
      hasSalesTeam: 'small_team',
      responseSpeed: 'slow_hours',
      hasSalesScript: 'no',
      socialStatus: 'fair',
      hasMarketingTracking: 'no',
      hasDatabaseRetention: 'no',
      industryId: 'real_estate_construction',
      platformId: 'instagram',
      currentRevenue: 18000,
      targetRevenue: 45000,
      averageTicket: 1500,
      profitMargin: 30,
      conversionRate: 10,
      customCplMin: null,
      customCplMax: null
    }
  }
];
