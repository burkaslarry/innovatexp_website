/**
 * Compelling SERP titles (~55–60 chars) and descriptions (~150–160 chars).
 * EN titles avoid leading with “Hong Kong” where US/intl impressions dominate.
 */
import type { AppLocale } from "@/lib/i18n-routing";
import { localeUsesChineseCopy } from "@/lib/i18n-routing";

export type PageSeo = {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
};

type LocalePair = { zh: PageSeo; en: PageSeo };

function pick(locale: AppLocale, pair: LocalePair): PageSeo {
  return localeUsesChineseCopy(locale) ? pair.zh : pair.en;
}

const HOME: LocalePair = {
  zh: {
    title: "AI商業顧問｜先執順流程再落地AI｜InnovateXP",
    description:
      "InnovateXP 陪中小企先梳理 SOP、KPI，再試行 AI 與自動化。30 日 Discovery Sprint、陪跑計劃、EventXP／SmartSales／Accounting Chatbot 按需落地。立即預約診斷。",
  },
  en: {
    title: "AI Business Consultancy | Fix Workflows, Then AI | InnovateXP",
    description:
      "InnovateXP helps SMEs clarify SOPs and KPIs first, then adopt AI through Discovery Sprints, advisory programs, and optional CRM or automation. Book a 30-min workflow review.",
  },
};

const BOOKME: LocalePair = {
  zh: {
    title: "預約 AI 顧問諮詢｜30 分鐘流程診斷｜InnovateXP",
    description:
      "免費預約 30 分鐘策略會議：檢視銷售、CRM、活動或 AI 工作流瓶頸，釐清下一步。InnovateXP 陪你先診斷、再落地——立即選時段。",
  },
  en: {
    title: "Book a Free AI Consultation — InnovateXP",
    description:
      "Get a 30-min strategy session with our AI consulting team. We help businesses automate sales, CRM, and customer workflows. Book your slot now.",
  },
};

const SMARTSALES: LocalePair = {
  zh: {
    title: "SmartSales CRM｜WhatsApp 銷售管道與跟進｜InnovateXP",
    description:
      "SmartSales CRM：名單、WhatsApp 情境、跟進提醒同一 pipeline。試用 HKD 5,000。適合搜尋 smart sales CRM、想減少試算表失聯嘅 B2B／中小企團隊。",
    ogTitle: "SmartSales CRM — WhatsApp 銷售管道",
    ogDescription: "smart sales／WhatsApp 查詢變成可跟進客戶紀錄。試用 HKD 5,000，立即了解。",
  },
  en: {
    title: "SmartSales CRM | WhatsApp Pipeline & Follow-Up | InnovateXP",
    description:
      "SmartSales CRM centralizes leads, WhatsApp context, and reminders in one smart sales pipeline. Trial from HKD 5,000. Built for SMEs tired of spreadsheet and inbox chaos.",
    ogTitle: "SmartSales CRM — WhatsApp sales pipeline",
    ogDescription:
      "One place for leads, chat context, and next actions. Practical CRM for B2B follow-up—without enterprise overhead.",
  },
};

const EVENTXP: LocalePair = {
  zh: {
    title: "EventXP｜活動簽到、名單評分與 Follow-up｜InnovateXP",
    description:
      "EventXP 唔只係 QR check-in：簽到、名單評分、跟進自動化。試用 HKD 4,000／場。適合活動團隊想提升轉化同跟進效率。",
  },
  en: {
    title: "EventXP | Event Check-In, Scoring & Follow-Up | InnovateXP",
    description:
      "EventXP goes beyond QR check-in: attendance, lead scoring, and follow-up automation. Trial HKD 4,000 per event. Turn attendees into actionable sales pipelines.",
  },
};

const AI_CONSULTING: LocalePair = {
  zh: {
    title: "AI 商業顧問香港｜私有 AI 與落地實施｜InnovateXP",
    description:
      "香港 AI 商業顧問：Premium 落地、私有雲／On-Premise、流程診斷到實施。先驗證 workflow，再部署 AI——預約 Discovery Sprint。",
    ogTitle: "AI 商業顧問｜香港私有 AI 落地",
    ogDescription: "私有雲、On-Premise 與顧問陪跑。適合需要資料安全與實務落地嘅中小企。",
  },
  en: {
    title: "AI Business Consultant | Private AI & Implementation | InnovateXP",
    description:
      "AI business consultancy for SMEs: workflow diagnosis, private / on-prem AI options, and premium implementation. Validate first—then deploy. Book a Discovery Sprint.",
    ogTitle: "AI Business Consultant — Private AI advisory",
    ogDescription:
      "Premium AI consulting with private-cloud and on-premise options. Practical adoption for teams that need control and clarity.",
  },
};

