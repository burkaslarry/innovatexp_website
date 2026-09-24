import { CONSENT_VERSION, type EventXpScopingPayload } from "./types";

export type ValidationResult = {
  ok: boolean;
  errors: Record<string, string>;
  clean: Partial<EventXpScopingPayload>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9+\-\s()]{6,20}$/;

const ENUMS = {
  orgType: ["chamber", "association", "training", "community", "corporate", "bni", "other"],
  memberCount: ["under100", "100to500", "500to2000", "over2000"],
  eventsPerYear: ["under12", "12to36", "36to100", "over100"],
  attendance: ["under50", "50to200", "200to500", "over500"],
  locations: ["1", "2to5", "over5"],
  recurring: ["recurring", "oneoff", "mixed"],
  registrationMethod: ["paper", "googleform", "excel", "whatsapp", "crm", "other"],
  checkInMethod: ["manual", "qr", "kiosk", "none"],
  currentTool: ["excel", "googleform", "whatsapp", "crm", "membership", "none"],
  adminHours: ["under2", "2to5", "5to10", "over10"],
  launchDate: ["asap", "1to3m", "3to6m", "over6m", "exploring"],
  budgetRange: ["under20k", "20kto50k", "50kto150k", "over150k", "open"],
  commercialPreference: ["managed", "licence", "sourcecode", "undecided"],
  privacyHosting: ["cloud", "private", "onprem", "undecided"],
  supportHours: ["office", "extended", "eventday", "none"],
} as const;

const ALL_CAPS = [
  "memberMgmt", "guestMgmt", "kioskQrCheckIn", "attendanceReport", "rosterImport",
  "whatsappComms", "membershipScoring", "aiMatchingSeating", "customBranding",
  "integrations", "onsiteSupport",
];

function inEnum(value: string, list: readonly string[]): boolean {
  return (list as readonly string[]).includes(value);
}

function cleanStr(v: unknown, max: number): string {
  if (typeof v !== "string") return "";
  return v.trim().slice(0, max);
}

