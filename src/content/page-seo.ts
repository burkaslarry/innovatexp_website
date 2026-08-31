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
    title: "香港AI商業顧問｜中小企SOP與WhatsApp流程｜InnovateXP",
    description:
      "Larry Lo／InnovateXP：香港中小企 AI 顧問。Discovery Sprint 由 HK$6,800 起。WhatsApp CRM、EventXP、VisionXP 示範。立即預約 30 分鐘診斷。",
  },
  en: {
    title: "Hong Kong AI Consultant for SMEs | Workflow-First | InnovateXP",
    description:
      "Larry Lo / InnovateXP: Hong Kong SME AI consultancy. Discovery Sprint from HK$6,800. WhatsApp CRM, EventXP, VisionXP demo. Book a 30-min diagnosis.",
  },
};

const BOOKME: LocalePair = {
  zh: {
    title: "預約香港AI顧問｜免費30分鐘流程診斷｜InnovateXP",
    description:
      "預約 Larry Lo 30 分鐘流程診斷：找出漏單、慢報價或交接卡位。香港中小企 AI 商業顧問 InnovateXP——先診斷、再落地。立即選時段。",
  },
  en: {
    title: "Book Hong Kong AI Consultant | Free 30-Min Diagnosis | InnovateXP",
    description:
      "Book a free 30-minute workflow diagnosis with Larry Lo / InnovateXP. Find enquiry leakage, slow quotes, or handoff gaps—then decide on AI or CRM. Pick a slot now.",
  },
};

const SMARTSALES: LocalePair = {
  zh: {
    title: "SmartSales CRM香港｜WhatsApp銷售跟進系統｜InnovateXP",
    description:
      "SmartSales CRM 專為香港 WhatsApp 銷售團隊：查詢集中、責任人、pipeline、AI draft-first。試用 HK$5,000；月費由 HK$880 起。減少 Excel／inbox 漏跟。",
    ogTitle: "SmartSales CRM — 香港 WhatsApp 銷售 CRM",
    ogDescription: "把 WhatsApp 查詢變成可跟進 pipeline。試用 HK$5,000。",
  },
  en: {
    title: "SmartSales CRM Hong Kong | WhatsApp Sales Pipeline | InnovateXP",
    description:
      "SmartSales CRM for Hong Kong WhatsApp-led sales: centralize enquiries, ownership, pipeline, and AI draft-first replies. Trial HK$5,000; maintenance from HK$880/mo.",
    ogTitle: "SmartSales CRM — WhatsApp sales for HK SMEs",
    ogDescription:
      "One pipeline for leads, chat context, and next actions. Trial HK$5,000—without enterprise CRM overhead.",
  },
};

const VISIONXP: LocalePair = {
  zh: {
    title: "VisionXP香港｜AI視覺追蹤技術Demo｜InnovateXP",
    description:
      "VisionXP 係技術原型／AI 視覺追蹤示範（3–12 歲訓練流程）。純前端、無須登入、唔存病人資料。並非醫療診斷工具或註冊醫療器械，不能代替專業視光／眼科檢查。",
  },
  en: {
    title: "VisionXP Hong Kong | AI Visual-Tracking Tech Demo | InnovateXP",
    description:
      "VisionXP is a technology prototype / AI visual-tracking demo for paediatric training workflows (ages 3–12). Frontend-only, no login, no patient data. Not a medical diagnostic tool or registered medical device.",
  },
};

const EVENTXP: LocalePair = {
  zh: {
    title: "EventXP香港｜活動簽到名單評分Follow-up｜InnovateXP",
    description:
      "EventXP：QR 簽到、名單評分、即時報告、活動後 follow-up。香港活動／培訓團隊試用 HK$4,000／場；月費由 HK$880 起。把出席變成可跟進商機。",
  },
  en: {
    title: "EventXP Hong Kong | Check-In, Scoring & Follow-Up | InnovateXP",
    description:
      "EventXP for Hong Kong event teams: QR check-in, lead scoring, live reporting, and post-event follow-up. Trial HK$4,000 per event; maintenance from HK$880/mo.",
  },
};

const AI_CONSULTING: LocalePair = {
  zh: {
    title: "AI商業顧問香港｜Discovery Sprint HK$6,800｜InnovateXP",
    description:
      "香港 AI 商業顧問 Larry Lo：30 日 Discovery Sprint 由 HK$6,800 起，先驗證 workflow 再部署 AI／私有雲／On-Premise。預約診斷。",
    ogTitle: "香港 AI 商業顧問｜先流程後 AI",
    ogDescription: "Discovery Sprint、陪跑計劃與私有 AI 選項。適合要資料安全同實務落地嘅中小企。",
  },
  en: {
    title: "AI Business Consultant Hong Kong | Sprint HK$6,800 | InnovateXP",
    description:
      "Hong Kong AI business consultancy by Larry Lo: 30-day Discovery Sprint from HK$6,800, private/on-prem options after workflow validation. Book a diagnosis.",
    ogTitle: "AI Business Consultant HK — workflow first",
    ogDescription:
      "Discovery Sprint, advisory programmes, and private AI options for SMEs that need control and clarity.",
  },
};

const AI_SEO: LocalePair = {
  zh: {
    title: "AI SEO／GEO更新套餐｜標題Schema可見度｜InnovateXP",
    description:
      "AI SEO + GEO 更新套餐：Starter HK$2,000（3 次）或 Growth HK$6,000（10 次）。優化標題、描述、結構化資料與 AI 答案可見度。",
  },
  en: {
    title: "AI SEO & GEO Update Package | Meta + Schema | InnovateXP",
    description:
      "AI SEO/GEO update package: Starter HK$2,000 (3 changes) or Growth HK$6,000 (10). Improve titles, descriptions, schema, and answer-engine visibility.",
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
    title: "中小企AI工作流顧問香港｜流程自動化｜InnovateXP",
    description:
      "香港中小企 AI 工作流顧問：先畫清報價、跟進、行政流程，再自動化。InnovateXP 由 workflow 開始，唔由亂買工具開始。預約診斷。",
  },
  en: {
    title: "SME AI Workflow Consultant Hong Kong | Automation | InnovateXP",
    description:
      "Hong Kong SME AI workflow consulting: map quotes, follow-ups, and admin first, then automate. InnovateXP starts with process clarity—not random tools. Book a diagnosis.",
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
