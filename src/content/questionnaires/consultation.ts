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
  /** Helper under the label */
  hint?: string;
  /** Show this text field only when parent answer includes `whenOption` */
  showWhen?: { fieldId: string; optionId: string };
  /** Render as multiline textarea */
  multiline?: boolean;
  minRows?: number;
};

export type StepNotice = {
  when: { fieldId: string; optionId: string };
  message: string;
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
  contactRequiredError: string;
  failError: string;
  pricingEyebrow: string;
  pricingTitle: string;
  pricingIntro: string;
  pricingCards: { name: string; price: string; note: string }[];
  consent: string;
  questions: QuestionField[];
  notices: StepNotice[];
  steps: { title: string; questionIds: string[] }[];
};

function opts(ids: readonly string[], map: Record<string, string>): QuestionOption[] {
  return ids.map((id) => ({ id, label: map[id] }));
}

const ROLE_IDS = ["founder", "ops", "sales", "admin", "other"] as const;
const TEAM_IDS = ["1-2", "3-10", "11-30", "31+"] as const;
const INDUSTRY_IDS = ["training", "clinic", "fitness", "pro", "retail", "other"] as const;
const PAIN_IDS = [
  "lead_scatter",
  "quote_chaos",
  "booking_pay",
  "class_ops",
  "event_followup",
  "firefighter",
  "other",
] as const;
const TOOL_IDS = ["whatsapp", "sheets", "paper", "crm", "other"] as const;
const OWNER_IDS = ["just_me", "2-3", "whole_team"] as const;
const LOSS_IDS = ["leads", "labour", "cx", "unsure"] as const;
const AFTER_IDS = ["clarity", "sop", "buy_or_not", "land", "just_clear"] as const;
const ATTITUDE_IDS = ["process_enough", "open_trial", "already_buy", "undecided"] as const;
const CONSTRAINT_IDS = ["budget", "sensitive", "resistance", "vendor_lock", "none"] as const;
const START_IDS = ["this_week", "two_weeks", "this_month", "form_only"] as const;
const SLOT_IDS = ["weekday_am", "weekday_pm", "weekday_eve", "weekend"] as const;

function pricingCards(locale: AppLocale) {
  const zh = locale === "zh-hk" || locale === "zh-tw";
  const money = (n: number) => formatHkd(n, zh ? "zh-hk" : "en");
  return [
    {
      name: zh ? "30 分鐘業務聽診" : locale === "ja" ? "30分業務診断" : locale === "de" ? "30-Min. Business-Diagnose" : "30-min Business Workflow Diagnosis",
      price: zh ? "免費入口" : locale === "ja" ? "無料入口" : locale === "de" ? "Kostenloser Einstieg" : "Free entry",
      note: zh
        ? "聽完先講下一步——落地、陪跑，定係直講你暫時唔使買系統"
        : "After the call: land, co-run, or we’ll say you shouldn’t buy a system yet",
    },
    {
      name: "AI Readiness Snapshot",
      price: money(PRICING.quickCash.aiReadinessAssessment),
      note: zh ? "較細成本先做證據型決定；可升級 Discovery" : "Smaller evidence-based decision; can upgrade to Discovery",
    },
    {
      name: zh ? "30 日 Discovery（≤10 人）" : "30-day Discovery (≤10 people)",
      price: money(PRICING.consultancy.discoverySprint30Day),
      note: zh ? "驗證一條卡住收入／營運嘅流程；場地另計" : "Validate one revenue-blocking workflow; venue extra",
    },
  ];
}

