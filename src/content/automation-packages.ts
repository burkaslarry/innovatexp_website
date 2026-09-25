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
  serviceFirstTitle: "點解唔一開始推 Hermes／大模型？",
  serviceFirstBody:
    "Hermes 係 AI agent（大腦），唔係 ERP。多數香港 SME 用 n8n＋自選 ERP＋Cloud API 已經夠。本地 35B 級模型要 24GB+ VRAM、私隱需求同高用量先划算；Uncensored 模型唔作預設商用腦。",
  eeatTitle: "點解可以信呢個建議（E-E-A-T）",
  eeat: [
    {
      label: "Experience（經驗）",
      body: "創辦人主導交付：由聽診、workflow 落地到 Day 30／60／90 採用檢討，唔係交報告就走。",
    },
    {
      label: "Expertise（專業）",
      body: "14 年 IT 交付；熟悉 WhatsApp／Excel 營運、流程設計、AI 助手同私隱部署取捨。",
    },
    {
      label: "Authoritativeness（權威）",
      body: "InnovateXP Limited（香港）；公開頁、llms.txt、案例頁同 LinkedIn 一致引用「AI 商業顧問 Larry Lo／InnovateXP」。",
    },
    {
      label: "Trustworthiness（信任）",
      body: "價錢階梯公開；現有工具可保留；私隱同維護責任開工前講清；聯絡同私隱政策可查。",
    },
  ],
  spectrumTitle: "由細步試行到完整落地",
  spectrumIntro: "所有方案都由業務聽診開始。公開價係決策參考；最後範圍按流程、資料同團隊採用需要確認。",
  hermesTitle: "Hermes＋本地大模型：幾時先值得",
  hermesYes: [
    "有 GPU（約 24GB+ VRAM）或願意租 RunPod／dedicated",
    "要私隱／數據唔出街（法律、醫療、金融向）",
    "每日查詢量大，Cloud API 費高過养 GPU",
    "有人維護（你 managed 或對方 DevOps）",
  ],
  hermesNo: [
    "只有細 VPS（例如 2GB RAM）——改用 Cloud API",
    "只係 form→database——純 n8n 夠",
    "要穩定 SLA、零維護——用 managed API",
    "SME 細、query 少——API model 平過养 GPU",
    "要嚴謹 audit——唔好預設 Uncensored 模型",
  ],
  hermesUncensoredNote:
    "HauhauCS 類 Uncensored 只適合內部 R&D 或客人明確要求並簽 waiver。商用預設：官方 Qwen／tool-calling 成熟模型＋logging。",
  erpTitle: "ERP 後端：客人揀，唔綁 Notion",
  erpIntro: "「ERP 後端你揀，我幫你接 n8n（同可選 AI agent）。Notion 只係其中一個 option。」",
  erpOptions: [
    { name: "Google Sheets", fit: "超細公司、熟 Excel" },
    { name: "Airtable", fit: "輕 CRM＋inventory" },
    { name: "Baserow／NocoDB", fit: "要 self-host、唔想俾 SaaS 錢" },
    { name: "Notion", fit: "非 technical 團隊、要靚 UI" },
    { name: "ERPNext", fit: "真庫存／會計／PO" },
    { name: "PostgreSQL＋Admin UI", fit: "完全客製" },
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
      includes: "最多 5 條流程、WhatsApp／Email 銜接、SOP、備份",
      bestFor: "多數香港 SME（聽診後）",
      avoidWhen: "冇 ops owner；拒絕聽診",
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
  faqTitle: "常見問題（SERP／銷售同一套答案）",
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
        { id: "ok", label: "可以（Cloud API OK）" },
        { id: "private", label: "唔可以／要私有" },
      ],
    },
    {
      id: "volume",
      label: "5. 每日大概幾多次 AI／查詢？",
      options: [
        { id: "low", label: "少（試用級）" },
        { id: "mid", label: "中（日常 ops）" },
        { id: "high", label: "高（API 費會好貴）" },
      ],
    },
    {
      id: "gpu",
      label: "6. 有冇 GPU（約 24GB+）或願意租？",
      options: [
        { id: "yes", label: "有／願意租" },
        { id: "no", label: "冇" },
      ],
    },
    {
      id: "erpDepth",
      label: "7. ERP 要「真庫存會計」定「夠用表」？",
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
      title: "建議：Automation Lite（或 14 日試用）",
      body: "規則自動化已夠。n8n＋自選 ERP＋2 條 workflow。唔使 Hermes／大模型。",
    },
    trial: {
      title: "建議：14 日試用 → 再轉 Starter",
      body: "低風險試跑。試用聽診後報價；轉正式有抵扣。",
    },
    starter: {
      title: "建議：Starter（n8n＋ERP）",
      body: "多數 SME 主路徑。Prod n8n＋自選 ERP＋最多 5 workflows＋採用陪跑。",
    },
    ai_api: {
      title: "建議：Automation＋AI（Cloud API）",
      body: "要 AI 讀寫／起草，但無須私有 GPU。Hermes（或同等）接 Cloud LLM。",
    },
    ai_gpu: {
      title: "建議：Automation＋AI（Private GPU）",
      body: "私隱＋高用量＋有 GPU 先值得。用官方／tool-calling 穩定模型；Uncensored 唔作預設。",
    },
  },
  erpHints: {
    wa_excel: "ERP 建議由 Google Sheets 或 Baserow 起步（熟 Excel／要自管 data）。",
    notion: "可以繼續 Notion；唔使為自動化而逼你換。",
    sheets: "Sheets／Airtable 很適合 Lite／Starter。",
    other: "聽診時一齊定 ERP；可選 Baserow／NocoDB／ERPNext。",
    real: "若要真庫存會計：Starter／AI 之上加購 ERPNext。",
    lite: "Lite 表／看板已夠——Notion／Baserow／Sheets 任選。",
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
  serviceFirstTitle: "Why not lead with Hermes / a local 35B model?",
  serviceFirstBody:
    "Hermes is an AI agent (brain), not an ERP. Most Hong Kong SMEs are fine with n8n + chosen ERP + a cloud LLM API. Local 35B-class models need ~24GB+ VRAM, a privacy need, and enough volume. Uncensored models are not the default commercial brain.",
  eeatTitle: "Why this advice is trustworthy (E-E-A-T)",
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
      body: "InnovateXP Limited (Hong Kong) with consistent brand citations across the site, llms.txt, cases, and LinkedIn.",
    },
    {
      label: "Trustworthiness",
      body: "Published ladder, freedom to keep existing tools, clear privacy and maintenance boundaries, and a reachable privacy policy.",
    },
  ],
  spectrumTitle: "From a small pilot to full team rollout",
  spectrumIntro: "Every path starts with diagnosis. Published fees guide the decision; final scope reflects workflow, data, and adoption needs.",
  hermesTitle: "When Hermes + a local model is worth it",
  hermesYes: [
    "GPU ~24GB+ VRAM (or willingness to rent)",
    "Privacy / data-residency requirement",
    "High daily volume where API fees exceed GPU cost",
    "A maintainer (managed by us or their DevOps)",
  ],
  hermesNo: [
    "Tiny VPS only — use cloud API",
    "Form→DB only — plain n8n",
    "Need zero-maintenance SLA — managed API",
    "Small SME, low queries — API is cheaper",
    "Strict audit needs — don’t default to uncensored",
  ],
  hermesUncensoredNote:
    "Uncensored variants are for internal R&D or signed waiver. Commercial default: official Qwen / mature tool-calling models with logging.",
  erpTitle: "ERP backend: client chooses",
  erpIntro: "“You pick the ERP backend; I connect n8n (and optional AI). Notion is one option.”",
  erpOptions: [
    { name: "Google Sheets", fit: "Tiny teams, Excel-native" },
    { name: "Airtable", fit: "Light CRM + inventory" },
    { name: "Baserow / NocoDB", fit: "Self-host, avoid SaaS lock-in" },
    { name: "Notion", fit: "Non-technical teams, polished UI" },
    { name: "ERPNext", fit: "Real inventory / accounting / PO" },
    { name: "PostgreSQL + Admin UI", fit: "Fully custom" },
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
      includes: "Up to 5 workflows, WhatsApp/email connections, SOP, and backup",
      bestFor: "Most HK SMEs after diagnosis",
      avoidWhen: "No ops owner; refuses diagnosis",
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
  faqTitle: "FAQ (same answers for SERP and sales)",
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
        { id: "ok", label: "Yes — cloud API OK" },
        { id: "private", label: "No — private/residency" },
      ],
    },
    {
      id: "volume",
      label: "5. Daily AI / query volume?",
      options: [
        { id: "low", label: "Low" },
        { id: "mid", label: "Medium" },
        { id: "high", label: "High (API would get expensive)" },
      ],
    },
    {
      id: "gpu",
      label: "6. GPU ~24GB+ or willing to rent?",
      options: [
        { id: "yes", label: "Yes" },
        { id: "no", label: "No" },
      ],
    },
    {
      id: "erpDepth",
      label: "7. Lite board vs real ERP?",
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
      title: "Recommendation: Automation Lite (or 14-day trial)",
      body: "Rules automation is enough. n8n + ERP of choice + 2 workflows. No Hermes/local model.",
    },
    trial: {
      title: "Recommendation: 14-day trial → Starter",
      body: "Low-risk pilot. Trial quoted after diagnosis, with credit toward Starter.",
    },
    starter: {
      title: "Recommendation: Starter (n8n + ERP)",
      body: "Default SME path. Prod n8n + chosen ERP + up to 5 workflows + adoption support.",
    },
    ai_api: {
      title: "Recommendation: Automation + AI (Cloud API)",
      body: "Need AI drafts/read-write without private GPU. Hermes (or equivalent) on cloud LLM.",
    },
    ai_gpu: {
      title: "Recommendation: Automation + AI (Private GPU)",
      body: "Only when privacy + volume + GPU align. Prefer official/tool-calling models; uncensored is not default.",
    },
  },
  erpHints: {
    wa_excel: "Start ERP with Google Sheets or Baserow.",
    notion: "Keep Notion if it already works — no forced migration.",
    sheets: "Sheets/Airtable fit Lite/Starter well.",
    other: "Pick ERP in diagnosis — Baserow/NocoDB/ERPNext are options.",
    real: "For real inventory/accounting, add ERPNext on top of Starter/AI.",
    lite: "Lite boards are enough — Notion/Baserow/Sheets are fine.",
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
