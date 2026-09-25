"use client";
/* F03: Route-scoped JSON-LD - Injects Organization, Service, FAQ, and page-specific structured data by path. */
import { usePathname } from "next/navigation";
import type { AppLocale } from "@/lib/i18n-routing";
import { getLocaleFromPathname, localeToHtmlLang, localeUsesChineseCopy, stripLocaleFromPathname } from "@/lib/i18n-routing";
import { VISIONXP_DEMO_URL } from "@/content/visionxp";
import { AUTHOR, authorSameAs } from "@/lib/author";
import { PRICING } from "@/content/pricing";

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
  en: "InnovateXP Limited is a Hong Kong AI business consultancy founded by Larry Lo. Signature method: Business Workflow Diagnosis — diagnose first; I will say so if you should not buy a system yet. We help SMEs of 3–30 fix one sales or operations workflow before choosing any system or AI support.",
  "zh-hk":
    "InnovateXP Limited 由 Larry Lo 創立，係香港 AI 商業顧問公司。定位「聽診先——唔使買系統我會直講」。幫 3–30 人中小企先聽清一條收入或營運流程，再決定需唔需要系統或 AI 支援。",
  "zh-tw":
    "InnovateXP Limited 由 Larry Lo 創立，是香港 AI 商業顧問公司。定位「聽診先——唔使買系統我會直講」。協助 3–30 人中小企業先釐清一條收入或營運流程，再決定 AI、CRM 或自動化。流程清楚後可選 SmartSales CRM、EventXP、FitnessXP、VisionXP 示範。",
  ja: "InnovateXP Limited は Larry Lo が創業した香港の AI ビジネスコンサルティング会社です。中小企業が売上・業務の重要フローを先に整え、必要なら AI／CRM／自動化を導入します。料金は診断後に見積。業務が明確になった後、SmartSales CRM、EventXP、VisionXP デモを選べます。",
  de: "InnovateXP Limited ist eine von Larry Lo gegründete AI-Business-Beratung in Hongkong. KMUs reparieren zuerst einen Workflow und führen AI, CRM oder Automation erst danach ein. Honorar nach Diagnose. Nach Workflow-Klarheit optional SmartSales CRM, EventXP und VisionXP-Demo.",
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
  en: "Configurable event and membership operations for Hong Kong organisations — registration, QR/kiosk check-in, member and guest records, live attendance reporting, and post-event follow-up. Configured around your workflow; not generic ticketing.",
  "zh-hk": "按機構流程配置嘅活動暨會員營運方案：報名、QR／kiosk check-in、會員及嘉賓記錄、即時出席報告同活動後跟進。唔係通用售票軟件。",
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
  en: "AI SEO / AEO retainer",
  "zh-hk": "AI SEO／AEO 月費服務",
  "zh-tw": "AI SEO／AEO 月費服務",
  ja: "AI SEO／AEO 月額リテーナー",
  de: "AI-SEO/AEO-Retainer",
};

const SCHEMA_AI_SEO_DESCRIPTION: Record<AppLocale, string> = {
  en: "Diagnosis then retainer: AI Visibility report, monthly schema and answer-first copy, plus citation / brand-impression / enquiry reporting for Hong Kong SMEs. Six-month minimum on retainers.",
  "zh-hk": "先 AI Visibility 診斷，再月費維護結構化資料同 answer-first 文案，並報告 AI 引用、品牌曝光、詢盤。月費最低 6 個月。",
  "zh-tw": "先 AI Visibility 診斷，再月費維護結構化資料與 answer-first 文案，並報告 AI 引用、品牌曝光、詢盤。月費最低 6 個月。",
  ja: "まず AI Visibility 診断、その後リテーナーで schema と answer-first 文を維持し、引用・ブランド露出・問い合わせを報告。リテーナーは最短 6 か月。",
  de: "Zuerst AI-Visibility-Diagnose, dann Retainer für Schema und Answer-first-Texte plus Bericht zu Zitaten, Markenimpressionen und Anfragen. Retainer mindestens 6 Monate.",
};

