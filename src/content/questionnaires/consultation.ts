import type { AppLocale } from "@/lib/i18n-routing";
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

type QCopy = {
  industry: string;
  role: string;
  teamSize: string;
  workflows: string;
  painPoints: string;
  weeklyHours: string;
  keyPersonRisk: string;
  currentTools: string;
  outcomes: string;
  urgency: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  industryOpts: Record<string, string>;
  roleOpts: Record<string, string>;
  teamSizeOpts: Record<string, string>;
  workflowsOpts: Record<string, string>;
  painPointsOpts: Record<string, string>;
  weeklyHoursOpts: Record<string, string>;
  keyPersonRiskOpts: Record<string, string>;
  currentToolsOpts: Record<string, string>;
  outcomesOpts: Record<string, string>;
  urgencyOpts: Record<string, string>;
  namePh: string;
  companyPh: string;
  emailPh: string;
  phonePh: string;
  websitePh: string;
};

const INDUSTRY_IDS = ["edu", "pro", "retail", "health", "event", "field", "other"] as const;
const ROLE_IDS = ["owner", "manager", "ops", "other"] as const;
const TEAM_SIZE_IDS = ["1-5", "6-15", "16-30", "30+"] as const;
const WORKFLOW_IDS = ["enquiries", "bookings", "payments", "reporting", "scheduling", "other"] as const;
const PAIN_IDS = ["manual", "missed", "unclear", "norecord", "other"] as const;
const HOURS_IDS = ["lt3", "3-8", "8-15", "15+"] as const;
const KEY_PERSON_IDS = ["stop", "slower", "minor"] as const;
const TOOL_IDS = ["wa-business", "workbuddy", "respondio", "crm", "sheets", "notion", "none", "other"] as const;
const OUTCOME_IDS = ["time", "leads", "handover", "visibility", "cost"] as const;
const URGENCY_IDS = ["now", "1m", "3m", "unsure"] as const;

function opts(ids: readonly string[], map: Record<string, string>): QuestionOption[] {
  return ids.map((id) => ({ id, label: map[id] }));
}

function buildQuestions(q: QCopy): QuestionField[] {
  return [
    {
      id: "industry",
      label: q.industry,
      type: "single",
      required: true,
      options: opts(INDUSTRY_IDS, q.industryOpts),
    },
    {
      id: "role",
      label: q.role,
      type: "single",
      required: true,
      options: opts(ROLE_IDS, q.roleOpts),
    },
    {
      id: "teamSize",
      label: q.teamSize,
      type: "single",
      required: true,
      options: opts(TEAM_SIZE_IDS, q.teamSizeOpts),
    },
    {
      id: "workflows",
      label: q.workflows,
      type: "multi",
      required: true,
      maxSelect: 3,
      options: opts(WORKFLOW_IDS, q.workflowsOpts),
    },
    {
      id: "painPoints",
      label: q.painPoints,
      type: "single",
      required: true,
      options: opts(PAIN_IDS, q.painPointsOpts),
    },
    {
      id: "weeklyHours",
      label: q.weeklyHours,
      type: "single",
      required: true,
      options: opts(HOURS_IDS, q.weeklyHoursOpts),
    },
    {
      id: "keyPersonRisk",
      label: q.keyPersonRisk,
      type: "single",
      required: true,
      options: opts(KEY_PERSON_IDS, q.keyPersonRiskOpts),
    },
    {
      id: "currentTools",
      label: q.currentTools,
      type: "single",
      required: true,
      options: opts(TOOL_IDS, q.currentToolsOpts),
    },
    {
      id: "outcomes",
      label: q.outcomes,
      type: "single",
      required: true,
      options: opts(OUTCOME_IDS, q.outcomesOpts),
    },
    {
      id: "urgency",
      label: q.urgency,
      type: "single",
      required: true,
      options: opts(URGENCY_IDS, q.urgencyOpts),
    },
    {
      id: "name",
      label: q.name,
      type: "text",
      required: true,
      placeholder: q.namePh,
    },
    {
      id: "company",
      label: q.company,
      type: "text",
      required: true,
      placeholder: q.companyPh,
    },
    {
      id: "email",
      label: q.email,
      type: "email",
      required: true,
      placeholder: q.emailPh,
    },
    {
      id: "phone",
      label: q.phone,
      type: "tel",
      required: false,
      placeholder: q.phonePh,
    },
    {
      id: "website",
      label: q.website,
      type: "text",
      required: false,
      placeholder: q.websitePh,
    },
  ];
}

