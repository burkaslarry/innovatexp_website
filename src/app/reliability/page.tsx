/* F13: Reliability (server) - Metadata and Article JSON-LD for the reliability manifesto route. */
import type { Metadata } from "next";
import { ReliabilityContent } from "./ReliabilityContent";

export const metadata: Metadata = {
  title: "Why InnovateXP doesn't build AI autopilot hype | Reliable AI workflows",
  description:
    "InnovateXP builds deterministic AI-augmented workflows for Hong Kong SMEs: cloud platform support, on-premise options, human checkpoints, and practical AI training.",
};

export default function ReliabilityPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Why InnovateXP doesn't build AI autopilot hype",
    "author": {
      "@type": "Person",
      "name": "Larry Lo",
      "url": "https://www.linkedin.com/in/larry-lo-804a50165/",
    },
    "publisher": {
      "@type": "Organization",
      "name": "InnovateXP Limited",
      "url": "https://www.innovatexp.co",
    },
    "about": ["AI reliability", "AI-augmented workflows", "Azure OpenAI", "Alibaba Cloud", "GCP", "AWS", "On-premise AI deployment"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <ReliabilityContent />
    </>
  );
}
