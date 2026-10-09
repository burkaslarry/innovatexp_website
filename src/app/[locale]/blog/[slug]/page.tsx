import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_CHROME } from "@/content/blog-chrome";
import { BLOG_POST_SLUGS, getBlogView, listSeries, seriesNeighbors, seriesTotal } from "@/content/blog-catalog";
import { LOCALES, isValidLocale, localeToHtmlLang, localeUsesChineseCopy, type AppLocale } from "@/lib/i18n-routing";
import { localeAlternates } from "@/lib/alternate-metadata";
import { BlogFrame } from "@/components/BlogFrame";
import { AUTHOR, authorSameAs } from "@/lib/author";
import { getFAQPageSchema } from "@/lib/schema";

const siteUrlMeta =
  process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://www.innovatexp.co";

const OG_IMAGE = "/opengraph-image" as const;

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  if (!isValidLocale(locale)) return { title: "Blog | InnovateXP" };
  const post = getBlogView(slug, locale);
  if (!post) return { title: "Blog | InnovateXP" };
  const pathSuffix = `/blog/${slug}`;
  const alternates = localeAlternates(locale, pathSuffix);
  const ogUrl =
    typeof alternates?.canonical === "string" ? alternates.canonical : `${siteUrlMeta}/${locale}${pathSuffix}`;
  return {
    title: `${post.title} | InnovateXP`,
    description: post.excerpt,
    alternates,
    openGraph: {
      title: `${post.title} | InnovateXP`,
      description: post.excerpt,
      url: ogUrl,
      siteName: "InnovateXP Limited",
      images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | InnovateXP`,
      description: post.excerpt,
      images: [OG_IMAGE],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug, locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const loc = locale as AppLocale;
  const post = getBlogView(slug, loc);
  if (!post) notFound();

  const chrome = BLOG_CHROME[loc];
  const series = listSeries(loc);
  const neighbors = post.seriesOrder ? seriesNeighbors(post.seriesOrder) : { previous: null, next: null };
  const previous = neighbors.previous ? getBlogView(neighbors.previous, loc) : null;
  const next = neighbors.next ? getBlogView(neighbors.next, loc) : null;
  const dateFmt = new Intl.DateTimeFormat(localeToHtmlLang(loc), { dateStyle: "long" });
  const postUrl = `${siteUrlMeta}/${locale}/blog/${slug}`;
  const paragraphs = post.body?.split(/\n\n+/).filter(Boolean) ?? [];

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${postUrl}#article`,
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: localeToHtmlLang(loc),
    author: {
      "@type": "Person",
      "@id": `${siteUrlMeta}/#founder`,
      name: localeUsesChineseCopy(loc) ? `${AUTHOR.jobTitleZh} ${AUTHOR.name}` : `${AUTHOR.jobTitle} ${AUTHOR.name}`,
      jobTitle: localeUsesChineseCopy(loc) ? AUTHOR.jobTitleZh : AUTHOR.jobTitle,
      url: siteUrlMeta,
      sameAs: authorSameAs(),
    },
    publisher: {
      "@type": "Organization",
      "@id": `${siteUrlMeta}/#organization`,
      name: AUTHOR.organization,
      url: siteUrlMeta,
      logo: { "@type": "ImageObject", url: `${siteUrlMeta}/innovatexp_color_no_bg.svg` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": postUrl, url: postUrl },
    url: postUrl,
  };

  const faqLd =
    post.faqs.length > 0
      ? getFAQPageSchema({
          url: postUrl,
          questions: post.faqs,
        })
      : null;

  return (
    <BlogFrame>
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd).replace(/</g, "\\u003c") }}
      />
      {faqLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd).replace(/</g, "\\u003c") }}
        />
      ) : null}

      <div className="mx-auto grid max-w-6xl gap-12 px-5 pb-24 pt-12 md:px-8 md:pt-16 lg:grid-cols-[minmax(0,42rem)_16rem] lg:justify-center lg:gap-16">
        <article>
          <nav className="text-sm text-[color:var(--text-tertiary)]">
            <Link href={`/${locale}`} className="hover:text-[color:var(--text-primary)]">
              {chrome.home}
            </Link>
            <span className="mx-2">/</span>
            <Link href={`/${locale}/blog`} className="hover:text-[color:var(--text-primary)]">
              {chrome.blog}
            </Link>
          </nav>

          {post.seriesOrder ? (
            <p className="mt-8 font-mono text-xs tabular-nums tracking-[0.18em] text-[color:var(--text-tertiary)]">
              {chrome.part(post.seriesOrder, seriesTotal())}
              <span className="mx-3">·</span>
              {chrome.seriesTitle.replace(/\n/g, " ")}
            </p>
          ) : null}

          <h1 className="mt-4 max-w-[16em] text-balance text-4xl leading-[1.2] text-[color:var(--text-primary)] md:text-5xl">
            {post.title}
          </h1>
          <time className="mt-4 block text-sm text-[color:var(--text-tertiary)]" dateTime={post.date}>
            {dateFmt.format(new Date(`${post.date}T00:00:00`))}
          </time>

          {post.directAnswer ? (
            <div
              data-geo-answer=""
              className="mt-10 border-l-2 border-[color:var(--brand-accent-teal)] pl-5 text-xl leading-relaxed text-[color:var(--text-primary)]"
            >
              <span className="mb-2 block text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[color:var(--text-tertiary)]">
                {chrome.directAnswer}
              </span>
              {post.directAnswer}
            </div>
          ) : null}

          <div className="mt-10 max-w-[40rem] space-y-10">
            {post.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl leading-snug text-[color:var(--text-primary)]">{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="mt-3 text-lg leading-[1.75] text-[color:var(--text-secondary)]">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
            {paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)} className="text-lg leading-[1.75] text-[color:var(--text-secondary)]">
                {paragraph}
              </p>
            ))}
          </div>

          {post.faqs.length > 0 ? (
            <section className="mt-16 max-w-[40rem]">
              <h2 className="text-2xl text-[color:var(--text-primary)]">{chrome.faq}</h2>
              <dl className="mt-6 divide-y divide-[color:var(--border-light)] border-y border-[color:var(--border-light)]">
                {post.faqs.map((faq) => (
                  <div key={faq.question} className="py-5">
                    <dt className="text-lg text-[color:var(--text-primary)]">{faq.question}</dt>
                    <dd className="mt-2 leading-relaxed text-[color:var(--text-secondary)]">{faq.answer}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ) : null}

          {post.disclaimer ? (
            <p className="mt-10 max-w-[40rem] text-sm leading-relaxed text-[color:var(--text-tertiary)]">{post.disclaimer}</p>
          ) : null}

          {post.cta ? (
            <div className="surface-card mt-10 max-w-[40rem] p-6 md:p-8">
              <p className="text-lg leading-relaxed text-[color:var(--text-primary)]">{post.cta}</p>
              <Link
                href={`/${locale}/bookme`}
                className="btn-brand mt-5 inline-flex min-h-[44px] items-center px-5 text-sm"
              >
                {chrome.book}
              </Link>
            </div>
          ) : (
            <Link
              href={`/${locale}/bookme`}
              className="btn-brand mt-10 inline-flex min-h-[44px] items-center px-5 text-sm"
            >
              {chrome.book}
            </Link>
          )}

          {post.seriesOrder ? (
            <nav className="mt-12 grid gap-6 border-t border-[color:var(--border-light)] pt-8 sm:grid-cols-2">
              {previous ? (
                <Link href={`/${locale}/blog/${previous.slug}`} className="group">
                  <span className="text-xs uppercase tracking-[0.16em] text-[color:var(--text-tertiary)]">{chrome.previous}</span>
                  <span className="mt-1 block text-lg text-[color:var(--text-primary)] group-hover:text-[color:var(--brand-accent-teal)]">
                    {previous.title}
                  </span>
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link href={`/${locale}/blog/${next.slug}`} className="group sm:text-right">
                  <span className="text-xs uppercase tracking-[0.16em] text-[color:var(--text-tertiary)]">{chrome.next}</span>
                  <span className="mt-1 block text-lg text-[color:var(--text-primary)] group-hover:text-[color:var(--brand-accent-teal)]">
                    {next.title}
                  </span>
                </Link>
              ) : null}
            </nav>
          ) : (
            <p className="mt-10">
              <Link href={`/${locale}/blog`} className="text-[color:var(--text-primary)] underline decoration-[color:var(--border-medium)] underline-offset-4">
                {chrome.back}
              </Link>
            </p>
          )}
        </article>

        <aside className="lg:pt-28">
          <div className="lg:sticky lg:top-24">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[color:var(--text-tertiary)]">
              {chrome.inThisSeries}
            </p>
            <ol className="mt-4 space-y-3">
              {series.map((item) => {
                const current = item.slug === slug;
                return (
                  <li key={item.slug}>
                    <Link
                      href={`/${locale}/blog/${item.slug}`}
                      aria-current={current ? "page" : undefined}
                      className={
                        current
                          ? "text-sm font-semibold text-[color:var(--text-primary)]"
                          : "text-sm text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)]"
                      }
                    >
                      <span className="mr-2 font-mono text-xs tabular-nums text-[color:var(--text-tertiary)]">
                        {String(item.seriesOrder).padStart(2, "0")}
                      </span>
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ol>
            <Link href={`/${locale}/bookme`} className="btn-brand mt-8 inline-flex min-h-[44px] items-center px-4 text-sm">
              {chrome.book}
            </Link>
          </div>
        </aside>
      </div>
    </main>
    </BlogFrame>
  );
}

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => BLOG_POST_SLUGS.map((slug) => ({ locale, slug })));
}
