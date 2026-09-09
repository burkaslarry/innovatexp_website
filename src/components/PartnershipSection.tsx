import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";

type PartnershipItem = {
  name: string;
  desc: string;
  logo: string;
};

type PartnershipCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  items: PartnershipItem[];
};

export function PartnershipSection({ copy }: { copy: PartnershipCopy }) {
  return (
    <section id="partnership" className="mb-16 scroll-mt-[var(--header-offset)]">
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
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {copy.items.map((item) => (
          <article
            key={item.name}
            className="ixp-card flex items-center gap-4 p-5 md:p-6"
          >
            <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-[var(--radius-md)] border border-[color:var(--border-light)] bg-[color:var(--card-bg)]">
              {item.logo ? (
                <Image
                  src={item.logo}
                  alt={`${item.name} logo`}
                  width={56}
                  height={56}
                  className="object-contain"
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
              <p className="mt-1 text-sm leading-6 text-[color:var(--text-secondary)]">
                {item.desc}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
