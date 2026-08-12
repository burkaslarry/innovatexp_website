import type { AppLocale } from "@/lib/i18n-routing";

export const HOMEPAGE_PLACEHOLDERS = {
  emailAddress: "info@innovatexp.co",
  linkedinUrl: "https://www.linkedin.com/in/innovatexp/",
} as const;

type SectionItem = {
  title: string;
  body: string;
};

type CaseStudy = {
  industry: string;
  title: string;
  before: string;
  sprint: string;
  after: string;
  metric: string;
};

type HomepageContent = {
  brandTitle: string;
  brandSubtitle: string;
  nav: {
    home: string;
    diagnosis: string;
    services: string;
    plans: string;
    cases: string;
    about: string;
    faq: string;
    cta: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    fitAudience: string;
    primaryCta: string;
    secondaryCta: string;
    trustPoints: string[];
    diagnosticInputs: string[];
    diagnosticOutput: string;
    diagnosticCaption: string;
    imageAlt: string;
  };
  problem: {
    eyebrow: string;
    title: string;
    items: SectionItem[];
    quote: string;
  };
  approach: {
    eyebrow: string;
    title: string;
    intro: string;
    steps: { label: string; title: string; body: string }[];
  };
  services: {
    eyebrow: string;
    title: string;
    items: SectionItem[];
  };
  consultancy: {
    eyebrow: string;
    title: string;
    intro: string;
    fitNote: string;
    startingBadge: string;
    plans: {
      name: string;
      body: string;
      deliverables: string[];
      cta: string;
    }[];
  };
  cases: {
    eyebrow: string;
    title: string;
    intro: string;
    beforeLabel: string;
    sprintLabel: string;
    afterLabel: string;
    metricLabel: string;
    items: CaseStudy[];
  };
  whyUs: {
    eyebrow: string;
    title: string;
    intro: string;
    rows: { opponent: string; difference: string }[];
    punchline: string;
  };
  about: {
    eyebrow: string;
    title: string;
    intro: string;
    body: string[];
    identity: string;
    portraitAlt: string;
  };
  faq: {
    title: string;
    items: { question: string; answer: string }[];
  };
  finalCta: {
    title: string;
    body: string;
    primary: string;
    secondary: string;
  };
  footer: {
    title: string;
    role: string;
    tagline: string;
    privacy: string;
    copyright: string;
  };
};

