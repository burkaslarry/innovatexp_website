import type { Metadata } from "next";

const siteUrlMeta =
  process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://innovatexp.co";

export const metadata: Metadata = {
  title: "Blog | AI Consulting & Implementation Insights | InnovateXP",
  description:
    "Case studies, AI implementation tips, and insights from Hong Kong tech. CRM, events, and operations—practical reads for global business.",
  alternates: {
    canonical: `${siteUrlMeta}/blog`,
  },
  openGraph: {
    title: "Blog | AI Consulting & Implementation Insights | InnovateXP",
    description: "Case studies, AI implementation tips, and insights from Hong Kong tech. CRM, events, and operations.",
    url: `${siteUrlMeta}/blog`,
    siteName: "InnovateXP Limited",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
