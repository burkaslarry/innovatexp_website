import { NextResponse } from "next/server";
import { buildPowerTeamPrompt, parsePowerTeamResult } from "@/content/bni-power-team";
import { isValidLocale, type AppLocale } from "@/lib/i18n-routing";
import { chatDeepSeek } from "@/lib/deepseek";

export const runtime = "nodejs";
export const maxDuration = 60;

function safeTrim(v: unknown) {
  return typeof v === "string" ? v.trim() : "";
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      profession?: string;
      offering?: string;
      locale?: string;
    };

    const profession = safeTrim(body.profession);
    const offering = safeTrim(body.offering);
    const locale: AppLocale = isValidLocale(safeTrim(body.locale))
      ? (safeTrim(body.locale) as AppLocale)
      : "zh-hk";

    if (!profession || profession.length < 2) {
      return NextResponse.json({ ok: false, error: "Profession is required." }, { status: 400 });
    }
    if (!offering || offering.length < 4) {
      return NextResponse.json({ ok: false, error: "Products/services are required." }, { status: 400 });
    }
    if (profession.length > 200 || offering.length > 4000) {
      return NextResponse.json({ ok: false, error: "Input is too long." }, { status: 400 });
    }

    if (!process.env.DEEPSEEK_API_KEY?.trim()) {
      return NextResponse.json(
        { ok: false, error: "Power Team generator is not configured." },
        { status: 503 },
      );
    }

    const { system, user } = buildPowerTeamPrompt({ profession, offering, locale });
    const raw = await chatDeepSeek({
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      temperature: 0.55,
      maxTokens: 4500,
    });

    const result = parsePowerTeamResult(raw);
    if (
      result.upstream.length === 0 ||
      result.parallel.length === 0 ||
      result.downstream.length === 0 ||
      result.powerTeams.length === 0
    ) {
      return NextResponse.json({ ok: false, error: "Incomplete AI response." }, { status: 502 });
    }

    return NextResponse.json({ ok: true, result });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[bni-power-team]", message);
    return NextResponse.json({ ok: false, error: "Failed to generate Power Team map." }, { status: 500 });
  }
}
