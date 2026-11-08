import { after, before, test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { BLOG_CATEGORIES } from "@/content/blog-types";
import { BLOG_CHROME } from "@/content/blog-chrome";
import { blogSeo } from "@/content/page-seo";
import { WORKFLOW_BLOG_POSTS } from "@/content/workflow-blog-posts";
import { PDPO_BLOG_SERIES } from "@/content/pdpo-blog-series";
import { blogPosts } from "@/content/blog-posts";
import { BLOG_POST_SLUGS, blogLinkHref, buildBlogArticleSchema, getBlogView, listArchive, listInsights, listSeries, seriesNeighbors, seriesTotal } from "@/content/blog-catalog";
import { formatHkd, PRICING } from "@/content/pricing";
import { LOCALES, localeToHtmlLang } from "@/lib/i18n-routing";
import BlogIndexPage, { generateMetadata as indexMetadata } from "@/app/[locale]/blog/page";
import BlogPostPage, { generateStaticParams, generateMetadata as articleMetadata } from "@/app/[locale]/blog/[slug]/page";

// tsx honours this repo's JSX-preserve setting; supply the classic runtime in tests only.
const runtime = globalThis as typeof globalThis & { React?: typeof React };
const previousReact = runtime.React;
before(() => { runtime.React = React; });
after(() => { if (previousReact) runtime.React = previousReact; else Reflect.deleteProperty(runtime, "React"); });
const root = path.resolve(import.meta.dirname, "..");
const htmlText = (text: string) => renderToStaticMarkup(React.createElement(React.Fragment, null, text));
const officialSources = new Set([
  "https://developers.google.com/search/docs/appearance/ai-features",
  "https://developers.google.com/search/updates",
]);

test("eight complete new articles cover all five nonempty pillars in all five locales", () => {
  assert.equal(WORKFLOW_BLOG_POSTS.length, 8);
  assert.equal(BLOG_CATEGORIES.length, 5);
  assert.equal(new Set(BLOG_POST_SLUGS).size, BLOG_POST_SLUGS.length);
  for (const locale of LOCALES) {
    assert.equal(listInsights(locale).length, 8);
    for (const category of BLOG_CATEGORIES) {
      const posts = listInsights(locale, category);
      assert.ok(posts.length > 0, `${locale}/${category} must not be empty`);
      assert.ok(posts.every((post) => post.category === category));
      assert.ok(BLOG_CHROME[locale].categories[category].description.length > 10);
    }
    for (const post of WORKFLOW_BLOG_POSTS) {
      assert.equal(post.date, "2026-11-09");
      assert.equal(post.modifiedDate, undefined);
      assert.deepEqual(Object.keys(post.locales).sort(), [...LOCALES].sort());
      assert.equal(new Set(LOCALES.map((loc) => post.locales[loc].title)).size, 5);
      const copy = post.locales[locale];
      assert.ok(copy.title.length > 12 && copy.excerpt.length > 25 && copy.directAnswer.length > 60);
      assert.equal(copy.keyTakeaways.length, 3);
      assert.equal(new Set(copy.keyTakeaways).size, 3);
      assert.ok(copy.keyTakeaways.every((item) => item.length > 10));
      assert.ok(copy.sections.length >= 3);
      assert.ok(copy.sections.every((section) => section.heading.length > 3 && section.paragraphs.join(" ").length >= 80));
      assert.ok(copy.limitations.length > 45);
      assert.ok(copy.sources.length > 0 && copy.relatedServices.length > 0 && copy.relatedCases.length > 0);
      assert.match(copy.cta, /30/);
      assert.match(BLOG_CHROME[locale].book, /30/);
      assert.doesNotMatch(JSON.stringify(copy), /TODO|TBD|lorem ipsum|\b4D\b|待補|稍後補充/i);
    }
  }
});

test("all old slugs, PDPO order, neighbours and original archive bodies remain intact", () => {
  assert.equal(seriesTotal(), PDPO_BLOG_SERIES.length);
  assert.equal(BLOG_POST_SLUGS.length, WORKFLOW_BLOG_POSTS.length + PDPO_BLOG_SERIES.length + Object.keys(blogPosts).length);
  for (const locale of LOCALES) {
    const series = listSeries(locale);
    assert.deepEqual(series.map((post) => post.seriesOrder), PDPO_BLOG_SERIES.map((post) => post.order).sort((a, b) => a - b));
    for (const [index, post] of series.entries()) {
      assert.ok(BLOG_POST_SLUGS.includes(post.slug));
      assert.deepEqual(seriesNeighbors(post.seriesOrder!), { previous: series[index - 1]?.slug ?? null, next: series[index + 1]?.slug ?? null });
      const original = PDPO_BLOG_SERIES.find((item) => item.slug === post.slug)!;
      assert.equal(post.date, original.date);
      assert.equal(post.title, original.locales[locale].title);
      assert.deepEqual(post.sections, original.locales[locale].sections);
    }
    for (const [slug, original] of Object.entries(blogPosts)) {
      const view = getBlogView(slug, locale)!;
      assert.equal(view.title, original.title);
      assert.equal(view.date, original.date);
      assert.equal(view.body, original.body);
      assert.equal(view.seriesOrder, null);
    }
    assert.equal(getBlogView("not-a-post", locale), null);
  }
  assert.equal(listArchive().length, Object.keys(blogPosts).length);
  assert.equal(generateStaticParams().length, BLOG_POST_SLUGS.length * LOCALES.length);
});

test("source, service and case links use real internal routes or verified official URLs", () => {
  for (const post of WORKFLOW_BLOG_POSTS) {
    for (const locale of LOCALES) {
      const copy = post.locales[locale];
      for (const link of [...copy.sources, ...copy.relatedServices, ...copy.relatedCases]) {
        assert.ok(link.label.length > 3);
        if (link.href.startsWith("https://")) {
          assert.ok(officialSources.has(link.href), `Unverified source ${link.href}`);
          assert.equal(blogLinkHref(locale, link.href), link.href);
        } else {
          assert.match(link.href, /^\/(?!\/)/);
          assert.equal(blogLinkHref(locale, link.href), `/${locale}${link.href}`);
          const route = link.href.split("#")[0];
          if (route.startsWith("/blog/")) assert.ok(getBlogView(route.slice(6), locale));
          else assert.ok(existsSync(path.join(root, "src/app/[locale]", route.slice(1), "page.tsx")), route);
        }
      }
    }
  }
});

test("prices follow PRICING with separate SmartSales pilot, setup and care", () => {
  for (const locale of LOCALES) {
    const comparison = JSON.stringify(getBlogView("snapshot-vs-discovery", locale));
    for (const amount of [PRICING.quickCash.aiReadinessAssessment, PRICING.consultancy.discoverySprint30Day, PRICING.consultancy.discoveryWorkshop11To30, PRICING.quickCash.aiReadinessDiscoveryTopUp]) {
      assert.ok(comparison.includes(formatHkd(amount, locale)));
    }
    const crm = JSON.stringify(getBlogView("smartsales-enterprise-crm-checklist", locale));
    for (const amount of [PRICING.tools.smartSales.trial, PRICING.tools.smartSales.setupStarter, PRICING.tools.smartSales.setupGrowth, PRICING.tools.smartSales.maintenanceStarterMonthly]) {
      assert.ok(crm.includes(formatHkd(amount, locale)));
    }
    assert.match(crm, /API/);
    assert.match(crm, /AI|KI/);
  }
  const source = readFileSync(path.join(root, "src/content/workflow-blog-posts.ts"), "utf8");
  assert.doesNotMatch(source, /HK\$\s*\d|\b(?:3_?880|6_?880|13_?600|24_?800|48_?800|1_?880)\b/);
});

test("measurement and visibility copy retain evidence boundaries in every locale", () => {
  for (const locale of LOCALES) {
    const pilot = getBlogView("measure-ai-pilot-hours-errors-rework", locale)!;
    const copy = JSON.stringify(pilot);
    assert.match(copy, /2026/);
    assert.match(copy, /Agilizing/);
    assert.match(copy, /÷ 60/);
    assert.doesNotMatch(copy, /\d+(?:\.\d+)?\s*[%％]/);
    const visibility = getBlogView("geo-aeo-seo-measurement-limits", locale)!;
    const text = JSON.stringify(visibility);
    assert.match(text, /llms\.txt/);
    assert.match(text, /Search Console/);
    assert.match(text, /2026/);
    assert.deepEqual(visibility.sources?.map((link) => link.href), [...officialSources]);
  }
  const enPilot = JSON.stringify(getBlogView("measure-ai-pilot-hours-errors-rework", "en"));
  assert.match(enPilot, /Illustrative formulas, not customer outcomes/);
  assert.match(enPilot, /January–February 2026/);
  assert.match(enPilot, /confirmed by the client owner/);
  assert.match(enPilot, /ZOmate and Flower Nice Day cases provide no performance figures/);
  const enVisibility = JSON.stringify(getBlogView("geo-aeo-seo-measurement-limits", "en"));
  assert.match(enVisibility, /May 7, 2026/);
  assert.match(enVisibility, /neither guarantees citations, rankings or traffic/);
});

test("Article identity, headline and dates match the real content", () => {
  const siteUrl = "https://www.innovatexp.co";
  for (const locale of LOCALES) {
    for (const slug of BLOG_POST_SLUGS) {
      const post = getBlogView(slug, locale)!;
      const schema = buildBlogArticleSchema(post, locale, siteUrl);
      assert.equal(schema.headline, post.title);
      assert.equal(schema.datePublished, post.date);
      assert.equal(schema.inLanguage, localeToHtmlLang(locale));
      assert.equal(schema.author.name, "Larry Lo");
      assert.equal(schema.author["@id"], `${siteUrl}/#founder`);
      assert.equal(schema.author.url, `${siteUrl}/${locale}/about`);
      assert.equal(schema.publisher["@id"], `${siteUrl}/#organization`);
      assert.equal(schema["@id"], `${schema.url}#article`);
      assert.equal(schema.mainEntityOfPage.url, schema.url);
      assert.equal("dateModified" in schema, false);
    }
  }
  const revised = { ...getBlogView(WORKFLOW_BLOG_POSTS[0].slug, "en")!, modifiedDate: "2026-11-10" };
  assert.equal(buildBlogArticleSchema(revised, "en", `${siteUrl}/`).dateModified, revised.modifiedDate);
});

test("the server-rendered index has real category anchors, new posts, series and archives", async () => {
  for (const locale of LOCALES) {
    const page = await BlogIndexPage({ params: Promise.resolve({ locale }) });
    // Render the server-owned body, not the independently owned client navigation shell.
    const html = renderToStaticMarkup(page.props.children);
    for (const category of BLOG_CATEGORIES) {
      assert.ok(html.includes(`href="#${category}"`));
      assert.ok(html.includes(`id="${category}"`));
      assert.ok(html.includes(htmlText(BLOG_CHROME[locale].categories[category].description)));
    }
    for (const slug of BLOG_POST_SLUGS) assert.ok(html.includes(`href="/${locale}/blog/${slug}"`), slug);
    assert.ok(html.includes('id="pdpo-series"'));
    assert.ok(html.includes('id="archive"'));
    assert.ok(html.includes(htmlText(BLOG_CHROME[locale].indexTitle)));
    const metadata = await indexMetadata({ params: Promise.resolve({ locale }) });
    assert.equal(metadata.title, blogSeo(locale).title);
    assert.equal(metadata.description, blogSeo(locale).description);
  }
});

test("all forty article bodies, takeaways, evidence links and FAQs render without client interaction", async () => {
  for (const locale of LOCALES) {
    for (const original of WORKFLOW_BLOG_POSTS) {
      const post = getBlogView(original.slug, locale)!;
      const params = Promise.resolve({ locale, slug: post.slug });
      const page = await BlogPostPage({ params });
      const html = renderToStaticMarkup(page.props.children);
      for (const text of [post.title, post.directAnswer!, ...post.keyTakeaways!, ...post.sections.flatMap((section) => [section.heading, ...section.paragraphs]), post.limitations!, ...post.faqs.flatMap((faq) => [faq.question, faq.answer])]) {
        assert.ok(html.includes(htmlText(text)), `${locale}/${post.slug}: missing server content ${text.slice(0, 40)}`);
      }
      assert.ok(html.indexOf('id="key-takeaways"') < html.indexOf(htmlText(post.sections[0].heading)));
      assert.ok(html.includes(`href="/${locale}/about"`));
      assert.ok(html.includes('rel="author"'));
      assert.ok(html.includes('dateTime="2026-11-09"'));
      assert.ok(html.includes(`href="/${locale}/bookme"`));
      assert.ok(html.includes(htmlText(BLOG_CHROME[locale].book)));
      for (const link of [...post.sources!, ...post.relatedServices!, ...post.relatedCases!]) {
        assert.ok(html.includes(`href="${blogLinkHref(locale, link.href)}"`));
      }
      const json = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)?.[1];
      assert.ok(json);
      const schema = JSON.parse(json);
      assert.equal(schema.headline, post.title);
      assert.equal(schema.datePublished, post.date);
      assert.equal("dateModified" in schema, false);
      const metadata = await articleMetadata({ params });
      assert.equal(metadata.description, post.excerpt);
      assert.equal(metadata.openGraph && "type" in metadata.openGraph && metadata.openGraph.type, "article");
    }
  }
});