type L = {
  role: Record<(typeof ROLE_IDS)[number], string>;
  team: Record<(typeof TEAM_IDS)[number], string>;
  industry: Record<(typeof INDUSTRY_IDS)[number], string>;
  pain: Record<(typeof PAIN_IDS)[number], string>;
  tools: Record<(typeof TOOL_IDS)[number], string>;
  owners: Record<(typeof OWNER_IDS)[number], string>;
  loss: Record<(typeof LOSS_IDS)[number], string>;
  after: Record<(typeof AFTER_IDS)[number], string>;
  attitude: Record<(typeof ATTITUDE_IDS)[number], string>;
  constraints: Record<(typeof CONSTRAINT_IDS)[number], string>;
  start: Record<(typeof START_IDS)[number], string>;
  slots: Record<(typeof SLOT_IDS)[number], string>;
  labels: {
    name: string;
    company: string;
    role: string;
    phone: string;
    email: string;
    teamSize: string;
    industry: string;
    industryOther: string;
    painLine: string;
    painLineOther: string;
    painExample: string;
    painExampleHint: string;
    tools: string;
    toolsCrmName: string;
    toolsOther: string;
    lineOwners: string;
    monthlyLoss: string;
    afterDiagnosis: string;
    toolAttitude: string;
    constraints: string;
    startWhen: string;
    preferredSlots: string;
    notes: string;
  };
  ph: {
    name: string;
    company: string;
    phone: string;
    email: string;
    industryOther: string;
    painOther: string;
    painExample: string;
    crm: string;
    toolsOther: string;
    notes: string;
  };
  notice31: string;
  noticeEvent: string;
  shell: {
    eyebrow: string;
    title: string;
    intro: string;
    privacy: string;
    sectionA: string;
    sectionB: string;
    sectionC: string;
    sectionD: string;
    successTitle: string;
    successBody: string;
    highIntentBody: string;
    bookCta: string;
    consent: string;
  };
};

function buildQuestions(l: L): QuestionField[] {
  const lab = l.labels;
  return [
    { id: "name", label: lab.name, type: "text", required: true, placeholder: l.ph.name },
    { id: "company", label: lab.company, type: "text", required: true, placeholder: l.ph.company },
    { id: "role", label: lab.role, type: "single", required: true, options: opts(ROLE_IDS, l.role) },
    { id: "phone", label: lab.phone, type: "tel", required: false, placeholder: l.ph.phone },
    { id: "email", label: lab.email, type: "email", required: false, placeholder: l.ph.email },
    { id: "teamSize", label: lab.teamSize, type: "single", required: true, options: opts(TEAM_IDS, l.team) },
    { id: "industry", label: lab.industry, type: "multi", required: true, options: opts(INDUSTRY_IDS, l.industry) },
    {
      id: "industryOther",
      label: lab.industryOther,
      type: "text",
      required: false,
      placeholder: l.ph.industryOther,
      showWhen: { fieldId: "industry", optionId: "other" },
    },
    { id: "painLine", label: lab.painLine, type: "single", required: true, options: opts(PAIN_IDS, l.pain) },
    {
      id: "painLineOther",
      label: lab.painLineOther,
      type: "text",
      required: false,
      placeholder: l.ph.painOther,
      showWhen: { fieldId: "painLine", optionId: "other" },
    },
    {
      id: "painExample",
      label: lab.painExample,
      type: "text",
      required: true,
      hint: lab.painExampleHint,
      placeholder: l.ph.painExample,
      multiline: true,
      minRows: 2,
    },
    { id: "tools", label: lab.tools, type: "multi", required: true, options: opts(TOOL_IDS, l.tools) },
    {
      id: "toolsCrmName",
      label: lab.toolsCrmName,
      type: "text",
      required: false,
      placeholder: l.ph.crm,
      showWhen: { fieldId: "tools", optionId: "crm" },
    },
    {
      id: "toolsOther",
      label: lab.toolsOther,
      type: "text",
      required: false,
      placeholder: l.ph.toolsOther,
      showWhen: { fieldId: "tools", optionId: "other" },
    },
    { id: "lineOwners", label: lab.lineOwners, type: "single", required: true, options: opts(OWNER_IDS, l.owners) },
    { id: "monthlyLoss", label: lab.monthlyLoss, type: "single", required: true, options: opts(LOSS_IDS, l.loss) },
    { id: "afterDiagnosis", label: lab.afterDiagnosis, type: "multi", required: true, options: opts(AFTER_IDS, l.after) },
    { id: "toolAttitude", label: lab.toolAttitude, type: "single", required: true, options: opts(ATTITUDE_IDS, l.attitude) },
    { id: "constraints", label: lab.constraints, type: "multi", required: false, options: opts(CONSTRAINT_IDS, l.constraints) },
    { id: "startWhen", label: lab.startWhen, type: "single", required: true, options: opts(START_IDS, l.start) },
    { id: "preferredSlots", label: lab.preferredSlots, type: "multi", required: true, options: opts(SLOT_IDS, l.slots) },
    {
      id: "notes",
      label: lab.notes,
      type: "text",
      required: false,
      placeholder: l.ph.notes,
      multiline: true,
      minRows: 2,
    },
  ];
}

