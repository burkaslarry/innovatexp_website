import type { AppLocale } from "@/lib/i18n-routing";
import { localeUsesChineseCopy } from "@/lib/i18n-routing";
import { PRICING, formatHkd } from "@/content/pricing";

export type QuestionOption = { id: string; label: string };
export type QuestionField = {
  id: string;
  label: string;
  type: "single" | "multi" | "text" | "email" | "tel";
  required?: boolean;
  maxSelect?: number;
  options?: QuestionOption[];
  placeholder?: string;
};

type LocaleBlock = {
  eyebrow: string;
  title: string;
  intro: string;
  privacy: string;
  sectionA: string;
  sectionB: string;
  sectionC: string;
  sectionD: string;
  next: string;
  back: string;
  submit: string;
  sending: string;
  successTitle: string;
  successBody: string;
  highIntentBody: string;
  bookCta: string;
  whatsappCta: string;
  requiredError: string;
  failError: string;
  pricingEyebrow: string;
  pricingTitle: string;
  pricingIntro: string;
  pricingCards: { name: string; price: string; note: string }[];
  consent: string;
  questions: QuestionField[];
};

function zhConsultation(): LocaleBlock {
  return {
    eyebrow: "AI Consultation Questionnaire",
    title: "3 分鐘 AI 流程健康檢查",
    intro:
      "想用 AI 改善公司營運，但唔知道應該由邊度開始？回答以下問題，我哋會初步判斷邊個流程最值得優先改善，以及下一步應該梳理流程、試用 AI，定係考慮 CRM／自動化。",
    privacy:
      "請勿輸入客戶名單、財務明細或敏感營運資料。呢份問卷只作初步了解，不構成任何保證或專業意見。",
    sectionA: "A. 基本資料",
    sectionB: "B. 流程痛點",
    sectionC: "C. AI／系統準備度",
    sectionD: "D. 下一步及聯絡",
    next: "下一頁",
    back: "上一頁",
    submit: "提交問卷",
    sending: "提交中…",
    successTitle: "多謝完成流程健康檢查",
    successBody:
      "你嘅答案顯示，下一步未必係立即買新系統，而係先揀出一個最影響效率或客戶跟進嘅流程，梳理現況、定 KPI，再試行一個 AI quick win。",
    highIntentBody:
      "你適合優先做一次流程診斷。我哋會聚焦一個最痛嘅 workflow，先了解現況，再判斷 AI、CRM 或自動化有冇實際價值。",
    bookCta: "預約 30 分鐘流程診斷",
    whatsappCta: "WhatsApp 聯絡 Larry",
    requiredError: "請完成必填題目再繼續。",
    failError: "暫時未能送出，請改用 WhatsApp 或直接預約。",
    pricingEyebrow: "相關定價",
    pricingTitle: "由免費診斷開始，再決定試用或陪跑",
    pricingIntro: "問卷免費。有興趣落地時，可按以下公開價起步（HKD）。",
    pricingCards: [
      {
        name: "30 分鐘流程診斷",
        price: "免費",
        note: "揀最值得先改善嘅 workflow",
      },
      {
        name: "AI 準備度評估",
        price: formatHkd(PRICING.quickCash.aiReadinessAssessment, "zh-hk"),
        note: "快速診斷 + 優先排序清單",
      },
      {
        name: "AI Discovery Sprint",
        price: formatHkd(PRICING.quickCash.aiDiscoverySprint, "zh-hk"),
        note: "1–2 週：map、KPI、固定實施報價",
      },
      {
        name: "Accounting Chatbot 試用",
        price: `${formatHkd(PRICING.quickCash.accountingChatbotTrialWeek, "zh-hk")}/星期`,
        note: `或 ${formatHkd(PRICING.quickCash.accountingChatbotTrialMonth, "zh-hk")}/月`,
      },
    ],
    consent:
      "我同意 InnovateXP 使用以上資料聯絡我，提供流程診斷及相關服務資訊。我明白此問卷只作初步了解。",
    questions: [
      {
        id: "industry",
        label: "你公司屬於邊個行業？",
        type: "single",
        required: true,
        options: [
          { id: "edu", label: "教育／培訓／課程" },
          { id: "pro", label: "專業服務／顧問" },
          { id: "retail", label: "零售／電商" },
          { id: "health", label: "餐飲／美容／健康服務" },
          { id: "event", label: "活動／社群／會員制業務" },
          { id: "field", label: "工程／物業／現場服務" },
          { id: "other", label: "其他" },
        ],
      },
      {
        id: "role",
        label: "你嘅職位係？",
        type: "single",
        required: true,
        options: [
          { id: "founder", label: "創辦人／老闆" },
          { id: "mgmt", label: "管理層" },
          { id: "ops", label: "營運／行政負責人" },
          { id: "sales", label: "Sales／Marketing 負責人" },
          { id: "it", label: "IT／數碼轉型負責人" },
          { id: "other", label: "其他" },
        ],
      },
      {
        id: "teamSize",
        label: "公司大約有幾多位同事？",
        type: "single",
        required: true,
        options: [
          { id: "1-2", label: "1–2 人" },
          { id: "3-10", label: "3–10 人" },
          { id: "11-30", label: "11–30 人" },
          { id: "31-100", label: "31–100 人" },
          { id: "100+", label: "100 人以上" },
        ],
      },
      {
        id: "workflows",
        label: "你最想改善邊一類工作流程？（最多 3 項）",
        type: "multi",
        required: true,
        maxSelect: 3,
        options: [
          { id: "wa", label: "WhatsApp／電話／網站查詢跟進" },
          { id: "sales", label: "Sales pipeline／報價／客戶跟進" },
          { id: "course", label: "課程／活動報名、付款及出席" },
          { id: "crm", label: "客戶資料／CRM 管理" },
          { id: "finance", label: "收據、付款、報銷或財務行政" },
          { id: "hr", label: "HR、假期、內部申請或文件管理" },
          { id: "sop", label: "內部 SOP、交接及工作分配" },
          { id: "web", label: "公司網站／網上形象" },
          { id: "other", label: "其他" },
        ],
      },
      {
        id: "painPoints",
        label: "呢個流程而家最大嘅問題係咩？",
        type: "multi",
        required: true,
        options: [
          { id: "scatter", label: "資料散落 WhatsApp、Excel、Email、表單" },
          { id: "reentry", label: "要人手重複輸入資料" },
          { id: "miss", label: "容易漏跟進、漏客或漏單" },
          { id: "slow", label: "回覆客戶太慢" },
          { id: "keyperson", label: "流程好依賴某位同事／老闆" },
          { id: "handoff", label: "同事之間交接困難" },
          { id: "novis", label: "睇唔到進度或數據" },
          { id: "tool", label: "已經買咗工具，但團隊用得唔順" },
        ],
      },
      {
        id: "weeklyHours",
        label: "呢個問題每星期大約令團隊花幾多時間處理？",
        type: "single",
        required: true,
        options: [
          { id: "<2", label: "少於 2 小時" },
          { id: "2-5", label: "2–5 小時" },
          { id: "6-10", label: "6–10 小時" },
          { id: "11-20", label: "11–20 小時" },
          { id: "20+", label: "20 小時以上" },
          { id: "unknown", label: "未能估計" },
        ],
      },
      {
        id: "keyPersonRisk",
        label: "如果關鍵同事請假或離職，呢個流程會唔會受影響？",
        type: "single",
        required: true,
        options: [
          { id: "none", label: "幾乎冇影響" },
          { id: "low", label: "有少量影響" },
          { id: "high", label: "影響明顯" },
          { id: "stop", label: "流程可能會停" },
          { id: "unsure", label: "唔肯定" },
        ],
      },
      {
        id: "currentTools",
        label: "你而家有冇使用 AI、CRM 或自動化工具？",
        type: "single",
        required: true,
        options: [
          { id: "none", label: "未開始使用" },
          { id: "chat", label: "有用 ChatGPT／Claude 等，但未融入流程" },
          { id: "sheets", label: "有用 Excel、Google Form、Notion 等" },
          { id: "crm_low", label: "已有 CRM／自動化，但團隊未用得順" },
          { id: "mature", label: "已有成熟系統，想再優化" },
        ],
      },
      {
        id: "outcomes",
        label: "你最想改善嘅結果係咩？（最多 2 項）",
        type: "multi",
        required: true,
        maxSelect: 2,
        options: [
          { id: "faster", label: "更快回覆客戶" },
          { id: "admin", label: "減少重複行政工作" },
          { id: "leaks", label: "減少漏單／漏跟進" },
          { id: "keyperson", label: "令流程唔再依賴某一位同事" },
          { id: "kpi", label: "更清楚睇到業務進度及 KPI" },
          { id: "convert", label: "提升報名、預約或成交率" },
          { id: "ai", label: "令團隊更容易使用 AI" },
        ],
      },
      {
        id: "urgency",
        label: "你希望幾時開始改善？",
        type: "single",
        required: true,
        options: [
          { id: "1m", label: "1 個月內" },
          { id: "1-3m", label: "1–3 個月內" },
          { id: "3-6m", label: "3–6 個月內" },
          { id: "explore", label: "暫時只想了解" },
        ],
      },
      {
        id: "interest",
        label: "如果有一個 30 分鐘流程診斷，你有冇興趣？",
        type: "single",
        required: true,
        options: [
          { id: "book", label: "有興趣，想預約" },
          { id: "learn", label: "可以先了解" },
          { id: "no", label: "暫時未需要" },
        ],
      },
      {
        id: "name",
        label: "姓名",
        type: "text",
        required: true,
        placeholder: "你的稱呼",
      },
      {
        id: "company",
        label: "公司名稱",
        type: "text",
        required: true,
        placeholder: "公司／機構",
      },
      {
        id: "email",
        label: "電郵",
        type: "email",
        required: true,
        placeholder: "you@company.com",
      },
      {
        id: "phone",
        label: "WhatsApp 電話（選填）",
        type: "tel",
        required: false,
        placeholder: "+852…",
      },
      {
        id: "website",
        label: "公司網站／LinkedIn（選填）",
        type: "text",
        required: false,
        placeholder: "https://…",
      },
    ],
  };
}

