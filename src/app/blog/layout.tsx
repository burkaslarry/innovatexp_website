import type { Metadata } from "next";

const siteUrlMeta =
  process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://innovatexp.co";

export const metadata: Metadata = {
  title: "Blog | InnovateXP",
  description:
    "Updates and practical notes on AI, CRM, event operations, and implementation work.",
  alternates: {
    canonical: `${siteUrlMeta}/blog`,
  },
  openGraph: {
    title: "Blog | InnovateXP",
    description: "Updates and practical notes on AI, CRM, event operations, and implementation work.",
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
