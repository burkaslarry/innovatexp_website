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
      "我係 AI 商業顧問 Larry Lo／InnovateXP。先執順流程，再落地 AI。30 分鐘業務聽診搵出最漏客、最慢嗰條流程。唔使買系統我會直講。",
  },
  en: {
    title: "Business Workflow Diagnosis | Larry Lo | InnovateXP",
    description:
      "AI Business Consultant Larry Lo / InnovateXP: fix the workflow first, then land AI. 30-minute diagnosis. I'll say so if you shouldn't buy a system.",
  },
};

const BOOKME: LocalePair = {
  zh: {
    title: "預約業務聽診｜Larry Lo｜InnovateXP",
    description:
      "預約 AI 商業顧問 Larry Lo／InnovateXP：30 分鐘業務聽診，鎖定漏單、慢報價或交接卡位。Snapshot HK$3,000 起；唔使買系統會直講。",
  },
  en: {
    title: "Book Business Workflow Diagnosis | Larry Lo",
    description:
      "Book a 30-minute Business Workflow Diagnosis with Larry Lo / InnovateXP. Snapshot from HK$3,000; Discovery Sprint HK$6,800 for teams up to 10.",
  },
};

const SMARTSALES: LocalePair = {
  zh: {
    title: "銷售跟進流程診斷｜SmartSales 可選落地｜InnovateXP",
    description:
      "先診斷 WhatsApp 銷售跟進、責任同漏位；流程清楚後，SmartSales 可作落地選項。預約業務聽診，唔使買系統會直講。",
    ogTitle: "SmartSales CRM — 香港 WhatsApp 銷售 CRM",
    ogDescription: "把 WhatsApp 查詢變成可跟進 pipeline。試用 HK$5,000。",
  },
  en: {
    title: "Sales Workflow Diagnosis | Optional SmartSales | InnovateXP",
    description:
      "Diagnose WhatsApp sales follow-up, ownership, and leaks first. SmartSales is an optional implementation after the workflow is clear—not the starting point.",
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
    title: "EventXP｜活動簽到・會員及嘉賓管理・即時報告｜InnovateXP",
    description:
      "EventXP 將報名、check-in、會員記錄、即時報告同跟進集中。單場流程試行 HK$4,000；持續方案 HK$880／月起，較大範圍聽診後報價。",
    ogTitle: "EventXP — 活動簽到・會員及嘉賓管理・即時報告",
    ogDescription: "將散落喺紙張、Excel、WhatsApp 嘅活動流程集中處理。按你流程配置，預約流程診斷再報價。",
  },
  en: {
    title: "EventXP | Check-In, Member & Guest Management, Live Reporting | InnovateXP",
    description:
      "EventXP consolidates registration, check-in, member records, reporting and follow-up. One-event trial HK$4,000; ongoing plans from HK$880/month.",
    ogTitle: "EventXP — event & membership operations, configured to your workflow",
    ogDescription: "Replace paper, Excel and WhatsApp patchwork with one configured workflow. Diagnosis first, then a scoped quote.",
  },
};

const EVENTXP_SCOPING: LocalePair = {
  zh: {
    title: "EventXP 方案診斷表格｜索取初步方案及報價｜InnovateXP",
    description:
      "填妥 EventXP Solution Scoping Form，畀 InnovateXP 了解你嘅活動及會員流程、現有工具同所需功能，再畀你一份配置方案同報價。",
    ogTitle: "EventXP 方案診斷表格 — 索取初步方案及報價",
    ogDescription: "6 個步驟，講你現有報名、check-in、報告同跟進流程，我哋畀你配置方案同報價。",
  },
  en: {
    title: "EventXP Solution Scoping Form | Scoped Proposal & Quote | InnovateXP",
    description:
      "Complete the EventXP Solution Scoping Form so InnovateXP can understand your event and membership workflow, current tools and required capabilities, then send a configured proposal and quote.",
    ogTitle: "EventXP Solution Scoping Form — scoped proposal & quote",
    ogDescription: "6 steps describing your current registration, check-in, reporting and follow-up; we reply with a configured proposal and quote.",
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
    title: "AI商業顧問｜業務聽診｜InnovateXP",
    description:
      "我係 AI 商業顧問 Larry Lo／InnovateXP：業務聽診 → AI agents → 陪跑。唔使買系統我會直講。",
    ogTitle: "AI 商業顧問｜業務聽診｜InnovateXP",
    ogDescription: "聽診、Discovery、陪跑。適合要實務落地嘅香港中小企。",
  },
  en: {
    title: "AI Business Consultant | Diagnosis | InnovateXP",
    description:
      "Larry Lo / InnovateXP: diagnosis → AI agents → co-run. Book a diagnosis — not a tool pitch.",
    ogTitle: "AI Business Consultant HK — diagnosis first",
    ogDescription: "Business Workflow Diagnosis, co-run advisory for SMEs.",
  },
};

