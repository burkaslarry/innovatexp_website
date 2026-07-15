import type { AppLocale } from "@/lib/i18n-routing";
import type { ServicePageContent, ServicePageSlug, VisionCopy } from "@/types/marketing";

const commonRelatedLinks = [
  { label: "AI Training / AI 教班", href: "/ai-training" },
  { label: "AI Coaching / AI 陪跑課程", href: "/ai-coaching" },
  { label: "SME AI Workflow", href: "/sme-ai-workflow" },
  { label: "Relevant Experience & Delivery Capability", href: "/case-studies" },
];

const aiTraining: ServicePageContent = {
  slug: "ai-training",
  schemaKind: "Course",
  title: "AI Training / AI 教班 for Schools, SMEs, and Business Teams",
  metaTitle: "AI Training Hong Kong | AI 教班 for Schools & SMEs | InnovateXP",
  metaDescription:
    "Practical AI training by InnovateXP for schools, SMEs, and business teams in Hong Kong: prompt engineering, AI tools, AI-assisted coding, chatbot prototyping, and workflow automation.",
  eyebrow: "Founder-led AI training",
  intro:
    "InnovateXP runs practical AI training for Hong Kong schools, SMEs, and business teams that need more than a tool demo. InnovateXP teaches teams how to use AI in real work: research, writing, customer follow-up, coding support, chatbot prototyping, and workflow automation. Cantonese/English delivery is available, with Traditional Chinese phrases and examples for local teams searching for AI 教班 and 中小企 AI 升級.",
  audience: [
    "Schools, education centres, and student groups exploring practical AI literacy.",
    "SME owners and managers who want staff to use AI safely in daily operations.",
    "Sales, marketing, admin, and customer service teams that need reusable AI workflows.",
    "Business teams comparing WorkBuddy, Tencent AI tools, ZO Computer, Manus, AI-assisted coding, and no-code automation.",
  ],
  painPoints: [
    "Staff have tried ChatGPT or other AI tools but do not know how to turn them into repeatable work habits.",
    "AI demos look impressive, but the team still goes back to manual copy-paste work.",
    "Schools and SMEs need examples that match Hong Kong language, workflow, and data-sensitivity realities.",
    "Managers need guardrails so AI improves quality instead of creating unchecked hallucinations.",
  ],
  deliverables: [
    "Custom workshop agenda aligned to your school, SME, or business team.",
    "Hands-on prompt engineering exercises for writing, analysis, operations, and customer communication.",
    "Tool walkthroughs covering selected AI assistants, chatbot builders, AI-assisted coding, and workflow automation tools.",
    "Reusable prompt templates and workflow checklists your team can keep using after the session.",
    "Practical risk guidance for privacy, review, and human approval before AI output is used externally.",
  ],
  expectedOutcomes: [
    "Your team understands where AI is useful, where it is risky, and how to check outputs.",
    "Participants leave with prompts and workflows that fit their daily work instead of generic examples.",
    "Managers gain a shared vocabulary for AI adoption, review, and next-step implementation.",
    "The organization can identify one or two practical AI 工作流 candidates for follow-up implementation.",
  ],
  proofPoints: [
    "Founder-led delivery includes ex-Organizer experience with Google Developer Group Hong Kong and community learning formats such as Flutter Study Group, Build with AI, Google I/O Extended, and DevFest Hong Kong.",
    "InnovateXP has delivered AI workshop/demo sessions for JCI Peninsula.",
    "Founder experience combines 13+ years of IT delivery, mobile apps, cloud architecture, agile delivery, and AI-powered business systems.",
  ],
  modules: [
    "AI mindset and safety: what to automate, what to review, what to keep human.",
    "Prompt engineering for business writing, research, summarization, and decision support.",
    "AI tools for local teams: WorkBuddy, Tencent AI tools, Manus-style agents, and selected no-code automations.",
    "AI-assisted coding and chatbot prototyping for technical or semi-technical teams.",
    "From training to workflow: selecting the first implementation sprint.",
  ],
  relatedLinks: commonRelatedLinks,
  cta: {
    label: "Book an AI training consultation",
    href: "/bookme",
    note: "Tell us your audience, session length, language preference, and the work scenarios you want participants to practise.",
  },
  faqs: [
    {
      question: "Can the AI training be delivered in Cantonese?",
      answer:
        "Yes. Cantonese/English delivery is available, and examples can include Traditional Chinese business language for Hong Kong schools and SMEs.",
    },
    {
      question: "Is this suitable for non-technical staff?",
      answer:
        "Yes. The workshop can be designed for non-technical staff, managers, or mixed teams. Technical modules such as AI-assisted coding are optional.",
    },
    {
      question: "Do you teach a fixed tool list?",
      answer:
        "No. Tool selection depends on your environment. Topics may include WorkBuddy, Tencent AI tools, ZO Computer, Manus, prompt engineering, chatbot prototyping, and workflow automation.",
    },
    {
      question: "Can training connect to implementation afterwards?",
      answer:
        "Yes. Many teams use training to identify a practical AI workflow, then continue with an AI 陪跑課程 or implementation sprint.",
    },
  ],
};

