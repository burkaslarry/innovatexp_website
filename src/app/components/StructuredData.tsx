"use client";
/* F03: Route-scoped JSON-LD - Injects Organization, Service, FAQ, and page-specific structured data by path. */
import { usePathname } from "next/navigation";
import type { AppLocale } from "@/lib/i18n-routing";
import { getLocaleFromPathname, stripLocaleFromPathname } from "@/lib/i18n-routing";

/** Pick JSON-LD copy per URL locale — explicit `AppLocale` rows (no zh/en boolean). */
function pickSchema(locale: AppLocale, row: Record<AppLocale, string>): string {
  return row[locale];
}

type FaqMainEntity = Array<{
  "@type": "Question";
  name: string;
  acceptedAnswer: { "@type": "Answer"; text: string };
}>;

const SCHEMA_ORGANIZATION_DESCRIPTION: Record<AppLocale, string> = {
  en: "InnovateXP Limited helps Hong Kong SMEs fix workflows first, then adopt AI through structured advisory, SOP optimization, KPI review, practical trials, and optional automation or SaaS implementation.",
  "zh-hk":
    "InnovateXP Limited 以 AI 商業顧問定位，陪香港中小企先執順 SOP、設定 KPI、試行 AI，再按需要落地 automation、CRM 或 SaaS。",
  "zh-tw":
    "InnovateXP Limited 以 AI 商業顧問定位，陪香港中小企先執順 SOP、設定 KPI、試行 AI，再按需要落地 automation、CRM 或 SaaS。",
  ja: "InnovateXP は香港の中小企業向けに、イベントからの見込み客や WhatsApp の問い合わせを AI ワークフローで構造化されたセールスパイプラインへ変える支援を行います。Azure OpenAI、Alibaba Cloud、GCP、AWS、オンプレミスへの展開と実践的な AI 研修に対応します。",
  de: "InnovateXP Limited hilft KMUs in Hongkong dabei, Event-Leads und WhatsApp-Anfragen mit KI-gestützten Workflows in strukturierte Vertriebspipelines zu verwandeln. Bereitstellung auf Azure OpenAI, Alibaba Cloud, GCP, AWS oder On-Premise sowie praktisches AI-Training.",
};

const SCHEMA_PERSON_DESCRIPTION: Record<AppLocale, string> = {
  en: "InnovateXP Limited is founder-led as an AI Business Consultancy for Hong Kong SMEs, with 13+ years of IT delivery, product, cloud, agile delivery, and AI-powered business systems experience, plus former Google Developer Group Hong Kong organizer experience.",
  "zh-hk": "InnovateXP Limited 以 founder-led 方式提供 AI 商業顧問服務，具備 13+ 年 IT delivery、product、cloud、agile delivery 同 AI-powered business systems 經驗，亦有前 Google Developer Group Hong Kong organizer 背景。",
  "zh-tw":
    "InnovateXP Limited 以 founder-led 方式交付，具備 14 年以上系統架構與落地實作經驗，包含香港政府與公共交通相關的高可用度專案；曾任 Google Developer Group Hong Kong Organizer、香港科技園孵化校友，並曾支援 2,000 名以上並行使用者的系統等級。",
  ja: "現場の実装者として、InnovateXP はシステムアーキテクチャにおよそ 14 年の実務経験があります（香港の行政・公共交通向け高可用性案件を含む）。彼自身が構築・保守に入る体制で、請け負いだけの PM ではありません。元 Google Developer Group HK Organizer、HKSTP インキュベーション卒業・2,000 人以上同時アクティブ規模のシステム経験。",
  de: "InnovateXP ist seit über 14 Jahren praktisch in der Systemarchitektur tätig — inklusive Hochverfügbarkeitsprojekten für öffentliche Auftraggeber und Verkehr in Hongkong. Er baut und betreut die Systeme selbst, statt nur zu delegieren. Ehem. Google Developer Group HK Organizer · HKSTP Incubation Alumni · Systeme mit 2.000+ gleichzeitig aktiven Nutzern.",
};

