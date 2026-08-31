import { AddToInquiryButton } from "@/components/inquiry-cart/AddToInquiryButton";
import type { InquiryCatalogItemId } from "@/content/inquiry-catalog";
import type { SystemCareCopy } from "@/content/homepage";

const SYSTEM_CARE_INQUIRY_IDS = [
  "systemCareEssential",
  "systemCareGrowth",
  "systemCarePriority",
] as const satisfies readonly InquiryCatalogItemId[];

/*
 * Revenue line A — care for systems already in production.
 * Response time is acknowledgement and triage, not a promised fix.
 */
export function SystemCarePanel({ copy }: { copy: SystemCareCopy }) {
  return (
    <section className="ixp-card p-5 md:p-7">
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-[color:var(--secondary-color)]">
        {copy.eyebrow}
      </p>
      <h2 className="mt-2 text-2xl font-bold text-[color:var(--heading-foreground)]">{copy.title}</h2>
      <p className="mt-3 leading-7 text-[color:var(--text-secondary)]">{copy.intro}</p>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {copy.tiers.map((tier, index) => (
          <SystemCareTierCard
            key={tier.name}
            tier={tier}
            inquiryId={SYSTEM_CARE_INQUIRY_IDS[index] ?? "systemCareEssential"}
          />
        ))}
      </div>
      <p className="mt-5 rounded-xl border border-amber-300/70 bg-amber-50 p-4 text-sm leading-7 text-amber-950 dark:border-amber-500/30 dark:bg-amber-950/20 dark:text-amber-100">
        {copy.boundary}
      </p>
    </section>
  );
}

function SystemCareTierCard({
  tier,
  inquiryId,
}: {
  tier: SystemCareCopy["tiers"][number];
  inquiryId: InquiryCatalogItemId;
}) {
  return (
    <article className="flex flex-col rounded-2xl border border-[color:var(--border-light)] bg-[color:var(--bg-secondary)] p-4">
      <h3 className="font-bold text-[color:var(--heading-foreground)]">{tier.name}</h3>
      <p className="mt-1 text-lg font-extrabold text-[color:var(--brand-primary)]">{tier.price}</p>
      <p className="mt-2 text-sm font-semibold text-[color:var(--heading-foreground)]">{tier.response}</p>
      <ul className="mt-3 mb-4 flex-1 space-y-2 text-sm leading-6 text-[color:var(--text-secondary)]">
        {tier.points.map((point) => (
          <li key={point}>· {point}</li>
        ))}
      </ul>
      <AddToInquiryButton itemId={inquiryId} size="small" />
    </article>
  );
}
