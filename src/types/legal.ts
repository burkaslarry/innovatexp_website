export type LegalSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type PrivacyPolicyContent = {
  slug: "innovatexp" | "zomate-system";
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
