"use client";
/* F03: Route-scoped JSON-LD - Injects Organization, Service, FAQ, and page-specific structured data by path. */
import { usePathname } from "next/navigation";
import type { AppLocale } from "@/lib/i18n-routing";
import { getLocaleFromPathname, localeToHtmlLang, stripLocaleFromPathname } from "@/lib/i18n-routing";
import { PRICING } from "@/content/pricing";
import { VISIONXP_DEMO_URL } from "@/content/visionxp";

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
  en: "InnovateXP Limited is a Hong Kong AI business consultancy founded by Larry Lo. Signature method: Business Workflow Diagnosis — process first, AI second. We help SMEs of 3–30 fix one sales or operations workflow before CRM or AI. Optional products after clarity include SmartSales CRM, EventXP, FitnessXP, and VisionXP demo.",
  "zh-hk":
    "InnovateXP Limited 由 Larry Lo 創立，係香港 AI 商業顧問公司。定位「先執順流程，再落地 AI」。幫 3–30 人中小企先聽清一條收入或營運流程，再決定 AI、CRM 或自動化。流程清楚後可選 SmartSales CRM、EventXP、FitnessXP、VisionXP 示範。",
  "zh-tw":
    "InnovateXP Limited 由 Larry Lo 創立，是香港 AI 商業顧問公司。定位「先執順流程，再落地 AI」。協助 3–30 人中小企業先釐清一條收入或營運流程，再決定 AI、CRM 或自動化。流程清楚後可選 SmartSales CRM、EventXP、FitnessXP、VisionXP 示範。",
  ja: "InnovateXP Limited は Larry Lo が創業した香港の AI ビジネスコンサルティング会社です。中小企業が売上・業務の重要フローを先に整え、必要なら AI／CRM／自動化を導入します。Discovery Sprint は HK$6,800〜。業務が明確になった後、SmartSales CRM、EventXP、VisionXP デモを選べます。",
  de: "InnovateXP Limited ist eine von Larry Lo gegründete AI-Business-Beratung in Hongkong. KMUs reparieren zuerst einen Workflow und führen AI, CRM oder Automation erst danach ein. Discovery Sprint ab HK$6,800. Nach Workflow-Klarheit optional SmartSales CRM, EventXP und VisionXP-Demo.",
};

