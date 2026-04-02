import { NextResponse } from "next/server";
import { submitToWeb3FormsServer } from "@/lib/web3forms-submit";

type ProductInterest = "EventXP" | "SmartSales" | "AI Consulting" | "Bundle";
type Urgency = "Within 1 month" | "1–3 months" | "Just exploring";

type EnquiryPayload = {
  name: string;
  company?: string;
  email: string;
  phone: string;
  productInterest: ProductInterest;
  recommendedPlan: string;
  estimatedRangeHKD?: string;
  estimatedMidpointHKD?: number;
  urgency: Urgency;
  quizAnswersJson: string;
  message?: string;
  source?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function safeTrim(v: unknown) {
  return typeof v === "string" ? v.trim() : "";
}

function buildEmailBody(p: EnquiryPayload) {
  const lines = [
    "New website quotation enquiry",
    "",
    `Name: ${p.name}`,
    `Company: ${p.company || "-"}`,
    `Email: ${p.email}`,
    `Phone / WhatsApp: ${p.phone}`,
    `Product interest: ${p.productInterest}`,
    `Recommended plan: ${p.recommendedPlan || "-"}`,
    `Estimated range (HKD): ${p.estimatedRangeHKD || "-"}`,
    `Estimated midpoint (HKD): ${typeof p.estimatedMidpointHKD === "number" ? p.estimatedMidpointHKD : "-"}`,
    `Urgency: ${p.urgency}`,
    `Source: ${p.source || "Website Quiz"}`,
    "",
    "Message / Notes:",
    p.message?.trim() ? p.message.trim() : "-",
    "",
    "Quiz Answers (JSON):",
    p.quizAnswersJson || "{}",
  ];
  return lines.join("\n");
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<EnquiryPayload>;

    const payload: EnquiryPayload = {
      name: safeTrim(body.name),
      company: safeTrim(body.company) || undefined,
      email: safeTrim(body.email),
      phone: safeTrim(body.phone),
      productInterest: body.productInterest as ProductInterest,
      recommendedPlan: safeTrim(body.recommendedPlan),
      estimatedRangeHKD: safeTrim(body.estimatedRangeHKD) || undefined,
      estimatedMidpointHKD:
        typeof body.estimatedMidpointHKD === "number" ? body.estimatedMidpointHKD : undefined,
      urgency: body.urgency as Urgency,
      quizAnswersJson: safeTrim(body.quizAnswersJson),
      message: safeTrim(body.message) || undefined,
      source: safeTrim(body.source) || "Website Quiz",
    };

    if (!payload.name || !payload.email || !payload.phone || !payload.productInterest || !payload.urgency) {
      return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
    }
    if (!isValidEmail(payload.email)) {
      return NextResponse.json({ ok: false, error: "Invalid email format." }, { status: 400 });
    }
    if (!payload.quizAnswersJson) {
      return NextResponse.json({ ok: false, error: "Missing quiz answers." }, { status: 400 });
    }

    // Email notification via Web3Forms (best effort)
    let emailSuccess = false;
    try {
      const emailBody = buildEmailBody(payload);
      const result = await submitToWeb3FormsServer({
        subject: `Quotation enquiry — ${payload.productInterest} — ${payload.name}`,
        from_name: "InnovateXP Website",
        name: payload.name,
        email: payload.email,
        message: emailBody,
      });
      emailSuccess = result.success;
      if (!emailSuccess) {
        console.warn("⚠️ Web3Forms enquiry email not successful:", result);
      }
    } catch (e) {
      console.error("❌ Web3Forms enquiry email failed:", e);
    }

    return NextResponse.json({
      ok: true,
      emailSuccess,
    });
  } catch (error) {
    console.error("Enquiry API error:", error);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}