const SCHEMA_WEBSITE_DESCRIPTION: Record<AppLocale, string> = {
  en: "Hong Kong AI business consultancy for teams of 3–30: Business Workflow Diagnosis, practical implementation, and 0-to-1 co-running.",
  "zh-hk": "香港 AI 商業顧問：為 3–30 人團隊提供業務聽診、實際落地同 0 到 1 陪跑。",
  "zh-tw": "香港 AI 商業顧問：流程診斷、WhatsApp CRM（SmartSales）、EventXP、VisionXP 示範，以及按需私有 AI。",
  ja: "香港の AI ビジネスコンサル：業務診断、WhatsApp CRM（SmartSales）、EventXP、VisionXP デモ、必要に応じてプライベート AI。",
  de: "AI-Business-Beratung Hongkong: Workflow-Diagnose, WhatsApp-CRM (SmartSales), EventXP, VisionXP-Demo und optionale Private AI für KMUs.",
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
    en: "AI SEO / AEO retainer",
    "zh-hk": "AI SEO／AEO 月費",
    "zh-tw": "AI SEO／AEO 月費",
    ja: "AI SEO／AEO リテーナー",
    de: "AI-SEO/AEO-Retainer",
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
      text: "Yes — one path. I am AI Business Consultant Larry Lo / InnovateXP. Business Workflow Diagnosis is the signature method: diagnose → AI agents → co-run — not a business-coach pitch or a SaaS hard sell.",
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
      text: "No. We diagnose first — and I'll say so if you shouldn't buy a system yet. If SOPs and ownership are unclear, automation amplifies chaos. We stabilise SOP nodes before chatbots, reminders, or AI drafts.",
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
      text: "Discovery validates whether a workflow deserves AI/CRM in a short cycle. The 30-day validation pack delivers process map, ownership, SOP, tracking, and one immediate improvement. Both start from Business Workflow Diagnosis; co-run advisory comes later.",
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
      text: "唔會。定位係「聽診先——唔使買系統我會直講」。如果 SOP 未寫清、責任未定，自動化只會放大混亂。先聽診同執 SOP，確認有穩定節點，先談 chatbot、提醒或 AI 草稿。",
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
      text: "Discovery 用短週期驗證一條流程值唔值得加 AI／CRM。30 日驗證包則交付流程圖、責任、SOP、追蹤同一個即時改善點。兩者都由業務聽診起步；之後可進入陪跑。",
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
      text: "唔會。定位係「聽診先——唔使買系統我會直講」。如果 SOP 未寫清、責任未定，自動化只會放大混亂。先聽診同執 SOP，確認有穩定節點，先談 chatbot、提醒或 AI 草稿。",
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
      text: "Discovery 用短週期驗證一條流程值唔值得加 AI／CRM。30 日驗證包則交付流程圖、責任、SOP、追蹤同一個即時改善點。兩者都由業務聽診起步；之後可進入陪跑。",
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
      text: "InnovateXP Limited は Larry Lo が創業した香港の AI ビジネスコンサルティング会社です。中小企業が売上・業務の重要フローを先に整え、必要なら AI／CRM／自動化を導入する支援をします。入口は 30 分の業務診断です。料金は診断後に見積。",
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
      text: "料金はフローの複雑さに応じて診断後に見積ります。最初からシステムを売りません。",
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
      text: "InnovateXP Limited ist eine von Larry Lo gegründete AI-Business-Beratung in Hongkong. KMUs reparieren zuerst einen umsatz- oder betriebsrelevanten Workflow (Ownership, SOP, Follow-up) und führen AI, CRM oder Automation erst danach ein — wenn es gerechtfertigt ist. Einstieg: 30-Tage Honorar nach Diagnose.",
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
      text: "Beratungshonorar wird nach der Diagnose nach Workflow-Komplexität angeboten. Kein Systemverkauf am Anfang.",
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
    name: "How does InnovateXP AI SEO / AEO pricing work?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Start with a HKD 2,800 AI Visibility diagnosis (credited to month 1 if you take a retainer). Lite is HKD 1,800 per month; Growth is HKD 3,800 per month; both 6 months minimum. A one-off full-site AEO rebuild starts at HKD 12,000. Monthly reports track AI citations, brand-keyword impressions, and site enquiries — not a revision count.",
    },
  },
];

