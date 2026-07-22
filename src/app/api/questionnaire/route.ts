import { NextResponse } from "next/server";
import { sendQuestionnaireResendEmail } from "@/lib/resend-mail";
import { createQuestionnaireNotionPage } from "@/lib/notion-questionnaire";
import { submitToWeb3FormsContact } from "@/lib/web3forms-submit";

export type QuestionnaireApiBody = {
  pathId?: string;
  questionnaireType?: string;
  subject?: string;
  name?: string;
  company?: string;
  profession?: string;
  email?: string;
  phone?: string;
  industry?: string;
  urgency?: string;
  interest?: string;
  formattedQa?: string;
  answers?: Record<string, string | string[]>;
};

function safeTrim(v: unknown) {
  return typeof v === "string" ? v.trim() : "";
}

function labelFromAnswers(answers: Record<string, string | string[]> | undefined, key: string): string {
  if (!answers) return "";
  const v = answers[key];
  if (Array.isArray(v)) return v.join(", ");
  return typeof v === "string" ? v : "";
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as QuestionnaireApiBody;

    const pathId = safeTrim(body.pathId) || "questionnaire";
    const questionnaireType =
      safeTrim(body.questionnaireType) ||
      (pathId.includes("feedback") ? "AI Feedback Questionnaire" : "AI Consultation Questionnaire");

    const name = safeTrim(body.name) || labelFromAnswers(body.answers, "name") || "-";
    const company =
      safeTrim(body.company) || labelFromAnswers(body.answers, "company") || "—";
    const profession =
      safeTrim(body.profession) ||
      labelFromAnswers(body.answers, "role") ||
      labelFromAnswers(body.answers, "profession") ||
      "—";
    const email = safeTrim(body.email) || labelFromAnswers(body.answers, "email");
    const phone =
      safeTrim(body.phone) ||
      labelFromAnswers(body.answers, "phone") ||
      labelFromAnswers(body.answers, "whatsapp") ||
      "—";
    const industry = safeTrim(body.industry) || labelFromAnswers(body.answers, "industry");
    const urgency = safeTrim(body.urgency) || labelFromAnswers(body.answers, "urgency");
    const interest = safeTrim(body.interest) || labelFromAnswers(body.answers, "interest");
    const formattedQa = safeTrim(body.formattedQa) || JSON.stringify(body.answers ?? {}, null, 2);
    const subject =
      safeTrim(body.subject) || `${questionnaireType} — ${company !== "—" ? company : name}`;

    const isFeedback = pathId.includes("feedback") || questionnaireType.toLowerCase().includes("feedback");

    if (!isFeedback) {
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return NextResponse.json({ ok: false, error: "Valid email is required." }, { status: 400 });
      }
      if (!company || company === "—") {
        return NextResponse.json({ ok: false, error: "Company is required." }, { status: 400 });
      }
    }

    const notifyEmail = email && email.includes("@") ? email : "noreply@innovatexp.co";

    const [resendResult, notionResult] = await Promise.all([
      sendQuestionnaireResendEmail({
        subject,
        questionnaireType,
        name,
        company,
        profession,
        email: notifyEmail,
        phone,
        industry,
        urgency,
        interest,
        formattedQa,
      }),
      createQuestionnaireNotionPage({
        questionnaireType,
        name,
        company,
        profession,
        email: notifyEmail,
        phone,
        industry,
        urgency,
        interest,
        formattedQa,
        pathId,
      }),
    ]);

    // Fallback: if Resend missing/failed, keep Web3Forms so leads are not lost
    let web3: { success: boolean; detail?: string } | null = null;
    if (!resendResult.ok) {
      web3 = await submitToWeb3FormsContact({
        subject,
        from_name: "InnovateXP Limited",
        name,
        email: notifyEmail,
        replyto: notifyEmail,
        message: [
          phone,
          `Type: ${questionnaireType}`,
          `Profession: ${profession}`,
          `Company: ${company}`,
          "",
          formattedQa,
          "",
          company,
        ].join("\n"),
      });
    }

    const emailOk = resendResult.ok || Boolean(web3?.success);
    const notionOk = notionResult.ok;

    if (!emailOk && !notionOk) {
      return NextResponse.json(
        {
          ok: false,
          error: "Could not email or save to Notion. Check RESEND_API_KEY / NOTION_QUESTIONNAIRE_DB_ID.",
          resend: resendResult,
          notion: notionResult,
          web3,
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      ok: true,
      email: {
        provider: resendResult.ok ? "resend" : web3?.success ? "web3forms" : "none",
        resend: resendResult,
        web3,
      },
      notion: notionResult,
    });
  } catch (e) {
    console.error("questionnaire API:", e);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
