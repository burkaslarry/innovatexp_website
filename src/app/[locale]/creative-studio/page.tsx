import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Coffee, Grid3x3 } from "lucide-react";
import { BackToHomeControl } from "@/components/BackToHomeControl";
import { creativeStudioSeo } from "@/content/page-seo";
import { localeAlternates } from "@/lib/alternate-metadata";
import { isValidLocale, localeUsesChineseCopy, type AppLocale } from "@/lib/i18n-routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const seo = creativeStudioSeo(locale as AppLocale);
  return {
    title: seo.title,
    description: seo.description,
    alternates: localeAlternates(locale, "/creative-studio"),
  };
}

export default async function CreativeStudioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const loc = locale as AppLocale;
  const zh = localeUsesChineseCopy(loc);

  const tools = [
    {
      href: "/creative-studio/artkal-bead-pattern",
      icon: Grid3x3,
      title: zh ? "Artkal 拼豆圖紙生成器" : "Artkal Bead Pattern Generator",
      body: zh
        ? "上傳相片轉成 Artkal 色號圖紙，CIEDE2000 對色、每色粒數統計、1:1 PDF／PNG 匯出。"
        : "Turn a photo into an Artkal fuse-bead blueprint with CIEDE2000 matching, bead counts, and 1:1 PDF/PNG export.",
    },
    {
      href: "/creative-studio/coffee-map",
      icon: Coffee,
      title: zh ? "香港咖啡店地圖" : "Hong Kong Coffeeshop Map",
      body: zh
        ? "香港特色咖啡店同霸王茶姬分店，可按 Wi-Fi、電插、檯型篩選。新增餐廳要有相，人手批核先上地圖。"
        : "Hong Kong coffee shops and CHAGEE branches, filterable by Wi-Fi, outlets, and tables. New shops need a photo and a manual review.",
    },
  ];

  return (
    <main className="mx-auto min-h-screen max-w-[1280px] px-4 py-10 text-[color:var(--text-primary)] sm:px-6">
      <BackToHomeControl />
      <header className="ixp-card mb-8 p-6 md:p-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-primary">
          {zh ? "Larry Lo 個人工房" : "Larry Lo's side projects"}
        </p>
        <h1 className="mt-2 text-3xl font-bold md:text-4xl">
          {zh ? "Creative Studio 自由創作" : "Creative Studio"}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-[color:var(--text-secondary)]">
          {zh
            ? "一個收錄我自己玩嘅瀏覽器小工具嘅角落：拼豆圖紙、咖啡店地圖，陸續有得加。全部喺瀏覽器跑，唔使登入。"
            : "A corner for the small browser tools I build for fun: bead patterns, a coffee map, and more to come. All run in your browser, no login required."}
        </p>
      </header>

      <section className="grid gap-5 md:grid-cols-2">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={`/${loc}${tool.href}`}
            className="ixp-card group flex flex-col p-6 transition hover:-translate-y-0.5 hover:border-brand-primary"
          >
            <tool.icon className="h-8 w-8 text-brand-primary" aria-hidden />
            <h2 className="mt-4 text-xl font-bold text-[color:var(--heading-foreground)]">{tool.title}</h2>
            <p className="mt-2 flex-1 text-sm leading-7 text-[color:var(--text-secondary)]">{tool.body}</p>
            <span className="mt-4 text-sm font-semibold text-brand-primary">
              {zh ? "打開工具 →" : "Open tool →"}
            </span>
          </Link>
        ))}
      </section>
    </main>
  );
}
