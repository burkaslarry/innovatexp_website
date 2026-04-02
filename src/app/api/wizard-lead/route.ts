import { NextResponse } from "next/server";
import { submitToWeb3FormsContact } from "@/lib/web3forms-submit";
import { buildWizardLeadEmailBody, type WizardLeadPayload } from "@/lib/build-wizard-lead-body";

/*
 * POST /api/wizard-lead
 * Validates identity fields, then sends to Web3Forms with:
 *   name  = contactName
 *   email = email
 *   message = buildWizardLeadEmailBody() → WhatsApp + QA + company
 *
 * Bookme QuotationWizard does not call this route (single InnovateXP Limited email from booking).
 * Kept for integrations or manual POSTs; same sender branding as calendar confirmations.
 *
 * Inbox: Web3Forms delivers to the email verified on each access key (not this API).
 * For info@innovatexp.co, set WEB3FORMS_ACCESS_KEY (or NEXT_PUBLIC_*) to a key created
 * for that address, or add NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY_2 for a second inbox.
 */
function safeTrim(v: unknown) {
  return typeof v === "string" ? v.trim() : "";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<WizardLeadPayload & { subject?: string }>;

    const payload: WizardLeadPayload = {
      contactName: safeTrim(body.contactName) || "-",
      email: safeTrim(body.email),
      whatsapp: safeTrim(body.whatsapp),
      company: safeTrim(body.company),
      appointmentDetail: safeTrim(body.appointmentDetail) || "Manual follow-up (not yet scheduled)",
      pathId: safeTrim(body.pathId) || "unknown",
      formattedQa: safeTrim(body.formattedQa) || "-",
    };

    if (!payload.email || !payload.whatsapp || !payload.company) {
      return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
    }
    if (!isValidEmail(payload.email)) {
      return NextResponse.json({ ok: false, error: "Invalid email." }, { status: 400 });
    }

    const message = buildWizardLeadEmailBody(payload);
    const result = await submitToWeb3FormsContact({
      subject: body.subject?.trim() || `New website lead — ${payload.company}`,
      from_name: "InnovateXP Limited",
      name: payload.contactName,
      email: payload.email,
      replyto: payload.email,
      message,
    });

    if (!result.success) {
      if (result.detail) {
        console.warn("wizard-lead Web3Forms:", result.detail);
      }
      return NextResponse.json(
        { ok: false, error: "Email notification failed. Check Web3Forms keys / inbox." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, emailSuccess: true, allEmails: result.allSucceeded });
  } catch (e) {
    console.error("wizard-lead API:", e);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
