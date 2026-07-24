/**
 * Single source of truth for InnovateXP public pricing (HKD).
 * All pages should reference these values — do not hard-code prices elsewhere.
 */
export const PRICING_CURRENCY = "HKD" as const;

/** Verified BNI member discount on advisory / tool-trial services (stacked with referral where noted). */
export const BNI_MEMBER_DISCOUNT_PERCENT = 30;

/** Referral discount when a referred team starts a tool trial (before BNI stack). */
export const REFERRAL_DISCOUNT_PERCENT = 10;

/** Rush / 加急交付 surcharge on one-time project totals. */
export const RUSH_SURCHARGE_PERCENT = 30;

export const PRICING = {
  quickCash: {
    /** Prompt 實戰訓練營 — 1 day */
    promptTrainingDay: 2_500,
    /** AI 準備度評估 */
    aiReadinessAssessment: 3_000,
    /** EventXP 試用 — 1 場活動 */
    eventXpTrial: 4_000,
    /** SmartSales CRM 試用 */
    smartSalesTrial: 5_000,
    /**
     * AccountXP（Accounting Tools）體驗方案 — 一次性
     * 收據擷取 pilot 設定 + 首月正式使用
     */
    accountXpExperience: 1_880,
    /** @deprecated Use accountXpExperience — kept for migration grep only */
    accountingChatbotTrialWeek: 1_880,
    /** @deprecated Use accountXpExperience */
    accountingChatbotTrialMonth: 1_880,
    /** AI Discovery Sprint — custom workflow entry (1–2 weeks) */
    aiDiscoverySprint: 6_800,
    /** Customised Website Starter — 一次性 Base Package */
    websiteStarter: 3_800,
  },
  /** AI 商業升級陪跑 — aligned with pitch deck */
  consultancy: {
    discoverySprint30Day: 6_800,
    foundation3Month: 26_000,
    accelerator6Month: 50_000,
    partnership12Month: 98_000,
  },
  /** Full product tiers (after trial / validated workflow) */
  tools: {
    eventXp: {
      trial: 4_000,
      /** Aligned 3-tier monthly scale (with AccountXP) */
      maintenanceStarterMonthly: 480,
      maintenanceGrowthMonthly: 680,
      maintenanceEnterpriseMonthly: 1_080,
    },
    smartSales: {
      trial: 5_000,
      setupStarter: 10_800,
      setupGrowth: 18_880,
      maintenanceStarterMonthly: 880,
      maintenanceGrowthMonthly: 1_280,
      maintenanceEnterpriseMonthly: 1_680,
    },
    accountXp: {
      experience: 1_880,
      maintenanceStarterMonthly: 480,
      maintenanceGrowthMonthly: 680,
      maintenanceEnterpriseMonthly: 1_080,
    },
    website: {
      starter: 3_800,
      deliveryWorkingDays: 10,
      maintenanceStarterMonthly: 880,
      maintenanceGrowthMonthly: 1_280,
      maintenanceEnterpriseMonthly: 1_680,
    },
  },
  /** Customised Website 點心紙（Add-on Menu） */
  websiteAddons: {
    extraPage: 1_200,
    extraLocale: 1_500,
    ecommerceGatewayConnect: 2_800,
    ecommerceGatewaySetup: 4_800,
    whatsappBookingIntegration: 1_800,
    blogCms: 3_200,
    brandLogoVisual: 2_800,
    geoSeoSetupPlus3Months: 1_800,
  },
} as const;

export type WebsiteAddonId = keyof typeof PRICING.websiteAddons;

export const WEBSITE_ADDON_IDS = Object.keys(PRICING.websiteAddons) as WebsiteAddonId[];

export type PricingLocale = "en" | "zh-hk" | "zh-tw" | "ja" | "de";

function formatNumber(amount: number, locale: PricingLocale): string {
  if (locale === "de") {
    return amount.toLocaleString("de-DE");
  }
  return amount.toLocaleString("en-HK");
}

/** e.g. HK$6,800 or HKD 6,800 */
export function formatHkd(amount: number, locale: PricingLocale = "en", prefix: "HK$" | "HKD" = "HK$"): string {
  const n = formatNumber(amount, locale);
  if (prefix === "HKD") {
    return locale.startsWith("zh") || locale === "ja" ? `HKD ${n}` : `HKD ${n}`;
  }
  return `HK$${n}`;
}

export function formatHkdFrom(locale: PricingLocale = "en"): (amount: number) => string {
  const suffix = locale.startsWith("zh") ? " 起" : locale === "ja" ? "〜" : locale === "de" ? " ab" : " from";
  return (amount: number) => `${formatHkd(amount, locale)}${suffix}`;
}

