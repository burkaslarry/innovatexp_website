import type { Metadata } from "next";
import { isValidLocale } from "@/lib/i18n-routing";
import { localeAlternates } from "@/lib/alternate-metadata";

const siteUrlMeta =
  process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://www.innovatexp.co";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const alternates = localeAlternates(locale, "/blog");
  const ogUrl = typeof alternates?.canonical === "string" ? alternates.canonical : `${siteUrlMeta}/${locale}/blog`;
  return {
    title: "Blog | InnovateXP",
    description:
      "Updates and practical notes on AI, CRM, event operations, and implementation work.",
    alternates,
    openGraph: {
      title: "Blog | InnovateXP",
      description: "Updates and practical notes on AI, CRM, event operations, and implementation work.",
      url: ogUrl,
      siteName: "InnovateXP Limited",
    },
  };
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