const SCHEMA_PERSON_DESCRIPTION: Record<AppLocale, string> = {
  en: "I am AI Business Consultant Larry Lo / InnovateXP. Founder of InnovateXP Limited in Hong Kong with 14 years of IT delivery experience. Helps SMEs of 3–30 fix WhatsApp/Excel-heavy operations via Business Workflow Diagnosis before adopting AI.",
  "zh-hk": "我係 AI 商業顧問 Larry Lo／InnovateXP。InnovateXP Limited 創辦人，駐香港，14 年 IT 交付經驗。專幫 3–30 人中小企先執順 WhatsApp／Excel 流程，再落地 AI。",
  "zh-tw":
    "Larry Lo 是 InnovateXP Limited 創辦人，香港 AI 商業顧問，具備 14 年 IT 交付經驗。專協助 3–30 人中小企業先理順 WhatsApp／Excel 流程，再落地 AI。",
  ja: "Larry Lo は香港の中小企業向け AI ビジネスコンサルティング InnovateXP Limited を率いています。13年以上の IT デリバリー経験に加え、2025年には GDG Hong Kong、PISM Sharing、DevFest Hong Kong で司会・登壇・プロジェクト紹介を行った7件の公開記録があります。",
  de: "Larry Lo leitet InnovateXP Limited, eine AI Business Consultancy für KMU in Hongkong. Er verfügt über mehr als 13 Jahre IT-Delivery-Erfahrung und sieben datierte öffentliche Auftritte im Jahr 2025 als Gastgeber, Sprecher oder Projektpräsentator bei GDG Hong Kong, PISM Sharing und DevFest Hong Kong.",
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

const SCHEMA_VISIONXP_DESCRIPTION: Record<AppLocale, string> = {
  en: "VisionXP is InnovateXP’s technology prototype / AI visual-tracking demo for paediatric training workflows (ages 3–12). Frontend-only public demo — no login, no patient data. Not a medical diagnostic tool, not a registered medical device, and not a substitute for professional optometry or ophthalmology examination. Path: demo → Discovery → Implementation Sprint.",
  "zh-hk":
    "VisionXP 係 InnovateXP 嘅技術原型／AI 視覺追蹤示範（3–12 歲訓練流程）。純前端、無須登入、唔存病人資料。並非醫療診斷工具，亦唔係註冊醫療器械，不能代替專業視光或眼科檢查。路徑：demo → Discovery → Implementation Sprint。",
  "zh-tw":
    "VisionXP 是 InnovateXP 的技術原型／AI 視覺追蹤示範（3–12 歲訓練流程）。純前端、無須登入、不存病人資料。並非醫療診斷工具，也不是註冊醫療器材，不能取代專業視光或眼科檢查。路徑：demo → Discovery → Implementation Sprint。",
  ja: "VisionXP は InnovateXP の技術プロトタイプ／AI視覚トラッキングデモ（3–12歳向けトレーニング業務）。フロントエンドのみ、ログイン不要、患者データ非保存。医療診断ツールではなく、登録医療機器でもなく、専門の視能・眼科検査の代替にもなりません。経路：demo → Discovery → Implementation Sprint。",
  de: "VisionXP ist InnovateXPs Technologie-Prototyp / KI-Visual-Tracking-Demo für pädiatrische Trainings-Workflows (3–12). Nur Frontend, kein Login, keine Patientendaten. Kein medizinisches Diagnosetool, kein zugelassenes Medizinprodukt und kein Ersatz für professionelle optometrische oder ophthalmologische Untersuchung. Weg: Demo → Discovery → Implementation Sprint.",
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
  en: "Hong Kong AI business consultancy: workflow diagnosis, Discovery Sprint from HK$6,800, WhatsApp CRM (SmartSales), EventXP, VisionXP demo, and optional private AI for SMEs.",
  "zh-hk": "香港 AI 商業顧問：流程診斷、Discovery Sprint 由 HK$6,800 起、WhatsApp CRM（SmartSales）、EventXP、VisionXP 示範，以及按需私有 AI。",
  "zh-tw": "香港 AI 商業顧問：流程診斷、Discovery Sprint 由 HK$6,800 起、WhatsApp CRM（SmartSales）、EventXP、VisionXP 示範，以及按需私有 AI。",
  ja: "香港の AI ビジネスコンサル：業務診断、Discovery Sprint（HK$6,800〜）、WhatsApp CRM（SmartSales）、EventXP、VisionXP デモ、必要に応じてプライベート AI。",
  de: "AI-Business-Beratung Hongkong: Workflow-Diagnose, Discovery Sprint ab HK$6,800, WhatsApp-CRM (SmartSales), EventXP, VisionXP-Demo und optionale Private AI für KMUs.",
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
  visionxp: {
    en: "VisionXP",
    "zh-hk": "VisionXP",
    "zh-tw": "VisionXP",
    ja: "VisionXP",
    de: "VisionXP",
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
    name: "What is Business Workflow Diagnosis?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Business Workflow Diagnosis is InnovateXP’s signature 30-minute method to lock onto one revenue or operations workflow, clarify leaks and ownership, and decide the next step. Unlike report-and-leave consulting, diagnosis feeds into an AI Discovery Sprint or 30-day implementation so the team actually adopts the change.",
    },
  },
  {
    "@type": "Question",
    name: "Is Business Workflow Diagnosis part of your AI consulting?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Yes — one path. I am AI Business Consultant Larry Lo / InnovateXP. Business Workflow Diagnosis is the signature method to clarify process first, then AI readiness, Discovery Sprint, or advisory — not a business-coach pitch or a SaaS hard sell.",
    },
  },
  {
    "@type": "Question",
    name: "How does SME workflow diagnosis work in Hong Kong?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Book a diagnosis session and bring your messiest line (WhatsApp enrolment or quoting). Together we map owners, handoffs, and tracking, then recommend Discovery Sprint if needed. Built for Hong Kong teams of 3–30 still running on manual follow-up.",
    },
  },
  {
    "@type": "Question",
    name: "WhatsApp and Excel are chaos — must we buy a CRM first?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Not always. Most leakage is unclear ownership and follow-up rhythm, not missing software. Diagnosis reviews how WhatsApp, Excel, and forms drop leads. If a clearer process is enough, you can delay CRM and avoid vendor-style tool pushing.",
    },
  },
  {
    "@type": "Question",
    name: "How do you help training centres with class operations?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Start with diagnosis of class schedules, coaches, attendance, and renewals — especially WhatsApp/Excel bottlenecks. Only after the workflow is clear do we consider FitnessXP or a custom landing Sprint. Goal: visible classes and renewals, not a big-system swap first.",
    },
  },
  {
    "@type": "Question",
    name: "Where should a tutorial school start with student management?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Diagnose enquiry → trial → enrolment → payment. Typical pain is scattered student status and memory-based follow-up. After diagnosis you get owners and a status board; then a 30-day Sprint or class tool if needed.",
    },
  },
  {
    "@type": "Question",
    name: "Is Business Workflow Diagnosis useful for fitness coach management?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Yes. Studios often split scheduling, commissions, unpaid fees, and attendance. Diagnosis clarifies states and owners before FitnessXP. Designed for studios still running mainly on WhatsApp and Excel.",
    },
  },
  {
    "@type": "Question",
    name: "Do SOP automation advisors push AI immediately?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "No. Positioning is process first, AI second. If SOPs and ownership are unclear, automation amplifies chaos. We diagnose and stabilise SOP nodes before chatbots, reminders, or AI drafts.",
    },
  },
  {
    "@type": "Question",
    name: "What is AI readiness preparation?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "An AI Readiness review checks data location, permissions, repetitive work, and measurable outcomes. It usually follows diagnosis: one clear workflow first, then an AI Discovery Sprint scope — so you do not buy models or tools unprepared.",
    },
  },
  {
    "@type": "Question",
    name: "Do Hong Kong AI workshops include deliverables?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Yes. Workshops and coaching map to one real company workflow and deliver usable drafts, SOP nodes, or follow-up lists — not tool demos only. If you only want concepts with no landing, scope is stated upfront.",
    },
  },
  {
    "@type": "Question",
    name: "AI Discovery Sprint vs 30-day Sprint?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Discovery validates whether a workflow deserves AI/CRM in a short cycle. The 30-day Sprint delivers process map, ownership, SOP, tracking, and one quick win. Both start from Business Workflow Diagnosis; advisory retainers come later.",
    },
  },
  {
    "@type": "Question",
    name: "How do I book Larry Lo / InnovateXP?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Book a Business Workflow Diagnosis on innovatexp.co, or contact via WhatsApp/email. We confirm industry, messiest workflow, and expected outcome. Path: diagnosis → Discovery/30-day Sprint → advisory — not instant tool purchase.",
    },
  }
];