function pricingCards(locale: AppLocale) {
  const zh = locale === "zh-hk" || locale === "zh-tw";
  return [
    {
      name: zh ? "30 分鐘流程診斷" : locale === "ja" ? "30分ワークフロー診断" : locale === "de" ? "30-Min. Workflow-Review" : "30-min workflow review",
      price: zh ? "免費" : locale === "ja" ? "無料" : locale === "de" ? "Kostenlos" : "Free",
      note: zh
        ? "揀最值得先改善嘅 workflow"
        : locale === "ja"
          ? "まず改善すべきワークフローを選ぶ"
          : locale === "de"
            ? "Den ersten Workflow zum Verbessern auswählen"
            : "Pick the first workflow worth fixing",
    },
    {
      name: zh ? "AI 準備度評估" : locale === "ja" ? "AI Readiness Assessment" : locale === "de" ? "AI Readiness Assessment" : "AI readiness assessment",
      price: "",
      note: zh
        ? "快速診斷 + 優先排序清單"
        : locale === "ja"
          ? "迅速診断 + 優先順位リスト"
          : locale === "de"
            ? "Schnelle Diagnose + priorisierte Liste"
            : "Fast diagnosis + prioritized list",
    },
    {
      name: "AI Discovery Sprint",
      price: formatHkd(PRICING.quickCash.aiDiscoverySprint, locale === "zh-hk" || locale === "zh-tw" ? "zh-hk" : "en"),
      note: zh
        ? "1–2 週：map、KPI、固定實施報價"
        : locale === "ja"
          ? "1–2週：マップ、KPI、固定実装見積"
          : locale === "de"
            ? "1–2 Wochen: Map, KPIs, festes Implementierungsangebot"
            : "1–2 weeks: map, KPIs, fixed implementation quote",
    },
    {
      name: zh ? "AccountXP 體驗方案" : "AccountXP experience",
      price: formatHkd(PRICING.quickCash.accountXpExperience, locale === "zh-hk" || locale === "zh-tw" ? "zh-hk" : "en"),
      note: zh
        ? "收據 pilot + 首月使用；維護 480 / 680 / 1,080"
        : locale === "ja"
          ? "レシート pilot + 初月利用；保守 480 / 680 / 1,080"
          : locale === "de"
            ? "Beleg-Pilot + erster Monat; Wartung 480 / 680 / 1,080"
            : "Receipt pilot + first month; maintenance 480 / 680 / 1,080",
    },
    {
      name: "Website Starter",
      price: formatHkd(PRICING.quickCash.websiteStarter, locale === "zh-hk" || locale === "zh-tw" ? "zh-hk" : "en"),
      note: zh
        ? "1 Landing + Mobile + WhatsApp/Booking + SEO（10 工作日）"
        : locale === "ja"
          ? "1 LP + モバイル + WhatsApp/予約 + SEO（10営業日）"
          : locale === "de"
            ? "1 Landing + Mobile + WhatsApp/Booking + SEO (10 Werktage)"
            : "1 landing + mobile + WhatsApp/Booking + SEO (10 working days)",
    },
  ];
}

