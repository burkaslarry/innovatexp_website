import type { AppLocale } from "@/lib/i18n-routing";
import { localeUsesChineseCopy } from "@/lib/i18n-routing";

export type AutomationTier = "lite" | "trial" | "starter" | "ai_api" | "ai_gpu" | "diagnosis_first";

export type QualifierAnswers = {
  pain?: string;
  tools?: string;
  needAi?: string;
  dataResidency?: string;
  volume?: string;
  gpu?: string;
  erpDepth?: string;
  owner?: string;
  budget?: string;
  urgency?: string;
};

export type QualifierResult = {
  tier: AutomationTier;
  erpHint: string;
  title: string;
  body: string;
  nextCta: string;
};

export type PackageRow = {
  id: string;
  name: string;
  setup: string;
  monthly: string;
  includes: string;
  bestFor: string;
  avoidWhen: string;
};

type Copy = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  lead: string;
  brandPromise: string;
  serviceFirstTitle: string;
  serviceFirstBody: string;
  eeatTitle: string;
  eeat: { label: string; body: string }[];
  spectrumTitle: string;
  spectrumIntro: string;
  hermesTitle: string;
  hermesYes: string[];
  hermesNo: string[];
  hermesUncensoredNote: string;
  erpTitle: string;
  erpIntro: string;
  erpOptions: { name: string; fit: string }[];
  packages: PackageRow[];
  passThrough: string;
  faqTitle: string;
  faqs: { question: string; answer: string }[];
  qualifierEyebrow: string;
  qualifierTitle: string;
  qualifierIntro: string;
  questions: {
    id: keyof QualifierAnswers;
    label: string;
    options: { id: string; label: string }[];
  }[];
  submit: string;
  reset: string;
  bookCta: string;
  resultLabels: Record<AutomationTier, { title: string; body: string }>;
  erpHints: Record<string, string>;
};