const SCHEMA_SMARTSALES_DESCRIPTION: Record<AppLocale, string> = {
  en: "AI-powered customer relationship management system with WhatsApp integration, automated follow-ups, and intelligent scheduling for Hong Kong SMEs.",
  "zh-hk": "AI 驅動的客戶關係管理系統，整合 WhatsApp、自動跟進和智能排程，專為香港中小企業設計。",
  "zh-tw":
    "以 AI 為核心的客戶關係管理系統，整合 WhatsApp、自動跟進與智慧排程，適合香港與區內中小企業使用。",
  ja: "WhatsApp 連携、自動フォローアップ、インテリジェントな日程調整を備えた AI 型 CRM。香港の中小企業向け。",
  de: "KI-gestütztes CRM mit WhatsApp-Anbindung, automatisierten Follow-ups und intelligenter Terminplanung für KMUs in Hongkong.",
};

const SCHEMA_EVENTXP_DESCRIPTION: Record<AppLocale, string> = {
  en: "Intelligent event check-in system that transforms attendance data into business insights. QR code scanning, real-time reporting, and AI-powered attendee analysis.",
  "zh-hk": "智能活動簽到系統，將出席數據轉化為商業洞察。QR 碼掃描、實時報告和 AI 驅動的參與者分析。",
  "zh-tw":
    "智慧活動報到系統，將出席資料轉為可行动的商業洞察；支援 QRCode 報到、即時報表與 AI 輔助的出席者分析。",
  ja: "出席データをビジネスインサイトへ変えるインテリジェントなイベントチェックイン。QR 読取、リアルタイムレポート、AI による参加者分析。",
  de: "Intelligentes Event-Check-in: verwandelt Anwesenheitsdaten in Business-Insights mit QR-Scanning, Echtzeit-Reporting und KI-gestützter Teilnehmeranalyse.",
};

const SCHEMA_AI_SEO_NAME: Record<AppLocale, string> = {
  en: "AI SEO Update Package",
  "zh-hk": "AI SEO 更新套餐",
  "zh-tw": "AI SEO 更新方案",
  ja: "AI SEO アップデートパッケージ",
  de: "AI-SEO-Update-Paket",
};

const SCHEMA_AI_SEO_DESCRIPTION: Record<AppLocale, string> = {
  en: "Done-for-you AI SEO content and schema update package for SMEs, with fixed revision rounds and follow-up sessions.",
  "zh-hk": "為中小企提供 AI SEO 內容與結構化資料更新服務，包含固定修改輪次與跟進會議。",
  "zh-tw": "為中小企提供 AI SEO 內容與結構化資料更新服務，含固定修改輪次與後續會議。",
  ja: "中小企業向けの代行型 AI SEO／構造化データ更新パッケージ。改訂ラウンドとフォロー面談を定額回数で提供。",
  de: "Done-for-you-Paket für KI-gestützte SEO-Inhalte und Schema-Updates für KMUs, mit festen Überarbeitungsrunden und Follow-up-Terminen.",
};

const SCHEMA_WEBSITE_DESCRIPTION: Record<AppLocale, string> = {
  en: "AI Business Consultancy, Discovery Sprint, SOP optimization, KPI review, and optional workflow automation for Hong Kong SMEs",
  "zh-hk": "為香港中小企提供 AI 商業升級陪跑、30 日 Discovery Sprint、SOP 流程優化、KPI review 及按需 workflow automation",
  "zh-tw": "為香港中小企提供 AI 商業升級陪跑、30 日 Discovery Sprint、SOP 流程優化、KPI review 及按需 workflow automation",
  ja: "香港の中小企業向けに WhatsApp CRM、EventXP、AI 研修、クラウド／オンプレミス支援を提供",
  de: "WhatsApp-CRM, EventXP, AI-Schulungen sowie Cloud- und On-Premise-Deployments für KMUs in Hongkong",
};

const SCHEMA_CONSULTING_SERVICE_DESCRIPTION: Record<AppLocale, string> = {
  en: "We provide AI Business Consultancy and advisory for Hong Kong SMEs: workflow health checks, SOP mapping, KPI baselines, practical AI trials, and optional automation or SaaS implementation after validation.",
  "zh-hk":
    "我們為香港中小企提供 AI 商業升級陪跑及顧問：流程健康檢查、SOP mapping、KPI baseline、AI 試行，並在驗證後按需要落地 automation 或 SaaS。",
  "zh-tw":
    "我們為香港中小企提供 AI 商業升級陪跑及顧問：流程健康檢查、SOP mapping、KPI baseline、AI 試行，並在驗證後按需要落地 automation 或 SaaS。",
  ja: "香港の中小企業向けに実用的な AI 拡張ワークフローを提供。Azure OpenAI、Alibaba Cloud、GCP、AWS またはオンプレミスへの展開に対応。",
  de: "Wir liefern praktische KI-erweiterte Workflows für KMUs in Hongkong — auf Azure OpenAI, Alibaba Cloud, GCP, AWS oder bei Bedarf Self-Hosted/On-Premise.",
};