const aiCoaching: ServicePageContent = {
  slug: "ai-coaching",
  schemaKind: "ProfessionalService",
  title: "AI Business Upgrade Programs / AI 陪跑課程 for Hong Kong SMEs",
  metaTitle: "AI 陪跑課程 Hong Kong | AI Business Consultancy | InnovateXP",
  metaDescription:
    "AI Business Upgrade programs for Hong Kong SMEs: 30-day Discovery Sprint, 3-month Foundation, 6-month Accelerator, and advisory for SOPs, KPIs, workflow trials, and AI adoption.",
  eyebrow: "AI Business Upgrade programs",
  intro:
    "AI 陪跑課程 is for SMEs that want structured business upgrade support, not another one-off AI class and not a software-first project. InnovateXP helps your team clarify SOPs, define KPIs, run practical AI trials, and decide whether automation, CRM, or SaaS is actually needed after the workflow is validated.",
  audience: [
    "SME owners who want to adopt AI but do not know which workflow should come first.",
    "Operations, sales, marketing, and admin teams that need hands-on support after training.",
    "Schools or service businesses that want guided AI practice with real internal scenarios.",
    "Teams that need a consultant to bridge business process, AI tools, and technical implementation.",
  ],
  painPoints: [
    "AI ideas keep appearing in meetings, but no one owns the first real implementation.",
    "The team needs confidence and review habits, not just a list of tools.",
    "Existing workflows are messy, so automation needs process clarity before software.",
    "Management needs visible progress without committing to a large transformation project too early.",
  ],
  deliverables: [
    "AI workflow selection and readiness assessment.",
    "Step-by-step implementation roadmap for one priority use case.",
    "Advisory sessions with tasks, review checkpoints, and adoption feedback.",
    "Prompt library, workflow documentation, and decision log.",
    "Lightweight prototype or operating playbook depending on the chosen workflow.",
  ],
  expectedOutcomes: [
    "A real AI workflow moves from idea to tested operating habit.",
    "The team learns how to use, review, and improve AI output responsibly.",
    "Managers gain visibility into what can be automated next and what should stay manual.",
    "The business builds internal AI capability instead of depending only on outsourced IT service.",
  ],
  proofPoints: [
    "Founder-led advisory by InnovateXP, combining system delivery, community teaching, and SME workflow design.",
    "Grounded in practical systems such as SmartSales CRM, EventXP, custom AI agents, and internal dashboards.",
    "Suitable after AI training or as a direct implementation sprint for teams ready to move.",
  ],
  modules: [
    "30-day Discovery Sprint: questionnaire, kickoff, stakeholder interviews, one workflow map, KPI baseline, quick-win recommendation, and 30/60/90-day roadmap.",
    "3-month AI Upgrade Foundation: 1-2 workflows, SOP v1, monthly checkpoints, KPI review, one team training.",
    "6-month AI Upgrade Accelerator: one department or 3-4 workflows, Agile reviews, adoption tracking, up to two workshops.",
    "12-month AI Business Upgrade Partnership: annual roadmap, SOP governance, management reviews, and up to four workshops.",
  ],
  pricing: {
    title: "AI Upgrade Program Pricing",
    intro:
      "Pricing is scoped around advisory programs first. Each package assumes one company and 3-5 core participants / stakeholders. Custom SaaS, CRM, AI agent development, large data migration, API integration, 20-person focus groups, larger workshops, third-party software, AI API, hosting, and subscriptions are separate after the workflow and business case are validated.",
    plans: [
      {
        name: "30-day AI Upgrade Discovery Sprint",
        price: "HK$10,000",
        fit: "Best for a 2-4 person focus group / 3-5 core participants that want to validate one workflow before committing to a larger program.",
        features: [
          "3-minute workflow health check and detailed questionnaire",
          "60-minute kickoff and up to two stakeholder interviews",
          "One workflow map, SOP / workflow draft, KPI baseline",
          "One AI / automation quick-win recommendation and 30/60/90-day roadmap",
        ],
      },
      {
        name: "3-month AI Upgrade Foundation",
        price: "HK$26,000",
        fit: "Best for 3-5 core participants improving 1-2 workflows and building the first reviewable adoption result.",
        features: [
          "SOP v1, role responsibility, and handoff design",
          "Monthly planning, checkpoint, and KPI review",
          "Improvement backlog and AI / automation quick-win trials",
          "One practical team training and monthly outcome summary",
        ],
      },
      {
        name: "6-month AI Upgrade Accelerator",
        price: "HK$50,000",
        fit: "Best for a small core team or department representatives improving 3-4 related workflows that need adoption tracking and management visibility.",
        features: [
          "Agile checkpoints and KPI / adoption review",
          "SOP v2, exception handling, and cross-role handoff",
          "AI workflow, CRM, or automation solution design when justified",
          "Up to two practical workshops and management roadmap review",
        ],
      },
      {
        name: "12-month AI Business Upgrade Partnership",
        price: "HK$98,000",
        fit: "Best for management / core owners building long-term AI adoption governance after the model is validated.",
        features: [
          "Annual AI / process upgrade roadmap",
          "Cross-department opportunity mapping and prioritization",
          "SOP governance, knowledge management, and management reviews",
          "Up to four team workshops and implementation governance",
        ],
      },
    ],
    note:
      "Not included: 20-person focus groups or large workshops, custom SaaS / CRM / AI agent development, large data migration, API integration, daily operations outsourcing, legal/accounting/tax/HR/audit/compliance advice, third-party software, AI API, hosting costs, and guaranteed ROI or revenue outcomes. Extra participants, departments, workshops, or training sessions are scoped separately by headcount, session count, and preparation work.",
  },
  relatedLinks: commonRelatedLinks,
  cta: {
    label: "Book a 30-minute Workflow Review",
    href: "/bookme",
    note: "Bring one workflow you want to improve, or ask us to help identify the best starting point.",
  },
  faqs: [
    {
      question: "How is AI advisory different from AI training?",
      answer:
        "Training teaches concepts and hands-on tool usage. Advisory follows your team through implementation so one workflow becomes a repeatable operating habit.",
    },
    {
      question: "Do we need technical staff?",
      answer:
        "Not always. Some sprints produce prompts, playbooks, and no-code workflows. More technical use cases can include chatbot prototypes, dashboards, or integrations.",
    },
    {
      question: "How long does an AI 陪跑課程 take?",
      answer:
        "A focused sprint can start with four weeks. Larger workflows may continue with additional implementation cycles.",
    },
    {
      question: "Can you work with our existing tools?",
      answer:
        "Yes. We start from your current workflow and select tools only where they support adoption, governance, and measurable improvement.",
    },
  ],
};

const smeWorkflow: ServicePageContent = {
  slug: "sme-ai-workflow",
  schemaKind: "ProfessionalService",
  title: "SME AI Workflow Consulting for Hong Kong Businesses",
  metaTitle: "SME AI Workflow Consulting Hong Kong | 中小企 AI 升級 | InnovateXP",
  metaDescription:
    "InnovateXP helps Hong Kong SMEs design practical AI workflows for sales follow-up, operations, admin, CRM, WhatsApp automation, dashboards, and internal tools.",
  eyebrow: "Hong Kong SME AI workflow automation",
  intro:
    "InnovateXP helps Hong Kong SMEs turn scattered manual work into practical AI-assisted workflows. We focus on real operating processes: WhatsApp follow-up, quotation follow-up, admin portals, dashboards, customer service drafts, SOP handover, and internal AI tools. The work is founder-led by InnovateXP, an AI Business Consultancy with 13+ years of IT delivery and architecture experience.",
  audience: [
    "3-50 person SMEs that need better sales, operations, and follow-up discipline.",
    "Founder-led service businesses where the owner still coordinates too much manually.",
    "Teams with WhatsApp, spreadsheets, email, forms, and dashboards spread across too many places.",
    "Businesses that want AI transformation with practical delivery, not abstract strategy decks.",
  ],
  painPoints: [
    "Customer leads arrive through WhatsApp, forms, events, or referrals but are not followed up consistently.",
    "Quotation, invoice, payment, and delivery status are tracked in separate spreadsheets.",
    "Managers cannot see bottlenecks until work is already late.",
    "AI adoption is stuck because the business has not chosen one clear workflow to improve first.",
  ],
  deliverables: [
    "Workflow audit and priority map.",
    "Target operating flow with AI assist points, human review points, and data boundaries.",
    "Prototype or production implementation using suitable web, automation, CRM, chatbot, or dashboard tools.",
    "Team training and adoption guidance so staff understand the new process.",
    "Measurement plan for first signals such as response time, follow-up completion, admin time saved, or fewer missed handoffs.",
  ],
  expectedOutcomes: [
    "The business gets a clear first AI workflow instead of scattered experiments.",
    "Staff receive practical tools and review habits that improve day-to-day work.",
    "Managers can see progress, ownership, and next actions more clearly.",
    "AI becomes an empowerment layer for the team, not a black box replacing judgment.",
  ],
  proofPoints: [
    "Examples include EventXP, SmartSales CRM, Proposal-to-Cash AI, booking flows, dashboards, admin portals, and custom AI agents.",
    "InnovateXP brings 13+ years across mobile apps, cloud architecture, agile delivery, and AI-powered business systems.",
    "Community and training background includes Google Developer Group Hong Kong and AI workshop/demo delivery.",
  ],
  relatedLinks: [
    { label: "SmartSales CRM", href: "/smartsales-crm" },
    { label: "EventXP", href: "/eventxp" },
    { label: "Proposal-to-Cash AI", href: "/proposal-to-cash-ai" },
    { label: "AI Coaching", href: "/ai-coaching" },
  ],
  cta: {
    label: "Book an SME AI workflow consultation",
    href: "/bookme",
    note: "We usually start with one workflow and one measurable adoption target.",
  },
  faqs: [
    {
      question: "What kind of SME workflows can InnovateXP improve?",
      answer:
        "Common starting points include WhatsApp lead follow-up, quotation follow-up, event-to-sales workflow, internal dashboards, booking systems, admin portals, and chatbot prototypes.",
    },
    {
      question: "Do you only provide consulting, or also implementation?",
      answer:
        "Both. InnovateXP can audit, design, train, prototype, and implement. The scope depends on your workflow and risk level.",
    },
    {
      question: "Can you help if our current system is messy?",
      answer:
        "Yes. System rescue, technical audit, and clean architecture refactor can be part of the engagement when the workflow depends on unstable existing software.",
    },
    {
      question: "Is AI always the answer?",
      answer:
        "No. We identify where AI genuinely helps and where simpler rules, dashboards, or process cleanup are better. The goal is adoption and business clarity.",
    },
  ],
};

