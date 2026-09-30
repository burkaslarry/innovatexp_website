import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { AiVisibilityMiniCheckForm } from "@/components/AiVisibilityMiniCheckForm";
import { localeAlternates } from "@/lib/alternate-metadata";
import { isValidLocale, localeUsesChineseCopy, withLocale, type AppLocale } from "@/lib/i18n-routing";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const zh = localeUsesChineseCopy(locale);
  return {
    title: zh ? "免費 AI Visibility 迷你檢查登記｜InnovateXP" : "Free AI Visibility Mini Check Registration | InnovateXP",
    description: zh
      ? "17/10 活動參加者即場登記，首 6 位確認。3 個工作天內收到一頁 AI Visibility 摘要。"
      : "Register at the 17 October event. The first 6 participants receive a one-page AI Visibility summary within 3 working days.",
    alternates: localeAlternates(locale, "/ai-visibility-mini-check"),
    robots: { index: false, follow: false },
  };
}

export default async function AiVisibilityMiniCheckPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const loc = locale as AppLocale;
  const zh = localeUsesChineseCopy(loc);
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 text-slate-900 sm:px-6 dark:text-slate-100">
      <a href={withLocale(loc, "/")} className="text-sm font-semibold text-brand-primary hover:underline">← InnovateXP</a>
      <header className="mt-8 rounded-2xl bg-slate-950 px-6 py-10 text-white md:px-10">
        <p className="text-sm font-semibold uppercase tracking-wider text-cyan-300">InnovateXP · AI Visibility Mini Check</p>
        <h1 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">{zh ? "免費檢查你嘅品牌，AI 會點樣介紹？" : "How does AI introduce your brand?"}</h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-slate-200">
          {zh ? "17/10 活動限定 · 首 6 位即場登記確認。InnovateXP 之後做檢查，3 個工作天內交付一頁摘要。" : "17 October event offer · first 6 places confirmed on screen. InnovateXP completes the check afterwards and delivers a one-page summary within 3 working days."}
        </p>
      </header>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_260px]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 md:p-8">
          <h2 className="text-2xl font-bold">{zh ? "當日點用？" : "How it works on the day"}</h2>
          <ol className="mt-5 grid gap-3 text-sm leading-7 text-slate-700 dark:text-slate-200 sm:grid-cols-2">
            {(zh
              ? ["1. 掃 QR，填公司同聯絡資料", "2. 首 6 位即場睇到確認編號", "3. 我哋之後用 3 條買家問題做檢查", "4. 3 個工作天內經 Email／WhatsApp 收一頁摘要"]
              : ["1. Scan the QR and enter company/contact details", "2. First 6 places receive an on-screen reference", "3. We check 3 real buyer questions after the event", "4. Get a one-page summary by email/WhatsApp within 3 working days"]
            ).map((item) => <li key={item} className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800">{item}</li>)}
          </ol>
          <p className="mt-5 text-sm text-slate-600 dark:text-slate-300">
            {zh ? "唔使即場開 account 或安裝軟件；現場只做登記，檢查同摘要會後交付。" : "No account or installation needed. The event is for registration; the check and summary are delivered afterwards."}
          </p>
        </div>
        <aside className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <p className="text-sm font-semibold">{zh ? "畀朋友掃嘅 QR Code" : "QR code to share"}</p>
          <Image src="/ai-visibility-mini-check-qr.png" width={240} height={240} alt="QR code for AI Visibility Mini Check registration" className="mx-auto mt-4 h-auto w-full max-w-60" unoptimized />
          <a href="/ai-visibility-mini-check-qr.png" download className="mt-4 inline-block text-sm font-semibold text-brand-primary underline">{zh ? "下載 QR 圖片" : "Download QR image"}</a>
          <a href="/ai-visibility-mini-check-qr.svg" download className="mt-2 block text-sm font-semibold text-brand-primary underline">{zh ? "下載印刷用 SVG" : "Download print-ready SVG"}</a>
        </aside>
      </section>

      <section id="register" className="mx-auto mt-8 max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 md:p-8">
        <h2 className="mb-2 text-2xl font-bold">{zh ? "登記免費名額" : "Register for a free place"}</h2>
        <p className="mb-6 text-sm leading-7 text-slate-600 dark:text-slate-300">
          {zh ? "每間公司一次，先到先得；你會喺成功提交後即時見到確認。" : "One per company, first come first served. Confirmation appears immediately after successful submission."}
        </p>
        <AiVisibilityMiniCheckForm locale={loc} />
      </section>
    </main>
  );
}
