import type { AppLocale } from "@/lib/i18n-routing";
import { localeUsesChineseCopy } from "@/lib/i18n-routing";
import type { QuestionField } from "@/content/questionnaires/consultation";

type FeedbackCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  privacy: string;
  next: string;
  back: string;
  submit: string;
  sending: string;
  successTitle: string;
  successBody: string;
  requiredError: string;
  failError: string;
  consent: string;
  questions: QuestionField[];
};

function zh(): FeedbackCopy {
  return {
    eyebrow: "AI Feedback Questionnaire",
    title: "服務後 Feedback（約 2 分鐘）",
    intro:
      "多謝你使用 InnovateXP 服務。呢份問卷幫助我哋了解滿意度、前後差異，同埋你是否願意以匿名方式分享案例。唔會連結去預約頁。",
    privacy: "請勿填寫客戶敏感資料。答案只用作服務改善同（如你同意）匿名案例。",
    next: "下一頁",
    back: "上一頁",
    submit: "提交 Feedback",
    sending: "提交中…",
    successTitle: "多謝你嘅 Feedback",
    successBody: "我哋已收到你的意見。填好 Feedback 可作為日後回購／升級折扣參考（按當次活動條款）。",
    requiredError: "請完成必填題目再繼續。",
    failError: "暫時未能送出，請稍後再試或 WhatsApp 我哋。",
    consent: "我同意 InnovateXP 使用以上 Feedback 改善服務；如我勾選授權，可用於匿名案例分享。",
    questions: [
      {
        id: "service",
        label: "你今次接受嘅服務／試用係？",
        type: "single",
        required: true,
        options: [
          { id: "sprint", label: "Discovery Sprint／流程診斷" },
          { id: "advisory", label: "AI 陪跑／顧問計劃" },
          { id: "eventxp", label: "EventXP 試用" },
          { id: "smartsales", label: "SmartSales CRM 試用" },
          { id: "accounting", label: "Accounting Chatbot 試用" },
          { id: "training", label: "Prompt／AI 培訓" },
          { id: "web", label: "客製網站" },
          { id: "other", label: "其他" },
        ],
      },
      {
        id: "satisfaction",
        label: "整體滿意度？",
        type: "single",
        required: true,
        options: [
          { id: "5", label: "5 — 非常滿意" },
          { id: "4", label: "4 — 滿意" },
          { id: "3", label: "3 — 一般" },
          { id: "2", label: "2 — 不太滿意" },
          { id: "1", label: "1 — 唔滿意" },
        ],
      },
      {
        id: "beforeAfter",
        label: "對比服務前，而家流程／跟進有咩變化？",
        type: "single",
        required: true,
        options: [
          { id: "big", label: "明顯改善（更快／少漏／更清楚）" },
          { id: "some", label: "有少少改善" },
          { id: "same", label: "暫時未見到分別" },
          { id: "worse", label: "變差／更混亂" },
          { id: "early", label: "仍太早判斷" },
        ],
      },
      {
        id: "worked",
        label: "邊部分最有幫助？（最多 2 項）",
        type: "multi",
        required: true,
        maxSelect: 2,
        options: [
          { id: "map", label: "流程／SOP 梳理" },
          { id: "kpi", label: "KPI／可見度" },
          { id: "ai", label: "AI quick win／工具設定" },
          { id: "train", label: "團隊培訓／採用" },
          { id: "support", label: "顧問陪跑／溝通" },
          { id: "other", label: "其他" },
        ],
      },
      {
        id: "improve",
        label: "有咩可以改善？",
        type: "text",
        required: true,
        placeholder: "例如：節奏、交付物、溝通、工具…",
      },
      {
        id: "recommend",
        label: "會唔會介紹俾其他老闆／朋友？",
        type: "single",
        required: true,
        options: [
          { id: "yes", label: "會" },
          { id: "maybe", label: "可能會" },
          { id: "no", label: "暫時唔會" },
        ],
      },
      {
        id: "caseStudy",
        label: "可唔可以以匿名方式用你嘅案例（行業／改善方向）？",
        type: "single",
        required: true,
        options: [
          { id: "yes", label: "可以（匿名）" },
          { id: "name_ok", label: "可以，公司名亦 OK" },
          { id: "no", label: "唔可以" },
        ],
      },
      {
        id: "name",
        label: "稱呼（選填，方便對應服務紀錄）",
        type: "text",
        required: false,
        placeholder: "姓名",
      },
      {
        id: "email",
        label: "電郵（選填）",
        type: "email",
        required: false,
        placeholder: "you@company.com",
      },
      {
        id: "discountNote",
        label: "有冇其他想講？",
        type: "text",
        required: false,
        placeholder: "選填",
      },
    ],
  };
}