const proposalToCash: ServicePageContent = {
  slug: "proposal-to-cash-ai",
  schemaKind: "ProfessionalService",
  title: "Proposal-to-Cash AI Workflow for B2B Teams",
  metaTitle: "Proposal-to-Cash AI | B2B Quotation Follow-Up Automation | InnovateXP",
  metaDescription:
    "A practical AI-assisted workflow for B2B quotation, proposal follow-up, invoice/payment tracking, and management visibility for Hong Kong SMEs.",
  eyebrow: "B2B quotation to payment workflow",
  intro:
    "Proposal-to-Cash AI helps B2B teams connect quotation, proposal follow-up, invoice status, and payment tracking into one clearer workflow. Instead of losing deals between WhatsApp, email, spreadsheets, and accounting reminders, your team gets structured next actions, draft follow-ups, and visibility from first proposal to collected cash.",
  audience: [
    "B2B service companies that send many quotations and need disciplined follow-up.",
    "Sales/admin teams that hand off between proposal, invoice, delivery, and payment collection.",
    "Founder-led SMEs where the owner still chases every quote manually.",
    "Teams that need a practical AI 工作流 before investing in a full ERP or enterprise CRM.",
  ],
  painPoints: [
    "Quotes are sent, but follow-up timing depends on memory.",
    "Sales, finance, and delivery status are tracked in separate places.",
    "Management cannot see which proposals are stuck, won, lost, invoiced, or paid.",
    "Customers receive inconsistent follow-up language across different staff members.",
  ],
  deliverables: [
    "Workflow map from inquiry to quotation, follow-up, invoice, payment, and renewal opportunity.",
    "Status model and dashboard for quote stage, owner, next action, and payment state.",
    "AI-assisted follow-up prompts and message drafts for email or WhatsApp usage.",
    "Reminder rules and escalation points for overdue proposals or unpaid invoices.",
    "Implementation plan that can integrate with SmartSales CRM, spreadsheets, forms, or custom admin portals.",
  ],
  expectedOutcomes: [
    "Fewer proposals disappear after being sent.",
    "Owners and managers see where revenue is blocked before month-end.",
    "Staff get clearer next actions and reusable follow-up language.",
    "The business develops a repeatable revenue operation rather than one-off quote chasing.",
  ],
  proofPoints: [
    "Built from InnovateXP’s broader work in CRM, WhatsApp follow-up, dashboard, booking, and admin portal projects.",
    "Designed for practical SME adoption before large-scale system replacement.",
    "Can connect with SmartSales CRM or become a standalone workflow prototype depending on scope.",
  ],
  relatedLinks: [
    { label: "SME AI Workflow", href: "/sme-ai-workflow" },
    { label: "SmartSales CRM", href: "/smartsales-crm" },
    { label: "AI Coaching", href: "/ai-coaching" },
    { label: "Relevant Experience & Delivery Capability", href: "/case-studies" },
  ],
  cta: {
    label: "Map your proposal-to-cash workflow",
    href: "/bookme",
    note: "Bring sample quotation stages and the places your team currently tracks follow-up.",
  },
  faqs: [
    {
      question: "Is Proposal-to-Cash AI a fixed product?",
      answer:
        "It is a workflow implementation pattern. Depending on your team, it may become a SmartSales CRM setup, a custom dashboard, a no-code workflow, or an internal tool.",
    },
    {
      question: "Can it work with WhatsApp follow-up?",
      answer:
        "Yes. The workflow can include WhatsApp-friendly draft messages, next-action reminders, and status tracking for chat-led sales teams.",
    },
    {
      question: "Does it replace accounting software?",
      answer:
        "No. It focuses on workflow visibility and follow-up discipline around proposals, invoices, and payments. Existing accounting tools can remain in place.",
    },
    {
      question: "How do we start?",
      answer:
        "Start with an audit of the current quote-to-cash path. We then define the first dashboard, automation, and AI draft points.",
    },
  ],
};

export const servicePages: Record<ServicePageSlug, ServicePageContent> = {
  "ai-training": aiTraining,
  "ai-coaching": aiCoaching,
  "sme-ai-workflow": smeWorkflow,
  "proposal-to-cash-ai": proposalToCash,
};

