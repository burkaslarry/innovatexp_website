import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BackToHomeControl } from "@/components/BackToHomeControl";
import { ArtkalBeadPatternClient } from "@/components/artkal/ArtkalBeadPatternClient";
import { artkalBeadSeo } from "@/content/page-seo";
import { localeAlternates } from "@/lib/alternate-metadata";
import { isValidLocale, localeUsesChineseCopy, type AppLocale } from "@/lib/i18n-routing";
import { getArtkalBeadPatternSchema, getHowToSchema } from "@/lib/schema";
import { getSiteUrl } from "@/lib/site-url";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const seo = artkalBeadSeo(locale as AppLocale);
  return {
    title: seo.title,
    description: seo.description,
    keywords: [
      "Artkal",
      "拼豆圖紙生成器",
      "fuse bead pattern",
      "S01",
      "B13",
      "H5",
      "CIEDE2000",
      "perler alternative",
    ],
    alternates: localeAlternates(locale, "/creative-studio/artkal-bead-pattern"),
  };
}

export default async function ArtkalBeadPatternPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const loc = locale as AppLocale;
  const zh = localeUsesChineseCopy(loc);
  const pageUrl = `${getSiteUrl()}/${loc}/creative-studio/artkal-bead-pattern`;
  const jsonLd = [
    getArtkalBeadPatternSchema(pageUrl),
    getHowToSchema({
      name: zh ? "點樣用拼豆圖紙生成器" : "How to generate an Artkal bead pattern",
      description: zh
        ? "上傳圖片、揀釘板同 Artkal 系列，生成色號圖紙並匯出 PDF／PNG。"
        : "Upload an image, choose a pegboard and Artkal series, then export a coded blueprint.",
      url: pageUrl,
      steps: zh
        ? [
            { name: "上傳圖片", text: "拖放 JPG 或 PNG。處理只在瀏覽器進行。" },
            { name: "揀釘板同色數", text: "1 板 29×29、4 板 58×58，或自訂格數；用滑桿限制最多色袋。" },
            { name: "對色生成", text: "每個像素以 CIEDE2000 對到最近 Artkal 色號（S01、A2、B13、H5 等）。" },
            { name: "匯出圖紙", text: "複製購物清單，或下載 1:1 PDF／高清 PNG。" },
          ]
        : [
            { name: "Upload an image", text: "Drop a JPG or PNG. Processing stays in the browser." },
            { name: "Pick board and color limit", text: "Use 29×29, 58×58, or a custom grid, then cap distinct bead bags." },
            { name: "Match colors", text: "Each pixel maps to the nearest Artkal code via CIEDE2000." },
            { name: "Export", text: "Copy the shopping list or download a 1:1 PDF / PNG blueprint." },
          ],
    }),
  ];

  return (
    <main className="mx-auto min-h-screen max-w-[1280px] px-4 py-10 text-[color:var(--text-primary)] sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <BackToHomeControl />
      <nav className="mb-4 text-sm font-semibold">
        <Link href={`/${loc}/creative-studio`} className="text-brand-primary underline-offset-2 hover:underline">
          {zh ? "← Creative Studio 自由創作" : "← Creative Studio"}
        </Link>
      </nav>
      <header className="ixp-card mb-8 p-6 md:p-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-primary">
          {zh ? "免費瀏覽器工具" : "Free browser tool"}
        </p>
        <h1 className="mt-2 text-3xl font-bold md:text-4xl">
          {zh ? "Artkal 拼豆圖紙生成器" : "Artkal Bead Pattern Generator"}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-[color:var(--text-secondary)]">
          {zh
            ? "把相片轉成可擺豆嘅像素圖紙：對到 Artkal 色號（S01 白、A2 黃、B13、H5 中性等），計算每色粒數，再匯出 1:1 PDF／PNG。S 系列 5mm、A／C 系列 2.6mm。"
            : "Convert a photo into a placeable pixel blueprint mapped to Artkal codes (S01 White, A2 yellows, B13, H5 neutrals, and more), with exact bead counts and 1:1 PDF/PNG export. S-series is 5mm; A/C are 2.6mm."}
        </p>
      </header>
      <ArtkalBeadPatternClient zh={zh} />
    </main>
  );
}
