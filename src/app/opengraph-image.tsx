import { ImageResponse } from "next/og";

export const alt =
  "InnovateXP — AI 幫你諗，你話事 · SmartSales CRM · EventXP · AI 顧問";

export const size = { width: 1200, height: 630 };

export const contentType = "image/png";

const FONT_FAMILY = "Noto Sans HK";

async function loadGoogleFontWeights(weights: number[]) {
  const w = weights.join(";");
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${encodeURIComponent(FONT_FAMILY)}:wght@${w}&display=swap`,
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; OGImage/1.0; +https://www.innovatexp.co)",
      },
      next: { revalidate: 86400 },
    },
  ).then((res) => res.text());

  const fonts: { weight: number; data: ArrayBuffer }[] = [];

  for (const block of css.split("@font-face")) {
    const weightMatch = block.match(/font-weight:\s*(\d+)/);
    const urlMatch = block.match(/src:\s*url\(([^)]+)\)/);
    const weight = weightMatch ? Number(weightMatch[1]) : NaN;
    const url = urlMatch?.[1]?.replace(/^["']|["']$/g, "");
    if (!url || !weights.includes(weight)) continue;
    const data = await fetch(url).then((res) => res.arrayBuffer());
    fonts.push({ weight, data });
  }

  return fonts;
}

export default async function Image() {
  const loaded = await loadGoogleFontWeights([400, 700]);
  const regular = loaded.find((f) => f.weight === 400);
  const bold = loaded.find((f) => f.weight === 700);
  if (!regular?.data || !bold?.data) {
    throw new Error("Failed to load OG image fonts");
  }

  return new ImageResponse(
    (
      <div
        style={{
          background: "#0F172A",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          color: "white",
          fontFamily: FONT_FAMILY,
        }}
      >
        <div style={{ fontSize: 32, opacity: 0.7 }}>InnovateXP</div>
        <div style={{ fontSize: 72, fontWeight: 700, marginTop: 20 }}>
          AI 幫你諗，你話事
        </div>
        <div style={{ fontSize: 36, marginTop: 30, opacity: 0.9 }}>
          SmartSales CRM · EventXP · AI 顧問
        </div>
        <div style={{ fontSize: 24, marginTop: 40, opacity: 0.6 }}>
          14 年實戰 · 粵英支援 · 香港中小企
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: FONT_FAMILY,
          data: regular.data,
          weight: 400,
          style: "normal" as const,
        },
        {
          name: FONT_FAMILY,
          data: bold.data,
          weight: 700,
          style: "normal" as const,
        },
      ],
    },
  );
}
