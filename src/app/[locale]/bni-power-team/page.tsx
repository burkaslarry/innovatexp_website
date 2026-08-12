import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BniPowerTeamQuestionnaire } from "@/components/BniPowerTeamQuestionnaire";
import { getBniPowerTeamCopy } from "@/content/bni-power-team";
import { localeAlternates } from "@/lib/alternate-metadata";
import { isValidLocale, localeUsesChineseCopy, type AppLocale } from "@/lib/i18n-routing";
import { buildWhatsAppHref } from "@/lib/whatsapp-contact";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const c = getBniPowerTeamCopy(locale as AppLocale);
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: localeAlternates(locale, "/bni-power-team"),
  };
}

export default async function BniPowerTeamPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const loc = locale as AppLocale;
  const zh = localeUsesChineseCopy(loc);
  const whatsappHref = buildWhatsAppHref(
    zh
      ? "你好，我用咗 BNI Power Team 工具，想同 Larry 傾吓轉介／合作。"
      : "Hi — I used the BNI Power Team tool and would like to discuss referrals / collaboration with Larry.",
  );

  return (
    <main className="min-h-screen bg-[#f7f9fc] py-16 text-slate-900 dark:bg-gray-950 dark:text-slate-100">
      <div className="container mx-auto max-w-3xl px-4">
        <BniPowerTeamQuestionnaire
          locale={loc}
          bookingHref={`/${loc}/bookme`}
          whatsappHref={whatsappHref}
        />
      </div>
    </main>
  );
}
