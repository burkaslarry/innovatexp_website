import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ConsultingPage, { generateMetadata as consultingMetadata } from "@/app/[locale]/ai-consulting/page";
import SnapshotPage from "@/app/[locale]/services/snapshot/page";
import SmartSalesPage from "@/app/[locale]/smartsales-crm/page";
import VisibilityPage from "@/app/[locale]/ai-seo-update-package/page";
import { SitePageShell } from "@/components/SitePageShell";
import { InquiryCartProvider } from "@/context/InquiryCartContext";
import { ServiceLandingPage } from "@/features/marketing/ServiceLandingPage";
import { getServicePage } from "@/content/service-pages";
import { commerceCopy, PURCHASE_POLICY_VERSION } from "@/content/commerce";
import { smartSalesScope } from "@/content/smartsales-scope";
import { PRICING, formatHkd } from "@/content/pricing";
import { AI_VISIBILITY_TECHNICAL_COPY, getConsultingDecisionCopy, SERVICE_DECISION_COPY } from "@/content/service-decision-copy";

// The test runner uses the classic JSX transform; Next supplies its own JSX runtime.
Object.assign(globalThis, { React });
const locales = ["en", "zh-hk", "zh-tw", "ja", "de"] as const;
const source = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");
const escaped = (text: string) => renderToStaticMarkup(React.createElement(React.Fragment, null, text));
const visible = (html: string) => html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
function renderBody(page: React.ReactElement<{ children: React.ReactNode; title: string }>) {
  assert.equal(page.type, SitePageShell);
  assert.ok(page.props.title);
  const html = renderToStaticMarkup(React.createElement(InquiryCartProvider, null, page.props.children));
  assert.doesNotMatch(html, /<h1\b|<main\b|<header\b/);
  assert.match(html, /data-geo-answer/);
  assert.doesNotMatch(html, /href="(?:tel:|https:\/\/wa\.me\/)/);
  return html;
}
function assertFaqParity(html: string) {
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .flatMap(match => { const parsed = JSON.parse(match[1]); return Array.isArray(parsed) ? parsed : [parsed]; });
  const faq = schemas.find(schema => schema["@type"] === "FAQPage");
  assert.ok(faq, "FAQ schema is present");
  for (const question of faq.mainEntity) {
    assert.ok(visible(html).includes(escaped(question.name)), question.name);
    assert.ok(visible(html).includes(escaped(question.acceptedAnswer.text)), question.name);
  }
}

test("consulting is localized in five languages and separates free conversation from paid work", async () => {
  const titles = new Set<string>();
  for (const locale of locales) {
    const c = getConsultingDecisionCopy(locale);
    const page = await ConsultingPage({ params: Promise.resolve({ locale }) });
    const html = renderBody(page);
    titles.add(page.props.title);
    assert.doesNotMatch(page.props.title, /30|3[,.]880/);
    for (const text of [c.answer, c.free, c.fit, c.unfit, c.quoteDetail, ...SERVICE_DECISION_COPY[locale].inputs]) {
      assert.ok(visible(html).includes(escaped(text)));
    }
    assert.deepEqual(c.packages.slice(0, 3).map(plan => plan.price), [
      formatHkd(PRICING.quickCash.aiReadinessAssessment, locale),
      formatHkd(PRICING.consultancy.discoverySprint30Day, locale),
      formatHkd(PRICING.consultancy.discoveryWorkshop11To30, locale),
    ]);
    assert.equal(c.packages[3].price, c.quoted);
    assert.doesNotMatch(html, /29[,.]800|58[,.]000|Launch within 30 days/);
    for (const path of ["/bookme", "/services/snapshot", "/services", "/case-studies"]) assert.ok(html.includes(`href="/${locale}${path}"`));
    const metadata = await consultingMetadata({ params: Promise.resolve({ locale }) });
    assert.equal(metadata.description, c.answer);
    assertFaqParity(html);
  }
  assert.equal(titles.size, 5, "no locale falls back to another language's consulting title");
});

test("shared service/course template retains content with decision sections before modules and pricing", () => {
  for (const locale of locales) for (const slug of ["ai-training", "ai-coaching", "proposal-to-cash-ai"] as const) {
    const content = getServicePage(slug, locale);
    const page = ServiceLandingPage({ locale, content });
    const html = renderBody(page);
    const d = SERVICE_DECISION_COPY[locale];
    for (const label of [d.fit, d.deliverables, d.process, d.preparation, d.boundaries]) assert.ok(html.includes(escaped(label)));
    const inputs = content.schemaKind === "Course" ? d.courseInputs : d.inputs;
    for (const text of [...inputs, ...content.deliverables, ...content.proofPoints, ...(content.modules ?? [])]) assert.ok(html.includes(escaped(text)));
    for (const plan of content.pricing?.plans ?? []) {
      for (const text of [plan.name, plan.price, ...plan.features, ...(plan.method ?? []), ...(plan.effects ?? [])]) assert.ok(html.includes(escaped(text)));
      assert.ok(html.indexOf(escaped(d.preparation)) < html.indexOf("<article"), "preparation precedes the plan-detail section");
    }
    for (const faq of content.faqs) assert.ok(html.includes(escaped(faq.answer)));
    assert.doesNotMatch(html, /<details|rounded-2xl|shadow-sm/);
  }
});

test("Snapshot preserves commerce contract text and gated checkout in both states", async () => {
  const testEnv = {
    PAYMENTS_ENABLED: "true", PAYMENT_TERMS_APPROVED: PURCHASE_POLICY_VERSION, STRIPE_MODE: "test",
    STRIPE_PRICE_SNAPSHOT: "price_test_snapshot", STRIPE_SECRET_KEY: "test-placeholder",
    DATABASE_URL: "postgresql://test.invalid/test", INTAKE_TOKEN_SECRET: "test-placeholder",
  };
  const saved = Object.fromEntries(Object.keys(testEnv).map(key => [key, process.env[key]]));
  try {
    for (const enabled of [false, true]) {
      Object.assign(process.env, testEnv, { PAYMENTS_ENABLED: String(enabled) });
      for (const locale of locales) {
        const c = commerceCopy(locale);
        const html = renderBody(await SnapshotPage({ params: Promise.resolve({ locale }) }));
        assert.equal(/<form\b/.test(html), enabled);
        for (const text of [c.excludes, c.schedule, c.corrections, c.upgrade, ...c.deliverables]) assert.ok(visible(html).includes(escaped(text)));
        assert.ok(html.includes(`/${locale}/purchase-terms`));
        assert.ok(html.includes(`/${locale}/case-studies#agilizing-training-materials`));
        assertFaqParity(html);
      }
    }
  } finally {
    for (const [key, value] of Object.entries(saved)) {
      if (value === undefined) delete process.env[key]; else process.env[key] = value;
    }
  }
});

test("SmartSales retains all scopes, prices, acceptance and illustrative-case limits", async () => {
  for (const locale of locales) {
    const c = smartSalesScope(locale);
    const html = renderBody(await SmartSalesPage({ params: Promise.resolve({ locale }) }));
    for (const text of [c.boundary, c.pilot.summary, ...c.pilot.items, c.careBody, c.careExcludes, c.casesNote, ...c.acceptance]) assert.ok(visible(html).includes(escaped(text)));
    for (const tier of c.setup) for (const text of [formatHkd(tier.amount, locale), tier.summary, ...tier.items]) assert.ok(html.includes(escaped(text)));
    for (const example of c.cases) for (const text of Object.values(example)) assert.ok(html.includes(escaped(text)));
    for (const care of c.care) assert.ok(html.includes(formatHkd(care.amount, locale)));
    assert.ok(html.includes(`/${locale}/case-studies#zomate-class-membership-whatsapp`));
    assert.doesNotMatch(html, /<details\b/);
    assertFaqParity(html);
  }
});

test("AI visibility renders technical limits, sources and exact FAQs without changing prices", async () => {
  for (const locale of locales) {
    const html = renderBody(await VisibilityPage({ params: Promise.resolve({ locale }) }));
    const c = AI_VISIBILITY_TECHNICAL_COPY[locale];
    for (const text of [c.answer, c.measurementAnswer, c.inputs]) assert.ok(visible(html).includes(escaped(text)));
    for (const url of ["https://developers.google.com/search/docs/appearance/ai-features", "https://developers.google.com/search/updates"]) assert.ok(html.includes(`href="${url}"`));
    for (const price of ["HKD 2,800", "HKD 1,800", "HKD 3,800", "HKD 12,000", "20%"]) assert.ok(html.includes(price));
    assertFaqParity(html);
  }
  assert.match(AI_VISIBILITY_TECHNICAL_COPY.en.answer, /May 7, 2026/);
  assert.match(AI_VISIBILITY_TECHNICAL_COPY.en.answer, /HowTo rich results ended in 2023/);
  assert.match(AI_VISIBILITY_TECHNICAL_COPY.en.measurementAnswer, /not market share/);
  assert.match(AI_VISIBILITY_TECHNICAL_COPY.en.measurementAnswer, /not a dedicated AI performance report/);
});

test("the shared shell owns the only page heading and pages remain server-rendered", () => {
  assert.equal((source("src/components/SitePageShell.tsx").match(/<h1\b/g) ?? []).length, 1);
  for (const file of ["src/app/[locale]/ai-consulting/page.tsx", "src/app/[locale]/ai-seo-update-package/page.tsx", "src/app/[locale]/services/snapshot/page.tsx", "src/app/[locale]/smartsales-crm/page.tsx", "src/features/marketing/ServiceLandingPage.tsx"]) {
    const text = source(file);
    assert.doesNotMatch(text, /["']use client["']|<h1\b|<Header\b/);
    assert.match(text, /<SitePageShell\b/);
  }
});
