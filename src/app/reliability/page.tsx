/* F13: Reliability (server) - Metadata and Article JSON-LD for the reliability manifesto route. */
import type { Metadata } from "next";
import { ReliabilityContent } from "./ReliabilityContent";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://www.innovatexp.co";

export const metadata: Metadata = {
  title: "Why InnovateXP doesn't build AI autopilot hype | Reliable AI workflows",
  description:
    "InnovateXP builds deterministic AI-augmented workflows for Hong Kong SMEs: cloud platform support, on-premise options, human checkpoints, and practical AI training.",
};

export default function ReliabilityPage() {
  const pageUrl = `${siteUrl}/reliability`;
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
      name: "Larry Lo",
      url: "https://www.linkedin.com/in/larry-lo-804a50165/",
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
