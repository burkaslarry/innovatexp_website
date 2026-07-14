/* F13: Reliability (server) - Metadata and Article JSON-LD for the reliability manifesto route. */
import type { Metadata } from "next";
import { ReliabilityContent } from "./ReliabilityContent";
import { isValidLocale } from "@/lib/i18n-routing";
import { localeAlternates } from "@/lib/alternate-metadata";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://www.innovatexp.co";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  return {
    title: "Why InnovateXP doesn't build AI autopilot hype | Reliable AI workflows",
    description:
      "InnovateXP builds deterministic AI-augmented workflows for Hong Kong SMEs: cloud platform support, on-premise options, human checkpoints, and practical AI training.",
    alternates: localeAlternates(locale, "/reliability"),
  };
}

export default async function ReliabilityPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const pageUrl = `${siteUrl}/${locale}/reliability`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${pageUrl}#article`,
    headline: "Why InnovateXP doesn't build AI autopilot hype",
    inLanguage: ["en", "zh-HK"],
    url: pageUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
      url: pageUrl,
    },
    datePublished: "2026-05-01",
    dateModified: "2026-05-08",
    image: [`${siteUrl}/innovatexp_color_no_bg.svg`],
    author: {
      "@type": "Person",
      name: "InnovateXP founder",
      url: "https://www.linkedin.com/in/innovatexp/",
    },
    publisher: {
      "@type": "Organization",
      name: "InnovateXP Limited",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/innovatexp_color_no_bg.svg`,
      },
    },
    about: [
      "AI reliability",
      "AI-augmented workflows",
      "Azure OpenAI",
      "Alibaba Cloud",
      "GCP",
      "AWS",
      "On-premise AI deployment",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c"),
        }}
      />
      <ReliabilityContent />
    </>
  );
}