const servicePagesZhTw: Record<ServicePageSlug, ServicePageContent> = {
  "ai-training": {
    ...aiTraining,
    title: "AI 培訓／AI 教班：給學校、中小企業與商務團隊",
    metaTitle: "AI 培訓／AI 教班｜學校與中小企業 AI 實務課程｜InnovateXP",
    metaDescription:
      "InnovateXP 為學校、中小企業與商務團隊提供實務 AI 培訓：提示工程、AI 工具、AI 輔助編程、聊天機器人原型與工作流程自動化。",
    eyebrow: "創辦人親自主講的 AI 培訓",
    intro:
      "InnovateXP 的 AI 培訓不是單純工具展示，而是協助學校、中小企業與商務團隊把 AI 用在真實工作：研究、寫作、客戶跟進、編程輔助、聊天機器人原型與流程自動化。課程可用粵語／英語進行，並加入繁體中文與香港、台灣團隊熟悉的 business workflow 例子，適合搜尋 AI 教班、中小企 AI 升級與 AI 工作流的團隊。",
    audience: [
      "正在建立 AI 素養的學校、教育中心與學生團體。",
      "希望員工安全使用 AI 處理日常工作的中小企業主與主管。",
      "需要可重複 AI 工作流的銷售、行銷、行政與客服團隊。",
      "正在比較 WorkBuddy、騰訊 AI 工具、ZO Computer、Manus、AI 輔助編程與 no-code automation 的商務團隊。",
    ],
    painPoints: [
      "員工試過 ChatGPT 或其他 AI 工具，但不知道如何變成穩定工作習慣。",
      "AI demo 看起來很厲害，團隊最後仍回到手動複製貼上。",
      "學校與企業需要貼近本地語言、流程與資料敏感度的範例。",
      "管理層需要檢查與審批機制，避免 AI 內容未經驗證就對外使用。",
    ],
    deliverables: [
      "依學校、SME 或商務團隊設計的客製化 workshop agenda。",
      "針對寫作、分析、營運與客戶溝通的提示工程練習。",
      "精選 AI 助手、聊天機器人、AI 輔助編程與 workflow automation 工具示範。",
      "課後可繼續使用的 prompt templates 與工作流程 checklist。",
      "隱私、審閱與 human approval 的實務風險指引。",
    ],
    expectedOutcomes: [
      "團隊理解 AI 適合用在哪裡、哪裡有風險，以及如何檢查輸出。",
      "參加者帶走貼近日常工作的 prompts 與流程，而不是泛泛的示範。",
      "管理層取得共同語言，方便推動 AI adoption、review 與下一步 implementation。",
      "組織能找出一至兩條值得落地的 AI 工作流候選項目。",
    ],
    modules: [
      "AI mindset 與安全：哪些可自動化、哪些要審閱、哪些必須保留人工判斷。",
      "商務寫作、研究、摘要與決策支援的提示工程。",
      "本地團隊常見 AI 工具：WorkBuddy、騰訊 AI 工具、Manus-style agents 與 no-code automation。",
      "給技術或半技術團隊的 AI 輔助編程與 chatbot prototyping。",
      "由培訓走向工作流：挑選第一個 implementation sprint。",
    ],
    cta: {
      ...aiTraining.cta,
      label: "預約 AI 培訓諮詢",
      note: "請告訴我們受眾、課程長度、語言偏好，以及希望學員練習的工作場景。",
    },
    faqs: [
      {
        question: "AI 培訓可以用粵語或中文進行嗎？",
        answer: "可以。可用粵語／英語進行，並加入繁體中文商務語境與本地學校、中小企業案例。",
      },
      {
        question: "非技術同事適合參加嗎？",
        answer: "適合。課程可為非技術員工、主管或混合團隊設計；AI 輔助編程等技術模組可按需要加入。",
      },
      {
        question: "課程會固定教某幾個工具嗎？",
        answer: "不會。工具會依你的環境選擇，可能包含 WorkBuddy、騰訊 AI 工具、ZO Computer、Manus、prompt engineering、chatbot prototyping 與 workflow automation。",
      },
      {
        question: "培訓後可以接續實作嗎？",
        answer: "可以。很多團隊會先用培訓找出可落地的 AI 工作流，再接 AI 陪跑課程或 implementation sprint。",
      },
    ],
  },
  "ai-coaching": {
    ...aiCoaching,
    title: "AI 商業升級陪跑課程：香港中小企 SOP、KPI 與 AI adoption",
    metaTitle: "AI 陪跑課程｜AI 商業顧問｜香港中小企 AI 顧問｜InnovateXP",
    metaDescription:
      "InnovateXP 為香港中小企提供 AI 商業升級陪跑：30 日 Discovery Sprint、3 個月 Foundation、6 個月 Accelerator，協助梳理 SOP、設定 KPI、試行 AI 並改善團隊採用。",
    eyebrow: "AI 商業升級陪跑",
    intro:
      "AI 陪跑課程適合想先執順流程、再落地 AI 的香港中小企。InnovateXP 不會一開始叫你重做系統，而是先透過問卷、訪談、SOP mapping、KPI baseline 和 review checkpoint，陪團隊試行最值得改善的一條 workflow；確認 business case 後，才另行建議 automation、CRM 或 SaaS。",
    audience: [
      "想導入 AI、但不知道第一條流程該從哪裡開始的中小企業主。",
      "培訓後需要 hands-on support 的營運、銷售、行銷與行政團隊。",
      "希望以真實內部場景練習 AI 的學校或服務型企業。",
      "需要有人橋接 business process、AI tools 與 technical implementation 的團隊。",
    ],
    painPoints: [
      "會議中有很多 AI 想法，但沒有人真正負責第一個實作。",
      "團隊需要信心與審閱習慣，不只是工具清單。",
      "現有流程混亂，因此自動化前要先釐清流程。",
      "管理層想看到進展，但暫時不想投入大型 transformation project。",
    ],
    deliverables: [
      "AI workflow 選題與 readiness assessment。",
      "針對一個優先 use case 的逐步 implementation roadmap。",
      "顧問會議、任務、review checkpoints 與 adoption feedback。",
      "Prompt library、workflow documentation 與 decision log。",
      "依工作流需要提供 lightweight prototype 或 operating playbook。",
    ],
    expectedOutcomes: [
      "一條真正的 AI 工作流由想法走到可測試的操作習慣。",
      "團隊學會如何使用、審閱與改善 AI output。",
      "管理者看清下一步哪些可自動化、哪些應保留人工處理。",
      "企業建立內部 AI capability，而不是只依賴外判 IT service。",
    ],
    modules: [
      "30 日 Discovery Sprint：流程健康檢查、kickoff、最多兩次訪談、一條 workflow map、KPI baseline、quick-win 建議與 30/60/90 日 roadmap。",
      "3 個月 AI Upgrade Foundation：改善 1-2 條 workflow、SOP v1、每月 checkpoint、KPI review、一次團隊實戰培訓。",
      "6 個月 AI Upgrade Accelerator：擴展至一個部門或 3-4 條流程，Agile reviews、adoption tracking、最多兩次 workshop。",
      "12 個月 AI Business Upgrade Partnership：年度 roadmap、跨部門優先排序、SOP governance、管理層 reviews、最多四次 workshop。",
    ],
    pricing: {
      title: "AI 陪跑定價",
      intro:
        "定價以陪跑計劃 / advisory 為主，不是軟件套裝。每個 package 以 1 間公司、3-5 位核心參與者 / stakeholders 為基準；客製化 SaaS、CRM、AI agent、大型 data migration、API integration、20 人 focus group、大班 workshop、第三方軟件、AI API、hosting 和雲端成本，會在 workflow 和 business case 驗證後另行 scope。",
      plans: [
        {
          name: "30 日 AI Upgrade Discovery Sprint",
          price: "HK$10,000",
          fit: "適合 2-4 人 focus group／3-5 位核心參與者先試一個 workflow，再決定是否擴展的 SME。",
          features: [
            "3 分鐘流程健康檢查與詳細 active questionnaire",
            "60 分鐘 kickoff 與最多 2 次持份者訪談",
            "1 條 workflow map、SOP / workflow draft、KPI baseline",
            "1 個 AI / automation quick-win 建議及 30/60/90 日 roadmap",
          ],
        },
        {
          name: "3 個月 AI Upgrade Foundation",
          price: "HK$26,000",
          fit: "適合 3-5 位核心參與者改善 1-2 條流程，建立第一個可驗收 adoption 成果。",
          features: [
            "SOP v1、角色責任與 handoff 設計",
            "每月 planning、checkpoint 與 KPI review",
            "Improvement backlog 與 AI / automation quick-win trials",
            "1 次團隊實戰培訓與月度成果摘要",
          ],
        },
        {
          name: "6 個月 AI Upgrade Accelerator",
          price: "HK$50,000",
          fit: "適合一個小核心團隊或部門代表改善 3-4 條相關流程，需要 adoption tracking 與管理層可視性。",
          features: [
            "Agile checkpoints 與 KPI / adoption review",
            "SOP v2、exception handling 與跨角色 handoff",
            "在有需要時設計 AI workflow、CRM 或 automation solution",
            "最多 2 次實戰 workshop 與管理層 roadmap review",
          ],
        },
        {
          name: "12 個月 AI Business Upgrade Partnership",
          price: "HK$98,000",
          fit: "適合已驗證模式後，由管理層 / 核心 owner 將 AI adoption、SOP 和流程優化變成長期管理能力。",
          features: [
            "年度 AI / 流程升級 roadmap",
            "跨部門 opportunity mapping 與優先排序",
            "SOP governance、知識管理與管理層 reviews",
            "最多 4 次團隊 workshop 與 implementation governance",
          ],
        },
      ],
      note:
        "不包括：20 人 focus group 或大型 workshop、客製化 SaaS / CRM / AI agent 開發、大型 data migration、API integration、代替日常營運、法律 / 會計 / 稅務 / HR / 審計 / 合規意見、第三方軟件、AI API、hosting 費用，以及保證 ROI 或收入成果。額外參與者、部門、workshop 或培訓場次會按人數、場次和準備工作另行報價。",
    },
    cta: {
      ...aiCoaching.cta,
      label: "預約 30 分鐘流程診斷",
      note: "帶來一條你想改善的流程；如果還不確定，我們會先用流程健康檢查協助找出最佳起點。",
    },
    faqs: [
      {
        question: "AI 陪跑與 AI 培訓有什麼不同？",
        answer: "培訓偏向概念與工具練習；陪跑會跟著團隊做實作，讓一條工作流變成可重複的營運習慣。",
      },
      {
        question: "一定需要技術人員參與嗎？",
        answer: "不一定。有些 sprint 產出 prompts、playbooks 與 no-code workflows；較技術的 use case 可包含 chatbot prototype、dashboard 或 integration。",
      },
      {
        question: "AI 陪跑課程通常多久？",
        answer: "可由四週聚焦 sprint 開始；較大型的工作流可再延伸成後續 implementation cycles。",
      },
      {
        question: "可以配合現有工具嗎？",
        answer: "可以。我們會由你現有流程開始，只在工具能支援採用、治理與可衡量改善時才加入。",
      },
    ],
  },
  "sme-ai-workflow": {
    ...smeWorkflow,
    title: "中小企業 AI 工作流顧問服務",
    metaTitle: "中小企業 AI 工作流顧問｜中小企 AI 升級｜InnovateXP",
    metaDescription:
      "InnovateXP 協助中小企業設計實用 AI 工作流：銷售跟進、營運、行政、CRM、WhatsApp 自動化、dashboard 與內部工具。",
    eyebrow: "香港與台灣中小企業 AI 工作流自動化",
    intro:
      "InnovateXP 協助中小企業把零散的人工作業變成實用的 AI-assisted workflows。我們聚焦真實營運流程：WhatsApp follow-up、quotation follow-up、admin portal、dashboard、客服草稿、SOP 交接與 internal AI tools。服務由 InnovateXP founder 親自帶領，定位為 AI 商業顧問，具備 13+ 年 IT delivery 與 architecture 經驗。",
    audience: [
      "需要提升銷售、營運與跟進紀律的 3-50 人中小企業。",
      "仍由老闆親自協調大量流程的 founder-led service businesses。",
      "WhatsApp、試算表、email、forms、dashboards 分散在太多地方的團隊。",
      "想做 AI transformation，但需要 practical delivery 而不是抽象策略簡報的企業。",
    ],
    painPoints: [
      "客戶 leads 來自 WhatsApp、forms、活動或 referral，但跟進不一致。",
      "報價、invoice、payment 與 delivery status 分散在不同試算表。",
      "管理者太晚才看到 bottlenecks。",
      "AI adoption 卡住，因為企業還沒有選出第一條清晰工作流。",
    ],
    deliverables: [
      "Workflow audit 與 priority map。",
      "包含 AI assist points、human review points 與 data boundaries 的目標流程。",
      "依需求用 web、automation、CRM、chatbot 或 dashboard tools 做 prototype 或 production implementation。",
      "Team training 與 adoption guidance，讓員工理解新流程。",
      "第一批成效指標，例如 response time、follow-up completion、admin time saved 或 missed handoffs 減少。",
    ],
    expectedOutcomes: [
      "企業獲得一條清晰的第一個 AI workflow，而不是分散試驗。",
      "員工取得能改善日常工作的工具與 review habits。",
      "管理者更清楚看到進度、ownership 與 next actions。",
      "AI 成為 empower 團隊的層次，而不是取代判斷的黑盒。",
    ],
    cta: {
      ...smeWorkflow.cta,
      label: "預約 SME AI 工作流諮詢",
      note: "通常先由一條工作流與一個可衡量 adoption target 開始。",
    },
  },
  "proposal-to-cash-ai": {
    ...proposalToCash,
    title: "Proposal-to-Cash AI：B2B 報價到收款工作流",
    metaTitle: "Proposal-to-Cash AI｜B2B 報價跟進與收款流程自動化｜InnovateXP",
    metaDescription:
      "為中小企業設計的 AI-assisted workflow：B2B 報價、proposal follow-up、invoice/payment tracking 與管理可視性。",
    eyebrow: "B2B quotation to payment workflow",
    intro:
      "Proposal-to-Cash AI 協助 B2B 團隊把報價、proposal follow-up、invoice status 與 payment tracking 串成更清晰的流程。與其讓 deals 掉在 WhatsApp、email、spreadsheets 與 accounting reminders 之間，團隊可以得到 structured next actions、AI draft follow-ups，以及由 proposal 到 collected cash 的可視性。",
    audience: [
      "大量發送報價、需要更有紀律跟進的 B2B service companies。",
      "需要在 proposal、invoice、delivery 與 payment collection 之間交接的 sales/admin teams。",
      "仍由老闆手動追每份 quotation 的 founder-led SMEs。",
      "在投資完整 ERP 或 enterprise CRM 前，想先建立 practical AI 工作流的團隊。",
    ],
    painPoints: [
      "報價已發出，但 follow-up timing 依賴記憶。",
      "Sales、finance 與 delivery status 分散在不同地方。",
      "管理層看不到 proposals 是 stuck、won、lost、invoiced 還是 paid。",
      "不同同事對客戶的 follow-up language 不一致。",
    ],
    deliverables: [
      "由 inquiry 到 quotation、follow-up、invoice、payment 與 renewal opportunity 的 workflow map。",
      "用於 quote stage、owner、next action 與 payment state 的 status model 和 dashboard。",
      "給 email 或 WhatsApp 使用的 AI-assisted follow-up prompts 與 message drafts。",
      "逾期 proposals 或 unpaid invoices 的 reminder rules 與 escalation points。",
      "可與 SmartSales CRM、spreadsheets、forms 或 custom admin portals 整合的 implementation plan。",
    ],
    expectedOutcomes: [
      "更少 proposals 在發出後消失。",
      "老闆與管理者在月底前看見 revenue blocked 在哪裡。",
      "員工有更清晰 next actions 與 reusable follow-up language。",
      "企業建立可重複 revenue operation，而不是一次次追報價。",
    ],
    cta: {
      ...proposalToCash.cta,
      label: "盤點你的報價到收款流程",
      note: "請帶來目前 quotation stages，以及團隊追蹤 follow-up 的地方。",
    },
  },
};

