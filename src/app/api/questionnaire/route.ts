import { NextResponse } from "next/server";
import { insertQuestionnaireLead } from "@/lib/questionnaire-db";
import { validateQuestionnaire } from "@/lib/questionnaire-validation";
import { notifyQuestionnaireLead } from "@/lib/questionnaire-notifications";
import { enforceFormSubmissionLimit } from "@/lib/form-submission-limit";

export async function POST(req: Request) {
  try {
    const raw = await req.text();
    if (raw.length > 32000) return NextResponse.json({ ok: false, error: "Request too large" }, { status: 413 });
    let body;
    try { body = JSON.parse(raw); } catch { return NextResponse.json({ ok: false, error: "Invalid form" }, { status: 400 }); }
    const error = validateQuestionnaire(body);
    if (error) return NextResponse.json({ ok: false, error }, { status: 400 });
    const text = (v: unknown) => typeof v === "string" ? v.trim() : "";
    const feedback = body.pathId === "ai-feedback-questionnaire";
    const email = text(body.email);
    const phone = text(body.phone);
    if ((!feedback && (!text(body.company) || !text(body.name) || (!phone && !email))) ||
      (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) || phone.length > 64) return NextResponse.json({ ok: false, error: "Invalid contact details" }, { status: 400 });
    const blocked = await enforceFormSubmissionLimit(req); if (blocked) return blocked;
    const saved = await insertQuestionnaireLead({
      submissionId: body.submissionId, pathId: body.pathId, questionnaireType: feedback ? "AI Feedback Questionnaire" : "AI Consultation Questionnaire",
      name: text(body.name) || "—", company: text(body.company) || "Feedback", profession: text(body.profession), email, phone,
      industry: text(body.industry), urgency: text(body.urgency), interest: text(body.interest),
      formattedQa: text(body.formattedQa) || JSON.stringify(body.answers), answers: body.answers,
    });
    if (!saved.ok || !saved.id) return NextResponse.json({ ok: false, error: "Submission temporarily unavailable" }, { status: 503 });
    // A saved lead is successful even if notification delivery needs retry.
    try { await notifyQuestionnaireLead(saved.id); } catch { /* Stored pending notification is retried by the job. */ }
    return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    console.error("Questionnaire submission failed");
    return NextResponse.json({ ok: false, error: "Submission temporarily unavailable" }, { status: 503 });
  }
}