function pack(locale: AppLocale, l: L): LocaleBlock {
  const zh = locale === "zh-hk" || locale === "zh-tw";
  const questions = buildQuestions(l);
  return {
    eyebrow: zh ? "業務聽診入口" : locale === "ja" ? "業務診断入口" : locale === "de" ? "Diagnose-Einstieg" : "Diagnosis intake",
    title: l.shell.title,
    intro: l.shell.intro,
    privacy: l.shell.privacy,
    sectionA: l.shell.sectionA,
    sectionB: l.shell.sectionB,
    sectionC: l.shell.sectionC,
    sectionD: l.shell.sectionD,
    next: zh ? "下一頁" : locale === "ja" ? "次へ" : locale === "de" ? "Weiter" : "Next",
    back: zh ? "上一頁" : locale === "ja" ? "戻る" : locale === "de" ? "Zurück" : "Back",
    submit: zh ? "提交問卷" : locale === "ja" ? "送信" : locale === "de" ? "Absenden" : "Submit",
    sending: zh ? "提交中…" : locale === "ja" ? "送信中…" : locale === "de" ? "Wird gesendet…" : "Submitting…",
    successTitle: l.shell.successTitle,
    successBody: l.shell.successBody,
    highIntentBody: l.shell.highIntentBody,
    bookCta: l.shell.bookCta,
    whatsappCta: zh ? "WhatsApp 聯絡 Larry" : locale === "ja" ? "WhatsAppでLarryに連絡" : locale === "de" ? "Larry per WhatsApp" : "WhatsApp Larry",
    requiredError: zh
      ? "請完成必填題目再繼續。"
      : locale === "ja"
        ? "必須項目を入力してから続けてください。"
        : locale === "de"
          ? "Bitte Pflichtfelder ausfüllen."
          : "Please complete required questions before continuing.",
    contactRequiredError: zh
      ? "請至少填寫 WhatsApp 號碼或 Email 其中一項。"
      : locale === "ja"
        ? "WhatsApp番号またはメールのいずれかを入力してください。"
        : locale === "de"
          ? "Bitte WhatsApp oder E-Mail angeben."
          : "Please provide at least a WhatsApp number or an email.",
    failError: zh
      ? "暫時未能送出，請改用 WhatsApp 或直接預約。"
      : locale === "ja"
        ? "送信できませんでした。WhatsAppまたは直接予約をご利用ください。"
        : locale === "de"
          ? "Senden fehlgeschlagen. Bitte WhatsApp oder direkte Buchung nutzen."
          : "Could not submit right now. Please WhatsApp us or book directly.",
    pricingEyebrow: zh ? "公開起步價（聽診後先決定）" : "Public starting prices (decide after diagnosis)",
    pricingTitle: zh ? "唔硬推產品——先對齊主線" : "No hard sell — mainline first",
    pricingIntro: zh
      ? "問卷免費。有興趣落地時，可按以下公開價起步（HKD）。"
      : "The questionnaire is free. Public HKD starting prices if you want to go further:",
    pricingCards: pricingCards(locale),
    consent: l.shell.consent,
    questions,
    notices: [
      { when: { fieldId: "teamSize", optionId: "31+" }, message: l.notice31 },
      { when: { fieldId: "painLine", optionId: "event_followup" }, message: l.noticeEvent },
    ],
    steps: [
      {
        title: l.shell.sectionA,
        questionIds: ["name", "company", "role", "phone", "email", "teamSize", "industry", "industryOther"],
      },
      {
        title: l.shell.sectionB,
        questionIds: [
          "painLine",
          "painLineOther",
          "painExample",
          "tools",
          "toolsCrmName",
          "toolsOther",
          "lineOwners",
          "monthlyLoss",
        ],
      },
      {
        title: l.shell.sectionC,
        questionIds: ["afterDiagnosis", "toolAttitude", "constraints", "startWhen"],
      },
      {
        title: l.shell.sectionD,
        questionIds: ["preferredSlots", "notes"],
      },
    ],
  };
}

