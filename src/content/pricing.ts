/**
 * Single source of truth for InnovateXP public pricing (HKD).
 * All pages should reference these values — do not hard-code prices elsewhere.
 */
export const PRICING_CURRENCY = "HKD" as const;

/** Verified BNI member discount on advisory / quick-cash services (not automatic on custom implementation). */
export const BNI_MEMBER_DISCOUNT_PERCENT = 30;

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
    /** AI Discovery Sprint — custom workflow entry (1–2 weeks) */
    aiDiscoverySprint: 6_800,
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
  },
} as const;

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
      return `如經查證為 BNI 會員，advisory 及 quick-cash 服務可享 ${pct}% 折扣（工具試用及客製實施按 scope 另行確認）。`;
    case "ja":
      return `BNI会員であることが確認された場合、advisoryおよびクイックキャッシュサービスは${pct}%割引（ツール試用・カスタム実装は別途）。`;
    case "de":
      return `Verifizierte BNI-Mitglieder erhalten ${pct}% Rabatt auf Advisory- und Quick-Cash-Services (Tool-Trials und Custom Implementation separat).`;
    default:
      return `Verified BNI members receive ${pct}% off advisory and quick-cash services (tool trials and custom implementation scoped separately).`;
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
  return [
    { id: "eventXpTrial", price: formatHkd(q.eventXpTrial, locale), order: 1 },
    { id: "smartSalesTrial", price: formatHkd(q.smartSalesTrial, locale), order: 2 },
    { id: "aiReadinessAssessment", price: formatHkdFrom(locale)(q.aiReadinessAssessment), order: 3 },
    { id: "promptTrainingDay", price: `${formatHkd(q.promptTrainingDay, locale)}${day}`, order: 4 },
    { id: "aiDiscoverySprint", price: formatHkd(q.aiDiscoverySprint, locale), order: 5 },
  ].sort((a, b) => a.order - b.order);
}