const servicePagesJa: Record<ServicePageSlug, ServicePageContent> = {
  "ai-training": {
    ...aiTraining,
    title: "学校・中小企業・ビジネスチーム向け AI トレーニング",
    metaTitle: "香港 AI トレーニング | 学校・中小企業向け実践講座 | InnovateXP",
    metaDescription:
      "InnovateXP による実践型 AI トレーニング。プロンプト設計、AI ツール、AI 支援コーディング、チャットボット試作、ワークフロー自動化を扱います。",
    eyebrow: "創業者による実践型 AI トレーニング",
    intro:
      "InnovateXP の AI トレーニングは、単なるツール紹介ではありません。学校、中小企業、ビジネスチームが研究、文章作成、顧客フォロー、コーディング支援、チャットボット試作、業務自動化に AI を使えるように設計します。広東語・英語での実施に対応し、香港の業務文脈に合わせた例を使います。",
    audience: [
      "AI リテラシーを高めたい学校、教育機関、学生グループ。",
      "日常業務で安全に AI を使いたい中小企業の経営者・管理者。",
      "再利用可能な AI ワークフローを必要とする営業、マーケティング、管理、CS チーム。",
      "WorkBuddy、Tencent AI ツール、ZO Computer、Manus、AI 支援コーディング、ノーコード自動化を比較しているチーム。",
    ],
    painPoints: [
      "ChatGPT などを試したが、継続的な仕事の型にできていない。",
      "AI デモは良く見えるが、現場は手作業に戻ってしまう。",
      "地域の言語、業務フロー、データ感度に合った例が必要。",
      "AI 出力を外部利用する前に、確認と承認のルールが必要。",
    ],
    deliverables: [
      "学校、SME、ビジネスチームに合わせたワークショップ設計。",
      "文章作成、分析、業務、顧客対応に使うプロンプト演習。",
      "AI アシスタント、チャットボット、AI 支援コーディング、ワークフロー自動化の実演。",
      "研修後も使えるプロンプトテンプレートと業務チェックリスト。",
      "プライバシー、レビュー、人による承認の実務ガイド。",
    ],
    expectedOutcomes: [
      "チームが AI の有効領域、リスク、確認方法を理解する。",
      "参加者が日常業務に近いプロンプトとワークフローを持ち帰る。",
      "管理者が AI 導入、レビュー、次の実装について共通言語を持てる。",
      "次に実装すべき AI ワークフロー候補を見つけられる。",
    ],
    modules: [
      "AI の考え方と安全性：自動化すること、レビューすること、人が判断すること。",
      "文章作成、調査、要約、意思決定支援のプロンプト設計。",
      "地域チーム向け AI ツールとノーコード自動化。",
      "技術・半技術チーム向け AI 支援コーディングとチャットボット試作。",
      "研修から実装へ：最初の実装スプリントを選ぶ。",
    ],
    cta: {
      ...aiTraining.cta,
      label: "AI トレーニングを相談する",
      note: "対象者、時間、言語、練習したい業務シナリオをお知らせください。",
    },
  },
  "ai-coaching": {
    ...aiCoaching,
    title: "中小企業向け AI 実装コーチング",
    metaTitle: "AI伴走プログラム | SME向けAI導入スプリント | InnovateXP",
    metaDescription:
      "1つの業務フローを選び、初版を作り、チームで試し、改善するための実践型 AI 実装コーチング。",
    eyebrow: "伴走型 AI 実装コーチング",
    intro:
      "AI コーチングは、講座を聞くだけでなく実装まで進めたいチーム向けです。InnovateXP は SME が1つの業務フローを選び、初版を設計し、チームでテストし、毎週のコーチングで改善できるよう支援します。",
    audience: [
      "AI を導入したいが、最初の業務フローが決まっていない SME 経営者。",
      "研修後に実践支援を必要とする業務、営業、マーケ、管理チーム。",
      "実際の社内シナリオで AI を練習したい学校やサービス業。",
      "業務プロセス、AI ツール、技術実装を橋渡しするコーチが必要なチーム。",
    ],
    painPoints: [
      "AI アイデアは多いが、最初の実装責任者がいない。",
      "ツール一覧よりも、自信とレビュー習慣が必要。",
      "既存フローが複雑で、自動化前に整理が必要。",
      "大規模投資の前に、目に見える進捗が欲しい。",
    ],
    deliverables: [
      "AI ワークフロー選定と readiness assessment。",
      "優先ユースケースの段階的 implementation roadmap。",
      "毎週のコーチング、タスク、レビュー、採用フィードバック。",
      "プロンプトライブラリ、業務ドキュメント、意思決定ログ。",
      "選んだフローに応じた軽量プロトタイプまたは運用プレイブック。",
    ],
    expectedOutcomes: [
      "AI ワークフローがアイデアからテスト可能な運用習慣へ進む。",
      "チームが AI 出力の使い方、確認、改善方法を学ぶ。",
      "管理者が次に自動化できる範囲と手作業に残す範囲を見極める。",
      "外注だけに頼らず、社内の AI 活用力を育てる。",
    ],
    modules: [
      "Week 1：業務発見、リスク境界、最初のユースケース選定。",
      "Week 2：プロンプト／システム設計、データ入力、人のレビュー点。",
      "Week 3：プロトタイプまたは運用プレイブックとチームテスト。",
      "Week 4：採用レビュー、改善 backlog、次スプリント提案。",
    ],
    cta: {
      ...aiCoaching.cta,
      label: "AI コーチングスプリントを相談する",
      note: "改善したい業務フローを1つお持ちください。未定の場合は起点選びから支援します。",
    },
  },
  "sme-ai-workflow": {
    ...smeWorkflow,
    title: "香港中小企業向け SME AI ワークフローコンサルティング",
    metaTitle: "SME AI ワークフローコンサルティング香港 | InnovateXP",
    metaDescription:
      "営業フォロー、業務、管理、CRM、WhatsApp 自動化、ダッシュボード、社内ツールのための実践的 AI ワークフロー設計。",
    eyebrow: "香港 SME 向け AI ワークフロー自動化",
    intro:
      "InnovateXP は香港の SME が散らばった手作業を実用的な AI 支援ワークフローへ変える支援をします。WhatsApp CRM 自動化、営業フォロー、見積もりフォロー、管理ポータル、ダッシュボード、CS 草案、社内 AI ツールなど、実際の業務に焦点を当てます。",
    audience: [
      "営業、業務、フォローアップの規律を高めたい 3-50 名規模の SME。",
      "経営者が多くの調整を抱えている founder-led service businesses。",
      "WhatsApp、スプレッドシート、メール、フォーム、ダッシュボードが分散しているチーム。",
      "抽象的な戦略資料ではなく、実装可能な AI transformation を求める企業。",
    ],
    cta: {
      ...smeWorkflow.cta,
      label: "SME AI ワークフローを相談する",
      note: "通常は1つの業務フローと1つの測定可能な adoption target から始めます。",
    },
  },
  "proposal-to-cash-ai": {
    ...proposalToCash,
    title: "Proposal-to-Cash AI：B2B 見積もりから回収までのワークフロー",
    metaTitle: "Proposal-to-Cash AI | B2B 見積もりフォロー自動化 | InnovateXP",
    metaDescription:
      "B2B 見積もり、提案フォロー、請求／入金状況、管理可視性をつなぐ AI 支援ワークフロー。",
    eyebrow: "B2B quotation to payment workflow",
    intro:
      "Proposal-to-Cash AI は、見積もり、提案フォロー、請求状況、入金確認を1つの見える業務フローにつなげます。WhatsApp、メール、スプレッドシート、会計リマインダーの間で案件を失わないよう、次アクション、AI 下書き、回収までの可視性を整えます。",
    cta: {
      ...proposalToCash.cta,
      label: "Proposal-to-Cash ワークフローを相談する",
      note: "現在の見積もりステージと、フォローアップを追跡している場所を共有してください。",
    },
  },
};