const zhHk: L = {
  role: { founder: "創辦人", ops: "營運", sales: "銷售", admin: "Admin", other: "其他" },
  team: { "1-2": "1–2", "3-10": "3–10", "11-30": "11–30", "31+": "31+" },
  industry: {
    training: "培訓／教育",
    clinic: "診所",
    fitness: "Fitness",
    pro: "專業服務",
    retail: "零售",
    other: "其他",
  },
  pain: {
    lead_scatter: "查詢／Lead 跟進散晒（WhatsApp、表單、Excel 各做各）",
    quote_chaos: "報價慢、版本多、交接亂",
    booking_pay: "報名／預約／收款對唔齊",
    class_ops: "課堂／排程／出席／續約靠人手",
    event_followup: "活動完咗冇跟進",
    firefighter: "老闆日日救火、一個人放假就停",
    other: "其他",
  },
  tools: {
    whatsapp: "WhatsApp",
    sheets: "Excel／Google Sheet",
    paper: "紙／口頭",
    crm: "現有 CRM／系統（請寫名）",
    other: "其他",
  },
  owners: { just_me: "淨係我", "2-3": "2–3 人", whole_team: "成個團隊" },
  loss: {
    leads: "漏客／成交變慢",
    labour: "人工時間（救火、重複輸入）",
    cx: "客戶體驗差／投訴",
    unsure: "暫時講唔準，想聽診先釐清",
  },
  after: {
    clarity: "講清邊度漏、邊個負責、下一步做咩",
    sop: "簡單流程圖／SOP",
    buy_or_not: "知自己需唔需要買系統／AI",
    land: "想開始落地／陪跑",
    just_clear: "暫時只想搞清楚問題",
  },
  attitude: {
    process_enough: "流程執順就夠，唔一定要買系統",
    open_trial: "開放試工具，但要真係用得順",
    already_buy: "已經決定要上系統／自動化",
    undecided: "未定，聽完先講",
  },
  constraints: {
    budget: "預算未批",
    sensitive: "資料敏感／要保密",
    resistance: "團隊抗拒改流程",
    vendor_lock: "已經有供應商／系統綁住",
    none: "冇特別",
  },
  start: {
    this_week: "本週",
    two_weeks: "兩週內",
    this_month: "呢個月內",
    form_only: "只係先填表了解",
  },
  slots: {
    weekday_am: "平日上午",
    weekday_pm: "平日下午",
    weekday_eve: "平日晚上",
    weekend: "週末",
  },
  labels: {
    name: "你叫咩名？",
    company: "公司／品牌名稱？",
    role: "你嘅職位？",
    phone: "WhatsApp 號碼",
    email: "Email",
    teamSize: "團隊大約幾多人？",
    industry: "行業？（可多選）",
    industryOther: "其他行業（請註明）",
    painLine: "你最想改善嘅係邊一類？",
    painLineOther: "其他痛點（請一句講清）",
    painExample: "用一句講：呢條線「最亂／最漏客」嘅具體例子係咩？",
    painExampleHint: "例如「客問完兩日冇人回」「報價要問三個人先出得」",
    tools: "呢條線而家主要用咩工具？（可多選）",
    toolsCrmName: "現有 CRM／系統名稱",
    toolsOther: "其他工具（請註明）",
    lineOwners: "大概有幾多人一齊跟呢條線？",
    monthlyLoss: "如果呢條線繼續咁，一個月大概損失咩？（可估）",
    afterDiagnosis: "你今次最想聽診之後拎到咩？（可多選）",
    toolAttitude: "你對導入工具／AI 嘅態度？",
    constraints: "有冇硬性限制我哋要知？（可空）",
    startWhen: "希望幾快開始 30 分鐘聽診？",
    preferredSlots: "方便聽診嘅時段？（可多選）",
    notes: "有冇想補充？（可空）",
  },
  ph: {
    name: "你的稱呼",
    company: "公司／品牌",
    phone: "+852…",
    email: "you@company.com",
    industryOther: "請註明行業",
    painOther: "請簡述",
    painExample: "一句具體例子…",
    crm: "例如 Salesforce／HubSpot／自建…",
    toolsOther: "請註明",
    notes: "可選",
  },
  notice31: "我哋主力服務 3–30 人團隊；仍可約聽診，但範圍可能不同。",
  noticeEvent: "聽診後可能方案之一：活動後跟進流程（EventXP 只係選項，唔會硬推）。",
  shell: {
    eyebrow: "業務聽診入口",
    title: "業務聽診前小問卷（約 2 分鐘）",
    intro: "帶你最亂嗰條線嚟。聽完先講下一步——落地、陪跑，定係直講你暫時唔使買系統。",
    privacy: "請勿貼上客戶名單、財務明細或敏感個人資料。呢份問卷只用作準備 30 分鐘業務聽診。",
    sectionA: "A. 基本資料",
    sectionB: "B. 而家最痛嘅一條線",
    sectionC: "C. 期望同邊界",
    sectionD: "D. 預約確認",
    successTitle: "收到。",
    successBody:
      "我會用你填嘅內容準備聽診。請用以下連結揀時間——聽診約 30 分鐘，唔等於一定要買系統。",
    highIntentBody:
      "你似係想盡快開波。我會用你填嘅內容準備聽診；請即刻揀時間——聽完先講要唔要落地或系統。",
    bookCta: "揀時間：預約業務聽診",
    consent:
      "我明白聽診約 30 分鐘，唔等於一定要買系統；分享嘅營運細節只用於服務我哋，除非書面同意否則唔作公開案例。",
  },
};

