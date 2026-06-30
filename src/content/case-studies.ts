import type { CaseStudyContent } from "@/types/marketing";

export const caseStudies: CaseStudyContent[] = [
  {
    slug: "eventxp-event-follow-up",
    title: "EventXP: event attendance to buyer intelligence",
    summary:
      "EventXP turns event attendance records into cleaner follow-up signals for organizers, communities, and training teams.",
    context:
      "Event teams often finish an event with spreadsheets, attendance marks, and scattered notes. The business value depends on what happens next: who attended, who showed interest, and who deserves follow-up.",
    proofType: "product",
    audience: "Event organizers, JCI/BNI-style communities, training providers, and membership groups.",
    challenge: [
      "Manual check-in creates inconsistent attendance records.",
      "Post-event follow-up is delayed because lists need cleanup first.",
      "Organizers struggle to compare attendee quality across repeat events.",
    ],
    approach: [
      "Design a structured check-in and attendance model.",
      "Prepare reporting views that can support follow-up prioritization.",
      "Connect event operations with sales or membership next actions.",
    ],
    deliverables: [
      "Event profile and attendee data structure.",
      "QR/check-in flow and attendance visibility.",
      "Post-event reporting and follow-up segmentation concept.",
    ],
    outcomes: [
      "Cleaner event operations and fewer manual reconciliation steps.",
      "A practical base for buyer intelligence and follow-up planning.",
      "Better continuity between event attendance, sales follow-up, and community engagement.",
    ],
    relatedLinks: [
      { label: "EventXP", href: "/eventxp" },
      { label: "SME AI Workflow", href: "/sme-ai-workflow" },
    ],
  },
  {
    slug: "smartsales-whatsapp-crm",
    title: "SmartSales CRM: WhatsApp-first sales follow-up automation",
    summary:
      "SmartSales CRM helps chat-led teams structure leads, next actions, and sales follow-up without enterprise CRM overhead.",
    context:
      "Many Hong Kong SMEs run sales through WhatsApp, inboxes, spreadsheets, and memory. The risk is not only missing a lead; it is losing the shared context needed for consistent follow-up.",
    proofType: "product",
    audience: "3-15 person sales teams, service SMEs, B2B consultants, and founder-led businesses.",
    challenge: [
      "Customer messages arrive faster than teams can organize them.",
      "Managers lack pipeline visibility without micromanaging each chat.",
      "Follow-up quality depends too much on individual habits.",
    ],
    approach: [
      "Structure the lead pipeline around chat-led work.",
      "Define ownership, stages, reminders, and next actions.",
      "Use AI support for drafts and prioritization while keeping human approval.",
    ],
    deliverables: [
      "WhatsApp-friendly CRM workflow model.",
      "Lead stages, contact context, task reminders, and reporting views.",
      "AI-assisted draft and follow-up patterns where suitable.",
    ],
    outcomes: [
      "A clearer sales operating rhythm for busy SME teams.",
      "Less dependence on memory and scattered spreadsheets.",
      "Better visibility for owners and managers reviewing weekly pipeline progress.",
    ],
    relatedLinks: [
      { label: "SmartSales CRM", href: "/smartsales-crm" },
      { label: "Proposal-to-Cash AI", href: "/proposal-to-cash-ai" },
    ],
  },
  {
    slug: "ai-training-jci-peninsula",
    title: "AI workshop/demo sessions for JCI Peninsula",
    summary:
      "InnovateXP has delivered practical AI workshop/demo sessions for JCI Peninsula, connecting AI tools with real business usage.",
    context:
      "Business communities need AI sessions that are clear enough for non-technical participants but practical enough to inspire real workflow changes afterwards.",
    proofType: "training",
    audience: "Business communities, schools, SMEs, and professional groups exploring AI adoption.",
    challenge: [
      "Participants have different AI maturity levels.",
      "Generic AI demos do not always connect to local business workflows.",
      "Teams need confidence and examples before implementation.",
    ],
    approach: [
      "Use practical demonstrations and local business scenarios.",
      "Explain AI strengths, limitations, and review habits.",
      "Connect tool usage with next-step implementation opportunities.",
    ],
    deliverables: [
      "Workshop/demo content for AI tools and workflow thinking.",
      "Practical examples for business teams.",
      "Follow-up paths into AI coaching or workflow implementation.",
    ],
    outcomes: [
      "Participants gain a clearer understanding of what AI can and cannot do.",
      "Business teams can identify realistic AI workflow candidates.",
      "AI learning becomes a bridge to adoption rather than a one-off seminar.",
    ],
    relatedLinks: [
      { label: "AI Training", href: "/ai-training" },
      { label: "AI Coaching", href: "/ai-coaching" },
    ],
  },
  {
    slug: "system-rescue-clean-architecture",
    title: "System rescue, technical audit, and clean architecture refactor",
    summary:
      "InnovateXP can review fragile systems, clarify architecture boundaries, and refactor toward maintainable delivery.",
    context:
      "Some AI or web projects fail not because the idea is wrong, but because the codebase becomes hard to change. A technical audit can reveal whether the next step should be refactor, rebuild, or workflow redesign.",
    proofType: "technical-audit",
    audience: "SMEs with unstable web apps, booking flows, dashboards, admin portals, or internal systems.",
    challenge: [
      "Business logic is mixed into UI pages or scripts.",
      "Content, routes, API calls, and analytics are hard to maintain.",
      "The team wants AI features but the current codebase cannot safely support them.",
    ],
    approach: [
      "Inspect architecture, data flow, dependencies, and failure points.",
      "Separate framework-specific code from content, domain, and reusable UI.",
      "Prioritize the smallest set of changes that reduces delivery risk.",
    ],
    deliverables: [
      "Technical audit notes and risk map.",
      "Refactor plan for content/domain/UI/route separation.",
      "Targeted implementation or rescue sprint where appropriate.",
    ],
    outcomes: [
      "A clearer system boundary for future AI and automation work.",
      "Reduced maintenance risk and easier onboarding for future developers.",
      "Better foundation for SEO, GEO, analytics, and reliable user flows.",
    ],
    relatedLinks: [
      { label: "SME AI Workflow", href: "/sme-ai-workflow" },
      { label: "AI-era Quality", href: "/ai-era-quality" },
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudyContent | undefined {
  return caseStudies.find((item) => item.slug === slug);
}