const servicePagesDe: Record<ServicePageSlug, ServicePageContent> = {
  "ai-training": {
    ...aiTraining,
    title: "AI-Training für Schulen, KMUs und Business-Teams",
    metaTitle: "AI-Training Hongkong | Praktische KI-Schulung für Schulen & KMUs | InnovateXP",
    metaDescription:
      "Praktisches AI-Training mit InnovateXP: Prompt Engineering, AI-Tools, AI-assisted Coding, Chatbot-Prototyping und Workflow-Automatisierung.",
    eyebrow: "Founder-led AI-Training",
    intro:
      "InnovateXP bietet praktisches AI-Training für Schulen, KMUs und Business-Teams, die mehr brauchen als eine Tool-Demo. InnovateXP zeigt, wie Teams AI in echter Arbeit einsetzen: Recherche, Schreiben, Kunden-Follow-up, Coding-Unterstützung, Chatbot-Prototyping und Workflow-Automatisierung.",
    audience: [
      "Schulen, Bildungszentren und Studierendengruppen mit Fokus auf AI Literacy.",
      "KMU-Inhaber und Manager, die AI sicher in tägliche Abläufe bringen wollen.",
      "Sales-, Marketing-, Admin- und Customer-Service-Teams mit Bedarf an wiederholbaren AI-Workflows.",
      "Teams, die WorkBuddy, Tencent AI Tools, ZO Computer, Manus, AI-assisted Coding und No-Code-Automation vergleichen.",
    ],
    painPoints: [
      "Mitarbeitende haben AI-Tools ausprobiert, aber noch keine wiederholbaren Arbeitsgewohnheiten entwickelt.",
      "Demos wirken stark, doch im Alltag bleibt es bei manuellem Copy-Paste.",
      "Schulen und KMUs brauchen Beispiele, die zu Sprache, Workflow und Datenschutzrealität passen.",
      "Manager brauchen Leitplanken, damit AI Qualität verbessert statt ungeprüfte Inhalte zu erzeugen.",
    ],
    deliverables: [
      "Workshop-Agenda passend zu Schule, KMU oder Business-Team.",
      "Hands-on Prompt-Engineering für Schreiben, Analyse, Betrieb und Kundenkommunikation.",
      "Tool-Walkthroughs für AI-Assistenten, Chatbots, AI-assisted Coding und Workflow-Automation.",
      "Prompt-Vorlagen und Workflow-Checklisten für die Nutzung nach dem Training.",
      "Praktische Risikohinweise zu Datenschutz, Review und menschlicher Freigabe.",
    ],
    expectedOutcomes: [
      "Das Team versteht, wo AI nützlich ist, wo Risiken liegen und wie Outputs geprüft werden.",
      "Teilnehmende nehmen Prompts und Workflows mit, die zu ihrer täglichen Arbeit passen.",
      "Manager erhalten eine gemeinsame Sprache für AI-Adoption, Review und nächste Umsetzungsschritte.",
      "Die Organisation kann ein bis zwei AI-Workflow-Kandidaten für die Umsetzung identifizieren.",
    ],
    cta: {
      ...aiTraining.cta,
      label: "AI-Training anfragen",
      note: "Teile Zielgruppe, Dauer, Sprache und die Arbeitsszenarien, die geübt werden sollen.",
    },
  },
  "ai-coaching": {
    ...aiCoaching,
    title: "AI-Coaching für KMU-Implementierung",
    metaTitle: "AI-Coaching Hongkong | KI-Implementierungssprint für KMUs | InnovateXP",
    metaDescription:
      "Begleitetes AI-Coaching für KMUs: einen Workflow wählen, erste Version bauen, Team trainieren und Adoption Schritt für Schritt verbessern.",
    eyebrow: "Done-with-you Implementation Coaching",
    intro:
      "AI-Coaching ist für Teams, die Umsetzung statt nur Inspiration suchen. InnovateXP hilft KMUs, einen Workflow auszuwählen, die erste Version zu entwerfen, mit dem Team zu testen und in wöchentlichen Coachings zu verbessern.",
    audience: [
      "KMU-Inhaber, die AI einsetzen wollen, aber den ersten Workflow noch nicht kennen.",
      "Operations-, Sales-, Marketing- und Admin-Teams, die nach Training praktische Unterstützung brauchen.",
      "Schulen oder Servicebetriebe, die mit echten internen Szenarien üben möchten.",
      "Teams, die Business-Prozess, AI-Tools und technische Umsetzung verbinden müssen.",
    ],
    painPoints: [
      "AI-Ideen tauchen in Meetings auf, aber niemand verantwortet die erste Umsetzung.",
      "Das Team braucht Vertrauen und Review-Gewohnheiten, nicht nur Tool-Listen.",
      "Bestehende Abläufe sind unklar, daher braucht Automation zuerst Prozessklarheit.",
      "Management braucht sichtbaren Fortschritt ohne sofort ein Großprojekt zu starten.",
    ],
    deliverables: [
      "AI-Workflow-Auswahl und Readiness Assessment.",
      "Schrittweiser Implementation Roadmap für einen priorisierten Use Case.",
      "Wöchentliche Coachings mit Aufgaben, Review-Punkten und Adoption Feedback.",
      "Prompt Library, Workflow-Dokumentation und Decision Log.",
      "Leichter Prototyp oder Operating Playbook je nach Workflow.",
    ],
    expectedOutcomes: [
      "Ein echter AI-Workflow wird von Idee zu testbarer Arbeitsgewohnheit.",
      "Das Team lernt, AI-Outputs verantwortungsvoll zu nutzen, zu prüfen und zu verbessern.",
      "Manager sehen klarer, was automatisiert werden kann und was manuell bleiben sollte.",
      "Das Unternehmen baut interne AI-Fähigkeit auf statt nur externe IT-Leistung einzukaufen.",
    ],
    cta: {
      ...aiCoaching.cta,
      label: "AI-Coaching-Sprint planen",
      note: "Bring einen Workflow mit, den du verbessern möchtest; wenn unklar, helfen wir beim Startpunkt.",
    },
  },
  "sme-ai-workflow": {
    ...smeWorkflow,
    title: "SME AI Workflow Consulting für Unternehmen in Hongkong",
    metaTitle: "SME AI Workflow Consulting Hongkong | InnovateXP",
    metaDescription:
      "Praktische AI-Workflows für Sales Follow-up, Operations, Admin, CRM, WhatsApp-Automation, Dashboards und interne Tools.",
    eyebrow: "AI-Workflow-Automatisierung für KMUs",
    intro:
      "InnovateXP hilft KMUs in Hongkong, verstreute manuelle Arbeit in praktische AI-gestützte Workflows zu verwandeln: WhatsApp CRM Automation, Sales Follow-up, Angebots-Follow-up, Admin-Portale, Dashboards, CS-Entwürfe und interne AI-Tools.",
    cta: {
      ...smeWorkflow.cta,
      label: "SME AI Workflow besprechen",
      note: "Wir starten meist mit einem Workflow und einem messbaren Adoption-Ziel.",
    },
  },
  "proposal-to-cash-ai": {
    ...proposalToCash,
    title: "Proposal-to-Cash AI Workflow für B2B-Teams",
    metaTitle: "Proposal-to-Cash AI | B2B-Angebots-Follow-up Automation | InnovateXP",
    metaDescription:
      "AI-gestützter Workflow für B2B-Angebote, Proposal Follow-up, Rechnung/Zahlungsstatus und Management-Transparenz.",
    eyebrow: "B2B-Angebot bis Zahlung",
    intro:
      "Proposal-to-Cash AI verbindet Angebot, Proposal Follow-up, Rechnungsstatus und Zahlungstracking in einem klareren Workflow. Statt Deals zwischen WhatsApp, E-Mail, Tabellen und Accounting-Remindern zu verlieren, erhält das Team strukturierte nächste Schritte, AI-Entwürfe und Sichtbarkeit bis zum Zahlungseingang.",
    cta: {
      ...proposalToCash.cta,
      label: "Proposal-to-Cash Workflow besprechen",
      note: "Bring Beispiel-Stages und die Orte mit, an denen dein Team Follow-ups heute verfolgt.",
    },
  },
};

