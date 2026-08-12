import type { AppLocale } from "@/lib/i18n-routing";

export const HOMEPAGE_PLACEHOLDERS = {
  bookingUrl: "#BOOKING_URL",
  whatsappUrl: "#WHATSAPP_URL",
  emailAddress: "EMAIL_ADDRESS",
  linkedinUrl: "#LINKEDIN_URL",
  facebookUrl: "#FACEBOOK_URL",
  instagramUrl: "#INSTAGRAM_URL",
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
    portraitLabel: string;
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
    bookingLabel: string;
    whatsappLabel: string;
    emailLabel: string;
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
    portraitLabel: "Add Larry professional portrait here",
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
    bookingLabel: "BOOKING_URL",
    whatsappLabel: "WHATSAPP_URL",
    emailLabel: "EMAIL_ADDRESS",
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
  hero: {
    ...zhHk.hero,
    title: "幫香港小團隊梳理一條流程，\n先止血，再落 AI。",
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
    portraitLabel: "Add Larry professional portrait here",
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
    bookingLabel: "BOOKING_URL",
    whatsappLabel: "WHATSAPP_URL",
    emailLabel: "EMAIL_ADDRESS",
  },
  footer: {
    title: "Larry Lo / InnovateXP",
    role: "AI Business Consultant",
    tagline: "Fix the workflow first. Then make AI work.",
    privacy: "Privacy Policy",
    copyright: "© 2026 InnovateXP Limited. All rights reserved.",
  },
};

const byLocale: Record<AppLocale, HomepageContent> = {
  en,
  "zh-hk": zhHk,
  "zh-tw": zhTw,
  ja: en,
  de: en,
};

export function getHomepageContent(locale: AppLocale): HomepageContent {
  return byLocale[locale] ?? zhHk;
}
