import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/content/blog-posts";
import { LOCALES, isValidLocale, localeToHtmlLang, type AppLocale } from "@/lib/i18n-routing";
import { localeAlternates } from "@/lib/alternate-metadata";

const siteUrlMeta =
  process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://www.innovatexp.co";

const OG_IMAGE = "/opengraph-image" as const;

const relatedServices = [
  { name: "AI Consulting", path: "/ai-consulting" },
  { name: "Premium AI consulting", path: "/premium-ai-consulting" },
  { name: "AI-era quality engineering", path: "/ai-era-quality" },
  { name: "EventXP", path: "/eventxp" },
  { name: "SmartSales CRM", path: "/smartsales-crm" },
  { name: "Book a call", path: "/bookme" },
];

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const post = blogPosts[slug];
  if (!post || !isValidLocale(locale)) return { title: "Blog | InnovateXP" };
  const pathSuffix = `/blog/${slug}`;
  const alternates = localeAlternates(locale, pathSuffix);
  const ogUrl =
    typeof alternates?.canonical === "string" ? alternates.canonical : `${siteUrlMeta}/${locale}${pathSuffix}`;
  return {
    title: `${post.title} | Blog | InnovateXP`,
    description: post.excerpt,
    alternates,
    openGraph: {
      title: `${post.title} | Blog | InnovateXP`,
      description: post.excerpt,
      url: ogUrl,
      siteName: "InnovateXP Limited",
      images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Blog | InnovateXP`,
      description: post.excerpt,
      images: [OG_IMAGE],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug, locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const post = blogPosts[slug];
  if (!post) notFound();

  const loc = locale as AppLocale;
  const postUrl = `${siteUrlMeta}/${locale}/blog/${slug}`;
  const jsonLd = {
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
      name: "InnovateXP founder",
      url: "https://www.linkedin.com/in/innovatexp/",
    },
    publisher: {
      "@type": "Organization",
      name: "InnovateXP Limited",
      url: siteUrlMeta,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrlMeta}/innovatexp_color_no_bg.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
      url: postUrl,
    },
    image: [`${siteUrlMeta}/innovatexp_color_no_bg.svg`],
    url: postUrl,
  };

  return (
    <main className="min-h-screen bg-[#fffcf7] dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <nav className="mb-8 text-sm text-gray-500 dark:text-gray-400">
          <Link href={`/${locale}`} className="hover:text-brand-primary dark:hover:text-teal-300">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href={`/${locale}/blog`} className="hover:text-brand-primary dark:hover:text-teal-300">
            Blog
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700 dark:text-gray-300">{post.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-12">
          <article>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{post.title}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{post.date}</p>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">{post.body}</p>
            </div>
            <p className="mt-8">
              <Link
                href={`/${locale}/blog`}
                className="font-medium text-brand-primary hover:underline dark:text-teal-300"
              >
                ← Back to blog
              </Link>
            </p>
          </article>

          <aside className="lg:order-2">
            <div className="sticky top-24 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-md">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Related Services</h2>
              <ul className="space-y-3">
                {relatedServices.map((s) => (
                  <li key={s.path}>
                    <Link
                      href={`/${locale}${s.path}`}
                      className="font-medium text-brand-primary hover:underline dark:text-teal-300"
                    >
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href={`/${locale}/bookme`}
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
  return LOCALES.flatMap((locale) => Object.keys(blogPosts).map((slug) => ({ locale, slug })));
}