const servicePagesByLocale: Record<AppLocale, Record<ServicePageSlug, ServicePageContent>> = {
  en: servicePages,
  "zh-hk": servicePagesZhTw,
  "zh-tw": servicePagesZhTw,
  ja: servicePagesJa,
  de: servicePagesDe,
};

export const SERVICE_PAGE_SLUGS = Object.keys(servicePages) as ServicePageSlug[];

export function getServicePage(slug: ServicePageSlug, locale: AppLocale): ServicePageContent {
  return servicePagesByLocale[locale][slug];
}

export const innovatexpVision: VisionCopy = {
  statement:
    "InnovateXP Limited is founder-led as an AI Business Consultancy.",
  reason:
    "Because of my stories across IT delivery, developer communities, AI workshops, mobile apps, cloud architecture, agile delivery, and real business systems, I built InnovateXP to help people turn AI from hype into useful work.",
  helps:
    "InnovateXP helps schools, SMEs, founders, sales teams, operations teams, and business communities adopt AI in real workflows.",
  outcomes: [
    "Practical AI systems and workflows that people can actually use.",
    "AI literacy, confidence, and team empowerment through training and coaching.",
    "Implementation support for CRM, WhatsApp automation, dashboards, booking flows, admin portals, and custom AI agents.",
    "A clearer path for AI transformation that combines tools, process, people, and delivery discipline.",
  ],
  referralEnglish:
    "If you know a school, SME, founder, business partner, or client who wants practical AI training, AI coaching, WhatsApp CRM automation, or AI workflow implementation, please refer them to InnovateXP Limited.",
  referralTraditionalChinese:
    "如果你身邊有學校、中小企老闆、生意伙伴、客戶或朋友想學 AI、做 AI 教班、AI 陪跑課程、WhatsApp CRM 自動化或中小企 AI 升級，歡迎介紹 InnovateXP Limited，從實際工作流程開始落地。",
};