const AI_SEO: LocalePair = {
  zh: {
    title: "AI SEO 更新套餐｜快速改版與跟進｜InnovateXP",
    description:
      "AI SEO 更新套餐：Starter HKD 2,000（3 次改動）或 Growth HKD 6,000（10 次改動）。改善標題、描述與可見度——立即了解方案。",
  },
  en: {
    title: "AI SEO Update Package | Fast Meta & Content Fixes | InnovateXP",
    description:
      "AI SEO update package: Starter HKD 2,000 (3 changes) or Growth HKD 6,000 (10 changes). Improve titles, descriptions, and click-through—book a package today.",
  },
};

const PITCH_DECKS: LocalePair = {
  zh: {
    title: "Pitch Deck 下載｜SmartSales・EventXP｜InnovateXP",
    description:
      "下載 InnovateXP pitch deck：SmartSales CRM、EventXP、客製網站方案。快速了解產品定位、流程與定價方向。",
  },
  en: {
    title: "Pitch Deck Downloads | SmartSales & EventXP | InnovateXP",
    description:
      "Download InnovateXP pitch decks for SmartSales CRM, EventXP, and custom websites. See product positioning, workflows, and pricing direction in minutes.",
  },
};

const BLOG: LocalePair = {
  zh: {
    title: "Blog｜AI、CRM 與中小企自動化實務｜InnovateXP",
    description:
      "InnovateXP Blog：AI 顧問、CRM、活動營運與工作流落地筆記。實用、可執行，唔係空談趨勢。",
  },
  en: {
    title: "Blog | AI, CRM & SME Automation Notes | InnovateXP",
    description:
      "Practical notes on AI consulting, CRM, event ops, and workflow implementation from InnovateXP. Actionable guidance—not hype.",
  },
};

const PRIVATE_AI: LocalePair = {
  zh: {
    title: "私有 AI 方案｜On-Premise／私有雲部署｜InnovateXP",
    description:
      "私有 AI solutions：資料留喺可控環境、加密入庫、按政策部署。適合對 data policy 嚴格嘅會計、金融同專業服務團隊。預約診斷。",
  },
  en: {
    title: "Private AI Solutions | On-Prem & Private Cloud | InnovateXP",
    description:
      "Private AI solutions with controlled data residency, encrypted storage, and scoped deployment. Built for teams with strict data policy needs. Book a diagnosis.",
  },
};

const CX_CONSULTING: LocalePair = {
  zh: {
    title: "客戶體驗顧問｜CX 流程與自動化｜InnovateXP",
    description:
      "Customer experience consulting：梳理接觸點、回覆節奏與跟進紀律，再用 AI／自動化提升 CX。適合香港中小企服務團隊。",
  },
  en: {
    title: "Customer Experience Consulting | CX Workflows | InnovateXP",
    description:
      "Customer experience consulting that maps touchpoints, response SLAs, and follow-up discipline—then adds AI where it helps. Practical CX for service-led SMEs.",
  },
};

const SME_AUTOMATION: LocalePair = {
  zh: {
    title: "中小企自動化顧問｜SME AI Workflow｜InnovateXP",
    description:
      "SME automation consultant：先畫清流程，再自動化報價、跟進、行政同報表。中小企 AI 升級唔由工具開始——由 workflow 開始。",
  },
  en: {
    title: "SME Automation Consultant | AI Workflow Upgrade | InnovateXP",
    description:
      "SME automation consulting: map workflows first, then automate quotes, follow-ups, admin, and reporting. AI upgrade starts with process clarity—not random tools.",
  },
};

export function homeSeo(locale: AppLocale): PageSeo {
  return pick(locale, HOME);
}
export function bookmeSeo(locale: AppLocale): PageSeo {
  return pick(locale, BOOKME);
}
export function smartSalesSeo(locale: AppLocale): PageSeo {
  return pick(locale, SMARTSALES);
}
export function eventXpSeo(locale: AppLocale): PageSeo {
  return pick(locale, EVENTXP);
}
export function aiConsultingSeo(locale: AppLocale): PageSeo {
  return pick(locale, AI_CONSULTING);
}
export function aiSeoPackageSeo(locale: AppLocale): PageSeo {
  return pick(locale, AI_SEO);
}
export function pitchDecksSeo(locale: AppLocale): PageSeo {
  return pick(locale, PITCH_DECKS);
}
export function blogSeo(locale: AppLocale): PageSeo {
  return pick(locale, BLOG);
}
export function privateAiSeo(locale: AppLocale): PageSeo {
  return pick(locale, PRIVATE_AI);
}
export function cxConsultingSeo(locale: AppLocale): PageSeo {
  return pick(locale, CX_CONSULTING);
}
export function smeAutomationSeo(locale: AppLocale): PageSeo {
  return pick(locale, SME_AUTOMATION);
}

export function seoToMetadataFields(seo: PageSeo) {
  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: seo.ogTitle ?? seo.title,
      description: seo.ogDescription ?? seo.description,
    },
    twitter: {
      title: seo.ogTitle ?? seo.title,
      description: seo.ogDescription ?? seo.description,
    },
  };
}
