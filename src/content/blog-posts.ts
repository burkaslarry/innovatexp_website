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
    body: "AI consulting for SMEs works best when it starts with one clear use case: a process you repeat often, data you already have, and a decision that would be better with less manual work. We help Hong Kong and global teams define that first win, then build a roadmap that scales. This post outlines how we scope engagements and what to expect in your first 30 days.",
  },
  "event-check-in-best-practices": {
    title: "Event Check-In Best Practices for Higher Conversion",
    date: "2026-02-15",
    excerpt: "Turn attendance data into follow-up actions. Lessons from Hong Kong events.",
    body: "Event check-in isn’t just about scanning badges—it’s the first step in turning attendees into leads and repeat participants. We’ve run check-in for events from 50 to 2,000+ people in Hong Kong and across Asia. Here we share practical tips: how to structure your flow, what to capture, and how to turn that data into clear next actions for your team.",
  },
  "crm-automation-without-the-hype": {
    title: "CRM Automation Without the Hype",
    date: "2026-02-01",
    excerpt:
      "Practical CRM automation for sales teams: WhatsApp, pipelines, and one source of truth.",
    body: "CRM automation doesn’t have to mean complex integrations or months of setup. For many SMEs, the biggest win is one place for leads, one place for follow-up, and a simple link to the tools your team already uses—like WhatsApp. We walk through what actually moves the needle: pipeline visibility, timely reminders, and less copy-paste.",
  },
};

export const BLOG_POST_SLUGS = Object.freeze(Object.keys(blogPosts));
