import { test } from "node:test";
import assert from "node:assert/strict";
import { buildStructuredData } from "@/app/components/StructuredData";
import { AUTHOR, authorSameAs } from "@/lib/author";
import { LOCALES, type AppLocale } from "@/lib/i18n-routing";
import { getSiteUrl } from "@/lib/site-url";
import { buildLocalizedSitemap, STATIC_LOCALIZED_PATHS } from "@/lib/site-routes";
import {
  getOrganizationSchema,
  getPersonSchema,
  getWebSiteSchema,
  getSmartSalesProductSchema,
  getEventXPProductSchema,
  getAIConsultingServiceSchema,
  getFAQPageSchema,
  getHowToSchema,
  serializeJsonLd,
} from "@/lib/schema";
import { buildServicePageJsonLd } from "@/lib/seo/service-page-schema";
import { getHomepageContent } from "@/content/homepage";
import { getServicePage } from "@/content/service-pages";
import { BLOG_POST_SLUGS, getBlogView } from "@/content/blog-catalog";
import { PDPO_BLOG_SERIES } from "@/content/pdpo-blog-series";
import { PRICING } from "@/content/pricing";

type SchemaNode = { "@type": string | string[]; "@id"?: string; [key: string]: unknown };

function graphFor(path: string): SchemaNode[] {
  return buildStructuredData(path);
}

function entity(path: string, fragment: string): SchemaNode {
  const node = graphFor(path).find((item) => item["@id"] === `${getSiteUrl()}/#${fragment}`);
  assert.ok(node, `${path}: missing ${fragment}`);
  return node;
}

function hasType(node: SchemaNode, type: string): boolean {
  return Array.isArray(node["@type"]) ? node["@type"].includes(type) : node["@type"] === type;
}

test("company and founder identities remain distinct while local business facts are retained", () => {
  const organization = getOrganizationSchema();
  const person = getPersonSchema();
  assert.deepEqual(authorSameAs(), [AUTHOR.linkedInPersonal]);
  assert.deepEqual(organization.sameAs, [AUTHOR.linkedInCompany]);
  assert.deepEqual(person.sameAs, [AUTHOR.linkedInPersonal]);
  assert.equal(organization.founder["@id"], person["@id"]);
  assert.equal(person.worksFor["@id"], organization["@id"]);
  assert.equal(AUTHOR.yearsExperience, 14);
  for (const locale of LOCALES) {
    const graph = graphFor(`/${locale}`);
    assert.equal(graph.filter((node) => hasType(node, "Organization") || hasType(node, "LocalBusiness")).length, 1);
    const org = entity(`/${locale}`, "organization");
    assert.deepEqual(org.sameAs, organization.sameAs);
    assert.deepEqual(org.geo, { "@type": "GeoCoordinates", latitude: 22.2908, longitude: 114.195 });
    assert.deepEqual(org.openingHoursSpecification, organization.openingHoursSpecification);
    assert.equal(org.priceRange, "$$");
    assert.deepEqual(org.address, organization.address);
    assert.ok(org.contactPoint);
    assert.ok(org.image);
    assert.ok(org.logo);
    const founder = entity(`/${locale}`, "founder");
    assert.deepEqual(founder.sameAs, person.sameAs);
    assert.match(String(founder.description), /14/);
    assert.doesNotMatch(String(founder.description), /13/);
    assert.ok(founder.affiliation);
    assert.ok(founder.alumniOf);
    assert.doesNotMatch(serializeJsonLd(graph), /"telephone"/);
    assert.equal(graph.filter((node) => node["@id"]?.endsWith("#ai-consulting")).length, 1);
    assert.ok(!graph.some((node) => node["@id"]?.endsWith("#consulting-service") || node["@id"]?.endsWith("#localbusiness")));
  }
});