const HOME_FAQ_ZH_HK: FaqMainEntity = [
  {
    "@type": "Question",
    name: "咩係業務聽診？同一般顧問有咩分別？",
    acceptedAnswer: {
      "@type": "Answer",
      text: "業務聽診（Business Workflow Diagnosis）係 InnovateXP 嘅簽名方法：用大約 30 分鐘鎖定一條最影響收入或營運嘅流程，講清漏位、責任同下一步。同交報告就走嘅顧問唔同，聽診之後會進入 AI Discovery Sprint 或 30 日落地，確保團隊真係用到。",
    },
  },
  {
    "@type": "Question",
    name: "業務聽診同 AI 商業顧問服務係咪同一套？",
    acceptedAnswer: {
      "@type": "Answer",
      text: "係同一條主線。我係 AI 商業顧問 Larry Lo／InnovateXP；業務聽診係簽名方法，用嚟先釐清流程，再按需要做 AI 導入前準備、Discovery Sprint 或陪跑，而唔會一開始就推 SaaS 或當 business coach。",
    },
  },
  {
    "@type": "Question",
    name: "中小企業務流程診斷喺香港點做？",
    acceptedAnswer: {
      "@type": "Answer",
      text: "預約一節業務聽診，帶你最亂嘅一條線（例如 WhatsApp 報名或報價）。會一齊畫出責任、交接同追蹤節點，再建議係咪要 Discovery Sprint。適合香港 3–30 人、仍然靠人手跟進嘅團隊。",
    },
  },
  {
    "@type": "Question",
    name: "WhatsApp、Excel 管理太亂，一定要先買 CRM 嗎？",
    acceptedAnswer: {
      "@type": "Answer",
      text: "唔一定。多數問題係責任同跟進節奏未定，而唔係缺一個系統。業務聽診會先睇現有 WhatsApp／Excel／表單點樣漏客；如果流程執順已經夠用，可以暫時唔買 CRM，避免成為便宜工具供應商式硬推。",
    },
  },
  {
    "@type": "Question",
    name: "培訓機構課堂管理系統，InnovateXP 點幫？",
    acceptedAnswer: {
      "@type": "Answer",
      text: "先業務聽診課堂、教練、出席同續堂流程，搵出邊度靠 WhatsApp／Excel 頂住。確認流程後，先考慮 FitnessXP 或自訂流程落地。目標係課堂用得清、續堂跟得到，而唔係一開始換一套大系統。",
    },
  },
  {
    "@type": "Question",
    name: "補習社學生管理可以由邊度開始？",
    acceptedAnswer: {
      "@type": "Answer",
      text: "由查詢 → 試堂 → 報名 → 收款呢條線做業務聽診。常見問題係學生狀態散落、跟進靠記性。聽診後會交付責任同狀態表；需要時再接 30 日落地 Sprint 或課堂管理工具。",
    },
  },
  {
    "@type": "Question",
    name: "Fitness center 課堂教練管理，適唔適合業務聽診？",
    acceptedAnswer: {
      "@type": "Answer",
      text: "適合。Fitness／Yoga／Pilates studio 常見痛點係排程、教練佣金、未付同出席各自為政。業務聽診會先釐清狀態同責任，再決定係咪落地 FitnessXP。適合仍然主要用 WhatsApp + Excel 嘅 studio。",
    },
  },
  {
    "@type": "Question",
    name: "SOP 自動化顧問會唔會一開始就推 AI？",
    acceptedAnswer: {
      "@type": "Answer",
      text: "唔會。定位係「先執順流程，再落地 AI」。如果 SOP 未寫清、責任未定，自動化只會放大混亂。先聽診同執 SOP，確認有穩定節點，先談 chatbot、提醒或 AI 草稿。",
    },
  },
  {
    "@type": "Question",
    name: "AI 導入前準備要做啲咩？",
    acceptedAnswer: {
      "@type": "Answer",
      text: "AI Readiness 評估會睇資料位置、權限、重複工序同可量度結果。通常跟住業務聽診：先有一條清晰 workflow，再決定 AI Discovery Sprint 範圍，避免未準備好就買模型或工具。",
    },
  },
  {
    "@type": "Question",
    name: "香港 AI 工作坊有冇交付成果？",
    acceptedAnswer: {
      "@type": "Answer",
      text: "有。工作坊／陪跑唔係淨係演示工具，會對應你公司一條真實流程，交付可用草稿、SOP 節點或可跟進清單。如果只想聽概念、唔想落地，會事先講清範圍，唔會當便宜 SaaS 推銷場。",
    },
  },
  {
    "@type": "Question",
    name: "AI Discovery Sprint 同 30 日落地 Sprint 有咩分別？",
    acceptedAnswer: {
      "@type": "Answer",
      text: "AI Discovery Sprint 用短週期驗證一條流程值唔值得加 AI／CRM。30 日落地 Sprint 則交付流程圖、責任、SOP、追蹤同一個 quick win。兩者都由業務聽診起步；之後可進入顧問陪跑。",
    },
  },
  {
    "@type": "Question",
    name: "點樣預約 Larry Lo／InnovateXP？",
    acceptedAnswer: {
      "@type": "Answer",
      text: "喺 innovatexp.co 預約業務聽診（約 30 分鐘），或 WhatsApp／電郵聯絡。會確認你嘅行業、最亂嘅一條流程，同預期結果。主線係聽診 → Discovery／30 日落地 → 陪跑，而唔係即買工具。",
    },
  }
];

