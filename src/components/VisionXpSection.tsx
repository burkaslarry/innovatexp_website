import { Eye } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { VisionXpCopy } from "@/content/homepage";
import { VISIONXP_DEMO_URL, VISIONXP_PAGE_PATH } from "@/content/visionxp";
import type { AppLocale } from "@/lib/i18n-routing";
import { withLocale } from "@/lib/i18n-routing";

/*
 * VisionXP homepage block — tech demo only.
 * Legal/compliance disclaimer must stay visible on every surface.
 */
export function VisionXpComplianceNotice({ copy }: { copy: VisionXpCopy["compliance"] }) {
  return (
    <aside
      className="rounded-[var(--card-radius)] border border-[color:var(--pain-accent)] bg-[color:var(--pain-accent-soft)] px-5 py-4"
      role="note"
      aria-label={copy.title}
    >
      <p className="text-sm font-bold tracking-[0.04em] text-[color:var(--heading-foreground)]">{copy.title}</p>
      <p className="mt-2 text-sm font-semibold leading-7 text-[color:var(--heading-foreground)]">{copy.lead}</p>
      <ul className="mt-4 space-y-3">
        {copy.items.map((item) => (
          <li key={item.title}>
            <p className="text-sm font-semibold text-[color:var(--heading-foreground)]">{item.title}</p>
            <p className="mt-1 text-sm leading-7 text-[color:var(--text-secondary)]">{item.body}</p>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export function VisionXpSection({
  locale,
  copy,
  showPageCta = true,
}: {
  locale: AppLocale;
  copy: VisionXpCopy;
  showPageCta?: boolean;
}) {
  const pageHref = withLocale(locale, VISIONXP_PAGE_PATH);

  return (
    <section id="visionxp" className="mb-16 scroll-mt-[var(--header-offset)]">
      <SectionHeader
        title={copy.title}
        subtitle={copy.intro}
        eyebrow={
          <p className="mb-3 text-sm font-semibold tracking-[0.08em] text-[color:var(--secondary-color)]">
            {copy.eyebrow}
          </p>
        }
      />
      <article className="ixp-card overflow-hidden">
        <div className="grid gap-0 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="p-5 md:p-8">
            <div className="flex items-start gap-3">
              <Eye className="mt-1 h-7 w-7 shrink-0 text-[color:var(--brand-primary)]" aria-hidden />
              <div>
                <h3 className="text-2xl font-bold text-[color:var(--heading-foreground)]">{copy.tagline}</h3>
                <p className="mt-2 text-sm font-semibold text-[color:var(--brand-primary)]">{copy.price}</p>
              </div>
            </div>
            <ul className="mt-5 space-y-2 text-sm leading-7 text-[color:var(--text-secondary)]">
              {copy.points.map((point) => (
                <li key={point} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--brand-primary)]" aria-hidden />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={VISIONXP_DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center justify-center rounded-[var(--btn-radius)] px-6 py-3 text-center text-base btn-brand"
              >
                {copy.demoCta}
              </a>
              {showPageCta ? (
                <Button href={pageHref} variant="outline">
                  {copy.pageCta}
                </Button>
              ) : null}
            </div>
            <p className="mt-4 text-xs leading-6 text-[color:var(--text-tertiary)]">{copy.note}</p>
          </div>
          <div className="grid gap-4 border-t border-[color:var(--border-light)] bg-[color:var(--bg-secondary)] p-5 md:p-8 lg:border-l lg:border-t-0">
            {copy.portals.map((portal) => (
              <div key={portal.name} className="rounded-2xl border border-[color:var(--border-light)] bg-[color:var(--card-bg)] p-4">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[color:var(--secondary-color)]">
                  {portal.name}
                </p>
                <p className="mt-2 text-sm leading-7 text-[color:var(--text-secondary)]">{portal.body}</p>
              </div>
            ))}
          </div>
        </div>
      </article>
      <div className="mt-6">
        <VisionXpComplianceNotice copy={copy.compliance} />
      </div>
    </section>
  );
}
