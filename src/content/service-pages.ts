import type { AppLocale } from "@/lib/i18n-routing";
import type { ServicePageContent, ServicePageSlug, VisionCopy } from "@/types/marketing";

const commonRelatedLinks = [
  { label: "AI Training / AI 教班", href: "/ai-training" },
  { label: "AI Coaching / AI 陪跑課程", href: "/ai-coaching" },
  { label: "SME AI Workflow", href: "/sme-ai-workflow" },
  { label: "Case Studies", href: "/case-studies" },
];

const aiTraining: ServicePageContent = {
  slug: "ai-training",
  schemaKind: "Course",
  title: "AI Training / AI 教班 for Schools, SMEs, and Business Teams",
  metaTitle: "AI Training Hong Kong | AI 教班 for Schools & SMEs | InnovateXP",
  metaDescription:
    "Practical AI training by Larry Lo for schools, SMEs, and business teams in Hong Kong: prompt engineering, AI tools, AI-assisted coding, chatbot prototyping, and workflow automation.",
  eyebrow: "Founder-led AI training",
  intro:
    "InnovateXP runs practical AI training for Hong Kong schools, SMEs, and business teams that need more than a tool demo. Larry Lo teaches teams how to use AI in real work: research, writing, customer follow-up, coding support, chatbot prototyping, and workflow automation. Cantonese/English delivery is available, with Traditional Chinese phrases and examples for local teams searching for AI 教班 and 中小企 AI 升級.",
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
    "Larry Lo is an ex-Organizer of Google Developer Group Hong Kong and has been involved in community learning formats such as Flutter Study Group, Build with AI, Google I/O Extended, and DevFest Hong Kong.",
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
  schemaKind: "Course",
  title: "AI Coaching / AI 陪跑課程 for SME Implementation",
  metaTitle: "AI 陪跑課程 Hong Kong | SME AI Implementation Coaching | InnovateXP",
  metaDescription:
    "Guided AI implementation coaching for Hong Kong SMEs: choose one workflow, build the first version, train the team, and improve adoption step by step.",
  eyebrow: "Done-with-you implementation coaching",
  intro:
    "AI 陪跑課程 is for teams that want guided implementation, not another inspirational seminar. InnovateXP helps SMEs choose one workflow, design the first version, test it with the team, and improve it through weekly coaching. The goal is practical adoption: your staff understand the system, trust the process, and can continue improving after the sprint.",
  audience: [
    "SME owners who want to adopt AI but do not know which workflow should come first.",
    "Operations, sales, marketing, and admin teams that need hands-on support after training.",
    "Schools or service businesses that want guided AI practice with real internal scenarios.",
    "Teams that need a coach to bridge business process, AI tools, and technical implementation.",
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
    "Weekly coaching sessions with tasks, review checkpoints, and adoption feedback.",
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
    "Founder-led coaching by Larry Lo, combining system delivery, community teaching, and SME workflow design.",
    "Grounded in practical systems such as SmartSales CRM, EventXP, custom AI agents, and internal dashboards.",
    "Suitable after AI training or as a direct implementation sprint for teams ready to move.",
  ],
  modules: [
    "Week 1: workflow discovery, risk boundaries, and first use case selection.",
    "Week 2: prompt/system design, data inputs, and human review checkpoints.",
    "Week 3: prototype or operating playbook with team testing.",
    "Week 4: adoption review, improvement backlog, and next sprint recommendation.",
  ],
  relatedLinks: commonRelatedLinks,
  cta: {
    label: "Plan an AI coaching sprint",
    href: "/bookme",
    note: "Bring one workflow you want to improve, or ask us to help identify the best starting point.",
  },
  faqs: [
    {
      question: "How is AI coaching different from AI training?",
      answer:
        "Training teaches concepts and hands-on tool usage. Coaching follows your team through implementation so one workflow becomes a repeatable operating habit.",
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
    "InnovateXP helps Hong Kong SMEs turn scattered manual work into practical AI-assisted workflows. We focus on real operating processes: WhatsApp CRM 自動化, sales follow-up, quotation follow-up, admin portals, dashboards, customer service drafts, and internal AI tools. The work is founder-led by Larry Lo, an AI Solutions Trainer and SME AI Workflow Consultant with 13+ years of IT delivery and architecture experience.",
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
    "Larry Lo brings 13+ years across mobile apps, cloud architecture, agile delivery, and AI-powered business systems.",
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
    { label: "Case Studies", href: "/case-studies" },
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

export const SERVICE_PAGE_SLUGS = Object.keys(servicePages) as ServicePageSlug[];

export function getServicePage(slug: ServicePageSlug, locale: AppLocale): ServicePageContent {
  void locale;
  return servicePages[slug];
}

export const innovatexpVision: VisionCopy = {
  statement:
    "I am Larry Lo, AI Solutions Trainer and SME AI Workflow Consultant, founder of InnovateXP Limited.",
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
    "If you know a school, SME, founder, business partner, or client who wants practical AI training, AI coaching, WhatsApp CRM automation, or AI workflow implementation, please refer them to Larry Lo at InnovateXP Limited.",
  referralTraditionalChinese:
    "如果你身邊有學校、中小企老闆、生意伙伴、客戶或朋友想學 AI、做 AI 教班、AI 陪跑課程、WhatsApp CRM 自動化或中小企 AI 升級，歡迎介紹 Larry Lo / InnovateXP Limited 幫佢哋由實際工作流程開始落地。",
};
