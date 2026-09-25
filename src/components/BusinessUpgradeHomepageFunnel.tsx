import { BriefcaseBusiness, ChevronRight, Clock3, MessagesSquare } from "lucide-react";
import { FaqAccordion } from "@/components/FaqAccordion";
import { BookingCtaButton } from "@/components/BookingCtaButton";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getHomepageContent } from "@/content/homepage";
import { primaryCtaLabel } from "@/content/cta-config";
import { secondaryWhatsAppLabel } from "@/content/cta-config";
import type { AppLocale } from "@/lib/i18n-routing";
import { withLocale } from "@/lib/i18n-routing";

function SectionShell({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`mb-16 scroll-mt-[var(--header-offset)] ${className}`}>
      {children}
    </section>
  );
}

/**
 * Conversion homepage: exactly 6 sections after Hero.
 * 1 Hero (parent) · 2 Pain · 3 Method · 4 Case · 5 Why me · 6 FAQ + final CTA
 */
export function BusinessUpgradeHomepageFunnel({
  locale,
  bookingHref,
  whatsappHref,
}: {
  locale: AppLocale;
  bookingHref: string;
  whatsappHref: string;
}) {
  const c = getHomepageContent(locale);
  const ctaLabel = primaryCtaLabel(locale);
  const problemIcons = [MessagesSquare, Clock3, ChevronRight, BriefcaseBusiness];
  const aboutHref = withLocale(locale, "/about");
  const featured = c.cases.items[0];
  const scenarios = c.cases.items.slice(1);

  return (
    <>
      {/* Section 2 — 痛點 */}
      <SectionShell id="pain-points">
        <SectionHeader
          title={c.problem.title}
          eyebrow={
            <p className="mb-3 text-sm font-semibold tracking-[0.08em] text-[color:var(--secondary-color)]">
              {c.problem.eyebrow}
            </p>
          }
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {c.problem.items.map((item, index) => {
            const Icon = problemIcons[index] ?? MessagesSquare;
            return (
              <article key={item.title} className="ixp-card p-5 md:p-6">
                <Icon className="h-6 w-6 text-[color:var(--pain-accent)]" aria-hidden />
                <h3 className="mt-4 text-xl font-semibold text-[color:var(--heading-foreground)]">
                  {item.title}
                </h3>
                <p className="mt-2 text-base leading-7 text-[color:var(--text-secondary)]">{item.body}</p>
              </article>
            );
          })}
        </div>
      </SectionShell>

      {/* Section 3 — 業務聽診方法 */}
      <SectionShell id="method">
        <SectionHeader
          title={c.approach.title}
          subtitle={c.approach.intro}
          eyebrow={
            <p className="mb-3 text-sm font-semibold tracking-[0.08em] text-[color:var(--secondary-color)]">
              {c.approach.eyebrow}
            </p>
          }
        />
        <ol className="grid gap-4 md:grid-cols-3">
          {c.approach.steps.map((step, index) => (
            <li key={step.title} className="ixp-card p-5 md:p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--bg-secondary)] text-sm font-semibold text-[color:var(--brand-primary)]">
                  {index + 1}
                </span>
                <p className="text-sm font-semibold tracking-[0.08em] text-[color:var(--secondary-color)]">
                  {step.label}
                </p>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-[color:var(--heading-foreground)]">
                {step.title}
              </h3>
              <p className="mt-2 text-base leading-7 text-[color:var(--text-secondary)]">{step.body}</p>
              {step.note ? (
                <p className="mt-3 text-sm font-medium leading-6 text-[color:var(--heading-foreground)]">
                  {step.note}
                </p>
              ) : null}
            </li>
          ))}
        </ol>
      </SectionShell>

      {/* Section 4 — 一個真實案例 + 情境參考 */}
      <SectionShell id="case-study">
        <SectionHeader
          title={c.cases.title}
          subtitle={c.cases.intro}
          eyebrow={
            <p className="mb-3 text-sm font-semibold tracking-[0.08em] text-[color:var(--secondary-color)]">
              {c.cases.eyebrow}
            </p>
          }
        />
        {featured ? (
          <article className="ixp-card p-5 md:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[color:var(--secondary-color)]">
              {featured.industry}
            </p>
            <h3 className="mt-2 text-xl font-semibold text-[color:var(--heading-foreground)] md:text-2xl">
              {featured.title}
            </h3>
            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div>
                <p className="text-xs font-semibold text-[color:var(--pain-accent)]">{c.cases.beforeLabel}</p>
                <p className="mt-2 text-sm leading-7 text-[color:var(--text-secondary)]">{featured.before}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-[color:var(--brand-primary)]">{c.cases.sprintLabel}</p>
                <p className="mt-2 text-sm leading-7 text-[color:var(--text-secondary)]">{featured.sprint}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-[color:var(--secondary-color)]">{c.cases.afterLabel}</p>
                <p className="mt-2 text-sm leading-7 text-[color:var(--text-secondary)]">{featured.after}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-[color:var(--heading-foreground)]">{c.cases.metricLabel}</p>
                <p className="mt-2 text-sm leading-7 text-[color:var(--text-primary)]">{featured.metric}</p>
              </div>
            </div>
            <div className="mt-6">
              <BookingCtaButton href={bookingHref} placement="case_study" className="px-6">
                {ctaLabel}
              </BookingCtaButton>
            </div>
          </article>
        ) : null}

        {scenarios.length > 0 ? (
          <div className="mt-8">
            <p className="mb-4 text-sm font-semibold tracking-[0.08em] text-[color:var(--secondary-color)]">
              {c.cases.scenarioLabel}
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              {scenarios.map((item) => (
                <article key={item.title} className="ixp-card p-5">
                  <p className="text-xs font-semibold text-[color:var(--text-tertiary)]">{item.industry}</p>
                  <h3 className="mt-2 text-base font-semibold text-[color:var(--heading-foreground)]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[color:var(--text-secondary)]">{item.before}</p>
                </article>
              ))}
            </div>
          </div>
        ) : null}
      </SectionShell>

      {/* Section 5 — 為咩揀我 */}
      <SectionShell id="why-me">
        <SectionHeader
          title={c.whyUs.title}
          subtitle={c.whyUs.intro}
          eyebrow={
            <p className="mb-3 text-sm font-semibold tracking-[0.08em] text-[color:var(--secondary-color)]">
              {c.whyUs.eyebrow}
            </p>
          }
        />
        <div className="overflow-hidden rounded-[var(--card-radius)] border border-[color:var(--border-light)]">
          <table className="w-full text-left text-sm">
            <tbody className="divide-y divide-[color:var(--border-light)]">
              {c.whyUs.rows.map((row) => (
                <tr key={row.opponent} className="bg-[color:var(--card-bg)]">
                  <td className="p-4 align-top font-medium text-[color:var(--text-secondary)] md:w-[42%]">
                    {row.opponent}
                  </td>
                  <td className="p-4 align-top font-semibold text-[color:var(--heading-foreground)]">
                    {row.difference}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 max-w-[70ch]">
          <p className="text-base leading-8 text-[color:var(--text-secondary)]">{c.whyUs.aboutBlurb}</p>
          <a
            href={aboutHref}
            className="mt-3 inline-flex text-sm font-semibold text-[color:var(--brand-primary)] underline-offset-4 hover:underline"
          >
            {c.whyUs.aboutLinkLabel}
          </a>
        </div>
      </SectionShell>

      {/* Section 6 — FAQ + final CTA */}
      <FaqAccordion id="faq" title={c.faq.title} faqs={c.faq.items} defaultOpenAll={false} />

      <SectionShell id="final-cta" className="mb-12">
        <div className="ixp-card border-[color:var(--brand-primary)] p-6 ring-1 ring-[color:var(--brand-primary)]/25 md:p-10">
          <h2 className="max-w-[22ch] text-[clamp(1.9rem,4.5vw,3rem)] font-bold tracking-[-0.02em] text-[color:var(--heading-foreground)]">
            {c.finalCta.title}
          </h2>
          {c.finalCta.body?.trim() ? (
            <p className="mt-4 max-w-[70ch] text-base leading-8 text-[color:var(--text-secondary)]">
              {c.finalCta.body}
            </p>
          ) : null}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <BookingCtaButton href={bookingHref} placement="final_cta" className="px-6">
              {ctaLabel}
            </BookingCtaButton>
            <a
              href={whatsappHref}
              className="inline-flex min-h-[48px] items-center justify-center rounded-[var(--btn-radius)] border border-[color:var(--border-medium)] px-6 py-3 text-base font-semibold text-[color:var(--heading-foreground)]"
            >
              {secondaryWhatsAppLabel(locale)}
            </a>
          </div>
        </div>
      </SectionShell>

      {c.partnership.items.some((p) => p.logo) ? (
        <div className="mb-10">
          <p className="mb-4 text-center text-sm font-semibold text-[color:var(--heading-foreground)]">
            {c.partnership.eyebrow}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 opacity-70" aria-label={c.partnership.eyebrow}>
          {c.partnership.items
            .filter((p) => p.logo)
            .map((p) => (
              <a
                key={p.name}
                href={p.href || "#"}
                target={p.href ? "_blank" : undefined}
                rel={p.href ? "noopener noreferrer" : undefined}
                className="relative h-8 w-24 grayscale transition hover:grayscale-0"
                title={p.name}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.logo} alt="" className="h-full w-full object-contain" />
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}
