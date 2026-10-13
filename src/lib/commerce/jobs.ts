import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { drainCommerceOutbox } from "./notifications";
import { retryQuestionnaireNotifications } from "@/lib/questionnaire-notifications";

export function jobAuthorized(req: Request, secret: string | undefined): boolean {
  if (!secret || secret.length < 32) return false;
  const actual = Buffer.from(req.headers.get("authorization") || "");
  const expected = Buffer.from(`Bearer ${secret}`);
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export async function runNotificationJobs(req: Request, secret: string | undefined) {
  if (!jobAuthorized(req, secret)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const [commerce, questionnaire] = await Promise.all([drainCommerceOutbox(), retryQuestionnaireNotifications()]);
    return NextResponse.json({ commerce, questionnaire: questionnaire.filter(Boolean).length }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "Retry required" }, { status: 503 });
  }
}
