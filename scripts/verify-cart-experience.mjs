import assert from "node:assert/strict";
import { chromium } from "playwright";

const base = process.env.VERIFY_BASE || "http://127.0.0.1:3100";
if (!["127.0.0.1", "localhost"].includes(new URL(base).hostname)) throw new Error("Localhost only");
const browser = await chromium.launch({ channel: "chrome", headless: true });
const errors = [];
let available = false;
let checkoutResult = "failure";
let payment = "pending";
let statusRequestId = null;
const requests = [];
try {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
  await context.route("**/*", async (route) => {
    const request = route.request();
    const url = new URL(request.url());
    if (url.hostname === "checkout.stripe.com") return route.fulfill({ contentType: "text/html", body: "<h1>Simulated Stripe redirect target — no payment</h1>" });
    if (url.origin !== new URL(base).origin) return route.abort();
    if (url.pathname === "/api/stripe/cart") {
      if (request.method() === "GET") return route.fulfill({ json: { availableOffers: available ? ["snapshot", "eventXp", "systemCareEssential"] : [] } });
      requests.push(request.postDataJSON());
      return checkoutResult === "failure" ? route.fulfill({ status: 503, json: { error: "Unavailable" } }) : route.fulfill({ json: { url: "https://checkout.stripe.com/c/pay/browser-test" } });
    }
    if (url.pathname === "/api/commerce/cart-status") return route.fulfill({ json: { status: payment, requestId: statusRequestId ?? requests.at(-1)?.requestId, items: [{ offer: "snapshot", status: payment, ...(payment === "paid" ? { intakeUrl: "/api/commerce/access?token=browser-test" } : {}) }] } });
    if (!["GET", "HEAD"].includes(request.method())) return route.abort();
    return route.continue();
  });
  const page = await context.newPage();
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(`${base}/en/services/snapshot`);
  await page.getByRole("button", { name: "Add to cart", exact: true }).click();
  await page.getByText("Online payment is not available yet. You can still request a quote below.").waitFor();
  assert.equal(await page.getByRole("button", { name: /Continue to Stripe/ }).count(), 0);
  console.log("PASS closed payment gate preserves quote path");

  await page.getByRole("button", { name: "Close shopping cart", exact: true }).click();
  available = true;
  await page.getByRole("button", { name: "Shopping cart (1)", exact: true }).click();
  const payButton = page.getByRole("button", { name: /Continue to Stripe/ });
  await payButton.waitFor();
  assert.match(await payButton.innerText(), /3,880/);
  await page.getByRole("button", { name: "+", exact: true }).click();
  await page.getByText("Each agreed service is purchased once per checkout. Set its quantity to 1 to include it.").waitFor();
  assert.equal(await payButton.isDisabled(), true);
  await page.getByRole("button", { name: "−", exact: true }).click();
  assert.equal(await payButton.isDisabled(), false);
  console.log("PASS canonical price and fixed purchase quantity");

  await page.getByRole("button", { name: "Close shopping cart", exact: true }).click();
  await page.goto(`${base}/en/products`);
  const eventDetails = page.locator("details").filter({ has: page.locator("summary", { hasText: "EventXP" }) });
  await eventDetails.locator("summary").click();
  await eventDetails.getByRole("button", { name: "Add to cart", exact: true }).click();
  await page.getByText("Other items stay in your cart and are not charged.").waitFor();
  await payButton.click();
  assert.equal(requests.length, 0);
  await page.getByLabel("Receipt and agreed-service email").fill("cart-buyer@example.test");
  await page.getByRole("checkbox", { name: "I accept the purchase, cancellation and refund terms and privacy policy." }).check();
  await payButton.click();
  await page.getByText("Could not start payment. Check your invitation and email, then retry or contact us.").waitFor();
  assert.equal(requests.length, 1);
  await page.screenshot({ path: "tmp/website-refresh/cart-payment-retry.png" });
  assert.deepEqual(requests[0].items, [{ id: "aiReadinessAssessment", qty: 1 }]);
  assert.equal("amount" in requests[0], false);
  assert.equal(requests[0].acceptTerms, true);
  assert.equal(requests[0].locale, "en");
  assert.equal((await page.evaluate(() => JSON.parse(localStorage.getItem("innovatexp-inquiry-cart-v1")))).length, 2);
  const retryState = await page.evaluate(() => JSON.parse(sessionStorage.getItem("ixp-checkout-retry-v1")));
  assert.deepEqual(Object.keys(retryState).sort(), ["fingerprint", "id"]);
  assert.match(retryState.fingerprint, /^[a-f0-9]{64}$/);
  await page.reload();
  await page.getByRole("button", { name: "Shopping cart (2)", exact: true }).click();
  await payButton.waitFor();
  await page.getByLabel("Receipt and agreed-service email").fill("cart-buyer@example.test");
  await page.getByRole("checkbox", { name: "I accept the purchase, cancellation and refund terms and privacy policy." }).check();
  checkoutResult = "success";
  await payButton.click();
  await page.waitForURL("https://checkout.stripe.com/**");
  assert.equal(requests.length, 2);
  assert.equal(requests[0].requestId, requests[1].requestId);
  console.log("PASS failed payment retains cart, retry is stable, unqualified item is excluded");

  await page.goto(`${base}/en/checkout/success?cart=1`);
  await page.getByRole("status").filter({ hasText: "Verifying payment" }).waitFor();
  assert.equal(await page.getByRole("link", { name: "Continue to service intake" }).count(), 0);
  assert.equal((await page.evaluate(() => JSON.parse(localStorage.getItem("innovatexp-inquiry-cart-v1")))).length, 2);
  payment = "paid";
  statusRequestId = "00000000-0000-4000-8000-000000000000";
  await page.getByRole("button", { name: "Check payment again" }).click();
  await page.getByRole("alert").waitFor();
  assert.equal(await page.getByRole("link", { name: "Continue to service intake" }).count(), 0);
  assert.equal((await page.evaluate(() => JSON.parse(localStorage.getItem("innovatexp-inquiry-cart-v1")))).length, 2);
  console.log("PASS a status for a different checkout never clears this cart");
  statusRequestId = null;
  await page.getByRole("button", { name: "Check payment again" }).click();
  await page.getByRole("link", { name: "Continue to service intake" }).waitFor();
  await page.waitForFunction(() => JSON.parse(localStorage.getItem("innovatexp-inquiry-cart-v1")).length === 1);
  assert.equal((await page.evaluate(() => JSON.parse(localStorage.getItem("innovatexp-inquiry-cart-v1"))))[0].id, "eventXpTrial");
  await page.reload();
  await page.getByRole("link", { name: "Continue to service intake" }).waitFor();
  assert.equal((await page.evaluate(() => JSON.parse(localStorage.getItem("innovatexp-inquiry-cart-v1")))).length, 1);
  console.log("PASS no false paid on redirect; verified status removes only paid item once");

  const labels = { en: "Add to cart", "zh-hk": "加入購物車", "zh-tw": "加入購物車", ja: "カートに追加", de: "In den Warenkorb" };
  for (const [locale, label] of Object.entries(labels)) {
    await page.goto(`${base}/${locale}/services/snapshot`);
    await page.evaluate(() => localStorage.setItem("innovatexp-inquiry-cart-v1", JSON.stringify([{ id: "aiReadinessAssessment", title: "Tampered", amountHkd: 1, qty: 1 }, { id: "unknown", qty: 1 }])));
    await page.reload();
    await page.getByRole("button", { name: label, exact: true }).waitFor();
    const headerCart = page.locator("header button").filter({ has: page.locator('svg.lucide-shopping-cart') });
    await headerCart.click();
    await page.getByRole("button", { name: /Stripe/ }).waitFor();
    await page.waitForFunction(() => {
      const paper = document.querySelector(".MuiDrawer-paper")?.getBoundingClientRect();
      return paper && paper.left >= 0 && Math.abs(paper.right - innerWidth) < 1 && !document.getAnimations().some((a) => a.playState === "running");
    });
    await page.waitForTimeout(400);
    const drawer = await page.evaluate(() => { const p = document.querySelector(".MuiDrawer-paper"); const r = p.getBoundingClientRect(); return { left: r.left, right: r.right, scroll: p.scrollWidth, client: p.clientWidth, viewport: innerWidth }; });
    assert.ok(drawer.left >= 0 && drawer.right <= drawer.viewport + 0.5 && drawer.scroll <= drawer.client + 1, `${locale}: drawer overflow ${JSON.stringify(drawer)}`);
    const width = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, viewport: innerWidth }));
    assert.ok(width.scroll <= width.viewport, `${locale}: horizontal overflow`);
    const restored = await page.evaluate(() => JSON.parse(localStorage.getItem("innovatexp-inquiry-cart-v1")));
    assert.equal(restored.length, 1);
    assert.equal(restored[0].amountHkd, 3880);
    await page.screenshot({ path: `tmp/website-refresh/cart-${locale}-mobile.png` });
    console.log(`PASS ${locale} mobile cart, localized controls and restored catalog price`);
    const closeLabels = { en: "Close shopping cart", "zh-hk": "關閉購物車", "zh-tw": "關閉購物車", ja: "カートを閉じる", de: "Warenkorb schließen" };
    await page.getByRole("button", { name: closeLabels[locale], exact: true }).click();
  }
  assert.deepEqual(errors, []);
  console.log("PASS browser cart tests use only simulated Stripe responses; no real charges or messages");
} finally {
  await browser.close();
}