const HOME_FAQ_ZH_TW: FaqMainEntity = [
  {
    "@type": "Question",
    name: "咩係業務聽診？同一般顧問有咩分別？",
    acceptedAnswer: {
      "@type": "Answer",
      text: "業務聽診（Business Workflow Diagnosis）係 InnovateXP 嘅簽名方法：用大約 30 分鐘鎖定一條最影響收入或營運嘅流程，講清漏位、責任同下一步。同交報告就走嘅顧問唔同，聽診之後會進入 AI Discovery Sprint 或 30 日落地，確保團隊真係用到。",
    },
  },
  {
    "@type": "Question",
    name: "業務聽診同 AI 商業顧問服務係咪同一套？",
    acceptedAnswer: {
      "@type": "Answer",
      text: "係同一條主線。我係 AI 商業顧問 Larry Lo／InnovateXP；業務聽診係簽名方法，用嚟先釐清流程，再按需要做 AI 導入前準備、Discovery Sprint 或陪跑，而唔會一開始就推 SaaS 或當 business coach。",
    },
  },
  {
    "@type": "Question",
    name: "中小企業務流程診斷喺香港點做？",
    acceptedAnswer: {
      "@type": "Answer",
      text: "預約一節業務聽診，帶你最亂嘅一條線（例如 WhatsApp 報名或報價）。會一齊畫出責任、交接同追蹤節點，再建議係咪要 Discovery Sprint。適合香港 3–30 人、仍然靠人手跟進嘅團隊。",
    },
  },
  {
    "@type": "Question",
    name: "WhatsApp、Excel 管理太亂，一定要先買 CRM 嗎？",
    acceptedAnswer: {
      "@type": "Answer",
      text: "唔一定。多數問題係責任同跟進節奏未定，而唔係缺一個系統。業務聽診會先睇現有 WhatsApp／Excel／表單點樣漏客；如果流程執順已經夠用，可以暫時唔買 CRM，避免成為便宜工具供應商式硬推。",
    },
  },
  {
    "@type": "Question",
    name: "培訓機構課堂管理系統，InnovateXP 點幫？",
    acceptedAnswer: {
      "@type": "Answer",
      text: "先業務聽診課堂、教練、出席同續堂流程，搵出邊度靠 WhatsApp／Excel 頂住。確認流程後，先考慮 FitnessXP 或自訂流程落地。目標係課堂用得清、續堂跟得到，而唔係一開始換一套大系統。",
    },
  },
  {
    "@type": "Question",
    name: "補習社學生管理可以由邊度開始？",
    acceptedAnswer: {
      "@type": "Answer",
      text: "由查詢 → 試堂 → 報名 → 收款呢條線做業務聽診。常見問題係學生狀態散落、跟進靠記性。聽診後會交付責任同狀態表；需要時再接 30 日落地 Sprint 或課堂管理工具。",
    },
  },
  {
    "@type": "Question",
    name: "Fitness center 課堂教練管理，適唔適合業務聽診？",
    acceptedAnswer: {
      "@type": "Answer",
      text: "適合。Fitness／Yoga／Pilates studio 常見痛點係排程、教練佣金、未付同出席各自為政。業務聽診會先釐清狀態同責任，再決定係咪落地 FitnessXP。適合仍然主要用 WhatsApp + Excel 嘅 studio。",
    },
  },
  {
    "@type": "Question",
    name: "SOP 自動化顧問會唔會一開始就推 AI？",
    acceptedAnswer: {
      "@type": "Answer",
      text: "唔會。定位係「先執順流程，再落地 AI」。如果 SOP 未寫清、責任未定，自動化只會放大混亂。先聽診同執 SOP，確認有穩定節點，先談 chatbot、提醒或 AI 草稿。",
    },
  },
  {
    "@type": "Question",
    name: "AI 導入前準備要做啲咩？",
    acceptedAnswer: {
      "@type": "Answer",
      text: "AI Readiness 評估會睇資料位置、權限、重複工序同可量度結果。通常跟住業務聽診：先有一條清晰 workflow，再決定 AI Discovery Sprint 範圍，避免未準備好就買模型或工具。",
    },
  },
  {
    "@type": "Question",
    name: "香港 AI 工作坊有冇交付成果？",
    acceptedAnswer: {
      "@type": "Answer",
      text: "有。工作坊／陪跑唔係淨係演示工具，會對應你公司一條真實流程，交付可用草稿、SOP 節點或可跟進清單。如果只想聽概念、唔想落地，會事先講清範圍，唔會當便宜 SaaS 推銷場。",
    },
  },
  {
    "@type": "Question",
    name: "AI Discovery Sprint 同 30 日落地 Sprint 有咩分別？",
    acceptedAnswer: {
      "@type": "Answer",
      text: "AI Discovery Sprint 用短週期驗證一條流程值唔值得加 AI／CRM。30 日落地 Sprint 則交付流程圖、責任、SOP、追蹤同一個 quick win。兩者都由業務聽診起步；之後可進入顧問陪跑。",
    },
  },
  {
    "@type": "Question",
    name: "點樣預約 Larry Lo／InnovateXP？",
    acceptedAnswer: {
      "@type": "Answer",
      text: "喺 innovatexp.co 預約業務聽診（約 30 分鐘），或 WhatsApp／電郵聯絡。會確認你嘅行業、最亂嘅一條流程，同預期結果。主線係聽診 → Discovery／30 日落地 → 陪跑，而唔係即買工具。",
    },
  }
];

