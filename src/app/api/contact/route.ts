import { NextResponse } from "next/server";
import { enforceFormSubmissionLimit } from "@/lib/form-submission-limit";
import { sendFormNotification } from "@/lib/form-notification";

export async function POST(req: Request) {
  let fields: Record<string, string>;
  try {
    const body = await req.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error();
    fields = Object.fromEntries(["senderName", "name", "email", "message"].map(key => [key, typeof body[key] === "string" ? body[key].trim() : ""]));
    if (!(fields.senderName || fields.name) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email) || !fields.message || fields.message.length > 20000) throw new Error();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid contact details." }, { status: 400 });
  }
  const blocked = await enforceFormSubmissionLimit(req);
  if (blocked) return blocked;
  try {
    const result = await sendFormNotification({ ...fields, from_name: "InnovateXP Website", subject: `Contact enquiry — ${fields.senderName || fields.name}` });
    return NextResponse.json(result, { status: result.success ? 200 : 502 });
  } catch {
    return NextResponse.json({ success: false, error: "暫時未能寄出，請稍後再試。Could not send. Please try again later." }, { status: 502 });
  }
}