const zhHk: HomepageContent = {
  brandTitle: "InnovateXP Limited",
  brandSubtitle: "AI 商業顧問 Larry Lo",
  nav: {
    home: "首頁",
    diagnosis: "流程診斷",
    services: "服務方式",
    plans: "服務方案",
    cases: "行業實例",
    about: "關於 Larry",
    faq: "常見問題",
    cta: "預約 30 分鐘診斷",
  },
  hero: {
    eyebrow: "AI 商業顧問｜14+ 年 IT 交付及流程落地經驗",
    title: "幫香港小團隊止住漏單、慢報價同交接混亂。",
    description:
      "Larry 會先同你鎖定一條最影響收入或營運嘅流程，30 日內執清責任、SOP 同追蹤方式；需要時先接 CRM、AI 或自動化。",
    fitAudience: "適合香港 3–30 人培訓、課程及專業服務團隊",
    primaryCta: "預約 30 分鐘流程診斷",
    secondaryCta: "睇服務方案同起價",
    trustPoints: ["14+ 年 IT 交付經驗", "專注香港 3–30 人小團隊", "由流程診斷到實際落地"],
    diagnosticInputs: ["WhatsApp 查詢", "Excel 跟進表", "網上表單", "同事交接"],
    diagnosticOutput: "一條睇得清、跟得到、有人負責嘅 workflow",
    diagnosticCaption: "先睇清漏位，再決定 AI、CRM 或 automation 幫唔幫到手。",
    imageAlt: "InnovateXP 創辦人 Larry Lo 於演講分享 AI 商業升級與流程設計",
  },
  problem: {
    eyebrow: "流程卡位",
    title: "唔係你公司冇客，而係流程令你漏咗客。",
    items: [
      { title: "查詢散落", body: "WhatsApp、Excel、表單各自為政。" },
      { title: "報價慢", body: "資料要搵、要問、要等。" },
      { title: "交接亂", body: "無人清楚下一步由邊個跟。" },
      { title: "老闆救火", body: "一個人放假，條流程就停。" },
    ],
    quote: "一個人放假就停嘅流程，唔叫流程，叫人質。",
  },
  approach: {
    eyebrow: "服務方式",
    title: "唔係一開始叫你買系統。先睇清楚，邊條流程最值得執。",
    intro: "聚焦一條流程，而唔係大規模數碼轉型。先止血，再視乎情況接工具。",
    steps: [
      {
        label: "Step 1",
        title: "30 分鐘流程診斷",
        body: "鎖定最值得先處理的收入／營運卡位。",
      },
      {
        label: "Step 2",
        title: "30 日 Workflow Sprint",
        body: "交付流程圖、責任人、SOP、追蹤節點同一個可執行 quick win。",
      },
      {
        label: "Step 3",
        title: "Adoption & KPI Review",
        body: "協助團隊使用；Day 30／60／90 檢討漏跟進、報價時間、交接完成率。需要時先接 CRM、AI 或自動化。",
      },
    ],
  },
  services: {
    eyebrow: "服務範圍",
    title: "按你公司真正嘅問題，落最少但最有效嘅工具。",
    items: [
      { title: "Workflow Health Check", body: "找出漏單、慢報價、交接不清的流程漏洞。" },
      { title: "WhatsApp-first CRM", body: "將分散查詢變成可追蹤、有責任的跟進流程。" },
      { title: "AI Chatbot & Automation", body: "處理重複查詢、資料整理與日常行政。" },
      { title: "Event & Lead Follow-up", body: "將活動參加者變成可跟進的銷售機會。" },
      { title: "Team AI Enablement", body: "令團隊懂得在既有 SOP 裡安全、實際地使用 AI。" },
    ],
  },
  consultancy: {
    eyebrow: "主線方案",
    title: "陳生進來最先應該睇到嘅，只有呢條主線。",
    intro: "由 30 日驗證一條流程開始；再按需要升級到 3／6／12 個月陪跑。工具試用收埋二級頁，唔同主線搶注意力。",
    fitNote: "唔係賣你一套系統；係由流程診斷、落地、團隊採用到 KPI review，幫你將一條卡住收入嘅流程真正行順。",
    startingBadge: "建議起步",
    plans: [
      {
        name: "30 日 Discovery Sprint",
        body: "先驗證一條最影響收入或營運嘅流程。",
        deliverables: ["流程圖", "責任分工", "SOP／跟進節點", "簡單 KPI", "一個 quick win"],
        cta: "由 Sprint 開始",
      },
      {
        name: "3 個月 Foundation",
        body: "1–2 條流程落地、SOP v1、每月 checkpoint、一次團隊培訓。",
        deliverables: ["1–2 條流程", "SOP v1", "每月 checkpoint", "1 次團隊培訓"],
        cta: "了解 Foundation",
      },
      {
        name: "6 個月 Accelerator",
        body: "一個部門／3–4 條流程、adoption 追蹤、最多兩次工作坊。",
        deliverables: ["3–4 條流程", "Adoption 追蹤", "最多 2 次工作坊"],
        cta: "了解 Accelerator",
      },
      {
        name: "12 個月 Partnership",
        body: "年度 roadmap、SOP governance、管理層 review。",
        deliverables: ["年度 roadmap", "SOP governance", "管理層 review"],
        cta: "了解 Partnership",
      },
    ],
  },
  cases: {
    eyebrow: "行業實例",
    title: "同一套方法，喺唔同行業點樣落地。",
    intro: "以下係匿名情境（Before → 30 日做法 → After → 可觀察指標）。未經驗證數字唔作 ROI 承諾。",
    beforeLabel: "Before",
    sprintLabel: "30 日做法",
    afterLabel: "After",
    metricLabel: "可觀察指標",
    items: [
      {
        industry: "培訓／課程",
        title: "報名查詢散喺 WhatsApp，跟進靠記性",
        before: "查詢、試堂、報名、收款各自用唔同 chat 同 Excel；同事放假就唔知跟到邊。",
        sprint: "鎖定「查詢 → 試堂 → 報名」一條線；寫清責任人、跟進節點同簡單狀態表。",
        after: "每條查詢有 owner 同下一步；老闆唔使逐日追住問。",
        metric: "漏跟進明顯減少；報名轉換可喺一頁睇到。",
      },
      {
        industry: "專業服務",
        title: "報價慢、版本多、交接靠口頭",
        before: "報價資料要問完先出；同事各自有一份「最新版」；客人催完先發現漏跟。",
        sprint: "執清報價資料來源、責任同審批節點；固定一個可追蹤清單。",
        after: "報價有標準節奏；交接唔再靠口頭。",
        metric: "平均報價時間縮短；重覆問資料次數下降。",
      },
      {
        industry: "Studio 行業（方法實例）",
        title: "排程／收款／出勤靠 WhatsApp + Excel",
        before: "教練記堂、催未付、對佣金各用各方法；Admin 日日救火。",
        sprint: "用同一套「先執流程再落工具」方法：責任、狀態、reminder、匯出對數。",
        after: "排程、學員狀態、付款 reminder 集中一處；唔再靠記性頂住 studio。",
        metric: "未付追蹤有提醒；出勤／佣金對數可匯出。",
      },
    ],
  },
  whyUs: {
    eyebrow: "點解揀 Larry",
    title: "大部分人賣工具，部分人賣建議。我先執順流程。",
    intro: "對比式差異化——講客戶利益，唔講內部產品策略。",
    rows: [
      { opponent: "管理顧問（交報告就走）", difference: "我建到、接到、帶團隊用到" },
      { opponent: "SaaS 供應商（賣 licence）", difference: "我可以告訴你唔需要買" },
      { opponent: "自動化／AI freelancer（接 job）", difference: "我先問商業問題，先提工具" },
      { opponent: "大型 IT 公司（六位數項目）", difference: "HK$6,800 先試一條流程，風險極低" },
    ],
    punchline: "如果你唔需要系統，我會直接告訴你。",
  },
  about: {
    eyebrow: "關於 Larry",
    title: "我係那個會叫你「先唔好買」嘅顧問。",
    intro: "做了十多年 IT 交付，我見過最多嘅失敗，唔係系統建唔好，而係系統建好了、完美交付、然後唔好使。",
    body: [
      "同一班人照舊用 WhatsApp、照舊開 Excel，沒人肯講。",
      "後來我睇回頭，發現問題從來唔係工具——係本來那條流程就沒人真正執清過。SOP 只存在老闆嘅腦裏，一個人放假就斷。",
      "所以我轉了整個做法：先同你執順一條流程，真係有效、團隊真係用緊，才談要唔要加 AI 或系統。",
    ],
    identity: "我係那個會叫你「先唔好買」嘅顧問。",
    portraitAlt: "Larry Lo 於研討會分享 AI 商業顧問與客戶管理流程",
  },
  faq: {
    title: "常見問題",
    items: [
      { question: "我哋而家係咪適合用 AI？", answer: "未必一開始就要。通常先揀一條最影響收入或營運嘅流程，睇清楚先，再決定係咪值得加 AI。" },
      { question: "一定要先買 CRM 嗎？", answer: "唔一定。先理順責任、交接、跟進節奏；如果現有工具已經夠，就未必需要即刻換系統。" },
      { question: "要幾耐先見到改善？", answer: "通常由一條流程開始，先見到可觀察嘅改善，再決定要唔要擴大。唔會一開始就做全公司 overhaul。" },
      { question: "同事唔慣用新系統點算？", answer: "Adoption 同 ownership 同工具一樣重要。做法會盡量貼近你團隊而家嘅工作方式，減少硬推。" },
      { question: "30 分鐘流程診斷會做咩？", answer: "會集中睇一條最卡嘅流程，找出漏位、責任不清位、同最值得先執嘅位置。" },
      { question: "公司好細，值得做嗎？", answer: "如果一個人放假就會卡住，通常就值得做。小團隊更加需要先整理一條核心流程。主線由 HK$6,800 嘅 30 日 Sprint 起步，風險可控。" },
      { question: "服務方案點樣起步？", answer: "主線：30 日 Discovery Sprint（HK$6,800）→ 3 個月 Foundation（HK$26,000）→ 6 個月 Accelerator（HK$50,000）→ 12 個月 Partnership（HK$98,000）。工具試用唔係首頁主打。" },
    ],
  },
  finalCta: {
    title: "想知道你公司邊條流程最值得先執？",
    body: "預約 30 分鐘流程診斷，找出你公司最容易漏單、慢報價或卡交接的一條流程。",
    primary: "預約 30 分鐘流程診斷",
    secondary: "WhatsApp 聯絡 Larry",
  },
  footer: {
    title: "Larry Lo / InnovateXP",
    role: "AI 商業顧問",
    tagline: "先執順流程，再落地 AI",
    privacy: "Privacy Policy",
    copyright: "© 2026 InnovateXP Limited. All rights reserved.",
  },
};