const HOME_FAQ_JA: FaqMainEntity = [
  {
    "@type": "Question",
    name: "InnovateXP は何をする会社ですか？",
    acceptedAnswer: {
      "@type": "Answer",
      text: "InnovateXP Limited は Larry Lo が創業した香港の AI ビジネスコンサルティング会社です。中小企業が売上・業務の重要フローを先に整え、必要なら AI／CRM／自動化を導入する支援をします。入口は 30 日 Discovery Sprint（HK$6,800〜）です。",
    },
  },
  {
    "@type": "Question",
    name: "Larry Lo / InnovateXP とは誰ですか？",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Larry Lo は InnovateXP Limited の創業者で AI ビジネスコンサルタントです。13年以上の IT デリバリー経験があり、2025年には GDG Hong Kong、PISM Sharing、DevFest Hong Kong で司会・登壇・プロジェクト紹介を行った7件の公開記録があります。",
    },
  },
  {
    "@type": "Question",
    name: "今すぐ AI を入れるべきですか？",
    acceptedAnswer: {
      "@type": "Answer",
      text: "必ずしもすぐではありません。まず売上や業務に効く1本のフローを整え、効果が確認できてから AI の必要性を判断するのが InnovateXP の方針です。",
    },
  },
  {
    "@type": "Question",
    name: "先に CRM を買う必要がありますか？",
    acceptedAnswer: {
      "@type": "Answer",
      text: "必ずしも不要です。担当・引き継ぎ・フォローのリズムを先に明確にします。既存ツールで足りる場合は、購入しない提案もします。",
    },
  },
  {
    "@type": "Question",
    name: "Discovery Sprint の料金は？",
    acceptedAnswer: {
      "@type": "Answer",
      text: "30日 Discovery Sprint は10人以下 HK$6,800、11–30人 HK$13,600、31人以上は個別見積です。Foundation／Accelerator／Partnership は SOP の複雑さに応じて見積ります。",
    },
  },
  {
    "@type": "Question",
    name: "SmartSales CRM とは何ですか？",
    acceptedAnswer: {
      "@type": "Answer",
      text: "SmartSales CRM は WhatsApp 主導の営業向けパイプラインです。問い合わせ集約、担当、ステージ管理、AI Draft-first に対応。トライアル HK$5,000、保守は月額約 HK$880〜。",
    },
  },
  {
    "@type": "Question",
    name: "EventXP とは何ですか？",
    acceptedAnswer: {
      "@type": "Answer",
      text: "EventXP は香港のイベントチーム向けの受付・フォローツールです。QR チェックイン、リードスコア、リアルタイムレポート、イベント後フォロー。トライアル HK$4,000／イベント、保守は月額約 HK$880〜。",
    },
  },
  {
    "@type": "Question",
    name: "VisionXP とは何ですか？",
    acceptedAnswer: {
      "@type": "Answer",
      text: "VisionXP は InnovateXP の技術プロトタイプ／AI視覚トラッキングデモ（3–12歳向けトレーニング業務）です。公開サイトはフロントエンドのみで、ログイン不要・患者データ非保存。商用経路は demo → Discovery → Implementation Sprint です。",
    },
  },
  {
    "@type": "Question",
    name: "VisionXP は医療診断ツールまたは医療機器ですか？",
    acceptedAnswer: {
      "@type": "Answer",
      text: "いいえ。VisionXP は技術プロトタイプ／AI視覚トラッキングデモであり、医療診断ツールでも登録医療機器でもなく、専門の視能・眼科検査の代替にもなりません。",
    },
  },
];