function shell(locale: AppLocale, q: QCopy, overrides: Partial<LocaleBlock>): LocaleBlock {
  const zhHk = locale === "zh-hk";
  const zhTw = locale === "zh-tw";
  const ja = locale === "ja";
  const de = locale === "de";

  const defaults: LocaleBlock = {
    eyebrow: "AI Consultation Questionnaire",
    title: zhHk
      ? "3 分鐘 AI 流程健康檢查"
      : zhTw
        ? "3 分鐘 AI 流程健康檢查"
        : ja
          ? "3分間のAIワークフロー健康チェック"
          : de
            ? "3-Minuten AI-Workflow-Gesundheitscheck"
            : "3-minute AI workflow health check",
    intro: zhHk
      ? "想用 AI 改善公司營運，但唔知道應該由邊度開始？回答以下問題，我哋會初步判斷邊個流程最值得優先改善，以及下一步應該梳理流程、試用 AI，定係考慮 CRM／自動化。"
      : zhTw
        ? "想用 AI 改善公司營運，但不確定該從哪裡開始？回答以下問題，我們會初步判斷哪個流程最值得優先改善，以及下一步應該梳理流程、試用 AI，還是考慮 CRM／自動化。"
        : ja
          ? "AIで業務を改善したいが、どこから始めるべきか不明ですか？いくつかの質問に答えると、最優先で改善すべきワークフローと、次のステップ（プロセス整理、AI試行、CRM／自動化）を判断します。"
          : de
            ? "Sie möchten mit AI die Abläufe verbessern, wissen aber nicht, wo anfangen? Mit ein paar Antworten erkennen wir den wertvollsten Workflow und ob zuerst Prozessklärung, AI-Pilot oder CRM/Automatisierung sinnvoll ist."
            : "Want AI to improve operations but unsure where to start? Answer a few questions so we can spot the highest-value workflow and whether you should map process first, trial AI, or consider CRM / automation.",
    privacy: zhHk
      ? "請勿輸入客戶名單、財務明細或敏感營運資料。呢份問卷只作初步了解，不構成任何保證或專業意見。"
      : zhTw
        ? "請勿輸入客戶名單、財務明細或敏感營運資料。本問卷僅供初步了解，不構成任何保證或專業意見。"
        : ja
          ? "顧客リスト、財務詳細、機密の業務データは入力しないでください。本フォームは初期トリアージのみで、専門的助言ではありません。"
          : de
            ? "Keine Kundenlisten, Finanzdaten oder sensible Betriebsdaten eingeben. Dieses Formular dient nur der ersten Einschätzung und ist keine Beratung."
            : "Do not enter customer lists, financial details, or sensitive operational data. This form is for initial triage only and is not professional advice.",
    sectionA: zhHk || zhTw ? "A. 基本資料" : ja ? "A. 基本情報" : de ? "A. Grundlagen" : "A. Basics",
    sectionB: zhHk || zhTw ? "B. 日常工作" : ja ? "B. 日常業務" : de ? "B. Tägliche Aufgaben" : "B. Day-to-day tasks",
    sectionC: zhHk || zhTw ? "C. 工具與目標" : ja ? "C. ツールと目標" : de ? "C. Tools & Ziele" : "C. Tools & priorities",
    sectionD: zhHk || zhTw ? "D. 聯絡資料" : ja ? "D. 連絡先" : de ? "D. Kontakt" : "D. Contact",
    next: zhHk || zhTw ? (zhHk ? "下一頁" : "下一頁") : ja ? "次へ" : de ? "Weiter" : "Next",
    back: zhHk || zhTw ? "上一頁" : ja ? "戻る" : de ? "Zurück" : "Back",
    submit: zhHk || zhTw ? "提交問卷" : ja ? "送信" : de ? "Absenden" : "Submit",
    sending: zhHk || zhTw ? "提交中…" : ja ? "送信中…" : de ? "Wird gesendet…" : "Submitting…",
    successTitle: zhHk || zhTw
      ? "多謝完成流程健康檢查"
      : ja
        ? "健康チェックのご回答ありがとうございます"
        : de
          ? "Danke für den Gesundheitscheck"
          : "Thanks for completing the health check",
    successBody: zhHk
      ? "你嘅答案顯示，下一步未必係立即買新系統，而係先揀出一個最影響效率或客戶跟進嘅流程，梳理現況、定 KPI，再試行一個 AI quick win。"
      : zhTw
        ? "您的答案顯示，下一步未必是立即購買新系統，而是先選出一個最影響效率或客戶跟進的流程，梳理現況、設定 KPI，再試行一個 AI quick win。"
        : ja
          ? "次の一歩は新システム購入ではなく、効率やフォローアップに最も影響するワークフローを1つ選び、現状を整理し、KPIを設定してからAI quick winを試すことが多いです。"
          : de
            ? "Der nächste Schritt ist oft nicht ein neues System, sondern ein Workflow, der Effizienz oder Follow-up am stärksten belastet — klären, KPIs setzen, dann einen AI Quick Win testen."
            : "Your answers suggest the next step may not be buying a new system yet—pick one workflow that hurts efficiency or follow-up most, clarify it, set KPIs, then trial one AI quick win.",
    highIntentBody: zhHk
      ? "你適合優先做一次流程診斷。我哋會聚焦一個最痛嘅 workflow，先了解現況，再判斷 AI、CRM 或自動化有冇實際價值。"
      : zhTw
        ? "您適合優先做一次流程診斷。我們會聚焦一個最痛的 workflow，先了解現況，再判斷 AI、CRM 或自動化是否有實際價值。"
        : ja
          ? "ワークフロー診断を優先するのが適しています。最も痛いプロセスに絞り、現状を把握してからAI、CRM、自動化の価値を判断します。"
          : de
            ? "Ein Workflow-Review passt gut: wir fokussieren einen schmerzhaften Prozess und prüfen, ob AI, CRM oder Automatisierung echten Wert bringen."
            : "You look ready for a workflow diagnosis. We will focus on one painful process, understand the current state, then decide whether AI, CRM, or automation has real value.",
    bookCta: zhHk || zhTw
      ? "預約 30 分鐘流程診斷"
      : ja
        ? "30分ワークフロー診断を予約"
        : de
          ? "30-Minuten-Workflow-Review buchen"
          : "Book a 30-minute workflow review",
    whatsappCta: zhHk || zhTw ? "WhatsApp 聯絡 Larry" : ja ? "WhatsAppでLarryに連絡" : de ? "Larry per WhatsApp" : "WhatsApp Larry",
    requiredError: zhHk || zhTw
      ? "請完成必填題目再繼續。"
      : ja
        ? "必須項目を入力してから続けてください。"
        : de
          ? "Bitte Pflichtfelder ausfüllen, bevor Sie fortfahren."
          : "Please complete required questions before continuing.",
    failError: zhHk || zhTw
      ? "暫時未能送出，請改用 WhatsApp 或直接預約。"
      : ja
        ? "送信できませんでした。WhatsAppまたは直接予約をご利用ください。"
        : de
          ? "Senden fehlgeschlagen. Bitte WhatsApp oder direkte Buchung nutzen."
          : "Could not submit right now. Please WhatsApp us or book directly.",
    pricingEyebrow: zhHk || zhTw ? "相關定價" : ja ? "関連料金" : de ? "Preise" : "Related pricing",
    pricingTitle: zhHk || zhTw
      ? "由免費診斷開始，再決定試用或陪跑"
      : ja
        ? "無料診断から始め、試行または伴走を選択"
        : de
          ? "Kostenlos starten, dann Pilot oder Begleitung"
          : "Start free, then choose trial or advisory",
    pricingIntro: zhHk || zhTw
      ? "問卷免費。有興趣落地時，可按以下公開價起步（HKD）。"
      : ja
        ? "アンケートは無料。本格導入時は以下の公開価格（HKD）から。"
        : de
          ? "Der Fragebogen ist kostenlos. Öffentliche HKD-Startpreise bei Umsetzung:"
          : "The questionnaire is free. Public HKD starting prices if you want to go further:",
    pricingCards: pricingCards(locale),
    consent: zhHk
      ? "我同意 InnovateXP 使用以上資料聯絡我，提供流程診斷及相關服務資訊。我明白此問卷只作初步了解。"
      : zhTw
        ? "我同意 InnovateXP 使用以上資料聯絡我，提供流程診斷及相關服務資訊。我明白本問卷僅供初步了解。"
        : ja
          ? "InnovateXPが上記情報でワークフロー診断および関連サービスについて連絡することに同意します。本アンケートは初期理解のみを目的とします。"
          : de
            ? "Ich stimme zu, dass InnovateXP diese Daten für Workflow-Diagnose und verwandte Services nutzen darf. Der Fragebogen dient nur der ersten Einschätzung."
            : "I agree that InnovateXP may use these details to contact me about a workflow diagnosis and related services. This questionnaire is for initial understanding only.",
    questions: buildQuestions(q),
  };

  return { ...defaults, ...overrides };
}

