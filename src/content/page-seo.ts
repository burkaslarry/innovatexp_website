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
    title: "AI專業顧問服務｜香港中小企業務聽診｜InnovateXP",
    description:
      "InnovateXP 由 Larry Lo 創立，幫香港 3–30 人中小企先聽診再落地。Agilizing 教材由 10 日縮到 3 小時。唔使買系統會直講。",
  },
  en: {
    title: "AI Automation Consulting | Hong Kong SMEs | InnovateXP",
    description:
      "Larry Lo helps Hong Kong SMEs of 3–30 diagnose the workflow first. Agilizing: training materials from 10 days to 3 hours. He says so if you should not buy.",
  },
};

const BOOKME: LocalePair = {
  zh: {
    title: "預約業務聽診｜Larry Lo｜InnovateXP",
    description:
      "預約 AI 商業顧問 Larry Lo／InnovateXP：30 分鐘業務聽診，鎖定漏單、慢報價或交接卡位。Snapshot HK$3,880 起；唔使買系統會直講。",
  },
  en: {
    title: "Book Business Workflow Diagnosis | Larry Lo",
    description:
      "Book a 30-minute Business Workflow Diagnosis with Larry Lo / InnovateXP. Snapshot from HK$3,880; Discovery Sprint HK$6,880 for teams up to 10.",
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
    title: "專屬AI企業顧問｜香港中小企業務聽診｜InnovateXP",
    description:
      "AI 商業顧問 Larry Lo 幫 3–30 人公司先處理業務樽頸。Agilizing 教材由 10 日縮至 3 小時。聽診 HK$3,880 起，Discovery HK$6,880 起。",
    ogTitle: "專屬AI企業顧問｜香港中小企業務聽診｜InnovateXP",
    ogDescription: "先聽診一條流程，再決定使唔使落地 AI。Snapshot HK$3,880 起。",
  },
  en: {
    title: "AI Automation Consulting for Hong Kong SMEs | InnovateXP",
    description:
      "Larry Lo helps Hong Kong SMEs fix one bottleneck, then put AI to work. Agilizing: 10 days to 3 hours. Snapshot HK$3,880; Discovery from HK$6,880.",
    ogTitle: "AI Automation Consulting for Hong Kong SMEs | InnovateXP",
    ogDescription: "One workflow first. Snapshot HK$3,880; Discovery from HK$6,880.",
  },
};

const AI_SEO: LocalePair = {
  zh: {
    title: "AI 搜尋能見度診斷與 GEO／AEO 追蹤｜InnovateXP",
    description:
      "香港中小企 AI 搜尋能見度診斷：HKD 2,800 測試 20 條買家問題、比較最多 5 個競爭對手。按月追蹤提及、引用同詢盤；月費 HKD 1,800 起，訂 3 個月或以上享 20% 折扣。",
  },
  en: {
    title: "AI Visibility Diagnosis & GEO/AEO for HK SMEs | InnovateXP",
    description:
      "HKD 2,800 AI visibility diagnosis tests 20 buyer questions and up to 5 competitors. Track mentions, citations and enquiries from HKD 1,800/month; 20% off plans of 3 months or more.",
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
    title: "PDPO・跨境資料・企業私人 AI｜InnovateXP",
    description:
      "十五篇香港中小企筆記：PDPO、私人 AI、AI 顧問同培訓。一般資訊，並非法律意見。",
  },
  en: {
    title: "PDPO, Cross-Border Data & Private AI | InnovateXP",
    description:
      "Fifteen notes for Hong Kong SMEs: PDPO, private AI, choosing an AI consultant, and training. General information, not legal advice.",
  },
};

const BLOG_LOCALE: Partial<Record<AppLocale, PageSeo>> = {
  "zh-tw": {
    title: "PDPO、跨境資料、企業私人 AI｜InnovateXP",
    description:
      "十五篇香港中小企業筆記：PDPO、私人 AI、AI 顧問與培訓。一般資訊，並非法律意見。",
  },
  ja: {
    title: "PDPO・越境データ・プライベートAI｜InnovateXP",
    description:
      "香港の中小企業向け15本。PDPO、プライベートAI、AI顧問の選び方、研修。一般情報であり法律意見ではありません。",
  },
  de: {
    title: "PDPO, Datentransfer & Private KI | InnovateXP",
    description:
      "Fünfzehn Beiträge für Hongkonger KMU: PDPO, private KI, KI-Berater und Schulung. Allgemeine Information, keine Rechtsberatung.",
  },
};

const PRIVATE_AI: LocalePair = {
  zh: {
    title: "香港PDPO合規私人AI｜3–30人公司｜InnovateXP",
    description:
      "為 3–30 人公司而設的私人 AI：企業版、私有雲或本地伺服器。先聽診再試點。本頁只作一般資訊，並非法律意見。",
  },
  en: {
    title: "Private AI Solution Hong Kong | PDPO-minded | InnovateXP",
    description:
      "Private AI for Hong Kong firms of 3–30: enterprise SaaS, private cloud, or on-prem. Diagnose, then pilot. Not legal advice.",
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
    title: "香港中小企AI自動化｜低成本第一步｜InnovateXP",
    description:
      "香港中小企 AI 自動化的低成本第一步：先診斷一條重複流程，30 日內建立再上線。Agilizing 教材由 10 日縮至 3 小時。",
  },
  en: {
    title: "AI-powered Process Automation | Hong Kong SMEs",
    description:
      "Hong Kong SMEs start AI-powered business process automation on one repeated workflow, then launch within 30 days. Snapshot from HK$3,880.",
  },
};

