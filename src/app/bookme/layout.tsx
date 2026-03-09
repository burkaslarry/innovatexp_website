import type { Metadata } from "next";

const siteUrlMeta =
  process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://innovatexp.co";

export const metadata: Metadata = {
  title: "Book a Free AI Consulting Call | InnovateXP – Hong Kong & Global",
  description:
    "Book a free 1:1 AI strategy call. Get a practical roadmap for CRM, events, or operations—no pitch deck, just next steps. Hong Kong & worldwide.",
  alternates: {
    canonical: `${siteUrlMeta}/bookme`,
  },
  openGraph: {
    title: "Book a Free AI Consulting Call | InnovateXP – Hong Kong & Global",
    description: "Book a free 1:1 AI strategy call. Get a practical roadmap for CRM, events, or operations—no pitch deck, just next steps.",
    url: `${siteUrlMeta}/bookme`,
    siteName: "InnovateXP Limited",
    images: [{ url: "/innovatexp_color_no_bg.svg", width: 1200, height: 630, alt: "InnovateXP – Book a Call" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a Free AI Consulting Call | InnovateXP – Hong Kong & Global",
    description: "Book a free 1:1 AI strategy call. Get a practical roadmap for CRM, events, or operations—no pitch deck, just next steps.",
  },
};

export default function BookMeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