const BREADCRUMB_HOME: Record<AppLocale, string> = {
  en: "Home",
  "zh-hk": "首頁",
  "zh-tw": "首頁",
  ja: "ホーム",
  de: "Start",
};

const BREADCRUMB_ARTICLE: Record<AppLocale, string> = {
  en: "Article",
  "zh-hk": "文章",
  "zh-tw": "文章",
  ja: "記事",
  de: "Artikel",
};

/** Segment labels indexed by URL locale — every `AppLocale` must be present per key. */
const BREADCRUMB_SEGMENTS: Record<string, Record<AppLocale, string>> = {
  bookme: {
    en: "Book a visit",
    "zh-hk": "預約洽詢",
    "zh-tw": "預約諮詢",
    ja: "予約・相談",
    de: "Termin buchen",
  },
  blog: {
    en: "Blog",
    "zh-hk": "網誌",
    "zh-tw": "部落格",
    ja: "ブログ",
    de: "Blog",
  },
  "pitch-decks": {
    en: "Pitch decks",
    "zh-hk": "簡報下載",
    "zh-tw": "簡報下載",
    ja: "ピッチ資料",
    de: "Pitch-Decks",
  },
  reliability: {
    en: "Reliability manifesto",
    "zh-hk": "可靠 AI 立場",
    "zh-tw": "可靠 AI 立場",
    ja: "信頼性の原則",
    de: "Zuverlässigkeits-Manifest",
  },
  "ai-era-quality": {
    en: "AI-era quality engineering",
    "zh-hk": "AI 時代品質工程",
    "zh-tw": "AI 時代品質工程",
    ja: "AI時代の品質工学",
    de: "Qualitätstechnik im KI-Zeitalter",
  },
  "premium-ai-consulting": {
    en: "Premium AI consulting",
    "zh-hk": "高票價 AI 顧問",
    "zh-tw": "高價值 AI 顧問",
    ja: "プレミアム AI コンサル",
    de: "Premium-KI-Beratung",
  },
  "smartsales-crm": {
    en: "SmartSales CRM",
    "zh-hk": "SmartSales CRM",
    "zh-tw": "SmartSales CRM",
    ja: "SmartSales CRM",
    de: "SmartSales CRM",
  },
  eventxp: {
    en: "EventXP",
    "zh-hk": "EventXP",
    "zh-tw": "EventXP",
    ja: "EventXP",
    de: "EventXP",
  },
  "ai-consulting": {
    en: "AI Consulting",
    "zh-hk": "AI 顧問服務",
    "zh-tw": "AI 顧問服務",
    ja: "AI コンサルティング",
    de: "KI-Beratung",
  },
  "ai-training": {
    en: "AI Training",
    "zh-hk": "AI 教班",
    "zh-tw": "AI 教班",
    ja: "AI トレーニング",
    de: "AI-Training",
  },
  "ai-coaching": {
    en: "AI Coaching",
    "zh-hk": "AI 陪跑課程",
    "zh-tw": "AI 陪跑課程",
    ja: "AI コーチング",
    de: "AI-Coaching",
  },
  "sme-ai-workflow": {
    en: "SME AI Workflow",
    "zh-hk": "中小企 AI 工作流",
    "zh-tw": "中小企 AI 工作流",
    ja: "SME AI ワークフロー",
    de: "KMU AI-Workflow",
  },
  "proposal-to-cash-ai": {
    en: "Proposal-to-Cash AI",
    "zh-hk": "Proposal-to-Cash AI",
    "zh-tw": "Proposal-to-Cash AI",
    ja: "Proposal-to-Cash AI",
    de: "Proposal-to-Cash AI",
  },
  "case-studies": {
    en: "Relevant Experience & Delivery Capability",
    "zh-hk": "相關經驗與交付能力",
    "zh-tw": "相關經驗與交付能力",
    ja: "ケーススタディ",
    de: "Fallstudien",
  },
  "ai-seo-update-package": {
    en: "AI SEO update package",
    "zh-hk": "AI SEO 更新套餐",
    "zh-tw": "AI SEO 更新方案",
    ja: "AI SEO アップデート",
    de: "AI-SEO-Update-Paket",
  },
  compare: {
    en: "Compare",
    "zh-hk": "產品比較",
    "zh-tw": "產品比較",
    ja: "製品比較",
    de: "Vergleich",
  },
  "smartsales-vs-salesforce": {
    en: "SmartSales vs Salesforce",
    "zh-hk": "SmartSales vs Salesforce",
    "zh-tw": "SmartSales vs Salesforce",
    ja: "SmartSales と Salesforce の比較",
    de: "SmartSales vs. Salesforce",
  },
  "eventxp-vs-eventbrite": {
    en: "EventXP vs Eventbrite",
    "zh-hk": "EventXP vs Eventbrite",
    "zh-tw": "EventXP vs Eventbrite",
    ja: "EventXP と Eventbrite の比較",
    de: "EventXP vs. Eventbrite",
  },
};

