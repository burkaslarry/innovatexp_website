import { NextResponse } from "next/server";
import { sendCoffeeShopSubmissionEmail } from "@/lib/resend-mail";

const MAX_PHOTO_BYTES = 4 * 1024 * 1024;
const ALLOWED_TYPES = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
]);

function field(form: FormData, key: string) {
  const value = form.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function flag(form: FormData, key: string) {
  return field(form, key) === "yes";
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    if (field(form, "company_website")) {
      return NextResponse.json({ ok: true });
    }

    const name = field(form, "name").slice(0, 120);
    const neighborhood = field(form, "neighborhood").slice(0, 80);
    const address = field(form, "address").slice(0, 240);
    const shopType = field(form, "type") === "tea" ? "tea" : "coffee";
    const outletsRaw = field(form, "outlets");
    const outlets = outletsRaw === "yes" || outletsRaw === "few" || outletsRaw === "no" ? outletsRaw : "few";
    const wifiRaw = field(form, "wifi");
    const wifi = wifiRaw === "yes" || wifiRaw === "no" ? wifiRaw : "unknown";
    const timeRaw = field(form, "timeLimit");
    const timeLimit = timeRaw === "60" || timeRaw === "90" || timeRaw === "120" || timeRaw === "none" ? timeRaw : "none";
    const notes = field(form, "notes").slice(0, 500);
    const submitterName = field(form, "submitterName").slice(0, 80);
    const submitterEmail = field(form, "submitterEmail");
    const photo = form.get("photo");

    if (!name || !neighborhood || !address || !submitterName) {
      return NextResponse.json({ ok: false, error: "Shop name, area, address, and your name are required." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(submitterEmail)) {
      return NextResponse.json({ ok: false, error: "A valid email is required." }, { status: 400 });
    }
    if (!(photo instanceof File) || photo.size === 0) {
      return NextResponse.json({ ok: false, error: "A shop photo is required." }, { status: 400 });
    }
    const ext = ALLOWED_TYPES.get(photo.type);
    if (!ext) {
      return NextResponse.json({ ok: false, error: "Photo must be JPG, PNG, or WebP." }, { status: 400 });
    }
    if (photo.size > MAX_PHOTO_BYTES) {
      return NextResponse.json({ ok: false, error: "Photo must be 4 MB or smaller." }, { status: 400 });
    }

    const result = await sendCoffeeShopSubmissionEmail({
      subject: `[待批核] Creative Studio 新店 — ${name}`,
      name,
      neighborhood,
      address,
      shopType,
      outlets,
      wifi,
      tableFor2: flag(form, "tableFor2"),
      tableFor4: flag(form, "tableFor4"),
      music: flag(form, "music"),
      timeLimit,
      mustOrder: field(form, "mustOrder") === "yes",
      notes,
      submitterName,
      submitterEmail,
      photo: {
        filename: `shop.${ext}`,
        content: Buffer.from(await photo.arrayBuffer()),
      },
    });

    if (!result.ok) {
      return NextResponse.json(
        { ok: false, error: result.skipped ? "Email is not configured yet." : "Could not send the submission." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, id: result.id });
  } catch {
    return NextResponse.json({ ok: false, error: "Could not read the form." }, { status: 400 });
  }
}