const zhTw: L = {
  ...zhHk,
  labels: {
    ...zhHk.labels,
    name: "您叫什麼名字？",
    company: "公司／品牌名稱？",
    role: "您的職位？",
    teamSize: "團隊大約多少人？",
    industry: "行業？（可多選）",
    industryOther: "其他行業（請註明）",
    painLine: "您最想改善的是哪一類？",
    painLineOther: "其他痛點（請一句說清楚）",
    painExample: "用一句說：這條線「最亂／最漏客」的具體例子是什麼？",
    painExampleHint: "例如「客人問完兩天沒人回」「報價要問三個人才能出」",
    tools: "這條線目前主要用什麼工具？（可多選）",
    toolsCrmName: "現有 CRM／系統名稱",
    toolsOther: "其他工具（請註明）",
    lineOwners: "大概有多少人一起跟這條線？",
    monthlyLoss: "如果這條線繼續這樣，一個月大概損失什麼？（可估）",
    afterDiagnosis: "您這次最想聽診之後拿到什麼？（可多選）",
    toolAttitude: "您對導入工具／AI 的態度？",
    constraints: "有沒有硬性限制我們要知道？（可空）",
    startWhen: "希望多快開始 30 分鐘聽診？",
    preferredSlots: "方便聽診的時段？（可多選）",
    notes: "有沒有想補充？（可空）",
  },
  role: { founder: "創辦人", ops: "營運", sales: "銷售", admin: "Admin", other: "其他" },
  pain: {
    lead_scatter: "查詢／Lead 跟進分散（WhatsApp、表單、Excel 各做各的）",
    quote_chaos: "報價慢、版本多、交接亂",
    booking_pay: "報名／預約／收款對不齊",
    class_ops: "課堂／排程／出席／續約靠人手",
    event_followup: "活動結束後沒有跟進",
    firefighter: "老闆天天救火、一個人請假就停",
    other: "其他",
  },
  tools: {
    whatsapp: "WhatsApp",
    sheets: "Excel／Google Sheet",
    paper: "紙本／口頭",
    crm: "現有 CRM／系統（請寫名）",
    other: "其他",
  },
  owners: { just_me: "只有我", "2-3": "2–3 人", whole_team: "整個團隊" },
  loss: {
    leads: "漏客／成交變慢",
    labour: "人力時間（救火、重複輸入）",
    cx: "客戶體驗差／投訴",
    unsure: "暫時說不準，想聽診先釐清",
  },
  after: {
    clarity: "講清哪裡漏、誰負責、下一步做什麼",
    sop: "簡單流程圖／SOP",
    buy_or_not: "知道自己需不需要買系統／AI",
    land: "想開始落地／陪跑",
    just_clear: "暫時只想搞清楚問題",
  },
  attitude: {
    process_enough: "流程理順就夠，不一定要買系統",
    open_trial: "開放試工具，但要真的用得順",
    already_buy: "已經決定要上系統／自動化",
    undecided: "未定，聽完再說",
  },
  constraints: {
    budget: "預算未批",
    sensitive: "資料敏感／要保密",
    resistance: "團隊抗拒改流程",
    vendor_lock: "已經有供應商／系統綁定",
    none: "沒有特別",
  },
  start: {
    this_week: "本週",
    two_weeks: "兩週內",
    this_month: "這個月內",
    form_only: "只是先填表了解",
  },
  slots: {
    weekday_am: "平日上午",
    weekday_pm: "平日下午",
    weekday_eve: "平日晚上",
    weekend: "週末",
  },
  notice31: "我們主力服務 3–30 人團隊；仍可約聽診，但範圍可能不同。",
  noticeEvent: "聽診後可能方案之一：活動後跟進流程（EventXP 只是選項，不會硬推）。",
  shell: {
    ...zhHk.shell,
    title: "業務聽診前小問卷（約 2 分鐘）",
    intro: "帶你最亂的那條線來。聽完再講下一步——落地、陪跑，或直接告訴你暫時不必買系統。",
    privacy: "請勿貼上客戶名單、財務明細或敏感個人資料。本問卷只用來準備 30 分鐘業務聽診。",
    sectionB: "B. 現在最痛的一條線",
    sectionC: "C. 期望與邊界",
    successBody:
      "我會用您填的內容準備聽診。請用以下連結選時間——聽診約 30 分鐘，不等於一定要買系統。",
    highIntentBody:
      "您似乎想盡快開始。我會用您填的內容準備聽診；請立刻選時間——聽完再決定要不要落地或系統。",
    bookCta: "選時間：預約業務聽診",
    consent:
      "我明白聽診約 30 分鐘，不等於一定要買系統；分享的營運細節只用於服務我們，除非書面同意否則不作公開案例。",
  },
};

