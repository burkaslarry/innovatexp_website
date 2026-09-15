import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getSiteUrl } from "@/lib/site-url";

type PartnershipItem = {
  name: string;
  desc: string;
  logo: string;
  href?: string;
};

type PartnershipCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  items: PartnershipItem[];
};

export function PartnershipSection({ copy }: { copy: PartnershipCopy }) {
  const siteUrl = getSiteUrl();
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: copy.title,
    description: copy.intro,
    numberOfItems: copy.items.length,
    itemListElement: copy.items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Organization",
        name: item.name,
        description: item.desc,
        ...(item.href ? { url: item.href } : {}),
        ...(item.logo
          ? {
              logo: item.logo.startsWith("http") ? item.logo : `${siteUrl}${item.logo}`,
            }
          : {}),
      },
    })),
  };

  return (
    <section
      id="partnership"
      className="mb-16 scroll-mt-[var(--header-offset)]"
      aria-label={copy.title}
      data-geo-section="partnership"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <SectionHeader
        title={copy.title}
        subtitle={copy.intro}
        align="left"
        eyebrow={
          <p className="mb-3 text-sm font-semibold tracking-[0.08em] text-[color:var(--secondary-color)]">
            {copy.eyebrow}
          </p>
        }
      />
      <p className="sr-only" data-geo-answer>
        {copy.intro} Partners include: {copy.items.map((i) => i.name).join(", ")}.
      </p>
      <ul className="grid list-none gap-4 p-0 sm:grid-cols-2 xl:grid-cols-3">
        {copy.items.map((item) => {
          const inner = (
            <>
              <div className="flex h-16 w-28 shrink-0 items-center justify-center overflow-hidden rounded-[var(--radius-md)] border border-[color:var(--border-light)] bg-white px-2">
                {item.logo ? (
                  <Image
                    src={item.logo}
                    alt={`${item.name} logo`}
                    width={112}
                    height={64}
                    className="max-h-14 w-auto max-w-full object-contain"
                  />
                ) : (
                  <span className="text-lg font-bold leading-tight text-[color:var(--heading-foreground)]">
                    {item.name
                      .split(" ")
                      .slice(0, 2)
                      .map((w) => w[0])
                      .join("")
                      .toUpperCase()}
                  </span>
                )}
              </div>
              <div className="min-w-0">
                <h3 className="text-base font-semibold text-[color:var(--heading-foreground)]">
                  {item.name}
                </h3>
                <p className="mt-1 text-sm leading-6 text-[color:var(--text-secondary)]" data-geo-answer>
                  {item.desc}
                </p>
              </div>
            </>
          );

          if (item.href) {
            return (
              <li key={item.name}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ixp-card flex h-full items-center gap-4 p-5 transition hover:border-[color:var(--brand-primary)] md:p-6"
                >
                  {inner}
                </a>
              </li>
            );
          }

          return (
            <li key={item.name}>
              <article className="ixp-card flex h-full items-center gap-4 p-5 md:p-6">{inner}</article>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