const HOME_FAQ_EN: FaqMainEntity = [
  {
    "@type": "Question",
    name: "What is AI CRM and how is it different from traditional CRM?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "AI CRM combines customer records with AI-generated drafts, workflow automation, and priority scoring. Unlike traditional CRM that mainly stores data, it helps teams respond faster and reduce repetitive follow-up work.",
    },
  },
  {
    "@type": "Question",
    name: "How does EventXP QR check-in work?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Guests receive a unique QR code by email or WhatsApp. Staff scan codes on-site, attendance is recorded in real time, and EventXP can trigger post-event follow-up workflows based on participation signals.",
    },
  },
  {
    "@type": "Question",
    name: "Where can InnovateXP deploy AI-assisted workflows?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "InnovateXP supports deployment on major cloud platforms (including Azure OpenAI, Alibaba Cloud, GCP, and AWS) and self-hosted or on-premise environments when your risk or compliance posture requires it, with practical AI training for your team.",
    },
  },
];

const HOME_FAQ_ZH_HK: FaqMainEntity = [
  {
    "@type": "Question",
    name: "什麼是 AI CRM？它與傳統 CRM 有何不同？",
    acceptedAnswer: {
      "@type": "Answer",
      text: "AI CRM 把客戶資料管理結合 AI 草稿、自動化流程與優先排序。相比只儲存資料的傳統 CRM，AI CRM 可協助團隊更快回覆並減少重複跟進工作。",
    },
  },
  {
    "@type": "Question",
    name: "QR 碼簽到如何運作？",
    acceptedAnswer: {
      "@type": "Answer",
      text: "賓客透過電郵或 WhatsApp 收到獨特 QR 碼，工作人員現場掃描後系統即時記錄出席，並可根據活動行為訊號自動觸發後續跟進流程。",
    },
  },
  {
    "@type": "Question",
    name: "InnovateXP 可將 AI 輔助流程部署喺邊？",
    acceptedAnswer: {
      "@type": "Answer",
      text: "我們可配合主要 Cloud Platform（Azure OpenAI、Alibaba Cloud、GCP、AWS）上架，亦可在需要時採用自家主機／On-Premise 部署以符合風險或合規要求，並提供實戰 AI training。",
    },
  },
];

const HOME_FAQ_ZH_TW: FaqMainEntity = [
  {
    "@type": "Question",
    name: "什麼是 AI CRM？與傳統 CRM 有什麼不同？",
    acceptedAnswer: {
      "@type": "Answer",
      text: "AI CRM 將客戶資料結合 AI 草稿、自動化流程與優先排序。相較於主要用來儲存資料的傳統 CRM，AI CRM 可協助團隊更快回應並降低重複跟進成本。",
    },
  },
  {
    "@type": "Question",
    name: "EventXP 的 QRCode 報到如何運作？",
    acceptedAnswer: {
      "@type": "Answer",
      text: "來賓可透過電子郵件或 WhatsApp 取得專屬 QRCode；現場掃描後即時紀錄出席，並可依參與訊號觸發活動後的跟進流程。",
    },
  },
  {
    "@type": "Question",
    name: "InnovateXP 可以把 AI 輔助流程部署在哪裡？",
    acceptedAnswer: {
      "@type": "Answer",
      text: "我們可配合主要雲端平台（Azure OpenAI、阿里雲、GCP、AWS）上架；若有合規或風控需求，亦可採用自建／地端部署，並提供實務 AI 培訓。",
    },
  },
];