test("all SmartSales locales distinguish pilot, setup, monthly care and separately quoted extras", () => {
  const terms: Record<AppLocale, RegExp[]> = {
    en: [/pilot/, /production setup/, /monthly/, /AI usage/, /membership/, /custom integrations/, /separately/],
    "zh-hk": [/pilot/, /正式上線/, /月費維護/, /AI 用量/, /會員/, /客製接駁/, /另報/],
    "zh-tw": [/試行/, /正式上線/, /每月技術維護/, /AI 用量/, /會員/, /客製整合/, /另行報價/],
    ja: [/試行/, /本番導入/, /月次技術保守/, /AI 利用量/, /会員制度/, /カスタム連携/, /別途見積/],
    de: [/Pilot/, /Produktiveinrichtung/, /monatliche/, /KI-Nutzung/, /Mitgliedschaftsregeln/, /Integrationen/, /gesondert/],
  };
  const shared = getSmartSalesProductSchema();
  for (const locale of LOCALES) {
    const service = entity(`/${locale}/smartsales-crm`, "smartsales-crm");
    assert.equal(service["@type"], "Service");
    assert.match(String(service.description), /WhatsApp/);
    for (const term of terms[locale]) assert.match(String(service.description), term);
    assert.deepEqual(service.offers, shared.offers);
    assert.deepEqual(service.provider, { "@id": `${getSiteUrl()}/#organization` });
  }
  assert.equal(shared.offers[0].price, PRICING.tools.smartSales.trial);
  assert.match(shared.description, /AI usage/);
});

test("EventXP locales describe configured operations rather than unsupported AI analysis", () => {
  const terms: Record<AppLocale, RegExp[]> = {
    en: [/Configurable/, /registration/, /QR\/kiosk/, /member and guest/, /reporting/, /follow-up/],
    "zh-hk": [/配置/, /報名/, /QR／kiosk/, /會員及嘉賓/, /報告/, /跟進/],
    "zh-tw": [/配置/, /報名/, /QR／自助/, /會員與嘉賓/, /報告/, /跟進/],
    ja: [/設定/, /登録/, /QR／キオスク/, /会員・ゲスト/, /レポート/, /フォローアップ/],
    de: [/konfigurierter/, /Anmeldung/, /QR-\/Kiosk/, /Mitglieder- und Gäste/, /berichte/, /Nachbereitung/],
  };
  for (const locale of LOCALES) {
    const service = entity(`/${locale}/eventxp`, "eventxp");
    for (const term of terms[locale]) assert.match(String(service.description), term);
    assert.doesNotMatch(String(service.description), /\bAI\b|\bKI\b/);
    assert.deepEqual(service.serviceOutput, { "@id": getEventXPProductSchema()["@id"] });
  }
  assert.ok(getEventXPProductSchema().featureList.includes("Optional AI matching and seating recommendations"));
});

test("homepage FAQ matches visible content and marketing journeys are not tutorials or speakable markup", () => {
  for (const locale of LOCALES) {
    const home = graphFor(`/${locale}`);
    const faqs = home.filter((node) => hasType(node, "FAQPage"));
    assert.equal(faqs.length, 1);
    assert.deepEqual(faqs[0].mainEntity, getFAQPageSchema({
      url: `${getSiteUrl()}/${locale}`,
      questions: getHomepageContent(locale).faq.items,
    }).mainEntity);
    for (const suffix of ["", "/bookme", "/blog", "/blog/pdpo-six-principles-before-ai", "/smartsales-crm", "/eventxp", "/ai-consulting", "/ai-seo-update-package"]) {
      const graph = graphFor(`/${locale}${suffix}`);
      assert.doesNotMatch(serializeJsonLd(graph), /"(?:HowTo|HowToStep|SpeakableSpecification|speakable)"/);
      if (suffix) assert.ok(!graph.some((node) => hasType(node, "FAQPage")));
      const ids = graph.flatMap((node) => node["@id"] ? [node["@id"]] : []);
      assert.equal(new Set(ids).size, ids.length);
    }
  }
  // Actual tutorials may still use the explicit step builder.
  assert.equal(getHowToSchema({ name: "Export a pattern", description: "Export instructions", url: getSiteUrl(), steps: [{ name: "Export", text: "Select Export PNG." }] })["@type"], "HowTo");
});

