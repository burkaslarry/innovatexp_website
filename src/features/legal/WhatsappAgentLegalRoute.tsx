import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  whatsappAgentDataPolicy,
  whatsappAgentDeletion,
  whatsappAgentPrivacy,
  whatsappAgentTerms,
} from "@/content/legal-whatsapp-agent";
import { LegalPolicyPage } from "@/features/legal/LegalPolicyPage";
import { localeAlternates } from "@/lib/alternate-metadata";
import { isValidLocale, type AppLocale } from "@/lib/i18n-routing";
import { getSiteUrl } from "@/lib/site-url";
import type { LegalDocumentContent } from "@/types/legal";

const OG_IMAGE = "/opengraph-image" as const;

const DOCS = {
  privacy: { path: "/whatsapp-agent/privacy-policy", content: whatsappAgentPrivacy },
  terms: { path: "/whatsapp-agent/terms", content: whatsappAgentTerms },
  "data-policy": { path: "/whatsapp-agent/data-policy", content: whatsappAgentDataPolicy },
  "data-deletion": { path: "/whatsapp-agent/data-deletion", content: whatsappAgentDeletion },
} as const;

export type WhatsappAgentDoc = keyof typeof DOCS;

export async function whatsappAgentMetadata(locale: string, doc: WhatsappAgentDoc): Promise<Metadata> {
  if (!isValidLocale(locale)) return {};
  const { path, content } = DOCS[doc];
  const alternates = localeAlternates(locale, path);
  const canonical =
    typeof alternates?.canonical === "string" ? alternates.canonical : `${getSiteUrl()}/${locale}${path}`;
  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates,
    robots: { index: true, follow: true },
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      url: canonical,
      siteName: "InnovateXP Limited",
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: content.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: content.metaTitle,
      description: content.metaDescription,
      images: [OG_IMAGE],
    },
  };
}

export function WhatsappAgentLegalPage({ locale, doc }: { locale: string; doc: WhatsappAgentDoc }) {
  if (!isValidLocale(locale)) notFound();
  const content: LegalDocumentContent = DOCS[doc].content;
  return <LegalPolicyPage locale={"en" satisfies AppLocale} content={content} homeLabel="Home" />;
}
