/**
 * EventXP Solution Scoping Form — shared types.
 * Used by both the client form and the server API route.
 */

export type OrgType =
  | "chamber"
  | "association"
  | "training"
  | "community"
  | "corporate"
  | "bni"
  | "other";

export type MemberCount = "under100" | "100to500" | "500to2000" | "over2000";
export type EventsPerYear = "under12" | "12to36" | "36to100" | "over100";
export type Attendance = "under50" | "50to200" | "200to500" | "over500";
export type Locations = "1" | "2to5" | "over5";
export type Recurring = "recurring" | "oneoff" | "mixed";
export type RegistrationMethod = "paper" | "googleform" | "excel" | "whatsapp" | "crm" | "other";
export type CheckInMethod = "manual" | "qr" | "kiosk" | "none";
export type CurrentTool = "excel" | "googleform" | "whatsapp" | "crm" | "membership" | "none";
export type AdminHours = "under2" | "2to5" | "5to10" | "over10";
export type LaunchDate = "asap" | "1to3m" | "3to6m" | "over6m" | "exploring";
export type BudgetRange = "under20k" | "20kto50k" | "50kto150k" | "over150k" | "open";
export type CommercialPreference = "managed" | "licence" | "sourcecode" | "undecided";
export type PrivacyHosting = "cloud" | "private" | "onprem" | "undecided";
export type SupportHours = "office" | "extended" | "eventday" | "none";

export type Capability =
  | "memberMgmt"
  | "guestMgmt"
  | "kioskQrCheckIn"
  | "attendanceReport"
  | "rosterImport"
  | "whatsappComms"
  | "membershipScoring"
  | "aiMatchingSeating"
  | "customBranding"
  | "integrations"
  | "onsiteSupport";

export interface EventXpScopingPayload {
  // Stage 1 — Organisation
  organisationName: string;
  contactName: string;
  role: string;
  email: string;
  phone: string;
  orgType: OrgType | "";
  memberCount: MemberCount | "";

  // Stage 2 — Event volume
  eventsPerYear: EventsPerYear | "";
  typicalAttendance: Attendance | "";
  maxAttendance: Attendance | "";
  recurring: Recurring | "";
  locations: Locations | "";

  // Stage 3 — Current process
  registrationMethod: RegistrationMethod | "";
  checkInMethod: CheckInMethod | "";
  currentTools: CurrentTool[];
  biggestProblem: string;
  adminHoursPerEvent: AdminHours | "";

  // Stage 4 — Required capabilities
  capabilities: Capability[];

  // Stage 5 — Commercial & technical
  launchDate: LaunchDate | "";
  budgetRange: BudgetRange | "";
  commercialPreference: CommercialPreference | "";
  privacyHosting: PrivacyHosting | "";
  supportHours: SupportHours | "";
  decisionMaker: string;

  // Stage 6 — Consent
  privacyAccepted: boolean;
  contactPermission: boolean;
  marketingConsent: boolean;

  // Meta
  locale: string;
  consentVersion: string;
  /** honeypot — must stay empty */
  website: string;
}

export const CONSENT_VERSION = "eventxp-scoping-v1";

export const ALL_CAPABILITIES: Capability[] = [
  "memberMgmt",
  "guestMgmt",
  "kioskQrCheckIn",
  "attendanceReport",
  "rosterImport",
  "whatsappComms",
  "membershipScoring",
  "aiMatchingSeating",
  "customBranding",
  "integrations",
  "onsiteSupport",
];
