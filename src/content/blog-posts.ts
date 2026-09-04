/* Blog post bodies shared by `[locale]/blog` routes and SEO sitemap tooling. */

export const blogPosts: Record<
  string,
  { title: string; date: string; excerpt: string; body: string }
> = {
  "getting-started-ai-consulting": {
    title: "Getting Started with AI Consulting for SMEs",
    date: "2026-03-01",
    excerpt:
      "How to scope your first AI consulting engagement and get from slides to shipped workflows.",
    body: "AI consulting for SMEs works best when it starts with one clear use case: a process you repeat often, data you already have, and a decision that would be better with less manual work. In Hong Kong, that often means WhatsApp enquiry follow-up, quotation turnaround, event post-follow-up, or a controlled private AI pilot for receipts and internal documents.\n\nInnovateXP (founder Larry Lo) scopes engagements as a Hong Kong AI consultant: diagnose the workflow and ownership first, then decide whether SmartSales CRM, EventXP, training, or private AI is justified. A 30-day Discovery Sprint from HK$6,800 is designed to produce a usable operating result—not a slide deck of tool options.\n\nVertical product demos such as VisionXP follow the same path: see the live demo, then Discovery, then an Implementation Sprint only if the workflow is clear. Expect your first 30 days to clarify SOP, KPI, and a single pilot with human review gates. If you are comparing independent CRM consulting in Hong Kong with enterprise vendor roadmaps, start with the painful workflow—not the software catalogue.",
  },
  "event-check-in-best-practices": {
    title: "Event Check-In Best Practices for Higher Conversion",
    date: "2026-02-15",
    excerpt: "Turn attendance data into follow-up actions. Lessons from Hong Kong events.",
    body: "Event check-in isn’t just about scanning badges—it’s the first step in turning attendees into leads and repeat participants. We’ve supported check-in for events from 50 to 2,000+ people in Hong Kong and across Asia. Structure the flow so registration data, on-site status, and post-event owners are connected before the doors open.\n\nCapture only fields you will act on: role, interest tags, and a clear next-step owner. Score leads lightly during or right after the event, then push a short follow-up sequence within 48 hours. EventXP is built for this loop—QR check-in, scoring, live reporting, and follow-up—so teams stop losing warm attendees in spreadsheets.\n\nPractical tip: assign one person to “post-event conversion” before the event starts. Without that owner, even perfect check-in data becomes a cold CSV. Pair EventXP with a 30-minute workflow diagnosis if your team still debates who messages whom after every show.",
  },
  "crm-automation-without-the-hype": {
    title: "CRM Automation Without the Hype",
    date: "2026-02-01",
    excerpt:
      "Practical CRM automation for sales teams: WhatsApp, pipelines, and one source of truth.",
    body: "CRM automation doesn’t have to mean complex integrations or months of setup. For many Hong Kong SMEs, the biggest win is one place for leads, one place for follow-up, and a simple link to the tools your team already uses—like WhatsApp. Enterprise CRM often fails not because features are missing, but because ownership and stage definitions were never clear.\n\nSmartSales CRM focuses on WhatsApp-led sales: centralise enquiries, assign owners, keep pipeline visible, and use AI draft-first replies with human send. Independent CRM consulting in Hong Kong should tell you when not to buy—and when a light pipeline beats a heavy platform.\n\nWhat moves the needle: pipeline visibility for founders, timely reminders, less copy-paste between chat and spreadsheets, and a written follow-up SLA. Start with your top enquiry sources, define stages in plain language, then automate only the reminders and drafts that staff will actually use.",
  },
  "fitnessxp-class-management-for-studios": {
    title: "FitnessXP: Class Management After a Business Diagnosis",
    date: "2026-09-04",
    excerpt:
      "How training centres, tutoring schools, and fitness studios move from WhatsApp/Excel chaos to timetable, coaches, attendance, and renewals.",
    body: "Many Hong Kong training institutions, tutoring centres, and Fitness / Yoga / Pilates studios still run classes on WhatsApp and Excel. The pain is familiar: nobody sees every class, coach, and student status in one place; attendance and renewals depend on memory; one person on leave and follow-up stalls.\n\nLarry Lo / InnovateXP approaches this as a business diagnostician (業務聽診師)—listen to the class workflow first, then design a fit-for-purpose training / class-management solution. For Fitness Centers that usually means timetable, coach scheduling, student attendance, and package renewals—without a big-bang system rewrite.\n\nFitnessXP is the product path after diagnosis: start simple, aim for measurable attendance, renewal, and utilisation within 30–60 days, and improve operations, sales, and customer experience together. Pricing starts from HK$499 per month. Ideal referrals include training, tutoring, fitness, yoga, pilates, and hobby-class centre owners still living in spreadsheets. Read more: https://www.innovatexp.co/zh-hk/fitnessxp",
  },
};

export const BLOG_POST_SLUGS = Object.freeze(Object.keys(blogPosts));