const HOME_FAQ_DE: FaqMainEntity = [
  {
    "@type": "Question",
    name: "Was macht InnovateXP?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "InnovateXP Limited ist eine von Larry Lo gegründete AI-Business-Beratung in Hongkong. KMUs reparieren zuerst einen umsatz- oder betriebsrelevanten Workflow (Ownership, SOP, Follow-up) und führen AI, CRM oder Automation erst danach ein — wenn es gerechtfertigt ist. Einstieg: 30-Tage Discovery Sprint ab HK$6,800.",
    },
  },
  {
    "@type": "Question",
    name: "Wer ist Larry Lo / InnovateXP?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Larry Lo ist Gründer von InnovateXP Limited und AI Business Consultant in Hongkong. Er hat über 13 Jahre IT-Delivery-Erfahrung und sieben datierte öffentliche Auftritte 2025 als Gastgeber, Sprecher oder Projektpräsentator bei GDG Hong Kong, PISM Sharing und DevFest Hong Kong.",
    },
  },
  {
    "@type": "Question",
    name: "Sind wir jetzt bereit für KI?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Nicht jedes Team sollte sofort mit KI starten. InnovateXP empfiehlt meist, zuerst einen umsatz- oder betriebsrelevanten Workflow zu klären und erst dann zu entscheiden, ob KI echten Nutzen bringt.",
    },
  },
  {
    "@type": "Question",
    name: "Brauchen wir zuerst ein CRM?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Nicht immer. Ownership, Übergaben und Follow-up-Rhythmus kommen meist vor dem Kauf eines neuen CRM. Wenn bestehende Tools nach Klärung der Verantwortung reichen, rät InnovateXP ggf. vom Kauf ab.",
    },
  },
  {
    "@type": "Question",
    name: "Was kostet der Discovery Sprint?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Der 30-Tage Discovery Sprint kostet HK$6,800 bis 10 Personen, HK$13,600 für 11–30 Personen und wird ab 31 Personen individuell angeboten. Foundation/Accelerator/Partnership werden nach SOP-Komplexität bewertet.",
    },
  },
  {
    "@type": "Question",
    name: "Was ist SmartSales CRM?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "SmartSales CRM ist die WhatsApp-first Sales-Pipeline von InnovateXP für KMUs in Hongkong: Anfragen zentralisieren, Ownership, Pipeline-Stufen und AI Draft-first. Trial HK$5,000; Wartung ab ca. HK$880/Monat.",
    },
  },
  {
    "@type": "Question",
    name: "Was ist EventXP?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "EventXP ist das Event-Operations-Tool von InnovateXP für Teams in Hongkong: QR-Check-in, Lead-Scoring, Live-Reporting und Follow-up nach dem Event. Trial HK$4,000 pro Event; Wartung ab ca. HK$880/Monat.",
    },
  },
  {
    "@type": "Question",
    name: "Was ist VisionXP?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "VisionXP ist InnovateXPs Technologie-Prototyp / KI-Visual-Tracking-Demo für pädiatrische Trainings-Workflows (3–12). Die Live-Seite ist nur Frontend — kein Login, keine Patientendaten. Kommerzieller Weg: Demo → Discovery → Implementation Sprint.",
    },
  },
  {
    "@type": "Question",
    name: "Ist VisionXP ein medizinisches Diagnosetool oder Medizinprodukt?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Nein. VisionXP ist ein Technologie-Prototyp / eine KI-Visual-Tracking-Demo — kein medizinisches Diagnosetool, kein zugelassenes Medizinprodukt und kein Ersatz für eine professionelle optometrische oder ophthalmologische Untersuchung.",
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
  | "visionxp"
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
            : pathWithoutLocale.startsWith("/visionxp")
              ? "visionxp"
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
      name: "Larry Lo",
      jobTitle: "AI Business Consultant",
      url: baseUrl,
      sameAs: ["https://www.linkedin.com/in/innovatexp/", "https://www.linkedin.com/company/innovatexp"],
    },
    sameAs: ["https://www.linkedin.com/company/innovatexp", "https://www.linkedin.com/in/innovatexp/"],
    knowsAbout: [
      "AI Business Consultancy Hong Kong",
      "Hong Kong AI consultant",
      "SME AI workflow",
      "WhatsApp CRM",
      "SmartSales CRM",
      "EventXP",
      "VisionXP",
      "AI visual-tracking tech demo",
      "paediatric training workflow prototype",
      "Discovery Sprint",
      "SOP optimization",
      "Generative Engine Optimization",
      "AI SEO",
      "GEO",
      "Private AI on-premise",
      "AI CRM",
      "SME AI Automation",
      "AI-augmented Workflow",
      "Business Process Automation",
      "Prompt Engineering",
      "Event Check-in Intelligence",
      "Lead Qualification Automation",
      "Azure OpenAI Implementation",
      "Alibaba Cloud AI Deployment",
      "GCP AI Deployment",
      "AWS AI Deployment",
      "On-Premise AI Deployment",
      "AI adoption for SMEs",
      "SOP 流程優化",
      "AI 商業升級",
      "AI 商業顧問",
      "業務聽診",
      "Business Workflow Diagnosis",
      "先執順流程再落地 AI",
      "AI 陪跑課程",
      "中小企 AI 升級",
      "AI 工作流",
      "香港中小企 AI 顧問",
      "Larry Lo",
    ],
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${baseUrl}/#founder`,
    name: "Larry Lo",
    jobTitle: "AI Business Consultant",
    description: pickSchema(routeLocale, SCHEMA_PERSON_DESCRIPTION),
    url: baseUrl,
    image: `${baseUrl}/mypresent.jpg`,
    sameAs: ["https://www.linkedin.com/in/innovatexp/", "https://www.linkedin.com/company/innovatexp"],
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
            name: "SmartSales CRM - Trial",
          },
          price: "5000",
          priceCurrency: "HKD",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "5000",
            priceCurrency: "HKD",
            unitText: "trial",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "SmartSales CRM - Starter maintenance",
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
            name: "SmartSales CRM - Growth maintenance",
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
      ],
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "HKD",
      lowPrice: "5000",
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

  const visionXPService = {
    "@context": "https://schema.org",
    "@type": ["SoftwareApplication", "Product"],
    "@id": `${baseUrl}/#visionxp`,
    name: "VisionXP",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    inLanguage: ["zh-HK", "en"],
    isAccessibleForFree: true,
    disambiguatingDescription: "Training-workflow demo. Not a medical device and not a substitute for clinical care.",
    description: pickSchema(routeLocale, SCHEMA_VISIONXP_DESCRIPTION),
    featureList: [
      "Parent portal: daily tasks, progress, streaks",
      "Optometrist portal: prescriptions, compliance, reports",
      "Ages 3–12; daily 15–20 minute sessions",
      "Cantonese / English UI",
      "Frontend-only demo; no login; no patient data stored",
    ],
    provider: {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
    },
    url: `${baseUrl}/visionxp`,
    sameAs: [VISIONXP_DEMO_URL],
    offers: {
      "@type": "Offer",
      url: VISIONXP_DEMO_URL,
      price: "0",
      priceCurrency: "HKD",
      description: "Frontend-only public demo. Implementation scoped after Discovery.",
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
            name: "AI Readiness Snapshot",
            description: "Downsell only: 60–90 minute interview, one-page scorecard, 3 blockers, go/no-go for Discovery. No SOP, prototype, or implementation.",
          },
          price: String(PRICING.quickCash.aiReadinessAssessment),
          priceCurrency: "HKD",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "30-day AI Upgrade Discovery Sprint (up to 10 people)",
            description: "HK$6,800 for up to 10 people. Venue cost is extra.",
          },
          price: String(PRICING.consultancy.discoverySprint30Day),
          priceCurrency: "HKD",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Discovery workshop (11–30 people)",
            description: "HK$13,600 for 11–30 people. 31+ quoted separately. Venue cost is extra.",
          },
          price: String(PRICING.consultancy.discoveryWorkshop11To30),
          priceCurrency: "HKD",
        },
      ],
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "HKD",
      lowPrice: String(PRICING.quickCash.aiReadinessAssessment),
      highPrice: String(PRICING.consultancy.discoveryWorkshop11To30),
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
        { "@type": "Offer", itemOffered: { "@type": "SoftwareApplication", name: "VisionXP" } },
      ],
    },
  };

  const scopedServiceSchemas =
    resolvedScope === "home"
      ? [smartSalesCRMService, eventXPService, visionXPService, aiConsultingService]
      : resolvedScope === "smartsales"
        ? [smartSalesCRMService]
        : resolvedScope === "eventxp"
          ? [eventXPService]
          : resolvedScope === "visionxp"
            ? [visionXPService]
            : resolvedScope === "ai-consulting"
              ? [aiConsultingService]
              : resolvedScope === "ai-seo-package"
                ? [aiSeoUpdateService]
                : [];

  /** Product/detail pages expose richer FAQPage JSON-LD locally — avoid duplicate/conflicting FAQ here. */
  const scopedFaqSchemas =
    resolvedScope === "home" ? [homeFaqPageSchema] : resolvedScope === "ai-seo-package" ? [aiSeoUpdateFaqPageSchema] : [];

  const pageUrl = `${baseUrl}/${routeLocale}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`;
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    inLanguage: localeToHtmlLang(routeLocale),
    isPartOf: { "@id": `${baseUrl}/#website` },
    about:
      resolvedScope === "visionxp"
        ? { "@id": `${baseUrl}/#visionxp` }
        : resolvedScope === "eventxp"
          ? { "@id": `${baseUrl}/#eventxp` }
          : resolvedScope === "smartsales"
            ? { "@id": `${baseUrl}/#smartsales-crm` }
            : { "@id": `${baseUrl}/#organization` },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h2", "[data-geo-answer]"],
    },
  };

  const productItemListSchema =
    resolvedScope === "home"
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "InnovateXP products",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "FitnessXP",
              url: `${baseUrl}/${routeLocale}/fitnessxp`,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "SmartSales CRM",
              url: `${baseUrl}/${routeLocale}/smartsales-crm`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: "EventXP",
              url: `${baseUrl}/${routeLocale}/eventxp`,
            },
            {
              "@type": "ListItem",
              position: 4,
              name: "VisionXP",
              url: `${baseUrl}/${routeLocale}/visionxp`,
            },
          ],
        }
      : null;

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
      {productItemListSchema ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productItemListSchema) }} />
      ) : null}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
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