const enQ: QCopy = {
  industry: "Which industry best describes your company?",
  role: "What is your role?",
  teamSize: "Approximate team size?",
  workflows: "Which day-to-day tasks do you most want to make easier? (pick up to 3)",
  painPoints: "What's the biggest headache with this?",
  weeklyHours: "Roughly how many hours a week does this take up?",
  keyPersonRisk: "If the person who normally handles this is away, what happens?",
  currentTools: "Are you using any tools already?",
  outcomes: "What matters most to you?",
  urgency: "When would you like to start?",
  name: "Name",
  company: "Company",
  email: "Email",
  phone: "WhatsApp (optional)",
  website: "Website / LinkedIn (optional)",
  industryOpts: {
    edu: "Education / training / courses",
    pro: "Professional services / consulting",
    retail: "Retail / e-commerce",
    health: "F&B / beauty / health services",
    event: "Events / community / membership",
    field: "Engineering / property / field service",
    other: "Other",
  },
  roleOpts: {
    owner: "Owner",
    manager: "Manager",
    ops: "Operations",
    other: "Other",
  },
  teamSizeOpts: {
    "1-5": "1–5",
    "6-15": "6–15",
    "16-30": "16–30",
    "30+": "30+",
  },
  workflowsOpts: {
    enquiries: "Enquiries & follow-up",
    bookings: "Bookings & attendance",
    payments: "Payments & reminders",
    reporting: "Reporting",
    scheduling: "Staff scheduling",
    other: "Other",
  },
  painPointsOpts: {
    manual: "Too manual",
    missed: "Things get missed",
    unclear: "Unclear who's responsible",
    norecord: "No easy record",
    other: "Other",
  },
  weeklyHoursOpts: {
    lt3: "<3",
    "3-8": "3–8",
    "8-15": "8–15",
    "15+": "15+",
  },
  keyPersonRiskOpts: {
    stop: "Things stop",
    slower: "Gets much slower",
    minor: "Minor impact",
  },
  currentToolsOpts: {
    "wa-business": "WhatsApp Business App",
    workbuddy: "Workbuddy",
    respondio: "Respond.io",
    crm: "CRM",
    sheets: "Google Sheet",
    notion: "Notion",
    none: "None",
    other: "Other",
  },
  outcomesOpts: {
    time: "Save time",
    leads: "Fewer missed leads or bookings",
    handover: "Easier handover",
    visibility: "Better visibility",
    cost: "Lower cost",
  },
  urgencyOpts: {
    now: "Right away",
    "1m": "Within 1 month",
    "3m": "Within 3 months",
    unsure: "Not sure yet",
  },
  namePh: "Your name",
  companyPh: "Company / org",
  emailPh: "you@company.com",
  phonePh: "+…",
  websitePh: "https://…",
};