export function formatBniDiscountNote(locale: PricingLocale): string {
  const pct = BNI_MEMBER_DISCOUNT_PERCENT;
  switch (locale) {
    case "zh-hk":
    case "zh-tw":
      return `工具體驗期滿可約談買斷或續期。填寫 feedback 可享下次回購折扣；成功 referral 可享 ${REFERRAL_DISCOUNT_PERCENT}% 折扣；如經查證為 BNI 會員，advisory 及工具體驗可再享 ${pct}% 折扣（客製實施按 scope 另行確認）。`;
    case "ja":
      return `BNI会員であることが確認された場合、advisoryおよびクイックキャッシュサービスは${pct}%割引（ツール試用・カスタム実装は別途）。`;
    case "de":
      return `Verifizierte BNI-Mitglieder erhalten ${pct}% Rabatt auf Advisory- und Quick-Cash-Services (Tool-Trials und Custom Implementation separat).`;
    default:
      return `After a tool experience package, book a review to decide buyout or subscription. Feedback unlocks a return discount; successful referrals receive ${REFERRAL_DISCOUNT_PERCENT}% off; verified BNI members receive an additional ${pct}% off advisory and tool packages (custom implementation scoped separately).`;
  }
}

export const CONSULTANCY_PLAN_KEYS = [
  "discoverySprint30Day",
  "foundation3Month",
  "accelerator6Month",
  "partnership12Month",
] as const;

export function getConsultancyPlans(locale: PricingLocale) {
  const fixed = (n: number) => formatHkd(n, locale);
  const c = PRICING.consultancy;
  return [
    { key: "discoverySprint30Day" as const, price: fixed(c.discoverySprint30Day) },
    { key: "foundation3Month" as const, price: fixed(c.foundation3Month) },
    { key: "accelerator6Month" as const, price: fixed(c.accelerator6Month) },
    { key: "partnership12Month" as const, price: fixed(c.partnership12Month) },
  ];
}

export function getQuickCashOffers(locale: PricingLocale) {
  const q = PRICING.quickCash;
  const day = locale.startsWith("zh") ? "/ 日" : locale === "ja" ? "/日" : "/ day";
  const once = locale.startsWith("zh") ? "（一次）" : locale === "ja" ? "（一式）" : " (one-time)";
  return [
    { id: "eventXpTrial", price: formatHkd(q.eventXpTrial, locale), order: 1 },
    { id: "smartSalesTrial", price: formatHkd(q.smartSalesTrial, locale), order: 2 },
    { id: "accountXpExperience", price: `${formatHkd(q.accountXpExperience, locale)}${once}`, order: 3 },
    { id: "websiteStarter", price: `${formatHkd(q.websiteStarter, locale)}${once}`, order: 4 },
    { id: "aiReadinessAssessment", price: formatHkdFrom(locale)(q.aiReadinessAssessment), order: 5 },
    { id: "promptTrainingDay", price: `${formatHkd(q.promptTrainingDay, locale)}${day}`, order: 6 },
    { id: "aiDiscoverySprint", price: formatHkd(q.aiDiscoverySprint, locale), order: 7 },
  ].sort((a, b) => a.order - b.order);
}

export type WebsiteQuoteInput = {
  /** Extra pages beyond the base landing */
  extraPages?: number;
  /** Extra language versions beyond the included one */
  extraLocales?: number;
  /** Selected one-off add-on ids (excludes per-unit page/locale) */
  addons?: WebsiteAddonId[];
  rush?: boolean;
};

export type WebsiteQuoteLine = {
  id: string;
  labelKey: string;
  qty: number;
  unitPrice: number;
  lineTotal: number;
};

export type WebsiteQuoteResult = {
  lines: WebsiteQuoteLine[];
  subtotal: number;
  rushPercent: number;
  rushAmount: number;
  totalOneTime: number;
  maintenanceMonthly: {
    starter: number;
    growth: number;
    enterprise: number;
  };
};

const ADDON_LABEL_KEYS: Record<WebsiteAddonId, string> = {
  extraPage: "pricing.website.addon.extraPage",
  extraLocale: "pricing.website.addon.extraLocale",
  ecommerceGatewayConnect: "pricing.website.addon.ecommerceConnect",
  ecommerceGatewaySetup: "pricing.website.addon.ecommerceSetup",
  whatsappBookingIntegration: "pricing.website.addon.whatsappBooking",
  blogCms: "pricing.website.addon.blogCms",
  brandLogoVisual: "pricing.website.addon.brandLogo",
  geoSeoSetupPlus3Months: "pricing.website.addon.geoSeo",
};

/** Public EN labels for quote summaries / emails (wizard can map via i18n separately). */
export const WEBSITE_ADDON_LABELS_EN: Record<WebsiteAddonId, string> = {
  extraPage: "Extra page (each)",
  extraLocale: "Extra language version (each)",
  ecommerceGatewayConnect: "E-commerce (20 SKUs + payment gateway connect)",
  ecommerceGatewaySetup: "E-commerce (20 SKUs + payment gateway setup)",
  whatsappBookingIntegration: "WhatsApp + Booking System integration",
  blogCms: "Blog / news layout + CMS",
  brandLogoVisual: "Brand logo / visual design",
  geoSeoSetupPlus3Months: "GEO + SEO advanced setup + 3 months optimisation",
};

