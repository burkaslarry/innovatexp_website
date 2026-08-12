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
      /** Public price line — fixed HKD for Sprint; scoped quote for longer programs */
      priceLabel: string;
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
        priceLabel: "HK$6,800",
        body: "先驗證一條最影響收入或營運嘅流程。",
        deliverables: ["流程圖", "責任分工", "SOP／跟進節點", "簡單 KPI", "一個 quick win"],
        cta: "由 Sprint 開始",
      },
      {
        name: "3 個月 Foundation",
        priceLabel: "視 SOP 複雜程度決定",
        body: "1–2 條流程落地、SOP v1、每月 checkpoint、一次團隊培訓。",
        deliverables: ["1–2 條流程", "SOP v1", "每月 checkpoint", "1 次團隊培訓"],
        cta: "了解 Foundation",
      },
      {
        name: "6 個月 Accelerator",
        priceLabel: "視 SOP 複雜程度決定",
        body: "一個部門／3–4 條流程、adoption 追蹤、最多兩次工作坊。",
        deliverables: ["3–4 條流程", "Adoption 追蹤", "最多 2 次工作坊"],
        cta: "了解 Accelerator",
      },
      {
        name: "12 個月 Partnership",
        priceLabel: "視 SOP 複雜程度決定",
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
      {
        question: "我哋而家係咪適合用 AI？",
        answer:
          "未必一開始就要。通常建議先揀一條最影響收入或營運嘅核心流程嚟睇清楚，評估過效益，先決定係咪值得加 AI。",
      },
      {
        question: "一定要先買 CRM 嗎？",
        answer:
          "唔一定。最緊要先理順團隊嘅責任、交接同跟進節奏。如果現有工具已經夠用，就未必需要即刻洗錢換系統。",
      },
      {
        question: "要幾耐先見到改善？",
        answer:
          "唔會一開始就做全公司大翻新（Overhaul）。通常由一條流程開始，好快就會見到可觀察嘅改善，然後先再決定要唔要擴大。",
      },
      {
        question: "同事唔慣用新系統點算？",
        answer:
          "使用習慣（Adoption）同歸屬感（Ownership）同工具本身一樣重要。我哋嘅做法係盡量貼近團隊現有嘅工作習慣，減少「硬推」引起嘅抗拒。",
      },
      {
        question: "30 分鐘流程診斷會做咩？",
        answer:
          "集中幫你睇一條最卡手嘅流程，精準搵出漏位、責任不清嘅地方，同埋最值得優先執靚嘅位置。",
      },
      {
        question: "公司好細，值得做嗎？",
        answer:
          "如果公司「一個人放假，成個運作就會卡住」，就非常值得做！小團隊更需要先整理好核心流程。主線由 HK$6,800 嘅 30 日 Sprint 起步，風險好受控。",
      },
      {
        question: "服務方案點樣起步？",
        answer:
          "由淺入深，按部就班：\n30 日 Discovery Sprint（HK$6,800）\n3 個月 Foundation（視 SOP 複雜程度決定）\n6 個月 Accelerator（視 SOP 複雜程度決定）\n12 個月 Partnership（視 SOP 複雜程度決定）\n（註：我哋著重幫你解決實際問題，盲目試用新工具絕對唔係首頁主打。）",
      },
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
    eyebrow: "AI 商業顧問｜14+ 年 IT 交付與流程落地經驗",
    title: "協助香港小團隊止住漏單、慢報價與交接混亂。",
    description:
      "Larry 會先與您鎖定一條最影響收入或營運的流程，在 30 日內釐清責任、SOP 與追蹤方式；有需要時才接入 CRM、AI 或自動化。",
    fitAudience: "適合香港 3–30 人培訓、課程及專業服務團隊",
    primaryCta: "預約 30 分鐘流程診斷",
    secondaryCta: "查看服務方案與起步價格",
    trustPoints: ["14+ 年 IT 交付經驗", "專注香港 3–30 人小團隊", "由流程診斷到實際落地"],
    diagnosticInputs: ["WhatsApp 查詢", "Excel 跟進表", "線上表單", "同事交接"],
    diagnosticOutput: "一條看得見、跟得上、有人負責的 workflow",
    diagnosticCaption: "先看清漏點，再決定 AI、CRM 或 automation 是否真正有幫助。",
    imageAlt: "InnovateXP 創辦人 Larry Lo 於演講分享 AI 商業升級與流程設計",
  },
  problem: {
    eyebrow: "流程卡點",
    title: "問題往往不是公司沒有客戶，而是流程讓客戶流失。",
    items: [
      { title: "查詢分散", body: "WhatsApp、Excel、表單各自為政。" },
      { title: "報價緩慢", body: "資料要找、要問、要等。" },
      { title: "交接混亂", body: "沒有人清楚下一步由誰跟進。" },
      { title: "老闆救火", body: "一個人請假，整條流程就停擺。" },
    ],
    quote: "一個人請假就停的流程，不叫流程，叫人質。",
  },
  approach: {
    eyebrow: "服務方式",
    title: "不是一開始就叫您買系統。先看清楚哪一條流程最值得整理。",
    intro: "聚焦一條流程，而不是大規模數位轉型。先止血，再視情況接入工具。",
    steps: [
      {
        label: "Step 1",
        title: "30 分鐘流程診斷",
        body: "鎖定最值得優先處理的收入／營運卡點。",
      },
      {
        label: "Step 2",
        title: "30 日 Workflow Sprint",
        body: "交付流程圖、責任人、SOP、追蹤節點與一個可執行的 quick win。",
      },
      {
        label: "Step 3",
        title: "Adoption & KPI Review",
        body: "協助團隊實際使用；於 Day 30／60／90 檢討漏跟進、報價時間與交接完成率。有需要時才接入 CRM、AI 或自動化。",
      },
    ],
  },
  services: {
    eyebrow: "服務範圍",
    title: "依您公司真正的問題，落地最少但最有效的工具。",
    items: [
      { title: "Workflow Health Check", body: "找出漏單、慢報價、交接不清的流程漏洞。" },
      { title: "WhatsApp-first CRM", body: "將分散查詢變成可追蹤、有責任的跟進流程。" },
      { title: "AI Chatbot & Automation", body: "處理重複查詢、資料整理與日常行政。" },
      { title: "Event & Lead Follow-up", body: "將活動參加者變成可跟進的銷售機會。" },
      { title: "Team AI Enablement", body: "讓團隊能在既有 SOP 中安全、實際地使用 AI。" },
    ],
  },
  consultancy: {
    eyebrow: "主線方案",
    title: "潛在客戶進來，最先應該看到的只有這條主線。",
    intro: "由 30 日驗證一條流程開始；再依需要升級到 3／6／12 個月陪跑。工具試用放在次級頁面，不與主線搶注意力。",
    fitNote: "不是先賣您一套系統；而是從流程診斷、落地、團隊採用到 KPI review，協助您把卡住收入的流程真正跑順。",
    startingBadge: "建議起步",
    plans: [
      {
        name: "30 日 Discovery Sprint",
        priceLabel: "HK$6,800",
        body: "先驗證一條最影響收入或營運的流程。",
        deliverables: ["流程圖", "責任分工", "SOP／跟進節點", "簡單 KPI", "一個 quick win"],
        cta: "由 Sprint 開始",
      },
      {
        name: "3 個月 Foundation",
        priceLabel: "視 SOP 複雜程度決定",
        body: "1–2 條流程落地、SOP v1、每月 checkpoint、一次團隊培訓。",
        deliverables: ["1–2 條流程", "SOP v1", "每月 checkpoint", "1 次團隊培訓"],
        cta: "了解 Foundation",
      },
      {
        name: "6 個月 Accelerator",
        priceLabel: "視 SOP 複雜程度決定",
        body: "一個部門／3–4 條流程、adoption 追蹤、最多兩次工作坊。",
        deliverables: ["3–4 條流程", "Adoption 追蹤", "最多 2 次工作坊"],
        cta: "了解 Accelerator",
      },
      {
        name: "12 個月 Partnership",
        priceLabel: "視 SOP 複雜程度決定",
        body: "年度 roadmap、SOP governance、管理層 review。",
        deliverables: ["年度 roadmap", "SOP governance", "管理層 review"],
        cta: "了解 Partnership",
      },
    ],
  },
  cases: {
    eyebrow: "行業實例",
    title: "同一套方法，在不同行業如何落地。",
    intro: "以下為匿名情境（Before → 30 日做法 → After → 可觀察指標）。未經驗證的數字不作 ROI 承諾。",
    beforeLabel: "Before",
    sprintLabel: "30 日做法",
    afterLabel: "After",
    metricLabel: "可觀察指標",
    items: [
      {
        industry: "培訓／課程",
        title: "報名查詢散落在 WhatsApp，跟進靠記憶",
        before: "查詢、試堂、報名、收款各自使用不同聊天與 Excel；同事請假就不知道跟到哪裡。",
        sprint: "鎖定「查詢 → 試堂 → 報名」一條線；寫清責任人、跟進節點與簡單狀態表。",
        after: "每條查詢都有負責人與下一步；老闆不必每天追問進度。",
        metric: "漏跟進明顯減少；報名轉換可在一頁看清。",
      },
      {
        industry: "專業服務",
        title: "報價慢、版本多、交接靠口頭",
        before: "報價資料要問完才能出；同事各自有一份「最新版」；客戶催完才發現漏跟。",
        sprint: "釐清報價資料來源、責任與審批節點；固定一份可追蹤清單。",
        after: "報價有標準節奏；交接不再只靠口頭。",
        metric: "平均報價時間縮短；重複詢問資料次數下降。",
      },
      {
        industry: "Studio 行業（方法實例）",
        title: "排程／收款／出勤靠 WhatsApp + Excel",
        before: "教練記堂、催未付、對佣金各用各方法；Admin 每天救火。",
        sprint: "用同一套「先整理流程再落地工具」方法：責任、狀態、reminder、匯出對數。",
        after: "排程、學員狀態、付款提醒集中一處；不再靠記憶撐住 studio。",
        metric: "未付追蹤有提醒；出勤／佣金對數可匯出。",
      },
    ],
  },
  whyUs: {
    eyebrow: "為什麼選擇 Larry",
    title: "多數人賣工具，有些人賣建議。我先把流程整理好。",
    intro: "對比式差異化——談客戶利益，不談內部產品策略。",
    rows: [
      { opponent: "管理顧問（交報告就離開）", difference: "我能建置、串接，並帶團隊真正用起來" },
      { opponent: "SaaS 供應商（賣 licence）", difference: "我可以告訴您其實不需要買" },
      { opponent: "自動化／AI freelancer（接案）", difference: "我先問商業問題，再談工具" },
      { opponent: "大型 IT 公司（六位數專案）", difference: "HK$6,800 先試一條流程，風險極低" },
    ],
    punchline: "如果您不需要系統，我會直接告訴您。",
  },
  about: {
    eyebrow: "關於 Larry",
    title: "我是那個會建議您「先不要買」的顧問。",
    intro: "做了十多年 IT 交付，我見過最多的失敗，不是系統建不好，而是系統建好了、完美交付、然後不好用。",
    body: [
      "同一批人照舊用 WhatsApp、照舊開 Excel，沒有人肯說。",
      "後來回頭看，發現問題從來不是工具——是本來那條流程就沒有人真正釐清過。SOP 只存在老闆的腦裡，一個人請假就斷掉。",
      "所以我改變了整個做法：先與您釐清一條流程，真的有效、團隊真的在用，才談要不要加 AI 或系統。",
    ],
    identity: "我是那個會建議您「先不要買」的顧問。",
    portraitAlt: "Larry Lo 於研討會分享 AI 商業顧問與客戶管理流程",
  },
  faq: {
    title: "常見問題",
    items: [
      {
        question: "我們現在適合用 AI 嗎？",
        answer:
          "未必一開始就要。通常建議先選一條最影響收入或營運的核心流程來看清楚，評估過效益，再決定是否值得加 AI。",
      },
      {
        question: "一定要先買 CRM 嗎？",
        answer:
          "不一定。最重要先理順團隊的責任、交接與跟進節奏。如果現有工具已經夠用，就未必需要立刻換系統。",
      },
      {
        question: "要多久才看得到改善？",
        answer:
          "不會一開始就做全公司大翻新（Overhaul）。通常由一條流程開始，很快就會看到可觀察的改善，然後再決定要不要擴大。",
      },
      {
        question: "同事不習慣新系統怎麼辦？",
        answer:
          "使用習慣（Adoption）與歸屬感（Ownership）跟工具本身一樣重要。我們的做法是盡量貼近團隊現有的工作習慣，減少「硬推」引起的抗拒。",
      },
      {
        question: "30 分鐘流程診斷會做什麼？",
        answer:
          "集中協助您檢視一條最卡手的流程，精準找出漏點、責任不清之處，以及最值得優先整理的位置。",
      },
      {
        question: "公司很小，值得做嗎？",
        answer:
          "如果公司「一個人請假，整個運作就會卡住」，就非常值得做。小團隊更需要先整理好核心流程。主線由 HK$6,800 的 30 日 Sprint 起步，風險可控。",
      },
      {
        question: "服務方案怎麼起步？",
        answer:
          "由淺入深，按部就班：\n30 日 Discovery Sprint（HK$6,800）\n3 個月 Foundation（視 SOP 複雜程度決定）\n6 個月 Accelerator（視 SOP 複雜程度決定）\n12 個月 Partnership（視 SOP 複雜程度決定）\n（註：我們著重協助您解決實際問題，盲目試用新工具絕對不是首頁主打。）",
      },
    ],
  },
  finalCta: {
    title: "想知道您公司哪一條流程最值得先整理？",
    body: "預約 30 分鐘流程診斷，找出公司最容易漏單、慢報價或卡交接的一條流程。",
    primary: "預約 30 分鐘流程診斷",
    secondary: "WhatsApp 聯絡 Larry",
  },
  footer: {
    title: "Larry Lo / InnovateXP",
    role: "AI 商業顧問",
    tagline: "先整理流程，再落地 AI",
    privacy: "Privacy Policy",
    copyright: "© 2026 InnovateXP Limited. All rights reserved.",
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
        priceLabel: "HK$6,800",
        body: "Validate one workflow that affects revenue or operations.",
        deliverables: ["Process map", "Ownership", "SOP / follow-up nodes", "Simple KPI", "One quick win"],
        cta: "Start with Sprint",
      },
      {
        name: "3-month Foundation",
        priceLabel: "Scoped by SOP complexity",
        body: "Land 1–2 workflows, SOP v1, monthly checkpoints, one team training.",
        deliverables: ["1–2 workflows", "SOP v1", "Monthly checkpoints", "1 team training"],
        cta: "See Foundation",
      },
      {
        name: "6-month Accelerator",
        priceLabel: "Scoped by SOP complexity",
        body: "One department / 3–4 workflows, adoption tracking, up to two workshops.",
        deliverables: ["3–4 workflows", "Adoption tracking", "Up to 2 workshops"],
        cta: "See Accelerator",
      },
      {
        name: "12-month Partnership",
        priceLabel: "Scoped by SOP complexity",
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
      { question: "How do the programs start?", answer: "Step by step:\n30-day Discovery Sprint (HK$6,800)\n3-month Foundation (scoped by SOP complexity)\n6-month Accelerator (scoped by SOP complexity)\n12-month Partnership (scoped by SOP complexity)\n(Note: we focus on real operating problems. Tool trials are not the homepage headline.)" },
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

const ja: HomepageContent = {
  brandTitle: "InnovateXP Limited",
  brandSubtitle: "AIビジネスコンサルタント Larry Lo",
  nav: {
    home: "ホーム",
    diagnosis: "業務診断",
    services: "進め方",
    plans: "プログラム",
    cases: "業界事例",
    about: "Larryについて",
    faq: "よくある質問",
    cta: "30分診断を予約",
  },
  hero: {
    eyebrow: "AIビジネスコンサルタント｜14年以上のIT納品・業務実装経験",
    title: "香港の小規模チームの取りこぼし・遅い見積・引き継ぎ混乱を止めます。",
    description:
      "Larryはまず収益や運営に最も影響する1本の業務を特定し、30日以内に責任・SOP・追跡方法を整理します。CRM・AI・自動化は必要と確認できた場合のみ導入します。",
    fitAudience: "香港の3〜30名規模の研修・講座・専門サービスチーム向け",
    primaryCta: "30分の業務診断を予約",
    secondaryCta: "プログラムと開始価格を見る",
    trustPoints: ["14年以上の納品経験", "香港の3〜30名チームに特化", "診断から実装まで伴走"],
    diagnosticInputs: ["WhatsApp問い合わせ", "Excel追跡表", "Webフォーム", "チーム引き継ぎ"],
    diagnosticOutput: "見える・追える・責任者がいる1本のワークフロー",
    diagnosticCaption: "漏れを先に直す。その後にAI・CRM・自動化が必要かを判断します。",
    imageAlt: "創業者Larry LoによるAIビジネスアップグレードと業務設計の講演",
  },
  problem: {
    eyebrow: "業務の詰まり",
    title: "問題はリード不足ではなく、業務がリードを漏らしていることです。",
    items: [
      { title: "問い合わせの散在", body: "WhatsApp・表計算・フォームが別々に動いています。" },
      { title: "見積の遅さ", body: "探す・聞く・待つが発生します。" },
      { title: "引き継ぎの混乱", body: "次の担当がはっきりしません。" },
      { title: "経営者の火消し", body: "一人が休むと業務が止まります。" },
    ],
    quote: "一人が休むと止まる業務は、業務ではなく人質です。",
  },
  approach: {
    eyebrow: "進め方",
    title: "最初にシステムを売りません。まず直すべき業務を見極めます。",
    intro: "全社DXではなく、まず1本の業務に集中します。止血してからツールを検討します。",
    steps: [
      { label: "Step 1", title: "30分の業務診断", body: "収益・運営で最も優先すべき詰まりを特定します。" },
      { label: "Step 2", title: "30日 Workflow Sprint", body: "業務図、責任者、SOP、追跡ポイント、実行可能なquick winを納品します。" },
      { label: "Step 3", title: "Adoption & KPI Review", body: "チームの利用を支援し、Day 30／60／90で未フォロー・見積時間・引き継ぎ完了率を確認。必要時のみCRM・AI・自動化を接続します。" },
    ],
  },
  services: {
    eyebrow: "サービス領域",
    title: "本当の課題を解くために、最小で最も有効な手段を使います。",
    items: [
      { title: "Workflow Health Check", body: "フォロー漏れ・遅い見積・不明確な引き継ぎを特定します。" },
      { title: "WhatsApp-first CRM", body: "散在する問い合わせを追跡可能なフォロー業務に変えます。" },
      { title: "AI Chatbot & Automation", body: "反復問い合わせ・データ整理・日常事務を処理します。" },
      { title: "Event & Lead Follow-up", body: "イベント参加者を追跡可能な営業機会に変えます。" },
      { title: "Team AI Enablement", body: "既存SOPの中で安全かつ実務的にAIを使えるようにします。" },
    ],
  },
  consultancy: {
    eyebrow: "主力プログラム",
    title: "本気の見込み客が最初に見るべき道筋はこれだけです。",
    intro: "30日で1本の業務を検証し、必要に応じて3／6／12か月へ拡張。ツール試用は二次ページに置きます。",
    fitNote: "最初にシステムを売るのではなく、診断・実装・定着・KPIレビューまで伴走し、収益を止める業務を通します。",
    startingBadge: "推奨スタート",
    plans: [
      {
        name: "30日 Discovery Sprint",
        priceLabel: "HK$6,800",
        body: "収益や運営に影響する1本の業務を先に検証します。",
        deliverables: ["業務図", "責任分担", "SOP／フォロー節点", "簡易KPI", "1つのquick win"],
        cta: "Sprintから始める",
      },
      {
        name: "3か月 Foundation",
        priceLabel: "SOPの複雑さに応じて見積",
        body: "1〜2本の業務定着、SOP v1、毎月のcheckpoint、チーム研修1回。",
        deliverables: ["1〜2本の業務", "SOP v1", "毎月checkpoint", "研修1回"],
        cta: "Foundationを見る",
      },
      {
        name: "6か月 Accelerator",
        priceLabel: "SOPの複雑さに応じて見積",
        body: "1部門／3〜4本の業務、adoption追跡、最大2回のワークショップ。",
        deliverables: ["3〜4本の業務", "Adoption追跡", "最大2回WS"],
        cta: "Acceleratorを見る",
      },
      {
        name: "12か月 Partnership",
        priceLabel: "SOPの複雑さに応じて見積",
        body: "年間roadmap、SOPガバナンス、経営レビュー。",
        deliverables: ["年間roadmap", "SOPガバナンス", "経営レビュー"],
        cta: "Partnershipを見る",
      },
    ],
  },
  cases: {
    eyebrow: "業界事例",
    title: "同じ方法を、異なる業界でどう適用するか。",
    intro: "匿名シナリオ（Before → 30日の進め方 → After → 観察指標）。未検証のROIは約束しません。",
    beforeLabel: "Before",
    sprintLabel: "30日の進め方",
    afterLabel: "After",
    metricLabel: "観察指標",
    items: [
      {
        industry: "研修／講座",
        title: "申込問い合わせがWhatsAppに散在し、フォローが記憶頼み",
        before: "問い合わせ・体験・申込・入金が別チャットとExcelに散在。休暇で継続が途切れる。",
        sprint: "問い合わせ→体験→申込の1本に固定し、責任者・節点・簡易ステータス表を明確化。",
        after: "各問い合わせに担当と次アクションがあり、経営者が毎日追わなくてよい。",
        metric: "フォロー漏れが減り、申込転換を1画面で把握。",
      },
      {
        industry: "専門サービス",
        title: "見積が遅く、版が多く、引き継ぎが口頭",
        before: "不足情報待ちで見積が停滞。各自の「最新版」が並存。催促で漏れが発覚。",
        sprint: "見積入力・責任・承認節点を整理し、追跡可能なチェックリストを固定。",
        after: "見積に標準リズムができ、引き継ぎが口頭だけに依存しない。",
        metric: "平均見積時間短縮。重複のデータ確認が減少。",
      },
      {
        industry: "スタジオ業（方法事例）",
        title: "予定／入金／出欠がWhatsApp + Excel依存",
        before: "講師ごとに授業・未払い・コミッション管理が異なり、管理が毎日火消し。",
        sprint: "同じ「業務を先に直し、その後にツール」手法：責任・状態・リマインド・出力照合。",
        after: "予定・生徒状態・入金リマインドが集約され、記憶でスタジオを回さない。",
        metric: "未払いフォローにリマインド。出欠／コミッション出力が可能。",
      },
    ],
  },
  whyUs: {
    eyebrow: "なぜLarryか",
    title: "多くの人はツールを売り、一部は助言を売ります。私は先に業務を直します。",
    intro: "顧客利益の対比です。社内の商品戦略用語ではありません。",
    rows: [
      { opponent: "経営コンサル（報告書で終了）", difference: "構築し、つなぎ、チームに定着させる" },
      { opponent: "SaaSベンダー（ライセンス販売）", difference: "買わなくてよいと伝えられる" },
      { opponent: "自動化／AIフリーランス（案件受注）", difference: "ツール名の前に事業課題を問う" },
      { opponent: "大手IT（六桁プロジェクト）", difference: "HK$6,800で1本の業務を試せる低リスク" },
    ],
    punchline: "システムが不要なら、はっきりそう伝えます。",
  },
  about: {
    eyebrow: "Larryについて",
    title: "「まだ買わない方がよい」と言えるコンサルタントです。",
    intro: "十数年のIT納品で最も多く見た失敗は、作り損ないではなく、完璧に納品されたのに使われないことでした。",
    body: [
      "同じ人たちがWhatsAppとExcelを続け、誰も口に出さない。",
      "振り返ると問題はツールではなく、業務そのものが整理されていなかったこと。SOPは経営者の頭の中だけにあり、一人の休暇で途切れます。",
      "だからやり方を変えました。まず1本の業務を直し、実際に効き、チームが使うまで進めてから、AIやシステムの話をします。",
    ],
    identity: "「まだ買わない方がよい」と言えるコンサルタントです。",
    portraitAlt: "Larry LoがAIビジネスコンサルと顧客業務設計について講演する様子",
  },
  faq: {
    title: "よくある質問",
    items: [
      { question: "今すぐAIを導入すべきですか？", answer: "最初からAIが必要とは限りません。まず収益や運営に影響する1本の業務を見て、価値があるか判断します。" },
      { question: "先にCRMを買う必要はありますか？", answer: "必ずしもありません。責任・引き継ぎ・フォローのリズムを先に整えます。既存ツールで足りるなら、すぐには替えません。" },
      { question: "どれくらいで改善が見えますか？", answer: "全社一気の大改修はしません。1本の業務から始め、観察可能な改善を見てから拡大を判断します。" },
      { question: "チームが新システムを嫌がったら？", answer: "AdoptionとOwnershipはツールと同じくらい重要です。既存の働き方に寄せ、無理押しを減らします。" },
      { question: "30分診断では何をしますか？", answer: "最も詰まっている1本の業務に集中し、漏れ・責任の曖昧さ・優先して直すべき点を特定します。" },
      { question: "会社が小さいですが価値はありますか？", answer: "一人の休暇で全体が止まるなら、十分価値があります。小規模ほどコア業務の整理が必要です。主線はHK$6,800の30日Sprintから、低リスクで始められます。" },
      { question: "プログラムはどう始めますか？", answer: "段階的に進めます：\n30日 Discovery Sprint（HK$6,800）\n3か月 Foundation（SOPの複雑さに応じて見積）\n6か月 Accelerator（SOPの複雑さに応じて見積）\n12か月 Partnership（SOPの複雑さに応じて見積）\n（注：実際の課題解決が中心です。ツール試用がトップの売りではありません。）" },
    ],
  },
  finalCta: {
    title: "御社で最初に直すべき業務はどれですか？",
    body: "30分の業務診断で、取りこぼし・遅い見積・引き継ぎ停滞が起きやすい1本を特定します。",
    primary: "30分の業務診断を予約",
    secondary: "WhatsAppでLarryに連絡",
  },
  footer: {
    title: "Larry Lo / InnovateXP",
    role: "AIビジネスコンサルタント",
    tagline: "先に業務を直し、その後にAIを活かす。",
    privacy: "Privacy Policy",
    copyright: "© 2026 InnovateXP Limited. All rights reserved.",
  },
};

const de: HomepageContent = {
  brandTitle: "InnovateXP Limited",
  brandSubtitle: "AI-Business-Berater Larry Lo",
  nav: {
    home: "Start",
    diagnosis: "Diagnose",
    services: "Vorgehen",
    plans: "Programme",
    cases: "Branchenbeispiele",
    about: "Über Larry",
    faq: "FAQ",
    cta: "30-Min-Diagnose buchen",
  },
  hero: {
    eyebrow: "AI-Business-Berater | 14+ Jahre IT-Lieferung und Prozessumsetzung",
    title: "Stoppen Sie verlorene Leads, langsame Angebote und chaotische Übergaben in Hongkonger Kleinteams.",
    description:
      "Larry fokussiert zuerst den einen Prozess, der Umsatz oder Betrieb am stärksten belastet, und klärt in 30 Tagen Verantwortung, SOP und Nachverfolgung — CRM, AI oder Automatisierung nur wenn gerechtfertigt.",
    fitAudience: "Für Hongkonger Trainings-, Kurs- und Professional-Service-Teams mit 3–30 Personen",
    primaryCta: "30-Minuten-Prozessdiagnose buchen",
    secondaryCta: "Programme und Einstiegspreis ansehen",
    trustPoints: ["14+ Jahre Liefererfahrung", "Fokus auf Hongkonger Teams mit 3–30 Personen", "Von der Diagnose bis zur Umsetzung"],
    diagnosticInputs: ["WhatsApp-Anfragen", "Excel-Tracker", "Webformular", "Team-Übergabe"],
    diagnosticOutput: "Ein sichtbarer Workflow mit klarer Verantwortung",
    diagnosticCaption: "Zuerst das Leck stopfen. Dann entscheiden, ob AI, CRM oder Automatisierung nötig ist.",
    imageAlt: "Gründerpräsentation zu AI Business Upgrade und Prozessdesign",
  },
  problem: {
    eyebrow: "Prozessengpässe",
    title: "Das Problem ist selten fehlende Leads — der Prozess lässt sie durchsickern.",
    items: [
      { title: "Verstreute Anfragen", body: "WhatsApp, Tabellen und Formulare laufen getrennt." },
      { title: "Langsame Angebote", body: "Suchen, fragen und warten kostet Zeit." },
      { title: "Chaotische Übergaben", body: "Niemand weiß klar, wer den nächsten Schritt besitzt." },
      { title: "Feuerlöschen durch den Chef", body: "Eine Person im Urlaub — und der Prozess steht." },
    ],
    quote: "Wenn eine Abwesenheit den Prozess stoppt, ist das kein Prozess. Das ist Geiselnahme.",
  },
  approach: {
    eyebrow: "Vorgehen",
    title: "Kein Systempitch zuerst. Zuerst klären, welcher Prozess sich lohnt.",
    intro: "Ein Prozess nach dem anderen — keine unternehmensweite Digitaltransformation. Erst stabilisieren, dann Tools prüfen.",
    steps: [
      { label: "Step 1", title: "30-Minuten-Prozessdiagnose", body: "Den umsatz- oder betriebsrelevanten Engpass priorisieren." },
      { label: "Step 2", title: "30-Tage Workflow Sprint", body: "Prozesskarte, Owner, SOP, Tracking-Punkte und einen umsetzbaren Quick Win liefern." },
      { label: "Step 3", title: "Adoption & KPI-Review", body: "Das Team beim Nutzen unterstützen. An Tag 30 / 60 / 90 verpasste Follow-ups, Angebotszeit und Übergaben prüfen. CRM, AI oder Automatisierung nur bei Bedarf." },
    ],
  },
  services: {
    eyebrow: "Leistungsbereiche",
    title: "Nutzen Sie das kleinste wirksame Mittel für das echte Geschäftsproblem.",
    items: [
      { title: "Workflow Health Check", body: "Lecks bei Follow-up, langsamen Angeboten und unklaren Übergaben finden." },
      { title: "WhatsApp-first CRM", body: "Verstreute Anfragen in einen nachverfolgbaren Follow-up-Prozess verwandeln." },
      { title: "AI Chatbot & Automation", body: "Wiederkehrende Anfragen, Datensortierung und Admin-Arbeit übernehmen." },
      { title: "Event & Lead Follow-up", body: "Event-Teilnehmer in sichtbare Verkaufschancen verwandeln." },
      { title: "Team AI Enablement", body: "Dem Team helfen, AI sicher und praktisch innerhalb bestehender SOPs zu nutzen." },
    ],
  },
  consultancy: {
    eyebrow: "Hauptprogramme",
    title: "Der einzige Pfad, den ein ernsthafter Käufer zuerst sehen sollte.",
    intro: "In 30 Tagen einen Prozess validieren, dann bei Bedarf auf 3 / 6 / 12 Monate erweitern. Tool-Trials bleiben auf Sekundärseiten.",
    fitNote: "Kein Systemverkauf zuerst — Diagnose, Umsetzung, Adoption und KPI-Review, bis ein umsatzblockierender Prozess wirklich läuft.",
    startingBadge: "Empfohlener Einstieg",
    plans: [
      {
        name: "30-Tage Discovery Sprint",
        priceLabel: "HK$6,800",
        body: "Zuerst einen Prozess validieren, der Umsatz oder Betrieb beeinflusst.",
        deliverables: ["Prozesskarte", "Verantwortung", "SOP / Follow-up-Knoten", "Einfache KPI", "Ein Quick Win"],
        cta: "Mit Sprint starten",
      },
      {
        name: "3-Monats Foundation",
        priceLabel: "Je nach SOP-Komplexität",
        body: "1–2 Prozesse umsetzen, SOP v1, monatliche Checkpoints, ein Teamtraining.",
        deliverables: ["1–2 Prozesse", "SOP v1", "Monatliche Checkpoints", "1 Teamtraining"],
        cta: "Foundation ansehen",
      },
      {
        name: "6-Monats Accelerator",
        priceLabel: "Je nach SOP-Komplexität",
        body: "Eine Abteilung / 3–4 Prozesse, Adoption-Tracking, bis zu zwei Workshops.",
        deliverables: ["3–4 Prozesse", "Adoption-Tracking", "Bis zu 2 Workshops"],
        cta: "Accelerator ansehen",
      },
      {
        name: "12-Monats Partnership",
        priceLabel: "Je nach SOP-Komplexität",
        body: "Jahres-Roadmap, SOP-Governance, Management-Reviews.",
        deliverables: ["Jahres-Roadmap", "SOP-Governance", "Management-Reviews"],
        cta: "Partnership ansehen",
      },
    ],
  },
  cases: {
    eyebrow: "Branchenbeispiele",
    title: "Dieselbe Methode — in verschiedenen Branchen umgesetzt.",
    intro: "Anonyme Szenarien (Before → 30-Tage-Ansatz → After → beobachtbare Kennzahl). Keine ungeprüften ROI-Versprechen.",
    beforeLabel: "Before",
    sprintLabel: "30-Tage-Ansatz",
    afterLabel: "After",
    metricLabel: "Beobachtbare Kennzahl",
    items: [
      {
        industry: "Training / Kurse",
        title: "Anmeldungsanfragen verstreut in WhatsApp, Follow-up aus dem Gedächtnis",
        before: "Anfrage, Probetraining, Anmeldung und Zahlung lagen in unterschiedlichen Chats und Tabellen; Urlaub unterbrach die Kontinuität.",
        sprint: "Anfrage → Probetraining → Anmeldung fixiert; Owner, Knoten und ein einfaches Statusboard geklärt.",
        after: "Jede Anfrage hat Owner und nächsten Schritt; der Chef muss nicht täglich nachhaken.",
        metric: "Weniger verpasste Follow-ups; Anmeldungskonversion auf einer Seite sichtbar.",
      },
      {
        industry: "Professional Services",
        title: "Langsame Angebote, viele Versionen, mündliche Übergaben",
        before: "Angebote warteten auf fehlende Daten; jeder hatte eine andere „neueste“ Version; Erinnerungen deckten Lücken auf.",
        sprint: "Angebotsquellen, Verantwortung und Freigabeknoten geklärt; eine nachverfolgbare Checkliste fixiert.",
        after: "Angebote folgen einem Standardrhythmus; Übergaben sind nicht mehr nur mündlich.",
        metric: "Kürzere durchschnittliche Angebotszeit; weniger wiederholte Datenfragen.",
      },
      {
        industry: "Studio-Branche (Methodenbeispiel)",
        title: "Planung / Zahlung / Anwesenheit über WhatsApp + Excel",
        before: "Coaches führten Kurse, offene Zahlungen und Provisionen unterschiedlich; Admins löschten täglich Feuer.",
        sprint: "Dieselbe Methode „zuerst Prozess, dann Tool“: Verantwortung, Status, Reminder, Export-Abstimmung.",
        after: "Plan, Schülerstatus und Zahlungsreminder an einem Ort — das Studio läuft nicht mehr über Erinnerung.",
        metric: "Offene Zahlungen haben Reminder; Anwesenheit / Provisionen sind exportierbar.",
      },
    ],
  },
  whyUs: {
    eyebrow: "Warum Larry",
    title: "Die meisten verkaufen Tools. Manche verkaufen Rat. Ich repariere zuerst den Prozess.",
    intro: "Kontrast zugunsten des Kunden — keine interne Produktstrategie-Sprache.",
    rows: [
      { opponent: "Managementberater (Bericht und weg)", difference: "Ich baue, verbinde und helfe dem Team bei der Adoption" },
      { opponent: "SaaS-Anbieter (Lizenzen verkaufen)", difference: "Ich kann sagen, dass Sie nicht kaufen müssen" },
      { opponent: "Automatisierungs-/AI-Freelancer (Jobs annehmen)", difference: "Ich stelle die Geschäftsfrage vor dem Toolnamen" },
      { opponent: "Große IT-Firmen (sechsstellige Projekte)", difference: "HK$6,800 für einen Prozessversuch — geringes Risiko" },
    ],
    punchline: "Wenn Sie kein System brauchen, sage ich das klar.",
  },
  about: {
    eyebrow: "Über Larry",
    title: "Ich bin der Berater, der Ihnen sagen kann, noch nicht zu kaufen.",
    intro: "Nach mehr als einem Jahrzehnt IT-Lieferung sah ich am häufigsten nicht schlechte Builds — sondern perfekte Lieferungen, die niemand nutzte.",
    body: [
      "Dieselben Leute nutzten weiter WhatsApp und Excel, und niemand sagte es laut.",
      "Rückblickend war das Problem selten das Tool — der Prozess war nie geklärt. Die SOP lebte nur im Kopf des Eigentümers, deshalb brach ein Urlaubstag alles ab.",
      "Deshalb habe ich den Ansatz geändert: zuerst einen Prozess reparieren, bis er wirkt und das Team ihn wirklich nutzt — dann über AI oder Systeme sprechen.",
    ],
    identity: "Ich bin der Berater, der Ihnen sagen kann, noch nicht zu kaufen.",
    portraitAlt: "Larry Lo spricht über AI-Business-Beratung und Kundenprozessdesign",
  },
  faq: {
    title: "FAQ",
    items: [
      { question: "Sind wir jetzt bereit für AI?", answer: "Nicht jedes Team sollte sofort mit AI starten. Beginnen Sie mit einem Prozess und entscheiden Sie anhand des operativen Nutzens." },
      { question: "Müssen wir zuerst ein CRM kaufen?", answer: "Nicht unbedingt. Verantwortung, Übergaben und Follow-up-Rhythmus kommen meist vor dem Systemkauf. Reichen vorhandene Tools, muss nicht sofort gewechselt werden." },
      { question: "Wie schnell sehen wir Verbesserung?", answer: "Wir starten nicht mit einem unternehmensweiten Overhaul. Meist wird zuerst ein Prozess verbessert; danach entscheiden wir über die Ausweitung." },
      { question: "Was, wenn das Team ein neues System ablehnt?", answer: "Adoption und Ownership sind genauso wichtig wie das Tool. Wir orientieren uns an der bestehenden Arbeitsweise und vermeiden Zwang." },
      { question: "Was passiert in der 30-Minuten-Diagnose?", answer: "Wir fokussieren einen besonders stockenden Prozess, finden Lecks und unklare Verantwortung und priorisieren, was zuerst repariert werden sollte." },
      { question: "Wir sind sehr klein. Lohnt es sich trotzdem?", answer: "Ja — besonders wenn eine Abwesenheit den ganzen Betrieb stoppt. Kleine Teams brauchen zuerst einen klaren Kernprozess. Der Hauptpfad startet mit dem 30-Tage-Sprint für HK$6,800 und bleibt risikoarm." },
      { question: "Wie starten die Programme?", answer: "Schritt für Schritt:\n30-Tage Discovery Sprint (HK$6,800)\n3-Monats Foundation (je nach SOP-Komplexität)\n6-Monats Accelerator (je nach SOP-Komplexität)\n12-Monats Partnership (je nach SOP-Komplexität)\n(Hinweis: Wir lösen echte Betriebsprobleme. Tool-Trials sind nicht die Homepage-Hauptaussage.)" },
    ],
  },
  finalCta: {
    title: "Welchen Prozess sollte Ihr Unternehmen zuerst reparieren?",
    body: "Buchen Sie eine 30-Minuten-Prozessdiagnose und finden Sie den Prozess, der am ehesten Leads verliert, Angebote verlangsamt oder Übergaben blockiert.",
    primary: "30-Minuten-Prozessdiagnose buchen",
    secondary: "Larry per WhatsApp kontaktieren",
  },
  footer: {
    title: "Larry Lo / InnovateXP",
    role: "AI-Business-Berater",
    tagline: "Zuerst den Prozess reparieren. Dann AI wirksam machen.",
    privacy: "Privacy Policy",
    copyright: "© 2026 InnovateXP Limited. All rights reserved.",
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
