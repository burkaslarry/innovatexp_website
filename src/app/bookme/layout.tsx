import type { Metadata } from "next";

const siteUrlMeta =
  process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://innovatexp.co";

export const metadata: Metadata = {
  title: "Book a Consultation | InnovateXP",
  description:
    "Book a consultation to review your CRM, event, or AI workflow and define next steps.",
  alternates: {
    canonical: `${siteUrlMeta}/bookme`,
  },
  openGraph: {
    title: "Book a Consultation | InnovateXP",
    description: "Book a consultation to review your CRM, event, or AI workflow and define next steps.",
    url: `${siteUrlMeta}/bookme`,
    siteName: "InnovateXP Limited",
    images: [{ url: "/innovatexp_color_no_bg.svg", width: 1200, height: 630, alt: "InnovateXP – Book a Call" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a Consultation | InnovateXP",
    description: "Book a consultation to review your CRM, event, or AI workflow and define next steps.",
  },
};

export default function BookMeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
