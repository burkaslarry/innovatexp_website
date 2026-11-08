import { test } from "node:test";
import assert from "node:assert/strict";
import { LOCALES } from "@/lib/i18n-routing";
import { getMainNavigation } from "@/content/homepage";
import { getSiteExperience } from "@/content/site-experience";
import { getBookingHref, getWhatsAppHref, primaryCtaLabel, secondaryWhatsAppLabel } from "@/content/cta-config";

test("main navigation preserves the six public destinations in every locale", () => {
  for (const locale of LOCALES) {
    const nav = getMainNavigation(locale);
    assert.deepEqual(nav.map(item => item.href), ["", "/services", "/products", "/case-studies", "/blog", "/about"].map(path => `/${locale}${path}`));
    assert.ok(nav.every(item => item.label.trim()));
  }
});

test("booking stays same-origin and WhatsApp contact stays behind the proxy", () => {
  for (const locale of LOCALES) {
    assert.equal(getBookingHref(locale), `/${locale}/bookme`);
    assert.match(primaryCtaLabel(locale), /30/);
    assert.match(secondaryWhatsAppLabel(locale), /WhatsApp/);
    assert.match(getWhatsAppHref(locale), /^\/api\/whatsapp\?/);
    assert.doesNotMatch(getWhatsAppHref(locale), /wa\.me|phone=/);
  }
});

test("each locale exposes complete workflow, service and booking content", () => {
  for (const locale of LOCALES) {
    const c = getSiteExperience(locale);
    assert.equal(c.serviceChoices.length, 4);
    assert.equal(c.steps.length, 3);
    assert.equal(c.solutions.length, 3);
    assert.equal(c.bookingNotes.length, 3);
    assert.match(c.introduction, /3[–〜]30/);
    assert.match(c.aboutIntro, /14/);
    assert.ok(c.steps.every(step => step.input && step.output && step.decision));
    assert.ok(c.solutions.every(solution => solution.boundary && solution.href.startsWith("/")));
    assert.match(c.bookingNotes[0], /30/);
    assert.match(c.bookingNotes[0], /Snapshot/);
  }
});
