import type { QuotePath } from "@/lib/quote-logic";

export type WizardStepId =
  | "q0"
  | "eventxp_q1"
  | "eventxp_q2"
  | "eventxp_q3"
  | "eventxp_q4"
  | "eventxp_q5"
  | "smartsales_q1"
  | "smartsales_q2"
  | "smartsales_q3"
  | "smartsales_q4"
  | "smartsales_q5"
  | "consulting_q1"
  | "consulting_q2"
  | "consulting_q3"
  | "consulting_q4"
  | "consulting_q5"
  | "bundle_q1"
  | "bundle_q2"
  | "website_q1"
  | "accountxp_q1"
  | "result"
  | "flowx_identity"
  | "flowx_booking";

function pathQuestionCount(path: QuotePath | null): number {
  if (!path) return 0;
  if (path === "website" || path === "accountxp") return 1;
  if (path === "bundle") return 2;
  return 5;
}

function pathFirstStep(path: QuotePath): WizardStepId {
  switch (path) {
    case "eventxp":
      return "eventxp_q1";
    case "smartsales":
      return "smartsales_q1";
    case "consulting":
      return "consulting_q1";
    case "website":
      return "website_q1";
    case "accountxp":
      return "accountxp_q1";
    default:
      return "bundle_q1";
  }
}

/** Linear wizard progress for the progress bar (path pick + questions + result + booking + identity). */
export function getWizardProgress(
  step: WizardStepId,
  path: QuotePath | null,
): { current: number; total: number; percent: number; phase: "path" | "result" | "booking" | "identity" | "pick" } {
  const tail = 3; // result, booking, identity
  const pick = 1; // q0

  if (step === "q0") {
    const total = pick + 5 + tail;
    return { current: 1, total, percent: (1 / total) * 100, phase: "pick" };
  }

  if (step === "result") {
    const q = pathQuestionCount(path);
    const total = pick + q + tail;
    const current = pick + q + 1;
    return { current, total, percent: (current / total) * 100, phase: "result" };
  }

  if (step === "flowx_booking") {
    const q = pathQuestionCount(path);
    const total = pick + q + tail;
    const current = pick + q + 2;
    return { current, total, percent: (current / total) * 100, phase: "booking" };
  }

  if (step === "flowx_identity") {
    const q = pathQuestionCount(path);
    const total = pick + q + tail;
    const current = pick + q + 3;
    return { current, total, percent: (current / total) * 100, phase: "identity" };
  }

  if (!path) {
    return { current: 1, total: pick + tail, percent: 0, phase: "pick" };
  }

  const steps: WizardStepId[] = [];
  const first = pathFirstStep(path);
  const prefixes = ["eventxp", "smartsales", "consulting", "bundle", "website", "accountxp"] as const;
  const prefix = prefixes.find((p) => first.startsWith(p)) ?? "consulting";
  if (prefix === "website" || prefix === "accountxp") {
    steps.push(first);
  } else if (prefix === "bundle") {
    steps.push("bundle_q1", "bundle_q2");
  } else {
    for (let i = 1; i <= 5; i++) {
      steps.push(`${prefix}_q${i}` as WizardStepId);
    }
  }

  const idx = steps.indexOf(step);
  const q = pathQuestionCount(path);
  const total = pick + q + tail;
  const current = pick + (idx >= 0 ? idx + 1 : 1);
  return { current, total, percent: (current / total) * 100, phase: "path" };
}