const HOME_LOCALE: Partial<Record<AppLocale, PageSeo>> = {
  "zh-tw": {
    title: "AI專業顧問服務｜香港中小企業流程診斷｜InnovateXP",
    description:
      "InnovateXP 由 Larry Lo 創立，協助香港 3–30 人中小企業先聽診再落地。Agilizing 教材由 10 日縮到 3 小時。不必買系統會直說。",
  },
  ja: {
    title: "香港SME向けAI自動化コンサル｜InnovateXP",
    description:
      "Larry Lo は香港の3〜30人企業を先に診断します。Agilizingの教材は10日から3時間。買わなくてよいときはそう言います。",
  },
  de: {
    title: "KI-Automatisierung für Hongkonger KMU | InnovateXP",
    description:
      "Larry Lo diagnostiziert zuerst. Agilizing: Schulungsmaterial von 10 Tagen auf 3 Stunden. Er sagt, wenn Sie nicht kaufen sollten.",
  },
};

export function homeSeo(locale: AppLocale): PageSeo {
  return HOME_LOCALE[locale] ?? pick(locale, HOME);
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
const AI_CONSULTING_LOCALE: Partial<Record<AppLocale, PageSeo>> = {
  "zh-tw": {
    title: "專屬AI企業顧問｜香港中小企業流程診斷｜InnovateXP",
    description:
      "AI 商業顧問 Larry Lo 協助 3–30 人公司處理業務瓶頸。Agilizing 教材由 10 日縮至 3 小時。診斷 HK$3,880 起，Discovery HK$6,880 起。",
  },
  ja: {
    title: "香港SMEの専属AI顧問｜業務診断｜InnovateXP",
    description:
      "Larry Lo は3〜30人企業のボトルネックを先に見ます。Agilizingは教材を10日から3時間へ。診断はHK$3,880から、DiscoveryはHK$6,880から。",
  },
  de: {
    title: "KI-Berater für Hongkonger KMU | InnovateXP",
    description:
      "Larry Lo prüft zuerst einen Engpass bei Firmen mit 3–30 Personen. Agilizing: 10 Tage auf 3 Stunden. Snapshot HK$3.880; Discovery ab HK$6.880.",
  },
};

export function aiConsultingSeo(locale: AppLocale): PageSeo {
  return AI_CONSULTING_LOCALE[locale] ?? pick(locale, AI_CONSULTING);
}
export function aiSeoPackageSeo(locale: AppLocale): PageSeo {
  return pick(locale, AI_SEO);
}
export function pitchDecksSeo(locale: AppLocale): PageSeo {
  return pick(locale, PITCH_DECKS);
}
export function blogSeo(locale: AppLocale): PageSeo {
  return BLOG_LOCALE[locale] ?? pick(locale, BLOG);
}
const PRIVATE_AI_LOCALE: Partial<Record<AppLocale, PageSeo>> = {
  "zh-tw": {
    title: "香港PDPO合規私人AI｜3–30人公司｜InnovateXP",
    description:
      "為 3–30 人公司而設的私人 AI：企業版、私有雲或本地伺服器。先診斷再試點。本頁只作一般資訊，並非法律意見。",
  },
  ja: {
    title: "香港PDPOを意識した私人AI｜3–30人｜InnovateXP",
    description:
      "3〜30人の会社向け私人AI。企業版SaaS、プライベートクラウド、またはオンプレ。まず診断、次に試行。法律意見ではありません。",
  },
  de: {
    title: "Private KI für Hongkong | PDPO | InnovateXP",
    description:
      "Private KI für Firmen mit 3–30 Personen: Enterprise-SaaS, Private Cloud oder lokal. Erst Diagnose, dann Pilot. Keine Rechtsberatung.",
  },
};

export function privateAiSeo(locale: AppLocale): PageSeo {
  return PRIVATE_AI_LOCALE[locale] ?? pick(locale, PRIVATE_AI);
}
export function cxConsultingSeo(locale: AppLocale): PageSeo {
  return pick(locale, CX_CONSULTING);
}
const SME_AUTOMATION_LOCALE: Partial<Record<AppLocale, PageSeo>> = {
  "zh-tw": {
    title: "香港中小企AI自動化｜低成本第一步｜InnovateXP",
    description:
      "香港中小企業 AI 自動化的低成本第一步：先診斷一條重複流程，30 日內建立再上線。Agilizing 教材由 10 日縮至 3 小時。",
  },
  ja: {
    title: "香港SMEのAI自動化｜最初の一歩｜InnovateXP",
    description:
      "香港の中小企業は、繰り返す業務を1つ診断し、30日で作って公開します。Agilizingは教材を10日から3時間へ短縮しました。",
  },
  de: {
    title: "KI-Automatisierung für Hongkonger KMU | InnovateXP",
    description:
      "Der günstige erste Schritt: einen wiederholten Ablauf diagnostizieren und in 30 Tagen live bringen. Agilizing: 10 Tage auf 3 Stunden.",
  },
};

export function smeAutomationSeo(locale: AppLocale): PageSeo {
  return SME_AUTOMATION_LOCALE[locale] ?? pick(locale, SME_AUTOMATION);
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
