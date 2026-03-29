import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const siteUrlMeta =
  process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://innovatexp.co";

// Placeholder content: replace with CMS or markdown-based content
const posts: Record<
  string,
  { title: string; date: string; excerpt: string; body: string }
> = {
  "getting-started-ai-consulting": {
    title: "Getting Started with AI Consulting for SMEs",
    date: "2026-03-01",
    excerpt: "How to scope your first AI consulting engagement and get from slides to shipped workflows.",
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
    excerpt: "Practical CRM automation for sales teams: WhatsApp, pipelines, and one source of truth.",
    body: "CRM automation doesn’t have to mean complex integrations or months of setup. For many SMEs, the biggest win is one place for leads, one place for follow-up, and a simple link to the tools your team already uses—like WhatsApp. We walk through what actually moves the needle: pipeline visibility, timely reminders, and less copy-paste.",
  },
};

const relatedServices = [
  { name: "AI Consulting", href: "/ai-consulting" },
  { name: "EventXP", href: "/eventxp" },
  { name: "SmartSales CRM", href: "/smartsales-crm" },
  { name: "Book a call", href: "/bookme" },
];

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) return { title: "Blog | InnovateXP" };
  return {
    title: `${post.title} | Blog | InnovateXP`,
    description: post.excerpt,
    alternates: { canonical: `${siteUrlMeta}/blog/${slug}` },
    openGraph: {
      title: `${post.title} | Blog | InnovateXP`,
      description: post.excerpt,
      url: `${siteUrlMeta}/blog/${slug}`,
      siteName: "InnovateXP Limited",
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    publisher: { "@type": "Organization", name: "InnovateXP Limited", url: siteUrlMeta },
    url: `${siteUrlMeta}/blog/${slug}`,
  };

  return (
    <main className="min-h-screen bg-[#fffcf7] dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <nav className="mb-8 text-sm text-gray-500 dark:text-gray-400">
          <Link href="/" className="hover:text-brand-primary dark:hover:text-teal-300">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-brand-primary dark:hover:text-teal-300">Blog</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700 dark:text-gray-300">{post.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-12">
          <article>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {post.title}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{post.date}</p>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {post.body}
              </p>
            </div>
            <p className="mt-8">
              <Link
                href="/blog"
                className="font-medium text-brand-primary hover:underline dark:text-teal-300"
              >
                ← Back to blog
              </Link>
            </p>
          </article>

          <aside className="lg:order-2">
            <div className="sticky top-24 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-md">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Related Services
              </h2>
              <ul className="space-y-3">
                {relatedServices.map((s) => (
                  <li key={s.href}>
                    <Link
                      href={s.href}
                      className="font-medium text-brand-primary hover:underline dark:text-teal-300"
                    >
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/bookme"
                className="mt-4 flex min-h-[44px] w-full touch-manipulation items-center justify-center rounded-full bg-brand-primary text-sm font-bold text-white transition duration-300 hover:bg-brand-primary-hover dark:bg-[#00B9B3] dark:text-slate-950 dark:hover:bg-[#009e98]"
              >
                Book a call
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

export function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}
