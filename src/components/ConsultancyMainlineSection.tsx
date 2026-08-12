import { AddToInquiryButton } from "@/components/inquiry-cart/AddToInquiryButton";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getHomepageContent } from "@/content/homepage";
import { CONSULTANCY_PLAN_KEYS } from "@/content/pricing";
import type { InquiryCatalogItemId } from "@/content/inquiry-catalog";
import type { AppLocale } from "@/lib/i18n-routing";

export function ConsultancyMainlineSection({
  locale,
  bookingHref,
}: {
  locale: AppLocale;
  bookingHref: string;
}) {
  const c = getHomepageContent(locale);
  const plans = c.consultancy.plans;

  return (
    <section id="service-plans" className="mb-16 scroll-mt-[var(--header-offset)]">
      <SectionHeader
        title={c.consultancy.title}
        subtitle={c.consultancy.intro}
        eyebrow={
          <p className="mb-3 text-sm font-semibold tracking-[0.08em] text-[color:var(--secondary-color)]">
            {c.consultancy.eyebrow}
          </p>
        }
      />
      <p className="mb-6 max-w-[70ch] text-sm leading-7 text-[color:var(--text-secondary)]">
        {c.consultancy.fitNote}
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {plans.map((plan, index) => {
          const inquiryId = CONSULTANCY_PLAN_KEYS[index] as InquiryCatalogItemId;
          const featured = index === 0;
          return (
            <article
              key={plan.name}
              className={`ixp-card flex h-full flex-col p-5 md:p-6 ${
                featured ? "border-[color:var(--brand-primary)] ring-1 ring-[color:var(--brand-primary)]/30" : ""
              }`}
            >
              {featured ? (
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-[color:var(--brand-primary)]">
                  {c.consultancy.startingBadge}
                </p>
              ) : null}
              <h3 className="text-xl font-semibold text-[color:var(--heading-foreground)]">{plan.name}</h3>
              <p className="mt-2 text-2xl font-extrabold text-[color:var(--brand-primary)]">{plan.priceLabel}</p>
              <p className="mt-3 flex-1 text-base leading-8 text-[color:var(--text-secondary)]">{plan.body}</p>
              <ul className="mt-4 grid gap-2">
                {plan.deliverables.map((item) => (
                  <li key={item} className="text-sm leading-7 text-[color:var(--text-primary)]">
                    · {item}
                  </li>
                ))}
              </ul>
              <div className="mt-5 grid gap-2">
                <AddToInquiryButton itemId={inquiryId} />
                <Button href={bookingHref} variant={featured ? "primary" : "outline"}>
                  {plan.cta}
                </Button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