export const WEBSITE_ADDON_LABELS_ZH: Record<WebsiteAddonId, string> = {
  extraPage: "額外頁面（每頁）",
  extraLocale: "多語言版本（每種）",
  ecommerceGatewayConnect: "網店／電商（20 件 SKU + Payment gateway 接駁）",
  ecommerceGatewaySetup: "網店／電商（20 件 SKU + Payment gateway setup）",
  whatsappBookingIntegration: "WhatsApp + Booking System 整合",
  blogCms: "Blog／新聞版面 + CMS",
  brandLogoVisual: "品牌 Logo／視覺設計",
  geoSeoSetupPlus3Months: "GEO + SEO 進階包（首次 setup）+ 再優化 3 個月",
};

/**
 * Quote calculator for Customised Website Starter + 點心紙 add-ons.
 * Base package is always included; guests pick items → base + add-ons = quote.
 */
export function computeWebsiteQuote(input: WebsiteQuoteInput = {}): WebsiteQuoteResult {
  const extraPages = Math.max(0, Math.floor(input.extraPages ?? 0));
  const extraLocales = Math.max(0, Math.floor(input.extraLocales ?? 0));
  const selected = new Set(input.addons ?? []);
  // Per-unit items are driven by qty, not the flat addon set
  selected.delete("extraPage");
  selected.delete("extraLocale");

  const lines: WebsiteQuoteLine[] = [
    {
      id: "base",
      labelKey: "pricing.website.base",
      qty: 1,
      unitPrice: PRICING.tools.website.starter,
      lineTotal: PRICING.tools.website.starter,
    },
  ];

  if (extraPages > 0) {
    lines.push({
      id: "extraPage",
      labelKey: ADDON_LABEL_KEYS.extraPage,
      qty: extraPages,
      unitPrice: PRICING.websiteAddons.extraPage,
      lineTotal: extraPages * PRICING.websiteAddons.extraPage,
    });
  }
  if (extraLocales > 0) {
    lines.push({
      id: "extraLocale",
      labelKey: ADDON_LABEL_KEYS.extraLocale,
      qty: extraLocales,
      unitPrice: PRICING.websiteAddons.extraLocale,
      lineTotal: extraLocales * PRICING.websiteAddons.extraLocale,
    });
  }

  for (const id of WEBSITE_ADDON_IDS) {
    if (id === "extraPage" || id === "extraLocale") continue;
    if (!selected.has(id)) continue;
    const unitPrice = PRICING.websiteAddons[id];
    lines.push({
      id,
      labelKey: ADDON_LABEL_KEYS[id],
      qty: 1,
      unitPrice,
      lineTotal: unitPrice,
    });
  }

  const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);
  const rushPercent = input.rush ? RUSH_SURCHARGE_PERCENT : 0;
  const rushAmount = Math.round((subtotal * rushPercent) / 100);
  const totalOneTime = subtotal + rushAmount;

  return {
    lines,
    subtotal,
    rushPercent,
    rushAmount,
    totalOneTime,
    maintenanceMonthly: {
      starter: PRICING.tools.website.maintenanceStarterMonthly,
      growth: PRICING.tools.website.maintenanceGrowthMonthly,
      enterprise: PRICING.tools.website.maintenanceEnterpriseMonthly,
    },
  };
}

export function formatWebsiteQuoteSummary(
  quote: WebsiteQuoteResult,
  locale: PricingLocale = "en",
): string {
  const labels = locale.startsWith("zh") ? WEBSITE_ADDON_LABELS_ZH : WEBSITE_ADDON_LABELS_EN;
  const baseLabel = locale.startsWith("zh")
    ? "Website Starter Base Package"
    : "Website Starter Base Package";
  const lines = quote.lines.map((line) => {
    const label =
      line.id === "base"
        ? baseLabel
        : labels[line.id as WebsiteAddonId] || line.labelKey;
    const qty = line.qty > 1 ? ` × ${line.qty}` : "";
    return `- ${label}${qty}: ${formatHkd(line.lineTotal, locale)}`;
  });
  if (quote.rushAmount > 0) {
    lines.push(
      `- ${locale.startsWith("zh") ? "加急交付" : "Rush delivery"} (+${quote.rushPercent}%): ${formatHkd(quote.rushAmount, locale)}`,
    );
  }
  lines.push(
    `${locale.startsWith("zh") ? "一次性合計" : "One-time total"}: ${formatHkd(quote.totalOneTime, locale)}`,
  );
  lines.push(
    `${locale.startsWith("zh") ? "基本維護月費" : "Maintenance (monthly)"}: ${formatHkd(quote.maintenanceMonthly.starter, locale)} / ${formatHkd(quote.maintenanceMonthly.growth, locale)} / ${formatHkd(quote.maintenanceMonthly.enterprise, locale)}`,
  );
  return lines.join("\n");
}
