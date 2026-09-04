/**
 * SERP titles (~50–58 chars) and descriptions (~120–155 chars).
 * Tuned from Search Console (Aug 2026): larry lo, private ai, AI顧問, SmartSales, CRM consulting HK.
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
    title: "業務聽診｜AI商業顧問Larry Lo｜InnovateXP",
    description:
      "我係 AI 商業顧問 Larry Lo／InnovateXP。先執順流程，再落地 AI。幫香港 3–30 人中小企止住 WhatsApp／Excel 漏單。預約 30 分鐘業務聽診。",
  },
  en: {
    title: "Business Workflow Diagnosis | Larry Lo | InnovateXP",
    description:
      "I am AI Business Consultant Larry Lo / InnovateXP. Process first, AI second. Diagnose WhatsApp/Excel leaks for SMEs of 3–30. Book a 30-min diagnosis.",
  },
};

const BOOKME: LocalePair = {
  zh: {
    title: "預約業務聽診｜Larry Lo｜InnovateXP",
    description:
      "預約 AI 商業顧問 Larry Lo／InnovateXP：30 分鐘業務聽診，鎖定漏單、慢報價或交接卡位，再決定 Discovery Sprint、CRM 或陪跑。立即選時段。",
  },
  en: {
    title: "Book Business Workflow Diagnosis | Larry Lo",
    description:
      "Book a 30-minute Business Workflow Diagnosis with AI Business Consultant Larry Lo / InnovateXP. Find enquiry leaks before buying AI or CRM.",
  },
};

const SMARTSALES: LocalePair = {
  zh: {
    title: "SmartSales CRM｜香港WhatsApp銷售跟進｜InnovateXP",
    description:
      "SmartSales CRM：香港 WhatsApp 銷售 pipeline、責任人、AI draft-first。試用 HK$5,000；月費由 HK$880 起。減少 Excel／inbox 漏跟。",
    ogTitle: "SmartSales CRM — 香港 WhatsApp 銷售 CRM",
    ogDescription: "把 WhatsApp 查詢變成可跟進 pipeline。試用 HK$5,000。",
  },
  en: {
    title: "SmartSales CRM | WhatsApp Pipeline | InnovateXP",
    description:
      "SmartSales CRM for Hong Kong WhatsApp sales: one pipeline, ownership, AI draft-first replies. Trial HK$5,000; care from HK$880/mo. Stop Excel leakage.",
    ogTitle: "SmartSales CRM — WhatsApp sales for HK SMEs",
    ogDescription: "One pipeline for leads, chat context, and next actions. Trial HK$5,000.",
  },
};

const VISIONXP: LocalePair = {
  zh: {
    title: "VisionXP｜AI視覺追蹤技術Demo｜InnovateXP",
    description:
      "VisionXP 技術原型：AI 視覺追蹤示範（3–12 歲訓練流程）。純前端、無病人資料。並非醫療診斷工具或註冊醫療器械。立即試 Demo。",
  },
  en: {
    title: "VisionXP | AI Visual-Tracking Demo | InnovateXP",
    description:
      "VisionXP tech demo: AI visual-tracking for ages 3–12 training workflows. Frontend-only, no patient data. Not a medical device. Try the live demo.",
  },
};

const EVENTXP: LocalePair = {
  zh: {
    title: "EventXP｜活動簽到評分Follow-up｜InnovateXP",
    description:
      "EventXP：QR 簽到、名單評分、即時報告、活動後 follow-up。試用 HK$4,000／場；月費由 HK$880 起。把出席變成可跟進商機。",
  },
  en: {
    title: "EventXP | Check-In, Scoring & Follow-Up",
    description:
      "EventXP for Hong Kong event teams: QR check-in, lead scoring, live reporting, post-event follow-up. Trial HK$4,000/event; care from HK$880/mo.",
  },
};

const FITNESSXP: LocalePair = {
  zh: {
    title: "FitnessXP｜課堂管理｜AI商業顧問｜InnovateXP",
    description:
      "AI 商業顧問 Larry Lo／InnovateXP：幫培訓機構、補習社、Fitness／Yoga／Pilates 先做業務聽診，再設計課堂管理。時間表、教練、出席、續堂。由 HK$499／月起。",
  },
  en: {
    title: "FitnessXP | Class & Studio Ops | InnovateXP",
    description:
      "AI Business Consultant Larry Lo / InnovateXP helps HK training, tutoring, and fitness studios diagnose class workflows, then land FitnessXP: timetable, coaches, attendance, renewals. From HK$499/mo.",
  },
};

const AI_CONSULTING: LocalePair = {
  zh: {
    title: "AI商業顧問｜業務聽診｜Discovery Sprint",
    description:
      "我係 AI 商業顧問 Larry Lo／InnovateXP：先執順流程再落地 AI。業務聽診、AI Discovery Sprint 與 30 日落地。預約診斷。",
    ogTitle: "AI 商業顧問｜先執順流程再落地 AI",
    ogDescription: "業務聽診、Discovery Sprint、陪跑。適合要實務落地嘅香港中小企。",
  },
  en: {
    title: "AI Business Consultant | Workflow Diagnosis HK",
    description:
      "I am AI Business Consultant Larry Lo / InnovateXP: Business Workflow Diagnosis first, then AI Discovery Sprint. Book a diagnosis — not a tool pitch.",
    ogTitle: "AI Business Consultant HK — process first",
    ogDescription: "Business Workflow Diagnosis, Discovery Sprint, and advisory for SMEs.",
  },
};

const AI_SEO: LocalePair = {
  zh: {
    title: "AI SEO／GEO更新套餐｜InnovateXP",
    description:
      "AI SEO + GEO 更新套餐：Starter HK$2,000（3 次）或 Growth HK$6,000（10 次）。優化標題、描述、Schema 與 AI 答案可見度。",
  },
  en: {
    title: "AI SEO & GEO Update Package | InnovateXP",
    description:
      "AI SEO/GEO package: Starter HK$2,000 (3 changes) or Growth HK$6,000 (10). Improve titles, descriptions, schema, and answer-engine visibility.",
  },
};

const PITCH_DECKS: LocalePair = {
  zh: {
    title: "Pitch Deck下載｜SmartSales・EventXP｜InnovateXP",
    description:
      "下載 InnovateXP pitch deck：SmartSales CRM、EventXP、客製網站方案。快速了解產品定位、流程與定價方向。",
  },
  en: {
    title: "Pitch Decks | SmartSales & EventXP | InnovateXP",
    description:
      "Download InnovateXP pitch decks for SmartSales CRM, EventXP, and custom websites. See positioning, workflows, and pricing in minutes.",
  },
};

const BLOG: LocalePair = {
  zh: {
    title: "Blog｜AI、CRM與中小企自動化｜InnovateXP",
    description:
      "InnovateXP Blog：香港 AI 顧問、CRM、活動營運與工作流落地筆記。實用可執行，唔係空談趨勢。",
  },
  en: {
    title: "Blog | AI, CRM & SME Automation | InnovateXP",
    description:
      "Practical notes on AI consulting, CRM, event ops, and workflow implementation from InnovateXP. Actionable guidance—not hype.",
  },
};

const PRIVATE_AI: LocalePair = {
  zh: {
    title: "企業Private AI方案｜香港私有雲／On-Prem｜InnovateXP",
    description:
      "企業 private AI solutions：資料可控、加密入庫、私有雲或 On-Premise。適合香港會計、金融與專業服務。預約 Larry Lo 診斷。",
  },
  en: {
    title: "Private AI Solutions Hong Kong | InnovateXP",
    description:
      "Enterprise private AI for Hong Kong: on-prem or private cloud, encrypted storage, controlled residency. For finance and professional services. Book a diagnosis.",
  },
};

const CX_CONSULTING: LocalePair = {
  zh: {
    title: "客戶體驗顧問｜CX流程與自動化｜InnovateXP",
    description:
      "Customer experience consulting：梳理接觸點、回覆節奏與跟進紀律，再用 AI／自動化提升 CX。適合香港中小企服務團隊。",
  },
  en: {
    title: "CX Consulting | Customer Experience Workflows",
    description:
      "Customer experience consulting that maps touchpoints, response SLAs, and follow-up—then adds AI where it helps. Practical CX for service-led SMEs.",
  },
};

const SME_AUTOMATION: LocalePair = {
  zh: {
    title: "中小企AI工作流顧問｜香港流程自動化｜InnovateXP",
    description:
      "香港中小企 AI 工作流顧問：先畫清報價、跟進、行政，再自動化。獨立 CRM／AI 顧問，唔由亂買工具開始。預約診斷。",
  },
  en: {
    title: "SME AI Workflow & CRM Consulting | Hong Kong",
    description:
      "Independent CRM and AI workflow consulting for Hong Kong SMEs. Map quotes and follow-ups first, then automate. Book a free diagnosis with Larry Lo.",
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
export function fitnessXpSeo(locale: AppLocale): PageSeo {
  return pick(locale, FITNESSXP);
}
export function visionXpSeo(locale: AppLocale): PageSeo {
  return pick(locale, VISIONXP);
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