const en: L = {
  role: { founder: "Founder", ops: "Operations", sales: "Sales", admin: "Admin", other: "Other" },
  team: { "1-2": "1–2", "3-10": "3–10", "11-30": "11–30", "31+": "31+" },
  industry: {
    training: "Training / education",
    clinic: "Clinic",
    fitness: "Fitness",
    pro: "Professional services",
    retail: "Retail",
    other: "Other",
  },
  pain: {
    lead_scatter: "Enquiry / lead follow-up is scattered (WhatsApp, forms, Excel)",
    quote_chaos: "Slow quotes, many versions, messy handoffs",
    booking_pay: "Enrolment / booking / payment don’t line up",
    class_ops: "Classes / scheduling / attendance / renewals are manual",
    event_followup: "No follow-up after events",
    firefighter: "Founder firefighting daily; one absence stalls everything",
    other: "Other",
  },
  tools: {
    whatsapp: "WhatsApp",
    sheets: "Excel / Google Sheets",
    paper: "Paper / verbal",
    crm: "Existing CRM / system (name it)",
    other: "Other",
  },
  owners: { just_me: "Just me", "2-3": "2–3 people", whole_team: "The whole team" },
  loss: {
    leads: "Lost leads / slower closes",
    labour: "Labour time (firefighting, re-entry)",
    cx: "Poor CX / complaints",
    unsure: "Not sure yet — want diagnosis to clarify",
  },
  after: {
    clarity: "Clear where leakage is, who owns it, and next steps",
    sop: "Simple process map / SOP",
    buy_or_not: "Know whether I need to buy a system / AI",
    land: "Ready to start implementation / co-run",
    just_clear: "Just want the problem clarified for now",
  },
  attitude: {
    process_enough: "Fixing the process is enough — no need to buy a system",
    open_trial: "Open to tools if the team will actually use them",
    already_buy: "Already decided to implement a system / automation",
    undecided: "Undecided — decide after the call",
  },
  constraints: {
    budget: "Budget not approved",
    sensitive: "Sensitive / confidential data",
    resistance: "Team resists process change",
    vendor_lock: "Already locked to a vendor / system",
    none: "Nothing special",
  },
  start: {
    this_week: "This week",
    two_weeks: "Within two weeks",
    this_month: "This month",
    form_only: "Just filling the form for now",
  },
  slots: {
    weekday_am: "Weekday morning",
    weekday_pm: "Weekday afternoon",
    weekday_eve: "Weekday evening",
    weekend: "Weekend",
  },
  labels: {
    name: "Your name?",
    company: "Company / brand name?",
    role: "Your role?",
    phone: "WhatsApp number",
    email: "Email",
    teamSize: "Approx. team size?",
    industry: "Industry? (multi-select OK)",
    industryOther: "Other industry (please specify)",
    painLine: "Which line do you most want to improve?",
    painLineOther: "Other pain (one sentence)",
    painExample: "In one sentence: what’s the most chaotic / leaky example on this line?",
    painExampleHint: 'e.g. “No reply for two days after an enquiry” / “Needs three people to issue a quote”',
    tools: "What tools does this line mainly use? (multi-select)",
    toolsCrmName: "Current CRM / system name",
    toolsOther: "Other tools (please specify)",
    lineOwners: "How many people work this line together?",
    monthlyLoss: "If this continues, what’s the rough monthly loss? (estimate OK)",
    afterDiagnosis: "What do you most want after the diagnosis? (multi-select)",
    toolAttitude: "How do you feel about adopting tools / AI?",
    constraints: "Any hard constraints we should know? (optional)",
    startWhen: "How soon do you want the 30-min diagnosis?",
    preferredSlots: "Preferred time windows? (multi-select)",
    notes: "Anything else to add? (optional)",
  },
  ph: {
    name: "Your name",
    company: "Company / brand",
    phone: "+852…",
    email: "you@company.com",
    industryOther: "Please specify",
    painOther: "Briefly describe",
    painExample: "One concrete example…",
    crm: "e.g. Salesforce / HubSpot / custom…",
    toolsOther: "Please specify",
    notes: "Optional",
  },
  notice31: "We mainly serve teams of 3–30. You can still book a diagnosis; scope may differ.",
  noticeEvent: "After diagnosis, one possible option is post-event follow-up (EventXP is optional — not a hard sell).",
  shell: {
    eyebrow: "Diagnosis intake",
    title: "Pre-diagnosis mini questionnaire (~2 min)",
    intro:
      "Bring your messiest workflow. After the call we’ll say next steps — land, co-run, or plainly that you shouldn’t buy a system yet.",
    privacy:
      "Do not paste customer lists, financial details, or sensitive personal data. This form only prepares your 30-minute Business Workflow Diagnosis.",
    sectionA: "A. Basics",
    sectionB: "B. The line that hurts most",
    sectionC: "C. Expectations & boundaries",
    sectionD: "D. Booking preferences",
    successTitle: "Got it.",
    successBody:
      "I’ll use what you shared to prepare the diagnosis. Pick a time below — about 30 minutes, and it does not mean you must buy a system.",
    highIntentBody:
      "You look ready to start soon. I’ll prepare from your answers — pick a slot now. After the call we’ll decide whether to land or buy anything.",
    bookCta: "Pick a time: book diagnosis",
    consent:
      "I understand the diagnosis is about 30 minutes and does not require buying a system. Operational details I share are only used to serve us, and will not be published as a case study without written consent.",
  },
};

