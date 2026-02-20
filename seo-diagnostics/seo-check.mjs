#!/usr/bin/env node

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

const USER_AGENTS = {
  chromeDesktop:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  googlebotSmartphone:
    "Mozilla/5.0 (Linux; Android 12; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
};

const TARGETS = [
  { path: "/", expectedSnippet: "InnovateXP Limited" },
  { path: "/smartsales-crm", expectedSnippet: "SmartSales CRM" },
  { path: "/eventxp", expectedSnippet: "EventXP" },
  { path: "/ai-consulting", expectedSnippet: "AI Consulting" },
];

function hasH1(html) {
  return /<h1(?:\s|>)/i.test(html);
}

function hasTitle(html) {
  return /<title>[\s\S]*?<\/title>/i.test(html);
}

function extractCanonicalHref(html) {
  const match = html.match(/<link[^>]*rel=["']canonical["'][^>]*>/i);
  if (!match) return null;
  const tag = match[0];
  const hrefMatch = tag.match(/href=["']([^"']+)["']/i);
  return hrefMatch ? hrefMatch[1] : null;
}

function normalizeUrl(input) {
  const url = new URL(input);
  const normalizedPath =
    url.pathname !== "/" && url.pathname.endsWith("/") ? url.pathname.slice(0, -1) : url.pathname;
  return `${url.origin}${normalizedPath}`;
}

async function fetchHtml(url, userAgent) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "user-agent": userAgent,
      accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    },
    redirect: "follow",
    signal: AbortSignal.timeout(15000),
  });

  const contentType = response.headers.get("content-type") || "";
  const html = await response.text();

  return {
    status: response.status,
    contentType,
    html,
    htmlLength: html.length,
  };
}

function evaluateResult(result, expectedSnippet, expectedCanonical) {
  const canonicalHref = extractCanonicalHref(result.html);
  const canonicalOk = canonicalHref
    ? normalizeUrl(canonicalHref) === normalizeUrl(expectedCanonical)
    : false;

  const checks = {
    statusOk: result.status >= 200 && result.status < 400,
    contentTypeOk: result.contentType.toLowerCase().includes("text/html"),
    hasH1: hasH1(result.html),
    hasTitle: hasTitle(result.html),
    hasExpectedSnippet: result.html.includes(expectedSnippet),
    canonicalOk,
  };

  const pass = Object.values(checks).every(Boolean);
  return { pass, checks, canonicalHref };
}

function printResult({ url, uaLabel, result, checks, pass, expectedSnippet, expectedCanonical, canonicalHref }) {
  const mark = pass ? "PASS" : "FAIL";
  console.log(`\n[${mark}] ${url} (${uaLabel})`);
  console.log(`  - status code: ${result.status}`);
  console.log(`  - content-type: ${result.contentType || "(missing)"}`);
  console.log(`  - HTML length: ${result.htmlLength}`);
  console.log(`  - has <h1>: ${checks.hasH1 ? "yes" : "no"}${checks.hasH1 ? "" : "  <-- fail"}`);
  console.log(`  - has <title>: ${checks.hasTitle ? "yes" : "no"}${checks.hasTitle ? "" : "  <-- fail"}`);
  console.log(
    `  - contains expectedSnippet "${expectedSnippet}": ${checks.hasExpectedSnippet ? "yes" : "no"}${
      checks.hasExpectedSnippet ? "" : "  <-- fail"
    }`
  );
  console.log(
    `  - canonical matches "${expectedCanonical}": ${checks.canonicalOk ? "yes" : "no"}${
      checks.canonicalOk ? "" : `  <-- fail (found: ${canonicalHref || "missing"})`
    }`
  );
  if (!checks.statusOk) {
    console.log("  - status check: fail");
  }
  if (!checks.contentTypeOk) {
    console.log("  - content-type check: fail");
  }
}

async function run() {
  console.log(`SEO check base URL: ${BASE_URL}`);

  let hasFailures = false;

  for (const target of TARGETS) {
    const url = new URL(target.path, BASE_URL).toString();
    const expectedCanonical = new URL(target.path, BASE_URL).toString();

    for (const [uaLabel, userAgent] of Object.entries(USER_AGENTS)) {
      try {
        const result = await fetchHtml(url, userAgent);
        const { pass, checks, canonicalHref } = evaluateResult(
          result,
          target.expectedSnippet,
          expectedCanonical
        );
        printResult({
          url,
          uaLabel,
          result,
          checks,
          pass,
          expectedSnippet: target.expectedSnippet,
          expectedCanonical,
          canonicalHref,
        });
        if (!pass) hasFailures = true;
      } catch (error) {
        hasFailures = true;
        console.log(`\n[FAIL] ${url} (${uaLabel})`);
        console.log(`  - error: ${error instanceof Error ? error.message : String(error)}`);
      }
    }
  }

  if (hasFailures) {
    console.log("\nseo:check finished with failures.");
    process.exit(1);
  }

  console.log("\nseo:check passed.");
}

run();
