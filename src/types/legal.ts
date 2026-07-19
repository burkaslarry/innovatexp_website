export type LegalSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type LegalDocumentContent = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  breadcrumb: string;
  title: string;
  effectiveDate: string;
  lastUpdated: string;
  intro: string[];
  sections: LegalSection[];
  contactTitle: string;
  contactLines: string[];
};

/** @deprecated Use LegalDocumentContent */
export type PrivacyPolicyContent = LegalDocumentContent & {
  slug: "innovatexp" | "zomate-system";
};