const HOME_FAQ_JA: FaqMainEntity = [
  {
    "@type": "Question",
    name: "AI CRM とは何ですか？従来の CRM とどう違いますか？",
    acceptedAnswer: {
      "@type": "Answer",
      text: "AI CRM は顧客情報に AI 草案、ワークフロー自動化、優先度スコアリングを組み合わせます。データ保管が中心の従来 CRM と異なり、返信を速め、繰り返しのフォロー業務を減らします。",
    },
  },
  {
    "@type": "Question",
    name: "EventXP の QR チェックインはどう動きますか？",
    acceptedAnswer: {
      "@type": "Answer",
      text: "ゲストはメールまたは WhatsApp で固有の QR を受け取ります。スタッフが現場で読み取ると出席がリアルタイム記録され、参加シグナルに応じてイベント後フォローのワークフローを起動できます。",
    },
  },
  {
    "@type": "Question",
    name: "InnovateXP は AI 支援ワークフローをどこに展開できますか？",
    acceptedAnswer: {
      "@type": "Answer",
      text: "主要クラウド（Azure OpenAI、Alibaba Cloud、GCP、AWS）への展開に加え、リスク／コンプライアンス要件に応じてセルフホスト／オンプレミスにも対応し、実務に沿った AI 研修も提供します。",
    },
  },
];

const HOME_FAQ_DE: FaqMainEntity = [
  {
    "@type": "Question",
    name: "Was ist AI-CRM — und wie unterscheidet es sich von klassischem CRM?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "AI-CRM verbindet Kundendaten mit KI-generierten Entwürfen, Workflow-Automatisierung und Priorisierung. Anders als klassisches CRM, das vor allem speichert, hilft es Teams, schneller zu antworten und wiederkehrende Follow-up-Arbeit zu reduzieren.",
    },
  },
  {
    "@type": "Question",
    name: "Wie funktioniert der EventXP QR-Check-in?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Gäste erhalten einen individuellen QR-Code per E-Mail oder WhatsApp. Vor Ort wird gescannt, die Anwesenheit wird in Echtzeit erfasst und EventXP kann nachgelagerte Follow-up-Workflows anhand von Teilnahmesignalen auslösen.",
    },
  },
  {
    "@type": "Question",
    name: "Wo kann InnovateXP KI-unterstützte Workflows bereitstellen?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "InnovateXP unterstützt Bereitstellung auf großen Cloud-Plattformen (z. B. Azure OpenAI, Alibaba Cloud, GCP, AWS) sowie Self-Hosted/On-Premise, wenn Risiko- oder Compliance-Anforderungen es erfordern — inklusive praktischem AI-Training für Ihr Team.",
    },
  },
];

function homeFaqMainEntity(locale: AppLocale): FaqMainEntity {
  switch (locale) {
    case "en":
      return HOME_FAQ_EN;
    case "zh-hk":
      return HOME_FAQ_ZH_HK;
    case "zh-tw":
      return HOME_FAQ_ZH_TW;
    case "ja":
      return HOME_FAQ_JA;
    case "de":
      return HOME_FAQ_DE;
  }
}

const AI_SEO_FAQ_EN: FaqMainEntity = [
  {
    "@type": "Question",
    name: "How many revisions are included in the AI SEO Update Package?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "The Starter package includes 3 revisions in one week with 1 follow-up. The Growth package includes 10 revisions in one month with 2 follow-ups.",
    },
  },
];

const AI_SEO_FAQ_ZH_HK: FaqMainEntity = [
  {
    "@type": "Question",
    name: "AI SEO 更新套餐包含幾多次修改？",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Starter 套餐一星期內提供 3 次修改與 1 次 follow-up。Growth 套餐一個月內提供 10 次修改與 2 次 follow-up。",
    },
  },
];

const AI_SEO_FAQ_ZH_TW: FaqMainEntity = [
  {
    "@type": "Question",
    name: "AI SEO 更新方案包含幾次修改？",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Starter 方案於一週內提供 3 次修改與 1 次後續會議；Growth 方案於一個月內提供 10 次修改與 2 次後續會議。",
    },
  },
];