const ja: L = {
  ...en,
  role: { founder: "創業者", ops: "オペレーション", sales: "営業", admin: "管理", other: "その他" },
  industry: {
    training: "研修／教育",
    clinic: "クリニック",
    fitness: "フィットネス",
    pro: "専門サービス",
    retail: "小売",
    other: "その他",
  },
  notice31: "主に3–30名チーム向けです。診断は可能ですが、範囲が異なる場合があります。",
  noticeEvent: "診断後の選択肢の一つにイベント後フォローがあります（EventXPは任意・押し売りしません）。",
  shell: {
    ...en.shell,
    title: "業務診断前ミニ質問（約2分）",
    intro: "いちばん乱れている業務ラインを持ってきてください。診断後に次の一手——実装・伴走、または「今は買わなくてよい」と率直に伝えます。",
    privacy: "顧客リストや財務詳細、機微な個人情報は入力しないでください。本フォームは30分の業務診断準備のみに使います。",
    sectionA: "A. 基本情報",
    sectionB: "B. いちばん痛いライン",
    sectionC: "C. 期待と境界",
    sectionD: "D. 予約希望",
    successTitle: "受け取りました。",
    successBody: "ご回答を診断準備に使います。下のリンクから時間を選んでください——約30分で、システム購入は必須ではありません。",
    highIntentBody: "早めに始めたいご意向のようです。回答をもとに準備しますので、今すぐ枠を選んでください。",
    bookCta: "時間を選ぶ：業務診断を予約",
    consent:
      "診断は約30分で、システム購入を必須としないことを理解します。共有した業務詳細はサービス提供のみに使い、書面同意なしに公開事例にしません。",
  },
  labels: {
    ...en.labels,
    name: "お名前は？",
    company: "会社／ブランド名は？",
    role: "ご役職は？",
    teamSize: "チーム規模は？",
    industry: "業種は？（複数可）",
    painLine: "いちばん改善したいのはどれですか？",
    painExample: "一言で：このラインでいちばん乱れている／漏れている具体例は？",
    tools: "このラインで主に使うツールは？（複数可）",
    lineOwners: "このラインを一緒に追う人数は？",
    monthlyLoss: "このまま続くと、月に何を失いそうですか？（概算可）",
    afterDiagnosis: "診断後に得たいものは？（複数可）",
    toolAttitude: "ツール／AI導入への姿勢は？",
    startWhen: "30分診断はいつ頃希望ですか？",
    preferredSlots: "都合のよい時間帯は？（複数可）",
    notes: "補足はありますか？（任意）",
  },
};