const zhHkQ: QCopy = {
  industry: "你公司屬於邊個行業？",
  role: "你嘅職位係？",
  teamSize: "公司大約有幾多位同事？",
  workflows: "你最想令邊類日常工作更容易？（最多 3 項）",
  painPoints: "呢個流程最大嘅困擾係咩？",
  weeklyHours: "每星期大約花幾多時間處理？",
  keyPersonRisk: "如果平時負責嘅同事唔喺，會點？",
  currentTools: "你而家有冇用任何工具？",
  outcomes: "你最重視咩？",
  urgency: "你希望幾時開始？",
  name: "姓名",
  company: "公司名稱",
  email: "電郵",
  phone: "WhatsApp 電話（選填）",
  website: "公司網站／LinkedIn（選填）",
  industryOpts: {
    edu: "教育／培訓／課程",
    pro: "專業服務／顧問",
    retail: "零售／電商",
    health: "餐飲／美容／健康服務",
    event: "活動／社群／會員制業務",
    field: "工程／物業／現場服務",
    other: "其他",
  },
  roleOpts: {
    owner: "老闆／負責人",
    manager: "管理層",
    ops: "營運",
    other: "其他",
  },
  teamSizeOpts: {
    "1-5": "1–5 人",
    "6-15": "6–15 人",
    "16-30": "16–30 人",
    "30+": "30 人以上",
  },
  workflowsOpts: {
    enquiries: "查詢同跟進",
    bookings: "預約同出席",
    payments: "收款同提醒",
    reporting: "報表",
    scheduling: "員工排班",
    other: "其他",
  },
  painPointsOpts: {
    manual: "太人手",
    missed: "容易漏事",
    unclear: "唔清楚邊個負責",
    norecord: "冇易查記錄",
    other: "其他",
  },
  weeklyHoursOpts: {
    lt3: "少於 3 小時",
    "3-8": "3–8 小時",
    "8-15": "8–15 小時",
    "15+": "15 小時以上",
  },
  keyPersonRiskOpts: {
    stop: "流程會停",
    slower: "明顯變慢",
    minor: "影響不大",
  },
  currentToolsOpts: {
    "wa-business": "WhatsApp Business App",
    workbuddy: "Workbuddy",
    respondio: "Respond.io",
    crm: "CRM",
    sheets: "Google Sheet",
    notion: "Notion",
    none: "未使用",
    other: "其他",
  },
  outcomesOpts: {
    time: "慳時間",
    leads: "減少漏單或漏預約",
    handover: "交接更容易",
    visibility: "睇得更清楚",
    cost: "降低成本",
  },
  urgencyOpts: {
    now: "即刻",
    "1m": "1 個月內",
    "3m": "3 個月內",
    unsure: "暫時未肯定",
  },
  namePh: "你的稱呼",
  companyPh: "公司／機構",
  emailPh: "you@company.com",
  phonePh: "+852…",
  websitePh: "https://…",
};