const AI_SEO_FAQ_ZH_HK: FaqMainEntity = [
  {
    "@type": "Question",
    name: "InnovateXP AI SEO／AEO 點計費？",
    acceptedAnswer: {
      "@type": "Answer",
      text: "第一步係 HKD 2,800 AI Visibility 診斷（簽 retainer 可全額抵扣首月）。Lite 每月 HKD 1,800、Growth 每月 HKD 3,800，最低約期 6 個月。全站 AEO 重整由 HKD 12,000 起。月報追蹤 AI 引用、品牌關鍵字曝光、網站詢盤，唔用改動次數交差。",
    },
  },
];

const AI_SEO_FAQ_ZH_TW: FaqMainEntity = [
  {
    "@type": "Question",
    name: "InnovateXP AI SEO／AEO 如何計費？",
    acceptedAnswer: {
      "@type": "Answer",
      text: "第一步為 HKD 2,800 AI Visibility 診斷（簽 retainer 可全額抵扣首月）。Lite 每月 HKD 1,800、Growth 每月 HKD 3,800，最低約期 6 個月。全站 AEO 重整由 HKD 12,000 起。月報追蹤 AI 引用、品牌關鍵字曝光、網站詢盤。",
    },
  },
];

const AI_SEO_FAQ_JA: FaqMainEntity = [
  {
    "@type": "Question",
    name: "InnovateXP の AI SEO／AEO の料金は？",
    acceptedAnswer: {
      "@type": "Answer",
      text: "まず HKD 2,800 の AI Visibility 診断（リテーナー契約時は初月に全額充当）。Lite は月額 HKD 1,800、Growth は月額 HKD 3,800、最短 6 か月。サイト全体の AEO 再構築は HKD 12,000 から。月次レポートは引用・ブランド露出・問い合わせを追い、修正回数では測りません。",
    },
  },
];