function enConsultation(): LocaleBlock {
  return {
    eyebrow: "AI Consultation Questionnaire",
    title: "3-minute AI workflow health check",
    intro:
      "Want AI to improve operations but unsure where to start? Answer a few questions so we can spot the highest-value workflow and whether you should map process first, trial AI, or consider CRM / automation.",
    privacy:
      "Do not enter customer lists, financial details, or sensitive operational data. This form is for initial triage only and is not professional advice.",
    sectionA: "A. Basics",
    sectionB: "B. Workflow pain",
    sectionC: "C. AI / systems readiness",
    sectionD: "D. Next step & contact",
    next: "Next",
    back: "Back",
    submit: "Submit",
    sending: "Submitting…",
    successTitle: "Thanks for completing the health check",
    successBody:
      "Your answers suggest the next step may not be buying a new system yet—pick one workflow that hurts efficiency or follow-up most, clarify it, set KPIs, then trial one AI quick win.",
    highIntentBody:
      "You look ready for a workflow diagnosis. We will focus on one painful process, understand the current state, then decide whether AI, CRM, or automation has real value.",
    bookCta: "Book a 30-minute workflow review",
    whatsappCta: "WhatsApp Larry",
    requiredError: "Please complete required questions before continuing.",
    failError: "Could not submit right now. Please WhatsApp us or book directly.",
    pricingEyebrow: "Related pricing",
    pricingTitle: "Start free, then choose trial or advisory",
    pricingIntro: "The questionnaire is free. Public HKD starting prices if you want to go further:",
    pricingCards: [
      { name: "30-min workflow review", price: "Free", note: "Pick the first workflow worth fixing" },
      {
        name: "AI readiness assessment",
        price: formatHkd(PRICING.quickCash.aiReadinessAssessment, "en"),
        note: "Fast diagnosis + prioritized list",
      },
      {
        name: "AI Discovery Sprint",
        price: formatHkd(PRICING.quickCash.aiDiscoverySprint, "en"),
        note: "1–2 weeks: map, KPIs, fixed implementation quote",
      },
      {
        name: "Accounting Chatbot trial",
        price: `${formatHkd(PRICING.quickCash.accountingChatbotTrialWeek, "en")}/week`,
        note: `or ${formatHkd(PRICING.quickCash.accountingChatbotTrialMonth, "en")}/month`,
      },
    ],
    consent:
      "I agree that InnovateXP may use these details to contact me about a workflow diagnosis and related services. This questionnaire is for initial understanding only.",
    questions: [
      {
        id: "industry",
        label: "Which industry best describes your company?",
        type: "single",
        required: true,
        options: [
          { id: "edu", label: "Education / training / courses" },
          { id: "pro", label: "Professional services / consulting" },
          { id: "retail", label: "Retail / e-commerce" },
          { id: "health", label: "F&B / beauty / health services" },
          { id: "event", label: "Events / community / membership" },
          { id: "field", label: "Engineering / property / field service" },
          { id: "other", label: "Other" },
        ],
      },
      {
        id: "role",
        label: "What is your role?",
        type: "single",
        required: true,
        options: [
          { id: "founder", label: "Founder / owner" },
          { id: "mgmt", label: "Management" },
          { id: "ops", label: "Ops / admin lead" },
          { id: "sales", label: "Sales / marketing lead" },
          { id: "it", label: "IT / digital transformation" },
          { id: "other", label: "Other" },
        ],
      },
      {
        id: "teamSize",
        label: "Approximate team size?",
        type: "single",
        required: true,
        options: [
          { id: "1-2", label: "1–2 people" },
          { id: "3-10", label: "3–10 people" },
          { id: "11-30", label: "11–30 people" },
          { id: "31-100", label: "31–100 people" },
          { id: "100+", label: "100+ people" },
        ],
      },
      {
        id: "workflows",
        label: "Which workflows do you most want to improve? (max 3)",
        type: "multi",
        required: true,
        maxSelect: 3,
        options: [
          { id: "wa", label: "WhatsApp / phone / website enquiry follow-up" },
          { id: "sales", label: "Sales pipeline / quotes / client follow-up" },
          { id: "course", label: "Course / event enrolment, payment, attendance" },
          { id: "crm", label: "Customer data / CRM" },
          { id: "finance", label: "Receipts, payments, expense / finance admin" },
          { id: "hr", label: "HR, leave, internal requests, documents" },
          { id: "sop", label: "Internal SOP, handoffs, work allocation" },
          { id: "web", label: "Company website / online presence" },
          { id: "other", label: "Other" },
        ],
      },
      {
        id: "painPoints",
        label: "What is the biggest problem in this workflow?",
        type: "multi",
        required: true,
        options: [
          { id: "scatter", label: "Data scattered across WhatsApp, Excel, email, forms" },
          { id: "reentry", label: "Manual re-entry of the same data" },
          { id: "miss", label: "Missed follow-ups / lost leads" },
          { id: "slow", label: "Slow customer replies" },
          { id: "keyperson", label: "Depends heavily on one person / owner" },
          { id: "handoff", label: "Difficult handoffs between teammates" },
          { id: "novis", label: "No clear progress or KPI visibility" },
          { id: "tool", label: "Bought tools, but the team does not use them well" },
        ],
      },
      {
        id: "weeklyHours",
        label: "How many hours per week does this cost the team?",
        type: "single",
        required: true,
        options: [
          { id: "<2", label: "Under 2 hours" },
          { id: "2-5", label: "2–5 hours" },
          { id: "6-10", label: "6–10 hours" },
          { id: "11-20", label: "11–20 hours" },
          { id: "20+", label: "20+ hours" },
          { id: "unknown", label: "Not sure" },
        ],
      },
      {
        id: "keyPersonRisk",
        label: "If a key person is away, how much does this workflow suffer?",
        type: "single",
        required: true,
        options: [
          { id: "none", label: "Almost no impact" },
          { id: "low", label: "Minor impact" },
          { id: "high", label: "Clear impact" },
          { id: "stop", label: "It may stop" },
          { id: "unsure", label: "Not sure" },
        ],
      },
      {
        id: "currentTools",
        label: "Do you currently use AI, CRM, or automation?",
        type: "single",
        required: true,
        options: [
          { id: "none", label: "Not yet" },
          { id: "chat", label: "ChatGPT / Claude etc., but not in the workflow" },
          { id: "sheets", label: "Excel, Google Forms, Notion, etc." },
          { id: "crm_low", label: "Have CRM / automation, but adoption is weak" },
          { id: "mature", label: "Mature systems; want further optimization" },
        ],
      },
      {
        id: "outcomes",
        label: "Which outcomes matter most? (max 2)",
        type: "multi",
        required: true,
        maxSelect: 2,
        options: [
          { id: "faster", label: "Faster customer replies" },
          { id: "admin", label: "Less repetitive admin" },
          { id: "leaks", label: "Fewer missed leads / follow-ups" },
          { id: "keyperson", label: "Less dependence on one person" },
          { id: "kpi", label: "Clearer business progress & KPIs" },
          { id: "convert", label: "Higher enrolment / booking / close rate" },
          { id: "ai", label: "Easier AI adoption for the team" },
        ],
      },
      {
        id: "urgency",
        label: "When do you want to start improving?",
        type: "single",
        required: true,
        options: [
          { id: "1m", label: "Within 1 month" },
          { id: "1-3m", label: "Within 1–3 months" },
          { id: "3-6m", label: "Within 3–6 months" },
          { id: "explore", label: "Just exploring for now" },
        ],
      },
      {
        id: "interest",
        label: "Interested in a free 30-minute workflow diagnosis?",
        type: "single",
        required: true,
        options: [
          { id: "book", label: "Yes — want to book" },
          { id: "learn", label: "Maybe — learn more first" },
          { id: "no", label: "Not needed right now" },
        ],
      },
      { id: "name", label: "Name", type: "text", required: true, placeholder: "Your name" },
      { id: "company", label: "Company", type: "text", required: true, placeholder: "Company / org" },
      { id: "email", label: "Email", type: "email", required: true, placeholder: "you@company.com" },
      { id: "phone", label: "WhatsApp (optional)", type: "tel", required: false, placeholder: "+…" },
      {
        id: "website",
        label: "Website / LinkedIn (optional)",
        type: "text",
        required: false,
        placeholder: "https://…",
      },
    ],
  };
}

export function getConsultationCopy(locale: AppLocale): LocaleBlock {
  if (localeUsesChineseCopy(locale)) return zhConsultation();
  return enConsultation();
}

export function isHighIntent(answers: Record<string, string | string[]>): boolean {
  const urgency = answers.urgency;
  const interest = answers.interest;
  return urgency === "1m" && interest === "book";
}