const AI_SEO_FAQ_JA: FaqMainEntity = [
  {
    "@type": "Question",
    name: "AI SEO アップデートパッケージには何回の修正が含まれますか？",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Starter は 1 週間で 3 回の修正とフォローアップ 1 回。Growth は 1 か月で 10 回の修正とフォローアップ 2 回です。",
    },
  },
];

const AI_SEO_FAQ_DE: FaqMainEntity = [
  {
    "@type": "Question",
    name: "Wie viele Überarbeitungen sind im AI-SEO-Update-Paket enthalten?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Das Starter-Paket umfasst innerhalb einer Woche 3 Überarbeitungen und 1 Follow-up. Das Growth-Paket umfasst innerhalb eines Monats 10 Überarbeitungen und 2 Follow-ups.",
    },
  },
];

function aiSeoFaqMainEntity(locale: AppLocale): FaqMainEntity {
  switch (locale) {
    case "en":
      return AI_SEO_FAQ_EN;
    case "zh-hk":
      return AI_SEO_FAQ_ZH_HK;
    case "zh-tw":
      return AI_SEO_FAQ_ZH_TW;
    case "ja":
      return AI_SEO_FAQ_JA;
    case "de":
      return AI_SEO_FAQ_DE;
  }
}

function buildBreadcrumbJsonLd(pathname: string, baseUrl: string, labelLocale: AppLocale) {
  const clean = ((pathname || "/").split("?")[0] || "/").replace(/\/$/, "") || "/";
  const lower = clean.toLowerCase();
  const urlLocale = getLocaleFromPathname(lower);
  const withoutLocale = stripLocaleFromPathname(lower);
  if (withoutLocale === "/") return null;

  const segments = withoutLocale.slice(1).split("/").filter(Boolean);
  const homeLabel = BREADCRUMB_HOME[labelLocale];
  const items: { name: string; item: string }[] = [{ name: homeLabel, item: `${baseUrl}/${urlLocale}` }];

  let acc = "";
  for (let i = 0; i < segments.length; i++) {
    acc += `/${segments[i]}`;
    const seg = segments[i];
    const known = seg ? BREADCRUMB_SEGMENTS[seg] : undefined;
    let name: string;
    if (known) {
      name = known[labelLocale];
    } else if (segments[0] === "blog") {
      name = BREADCRUMB_ARTICLE[labelLocale];
    } else {
      name = seg.replace(/-/g, " ");
    }
    items.push({ name, item: `${baseUrl}/${urlLocale}${acc}` });
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: it.name,
      item: it.item,
    })),
  };
}

type StructuredDataScope =
  | "auto"
  | "home"
  | "smartsales"
  | "eventxp"
  | "ai-consulting"
  | "ai-seo-package"
  /** Org + WebSite only; no product/FAQ (bookme, blog, reliability, etc.) */
  | "minimal";

