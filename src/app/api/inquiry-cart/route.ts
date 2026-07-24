import { NextResponse } from "next/server";
import { sendInquiryCartResendEmail } from "@/lib/resend-mail";
import { submitToWeb3FormsContact } from "@/lib/web3forms-submit";
import { formatHkd } from "@/content/pricing";
import { getInquiryCatalogItem } from "@/content/inquiry-catalog";

type CartItemBody = {
  id?: string;
  title?: string;
  amountHkd?: number;
  qty?: number;
};

type Body = {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  message?: string;
  locale?: string;
  sourcePath?: string;
  items?: CartItemBody[];
  estimatedTotal?: number;
};

function safeTrim(v: unknown) {
  return typeof v === "string" ? v.trim() : "";
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;
    const name = safeTrim(body.name);
    const company = safeTrim(body.company) || "—";
    const email = safeTrim(body.email);
    const phone = safeTrim(body.phone) || "—";
    const message = safeTrim(body.message);
    const locale = safeTrim(body.locale) || "en";
    const sourcePath = safeTrim(body.sourcePath) || "/";

    if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Valid name and email are required." },
        { status: 400 },
      );
    }

    const rawItems = Array.isArray(body.items) ? body.items : [];
    if (rawItems.length === 0) {
      return NextResponse.json({ ok: false, error: "Cart is empty." }, { status: 400 });
    }

    const items = rawItems
      .map((item) => {
        const id = safeTrim(item.id);
        const catalog = getInquiryCatalogItem(id);
        const qty = Math.max(1, Math.min(9, Math.floor(Number(item.qty) || 1)));
        const amountHkd =
          typeof item.amountHkd === "number" && item.amountHkd >= 0
            ? item.amountHkd
            : catalog?.amountHkd ?? 0;
        const title =
          safeTrim(item.title) ||
          catalog?.titleEn ||
          id ||
          "Offer";
        return { id: id || "unknown", title, amountHkd, qty };
      })
      .filter((item) => item.amountHkd > 0 || item.id !== "unknown");

    if (items.length === 0) {
      return NextResponse.json({ ok: false, error: "No valid cart items." }, { status: 400 });
    }

    const estimatedTotal =
      typeof body.estimatedTotal === "number" && body.estimatedTotal >= 0
        ? body.estimatedTotal
        : items.reduce((sum, line) => sum + line.amountHkd * line.qty, 0);

    const subject = `Website inquiry cart — ${company !== "—" ? company : name} — ${formatHkd(estimatedTotal)}`;

    const resendResult = await sendInquiryCartResendEmail({
      subject,
      name,
      company,
      email,
      phone,
      message,
      locale,
      sourcePath,
      items,
      estimatedTotal,
    });

    let web3: { success: boolean; detail?: string } | null = null;
    if (!resendResult.ok) {
      const lines = items
        .map(
          (line) =>
            `- ${line.title} × ${line.qty}: ${formatHkd(line.amountHkd * line.qty)}`,
        )
        .join("\n");
      web3 = await submitToWeb3FormsContact({
        subject,
        from_name: "InnovateXP Limited",
        name,
        email,
        replyto: email,
        message: [
          phone,
          `Company: ${company}`,
          `Locale: ${locale}`,
          `Path: ${sourcePath}`,
          "",
          "—— Inquiry cart ——",
          lines,
          `Estimated total: ${formatHkd(estimatedTotal)}`,
          message ? `\nMessage:\n${message}` : "",
          "",
          "Note: inquiry only — not a paid checkout.",
        ]
          .filter(Boolean)
          .join("\n"),
      });
    }

    const emailOk = resendResult.ok || Boolean(web3?.success);
    if (!emailOk) {
      return NextResponse.json(
        {
          ok: false,
          error: "Could not send inquiry email. Check RESEND_API_KEY / Web3Forms.",
          resend: resendResult,
          web3,
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      ok: true,
      email: {
        provider: resendResult.ok ? "resend" : "web3forms",
        resend: resendResult,
        web3,
      },
    });
  } catch (e) {
    console.error("inquiry-cart API:", e);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
