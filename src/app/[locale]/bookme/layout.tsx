import type { Metadata } from "next";
import { isValidLocale, type AppLocale } from "@/lib/i18n-routing";
import { localeAlternates } from "@/lib/alternate-metadata";
import { bookmeSeo } from "@/content/page-seo";
import { getSiteUrl } from "@/lib/site-url";

const siteUrlMeta = getSiteUrl();

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const seo = bookmeSeo(locale as AppLocale);
  const alternates = localeAlternates(locale, "/bookme");
  const ogUrl =
    typeof alternates?.canonical === "string" ? alternates.canonical : `${siteUrlMeta}/${locale}/bookme`;
  return {
    title: seo.title,
    description: seo.description,
    alternates,
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: ogUrl,
      siteName: "InnovateXP Limited",
      images: [{ url: "/innovatexp_color_no_bg.svg", width: 1200, height: 630, alt: "InnovateXP – Book a Call" }],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
    },
  };
}

export default function BookMeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
