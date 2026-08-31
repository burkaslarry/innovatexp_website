/*
 * Public HKD amounts — one table, four buyer jobs.
 *
 *   A  System Care     already-live systems (monthly or one-off)
 *   B  Discovery       paid filter; list price is ≤10 people
 *   C  Implementation  quoted after Discovery (Starter / Pro)
 *   D  Vertical product  demo → Discovery → Sprint
 *
 * Snapshot (HK$3,000) is a downsell into B, not a fifth line.
 * Aligned with Notion「定價政策 — Quick Cash Funnel（2026-07）」.
 * Pages must read these values. Do not hard-code amounts elsewhere.
 */
import { SCOPED_SOP_PRICE_LABEL } from "@/content/pricing-labels";

export const PRICING_CURRENCY = "HKD" as const;

/** Verified BNI member discount on advisory / tool-trial services (stacked with referral where noted). */
export const BNI_MEMBER_DISCOUNT_PERCENT = 30;

/** Referral discount when a referred team starts a tool trial (before BNI stack). */
export const REFERRAL_DISCOUNT_PERCENT = 10;

/** Rush / 加急交付 surcharge on one-time project totals. */
export const RUSH_SURCHARGE_PERCENT = 30;

export const PRICING = {
  /* Downsell + training + trial entry amounts. */
  quickCash: {
    /** Prompt 實戰訓練營 — 1 day（新手體驗／限時價） */
    promptTrainingDay: 2_500,
    /** AI 準備度評估 */
    aiReadinessAssessment: 3_000,
    /** Top-up when AI Readiness Snapshot upgrades to HK$6,800 Discovery within 14 days. */
    aiReadinessDiscoveryTopUp: 3_800,
    /** EventXP 試用 — 1 場活動 */
    eventXpTrial: 4_000,
    /** SmartSales CRM 試用 */
    smartSalesTrial: 5_000,
    /**
     * AccountXP（Accounting Tools）體驗方案 — 一次性
     * 收據擷取 pilot 設定 + 首月正式使用
     */
    accountXpExperience: 3_000,
    /** @deprecated Use accountXpExperience — kept for migration grep only */
    accountingChatbotTrialWeek: 3_000,
    /** @deprecated Use accountXpExperience */
    accountingChatbotTrialMonth: 3_000,
    /** AI Discovery Sprint — custom workflow entry (1–2 weeks) */
    aiDiscoverySprint: 6_800,
    /** Customised Website Starter — basic company site (poster Online Presence) */
    websiteStarter: 3_000,
    /** Basic e-shop package (or sales commission model) */
    websiteEshop: 12_000,
  },
  /* Line B — Discovery list price plus scoped longer programs. */
  consultancy: {
    discoverySprint30Day: 6_800,
    discoveryWorkshop11To30: 13_600,
    foundation3Month: 26_000,
    accelerator6Month: 50_000,
    partnership12Month: 98_000,
  },
  /* Line A — retainers. Response time is triage, not a fix SLA. */
  systemCare: {
    essentialMonthly: 4_000,
    growthMonthly: 8_000,
    priorityMonthly: 12_000,
    oneOffFrom: 4_000,
    oneOffTo: 12_000,
  },
  /* Product subscriptions after a trial. Not System Care. */
  tools: {
    eventXp: {
      trial: 4_000,
      /** Aligned 3-tier monthly scale (with AccountXP) — Quick Cash Funnel */
      maintenanceStarterMonthly: 880,
      maintenanceGrowthMonthly: 1_280,
      maintenanceEnterpriseMonthly: 1_480,
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
      experience: 3_000,
      /** @deprecated Poster pack uses experience + Starter/Growth/Enterprise monthly */
      flagshipMonthly: 99,
      maintenanceStarterMonthly: 880,
      maintenanceGrowthMonthly: 1_280,
      maintenanceEnterpriseMonthly: 1_480,
    },
    fitnessXp: {
      /** Studio operations monthly — from poster pack */
      flagshipMonthly: 499,
    },
    website: {
      starter: 3_000,
      eshop: 12_000,
      contentAutomationMonthlyFrom: 800,
      seoGeoAutoPostsMonthlyFrom: 1_800,
      deliveryWorkingDays: 10,
      maintenanceStarterMonthly: 880,
      maintenanceGrowthMonthly: 1_280,
      maintenanceEnterpriseMonthly: 1_680,
    },
  },
  /** Customised Website 點心紙（Add-on Menu）— Notion Quick Cash Funnel */
  websiteAddons: {
    extraPage: 800,
    extraLocale: 1_500,
    ecommerceGatewayConnect: 3_800,
    ecommerceGatewaySetup: 3_800,
    whatsappBookingIntegration: 1_800,
    blogCms: 1_200,
    brandLogoVisual: 2_500,
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
  const scoped = SCOPED_SOP_PRICE_LABEL[locale] ?? SCOPED_SOP_PRICE_LABEL.en;
  const c = PRICING.consultancy;
  return [
    { key: "discoverySprint30Day" as const, price: fixed(c.discoverySprint30Day) },
    { key: "foundation3Month" as const, price: scoped },
    { key: "accelerator6Month" as const, price: scoped },
    { key: "partnership12Month" as const, price: scoped },
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
    { id: "aiReadinessAssessment", price: formatHkd(q.aiReadinessAssessment, locale), order: 5 },
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
  ecommerceGatewayConnect: "E-commerce (basic, up to 20 products)",
  ecommerceGatewaySetup: "E-commerce (basic, up to 20 products)",
  whatsappBookingIntegration: "WhatsApp / Booking automation integration",
  blogCms: "Blog / news layout",
  brandLogoVisual: "Brand logo / visual design",
  geoSeoSetupPlus3Months: "Advanced SEO package",
};

export const WEBSITE_ADDON_LABELS_ZH: Record<WebsiteAddonId, string> = {
  extraPage: "額外頁面（每頁）",
  extraLocale: "多語言版本（每種）",
  ecommerceGatewayConnect: "網店／電商功能（基本，20 件產品內）",
  ecommerceGatewaySetup: "網店／電商功能（基本，20 件產品內）",
  whatsappBookingIntegration: "WhatsApp／Booking 自動化整合",
  blogCms: "Blog／新聞版面",
  brandLogoVisual: "品牌 Logo／視覺設計",
  geoSeoSetupPlus3Months: "SEO 進階優化包",
};

/*
 * Website quote — one job per helper.
 * Policy: base is always in; pages/locales are qty; other add-ons are flags;
 * rush is a surcharge on the subtotal; maintenance is reported, not added.
 */
export function computeWebsiteQuote(input: WebsiteQuoteInput = {}): WebsiteQuoteResult {
  const lines = [
    websiteBaseLine(),
    ...websitePerUnitLines(input),
    ...websiteFlaggedAddonLines(input),
  ];
  const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);
  const rush = websiteRush(subtotal, Boolean(input.rush));

  return {
    lines,
    subtotal,
    ...rush,
    totalOneTime: subtotal + rush.rushAmount,
    maintenanceMonthly: websiteMaintenance(),
  };
}

function websiteBaseLine(): WebsiteQuoteLine {
  return {
    id: "base",
    labelKey: "pricing.website.base",
    qty: 1,
    unitPrice: PRICING.tools.website.starter,
    lineTotal: PRICING.tools.website.starter,
  };
}

function websitePerUnitLines(input: WebsiteQuoteInput): WebsiteQuoteLine[] {
  const extraPages = Math.max(0, Math.floor(input.extraPages ?? 0));
  const extraLocales = Math.max(0, Math.floor(input.extraLocales ?? 0));
  const lines: WebsiteQuoteLine[] = [];

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
  return lines;
}

function websiteFlaggedAddonLines(input: WebsiteQuoteInput): WebsiteQuoteLine[] {
  const selected = new Set(input.addons ?? []);
  selected.delete("extraPage");
  selected.delete("extraLocale");

  return WEBSITE_ADDON_IDS.filter((id) => id !== "extraPage" && id !== "extraLocale" && selected.has(id)).map(
    (id) => ({
      id,
      labelKey: ADDON_LABEL_KEYS[id],
      qty: 1,
      unitPrice: PRICING.websiteAddons[id],
      lineTotal: PRICING.websiteAddons[id],
    }),
  );
}

function websiteRush(subtotal: number, rush: boolean): { rushPercent: number; rushAmount: number } {
  const rushPercent = rush ? RUSH_SURCHARGE_PERCENT : 0;
  return {
    rushPercent,
    rushAmount: Math.round((subtotal * rushPercent) / 100),
  };
}

function websiteMaintenance(): WebsiteQuoteResult["maintenanceMonthly"] {
  return {
    starter: PRICING.tools.website.maintenanceStarterMonthly,
    growth: PRICING.tools.website.maintenanceGrowthMonthly,
    enterprise: PRICING.tools.website.maintenanceEnterpriseMonthly,
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