const zhTw: HomepageContent = {
  ...zhHk,
  hero: {
    ...zhHk.hero,
    title: "幫香港小團隊止住漏單、慢報價與交接混亂。",
    description:
      "Larry 會先同你鎖定一條最影響收入或營運的流程，30 日內釐清責任、SOP 與追蹤方式；需要時才接 CRM、AI 或自動化。",
    fitAudience: "適合香港 3–30 人培訓、課程及專業服務團隊",
  },
  about: {
    ...zhHk.about,
    intro: "做了十多年 IT 交付，我見過最多的失敗，不是系統建不好，而是系統建好了、完美交付、然後不好用。",
    body: [
      "同一班人照舊用 WhatsApp、照舊開 Excel，沒人肯講。",
      "後來我回頭看，發現問題從來不是工具——是本來那條流程就沒人真正釐清過。SOP 只存在老闆的腦裏，一個人請假就斷。",
      "所以我轉了整個做法：先同你釐清一條流程，真的有效、團隊真的在用，才談要不要加 AI 或系統。",
    ],
    identity: "我是那個會叫你「先不要買」的顧問。",
  },
  faq: {
    ...zhHk.faq,
    items: [
      { question: "我們現在適合用 AI 嗎？", answer: "不一定一開始就要。通常先選一條最影響收入或營運的流程，看清楚後，再決定是否值得加 AI。" },
      { question: "一定要先買 CRM 嗎？", answer: "不一定。先理順責任、交接、跟進節奏；如果現有工具已經足夠，就不必立刻換系統。" },
      { question: "要多久才看得到改善？", answer: "通常由一條流程開始，先看到可觀察的改善，再決定要不要擴大。不會一開始就做全公司 overhaul。" },
      { question: "同事不習慣新系統怎麼辦？", answer: "Adoption 和 ownership 跟工具一樣重要。做法會盡量貼近團隊現在的工作方式，減少硬推。" },
      { question: "30 分鐘流程診斷會做什麼？", answer: "會集中看一條最卡的流程，找出漏點、責任不清處，以及最值得先整理的位置。" },
      { question: "公司很小，值得做嗎？", answer: "如果一個人請假就會卡住，通常就值得做。小團隊更需要先整理一條核心流程。主線由 HK$6,800 的 30 日 Sprint 起步，風險可控。" },
      { question: "服務方案怎麼起步？", answer: "主線：30 日 Discovery Sprint（HK$6,800）→ 3 個月 Foundation（HK$26,000）→ 6 個月 Accelerator（HK$50,000）→ 12 個月 Partnership（HK$98,000）。工具試用不是首頁主打。" },
    ],
  },
};

