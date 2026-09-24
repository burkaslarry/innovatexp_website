import { strict as assert } from "node:assert";
import { validateEventXpScopingPayload } from "../src/lib/eventxp-scoping/validate";
import { buildInternalMessage } from "../src/lib/eventxp-scoping/whatsapp-adapter";
import type { EventXpScopingPayload } from "../src/lib/eventxp-scoping/types";

let passed = 0;
function test(name: string, fn: () => void) {
  fn();
  passed++;
  console.log("ok -", name);
}

const validBase: EventXpScopingPayload = {
  organisationName: "測試商會",
  contactName: "陳大文",
  role: "秘書",
  email: "test@example.com",
  phone: "85291234567",
  orgType: "chamber",
  memberCount: "100to500",
  eventsPerYear: "12to36",
  typicalAttendance: "50to200",
  maxAttendance: "200to500",
  recurring: "recurring",
  locations: "1",
  registrationMethod: "excel",
  checkInMethod: "manual",
  currentTools: ["excel", "whatsapp"],
  biggestProblem: "合併 Excel 出報告好慢",
  adminHoursPerEvent: "2to5",
  capabilities: ["memberMgmt", "kioskQrCheckIn", "attendanceReport"],
  launchDate: "1to3m",
  budgetRange: "20kto50k",
  commercialPreference: "managed",
  privacyHosting: "cloud",
  supportHours: "eventday",
  decisionMaker: "秘書 + 主席",
  privacyAccepted: true,
  contactPermission: true,
  marketingConsent: false,
  locale: "zh-hk",
  consentVersion: "eventxp-scoping-v1",
  website: "",
};

test("valid payload passes", () => {
  const r = validateEventXpScopingPayload(validBase);
  assert.equal(r.ok, true, JSON.stringify(r.errors));
  assert.equal(r.clean.organisationName, "測試商會");
});

test("missing required fields fail", () => {
  const bad = { ...validBase, organisationName: "", email: "", privacyAccepted: false };
  const r = validateEventXpScopingPayload(bad);
  assert.equal(r.ok, false);
  assert.ok(r.errors.organisationName);
  assert.ok(r.errors.email);
  assert.ok(r.errors.privacyAccepted);
});

test("invalid email and phone fail", () => {
  const r = validateEventXpScopingPayload({ ...validBase, email: "not-an-email", phone: "abc" });
  assert.equal(r.ok, false);
  assert.equal(r.errors.email, "invalid");
  assert.equal(r.errors.phone, "invalid");
});

test("honeypot tripped → silently flagged", () => {
  const r = validateEventXpScopingPayload({ ...validBase, website: "spam.com" });
  assert.equal(r.ok, false);
  assert.equal(r.errors.website, "spam");
});

test("invalid enum value rejected", () => {
  const r = validateEventXpScopingPayload({ ...validBase, orgType: "supersecret", budgetRange: "lots" });
  assert.equal(r.ok, false);
  assert.equal(r.errors.orgType, "invalid");
  assert.equal(r.errors.budgetRange, "invalid");
});

test("unknown capabilities filtered out", () => {
  const r = validateEventXpScopingPayload({
    ...validBase,
    capabilities: ["memberMgmt", "flyingCars", "aiMatchingSeating"] as any,
  });
  assert.equal(r.ok, true);
  assert.deepEqual(r.clean.capabilities, ["memberMgmt", "aiMatchingSeating"]);
});

test("long inputs truncated", () => {
  const r = validateEventXpScopingPayload({ ...validBase, biggestProblem: "x".repeat(2000) });
  assert.equal(r.ok, true);
  assert.equal((r.clean.biggestProblem as string).length, 1000);
});

test("internal WhatsApp message excludes email and phone", () => {
  const msg = buildInternalMessage(validBase, "lead-12345678");
  assert.ok(msg.includes("測試商會"));
  assert.ok(msg.includes("lead-12345678"));
  assert.ok(!msg.includes("test@example.com"), "email must not appear in WA message");
  assert.ok(!msg.includes("85291234567"), "phone must not appear in WA message");
  assert.ok(msg.includes("Lead ID"));
});

console.log(`\nAll ${passed} tests passed.`);
