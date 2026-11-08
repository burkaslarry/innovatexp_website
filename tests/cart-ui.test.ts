import assert from "node:assert/strict";
import { test } from "node:test";
import { normalizeCart } from "@/context/InquiryCartContext";
import { CART_COPY } from "@/content/cart-copy";
import { PRICING } from "@/content/pricing";

test("restored cart reprices from the catalog, discards unsupported entries and drops stored capabilities", () => {
  const result = normalizeCart([
    { id: "aiReadinessAssessment", title: "Fake free service", amountHkd: 1, qty: 1, invitation: "private-token" },
    { id: "not-a-product", amountHkd: 0, qty: 1 },
    { id: "educationTrack", amountHkd: 123, qty: 1 },
  ]);
  assert.equal(result.length, 2);
  assert.equal(result[0].amountHkd, PRICING.quickCash.aiReadinessAssessment);
  assert.notEqual(result[0].title, "Fake free service");
  assert.equal("invitation" in result[0], false);
  assert.equal(result[1].amountHkd, 0);
});

test("restored cart rejects malformed quantities, deduplicates and caps valid integers", () => {
  assert.deepEqual(normalizeCart(null), []);
  assert.deepEqual(normalizeCart({ id: "eventXpTrial", qty: 1 }), []);
  const result = normalizeCart([
    null,
    { id: "eventXpTrial", qty: 100 },
    { id: "eventXpTrial", qty: 2 },
    { id: "aiReadinessAssessment", qty: 1.5 },
    { id: "accountXpExperience", qty: Infinity },
    { id: "systemCareEssential", qty: -1 },
    { id: "systemCareGrowth", qty: "1" },
  ]);
  assert.equal(result.length, 1);
  assert.equal(result[0].qty, 9);
});

test("all five locales include payment, quote, subscription and verification guidance", () => {
  assert.equal(Object.keys(CART_COPY).length, 5);
  for (const copy of Object.values(CART_COPY)) {
    for (const value of Object.values(copy)) assert.ok(value.trim());
    assert.notEqual(copy.paid, copy.pending);
    assert.notEqual(copy.oneTime, copy.monthly);
    assert.notEqual(copy.pay, copy.quote);
  }
});