test("PDPO series navigation and legacy paragraphs remain server-rendered", async () => {
  for (const locale of LOCALES) {
    const series = listSeries(locale);
    const page = await BlogPostPage({ params: Promise.resolve({ locale, slug: series[1].slug }) });
    const html = renderToStaticMarkup(page.props.children);
    for (const post of series) assert.ok(html.includes(`href="/${locale}/blog/${post.slug}"`));
    assert.ok(html.includes(htmlText(BLOG_CHROME[locale].inThisSeries)));
    for (const [slug, original] of Object.entries(blogPosts)) {
      const archive = await BlogPostPage({ params: Promise.resolve({ locale, slug }) });
      const archiveHtml = renderToStaticMarkup(archive.props.children);
      for (const paragraph of original.body.split(/\n\n+/)) assert.ok(archiveHtml.includes(htmlText(paragraph)));
      assert.ok(archiveHtml.includes(`href="/${locale}/about"`));
    }
  }
});

test("a tracked revision renders its real date; unknown routes return not found", async () => {
  const post = WORKFLOW_BLOG_POSTS[0];
  try {
    post.modifiedDate = "2026-11-10";
    const page = await BlogPostPage({ params: Promise.resolve({ locale: "en", slug: post.slug }) });
    const html = renderToStaticMarkup(page.props.children);
    assert.ok(html.includes('dateTime="2026-11-09"'));
    assert.ok(html.includes('dateTime="2026-11-10"'));
    const json = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)?.[1];
    assert.ok(json);
    assert.equal(JSON.parse(json).dateModified, post.modifiedDate);
  } finally {
    delete post.modifiedDate;
  }
  await assert.rejects(BlogPostPage({ params: Promise.resolve({ locale: "en", slug: "not-a-post" }) }), /NEXT_HTTP_ERROR_FALLBACK;404/);
  await assert.rejects(BlogIndexPage({ params: Promise.resolve({ locale: "invalid" }) }), /NEXT_HTTP_ERROR_FALLBACK;404/);
});

test("embedded Article JSON-LD escapes less-than characters", async () => {
  const post = WORKFLOW_BLOG_POSTS[0];
  const originalTitle = post.locales.en.title;
  try {
    post.locales.en.title = "A <script> marker in an editorial title";
    const page = await BlogPostPage({ params: Promise.resolve({ locale: "en", slug: post.slug }) });
    const html = renderToStaticMarkup(page.props.children);
    const json = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)?.[1];
    assert.ok(json);
    assert.ok(json.includes("\\u003cscript>"));
    assert.equal(json.includes("<script>"), false);
    assert.equal(JSON.parse(json).headline, post.locales.en.title);
  } finally {
    post.locales.en.title = originalTitle;
  }
});
