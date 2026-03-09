import Link from "next/link";

// Placeholder: replace with CMS or static list of posts
const posts = [
  { slug: "getting-started-ai-consulting", title: "Getting Started with AI Consulting for SMEs", date: "2026-03-01", excerpt: "How to scope your first AI consulting engagement and get from slides to shipped workflows." },
  { slug: "event-check-in-best-practices", title: "Event Check-In Best Practices for Higher Conversion", date: "2026-02-15", excerpt: "Turn attendance data into follow-up actions. Lessons from Hong Kong events." },
  { slug: "crm-automation-without-the-hype", title: "CRM Automation Without the Hype", date: "2026-02-01", excerpt: "Practical CRM automation for sales teams: WhatsApp, pipelines, and one source of truth." },
];

export default function BlogIndexPage() {
  return (
    <main className="min-h-screen bg-[#fffcf7] dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Blog & Case Studies
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">
          AI consulting insights, event tech, and CRM best practices from Hong Kong—for global business.
        </p>
        <ul className="space-y-8">
          {posts.map((post) => (
            <li key={post.slug}>
              <article className="border-b border-gray-200 dark:border-gray-700 pb-8">
                <Link href={`/blog/${post.slug}`} className="group">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors mb-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{post.date}</p>
                  <p className="text-gray-600 dark:text-gray-300">{post.excerpt}</p>
                </Link>
              </article>
            </li>
          ))}
        </ul>
        <p className="mt-12 text-gray-500 dark:text-gray-400 text-sm">
          More posts coming soon. <Link href="/" className="text-orange-600 hover:underline">Back to home</Link> · <Link href="/bookme" className="text-orange-600 hover:underline">Book a call</Link>
        </p>
      </div>
    </main>
  );
}