const innovatexpVisionZhTw: VisionCopy = {
  statement: "InnovateXP Limited 以 AI 商業顧問定位，以 founder-led 方式交付服務。",
  reason:
    "因為我一路走過 IT delivery、developer communities、AI workshops、mobile apps、cloud architecture、agile delivery 與真實商務系統，我創立 InnovateXP，幫團隊把 AI 從 hype 變成真正有用的工作方式。",
  helps: "InnovateXP 協助學校、中小企業、創辦人、sales teams、operations teams 與 business communities，把 AI 落地到真實工作流程。",
  outcomes: [
    "能被團隊實際使用的 AI systems 與 workflows。",
    "透過 AI 培訓與 coaching 建立 AI literacy、confidence 與 team empowerment。",
    "支援 CRM、WhatsApp automation、dashboards、booking flows、admin portals 與 custom AI agents 的實作。",
    "用 tools、process、people 與 delivery discipline，建立更清晰的 AI transformation 路徑。",
  ],
  referralEnglish: innovatexpVision.referralEnglish,
  referralTraditionalChinese: innovatexpVision.referralTraditionalChinese,
};

const innovatexpVisionJa: VisionCopy = {
  statement: "私は InnovateXP Limited の創業者であり、AIビジネスコンサルティングを提供しています。",
  reason:
    "IT delivery、developer communities、AI workshops、mobile apps、cloud architecture、agile delivery、実際のビジネスシステムでの経験から、AI を hype ではなく実務に役立つ力へ変えるために InnovateXP を作りました。",
  helps: "InnovateXP は学校、SME、創業者、sales teams、operations teams、business communities が AI を実際の業務フローへ導入する支援をします。",
  outcomes: [
    "チームが実際に使える AI systems と workflows。",
    "AI training と coaching による AI literacy、confidence、team empowerment。",
    "CRM、WhatsApp automation、dashboards、booking flows、admin portals、custom AI agents の実装支援。",
    "tools、process、people、delivery discipline を組み合わせた AI transformation の明確な進め方。",
  ],
  referralEnglish: innovatexpVision.referralEnglish,
  referralTraditionalChinese: innovatexpVision.referralTraditionalChinese,
};

const innovatexpVisionDe: VisionCopy = {
  statement: "InnovateXP Limited ist founder-led und wird als AI Business Consultancy geführt.",
  reason:
    "Aus meinen Erfahrungen in IT delivery, developer communities, AI workshops, mobile apps, cloud architecture, agile delivery und echten Business-Systemen habe ich InnovateXP aufgebaut, um AI von Hype in nützliche Arbeit zu übersetzen.",
  helps: "InnovateXP hilft Schulen, KMUs, Gründern, Sales Teams, Operations Teams und Business Communities, AI in echte Workflows zu integrieren.",
  outcomes: [
    "Praktische AI systems und workflows, die Teams wirklich nutzen können.",
    "AI literacy, confidence und team empowerment durch training und coaching.",
    "Implementation support für CRM, WhatsApp automation, dashboards, booking flows, admin portals und custom AI agents.",
    "Ein klarerer Weg zur AI transformation durch tools, process, people und delivery discipline.",
  ],
  referralEnglish: innovatexpVision.referralEnglish,
  referralTraditionalChinese: innovatexpVision.referralTraditionalChinese,
};

export function getInnovatexpVision(locale: AppLocale): VisionCopy {
  switch (locale) {
    case "zh-hk":
    case "zh-tw":
      return innovatexpVisionZhTw;
    case "ja":
      return innovatexpVisionJa;
    case "de":
      return innovatexpVisionDe;
    default:
      return innovatexpVision;
  }
}