const en: HomepageContent = {
  brandTitle: "InnovateXP Limited",
  brandSubtitle: "AI Business Consultant Larry Lo",
  nav: {
    home: "Home",
    diagnosis: "Diagnosis",
    services: "Approach",
    plans: "Programs",
    cases: "Industry examples",
    about: "About Larry",
    faq: "FAQ",
    cta: "Book a 30-min diagnosis",
  },
  hero: {
    eyebrow: "AI Business Consultant | 14+ years in IT delivery and workflow implementation",
    title: "Stop leaked leads, slow quotes, and messy handoffs for Hong Kong small teams.",
    description:
      "Larry locks onto the one workflow hurting revenue or operations most, then clarifies ownership, SOP, and tracking within 30 days — CRM, AI, or automation only when justified.",
    fitAudience: "Built for Hong Kong training, course, and professional-service teams of 3–30 people",
    primaryCta: "Book a 30-minute workflow diagnosis",
    secondaryCta: "See programs and starting price",
    trustPoints: ["14+ years of delivery experience", "Focused on Hong Kong teams of 3–30", "From diagnosis to practical implementation"],
    diagnosticInputs: ["WhatsApp enquiries", "Spreadsheet tracker", "Web form", "Team handoff"],
    diagnosticOutput: "One visible workflow with clear ownership",
    diagnosticCaption: "Fix the leak first. Then decide whether AI, CRM, or automation is justified.",
    imageAlt: "Founder-led presentation on AI business upgrade and workflow design",
  },
  problem: {
    eyebrow: "Pain points",
    title: "The issue is rarely a lack of leads. It is the workflow leaking them.",
    items: [
      { title: "Scattered enquiries", body: "WhatsApp, spreadsheets, and forms all run separately." },
      { title: "Slow quotations", body: "People need to search, ask, and wait." },
      { title: "Messy handoffs", body: "No one knows clearly who owns the next step." },
      { title: "Owner firefighting", body: "One person on leave and the workflow stalls." },
    ],
    quote: "If one person takes leave and the process stops, that is not a process. That is a hostage situation.",
  },
  approach: {
    eyebrow: "Approach",
    title: "No system pitch first. First see which workflow is worth fixing.",
    intro: "One workflow at a time — not a company-wide digital transformation.",
    steps: [
      { label: "Step 1", title: "30-minute workflow diagnosis", body: "Lock onto the revenue or operations bottleneck worth fixing first." },
      { label: "Step 2", title: "30-day Workflow Sprint", body: "Deliver process map, owners, SOP, tracking points, and one executable quick win." },
      { label: "Step 3", title: "Adoption & KPI review", body: "Help the team use it. Review missed follow-ups, quote time, and handoff completion on Day 30 / 60 / 90. Add CRM, AI, or automation only when needed." },
    ],
  },
  services: {
    eyebrow: "Service areas",
    title: "Use the least tool needed to solve the real business problem.",
    items: [
      { title: "Workflow Health Check", body: "Find leakage in follow-up, slow quotations, and unclear handoffs." },
      { title: "WhatsApp-first CRM", body: "Turn scattered enquiries into a traceable follow-up workflow." },
      { title: "AI Chatbot & Automation", body: "Handle repetitive enquiries, data sorting, and admin work." },
      { title: "Event & Lead Follow-up", body: "Turn event attendees into visible sales opportunities." },
      { title: "Team AI Enablement", body: "Help the team use AI safely and practically inside existing SOPs." },
    ],
  },
  consultancy: {
    eyebrow: "Main programs",
    title: "The only path a serious buyer should see first.",
    intro: "Start by validating one workflow in 30 days, then expand to 3 / 6 / 12 months. Tool trials stay on secondary pages.",
    fitNote: "Not selling you a system first — diagnosis, implementation, adoption, and KPI review until one revenue-blocking workflow actually runs.",
    startingBadge: "Recommended start",
    plans: [
      {
        name: "30-day Discovery Sprint",
        body: "Validate one workflow that affects revenue or operations.",
        deliverables: ["Process map", "Ownership", "SOP / follow-up nodes", "Simple KPI", "One quick win"],
        cta: "Start with Sprint",
      },
      {
        name: "3-month Foundation",
        body: "Land 1–2 workflows, SOP v1, monthly checkpoints, one team training.",
        deliverables: ["1–2 workflows", "SOP v1", "Monthly checkpoints", "1 team training"],
        cta: "See Foundation",
      },
      {
        name: "6-month Accelerator",
        body: "One department / 3–4 workflows, adoption tracking, up to two workshops.",
        deliverables: ["3–4 workflows", "Adoption tracking", "Up to 2 workshops"],
        cta: "See Accelerator",
      },
      {
        name: "12-month Partnership",
        body: "Annual roadmap, SOP governance, management reviews.",
        deliverables: ["Annual roadmap", "SOP governance", "Management reviews"],
        cta: "See Partnership",
      },
    ],
  },
  cases: {
    eyebrow: "Industry examples",
    title: "The same method, applied in different industries.",
    intro: "Anonymous scenarios (Before → 30-day approach → After → observable metric). No unverified ROI claims.",
    beforeLabel: "Before",
    sprintLabel: "30-day approach",
    afterLabel: "After",
    metricLabel: "Observable metric",
    items: [
      {
        industry: "Training / courses",
        title: "Enrolment enquiries scattered across WhatsApp",
        before: "Enquiry, trial class, enrolment, and payment lived in different chats and sheets; leave days broke continuity.",
        sprint: "Locked onto enquiry → trial → enrolment; clarified owners, follow-up nodes, and a simple status board.",
        after: "Every enquiry has an owner and next step; the owner stops chasing daily updates.",
        metric: "Fewer missed follow-ups; enrolment conversion visible on one page.",
      },
      {
        industry: "Professional services",
        title: "Slow quotes, many versions, verbal handoffs",
        before: "Quotes waited on missing data; each colleague had a different “latest” version; reminders exposed missed follow-ups.",
        sprint: "Clarified quote inputs, ownership, and approval nodes; one trackable checklist.",
        after: "Quotes follow a standard rhythm; handoffs are no longer verbal-only.",
        metric: "Shorter average quote time; fewer repeat data requests.",
      },
      {
        industry: "Studio industry (method example)",
        title: "Schedule / payments / attendance on WhatsApp + Excel",
        before: "Coaches tracked classes, unpaid students, and commissions differently; admins firefought daily.",
        sprint: "Applied the same “fix workflow, then tools” method: ownership, status, reminders, export reconciliation.",
        after: "Schedule, student status, and payment reminders live in one place — memory no longer runs the studio.",
        metric: "Unpaid follow-up has reminders; attendance / commission export is possible.",
      },
    ],
  },
  whyUs: {
    eyebrow: "Why Larry",
    title: "Most people sell tools. Some sell advice. I fix the workflow first.",
    intro: "Contrast for client benefit — not internal product strategy language.",
    rows: [
      { opponent: "Management consultants (report and leave)", difference: "I build, connect, and help the team adopt" },
      { opponent: "SaaS vendors (sell licences)", difference: "I can tell you not to buy" },
      { opponent: "Automation / AI freelancers (take jobs)", difference: "I ask the business question before naming tools" },
      { opponent: "Large IT firms (six-figure projects)", difference: "HK$6,800 to try one workflow — low risk" },
    ],
    punchline: "If you do not need a system, I will tell you directly.",
  },
  about: {
    eyebrow: "About Larry",
    title: "I am the consultant who may tell you not to buy yet.",
    intro: "After more than a decade in IT delivery, the failure I saw most was not bad builds — it was perfect delivery that nobody used.",
    body: [
      "The same people kept using WhatsApp and Excel, and nobody said so out loud.",
      "Looking back, the problem was rarely the tool — the workflow itself had never been clarified. The SOP lived only in the owner’s head, so one leave day broke everything.",
      "So I changed the approach: fix one workflow first until it works and the team actually uses it — then talk about AI or systems.",
    ],
    identity: "I am the consultant who may tell you not to buy yet.",
    portraitAlt: "Larry Lo speaking about AI business consulting and client workflow design",
  },
  faq: {
    title: "FAQ",
    items: [
      { question: "Are we ready for AI now?", answer: "Not every team should start with AI immediately. Start with one workflow and decide based on real operational value." },
      { question: "Do we need a CRM first?", answer: "Not always. Ownership, handoff clarity, and follow-up rhythm usually come before buying a new system." },
      { question: "How quickly can we see improvement?", answer: "Usually by focusing on one workflow first. We do not start with a company-wide overhaul." },
      { question: "What if the team resists a new system?", answer: "Adoption matters as much as the tool. The workflow and handoff design must fit how the team actually works." },
      { question: "What happens in the 30-minute diagnosis?", answer: "We focus on one workflow, identify leakage and ownership gaps, and decide what is worth fixing first." },
      { question: "We are a very small company. Is it still worth doing?", answer: "Yes, especially when one absence can stall the whole workflow. The main path starts at HK$6,800 for a 30-day Sprint." },
      { question: "How do the programs start?", answer: "Main path: 30-day Discovery Sprint (HK$6,800) → 3-month Foundation (HK$26,000) → 6-month Accelerator (HK$50,000) → 12-month Partnership (HK$98,000). Tool trials are not the homepage headline." },
    ],
  },
  finalCta: {
    title: "Want to know which workflow your company should fix first?",
    body: "Book a 30-minute workflow diagnosis and find the one process most likely to leak leads, slow quotes, or stall handoffs.",
    primary: "Book a 30-minute workflow diagnosis",
    secondary: "WhatsApp Larry",
  },
  footer: {
    title: "Larry Lo / InnovateXP",
    role: "AI Business Consultant",
    tagline: "Fix the workflow first. Then make AI work.",
    privacy: "Privacy Policy",
    copyright: "© 2026 InnovateXP Limited. All rights reserved.",
  },
};

const ja: HomepageContent = { ...en };
const de: HomepageContent = { ...en };

const byLocale: Record<AppLocale, HomepageContent> = {
  en,
  "zh-hk": zhHk,
  "zh-tw": zhTw,
  ja,
  de,
};

export function getHomepageContent(locale: AppLocale): HomepageContent {
  return byLocale[locale] ?? zhHk;
}
