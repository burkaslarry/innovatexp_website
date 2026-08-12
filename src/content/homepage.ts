import type { AppLocale } from "@/lib/i18n-routing";

export const HOMEPAGE_PLACEHOLDERS = {
  emailAddress: "info@innovatexp.co",
  linkedinUrl: "https://www.linkedin.com/in/innovatexp/",
} as const;

type SectionItem = {
  title: string;
  body: string;
};

type HomepageContent = {
  brandTitle: string;
  brandSubtitle: string;
  nav: {
    home: string;
    diagnosis: string;
    services: string;
    flagship: string;
    cases: string;
    about: string;
    faq: string;
    cta: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
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
  flagshipProducts: {
    eyebrow: string;
    title: string;
    intro: string;
    flowLabels: {
      intro: string;
      benefits: string;
      features: string;
    };
    account: {
      name: string;
      audience: string;
      intro: string;
      benefits: string[];
      features: string[];
      cta: string;
      videoSubtitles: [string, ...string[]];
      videoCaptions: [string, ...string[]];
    };
    fitness: {
      name: string;
      audience: string;
      intro: string;
      benefits: string[];
      features: string[];
      cta: string;
      videoSubtitles: [string, string];
      videoCaptions: [string, string];
    };
  };
  beforeAfter: {
    eyebrow: string;
    title: string;
    beforeTitle: string;
    afterTitle: string;
    before: string[];
    after: string[];
  };
  about: {
    eyebrow: string;
    title: string;
    intro: string;
    body: string[];
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
  brandSubtitle: "AI 商務顧問 Larry Lo",
  nav: {
    home: "首頁",
    diagnosis: "流程診斷",
    services: "服務方式",
    flagship: "皇牌產品",
    cases: "案例方向",
    about: "關於 Larry",
    faq: "常見問題",
    cta: "預約 30 分鐘診斷",
  },
  hero: {
    eyebrow: "AI 商務顧問｜14+ 年 IT 交付及流程落地經驗",
    title: "幫香港小團隊執順一條流程，\n先止血，再落 AI。",
    description:
      "查詢散喺 WhatsApp、Excel 同不同同事手上？我會先同你找出最影響收入或營運嘅流程漏洞，再用合適嘅 SOP、KPI、CRM、AI 或自動化方法落地。",
    primaryCta: "預約 30 分鐘流程診斷",
    secondaryCta: "了解 Workflow Health Check",
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
    intro: "Diagnose → Simplify → Implement。先止住漏單，再決定工具。",
    steps: [
      {
        label: "Step 1",
        title: "30 分鐘流程診斷",
        body: "找出最影響收入或營運的一個卡位。",
      },
      {
        label: "Step 2",
        title: "Workflow Health Check / 30 日 Sprint",
        body: "整理現況、責任、SOP、KPI 和 quick wins。",
      },
      {
        label: "Step 3",
        title: "落地與 Adoption",
        body: "按需要才導入 CRM、AI、自動化、活動系統或會計工具，並協助團隊實際採用。",
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
  flagshipProducts: {
    eyebrow: "皇牌產品",
    title: "流程執順之後，用月費 SaaS 真正幫你頂住日常營運。",
    intro: "先講俾對象聽：Accounting / HR 同 Fitness Coach / Gym Studio 老闆，各自面對唔同痛點。下面係系統介紹、帶來好處，同附帶功能同使用體驗。",
    flowLabels: {
      intro: "系統介紹",
      benefits: "帶來好處",
      features: "功能與體驗",
    },
    account: {
      name: "AccountXP",
      audience: "Accounting · HR · 行政",
      intro:
        "AccountXP 係 Telegram／WhatsApp 收據助手：影相或上傳 PDF／JPG／PNG，bot 自動存入 batch；send `/export` 就生成財務報表 spreadsheet，含日期、分類、金額、幣種同原檔連結。",
      benefits: [
        "唔使再逐張 receipt 人手 key Excel，月尾對數快好多。",
        "支援多幣種（HKD、USD、CNY 等），適合有跨境支出嘅公司。",
        "收據集中一個 chat，HR／Accounting 同老闆都睇到同一版本。",
        "由 upload → 分類 → export，一條 flow 頂住日常行政。",
      ],
      features: [
        "Telegram bot 上傳收據（PDF／JPG／PNG／WEBP 等）",
        "Batch 暫存 + `/export` 一鍵出財務報表",
        "Payment Date · Category · Amount · Currency · Reference File",
        "WhatsApp 收條 upload（按需要接入）",
        "加密儲存 · 按 scope 做 OCR",
      ],
      cta: "了解 AccountXP 月費方案",
      videoSubtitles: ["Telegram 上傳收據 → batch → /export 出報表"],
      videoCaptions: ["示範：upload 收據 → 存入 batch → /export 生成 financial statement"],
    },
    fitness: {
      name: "FitnessXP",
      audience: "Fitness Coach · Gym Studio 老闆",
      intro:
        "FitnessXP 係 mobile-first 教練／studio 工作台：排程、學員、報課、付款、出勤一個 app 搞掂；Coach 用週／月曆睇堂，Admin 管帳號權限，系統自動提醒未付學員。",
      benefits: [
        "Coach 唔使再靠 WhatsApp + Excel 記堂同收款，一個畫面睇晒今日 schedule。",
        "未付學員有 reminder，減少漏追、減少老闆親自催數。",
        "出勤可 export Excel，方便對 coach 佣金同 studio payroll。",
        "Admin／Coach／Clerk 分權，studio 大咗都唔亂。",
      ],
      features: [
        "教練工作台：週曆／月曆排程（Google Calendar 式）",
        "學員 CRM · 報課 · 已付／未付狀態",
        "WhatsApp 付款 reminder",
        "出勤記錄 · 一對一／小班／瑜珈等分類",
        "系統帳號：Admin · Coach · Clerk · 重設密碼／停用",
        "匯出 Excel 做 payroll / 對數",
      ],
      cta: "了解 FitnessXP 月費方案",
      videoSubtitles: ["系統帳號 · 權限管理", "教練工作台 · 排程 · 出勤 · 匯出"],
      videoCaptions: [
        "示範：Admin 管理 Coach／Clerk 帳號同權限",
        "示範：Coach 排程、學員跟進、出勤匯出 Excel",
      ],
    },
  },
  beforeAfter: {
    eyebrow: "Before → After",
    title: "由「日日追、日日問」，變成「睇到、跟到、交到」。",
    beforeTitle: "Before",
    afterTitle: "After",
    before: [
      "WhatsApp / Excel / 紙仔 / 不同同事各自記錄",
      "狀態唔清楚",
      "跟進容易漏",
      "老闆日日追住每個人",
    ],
    after: [
      "一條睇得見嘅 workflow",
      "下一步清楚",
      "有人負責",
      "進度可量度",
      "唔再靠記性頂住公司運作",
    ],
  },
  about: {
    eyebrow: "關於 Larry",
    title: "我唔係淨係建議你用 AI。我會幫你執到真係行到。",
    intro: "我係 Larry Lo，做過十多年 IT 交付、產品及流程落地。",
    body: [
      "我見過太多中小企唔係冇客，而係查詢散喺 WhatsApp、Excel、表單同不同同事手上，最後漏咗跟進、慢咗報價，老闆日日救火。",
      "所以 InnovateXP 的方法係：先幫你執順一條真正影響收入或營運的流程，再視乎情況用 CRM、會計工具、活動系統或自動化去落地。",
    ],
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
      { question: "公司好細，值得做嗎？", answer: "如果一個人放假就會卡住，通常就值得做。小團隊更加需要先整理一條核心流程。" },
    ],
  },
  finalCta: {
    title: "想知道你公司邊條流程最值得先執？",
    body: "預約 30 分鐘流程診斷，一齊睇下邊個位最容易漏單、卡住交接，或者令你日日救火。",
    primary: "預約 30 分鐘流程診斷",
    secondary: "WhatsApp 聯絡 Larry",
  },
  footer: {
    title: "Larry Lo / InnovateXP",
    role: "AI 商務顧問",
    tagline: "先執順流程，再落地 AI",
    privacy: "Privacy Policy",
    copyright: "© 2026 InnovateXP Limited. All rights reserved.",
  },
};

const zhTw: HomepageContent = {
  ...zhHk,
  nav: {
    ...zhHk.nav,
    flagship: "皇牌產品",
  },
  hero: {
    ...zhHk.hero,
    title: "幫香港小團隊梳理一條流程，\n先止血，再落 AI。",
  },
  flagshipProducts: {
    ...zhHk.flagshipProducts,
    intro: "先講給對象聽：Accounting / HR 與 Fitness Coach / Gym Studio 老闆，各自面對不同痛點。下面是系統介紹、帶來好處，以及附帶功能與使用體驗。",
    account: {
      ...zhHk.flagshipProducts.account,
      intro:
        "AccountXP 是 Telegram／WhatsApp 收據助手：拍照或上傳 PDF／JPG／PNG，bot 自動存入 batch；send `/export` 就生成財務報表 spreadsheet，含日期、分類、金額、幣別與原檔連結。",
      benefits: [
        "不必再逐張 receipt 人工 key Excel，月底對帳快很多。",
        "支援多幣別（HKD、USD、CNY 等），適合有跨境支出的公司。",
        "收據集中一個 chat，HR／Accounting 與老闆都看到同一版本。",
        "由 upload → 分類 → export，一條 flow 撐住日常行政。",
      ],
      cta: "了解 AccountXP 月費方案",
    },
    fitness: {
      ...zhHk.flagshipProducts.fitness,
      intro:
        "FitnessXP 是 mobile-first 教練／studio 工作台：排程、學員、報課、付款、出勤一個 app 搞定；Coach 用週／月曆看堂，Admin 管帳號權限，系統自動提醒未付學員。",
      benefits: [
        "Coach 不必再靠 WhatsApp + Excel 記堂與收款，一個畫面看完整日 schedule。",
        "未付學員有 reminder，減少漏追、減少老闆親自催款。",
        "出勤可 export Excel，方便對 coach 佣金與 studio payroll。",
        "Admin／Coach／Clerk 分權，studio 大了也不亂。",
      ],
      cta: "了解 FitnessXP 月費方案",
    },
  },
  about: {
    ...zhHk.about,
    intro: "我是 Larry Lo，做過十多年 IT 交付、產品及流程落地。",
  },
  faq: {
    ...zhHk.faq,
    items: [
      { question: "我們現在適合用 AI 嗎？", answer: "不一定一開始就要。通常先選一條最影響收入或營運的流程，看清楚後，再決定是否值得加 AI。" },
      { question: "一定要先買 CRM 嗎？", answer: "不一定。先理順責任、交接、跟進節奏；如果現有工具已經足夠，就不必立刻換系統。" },
      { question: "要多久才看得到改善？", answer: "通常由一條流程開始，先看到可觀察的改善，再決定要不要擴大。不會一開始就做全公司 overhaul。" },
      { question: "同事不習慣新系統怎麼辦？", answer: "Adoption 和 ownership 跟工具一樣重要。做法會盡量貼近團隊現在的工作方式，減少硬推。" },
      { question: "30 分鐘流程診斷會做什麼？", answer: "會集中看一條最卡的流程，找出漏點、責任不清處，以及最值得先整理的位置。" },
      { question: "公司很小，值得做嗎？", answer: "如果一個人請假就會卡住，通常就值得做。小團隊更需要先整理一條核心流程。" },
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
    flagship: "Flagship SaaS",
    cases: "Use Cases",
    about: "About Larry",
    faq: "FAQ",
    cta: "Book a 30-min diagnosis",
  },
  hero: {
    eyebrow: "AI Business Consultant | 14+ years in IT delivery and workflow implementation",
    title: "Fix one messy workflow first.\nThen make AI work.",
    description:
      "Enquiries scattered across WhatsApp, Excel, forms, and different colleagues? Larry helps SMEs find the workflow leak first, then land the right SOP, KPI, CRM, AI, or automation change.",
    primaryCta: "Book a 30-minute workflow diagnosis",
    secondaryCta: "See Workflow Health Check",
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
    intro: "Diagnose → Simplify → Implement.",
    steps: [
      { label: "Step 1", title: "30-minute workflow diagnosis", body: "Find the one bottleneck hurting revenue or operations most." },
      { label: "Step 2", title: "Workflow Health Check / 30-day Sprint", body: "Clarify the current state, ownership, SOP, KPI, and quick wins." },
      { label: "Step 3", title: "Implementation and adoption", body: "Only then bring in CRM, AI, automation, event systems, or accounting tools when justified." },
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
  flagshipProducts: {
    eyebrow: "Flagship products",
    title: "After the workflow is clear, monthly SaaS keeps daily operations running.",
    intro:
      "Pitch to the right audience first: accounting / HR teams and fitness coaches / gym studio owners face different bottlenecks. Below: system intro, benefits, and the features you get.",
    flowLabels: {
      intro: "System intro",
      benefits: "Benefits",
      features: "Features & experience",
    },
    account: {
      name: "AccountXP",
      audience: "Accounting · HR · Admin",
      intro:
        "AccountXP is a Telegram / WhatsApp receipt assistant. Snap or upload PDF / JPG / PNG receipts; the bot batches them; send `/export` to generate a financial spreadsheet with date, category, amount, currency, and file reference.",
      benefits: [
        "Stop re-keying receipts into Excel — month-end reconciliation gets much faster.",
        "Multi-currency support (HKD, USD, CNY, etc.) for cross-border expenses.",
        "One chat thread for receipts so accounting, HR, and the owner share one truth.",
        "Upload → classify → export in one flow for daily admin.",
      ],
      features: [
        "Telegram bot receipt upload (PDF / JPG / PNG / WEBP, etc.)",
        "Batch queue + `/export` financial statement",
        "Payment Date · Category · Amount · Currency · Reference File",
        "WhatsApp receipt upload (when wired)",
        "Encrypted storage · OCR per scope",
      ],
      cta: "See AccountXP monthly plan",
      videoSubtitles: ["Telegram upload → batch → /export report"],
      videoCaptions: ["Demo: upload receipts → batch → /export financial statement"],
    },
    fitness: {
      name: "FitnessXP",
      audience: "Fitness Coach · Gym Studio Owner",
      intro:
        "FitnessXP is a mobile-first coach / studio workbench: schedule, students, enrolment, payments, and attendance in one app. Coaches use week / month views; admins manage roles; the system nudges unpaid students.",
      benefits: [
        "Coaches stop juggling WhatsApp + Excel for classes and payments — one screen for today’s schedule.",
        "Payment reminders for unpaid students — less chasing, less owner firefighting.",
        "Export attendance to Excel for coach commissions and studio payroll.",
        "Admin / Coach / Clerk roles so the studio stays organised as it grows.",
      ],
      features: [
        "Coach workbench: week / month schedule (Google Calendar style)",
        "Student CRM · enrolment · paid / unpaid status",
        "WhatsApp payment reminders",
        "Attendance · 1-on-1 / small group / yoga categories",
        "System accounts: Admin · Coach · Clerk · reset / deactivate",
        "Export Excel for payroll / reconciliation",
      ],
      cta: "See FitnessXP monthly plan",
      videoSubtitles: ["System accounts · permissions", "Coach workbench · schedule · attendance export"],
      videoCaptions: [
        "Demo: admin manages coach / clerk accounts and permissions",
        "Demo: coach schedule, student follow-up, attendance Excel export",
      ],
    },
  },
  beforeAfter: {
    eyebrow: "Before → After",
    title: "From chasing and asking every day to seeing, following, and handing over clearly.",
    beforeTitle: "Before",
    afterTitle: "After",
    before: [
      "WhatsApp, Excel, paper notes, and disconnected staff",
      "Unclear status",
      "Missed follow-up",
      "Owner chasing everyone",
    ],
    after: [
      "One visible workflow",
      "Clear next action",
      "Assigned owner",
      "Measurable progress",
      "Less dependence on memory",
    ],
  },
  about: {
    eyebrow: "About Larry",
    title: "I do not just suggest AI. I help the workflow run in real life.",
    intro: "I am Larry Lo. I have spent more than a decade in IT delivery, product work, and workflow implementation.",
    body: [
      "Many SMEs do not have a lead problem. Their enquiries are scattered across WhatsApp, spreadsheets, forms, and different colleagues, so follow-up gets missed and quotations slow down.",
      "That is why InnovateXP starts by fixing one workflow that affects revenue or operations, then uses CRM, accounting tools, event systems, or automation only when the case is clear.",
    ],
    portraitAlt: "Larry Lo 於研討會分享 AI 商業顧問與客戶管理流程",
  },
  faq: {
    title: "FAQ",
    items: [
      { question: "Are we ready for AI now?", answer: "Not every team should start with AI immediately. Start with one workflow and decide based on real operational value." },
      { question: "Do we need a CRM first?", answer: "Not always. Ownership, handoff clarity, and follow-up rhythm usually come before buying a new system." },
      { question: "How quickly can we see improvement?", answer: "Usually by focusing on one workflow first. We do not start with a company-wide overhaul." },
      { question: "What if the team resists a new system?", answer: "Adoption matters as much as the tool. The workflow and handoff design must fit how the team actually works." },
      { question: "What happens in the 30-minute diagnosis?", answer: "We focus on one workflow, identify leakage and ownership gaps, and decide what is worth fixing first." },
      { question: "We are a very small company. Is it still worth doing?", answer: "Yes, especially when one absence can stall the whole workflow." },
    ],
  },
  finalCta: {
    title: "Want to know which workflow your company should fix first?",
    body: "Book a 30-minute workflow diagnosis and review where leads leak, handoffs stall, or the owner ends up firefighting every day.",
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

const ja: HomepageContent = {
  ...en,
  nav: { ...en.nav, flagship: "主力プロダクト" },
  flagshipProducts: {
    eyebrow: "主力プロダクト",
    title: "ワークフローを整理した後、月額SaaSで日常業務を支えます。",
    intro:
      "まず対象者に語りかけます：経理／HRチームとフィットネスコーチ／ジムスタジオオーナーでは課題が異なります。以下はシステム紹介、メリット、機能と体験です。",
    flowLabels: {
      intro: "システム紹介",
      benefits: "メリット",
      features: "機能と体験",
    },
    account: {
      name: "AccountXP",
      audience: "経理 · HR · 管理",
      intro:
        "AccountXPはTelegram／WhatsAppの領収書アシスタントです。PDF／JPG／PNGをアップロードするとbotがバッチ保存し、`/export`で日付・カテゴリ・金額・通貨・参照ファイル付きの財務スプレッドシートを生成します。",
      benefits: [
        "領収書をExcelに手入力する手間を削減し、月末の照合を高速化。",
        "HKD・USD・CNYなど多通貨に対応。",
        "領収書を1つのチャットに集約し、経理・HR・オーナーが同じ情報を共有。",
        "アップロード→分類→エクスポートの一連フローで日常管理を支援。",
      ],
      features: [
        "Telegram botで領収書アップロード（PDF／JPG／PNG／WEBP等）",
        "バッチキュー + `/export` 財務レポート",
        "Payment Date · Category · Amount · Currency · Reference File",
        "WhatsApp領収書アップロード（接続時）",
        "暗号化保存 · スコープに応じたOCR",
      ],
      cta: "AccountXP月額プランを見る",
      videoSubtitles: ["Telegramアップロード → バッチ → /export"],
      videoCaptions: ["デモ：領収書アップロード → バッチ → 財務レポート生成"],
    },
    fitness: {
      name: "FitnessXP",
      audience: "フィットネスコーチ · ジムスタジオオーナー",
      intro:
        "FitnessXPはモバイルファーストのコーチ／スタジオワークベンチです。スケジュール、生徒、受講登録、支払い、出勤を1アプリで管理。コーチは週／月カレンダー、管理者は権限管理、未払い生徒へのリマインダー付き。",
      benefits: [
        "WhatsApp + Excelの二重管理から解放。1画面で今日のスケジュールを把握。",
        "未払い生徒へのリマインダーで督促漏れを削減。",
        "出勤データをExcel出力し、コーチ報酬や給与計算に活用。",
        "Admin／Coach／Clerkの役割分担でスタジオ拡大時も整理。",
      ],
      features: [
        "コーチワークベンチ：週／月スケジュール（Googleカレンダー風）",
        "生徒CRM · 受講登録 · 支払い状況",
        "WhatsApp支払いリマインダー",
        "出勤記録 · マンツーマン／グループ／ヨガ等",
        "システムアカウント：Admin · Coach · Clerk",
        "Excelエクスポート（給与・照合用）",
      ],
      cta: "FitnessXP月額プランを見る",
      videoSubtitles: ["システムアカウント · 権限管理", "コーチワークベンチ · スケジュール · 出勤"],
      videoCaptions: [
        "デモ：AdminがCoach／Clerkアカウントと権限を管理",
        "デモ：コーチのスケジュール、生徒フォロー、出勤Excel出力",
      ],
    },
  },
};

const de: HomepageContent = {
  ...en,
  nav: { ...en.nav, flagship: "Flagship-Produkte" },
  flagshipProducts: {
    eyebrow: "Flagship-Produkte",
    title: "Nach dem Workflow-Fix hält monatliches SaaS den Alltag am Laufen.",
    intro:
      "Zuerst die richtige Zielgruppe: Buchhaltung / HR und Fitness-Coaches / Studio-Inhaber haben unterschiedliche Engpässe. Unten: System, Nutzen, Funktionen und Erlebnis.",
    flowLabels: {
      intro: "System",
      benefits: "Nutzen",
      features: "Funktionen & Erlebnis",
    },
    account: {
      name: "AccountXP",
      audience: "Buchhaltung · HR · Admin",
      intro:
        "AccountXP ist ein Telegram-/WhatsApp-Beleg-Assistent. PDF/JPG/PNG hochladen, der Bot sammelt sie im Batch; mit `/export` entsteht ein Finanz-Spreadsheet mit Datum, Kategorie, Betrag, Währung und Dateireferenz.",
      benefits: [
        "Kein manuelles Abtippen in Excel — Monatsabschluss wird deutlich schneller.",
        "Mehrwährungsfähig (HKD, USD, CNY u. a.).",
        "Alle Belege in einem Chat — Buchhaltung, HR und Inhaber sehen dieselbe Version.",
        "Upload → Klassifizierung → Export in einem Flow.",
      ],
      features: [
        "Telegram-Bot für Belege (PDF/JPG/PNG/WEBP usw.)",
        "Batch-Warteschlange + `/export` Finanzbericht",
        "Payment Date · Category · Amount · Currency · Reference File",
        "WhatsApp-Beleg-Upload (wenn angebunden)",
        "Verschlüsselte Speicherung · OCR nach Scope",
      ],
      cta: "AccountXP Monatsplan ansehen",
      videoSubtitles: ["Telegram-Upload → Batch → /export"],
      videoCaptions: ["Demo: Belege hochladen → Batch → Finanzbericht"],
    },
    fitness: {
      name: "FitnessXP",
      audience: "Fitness-Coach · Studio-Inhaber",
      intro:
        "FitnessXP ist eine mobile Coach-/Studio-Workbench: Terminplan, Schüler, Anmeldung, Zahlungen und Anwesenheit in einer App. Wochen-/Monatskalender für Coaches, Rollenverwaltung für Admins, Erinnerungen für unbezahlte Schüler.",
      benefits: [
        "Schluss mit WhatsApp + Excel — ein Bildschirm für den Tagesplan.",
        "Zahlungserinnerungen reduzieren Nachfassen durch den Inhaber.",
        "Anwesenheit als Excel für Coach-Provisionen und Lohn.",
        "Admin/Coach/Clerk-Rollen halten wachsende Studios organisiert.",
      ],
      features: [
        "Coach-Workbench: Wochen-/Monatsplan (Google-Kalender-Stil)",
        "Schüler-CRM · Anmeldung · bezahlt/offen",
        "WhatsApp-Zahlungserinnerungen",
        "Anwesenheit · 1:1 / Gruppe / Yoga",
        "Systemkonten: Admin · Coach · Clerk",
        "Excel-Export für Lohn/Abstimmung",
      ],
      cta: "FitnessXP Monatsplan ansehen",
      videoSubtitles: ["Systemkonten · Berechtigungen", "Coach-Workbench · Plan · Anwesenheit"],
      videoCaptions: [
        "Demo: Admin verwaltet Coach-/Clerk-Konten",
        "Demo: Coach-Plan, Schüler-Follow-up, Excel-Export",
      ],
    },
  },
};

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