const de: L = {
  ...en,
  role: { founder: "Gründer/in", ops: "Operations", sales: "Sales", admin: "Admin", other: "Sonstiges" },
  notice31: "Wir betreuen vor allem Teams mit 3–30 Personen. Diagnose ist möglich; der Umfang kann abweichen.",
  noticeEvent: "Nach der Diagnose kann Event-Follow-up eine Option sein (EventXP optional — kein Hard-Sell).",
  shell: {
    ...en.shell,
    title: "Mini-Fragebogen vor der Diagnose (~2 Min.)",
    intro:
      "Bringen Sie Ihre chaotischste Linie mit. Danach sagen wir den nächsten Schritt — Umsetzung, Begleitung oder klar: noch kein System kaufen.",
    privacy:
      "Keine Kundenlisten, Finanzdetails oder sensible Personendaten. Nur zur Vorbereitung der 30-Minuten-Diagnose.",
    sectionA: "A. Grundlagen",
    sectionB: "B. Die schmerzhafteste Linie",
    sectionC: "C. Erwartungen & Grenzen",
    sectionD: "D. Terminwünsche",
    successTitle: "Erhalten.",
    successBody:
      "Ich bereite die Diagnose mit Ihren Angaben vor. Bitte Zeit wählen — ca. 30 Minuten, kein Kaufzwang.",
    highIntentBody:
      "Sie wirken startbereit. Bitte jetzt einen Slot wählen — nach dem Call entscheiden wir über Umsetzung oder System.",
    bookCta: "Zeit wählen: Diagnose buchen",
    consent:
      "Ich verstehe: Diagnose ca. 30 Minuten, kein Systemkauf nötig. Geteilte Betriebsdetails dienen nur der Betreuung und werden ohne schriftliche Zustimmung nicht als Fallstudie veröffentlicht.",
  },
};

export function getConsultationCopy(locale: AppLocale): LocaleBlock {
  switch (locale) {
    case "zh-hk":
      return pack("zh-hk", zhHk);
    case "zh-tw":
      return pack("zh-tw", zhTw);
    case "ja":
      return pack("ja", ja);
    case "de":
      return pack("de", de);
    default:
      return pack("en", en);
  }
}

/** High intent: wants to start soon or explicitly wants to land / co-run. */
export function isHighIntent(answers: Record<string, string | string[]>): boolean {
  if (answers.startWhen === "this_week" || answers.startWhen === "two_weeks") return true;
  const after = answers.afterDiagnosis;
  if (Array.isArray(after) && after.includes("land")) return true;
  return false;
}

/** At least one of WhatsApp or email must be present. */
export function hasUsableContact(answers: Record<string, string | string[]>): boolean {
  const phone = String(answers.phone || "").trim();
  const email = String(answers.email || "").trim();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  return Boolean(phone) || emailOk;
}