export function validateEventXpScopingPayload(input: unknown): ValidationResult {
  const errors: Record<string, string> = {};
  const body = (input ?? {}) as Record<string, unknown>;
  const clean: Partial<EventXpScopingPayload> = {};

  // Honeypot
  const website = cleanStr(body.website, 200);
  if (website !== "") {
    errors.website = "spam";
    return { ok: false, errors, clean };
  }

  // Stage 1
  const organisationName = cleanStr(body.organisationName, 120);
  if (!organisationName) errors.organisationName = "required";
  clean.organisationName = organisationName;

  const contactName = cleanStr(body.contactName, 80);
  if (!contactName) errors.contactName = "required";
  clean.contactName = contactName;

  clean.role = cleanStr(body.role, 80);

  const email = cleanStr(body.email, 120);
  if (!email) errors.email = "required";
  else if (!EMAIL_RE.test(email)) errors.email = "invalid";
  clean.email = email;

  const phone = cleanStr(body.phone, 20);
  if (!phone) errors.phone = "required";
  else if (!PHONE_RE.test(phone)) errors.phone = "invalid";
  clean.phone = phone;

  const orgType = cleanStr(body.orgType, 20);
  if (!orgType) errors.orgType = "required";
  else if (!inEnum(orgType, ENUMS.orgType)) errors.orgType = "invalid";
  else clean.orgType = orgType as EventXpScopingPayload["orgType"];

  const memberCount = cleanStr(body.memberCount, 20);
  if (!memberCount) errors.memberCount = "required";
  else if (!inEnum(memberCount, ENUMS.memberCount)) errors.memberCount = "invalid";
  else clean.memberCount = memberCount as EventXpScopingPayload["memberCount"];

  // Stage 2
  const eventsPerYear = cleanStr(body.eventsPerYear, 20);
  if (!eventsPerYear) errors.eventsPerYear = "required";
  else if (!inEnum(eventsPerYear, ENUMS.eventsPerYear)) errors.eventsPerYear = "invalid";
  else clean.eventsPerYear = eventsPerYear as EventXpScopingPayload["eventsPerYear"];

  const typicalAttendance = cleanStr(body.typicalAttendance, 20);
  if (!typicalAttendance) errors.typicalAttendance = "required";
  else if (!inEnum(typicalAttendance, ENUMS.attendance)) errors.typicalAttendance = "invalid";
  else clean.typicalAttendance = typicalAttendance as EventXpScopingPayload["typicalAttendance"];

  clean.maxAttendance = (inEnum(cleanStr(body.maxAttendance, 20), ENUMS.attendance)
    ? cleanStr(body.maxAttendance, 20)
    : "") as EventXpScopingPayload["maxAttendance"];

  const recurring = cleanStr(body.recurring, 20);
  if (!recurring) errors.recurring = "required";
  else if (!inEnum(recurring, ENUMS.recurring)) errors.recurring = "invalid";
  else clean.recurring = recurring as EventXpScopingPayload["recurring"];

  const locations = cleanStr(body.locations, 20);
  if (!locations) errors.locations = "required";
  else if (!inEnum(locations, ENUMS.locations)) errors.locations = "invalid";
  else clean.locations = locations as EventXpScopingPayload["locations"];

  // Stage 3
  const registrationMethod = cleanStr(body.registrationMethod, 20);
  if (!registrationMethod) errors.registrationMethod = "required";
  else if (!inEnum(registrationMethod, ENUMS.registrationMethod)) errors.registrationMethod = "invalid";
  else clean.registrationMethod = registrationMethod as EventXpScopingPayload["registrationMethod"];

  const checkInMethod = cleanStr(body.checkInMethod, 20);
  if (!checkInMethod) errors.checkInMethod = "required";
  else if (!inEnum(checkInMethod, ENUMS.checkInMethod)) errors.checkInMethod = "invalid";
  else clean.checkInMethod = checkInMethod as EventXpScopingPayload["checkInMethod"];

  const currentTools = Array.isArray(body.currentTools)
    ? (body.currentTools as unknown[])
        .map((t) => cleanStr(t, 20))
        .filter((t) => inEnum(t, ENUMS.currentTool))
    : [];
  clean.currentTools = currentTools as EventXpScopingPayload["currentTools"];

  clean.biggestProblem = cleanStr(body.biggestProblem, 1000);

  const adminHoursPerEvent = cleanStr(body.adminHoursPerEvent, 20);
  if (!adminHoursPerEvent) errors.adminHoursPerEvent = "required";
  else if (!inEnum(adminHoursPerEvent, ENUMS.adminHours)) errors.adminHoursPerEvent = "invalid";
  else clean.adminHoursPerEvent = adminHoursPerEvent as EventXpScopingPayload["adminHoursPerEvent"];

  // Stage 4
  const capabilities = Array.isArray(body.capabilities)
    ? (body.capabilities as unknown[])
        .map((c) => cleanStr(c, 30))
        .filter((c) => ALL_CAPS.includes(c))
    : [];
  clean.capabilities = capabilities as EventXpScopingPayload["capabilities"];

  // Stage 5
  const launchDate = cleanStr(body.launchDate, 20);
  if (!launchDate) errors.launchDate = "required";
  else if (!inEnum(launchDate, ENUMS.launchDate)) errors.launchDate = "invalid";
  else clean.launchDate = launchDate as EventXpScopingPayload["launchDate"];

  const budgetRange = cleanStr(body.budgetRange, 20);
  if (!budgetRange) errors.budgetRange = "required";
  else if (!inEnum(budgetRange, ENUMS.budgetRange)) errors.budgetRange = "invalid";
  else clean.budgetRange = budgetRange as EventXpScopingPayload["budgetRange"];

  const commercialPreference = cleanStr(body.commercialPreference, 20);
  if (!commercialPreference) errors.commercialPreference = "required";
  else if (!inEnum(commercialPreference, ENUMS.commercialPreference)) errors.commercialPreference = "invalid";
  else clean.commercialPreference = commercialPreference as EventXpScopingPayload["commercialPreference"];

  const privacyHosting = cleanStr(body.privacyHosting, 20);
  if (!privacyHosting) errors.privacyHosting = "required";
  else if (!inEnum(privacyHosting, ENUMS.privacyHosting)) errors.privacyHosting = "invalid";
  else clean.privacyHosting = privacyHosting as EventXpScopingPayload["privacyHosting"];

  const supportHours = cleanStr(body.supportHours, 20);
  if (!supportHours) errors.supportHours = "required";
  else if (!inEnum(supportHours, ENUMS.supportHours)) errors.supportHours = "invalid";
  else clean.supportHours = supportHours as EventXpScopingPayload["supportHours"];

  clean.decisionMaker = cleanStr(body.decisionMaker, 200);

  // Stage 6 — consent
  const privacyAccepted = body.privacyAccepted === true;
  if (!privacyAccepted) errors.privacyAccepted = "required";
  clean.privacyAccepted = privacyAccepted;

  const contactPermission = body.contactPermission === true;
  if (!contactPermission) errors.contactPermission = "required";
  clean.contactPermission = contactPermission;

  clean.marketingConsent = body.marketingConsent === true;

  clean.locale = cleanStr(body.locale, 10) || "zh-hk";
  clean.consentVersion = CONSENT_VERSION;

  return { ok: Object.keys(errors).length === 0, errors, clean };
}
