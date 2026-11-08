import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const base = process.env.VERIFY_BASE || "http://127.0.0.1:3100";
assert.ok(["127.0.0.1", "localhost"].includes(new URL(base).hostname), "Use a local server only");
const output = "tmp/website-refresh";
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: "chrome" });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: "reduce" });
const errors = [];
const writes = [];
let bookingMode = "failure";
await context.addInitScript(() => { window.__events = []; window.gtag = (...args) => window.__events.push(args); });
await context.route("**/*", async route => {
  const request = route.request();
  const url = new URL(request.url());
  if (url.origin !== new URL(base).origin) return route.fulfill({ status: 200, body: "" });
  if (url.pathname === "/api/calendar/slots") {
    const date = url.searchParams.get("date");
    return route.fulfill({ json: { slots: [{ start: `${date}T02:00:00.000Z`, end: `${date}T02:30:00.000Z`, display: "10:00–10:30 (test)" }] } });
  }
  if (request.method() !== "GET" && request.method() !== "HEAD") {
    writes.push({ path: url.pathname, data: request.postDataJSON() });
    if (url.pathname === "/api/calendar/book") return route.fulfill(bookingMode === "failure" ? { status: 409, json: { error: "Test slot unavailable" } } : { json: { saved: true, emailSuccess: true } });
    return route.fulfill({ status: 503, json: { error: "Writes disabled during verification" } });
  }
  return route.continue();
});
const page = await context.newPage();
page.on("pageerror", error => errors.push(error.message));
async function visit(path) {
  const response = await page.goto(`${base}${path}`, { waitUntil: "networkidle", timeout: 120000 });
  assert.equal(response.status(), 200, path);
  await page.locator("h1").first().waitFor();
  assert.equal(await page.locator("h1").count(), 1, `one H1: ${path}`);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
  assert.equal(overflow, false, `no overflow: ${path}`);
  const schema = await page.locator('script[type="application/ld+json"]').allTextContents();
  for (const value of schema) JSON.parse(value);
  assert.ok(schema.length, `schema: ${path}`);
  console.log("PASS", path);
}
try {
  if (!process.argv.includes("--booking-only") && !process.argv.includes("--insights-only")) {
  for (const locale of ["zh-hk", "en", "zh-tw", "ja", "de"]) {
    await visit(`/${locale}`);
    assert.equal(await page.locator('header nav[aria-label="Main navigation"] a').count(), 6);
    await page.screenshot({ path: `${output}/home-${locale}-desktop.png` });
    await page.setViewportSize({ width: 375, height: 812 });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, `${locale} mobile overflow`);
    await page.getByRole("button", { name: "Toggle navigation menu", exact: true }).click();
    assert.equal(await page.locator("#mobile-site-nav a").count(), 7);
    await page.keyboard.press("Escape");
    await page.locator("#mobile-site-nav").waitFor({ state: "detached" });
    await page.screenshot({ path: `${output}/home-${locale}-mobile.png` });
    await page.setViewportSize({ width: 1440, height: 1000 });
  }
  await page.setViewportSize({ width: 667, height: 375 });
  await page.getByRole("button", { name: "Toggle navigation menu", exact: true }).click();
  const menu = page.locator("#mobile-site-nav");
  assert.ok(await menu.evaluate(el => el.scrollHeight > el.clientHeight));
  await menu.locator('a[data-cta="book-diagnosis"]').scrollIntoViewIfNeeded();
  const ctaBox = await menu.locator('a[data-cta="book-diagnosis"]').boundingBox();
  assert.ok(ctaBox.y + ctaBox.height <= 375, "Mobile booking link is reachable in landscape");
  await page.keyboard.press("Escape");
  await page.setViewportSize({ width: 1440, height: 1000 });
  for (const path of ["/en/services", "/en/products", "/en/about", "/en/case-studies", "/en/ai-consulting", "/en/services/snapshot", "/en/smartsales-crm", "/en/ai-training", "/en/ai-coaching", "/en/ai-seo-update-package", "/en/eventxp", "/en/fitnessxp", "/en/blog"]) await visit(path);
  await visit("/en/products");
  const disclosure = page.locator("details").first();
  await disclosure.locator("summary").focus();
  await page.keyboard.press("Enter");
  assert.equal(await disclosure.getAttribute("open"), "");
  await page.keyboard.press("Enter");
  assert.equal(await disclosure.getAttribute("open"), null);
  await visit("/en/case-studies");
  assert.equal(await page.locator("article[id]").count(), 3);
  await page.screenshot({ path: `${output}/cases-desktop.png` });
  await page.getByRole("button", { name: "Toggle theme", exact: true }).click();
  await page.waitForFunction(() => document.documentElement.classList.contains("dark"));
  for (const path of ["/en/case-studies", "/en/services", "/en"]) {
    await visit(path);
    assert.equal(await page.locator("h1").evaluate(el => getComputedStyle(el).color), "rgb(37, 31, 25)");
    await page.screenshot({ path: `${output}/dark-${path.split("/").at(-1)}.png` });
  }
  await page.getByRole("button", { name: "Toggle theme", exact: true }).click();
  await page.waitForFunction(() => !document.documentElement.classList.contains("dark"));
  await visit("/en/services");
  const readiness = page.locator("section").filter({ has: page.getByRole("heading", { name: "What should you prepare before changing a workflow?", exact: true }) }).last();
  const submit = readiness.getByRole("button", { name: "Show next step", exact: true });
  await submit.click();
  await readiness.getByRole("alert").waitFor();
  for (const field of await readiness.locator("fieldset").all()) await field.locator('input[value="unsure"]').check();
  await submit.click();
  await readiness.getByRole("heading", { name: "Clarify the workflow first", exact: true }).waitFor();
  for (const field of await readiness.locator("fieldset").all()) await field.locator('input[value="ready"]').check();
  assert.equal(await readiness.locator('h3[id$="result-title"]').count(), 0);
  await submit.click();
  await readiness.getByRole("heading", { name: "Scope a small pilot — then verify the evidence", exact: true }).waitFor();
  await readiness.locator("fieldset").nth(1).locator('input[value="partial"]').check();
  await submit.click();
  await readiness.getByRole("heading", { name: "Prepare the data before a pilot", exact: true }).waitFor();
  await readiness.screenshot({ path: `${output}/readiness-result.png` });
  await readiness.getByRole("button", { name: "Reset answers", exact: true }).click();
  assert.equal(await readiness.locator("input:checked").count(), 0);
  assert.equal(writes.length, 0, "Self-check does not submit anything");
  }
  if (!process.argv.includes("--booking-only")) {
    for (const locale of (process.env.VERIFY_LOCALE ? [process.env.VERIFY_LOCALE] : ["en", "zh-hk", "zh-tw", "ja", "de"])) {
      await page.setViewportSize({ width: 375, height: 812 });
      await visit(`/${locale}/blog`);
      assert.equal(await page.locator('section[id][aria-labelledby]').count(), 6);
      const links = await page.locator('li').filter({ has: page.locator('time[datetime="2026-11-09"]') }).locator('a').evaluateAll(nodes => nodes.map(node => node.getAttribute('href')));
      assert.equal(new Set(links).size, 8);
      for (const link of links) {
        await visit(link);
        assert.equal(await page.locator('#key-takeaways + ul li').count(), 3);
        assert.equal(await page.locator('a[rel="author"]').getAttribute('href'), `/${locale}/about`);
        assert.equal(await page.locator('article time').first().getAttribute('datetime'), '2026-11-09');
        const headline = await page.locator('h1').innerText();
        const schema = await page.locator('script[type="application/ld+json"]').allTextContents();
        assert.ok(schema.map(value => JSON.parse(value)).some(value => value['@type'] === 'Article' && value.headline === headline));
      }
      await page.screenshot({ path: `${output}/article-${locale}-mobile.png` });
    }
    await visit('/en/bookme');
    await page.getByRole('button', { name: 'Toggle theme', exact: true }).click();
    await page.waitForFunction(() => document.documentElement.classList.contains('dark') && getComputedStyle(document.querySelector('[data-geo-answer]')).color === 'rgb(180, 196, 214)');
    assert.equal(await page.locator('.atelier-booking').evaluate(el => getComputedStyle(el).backgroundColor), 'rgb(9, 22, 35)');
    await page.screenshot({ path: `${output}/booking-dark-mobile.png` });
    await page.getByRole('button', { name: 'Toggle theme', exact: true }).click();
    await page.waitForFunction(() => !document.documentElement.classList.contains('dark'));
    console.log('PASS localized mobile articles, categories, dates, authors and booking dark theme');
  }
  if (!process.argv.includes("--insights-only")) {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await visit("/en/bookme");
  await page.evaluate(() => { window.__events = []; window.gtag = (...args) => window.__events.push(args); });
  await page.getByRole("button", { name: "Already completed the form? Pick a time →", exact: true }).click();
  await page.locator(".rdp-day_button:not([disabled])").first().click();
  await page.getByRole("button", { name: "10:00–10:30 (test)", exact: true }).click();
  const next = page.locator("#quotation-wizard button").filter({ hasText: /contact|details|continue/i }).last();
  await next.click();
  await page.locator('input[autocomplete="name"]').fill("Local test");
  await page.locator('input[autocomplete="email"]').fill("test@example.test");
  await page.locator('input[autocomplete="tel-national"]').fill("55555555");
  await page.locator('input[autocomplete="organization"]').fill("Local browser test");
  const book = page.locator("#quotation-wizard .btn-brand").last();
  await book.click();
  await page.getByRole("alert").filter({ hasText: "Test slot unavailable" }).waitFor();
  assert.equal(await page.evaluate(() => window.__events.filter(event => event[1] === "booking_confirmed").length), 0);
  bookingMode = "success";
  await book.click();
  await page.locator('#quotation-wizard [role="status"]').waitFor();
  assert.equal(await page.evaluate(() => window.__events.filter(event => event[1] === "booking_confirmed").length), 1);
  assert.equal(await book.isDisabled(), true);
  assert.equal(writes.length, 2);
  assert.ok(writes.every(write => write.path === "/api/calendar/book"));
  assert.equal(writes[1].data.visitorEmail, "test@example.test");
  await page.screenshot({ path: `${output}/booking-confirmed.png` });
  console.log("PASS mocked booking failure/success, visible confirmation and single conversion event");
  }
  assert.deepEqual(errors, [], "No browser runtime errors");
} finally {
  await browser.close();
}