const AI_SEO: LocalePair = {
  zh: {
    title: "AI SEO／AEO 月費｜AI Visibility 診斷｜InnovateXP",
    description:
      "先做 HKD 2,800 AI Visibility 診斷（可抵扣首月），再選 Lite HKD 1,800／月或 Growth HKD 3,800／月（6 個月起）。追蹤 AI 引用、品牌曝光、詢盤。",
  },
  en: {
    title: "AI SEO / AEO retainer | AI Visibility diagnosis | InnovateXP",
    description:
      "Start with a HKD 2,800 AI Visibility diagnosis (credited to month 1), then Lite HKD 1,800/mo or Growth HKD 3,800/mo (6-month min). Track citations, brand impressions, enquiries.",
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

const ARTKAL_BEAD: LocalePair = {
  zh: {
    title: "拼豆圖紙生成器｜Artkal色號對圖｜InnovateXP",
    description:
      "上傳圖片轉成 Artkal 拼豆圖紙：S01／A2／B13／H5 色號、CIEDE2000 對色、每色粒數統計，以及 1:1 PDF／PNG 圖紙下載。",
  },
  en: {
    title: "Artkal Bead Pattern Generator | CIEDE2000 | InnovateXP",
    description:
      "Turn a photo into an Artkal fuse-bead blueprint: official color codes, CIEDE2000 matching, per-color bead counts, and 1:1 PDF/PNG export.",
  },
};

const CREATIVE_STUDIO: LocalePair = {
  zh: {
    title: "Creative Studio 自由創作｜拼豆・咖啡地圖｜Larry Lo",
    description:
      "Larry Lo 個人瀏覽器小工房：Artkal 拼豆圖紙生成器、香港咖啡店地圖，陸續有得加。全部喺瀏覽器跑，唔使登入。",
  },
  en: {
    title: "Creative Studio | Bead Patterns & Coffee Map | Larry Lo",
    description:
      "Larry Lo's side-project corner: Artkal bead pattern generator and a Hong Kong coffeeshop map. All run in the browser, no login.",
  },
};

const COFFEE_MAP: LocalePair = {
  zh: {
    title: "香港咖啡茶飲地圖｜Wi-Fi・電插・霸王茶姬｜Creative Studio",
    description:
      "香港特色咖啡店同 OpenRice 核實嘅霸王茶姬分店。可按 Wi-Fi、電插、檯型、限時篩選。新增店舖要有相，人手批核後先上地圖。",
  },
  en: {
    title: "Hong Kong Coffee & Tea Map | Wi-Fi, Outlets, CHAGEE | Creative Studio",
    description:
      "Hong Kong specialty coffee and OpenRice-checked CHAGEE branches. Filter by Wi-Fi, outlets, tables, and time limit. New shops need a photo and stay pending until reviewed.",
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
      "Business Workflow Diagnosis for Hong Kong SMEs. Map quotes and follow-ups first, then add practical AI support only where justified. Entry from HK$3,000.",
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
export function eventXpScopingSeo(locale: AppLocale): PageSeo {
  return pick(locale, EVENTXP_SCOPING);
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
export function artkalBeadSeo(locale: AppLocale): PageSeo {
  return pick(locale, ARTKAL_BEAD);
}
export function creativeStudioSeo(locale: AppLocale): PageSeo {
  return pick(locale, CREATIVE_STUDIO);
}
export function coffeeMapSeo(locale: AppLocale): PageSeo {
  return pick(locale, COFFEE_MAP);
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