const AI_SEO_FAQ_DE: FaqMainEntity = [
  {
    "@type": "Question",
    name: "Wie ist die AI-SEO/AEO-Preisstruktur bei InnovateXP?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Zuerst AI-Visibility-Diagnose für HKD 2.800 (voll auf Monat 1 anrechenbar bei Retainer). Lite HKD 1.800/Monat, Growth HKD 3.800/Monat, Mindestlaufzeit 6 Monate. Einmaliger AEO-Relaunch ab HKD 12.000. Monatsberichte: KI-Zitate, Markenimpressionen, Anfragen — keine Revisionszählung.",
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
      sameAs: authorSameAs(),
    },
    sameAs: [AUTHOR.linkedInCompany, AUTHOR.linkedInPersonal],
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
      "聽診先唔使買系統我會直講",
      
      "AI Readiness Snapshot",
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
    sameAs: authorSameAs(),
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
      {
        "@type": "Organization",
        name: "Zomate Fitness Limited",
        url: "https://zoesportdiary.com/",
        sameAs: "https://zoesportdiary.com/",
      },
      {
        "@type": "Organization",
        name: "Flower Nice Day",
        alternateName: "販賣美好",
        url: "https://www.flowerniceday.com",
        sameAs: "https://www.flowerniceday.com",
      },
      {
        "@type": "Organization",
        name: "Dr Steven Cheung Dental Surgery",
        sameAs: "https://www.drstevenchungdentalsurgery.com",
      },
      {
        "@type": "Organization",
        name: "Mentalok",
        sameAs: "https://mentalok.io/zh-TW",
      },
      {
        "@type": "Organization",
        name: "digidumpling",
        sameAs: "https://digidumpling.com",
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
    "@type": "Service",
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
    "@type": "Service",
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
            name: "EventXP - one-event workflow trial",
          },
          price: String(PRICING.quickCash.eventXpTrial),
          priceCurrency: "HKD",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "EventXP - Starter (maintenance)",
          },
          price: String(PRICING.tools.eventXp.maintenanceStarterMonthly),
          priceCurrency: "HKD",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: String(PRICING.tools.eventXp.maintenanceStarterMonthly),
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
          price: String(PRICING.tools.eventXp.maintenanceGrowthMonthly),
          priceCurrency: "HKD",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: String(PRICING.tools.eventXp.maintenanceGrowthMonthly),
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
          price: String(PRICING.tools.eventXp.maintenanceEnterpriseMonthly),
          priceCurrency: "HKD",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: String(PRICING.tools.eventXp.maintenanceEnterpriseMonthly),
            priceCurrency: "HKD",
            unitText: "per month",
          },
        },
      ],
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "HKD",
      lowPrice: String(PRICING.tools.eventXp.maintenanceStarterMonthly),
      highPrice: String(PRICING.quickCash.eventXpTrial),
      offerCount: 4,
    },
  };

  const visionXPService = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
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
  };

  const aiConsultingService = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${baseUrl}/#ai-consulting`,
    serviceType: "AI Business Consultancy",
    name: localeUsesChineseCopy(routeLocale)
      ? "業務聽診 → Discovery → 陪跑（InnovateXP）"
      : "Business Workflow Diagnosis → Discovery → co-run (InnovateXP)",
    description: pickSchema(routeLocale, SCHEMA_CONSULTING_SERVICE_DESCRIPTION),
    url: `${baseUrl}/${routeLocale}/ai-consulting`,
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
      name: localeUsesChineseCopy(routeLocale)
        ? "主線方案（聽診後報價）"
        : "Mainline programmes (quoted after diagnosis)",
      itemListElement: [
        {
          "@type": "Offer",
          "@id": `${baseUrl}/#offer-snapshot`,
          name: "AI Readiness Snapshot",
          price: String(PRICING.quickCash.aiReadinessAssessment),
          priceCurrency: "HKD",
          url: `${baseUrl}/${routeLocale}/services`,
          availability: "https://schema.org/InStock",
          itemOffered: {
            "@type": "Service",
            name: "AI Readiness Snapshot",
            description: localeUsesChineseCopy(routeLocale)
              ? "較細成本先做證據型決定；可升級 Discovery。"
              : "Smaller evidence-based decision before Discovery.",
          },
        },
        {
          "@type": "Offer",
          "@id": `${baseUrl}/#offer-discovery-10`,
          name: "30-day Discovery (up to 10 people)",
          price: String(PRICING.quickCash.aiDiscoverySprint),
          priceCurrency: "HKD",
          url: `${baseUrl}/${routeLocale}/bookme`,
          availability: "https://schema.org/InStock",
          itemOffered: {
            "@type": "Service",
            name: "30-day Discovery validation pack",
            description: localeUsesChineseCopy(routeLocale)
              ? "30 日驗證一條卡住收入／營運嘅流程；10 人或以下公開價 HK$6,800。"
              : "Validate one revenue- or operations-blocking workflow in 30 days; HK$6,800 for teams up to 10.",
          },
        },
        {
          "@type": "Offer",
          "@id": `${baseUrl}/#offer-discovery-30`,
          name: "Discovery workshop (11–30 people)",
          price: String(PRICING.consultancy.discoveryWorkshop11To30),
          priceCurrency: "HKD",
          url: `${baseUrl}/${routeLocale}/bookme`,
          availability: "https://schema.org/InStock",
          itemOffered: {
            "@type": "Service",
            name: "Discovery workshop (11–30 people)",
            description: localeUsesChineseCopy(routeLocale)
              ? "11–30 人團隊 Discovery 工作坊，公開價 HK$13,600。"
              : "Discovery workshop for teams of 11–30, HK$13,600.",
          },
        },
        {
          "@type": "Offer",
          "@id": `${baseUrl}/#offer-automation-trial`,
          name: "14-day automation / workflow trial",
          url: `${baseUrl}/${routeLocale}/automation-packages`,
          availability: "https://schema.org/InStock",
          itemOffered: {
            "@type": "Service",
            name: "14-day automation starter trial",
            description: localeUsesChineseCopy(routeLocale)
              ? "聽診後 14 日流程試用；轉正式可扣部分費用。"
              : "14-day workflow trial after diagnosis; credit toward a formal starter pack.",
          },

        },
      ],
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "HKD",
      lowPrice: String(PRICING.quickCash.aiReadinessAssessment),
      highPrice: String(PRICING.consultancy.discoveryWorkshop11To30),
      description: "Published diagnosis entry prices; deeper implementation is scoped after diagnosis",
      offerCount: 4,
    },
  };

  const aiSeoUpdateService = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${baseUrl}/#ai-seo-update-package`,
    serviceType: "AI SEO and AEO retainer",
    name: pickSchema(routeLocale, SCHEMA_AI_SEO_NAME),
    description: pickSchema(routeLocale, SCHEMA_AI_SEO_DESCRIPTION),
    provider: {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "HKD",
      lowPrice: "1800",
      highPrice: "12000",
      offerCount: 4,
      offers: [
        {
          "@type": "Offer",
          name: "AI Visibility diagnosis",
          price: "2800",
          priceCurrency: "HKD",
          description: "Citation report, 3 quick wins, 12-month AEO roadmap. Credited to month 1 on a 6-month retainer.",
        },
        {
          "@type": "Offer",
          name: "Lite AEO retainer",
          price: "1800",
          priceCurrency: "HKD",
          description: "Monthly schema upkeep, 1–2 core pages, monthly metrics report. 6-month minimum.",
        },
        {
          "@type": "Offer",
          name: "Growth AEO retainer",
          price: "3800",
          priceCurrency: "HKD",
          description: "4–6 monthly updates, AI citation tracking, competitor compare, review call. 6-month minimum.",
        },
        {
          "@type": "Offer",
          name: "Full-site AEO project",
          price: "12000",
          priceCurrency: "HKD",
          description: "One-off full-site AEO rebuild. From HKD 12,000.",
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
      name: "Mainline programmes — quoted after diagnosis",
      itemListElement: [
        {
          "@type": "Offer",
          name: "AI Readiness Snapshot",
          price: String(PRICING.quickCash.aiReadinessAssessment),
          priceCurrency: "HKD",
          itemOffered: { "@type": "Service", name: "AI Readiness Snapshot" },
        },
        {
          "@type": "Offer",
          name: "30-day Discovery (≤10 people)",
          price: String(PRICING.quickCash.aiDiscoverySprint),
          priceCurrency: "HKD",
          itemOffered: { "@type": "Service", name: "30-day Discovery" },
        },
        {
          "@type": "Offer",
          name: "14-day automation trial",
          itemOffered: { "@type": "Service", name: "14-day automation trial" },
        },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "SmartSales CRM" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "EventXP" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "VisionXP demo" } },
      ],
    },
  };

  const scopedServiceSchemas =
    resolvedScope === "home"
      ? [aiConsultingService]
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

  const breadcrumbSchema = buildBreadcrumbJsonLd(pathname || "/", baseUrl, routeLocale);
  const diagnosisMethodSchema =
    resolvedScope === "home"
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: localeUsesChineseCopy(routeLocale)
            ? "InnovateXP 業務聽診方法"
            : "InnovateXP Business Workflow Diagnosis method",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: localeUsesChineseCopy(routeLocale) ? "業務聽診" : "Business Workflow Diagnosis",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: localeUsesChineseCopy(routeLocale) ? "實用支援落地" : "Practical implementation",
            },
            {
              "@type": "ListItem",
              position: 3,
              name: localeUsesChineseCopy(routeLocale) ? "由 0 到 1 陪跑" : "0-to-1 co-running",
            },
          ],
        }
      : null;

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
      {diagnosisMethodSchema ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(diagnosisMethodSchema) }} />
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
