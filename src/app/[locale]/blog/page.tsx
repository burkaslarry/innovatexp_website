import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogFrame } from "@/components/BlogFrame";
import { listArchive, listInsights, listSeries } from "@/content/blog-catalog";
import { BLOG_CATEGORIES } from "@/content/blog-types";
import { localeAlternates } from "@/lib/alternate-metadata";
import { BLOG_CHROME } from "@/content/blog-chrome";
import { blogSeo } from "@/content/page-seo";
import { isValidLocale, localeToHtmlLang, type AppLocale } from "@/lib/i18n-routing";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const { title, description } = blogSeo(locale);
  const alternates = localeAlternates(locale, "/blog");
  return {
    title,
    description,
    alternates,
    openGraph: { title, description, url: typeof alternates?.canonical === "string" ? alternates.canonical : undefined, siteName: "InnovateXP Limited" },
    twitter: { card: "summary_large_image", title, description },
  };
}

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
  const dateFmt = new Intl.DateTimeFormat(localeToHtmlLang(loc), { dateStyle: "long", timeZone: "UTC" });

  return (
    <BlogFrame>
    <main>
      <div className="mx-auto max-w-3xl px-5 pb-24 pt-14 md:px-8 md:pt-20">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[color:var(--text-tertiary)]">
          {chrome.indexKicker}
        </p>
        <h1 className="mt-4 whitespace-pre-line text-4xl leading-[1.25] text-[color:var(--text-primary)] md:text-6xl">
          {chrome.indexTitle}
        </h1>
        <p className="mt-6 max-w-[42rem] text-lg leading-relaxed text-[color:var(--text-secondary)]">
          {chrome.indexLead}
        </p>
        <Link href={`/${locale}/bookme`} className="btn-brand mt-6 inline-flex min-h-[44px] items-center px-5 text-sm">
          {chrome.book}
        </Link>

        <nav aria-label={chrome.browse} className="mt-12 border-y border-[color:var(--border-light)] py-6">
          <p className="text-sm font-semibold text-[color:var(--text-primary)]">{chrome.browse}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {BLOG_CATEGORIES.map((category) => (
              <li key={category}>
                <a href={`#${category}`} className="inline-flex min-h-[44px] items-center rounded-full border border-[color:var(--border-light)] px-4 py-2 text-sm text-[color:var(--text-primary)] hover:border-[color:var(--brand-accent-teal)]">
                  {chrome.categories[category].title}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <a href="#pdpo-series" className="underline underline-offset-4">{chrome.seriesTitle.replace(/\n/g, " ")}</a>
            <a href="#archive" className="underline underline-offset-4">{chrome.archiveTitle}</a>
          </div>
        </nav>

        {BLOG_CATEGORIES.map((category) => (
          <section key={category} id={category} aria-labelledby={`${category}-title`} className="mt-16 scroll-mt-24">
            <h2 id={`${category}-title`} className="text-3xl text-[color:var(--text-primary)]">{chrome.categories[category].title}</h2>
            <p className="mt-3 leading-relaxed text-[color:var(--text-secondary)]">{chrome.categories[category].description}</p>
            <ul className="mt-5 divide-y divide-[color:var(--border-light)] border-y border-[color:var(--border-light)]">
              {listInsights(loc, category).map((post) => (
                <li key={post.slug} className="py-6">
                  <Link href={`/${locale}/blog/${post.slug}`} className="group block">
                    <h3 className="text-2xl leading-snug text-[color:var(--text-primary)] underline-offset-4 group-hover:underline">{post.title}</h3>
                    <p className="mt-3 leading-relaxed text-[color:var(--text-secondary)]">{post.excerpt}</p>
                    <time dateTime={post.date} className="mt-3 block text-sm text-[color:var(--text-tertiary)]">{dateFmt.format(new Date(`${post.date}T00:00:00Z`))}</time>
                  </Link>
                </li>
              ))}
            </ul>
            {category === "ai-data-governance" ? (
              <a href="#pdpo-series" className="mt-4 inline-block text-sm underline underline-offset-4">{chrome.seriesTitle.replace(/\n/g, " ")}</a>
            ) : null}
          </section>
        ))}

        <section id="pdpo-series" aria-labelledby="pdpo-title" className="mt-20 scroll-mt-24">
          <h2 id="pdpo-title" className="whitespace-pre-line text-3xl text-[color:var(--text-primary)]">{chrome.seriesTitle}</h2>
          <p className="mt-4 leading-relaxed text-[color:var(--text-secondary)]">{chrome.seriesLead}</p>
        <ol className="mt-8 border-t border-[color:var(--border-light)]">
          {series.map((post) => (
            <li key={post.slug} className="border-b border-[color:var(--border-light)]">
              <Link href={`/${locale}/blog/${post.slug}`} className="group grid grid-cols-[3.5rem_1fr] gap-4 py-8 md:grid-cols-[4.5rem_1fr] md:py-10">
                <span className="pt-1 font-mono text-sm tabular-nums text-[color:var(--text-tertiary)]">
                  {chrome.part(post.seriesOrder ?? 0, series.length)}
                </span>
                <div>
                  <h3 className="text-2xl leading-snug text-[color:var(--text-primary)] underline-offset-4 group-hover:underline md:text-3xl">
                    {post.title}
                  </h3>
                  <span className="mt-3 block max-w-[40rem] text-base leading-relaxed text-[color:var(--text-secondary)]">
                    {post.excerpt}
                  </span>
                  <time className="mt-3 block text-sm text-[color:var(--text-tertiary)]" dateTime={post.date}>
                    {dateFmt.format(new Date(`${post.date}T00:00:00Z`))}
                  </time>
                </div>
              </Link>
            </li>
          ))}
        </ol>
        </section>

        <section id="archive" className="mt-20 scroll-mt-24">
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
