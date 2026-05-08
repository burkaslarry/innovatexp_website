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
  const alternates = localeAlternates(locale, "/bookme");
  const ogUrl = typeof alternates?.canonical === "string" ? alternates.canonical : `${siteUrlMeta}/${locale}/bookme`;
  return {
    title: "Book a Consultation | InnovateXP",
    description:
      "Book a consultation to review your CRM, event, or AI workflow and define next steps.",
    alternates,
    openGraph: {
      title: "Book a Consultation | InnovateXP",
      description: "Book a consultation to review your CRM, event, or AI workflow and define next steps.",
      url: ogUrl,
      siteName: "InnovateXP Limited",
      images: [{ url: "/innovatexp_color_no_bg.svg", width: 1200, height: 630, alt: "InnovateXP – Book a Call" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Book a Consultation | InnovateXP",
      description: "Book a consultation to review your CRM, event, or AI workflow and define next steps.",
    },
  };
}

export default function BookMeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