const zhTwQ: QCopy = {
  industry: "您的公司屬於哪個行業？",
  role: "您的職位是？",
  teamSize: "公司大約有多少位同事？",
  workflows: "您最想讓哪類日常工作更容易？（最多 3 項）",
  painPoints: "這個流程最大的困擾是什麼？",
  weeklyHours: "每星期大約花多少時間處理？",
  keyPersonRisk: "如果平時負責的同事不在，會怎樣？",
  currentTools: "您目前有使用任何工具嗎？",
  outcomes: "您最重視什麼？",
  urgency: "您希望何時開始？",
  name: "姓名",
  company: "公司名稱",
  email: "電子郵件",
  phone: "WhatsApp 電話（選填）",
  website: "公司網站／LinkedIn（選填）",
  industryOpts: {
    edu: "教育／培訓／課程",
    pro: "專業服務／顧問",
    retail: "零售／電商",
    health: "餐飲／美容／健康服務",
    event: "活動／社群／會員制業務",
    field: "工程／物業／現場服務",
    other: "其他",
  },
  roleOpts: {
    owner: "負責人",
    manager: "管理者",
    ops: "營運",
    other: "其他",
  },
  teamSizeOpts: {
    "1-5": "1–5 人",
    "6-15": "6–15 人",
    "16-30": "16–30 人",
    "30+": "30 人以上",
  },
  workflowsOpts: {
    enquiries: "詢問與跟進",
    bookings: "預約與出席",
    payments: "收款與提醒",
    reporting: "報表",
    scheduling: "員工排班",
    other: "其他",
  },
  painPointsOpts: {
    manual: "太依賴人工",
    missed: "容易漏事",
    unclear: "不清楚誰負責",
    norecord: "沒有易查的記錄",
    other: "其他",
  },
  weeklyHoursOpts: {
    lt3: "少於 3 小時",
    "3-8": "3–8 小時",
    "8-15": "8–15 小時",
    "15+": "15 小時以上",
  },
  keyPersonRiskOpts: {
    stop: "流程會停",
    slower: "明顯變慢",
    minor: "影響不大",
  },
  currentToolsOpts: {
    "wa-business": "WhatsApp Business App",
    workbuddy: "Workbuddy",
    respondio: "Respond.io",
    crm: "CRM",
    sheets: "Google Sheet",
    notion: "Notion",
    none: "未使用",
    other: "其他",
  },
  outcomesOpts: {
    time: "節省時間",
    leads: "減少漏單或漏預約",
    handover: "交接更容易",
    visibility: "看得更清楚",
    cost: "降低成本",
  },
  urgencyOpts: {
    now: "馬上",
    "1m": "1 個月內",
    "3m": "3 個月內",
    unsure: "暫時不確定",
  },
  namePh: "您的稱呼",
  companyPh: "公司／機構",
  emailPh: "you@company.com",
  phonePh: "+886…",
  websitePh: "https://…",
};