const zh: Copy = {
  metaTitle: "業務流程落地方案｜先聽診再改善｜InnovateXP",
  metaDescription:
    "香港 3–30 人團隊先做業務聽診，再揀流程整理、14 日試行、團隊落地或私隱加強方案。唔使買系統會直講。",
  eyebrow: "服務先行 · 產品其後",
  h1: "先聽診卡住收入嘅流程，再揀合適落地方案",
  lead:
    "我係 AI 商業顧問 Larry Lo／InnovateXP。入口係業務聽診，再按你嘅流程、團隊同私隱需要，揀細步試行或完整落地。現有工具用得返就保留，唔會為賣系統逼你重做。",
  brandPromise: "先執順流程，再落地 AI。如果你唔需要買系統，我會直講。",
  serviceFirstTitle: "點解唔一開始推最複雜嘅 AI？",
  serviceFirstBody:
    "AI 助手係幫手，唔係你嘅公司系統。多數香港中小企先執順現有表格同跟進流程就夠。只有私隱要求高、每日用量大，先需要私有環境。一般商用會用可追蹤、可覆核嘅做法，唔會用難審計嘅模型。",
  eeatTitle: "點解可以信呢個建議",
  eeat: [
    {
      label: "經驗",
      body: "創辦人主導交付：由聽診、流程落地到第 30／60／90 日採用檢討，唔係交報告就走。",
    },
    {
      label: "專業",
      body: "14 年 IT 交付；熟悉 WhatsApp／Excel 營運、流程設計、AI 助手同私隱安排。",
    },
    {
      label: "權威",
      body: "InnovateXP Limited（香港）；公開頁、案例頁同 LinkedIn 一致引用「AI 商業顧問 Larry Lo／InnovateXP」。",
    },
    {
      label: "Trustworthiness（信任）",
      body: "價錢階梯公開；現有工具可保留；私隱同維護責任開工前講清；聯絡同私隱政策可查。",
    },
  ],
  spectrumTitle: "由細步試行到完整落地",
  spectrumIntro: "所有方案都由業務聽診開始。公開價係決策參考；最後範圍按流程、資料同團隊採用需要確認。",
  hermesTitle: "幾時先值得用私有 AI 環境",
  hermesYes: [
    "資料不能離開指定環境（法律、醫療、金融向）",
    "每日查詢量大，公開雲端用量費會高過自備環境",
    "有人長期維護（我哋代管，或你團隊有負責人）",
    "願意為私隱同穩定性付較高月費",
  ],
  hermesNo: [
    "現有主機好細——改用受管雲端服務",
    "只係表格、通知、資料同步——規則流程已夠",
    "想少維護、要穩定服務——用受管服務",
    "公司細、查詢少——受管服務更划算",
    "要嚴謹紀錄——唔用難以追蹤嘅模型",
  ],
  hermesUncensoredNote:
    "難以追蹤、未經審核嘅模型只適合內部試驗，或客人書面確認風險。商用預設用有紀錄、可覆核嘅穩定做法。",
  erpTitle: "工作工具你揀，唔綁死單一平台",
  erpIntro: "「現有表格或管理工具用得返就保留。我幫你接好流程，需要時先加 AI 助手。Notion 只係其中一個選擇。」",
  erpOptions: [
    { name: "Google Sheets", fit: "超細公司、熟 Excel" },
    { name: "Airtable", fit: "輕量客戶跟進同庫存" },
    { name: "自管資料表", fit: "想自己保管資料、少付月費" },
    { name: "Notion", fit: "非技術團隊、想介面清楚" },
    { name: "庫存同會計系統", fit: "真庫存、會計、採購單" },
    { name: "度身訂造", fit: "現有工具都唔夠用" },
  ],
  packages: [
    {
      id: "lite",
      name: "流程整理 Lite",
      setup: "聽診後報價",
      monthly: "HK$1,200",
      includes: "2 條日常流程＋1 小時團隊教學",
      bestFor: "表單、通知、資料同步等規則清楚工作",
      avoidWhen: "責任人同流程仍未釐清",
    },
    {
      id: "trial",
      name: "14 日試用",
      setup: "聽診後報價（一次）",
      monthly: "—",
      includes: "2 條流程試行；轉正式方案可扣 HK$2,000",
      bestFor: "想先試",
      avoidWhen: "第一日就要真會計／庫存",
    },
    {
      id: "starter",
      name: "團隊落地 Starter",
      setup: "HK$12,800",
      monthly: "HK$1,800",
      includes: "最多 5 條流程、WhatsApp／Email 銜接、操作步驟、備份",
      bestFor: "多數香港中小企（聽診後）",
      avoidWhen: "冇營運負責人；拒絕聽診",
    },
    {
      id: "ai_api",
      name: "團隊落地＋AI 助手",
      setup: "HK$12,800–14,800",
      monthly: "HK$2,500",
      includes: "Starter＋AI 讀取合適資料、起草回覆、人工覆核",
      bestFor: "要加快日常營運、用量中低",
      avoidWhen: "資料不能使用雲端服務",
    },
    {
      id: "ai_gpu",
      name: "私隱加強 AI 方案",
      setup: "HK$22,800",
      monthly: "HK$4,500",
      includes: "私有環境、AI 助手、流程銜接及維護安排",
      bestFor: "有嚴格私隱、數據駐留或高用量要求",
      avoidWhen: "冇內部負責人或長期維護預算",
    },
    {
      id: "erpnext",
      name: "庫存／會計流程加購",
      setup: "+HK$8,800",
      monthly: "+HK$800",
      includes: "庫存、會計、採購單等進階模組",
      bestFor: "基本資料表已經唔夠用",
      avoidWhen: "仍然 WhatsApp＋Excel 混亂——先聽診",
    },
  ],
  passThrough: "第三方訊息、AI 用量、網域、雲端或私有環境成本另付；開工前會列明。",
  faqTitle: "常見問題",
  faqs: [
    {
      question: "我哋要唔要先買新系統？",
      answer: "多數唔使。先執責任同跟進節奏；系統係後面。半個鐘業務聽診一條線——如果其實唔使買，我會直講。",
    },
    {
      question: "一定要換晒而家啲工具？",
      answer: "唔使。現有表格、資料庫或管理工具用得返就保留。重點係責任、流程同資料銜接，唔係逼你轉平台。",
    },
    {
      question: "可唔可以先試？",
      answer: "可以。14 日試用聽診後報價；轉正式有抵扣。開工前仍會聽診，避免裝錯嘢。",
    },
    {
      question: "資料有嚴格私隱或駐留要求點算？",
      answer: "可以評估私隱加強方案，包括資料位置、權限、紀錄同維護責任。大部分中小企唔需要由最複雜方案開始。",
    },
    {
      question: "AI 助手會唔會自己做決定？",
      answer: "唔會預設放任自動決策。會先定資料範圍、可做動作同人工覆核位，重要客戶溝通同業務決定仍由人負責。",
    },
    {
      question: "同市面兩三千到六千八自動化有咩分別？",
      answer: "價錢帶可以好近；分別係採用、Day 30／60／90 KPI 同陪跑——你買嘅係卡住收入嘅線行順，唔係裝完就走。",
    },
  ],
  qualifierEyebrow: "10 題快速分級",
  qualifierTitle: "比較落地方案",
  qualifierIntro: "答完即出建議。唔取代業務聽診——聽診仍然係開工前必做。",
  questions: [
    {
      id: "pain",
      label: "1. 最痛係邊條線？",
      options: [
        { id: "followup", label: "查詢跟進" },
        { id: "quote", label: "報價" },
        { id: "order", label: "訂單" },
        { id: "stock", label: "庫存" },
        { id: "finance", label: "財務" },
      ],
    },
    {
      id: "tools",
      label: "2. 而家主要工具？",
      options: [
        { id: "wa_excel", label: "WhatsApp／Excel" },
        { id: "notion", label: "Notion" },
        { id: "sheets", label: "Google Sheets／Airtable" },
        { id: "other", label: "其他／混合" },
      ],
    },
    {
      id: "needAi",
      label: "3. 要 AI 理解指令，定只需規則自動化？",
      options: [
        { id: "rules", label: "只需規則（form／通知／sync）" },
        { id: "ai", label: "要 AI 讀寫／起草回覆" },
      ],
    },
    {
      id: "dataResidency",
      label: "4. 數據可唔可以出公開雲端？",
      options: [
        { id: "ok", label: "可以（資料可放受管雲端）" },
        { id: "private", label: "唔可以／要私有" },
      ],
    },
    {
      id: "volume",
      label: "5. 每日大概幾多次 AI／查詢？",
      options: [
        { id: "low", label: "少（試用級）" },
        { id: "mid", label: "中（日常 ops）" },
        { id: "high", label: "高（用量費會好貴）" },
      ],
    },
    {
      id: "gpu",
      label: "6. 可唔可以接受私有環境，並有人長期維護？",
      options: [
        { id: "yes", label: "有／願意租" },
        { id: "no", label: "冇" },
      ],
    },
    {
      id: "erpDepth",
      label: "7. 要完整庫存同會計，定夠用嘅表同看板？",
      options: [
        { id: "lite", label: "夠用表／看板" },
        { id: "real", label: "真庫存／會計／PO" },
      ],
    },
    {
      id: "owner",
      label: "8. 邊個係 owner？",
      options: [
        { id: "boss", label: "老闆親自跟" },
        { id: "admin", label: "Admin／營運" },
        { id: "none", label: "暫時冇人跟" },
      ],
    },
    {
      id: "budget",
      label: "9. 預算帶？",
      options: [
        { id: "trial", label: "試用（聽診後報價）" },
        { id: "lite", label: "Setup 約 HK$7–13k" },
        { id: "ai", label: "AI／私有更高" },
      ],
    },
    {
      id: "urgency",
      label: "10. 幾急？",
      options: [
        { id: "normal", label: "標準節奏" },
        { id: "rush", label: "好急（可能 +30%）" },
      ],
    },
  ],
  submit: "睇建議方案",
  reset: "重新作答",
  bookCta: "預約業務聽診（確認範圍）",
  resultLabels: {
    diagnosis_first: {
      title: "建議：先做業務聽診",
      body: "暫時缺少清晰 owner 或範圍。半個鐘聽診先，避免裝錯自動化。",
    },
    lite: {
      title: "建議：流程整理 Lite（或 14 日試用）",
      body: "規則流程已夠。保留你而家用嘅表格或系統，先做 2 條日常流程。唔使上大型 AI。",
    },
    trial: {
      title: "建議：14 日試用，再轉團隊落地",
      body: "低風險試跑。試用聽診後報價；轉正式有抵扣。",
    },
    starter: {
      title: "建議：團隊落地 Starter",
      body: "多數中小企主路徑。最多 5 條流程、備份，同採用陪跑。",
    },
    ai_api: {
      title: "建議：團隊落地＋AI 助手",
      body: "要 AI 讀資料同起草回覆，但唔使私有環境。重要決定仍由人覆核。",
    },
    ai_gpu: {
      title: "建議：私隱加強 AI 方案",
      body: "私隱、高用量同長期維護同時成立先值得。商用用可追蹤、可覆核嘅做法。",
    },
  },
  erpHints: {
    wa_excel: "建議由 Google Sheets 或你熟悉嘅表格起步。",
    notion: "可以繼續 Notion；唔使為自動化而逼你換。",
    sheets: "Sheets／Airtable 很適合流程整理同團隊落地。",
    other: "聽診時一齊定用邊套工具；表格、自管資料表或庫存會計系統都可以。",
    real: "若要真庫存同會計，可在團隊落地或 AI 方案上加購進階模組。",
    lite: "表同看板已夠——Notion、表格都可以繼續用。",
  },
};

