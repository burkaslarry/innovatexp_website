import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { HomepageContent } from "@/content/homepage";
import type { AppLocale } from "@/lib/i18n-routing";

const POSTER_LOCALE_DIR: Record<AppLocale, string> = {
  en: "en",
  "zh-hk": "zh-hk",
  "zh-tw": "zh-tw",
  ja: "ja",
  de: "en",
};

export function ProductPackagesSection({
  locale,
  content,
}: {
  locale: AppLocale;
  content: HomepageContent["products"];
}) {
  const dir = POSTER_LOCALE_DIR[locale] ?? "en";

  return (
    <section id="product-packages" className="mb-16 scroll-mt-[var(--header-offset)]">
      <SectionHeader
        title={content.title}
        subtitle={content.intro}
        eyebrow={
          <p className="mb-3 text-sm font-semibold tracking-[0.08em] text-[color:var(--secondary-color)]">
            {content.eyebrow}
          </p>
        }
      />
      <div className="grid gap-6 lg:grid-cols-2">
        {content.items.map((item) => (
          <article key={item.id} className="ixp-card overflow-hidden">
            <div className="relative aspect-[3/4] w-full bg-[color:var(--bg-secondary)] sm:aspect-[4/5]">
              <Image
                src={`/posters/${dir}/${item.poster}`}
                alt={`${item.name} — ${item.tagline}`}
                fill
                className="object-contain object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="space-y-3 p-5 md:p-6">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[color:var(--secondary-color)]">
                {item.eyebrow}
              </p>
              <h3 className="text-xl font-semibold text-[color:var(--heading-foreground)]">{item.name}</h3>
              <p className="text-base font-medium text-[color:var(--heading-foreground)]">{item.tagline}</p>
              <p className="text-sm font-semibold text-[color:var(--brand-primary)]">{item.price}</p>
              <p className="text-base leading-8 text-[color:var(--text-secondary)]">{item.body}</p>
              <ul className="space-y-1.5 text-sm leading-7 text-[color:var(--text-secondary)]">
                {item.points.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--brand-primary)]" aria-hidden />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-6 rounded-[var(--card-radius)] border border-[color:var(--border-light)] bg-[color:var(--bg-secondary)] px-5 py-4">
        <p className="text-base font-semibold text-[color:var(--heading-foreground)]">{content.securityTitle}</p>
        <p className="mt-1 text-sm leading-7 text-[color:var(--text-secondary)]">{content.securityNote}</p>
      </div>
    </section>
  );
}