const jaQ: QCopy = {
  industry: "御社に最も近い業種はどれですか？",
  role: "ご役職は？",
  teamSize: "おおよそのチーム規模は？",
  workflows: "最も楽にしたい日常業務は？（最大3つ）",
  painPoints: "この業務で最も困ることは？",
  weeklyHours: "週にどれくらいの時間がかかりますか？",
  keyPersonRisk: "普段担当する人が不在の場合、どうなりますか？",
  currentTools: "すでに使っているツールはありますか？",
  outcomes: "最も重視することは？",
  urgency: "いつ頃始めたいですか？",
  name: "氏名",
  company: "会社名",
  email: "メール",
  phone: "WhatsApp（任意）",
  website: "Webサイト／LinkedIn（任意）",
  industryOpts: {
    edu: "教育／研修／コース",
    pro: "専門サービス／コンサル",
    retail: "小売／EC",
    health: "飲食／美容／ヘルスサービス",
    event: "イベント／コミュニティ／会員制",
    field: "エンジニアリング／不動産／現場サービス",
    other: "その他",
  },
  roleOpts: {
    owner: "オーナー",
    manager: "マネージャー",
    ops: "オペレーション",
    other: "その他",
  },
  teamSizeOpts: {
    "1-5": "1–5人",
    "6-15": "6–15人",
    "16-30": "16–30人",
    "30+": "30人以上",
  },
  workflowsOpts: {
    enquiries: "問い合わせとフォローアップ",
    bookings: "予約と出席管理",
    payments: "支払いとリマインダー",
    reporting: "レポート",
    scheduling: "スタッフのシフト",
    other: "その他",
  },
  painPointsOpts: {
    manual: "手作業が多い",
    missed: "漏れが起きる",
    unclear: "責任者が不明確",
    norecord: "記録が残りにくい",
    other: "その他",
  },
  weeklyHoursOpts: {
    lt3: "3時間未満",
    "3-8": "3–8時間",
    "8-15": "8–15時間",
    "15+": "15時間以上",
  },
  keyPersonRiskOpts: {
    stop: "業務が止まる",
    slower: "かなり遅くなる",
    minor: "影響は小さい",
  },
  currentToolsOpts: {
    "wa-business": "WhatsApp Business App",
    workbuddy: "Workbuddy",
    respondio: "Respond.io",
    crm: "CRM",
    sheets: "Google Sheet",
    notion: "Notion",
    none: "なし",
    other: "その他",
  },
  outcomesOpts: {
    time: "時間を節約",
    leads: "漏れ（リード・予約）を減らす",
    handover: "引き継ぎを楽に",
    visibility: "見える化を改善",
    cost: "コストを下げる",
  },
  urgencyOpts: {
    now: "すぐに",
    "1m": "1か月以内",
    "3m": "3か月以内",
    unsure: "まだ未定",
  },
  namePh: "お名前",
  companyPh: "会社／組織",
  emailPh: "you@company.com",
  phonePh: "+81…",
  websitePh: "https://…",
};

