import { SectionHeader } from "@/components/ui/SectionHeader";
import type { ProductPackagesCopy } from "@/content/homepage";
import type { AppLocale } from "@/lib/i18n-routing";
import { PosterGrid } from "@/components/product-packages/PosterGrid";
import { ReadinessPanel } from "@/components/product-packages/ReadinessPanel";
import { SystemCarePanel } from "@/components/product-packages/SystemCarePanel";

/*
 * Product packages — policy at the top, details below (Clean Code,
 * Robert C. Martin, Stepdown Rule).
 *
 * This section names the four jobs a buyer must see:
 *  1. Poster merchandising for product trials
 *  2. System Care for already-live systems
 *  3. Snapshot downsell + optional education quote
 *  4. A security note shared by every product
 *
 * Each job is a sibling component. Do not fold a new offer into
 * an existing sibling unless that sibling already owns the job.
 */
export function ProductPackagesSection({
  locale,
  content,
}: {
  locale: AppLocale;
  content: ProductPackagesCopy;
}) {
  return (
    <section id="product-packages" className="mb-16 scroll-mt-[var(--header-offset)]">
      <PackagesHeader content={content} />
      <PosterGrid locale={locale} items={content.items} />
      <CareAndSnapshotRow systemCare={content.systemCare} readiness={content.readiness} />
      <SecurityNote title={content.securityTitle} note={content.securityNote} />
    </section>
  );
}

function PackagesHeader({ content }: { content: ProductPackagesCopy }) {
  return (
    <SectionHeader
      title={content.title}
      subtitle={content.intro}
      eyebrow={
        <p className="mb-3 text-sm font-semibold tracking-[0.08em] text-[color:var(--secondary-color)]">
          {content.eyebrow}
        </p>
      }
    />
  );
}

function CareAndSnapshotRow({
  systemCare,
  readiness,
}: {
  systemCare: ProductPackagesCopy["systemCare"];
  readiness: ProductPackagesCopy["readiness"];
}) {
  return (
    <div className="mt-10 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
      <SystemCarePanel copy={systemCare} />
      <ReadinessPanel copy={readiness} />
    </div>
  );
}

function SecurityNote({ title, note }: { title: string; note: string }) {
  return (
    <div className="mt-6 rounded-[var(--card-radius)] border border-[color:var(--border-light)] bg-[color:var(--bg-secondary)] px-5 py-4">
      <p className="text-base font-semibold text-[color:var(--heading-foreground)]">{title}</p>
      <p className="mt-1 text-sm leading-7 text-[color:var(--text-secondary)]">{note}</p>
    </div>
  );
}
