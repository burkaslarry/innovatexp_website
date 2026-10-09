import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogFrame } from "@/components/BlogFrame";
import { listArchive, listSeries } from "@/content/blog-catalog";
import { BLOG_CHROME } from "@/content/blog-chrome";
import { isValidLocale, localeToHtmlLang, type AppLocale } from "@/lib/i18n-routing";

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const loc = locale as AppLocale;
  const chrome = BLOG_CHROME[loc];
  const series = listSeries(loc);
  const archive = listArchive();
  const dateFmt = new Intl.DateTimeFormat(localeToHtmlLang(loc), { dateStyle: "long" });

  return (
    <BlogFrame>
    <main>
      <div className="mx-auto max-w-3xl px-5 pb-24 pt-14 md:px-8 md:pt-20">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[color:var(--text-tertiary)]">
          {chrome.indexKicker}
        </p>
        <h1 className="mt-4 whitespace-pre-line text-4xl leading-[1.25] text-[color:var(--text-primary)] md:text-6xl">
          {chrome.seriesTitle}
        </h1>
        <p className="mt-6 max-w-[42rem] text-lg leading-relaxed text-[color:var(--text-secondary)]">
          {chrome.seriesLead}
        </p>

        <ol className="mt-16 border-t border-[color:var(--border-light)]">
          {series.map((post) => (
            <li key={post.slug} className="border-b border-[color:var(--border-light)]">
              <Link href={`/${locale}/blog/${post.slug}`} className="group grid grid-cols-[3.5rem_1fr] gap-4 py-8 md:grid-cols-[4.5rem_1fr] md:py-10">
                <span className="pt-1 font-mono text-sm tabular-nums text-[color:var(--text-tertiary)]">
                  {chrome.part(post.seriesOrder ?? 0, series.length)}
                </span>
                <span>
                  <h2 className="text-2xl leading-snug text-[color:var(--text-primary)] underline-offset-4 group-hover:underline md:text-3xl">
                    {post.title}
                  </h2>
                  <span className="mt-3 block max-w-[40rem] text-base leading-relaxed text-[color:var(--text-secondary)]">
                    {post.excerpt}
                  </span>
                  <time className="mt-3 block text-sm text-[color:var(--text-tertiary)]" dateTime={post.date}>
                    {dateFmt.format(new Date(`${post.date}T00:00:00`))}
                  </time>
                </span>
              </Link>
            </li>
          ))}
        </ol>

        <section className="mt-20">
          <h2 className="text-2xl text-[color:var(--text-primary)]">{chrome.archiveTitle}</h2>
          <p className="mt-2 text-sm text-[color:var(--text-tertiary)]">{chrome.archiveNote}</p>
          <ul className="mt-6 space-y-5">
            {archive.map((post) => (
              <li key={post.slug}>
                <Link href={`/${locale}/blog/${post.slug}`} className="group">
                  <span className="block text-lg text-[color:var(--text-primary)] group-hover:text-[color:var(--brand-accent-teal)]">
                    {post.title}
                  </span>
                  <span className="mt-1 block text-sm text-[color:var(--text-secondary)]">{post.excerpt}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
    </BlogFrame>
  );
}