const deQ: QCopy = {
  industry: "Welche Branche beschreibt Ihr Unternehmen am besten?",
  role: "Welche Rolle haben Sie?",
  teamSize: "Ungefähre Teamgröße?",
  workflows: "Welche täglichen Aufgaben möchten Sie am leichtesten machen? (max. 3)",
  painPoints: "Was ist der größte Ärger damit?",
  weeklyHours: "Wie viele Stunden pro Woche nimmt das ungefähr in Anspruch?",
  keyPersonRisk: "Wenn die zuständige Person weg ist, was passiert?",
  currentTools: "Nutzen Sie bereits Tools?",
  outcomes: "Was ist Ihnen am wichtigsten?",
  urgency: "Wann möchten Sie starten?",
  name: "Name",
  company: "Unternehmen",
  email: "E-Mail",
  phone: "WhatsApp (optional)",
  website: "Website / LinkedIn (optional)",
  industryOpts: {
    edu: "Bildung / Training / Kurse",
    pro: "Professional Services / Beratung",
    retail: "Retail / E-Commerce",
    health: "Gastronomie / Beauty / Gesundheit",
    event: "Events / Community / Membership",
    field: "Engineering / Immobilien / Field Service",
    other: "Sonstige",
  },
  roleOpts: {
    owner: "Owner",
    manager: "Manager",
    ops: "Operations",
    other: "Sonstige",
  },
  teamSizeOpts: {
    "1-5": "1–5",
    "6-15": "6–15",
    "16-30": "16–30",
    "30+": "30+",
  },
  workflowsOpts: {
    enquiries: "Anfragen & Follow-up",
    bookings: "Buchungen & Teilnahme",
    payments: "Zahlungen & Reminder",
    reporting: "Reporting",
    scheduling: "Mitarbeiterplanung",
    other: "Sonstige",
  },
  painPointsOpts: {
    manual: "Zu manuell",
    missed: "Dinge werden vergessen",
    unclear: "Unklar, wer verantwortlich ist",
    norecord: "Keine einfache Aufzeichnung",
    other: "Sonstige",
  },
  weeklyHoursOpts: {
    lt3: "<3",
    "3-8": "3–8",
    "8-15": "8–15",
    "15+": "15+",
  },
  keyPersonRiskOpts: {
    stop: "Es stoppt",
    slower: "Wird deutlich langsamer",
    minor: "Geringer Einfluss",
  },
  currentToolsOpts: {
    "wa-business": "WhatsApp Business App",
    workbuddy: "Workbuddy",
    respondio: "Respond.io",
    crm: "CRM",
    sheets: "Google Sheet",
    notion: "Notion",
    none: "Keine",
    other: "Sonstige",
  },
  outcomesOpts: {
    time: "Zeit sparen",
    leads: "Weniger verpasste Leads oder Buchungen",
    handover: "Einfachere Übergabe",
    visibility: "Bessere Sichtbarkeit",
    cost: "Geringere Kosten",
  },
  urgencyOpts: {
    now: "Sofort",
    "1m": "Innerhalb 1 Monat",
    "3m": "Innerhalb 3 Monate",
    unsure: "Noch unsicher",
  },
  namePh: "Ihr Name",
  companyPh: "Unternehmen / Organisation",
  emailPh: "you@company.com",
  phonePh: "+49…",
  websitePh: "https://…",
};

export function getConsultationCopy(locale: AppLocale): LocaleBlock {
  switch (locale) {
    case "zh-hk":
      return shell("zh-hk", zhHkQ, {});
    case "zh-tw":
      return shell("zh-tw", zhTwQ, {});
    case "ja":
      return shell("ja", jaQ, {});
    case "de":
      return shell("de", deQ, {});
    default:
      return shell("en", enQ, {});
  }
}

export function isHighIntent(answers: Record<string, string | string[]>): boolean {
  return answers.urgency === "now";
}
