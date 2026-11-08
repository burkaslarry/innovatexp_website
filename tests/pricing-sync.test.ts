import { test } from "node:test";
import assert from "node:assert/strict";
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { PRICING } from "@/content/pricing";
import { OFFERS, type OfferId } from "@/content/commerce";
import { CART_OFFERS } from "@/content/commerce-cart";
import { getInquiryCatalogItem, type InquiryCatalogItemId } from "@/content/inquiry-catalog";

const listed = new Set<number>();
const collect = (value: unknown) => {
  if (typeof value === "number") listed.add(value);
  else if (value && typeof value === "object") Object.values(value).forEach(collect);
};
collect(PRICING);

/* Amounts on the site that are not prices: budget brackets, market comparisons. */
const NOT_PRICES: Record<string, number[]> = {
  "src/content/automation-packages.ts": [7, 6_800],
  "src/components/pages/EventXpScopingForm.tsx": [20_000, 50_000, 150_000],
  "src/content/smartsales-scope.ts": [100_000],
  "src/app/LanguageContext.tsx": [50_000],
};

function amounts(text: string): number[] {
  return [...text.matchAll(/(?:HK\$|HKD)\s?\$?(\d[\d,.]*\d|\d)(k)?/g)].map((m) => {
    const n = Number(m[1].replace(/[,.](?=\d{3}\b)/g, "").replace(/,/g, ""));
    return m[2] ? n * 1000 : n;
  });
}

test("every price shown on the website is listed in pricing.ts", () => {
  const files = execSync("git ls-files src", { encoding: "utf8" }).trim().split("\n")
    .filter((f) => /\.(tsx?|jsx?|json)$/.test(f) && !/\.(bak|backup)$/.test(f));
  const missing: string[] = [];
  for (const file of files) {
    for (const n of amounts(readFileSync(file, "utf8"))) {
      if (!listed.has(n) && !NOT_PRICES[file]?.includes(n)) missing.push(`${file}: HK$${n}`);
    }
  }
  assert.deepEqual([...new Set(missing)], []);
});

test("every Stripe offer charges the website package price", () => {
  for (const [id, offer] of Object.entries(CART_OFFERS) as [InquiryCatalogItemId, OfferId][]) {
    const item = getInquiryCatalogItem(id);
    assert.ok(item && !item.hidePublicPrice, id);
    assert.equal(OFFERS[offer].amount, item.amountHkd * 100, id);
    assert.equal(OFFERS[offer].mode === "subscription", id.startsWith("systemCare"), id);
  }
  assert.equal(OFFERS.discovery11To30.amount, PRICING.consultancy.discoveryWorkshop11To30 * 100);
  const sold = new Set<string>(Object.values(CART_OFFERS));
  for (const offer of Object.keys(OFFERS)) assert.ok(sold.has(offer) || offer === "discovery11To30", offer);
});
