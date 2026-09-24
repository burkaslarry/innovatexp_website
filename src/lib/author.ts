/**
 * Central author / founder entity for SEO, GEO, and JSON-LD.
 * Single source for sameAs links and citation-friendly author facts.
 */
export const AUTHOR = {
  name: "Larry Lo",
  alternateName: ["InnovateXP Larry Lo", "AI 商業顧問 Larry Lo"],
  jobTitle: "AI Business Consultant",
  jobTitleZh: "AI 商業顧問",
  organization: "InnovateXP Limited",
  /** Public author profile on Threads (primary social for entity signals). */
  threadsUrl: "https://www.threads.com/@waqarr_alii",
  linkedInPersonal: "https://www.linkedin.com/in/innovatexp/",
  linkedInCompany: "https://www.linkedin.com/company/innovatexp",
  email: "info@innovatexp.co",
  /** Years of IT delivery — citeable on site and in llms files. */
  yearsExperience: 14,
  alumniOf: "Hong Kong Science and Technology Parks Corporation (HKSTP Incubation Alumni)",
} as const;

/** All verified public profiles for Person / Organization founder sameAs. */
export function authorSameAs(): string[] {
  return [
    AUTHOR.threadsUrl,
    AUTHOR.linkedInPersonal,
    AUTHOR.linkedInCompany,
  ];
}

export function authorCitationLine(locale: "zh" | "en"): string {
  if (locale === "zh") {
    return `${AUTHOR.name}（${AUTHOR.jobTitleZh}）— InnovateXP Limited 創辦人；${AUTHOR.yearsExperience} 年 IT 交付經驗；Threads：${AUTHOR.threadsUrl}`;
  }
  return `${AUTHOR.name}, ${AUTHOR.jobTitle} and founder of ${AUTHOR.organization}; ${AUTHOR.yearsExperience} years IT delivery; Threads: ${AUTHOR.threadsUrl}`;
}