const en: Copy = {
  metaTitle: "Workflow Implementation Packages | InnovateXP",
  metaDescription:
    "Workflow diagnosis and implementation for Hong Kong teams of 3–30: process cleanup, a 14-day pilot, team rollout, or a privacy-focused path.",
  eyebrow: "Service first · products second",
  h1: "Diagnose the revenue-blocking workflow, then choose the right implementation path",
  lead:
    "I am AI Business Consultant Larry Lo / InnovateXP. Start with diagnosis, then choose a small pilot or full rollout around your workflow, team, and privacy needs. Keep existing tools where they still work.",
  brandPromise: "Diagnose first. If you should not buy a system yet, I will say so.",
  serviceFirstTitle: "Why not start with the most complex AI?",
  serviceFirstBody:
    "An AI assistant is a helper, not your company system. Most Hong Kong SMEs only need their current tables and follow-up rhythm cleaned up. A private environment is for strict privacy and high daily volume. Commercial work uses a traceable, reviewable setup.",
  eeatTitle: "Why this advice is trustworthy",
  eeat: [
    {
      label: "Experience",
      body: "Founder-led delivery from diagnosis through adoption reviews on Day 30/60/90 — not report-and-leave.",
    },
    {
      label: "Expertise",
      body: "14 years of IT delivery across WhatsApp/Excel operations, workflow design, practical AI support, and private deployment trade-offs.",
    },
    {
      label: "Authoritativeness",
      body: "InnovateXP Limited (Hong Kong), with the same positioning on the public site, case studies, and LinkedIn.",
    },
    {
      label: "Trustworthiness",
      body: "Published ladder, freedom to keep existing tools, clear privacy and maintenance boundaries, and a reachable privacy policy.",
    },
  ],
  spectrumTitle: "From a small pilot to full team rollout",
  spectrumIntro: "Every path starts with diagnosis. Published fees guide the decision; final scope reflects workflow, data, and adoption needs.",
  hermesTitle: "When a private AI environment is worth it",
  hermesYes: [
    "Data must stay in a specified environment (legal, medical, finance)",
    "Daily volume is high enough that public-cloud usage fees cost more",
    "Someone will maintain it (us, or an owner on your team)",
    "You will pay more each month for privacy and stability",
  ],
  hermesNo: [
    "The current server is very small — use a managed service",
    "Only forms, notifications, and data sync — rules are enough",
    "You want less maintenance and a stable service",
    "Small team, few enquiries — a managed service costs less",
    "You need a clear audit trail — skip hard-to-trace models",
  ],
  hermesUncensoredNote:
    "Hard-to-trace, unreviewed models are only for internal trials, or when the client accepts the risk in writing. Commercial work stays reviewable.",
  erpTitle: "You choose the tools",
  erpIntro: "“Keep the spreadsheets or systems that still work. I connect the workflow, and add an AI assistant only if it helps. Notion is one option.”",
  erpOptions: [
    { name: "Google Sheets", fit: "Tiny teams, Excel-native" },
    { name: "Airtable", fit: "Light customer follow-up and inventory" },
    { name: "Self-managed tables", fit: "Keep data in-house, lower monthly fees" },
    { name: "Notion", fit: "Non-technical teams, clear pages" },
    { name: "Inventory and accounting system", fit: "Real stock, accounts, and purchase orders" },
    { name: "Built to fit", fit: "Current tools are not enough" },
  ],
  packages: [
    {
      id: "lite",
      name: "Process Cleanup Lite",
      setup: "Scoped after diagnosis",
      monthly: "HK$1,200",
      includes: "2 routine workflows + 1 hour of team training",
      bestFor: "Clear form, notification, and data-sync work",
      avoidWhen: "Ownership and the current process are still unclear",
    },
    {
      id: "trial",
      name: "14-day Trial",
      setup: "Quoted after diagnosis (once)",
      monthly: "—",
      includes: "2 workflow pilots; HK$2,000 credit toward team rollout",
      bestFor: "Want to try first",
      avoidWhen: "Need real accounting/inventory on day one",
    },
    {
      id: "starter",
      name: "Team Rollout Starter",
      setup: "HK$12,800",
      monthly: "HK$1,800",
      includes: "Up to 5 workflows, WhatsApp/email connections, written steps, and backup",
      bestFor: "Most Hong Kong SMEs after diagnosis",
      avoidWhen: "No operations owner; refuses diagnosis",
    },
    {
      id: "ai_api",
      name: "Team Rollout + AI Assistant",
      setup: "HK$12,800–14,800",
      monthly: "HK$2,500",
      includes: "Starter plus context-aware drafts and human approval",
      bestFor: "Faster daily operations at low–mid volume",
      avoidWhen: "Data cannot use managed cloud services",
    },
    {
      id: "ai_gpu",
      name: "Privacy-Focused AI",
      setup: "HK$22,800",
      monthly: "HK$4,500",
      includes: "Private environment, AI assistance, workflow connections, and maintenance plan",
      bestFor: "Strict privacy, residency, or high-volume requirements",
      avoidWhen: "No internal owner or ongoing maintenance budget",
    },
    {
      id: "erpnext",
      name: "Inventory & Finance Add-on",
      setup: "+HK$8,800",
      monthly: "+HK$800",
      includes: "Inventory, accounting, and purchase-order modules",
      bestFor: "Basic tables no longer meet the need",
      avoidWhen: "Still WhatsApp+Excel chaos — diagnose first",
    },
  ],
  passThrough: "Third-party messaging, AI usage, domain, cloud, or private-environment costs are separate and listed before work starts.",
  faqTitle: "Common questions",
  faqs: [
    {
      question: "Do we need to buy a new system first?",
      answer: "Usually no. Fix ownership and follow-up rhythm first. Book a 30-min diagnosis — I’ll say if you shouldn’t buy.",
    },
    {
      question: "Must we replace our current tools?",
      answer: "No. Keep the spreadsheets, databases, or management tools that still work. Ownership, workflow, and clean handoffs matter more than changing platforms.",
    },
    {
      question: "Can we try first?",
      answer: "Yes. 14-day trial quoted after diagnosis, with credit toward Starter. Diagnosis still happens before build.",
    },
    {
      question: "What if we have strict privacy or data-residency needs?",
      answer: "We can assess a privacy-focused path covering data location, permissions, logging, and maintenance responsibility. Most SMEs do not need the most complex option first.",
    },
    {
      question: "Will the AI assistant make decisions on its own?",
      answer: "Not by default. We define what data it may use, what actions it may take, and where human approval is required. Important customer communication and business decisions stay with people.",
    },
    {
      question: "How is this different from HK$2.8k–6.8k automation offers?",
      answer: "Price bands can look similar. Differentiation is adoption, Day 30/60/90 reviews, and fixing a revenue-blocking line — not install-and-leave.",
    },
  ],
  qualifierEyebrow: "10-question qualifier",
  qualifierTitle: "Compare implementation paths",
  qualifierIntro: "Instant recommendation. Does not replace Business Workflow Diagnosis before build.",
  questions: [
    {
      id: "pain",
      label: "1. Which line hurts most?",
      options: [
        { id: "followup", label: "Enquiry follow-up" },
        { id: "quote", label: "Quoting" },
        { id: "order", label: "Orders" },
        { id: "stock", label: "Inventory" },
        { id: "finance", label: "Finance" },
      ],
    },
    {
      id: "tools",
      label: "2. Main tools today?",
      options: [
        { id: "wa_excel", label: "WhatsApp / Excel" },
        { id: "notion", label: "Notion" },
        { id: "sheets", label: "Google Sheets / Airtable" },
        { id: "other", label: "Other / mix" },
      ],
    },
    {
      id: "needAi",
      label: "3. AI understanding, or rules only?",
      options: [
        { id: "rules", label: "Rules only (form/notify/sync)" },
        { id: "ai", label: "Need AI read/write / drafts" },
      ],
    },
    {
      id: "dataResidency",
      label: "4. Can data use public cloud?",
      options: [
        { id: "ok", label: "Yes — a managed cloud service is fine" },
        { id: "private", label: "No — private/residency" },
      ],
    },
    {
      id: "volume",
      label: "5. Daily AI / query volume?",
      options: [
        { id: "low", label: "Low" },
        { id: "mid", label: "Medium" },
        { id: "high", label: "High (usage fees would get expensive)" },
      ],
    },
    {
      id: "gpu",
      label: "6. Can you accept a private environment with someone to maintain it?",
      options: [
        { id: "yes", label: "Yes" },
        { id: "no", label: "No" },
      ],
    },
    {
      id: "erpDepth",
      label: "7. Simple tables, or full inventory and accounting?",
      options: [
        { id: "lite", label: "Lite table / board" },
        { id: "real", label: "Real inventory / accounting / PO" },
      ],
    },
    {
      id: "owner",
      label: "8. Who owns ops?",
      options: [
        { id: "boss", label: "Owner follows personally" },
        { id: "admin", label: "Admin / ops" },
        { id: "none", label: "No owner yet" },
      ],
    },
    {
      id: "budget",
      label: "9. Budget band?",
      options: [
        { id: "trial", label: "Trial (quoted after diagnosis)" },
        { id: "lite", label: "Setup ~HK$7–13k" },
        { id: "ai", label: "AI / private higher" },
      ],
    },
    {
      id: "urgency",
      label: "10. Urgency?",
      options: [
        { id: "normal", label: "Standard" },
        { id: "rush", label: "Rush (+30% possible)" },
      ],
    },
  ],
  submit: "See recommendation",
  reset: "Start over",
  bookCta: "Book Business Workflow Diagnosis",
  resultLabels: {
    diagnosis_first: {
      title: "Recommendation: diagnose first",
      body: "Ownership or scope is unclear. Book a 30-min diagnosis before installing automation.",
    },
    lite: {
      title: "Recommendation: Process Cleanup Lite (or a 14-day trial)",
      body: "Rule-based workflows are enough. Keep your current tables or system and start with 2 everyday workflows. A large AI setup is not needed.",
    },
    trial: {
      title: "Recommendation: 14-day trial, then team rollout",
      body: "Low-risk pilot. The trial is quoted after diagnosis, with credit toward the team rollout.",
    },
    starter: {
      title: "Recommendation: Team Rollout Starter",
      body: "The usual path for SMEs. Up to 5 workflows, backup, and adoption support.",
    },
    ai_api: {
      title: "Recommendation: Team Rollout + AI Assistant",
      body: "You need AI to read records and draft replies, without a private environment. People still approve important decisions.",
    },
    ai_gpu: {
      title: "Recommendation: Privacy-Focused AI",
      body: "Worth it only when privacy, volume, and ongoing maintenance all apply. Commercial work stays traceable and reviewable.",
    },
  },
  erpHints: {
    wa_excel: "Start with Google Sheets or the spreadsheet your team already knows.",
    notion: "Keep Notion if it already works — no forced migration.",
    sheets: "Sheets or Airtable fit process cleanup and team rollout well.",
    other: "Choose the tool during diagnosis: spreadsheets, self-managed tables, or an inventory and accounting system.",
    real: "For real inventory and accounting, add the advanced module on top of team rollout or AI.",
    lite: "Tables and boards are enough — Notion or spreadsheets can stay.",
  },
};

