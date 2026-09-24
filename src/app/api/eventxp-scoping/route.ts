import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { validateEventXpScopingPayload } from "@/lib/eventxp-scoping/validate";
import { runAdapter } from "@/lib/eventxp-scoping/whatsapp-adapter";
import { submitToWeb3FormsContact } from "@/lib/web3forms-submit";
import type { EventXpScopingPayload } from "@/lib/eventxp-scoping/types";

export const runtime = "nodejs";

/**
 * In-memory rate limit (per IP + per email).
 * Note: this resets on cold start / across instances. For production-grade
 * limits, back this with Vercel KV / Upstash Redis.
 */
const BUCKET = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_PER_WINDOW = 3;

function rateKey(ip: string, email: string): string {
  return `${ip}|${email.toLowerCase()}`;
}

function checkRate(key: string): boolean {
  const now = Date.now();
  const entry = BUCKET.get(key);
  if (!entry || entry.resetAt < now) {
    BUCKET.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= MAX_PER_WINDOW) return false;
  entry.count += 1;
  return true;
}

function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  const real = req.headers.get("x-real-ip");
  return real || "unknown";
}

function hashIp(ip: string): string {
  // Store only a hash so logs don't retain raw IPs.
  let h = 0;
  for (let i = 0; i < ip.length; i++) h = (h * 31 + ip.charCodeAt(i)) | 0;
  return `ip_${(h >>> 0).toString(16)}`;
}

export async function POST(req: Request) {
  try {
    const ip = clientIp(req);
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
    }

    const { ok, errors, clean } = validateEventXpScopingPayload(body);

    // Honeypot tripped — silently accept so bots don't retry.
    if (errors.website === "spam") {
      return NextResponse.json({ ok: true, leadId: null, mode: null }, { status: 200 });
    }

    if (!ok) {
      return NextResponse.json({ ok: false, error: "validation_failed", errors }, { status: 400 });
    }

    const payload = clean as EventXpScopingPayload;
    const emailKey = payload.email || "no-email";

    if (!checkRate(rateKey(hashIp(ip), emailKey))) {
      return NextResponse.json(
        { ok: false, error: "rate_limited", message: "Too many submissions. Please try again later." },
        { status: 429 },
      );
    }

    const leadId = randomUUID();
    const submittedAt = new Date().toISOString();

    // 1. Persist as a secured lead record (delivered to InnovateXP inbox via Web3Forms).
    //    The full payload lives here; the WhatsApp message only references leadId.
    const recordBody = [
      `Lead ID: ${leadId}`,
      `Submitted: ${submittedAt}`,
      `Consent version: ${payload.consentVersion}`,
      `Locale: ${payload.locale}`,
      `IP hash: ${hashIp(ip)}`,
      "",
      "Stage 1 — Organisation",
      `Organisation: ${payload.organisationName}`,
      `Contact: ${payload.contactName}`,
      `Role: ${payload.role}`,
      `Email: ${payload.email}`,
      `Phone: ${payload.phone}`,
      `Org type: ${payload.orgType}`,
      `Member count: ${payload.memberCount}`,
      "",
      "Stage 2 — Event volume",
      `Events/year: ${payload.eventsPerYear}`,
      `Typical attendance: ${payload.typicalAttendance}`,
      `Max attendance: ${payload.maxAttendance || "—"}`,
      `Recurring: ${payload.recurring}`,
      `Locations: ${payload.locations}`,
      "",
      "Stage 3 — Current process",
      `Registration: ${payload.registrationMethod}`,
      `Check-in: ${payload.checkInMethod}`,
      `Current tools: ${(payload.currentTools ?? []).join(", ") || "—"}`,
      `Biggest problem: ${payload.biggestProblem || "—"}`,
      `Admin hours/event: ${payload.adminHoursPerEvent}`,
      "",
      "Stage 4 — Capabilities",
      `${(payload.capabilities ?? []).join(", ") || "—"}`,
      "",
      "Stage 5 — Commercial",
      `Launch: ${payload.launchDate}`,
      `Budget: ${payload.budgetRange}`,
      `Preference: ${payload.commercialPreference}`,
      `Privacy/hosting: ${payload.privacyHosting}`,
      `Support hours: ${payload.supportHours}`,
      `Decision maker: ${payload.decisionMaker || "—"}`,
      "",
      "Stage 6 — Consent",
      `Privacy accepted: ${payload.privacyAccepted}`,
      `Contact permission: ${payload.contactPermission}`,
      `Marketing consent: ${payload.marketingConsent}`,
    ].join("\n");

    const stored = await submitToWeb3FormsContact({
      subject: `EventXP Solution Scoping — ${payload.organisationName} (${leadId.slice(0, 8)})`,
      from_name: "InnovateXP Limited",
      name: payload.contactName,
      email: payload.email,
      replyto: payload.email,
      message: recordBody,
    });

    if (!stored.success) {
      console.warn("eventxp-scoping: lead store failed", { leadId, detail: stored.detail });
      // Don't expose internals; still attempt notification so lead isn't fully lost.
    }

    // 2. Notification adapter (WhatsApp API or prefilled link).
    const adapter = await runAdapter(payload, leadId);

    return NextResponse.json({
      ok: true,
      leadId,
      submittedAt,
      mode: adapter.mode,
      delivered: adapter.mode === "WHATSAPP_API" ? adapter.delivered : undefined,
      waMeLink: adapter.mode === "WHATSAPP_LINK" ? adapter.waMeLink : undefined,
      expectedResponseHours: 48,
    });
  } catch (e) {
    // Log without personal data.
    console.error("eventxp-scoping API:", e instanceof Error ? e.message : "unknown");
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
