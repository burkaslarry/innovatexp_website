import { test } from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { slotsForDay, validBookingSlot, slotLabel } from "@/lib/booking-slots";
import { validateQuestionnaire } from "@/lib/questionnaire-validation";
import { getConsultationCopy } from "@/content/questionnaires/consultation";

test("Hong Kong slots have consistent UTC instants and reject forged durations and dates", () => {
  const slot = slotsForDay("2026-10-14")[0];
  assert.equal(slot.start, "2026-10-14T02:00:00.000Z");
  const now = Date.parse("2026-10-13T00:00:00Z");
  assert.equal(validBookingSlot("2026-10-14", slot.start, slot.end, now), true);
  assert.equal(validBookingSlot("2026-10-14", slot.start, "2026-10-14T05:00:00Z", now), false);
  assert.equal(validBookingSlot("2026-10-15", slot.start, slot.end, now), false);
  assert.equal(validBookingSlot("2026-10-14", slot.start, slot.end, now + 3 * 86400_000), false);
  assert.equal(slotsForDay("2026-02-30").length, 0);
  assert.match(slotLabel(slot.start, slot.end, "Europe/Berlin"), /04:00/);
});

test("consultation distinguishes 31–60 and larger/unknown teams in every locale", () => {
  for (const locale of ["en", "zh-hk", "zh-tw", "ja", "de"] as const) {
    const c = getConsultationCopy(locale);
    assert.deepEqual(c.questions.find((q) => q.id === "teamSize")?.options?.map((o) => o.id), ["1-2", "3-10", "11-30", "31-60", "61+", "unknown"]);
    for (const field of ["country", "timezone"]) assert.ok(c.steps.some((s) => s.questionIds.includes(field)));
  }
});

test("server rejects invalid question options, missing consent, missing evidence and oversized answers", () => {
  const answers: Record<string, string | string[]> = {};
  for (const q of getConsultationCopy("en").questions) {
    if (q.required && !q.showWhen) answers[q.id] = q.options ? q.type === "multi" ? [q.options[0].id] : q.options[0].id : "Example";
  }
  answers.timezone = "Asia/Singapore"; answers.country = "Singapore";
  const form = { pathId: "ai-consultation-questionnaire", locale: "en", submissionId: randomUUID(), consent: true, answers };
  assert.equal(validateQuestionnaire(form), null);
  assert.notEqual(validateQuestionnaire({ ...form, consent: false }), null);
  assert.notEqual(validateQuestionnaire({ ...form, answers: { ...answers, role: "invented" } }), null);
  assert.notEqual(validateQuestionnaire({ ...form, answers: { ...answers, timezone: "wrong-zone" } }), null);
  assert.notEqual(validateQuestionnaire({ ...form, answers: { ...answers, company: "" } }), null);
  assert.notEqual(validateQuestionnaire({ ...form, answers: { ...answers, notes: "x".repeat(4001) } }), null);
});