export function getAutomationPackagesCopy(locale: AppLocale): Copy {
  return localeUsesChineseCopy(locale) ? zh : en;
}

export function scoreAutomationQualifier(a: QualifierAnswers, locale: AppLocale): QualifierResult {
  const c = getAutomationPackagesCopy(locale);

  if (a.owner === "none") {
    return {
      tier: "diagnosis_first",
      erpHint: c.erpHints[a.tools || "other"] || "",
      title: c.resultLabels.diagnosis_first.title,
      body: c.resultLabels.diagnosis_first.body,
      nextCta: c.bookCta,
    };
  }

  let tier: AutomationTier;

  if (a.needAi === "ai") {
    if (a.budget === "trial") {
      tier = "trial";
    } else if (a.dataResidency === "private" && a.gpu === "yes" && (a.volume === "high" || a.volume === "mid")) {
      tier = "ai_gpu";
    } else {
      tier = "ai_api";
    }
  } else if (a.budget === "trial") {
    tier = "trial";
  } else if (a.budget === "lite" || a.budget === "ai") {
    tier = "starter";
  } else {
    tier = "lite";
  }

  const erpHintParts = [
    a.tools ? c.erpHints[a.tools] : "",
    a.erpDepth === "real" ? c.erpHints.real : c.erpHints.lite,
  ].filter(Boolean);

  const labels = c.resultLabels[tier];
  const rushNote =
    a.urgency === "rush"
      ? localeUsesChineseCopy(locale)
        ? " 急單可能 +30%。"
        : " Rush may add +30%."
      : "";

  return {
    tier,
    erpHint: erpHintParts.join(" "),
    title: labels.title,
    body: `${labels.body}${rushNote}`,
    nextCta: c.bookCta,
  };
}