export default function StructuredData({ type = "auto" }: { type?: StructuredDataScope }) {
  const pathname = usePathname();
  const baseUrl = "https://www.innovatexp.co";
  const lower = ((pathname || "/").split("?")[0] || "/").toLowerCase();
  const routeLocale = getLocaleFromPathname(lower);
  const pathWithoutLocale = stripLocaleFromPathname(lower);

  const resolvedScope: StructuredDataScope =
    type !== "auto"
      ? type
      : pathWithoutLocale === "/"
        ? "home"
        : pathWithoutLocale.startsWith("/smartsales-crm")
          ? "smartsales"
          : pathWithoutLocale.startsWith("/eventxp")
            ? "eventxp"
            : pathWithoutLocale.startsWith("/ai-consulting")
              ? "ai-consulting"
              : pathWithoutLocale.startsWith("/ai-seo-update-package")
                ? "ai-seo-package"
                : "minimal";

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    name: "InnovateXP Limited",
    alternateName: "IXP",
    legalName: "InnovateXP Limited",
    url: baseUrl,
    logo: `${baseUrl}/innovatexp_color_no_bg.svg`,
    description: pickSchema(routeLocale, SCHEMA_ORGANIZATION_DESCRIPTION),
    address: {
      "@type": "PostalAddress",
      addressLocality: "North Point",
      addressRegion: "Hong Kong",
      addressCountry: "HK",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: "info@innovatexp.co",
      availableLanguage: ["English", "Chinese"],
    },
    founder: {
      "@type": "Person",
      "@id": `${baseUrl}/#founder`,
      name: "InnovateXP founder",
      jobTitle: "AI Business Consultant",
      url: baseUrl,
      sameAs: ["https://www.linkedin.com/company/innovatexp"],
    },
    sameAs: ["https://www.linkedin.com/company/innovatexp"],
    knowsAbout: [
      "AI CRM",
      "SME AI Automation",
      "Business Process Automation",
      "AI Implementation Consulting",
      "Next.js",
      "Ollama",
      "Prompt Engineering",
      "Event Check-in Intelligence",
      "Business Intelligence Dashboards",
      "Lead Qualification Automation",
      "Azure OpenAI Implementation",
      "Alibaba Cloud AI Deployment",
      "GCP AI Deployment",
      "AWS AI Deployment",
      "AI-augmented Workflow Deployment",
      "On-Premise AI Deployment",
      "AI Business Consultancy",
      "AI Business Upgrade Accelerator",
      "AI consultant Hong Kong",
      "AI adoption for SMEs",
      "business process automation",
      "SOP 流程優化",
      "AI 商業升級",
      "AI 商業顧問",
      "AI 陪跑課程",
      "中小企 AI 升級",
      "AI 工作流",
      "香港中小企 AI 顧問",
      "30-day Discovery Sprint",
    ],
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${baseUrl}/#founder`,
    name: "InnovateXP founder",
    jobTitle: "AI Business Consultant",
    description: pickSchema(routeLocale, SCHEMA_PERSON_DESCRIPTION),
    url: baseUrl,
    image: `${baseUrl}/mypresent.jpg`,
    sameAs: ["https://www.linkedin.com/company/innovatexp"],
    worksFor: {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
    },
    alumniOf: [
      {
        "@type": "Organization",
        name: "Hong Kong Science and Technology Parks Corporation",
        sameAs: "https://www.hkstp.org",
      },
    ],
    affiliation: [
      {
        "@type": "Organization",
        name: "Agilizing Education Center",
        sameAs: "https://agilizing.com",
      },
      {
        "@type": "Organization",
        name: "BNI Anchor",
        sameAs: "https://www.bni-anchor.com/",
      },
    ],
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${baseUrl}/#localbusiness`,
    name: "InnovateXP Limited",
    image: `${baseUrl}/innovatexp_color_no_bg.svg`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "North Point",
      addressRegion: "Hong Kong",
      addressCountry: "HK",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 22.2908,
      longitude: 114.195,
    },
    url: baseUrl,
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
  };

  const smartSalesCRMService = {
    "@context": "https://schema.org",
    "@type": ["Service", "Product"],
    "@id": `${baseUrl}/#smartsales-crm`,
    serviceType: "AI CRM Software",
    name: "SmartSales CRM",
    description: pickSchema(routeLocale, SCHEMA_SMARTSALES_DESCRIPTION),
    provider: {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Hong Kong and Greater Bay Area",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "SmartSales CRM Pricing",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "SmartSales CRM - Starter",
          },
          price: "2800",
          priceCurrency: "HKD",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "2800",
            priceCurrency: "HKD",
            unitText: "per month",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "SmartSales CRM - Pro",
          },
          price: "4800",
          priceCurrency: "HKD",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "4800",
            priceCurrency: "HKD",
            unitText: "per month",
          },
        },
      ],
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "HKD",
      lowPrice: "10800",
      highPrice: "18880",
      offerCount: 3,
    },
  };

  const eventXPService = {
    "@context": "https://schema.org",
    "@type": ["Service", "Product"],
    "@id": `${baseUrl}/#eventxp`,
    serviceType: "Event Management Software",
    name: "EventXP",
    description: pickSchema(routeLocale, SCHEMA_EVENTXP_DESCRIPTION),
    provider: {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Hong Kong and Greater Bay Area",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "EventXP Pricing",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "EventXP - Starter (maintenance)",
          },
          price: "880",
          priceCurrency: "HKD",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "880",
            priceCurrency: "HKD",
            unitText: "per month",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "EventXP - Growth (maintenance)",
          },
          price: "1280",
          priceCurrency: "HKD",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "1280",
            priceCurrency: "HKD",
            unitText: "per month",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "EventXP - Enterprise (maintenance)",
          },
          price: "1480",
          priceCurrency: "HKD",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "1480",
            priceCurrency: "HKD",
            unitText: "per month",
          },
        },
      ],
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "HKD",
      lowPrice: "6800",
      highPrice: "9800",
      offerCount: 3,
    },
  };

  const aiConsultingService = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${baseUrl}/#ai-consulting`,
    serviceType: "AI Business Upgrade Advisory",
    name: "AI Business Upgrade Accelerator",
    description: pickSchema(routeLocale, SCHEMA_CONSULTING_SERVICE_DESCRIPTION),
    provider: {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Hong Kong and Greater Bay Area",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "AI Business Upgrade Programs",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "30-day AI Upgrade Discovery Sprint",
          },
          price: "8000",
          priceCurrency: "HKD",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI Upgrade Foundation",
          },
          price: "25000",
          priceCurrency: "HKD",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI Upgrade Accelerator",
          },
          price: "12000",
          priceCurrency: "HKD",
        },
      ],
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "HKD",
      lowPrice: "8000",
      highPrice: "25000",
      offerCount: 3,
    },
  };

  const aiSeoUpdateService = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${baseUrl}/#ai-seo-update-package`,
    serviceType: "AI SEO Content Update Service",
    name: pickSchema(routeLocale, SCHEMA_AI_SEO_NAME),
    description: pickSchema(routeLocale, SCHEMA_AI_SEO_DESCRIPTION),
    provider: {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "HKD",
      lowPrice: "2000",
      highPrice: "6000",
      offerCount: 2,
      offers: [
        {
          "@type": "Offer",
          name: "AI SEO 更新套餐 - Starter",
          price: "2000",
          priceCurrency: "HKD",
          description: "3 次改動、1 星期完成、1 次 follow-up",
        },
        {
          "@type": "Offer",
          name: "AI SEO 更新套餐 - Growth",
          price: "6000",
          priceCurrency: "HKD",
          description: "10 次改動、1 個月完成、2 次 follow-up",
        },
      ],
    },
    url: `${baseUrl}/ai-seo-update-package`,
  };

  const homeFaqPageSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homeFaqMainEntity(routeLocale),
  };

  const aiSeoUpdateFaqPageSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: aiSeoFaqMainEntity(routeLocale),
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    url: baseUrl,
    name: "InnovateXP Limited",
    description: pickSchema(routeLocale, SCHEMA_WEBSITE_DESCRIPTION),
    publisher: {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
    },
    inLanguage: ["en-HK", "zh-HK", "zh-TW", "ja-JP", "de-DE"],
  };

  const consultingServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${baseUrl}/#consulting-service`,
    name: "InnovateXP Limited",
    description: pickSchema(routeLocale, SCHEMA_CONSULTING_SERVICE_DESCRIPTION),
    url: baseUrl,
    serviceType: "AI Business Consultancy and Advisory",
    provider: {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
    },
    areaServed: [
      { "@type": "Country", name: "Hong Kong" },
      { "@type": "Country", name: "United States" },
      { "@type": "Place", name: "Global" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "AI Business Consultancy, Advisory, and Optional Solutions",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Consulting" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "SmartSales CRM" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "EventXP" } },
      ],
    },
  };

  const scopedServiceSchemas =
    resolvedScope === "home"
      ? [smartSalesCRMService, eventXPService, aiConsultingService]
      : resolvedScope === "smartsales"
        ? [smartSalesCRMService]
        : resolvedScope === "eventxp"
          ? [eventXPService]
          : resolvedScope === "ai-consulting"
            ? [aiConsultingService]
            : resolvedScope === "ai-seo-package"
              ? [aiSeoUpdateService]
              : [];

  /** Product/detail pages expose richer FAQPage JSON-LD locally — avoid duplicate/conflicting FAQ here. */
  const scopedFaqSchemas =
    resolvedScope === "home" ? [homeFaqPageSchema] : resolvedScope === "ai-seo-package" ? [aiSeoUpdateFaqPageSchema] : [];

  const breadcrumbSchema = buildBreadcrumbJsonLd(pathname || "/", baseUrl, routeLocale);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      {scopedServiceSchemas.map((schema, idx) => (
        <script
          key={`service-schema-${idx}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      {breadcrumbSchema ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      ) : null}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(consultingServiceSchema) }} />
      {scopedFaqSchemas.map((schema, idx) => (
        <script
          key={`faq-schema-${idx}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
