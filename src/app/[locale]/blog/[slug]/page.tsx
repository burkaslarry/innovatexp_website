import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_CHROME } from "@/content/blog-chrome";
import { BLOG_POST_SLUGS, blogLinkHref, buildBlogArticleSchema, getBlogView, listInsights, listSeries, seriesNeighbors, seriesTotal } from "@/content/blog-catalog";
import { LOCALES, isValidLocale, localeToHtmlLang, type AppLocale } from "@/lib/i18n-routing";
import { localeAlternates } from "@/lib/alternate-metadata";
import { BlogFrame } from "@/components/BlogFrame";
import { AUTHOR } from "@/lib/author";
import { getFAQPageSchema } from "@/lib/schema";

import { getSiteUrl } from "@/lib/site-url";

const siteUrlMeta = getSiteUrl();

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
      type: "article",
      publishedTime: post.date,
      ...(post.modifiedDate ? { modifiedTime: post.modifiedDate } : {}),
      authors: [`${siteUrlMeta}/${locale}/about`],
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
  const sidebarPosts = post.seriesOrder ? listSeries(loc) : listInsights(loc);
  const sidebarTitle = post.seriesOrder ? chrome.inThisSeries : chrome.relatedArticles;
  const neighbors = post.seriesOrder ? seriesNeighbors(post.seriesOrder) : { previous: null, next: null };
  const previous = neighbors.previous ? getBlogView(neighbors.previous, loc) : null;
  const next = neighbors.next ? getBlogView(neighbors.next, loc) : null;
  const dateFmt = new Intl.DateTimeFormat(localeToHtmlLang(loc), { dateStyle: "long", timeZone: "UTC" });
  const postUrl = `${siteUrlMeta}/${locale}/blog/${slug}`;
  const paragraphs = post.body?.split(/\n\n+/).filter(Boolean) ?? [];

  const articleLd = buildBlogArticleSchema(post, loc, siteUrlMeta);

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
        <article className="min-w-0 hyphens-auto [overflow-wrap:anywhere]">
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
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[color:var(--text-secondary)]">
            <p>{chrome.author} <Link href={`/${locale}/about`} rel="author" className="underline underline-offset-4">{AUTHOR.name}</Link></p>
            <p>{chrome.published} <time dateTime={post.date}>{dateFmt.format(new Date(`${post.date}T00:00:00Z`))}</time></p>
            {post.modifiedDate ? <p>{chrome.modified} <time dateTime={post.modifiedDate}>{dateFmt.format(new Date(`${post.modifiedDate}T00:00:00Z`))}</time></p> : null}
          </div>
          {post.category ? (
            <Link href={`/${locale}/blog#${post.category}`} className="mt-4 inline-block text-sm text-[color:var(--text-secondary)] underline underline-offset-4">
              {chrome.categories[post.category].title}
            </Link>
          ) : null}

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

          {post.keyTakeaways?.length ? (
            <section aria-labelledby="key-takeaways" className="mt-8 max-w-[40rem] rounded-xl bg-[color:var(--bg-secondary)] p-6 ring-1 ring-[color:var(--border-light)]">
              <h2 id="key-takeaways" className="text-lg font-semibold text-[color:var(--text-primary)]">{chrome.keyTakeaways}</h2>
              <ul className="mt-4 list-disc space-y-3 pl-5 leading-relaxed text-[color:var(--text-secondary)]">
                {post.keyTakeaways.map((takeaway) => <li key={takeaway}>{takeaway}</li>)}
              </ul>
            </section>
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

          {post.limitations ? (
            <section className="mt-10 max-w-[40rem]">
              <h2 className="text-2xl text-[color:var(--text-primary)]">{chrome.limitations}</h2>
              <p className="mt-3 leading-relaxed text-[color:var(--text-secondary)]">{post.limitations}</p>
            </section>
          ) : null}

          {[
            { heading: chrome.sources, links: post.sources },
            { heading: chrome.relatedServices, links: post.relatedServices },
            { heading: chrome.relatedCases, links: post.relatedCases },
          ].map(({ heading, links }) => links?.length ? (
            <section key={heading} className="mt-10 max-w-[40rem]">
              <h2 className="text-xl text-[color:var(--text-primary)]">{heading}</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-[color:var(--text-secondary)]">
                {links.map((link) => (
                  <li key={link.href}>
                    <a href={blogLinkHref(loc, link.href)} className="underline underline-offset-4 hover:text-[color:var(--text-primary)]">{link.label}</a>
                  </li>
                ))}
              </ul>
            </section>
          ) : null)}

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

        <aside className="min-w-0 [overflow-wrap:anywhere] lg:pt-28">
          <div className="lg:sticky lg:top-24">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[color:var(--text-tertiary)]">
              {sidebarTitle}
            </p>
            <ol className="mt-4 space-y-3">
              {sidebarPosts.map((item) => {
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
                      {item.seriesOrder ? (
                        <span className="mr-2 font-mono text-xs tabular-nums text-[color:var(--text-tertiary)]">
                          {String(item.seriesOrder).padStart(2, "0")}
                        </span>
                      ) : null}
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
