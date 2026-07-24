import { CONSULTANCY_PLAN_KEYS, PRICING, formatHkd, type PricingLocale } from "@/content/pricing";

export type InquiryCatalogItemId =
  | "eventXpTrial"
  | "smartSalesTrial"
  | "accountXpExperience"
  | "websiteStarter"
  | "aiReadinessAssessment"
  | "promptTrainingDay"
  | "aiDiscoverySprint"
  | "discoverySprint30Day"
  | "foundation3Month"
  | "accelerator6Month"
  | "partnership12Month";

export type InquiryCatalogItem = {
  id: InquiryCatalogItemId;
  amountHkd: number;
  titleEn: string;
  titleZh: string;
  blurbEn: string;
  blurbZh: string;
  layer: "quickCash" | "toolTrial" | "consultancy";
};

/** Public inquiry cart catalogue — external-facing offers visitors can shortlist. */
export const INQUIRY_CATALOG: InquiryCatalogItem[] = [
  {
    id: "eventXpTrial",
    amountHkd: PRICING.quickCash.eventXpTrial,
    titleEn: "EventXP trial",
    titleZh: "EventXP 試用",
    blurbEn: "One event: check-in, lead scoring, follow-up automation.",
    blurbZh: "1 場活動：簽到、名單評分、follow-up 自動化。",
    layer: "toolTrial",
  },
  {
    id: "smartSalesTrial",
    amountHkd: PRICING.quickCash.smartSalesTrial,
    titleEn: "SmartSales CRM trial",
    titleZh: "SmartSales CRM 試用",
    blurbEn: "WhatsApp workflow + CRM baseline + one sales process trial.",
    blurbZh: "WhatsApp workflow + CRM 基礎 + 1 條銷售流程試跑。",
    layer: "toolTrial",
  },
  {
    id: "accountXpExperience",
    amountHkd: PRICING.quickCash.accountXpExperience,
    titleEn: "AccountXP experience",
    titleZh: "AccountXP 體驗方案",
    blurbEn: "Receipt-capture pilot setup + first month live use.",
    blurbZh: "收據擷取 pilot 設定 + 首月正式使用。",
    layer: "toolTrial",
  },
  {
    id: "websiteStarter",
    amountHkd: PRICING.quickCash.websiteStarter,
    titleEn: "Website Starter",
    titleZh: "客製網站 Starter",
    blurbEn: "1 landing page, mobile, WhatsApp/Booking, basic SEO, 1 language (10 WD).",
    blurbZh: "1 Landing Page、Mobile、WhatsApp/Booking、基本 SEO、1 語言（10 工作日）。",
    layer: "toolTrial",
  },
  {
    id: "aiReadinessAssessment",
    amountHkd: PRICING.quickCash.aiReadinessAssessment,
    titleEn: "AI Readiness Assessment",
    titleZh: "AI 準備度評估",
    blurbEn: "Quick diagnosis + prioritized action list.",
    blurbZh: "快速診斷 + 優先排序清單。",
    layer: "quickCash",
  },
  {
    id: "promptTrainingDay",
    amountHkd: PRICING.quickCash.promptTrainingDay,
    titleEn: "Prompt training (1 day)",
    titleZh: "Prompt 實戰訓練營（1 日）",
    blurbEn: "Hands-on intro pricing / limited offer.",
    blurbZh: "新手體驗價／限時價 — 實戰訓練營。",
    layer: "quickCash",
  },
  {
    id: "aiDiscoverySprint",
    amountHkd: PRICING.quickCash.aiDiscoverySprint,
    titleEn: "AI Discovery Sprint",
    titleZh: "AI Discovery Sprint",
    blurbEn: "1–2 weeks: map + priority list + fixed implementation quote.",
    blurbZh: "1–2 週：流程圖 + 優先序 + 固定實施報價。",
    layer: "consultancy",
  },
  {
    id: "discoverySprint30Day",
    amountHkd: PRICING.consultancy.discoverySprint30Day,
    titleEn: "30-day Discovery Sprint",
    titleZh: "30 日 Discovery Sprint",
    blurbEn: "Paid filter: one core workflow, SOP draft, KPI baseline, roadmap.",
    blurbZh: "付費過濾器：1 個核心流程、SOP 初稿、KPI baseline、路線圖。",
    layer: "consultancy",
  },
  {
    id: "foundation3Month",
    amountHkd: PRICING.consultancy.foundation3Month,
    titleEn: "3-month AI Upgrade Foundation",
    titleZh: "3 個月 AI Upgrade Foundation",
    blurbEn: "1–2 workflows, SOP v1, monthly checkpoints, one team training.",
    blurbZh: "1–2 個流程、SOP v1、每月 checkpoint、1 次團隊培訓。",
    layer: "consultancy",
  },
  {
    id: "accelerator6Month",
    amountHkd: PRICING.consultancy.accelerator6Month,
    titleEn: "6-month AI Upgrade Accelerator",
    titleZh: "6 個月 AI Upgrade Accelerator",
    blurbEn: "Department / 3–4 workflows, adoption tracking, up to 2 workshops.",
    blurbZh: "一個部門／3–4 個流程、adoption 追蹤、最多 2 次工作坊。",
    layer: "consultancy",
  },
  {
    id: "partnership12Month",
    amountHkd: PRICING.consultancy.partnership12Month,
    titleEn: "12-month AI Business Upgrade Partnership",
    titleZh: "12 個月 AI Business Upgrade Partnership",
    blurbEn: "Annual roadmap, SOP governance, management reviews.",
    blurbZh: "年度 roadmap、SOP governance、管理層 review。",
    layer: "consultancy",
  },
];

export function getInquiryCatalogItem(id: string): InquiryCatalogItem | undefined {
  return INQUIRY_CATALOG.find((item) => item.id === id);
}

export function catalogTitle(item: InquiryCatalogItem, zh: boolean): string {
  return zh ? item.titleZh : item.titleEn;
}

export function catalogBlurb(item: InquiryCatalogItem, zh: boolean): string {
  return zh ? item.blurbZh : item.blurbEn;
}

export function formatCatalogPrice(item: InquiryCatalogItem, locale: PricingLocale): string {
  return formatHkd(item.amountHkd, locale);
}

export function consultancyCatalogId(planIndex: number): InquiryCatalogItemId {
  return CONSULTANCY_PLAN_KEYS[planIndex] ?? "discoverySprint30Day";
}
