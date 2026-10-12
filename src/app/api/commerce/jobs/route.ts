import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { drainCommerceOutbox } from "@/lib/commerce/notifications";
import { retryQuestionnaireNotifications } from "@/lib/questionnaire-notifications";

export async function POST(req: Request) {
  const secret = process.env.COMMERCE_JOB_SECRET;
  const auth = req.headers.get("authorization") || "";
  const expected = `Bearer ${secret}`;
  if (!secret || secret.length < 32 || auth.length !== expected.length || !timingSafeEqual(Buffer.from(auth), Buffer.from(expected))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try { const [commerce, questionnaire] = await Promise.all([drainCommerceOutbox(), retryQuestionnaireNotifications()]); return NextResponse.json({ commerce, questionnaire: questionnaire.filter(Boolean).length }); }
  catch { return NextResponse.json({ error: "Retry required" }, { status: 503 }); }
}
