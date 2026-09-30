import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { isValidLocale } from "@/lib/i18n-routing";
import { miniCheckCapacity, reserveMiniCheck } from "@/lib/ai-visibility-mini-check";
import { sendQuestionnaireResendEmail } from "@/lib/resend-mail";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const OPENS_AT = Date.parse("2026-10-17T00:00:00+08:00");

function trimmed(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function websiteUrl(value: string) {
  try {
    const url = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
    if (!["http:", "https:"].includes(url.protocol) || url.username || url.password) return null;
    const host = url.hostname.toLowerCase().replace(/^www\./, "");
    if (!host.includes(".") || host === "localhost") return null;
    return { url: url.toString(), host };
  } catch {
    return null;
  }
}

export async function GET() {
  try {
    const remaining = await miniCheckCapacity();
    return NextResponse.json({ open: Date.now() >= OPENS_AT, remaining }, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("mini-check capacity:", error instanceof Error ? error.message : "unknown");
    return NextResponse.json({ open: false, remaining: null }, { status: 503 });
  }
}

export async function POST(request: Request) {
  if (Date.now() < OPENS_AT) {
    return NextResponse.json({ ok: false, reason: "not_open" }, { status: 403 });
  }
  let body: Record<string, unknown>;
  try {
    body = await request.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error("Invalid body");
  } catch {
    return NextResponse.json({ ok: false, reason: "invalid" }, { status: 400 });
  }
  if (trimmed(body.fax, 200)) return NextResponse.json({ ok: true, outcome: "received" });

  const name = trimmed(body.name, 120);
  const company = trimmed(body.company, 160);
  const website = websiteUrl(trimmed(body.website, 400));
  const service = trimmed(body.service, 500);
  const email = trimmed(body.email, 180).toLowerCase();
  const whatsapp = trimmed(body.whatsapp, 50);
  const question = trimmed(body.question, 500);
  const locale = isValidLocale(String(body.locale)) ? String(body.locale) : "zh-hk";
  if (!name || !company || !website || !service || (!email && !whatsapp) || body.consent !== true) {
    return NextResponse.json({ ok: false, reason: "invalid" }, { status: 400 });
  }
  if ((email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) ||
      (whatsapp && !/^\+?[0-9 ()-]{8,25}$/.test(whatsapp))) {
    return NextResponse.json({ ok: false, reason: "invalid_contact" }, { status: 400 });
  }

  try {
    const result = await reserveMiniCheck({
      name, company, website: website.url, websiteHost: website.host,
      service, email, whatsapp, question, locale,
    });
    if (result.outcome === "full") {
      return NextResponse.json({ ok: false, reason: "full" }, { status: 409 });
    }
    if (result.outcome === "duplicate") {
      return NextResponse.json({ ok: false, reason: "duplicate" }, { status: 409 });
    }
    if (result.outcome !== "confirmed") throw new Error("Reservation failed");

    const reference = `AV-${String(result.leadId).padStart(5, "0")}`;
    const notification = await sendQuestionnaireResendEmail({
      subject: `AI Visibility Mini Check — seat ${result.seatNumber}/6 — ${company}`,
      questionnaireType: "AI Visibility Mini Check · 17 Oct workshop",
      name,
      company,
      profession: "Workshop participant",
      email: email || "noreply@innovatexp.co",
      phone: whatsapp || "—",
      formattedQa: [
        `Reference: ${reference}`,
        `Website: ${website.url}`,
        `Main service: ${service}`,
        `Buyer question: ${question || "—"}`,
        `Seat: ${result.seatNumber}/6`,
      ].join("\n"),
    });
    if (!notification.ok) {
      const digest = createHash("sha256").update(reference).digest("hex").slice(0, 8);
      console.error("mini-check notification failed", digest, notification.error || "not configured");
    }
    return NextResponse.json({ ok: true, outcome: "confirmed", reference, seatNumber: result.seatNumber }, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("mini-check registration:", error instanceof Error ? error.message : "unknown");
    return NextResponse.json({ ok: false, reason: "unavailable" }, { status: 503 });
  }
}