function en(): FeedbackCopy {
  return {
    eyebrow: "AI Feedback Questionnaire",
    title: "Post-service feedback (~2 minutes)",
    intro:
      "Thanks for working with InnovateXP. This form captures satisfaction, before/after change, and optional anonymous case permission. It does not link to booking.",
    privacy: "Do not enter sensitive client data. Answers improve our service and (if you allow) anonymous case sharing.",
    next: "Next",
    back: "Back",
    submit: "Submit feedback",
    sending: "Submitting…",
    successTitle: "Thanks for your feedback",
    successBody:
      "We received your responses. Completing feedback may qualify for a future return/upgrade discount per campaign terms.",
    requiredError: "Please complete required questions before continuing.",
    failError: "Could not submit right now. Please try again later or WhatsApp us.",
    consent:
      "I agree InnovateXP may use this feedback to improve services; if I authorize case use, it may be shared anonymously (or named if I chose that).",
    questions: [
      {
        id: "service",
        label: "Which service / trial did you receive?",
        type: "single",
        required: true,
        options: [
          { id: "sprint", label: "Discovery Sprint / workflow diagnosis" },
          { id: "advisory", label: "AI advisory / coaching program" },
          { id: "eventxp", label: "EventXP trial" },
          { id: "smartsales", label: "SmartSales CRM trial" },
          { id: "accounting", label: "Accounting Chatbot trial" },
          { id: "training", label: "Prompt / AI training" },
          { id: "web", label: "Custom website" },
          { id: "other", label: "Other" },
        ],
      },
      {
        id: "satisfaction",
        label: "Overall satisfaction?",
        type: "single",
        required: true,
        options: [
          { id: "5", label: "5 — Excellent" },
          { id: "4", label: "4 — Good" },
          { id: "3", label: "3 — OK" },
          { id: "2", label: "2 — Poor" },
          { id: "1", label: "1 — Unsatisfied" },
        ],
      },
      {
        id: "beforeAfter",
        label: "Compared with before, how did workflow / follow-up change?",
        type: "single",
        required: true,
        options: [
          { id: "big", label: "Clear improvement (faster / fewer misses / clearer)" },
          { id: "some", label: "Some improvement" },
          { id: "same", label: "No clear difference yet" },
          { id: "worse", label: "Worse / more chaotic" },
          { id: "early", label: "Too early to tell" },
        ],
      },
      {
        id: "worked",
        label: "What helped most? (max 2)",
        type: "multi",
        required: true,
        maxSelect: 2,
        options: [
          { id: "map", label: "Workflow / SOP mapping" },
          { id: "kpi", label: "KPI / visibility" },
          { id: "ai", label: "AI quick win / tool setup" },
          { id: "train", label: "Team training / adoption" },
          { id: "support", label: "Advisory support / communication" },
          { id: "other", label: "Other" },
        ],
      },
      {
        id: "improve",
        label: "What should we improve?",
        type: "text",
        required: true,
        placeholder: "Pace, deliverables, communication, tools…",
      },
      {
        id: "recommend",
        label: "Would you introduce us to other owners / friends?",
        type: "single",
        required: true,
        options: [
          { id: "yes", label: "Yes" },
          { id: "maybe", label: "Maybe" },
          { id: "no", label: "Not for now" },
        ],
      },
      {
        id: "caseStudy",
        label: "May we share an anonymous case (industry / improvement angle)?",
        type: "single",
        required: true,
        options: [
          { id: "yes", label: "Yes — anonymous" },
          { id: "name_ok", label: "Yes — company name OK" },
          { id: "no", label: "No" },
        ],
      },
      {
        id: "name",
        label: "Name (optional — to match service record)",
        type: "text",
        required: false,
        placeholder: "Name",
      },
      {
        id: "email",
        label: "Email (optional)",
        type: "email",
        required: false,
        placeholder: "you@company.com",
      },
      {
        id: "discountNote",
        label: "Anything else?",
        type: "text",
        required: false,
        placeholder: "Optional",
      },
    ],
  };
}

export function getFeedbackCopy(locale: AppLocale): FeedbackCopy {
  if (localeUsesChineseCopy(locale)) return zh();
  return en();
}