test("service pages describe services or courses and emit only the FAQs in their visible content", () => {
  for (const locale of LOCALES) {
    for (const slug of ["ai-training", "ai-coaching", "proposal-to-cash-ai"] as const) {
      const content = getServicePage(slug, locale);
      const graph = buildServicePageJsonLd({ locale, content });
      assert.equal(graph[0]["@type"], content.schemaKind === "Course" ? "Course" : "Service");
      assert.ok(!("educationalCredentialAwarded" in graph[0]));
      const faq = graph.find((node) => node["@type"] === "FAQPage");
      assert.ok(faq && "mainEntity" in faq);
      assert.deepEqual(faq.mainEntity, getFAQPageSchema({ url: getSiteUrl(), questions: content.faqs }).mainEntity);
      assert.ok(!buildServicePageJsonLd({ locale, content: { ...content, faqs: [] } }).some((node) => node["@type"] === "FAQPage"));
    }
  }
});

test("JSON-LD escaping preserves data without allowing script-element termination", () => {
  const input = { text: '</script><script>alert("x")</script><!--', nested: [{ value: "<p>" }] };
  const serialized = serializeJsonLd(input);
  assert.ok(!serialized.includes("<"));
  assert.match(serialized, /\\u003c/);
  assert.deepEqual(JSON.parse(serialized), input);
});

test("sitemap preserves public page URLs and uses known catalog dates, not build time", () => {
  const sitemap = buildLocalizedSitemap();
  const siteUrl = getSiteUrl();
  const expected: string[] = [];
  for (const locale of LOCALES) {
    for (const row of STATIC_LOCALIZED_PATHS) {
      if (row.path === "/creative-studio" || row.path.startsWith("/creative-studio/")) continue;
      const url = `${siteUrl}/${locale}${row.path === "/" ? "" : row.path}`;
      expected.push(url);
      const entry = sitemap.find((item) => item.url === url);
      assert.ok(entry);
      assert.ok(!("lastModified" in entry));
    }
    for (const slug of BLOG_POST_SLUGS) {
      const url = `${siteUrl}/${locale}/blog/${slug}`;
      expected.push(url);
      const entry = sitemap.find((item) => item.url === url);
      assert.ok(entry);
      const post = getBlogView(slug, locale);
      const date = post?.modifiedDate ?? post?.date;
      assert.equal(entry.lastModified, date || undefined);
      if (date) assert.ok(Number.isFinite(Date.parse(date)));
    }
  }
  assert.deepEqual(sitemap.map((item) => item.url).sort(), expected.sort());
  assert.equal(new Set(expected).size, expected.length);
  assert.ok(!sitemap.some((item) => item.url.endsWith(".txt")));
});

test("the shared PDPO CTA duration is 30 minutes in all five locales", () => {
  const durations: Record<AppLocale, RegExp> = { en: /30-minute/, "zh-hk": /30 分鐘/, "zh-tw": /30 分鐘/, ja: /30分/, de: /30-minütige/ };
  for (const slug of ["pdpo-six-principles-before-ai", "staff-chatgpt-and-pdpo"]) {
    const post = PDPO_BLOG_SERIES.find((item) => item.slug === slug);
    assert.ok(post);
    for (const locale of LOCALES) {
      assert.match(post.locales[locale].cta, durations[locale]);
      assert.doesNotMatch(post.locales[locale].cta, /1-hour|1 小時|1時間|einstündige/);
    }
  }
});

test("schema builders read the canonical URL source at call time", () => {
  const previous = process.env.NEXT_PUBLIC_SITE_URL;
  process.env.NEXT_PUBLIC_SITE_URL = "https://seo.example.test";
  try {
    const siteUrl = getSiteUrl();
    assert.equal(getOrganizationSchema()["@id"], `${siteUrl}/#organization`);
    assert.equal(getPersonSchema()["@id"], `${siteUrl}/#founder`);
    assert.equal(getWebSiteSchema()["@id"], `${siteUrl}/#website`);
    for (const schema of [getSmartSalesProductSchema(), getEventXPProductSchema(), getAIConsultingServiceSchema()]) {
      assert.ok(schema.url.startsWith(siteUrl));
    }
    assert.equal(entity("/de", "organization").url, siteUrl);
    assert.ok(buildLocalizedSitemap().every((item) => item.url.startsWith(siteUrl)));
  } finally {
    if (previous === undefined) delete process.env.NEXT_PUBLIC_SITE_URL;
    else process.env.NEXT_PUBLIC_SITE_URL = previous;
  }
});
