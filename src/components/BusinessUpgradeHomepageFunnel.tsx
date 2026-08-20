import Image from "next/image";
import { BriefcaseBusiness, ChevronRight, Clock3, MessagesSquare, UsersRound } from "lucide-react";
import { ConsultancyMainlineSection } from "@/components/ConsultancyMainlineSection";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getBniPowerTeamCopy } from "@/content/bni-power-team";
import { getHomepageContent } from "@/content/homepage";
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
  const bni = getBniPowerTeamCopy(locale);
  const problemIcons = [MessagesSquare, Clock3, ChevronRight, BriefcaseBusiness];
  const bniHref = withLocale(locale, "/bni-power-team");
  const caseStudiesHref = withLocale(locale, "/case-studies");
  const caseStudiesLabel =
    locale === "zh-hk"
      ? "睇企業系統案例及已核實公開分享"
      : locale === "zh-tw"
        ? "查看企業系統案例及已核實公開分享"
        : locale === "ja"
          ? "企業システム事例と登壇実績を見る"
          : locale === "de"
            ? "Enterprise-Systeme und Vorträge ansehen"
            : "See enterprise systems and verified speaking records";

  return (
    <>
      <SectionShell id="workflow-diagnosis">
        <SectionHeader title={c.problem.title} eyebrow={<p className="mb-3 text-sm font-semibold tracking-[0.08em] text-[color:var(--secondary-color)]">{c.problem.eyebrow}</p>} />
        <div className="grid gap-4 sm:grid-cols-2">
          {c.problem.items.map((item, index) => {
            const Icon = problemIcons[index] ?? MessagesSquare;
            return (
              <article
                key={item.title}
                className="ixp-card p-5 md:p-6"
              >
                <Icon className="h-6 w-6 text-[color:var(--pain-accent)]" aria-hidden />
                <h3 className="mt-4 text-xl font-semibold text-[color:var(--heading-foreground)]">{item.title}</h3>
                <p className="mt-2 text-base leading-8 text-[color:var(--text-secondary)]">{item.body}</p>
              </article>
            );
          })}
        </div>
        <div className="mt-6 rounded-[var(--card-radius)] border border-[color:var(--pain-accent)] bg-[color:var(--pain-accent-soft)] px-5 py-4">
          <p className="text-lg font-semibold text-[color:var(--heading-foreground)]">{c.problem.quote}</p>
        </div>
      </SectionShell>

      <SectionShell id="service-approach">
        <SectionHeader
          title={c.approach.title}
          subtitle={c.approach.intro}
          eyebrow={<p className="mb-3 text-sm font-semibold tracking-[0.08em] text-[color:var(--secondary-color)]">{c.approach.eyebrow}</p>}
        />
        <ol className="grid gap-4 md:grid-cols-3">
          {c.approach.steps.map((step, index) => (
            <li key={step.title} className="ixp-card p-5 md:p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--bg-secondary)] text-sm font-semibold text-[color:var(--brand-primary)]">
                  {index + 1}
                </span>
                <p className="text-sm font-semibold tracking-[0.08em] text-[color:var(--secondary-color)]">{step.label}</p>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-[color:var(--heading-foreground)]">{step.title}</h3>
              <p className="mt-2 text-base leading-8 text-[color:var(--text-secondary)]">{step.body}</p>
            </li>
          ))}
        </ol>
      </SectionShell>

      <SectionShell id="bni-power-team">
        <article className="ixp-card relative overflow-hidden p-6 md:p-8">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.14),transparent_55%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.12),transparent_50%)]"
          />
          <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_auto] lg:items-center">
            <div>
              <p className="mb-3 text-sm font-semibold tracking-[0.08em] text-[color:var(--secondary-color)]">
                {bni.cardEyebrow}
              </p>
              <div className="flex items-start gap-3">
                <UsersRound className="mt-1 h-7 w-7 shrink-0 text-[color:var(--brand-primary)]" aria-hidden />
                <h2 className="max-w-[22ch] text-[clamp(1.5rem,3.5vw,2.25rem)] font-bold tracking-[-0.02em] text-[color:var(--heading-foreground)]">
                  {bni.cardTitle}
                </h2>
              </div>
              <p className="mt-4 max-w-[68ch] text-base leading-8 text-[color:var(--text-secondary)]">
                {bni.cardBody}
              </p>
            </div>
            <div className="flex lg:justify-end">
              <Button href={bniHref} variant="primary">
                {bni.cardCta}
              </Button>
            </div>
          </div>
        </article>
      </SectionShell>

      <ConsultancyMainlineSection locale={locale} bookingHref={bookingHref} />

      <SectionShell id="service-modules">
        <SectionHeader
          title={c.services.title}
          eyebrow={<p className="mb-3 text-sm font-semibold tracking-[0.08em] text-[color:var(--secondary-color)]">{c.services.eyebrow}</p>}
        />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {c.services.items.map((item) => (
            <article key={item.title} className="ixp-card p-5 md:p-6">
              <h3 className="text-xl font-semibold text-[color:var(--heading-foreground)]">{item.title}</h3>
              <p className="mt-3 text-base leading-8 text-[color:var(--text-secondary)]">{item.body}</p>
            </article>
          ))}
        </div>
      </SectionShell>

      <SectionShell id="case-directions">
        <SectionHeader
          title={c.cases.title}
          subtitle={c.cases.intro}
          eyebrow={<p className="mb-3 text-sm font-semibold tracking-[0.08em] text-[color:var(--secondary-color)]">{c.cases.eyebrow}</p>}
        />
        <div className="grid gap-5">
          {c.cases.items.map((item) => (
            <article key={item.title} className="ixp-card p-5 md:p-6">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[color:var(--secondary-color)]">
                {item.industry}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-[color:var(--heading-foreground)]">{item.title}</h3>
              <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <div>
                  <p className="text-xs font-semibold text-[color:var(--pain-accent)]">{c.cases.beforeLabel}</p>
                  <p className="mt-2 text-sm leading-7 text-[color:var(--text-secondary)]">{item.before}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[color:var(--brand-primary)]">{c.cases.sprintLabel}</p>
                  <p className="mt-2 text-sm leading-7 text-[color:var(--text-secondary)]">{item.sprint}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[color:var(--secondary-color)]">{c.cases.afterLabel}</p>
                  <p className="mt-2 text-sm leading-7 text-[color:var(--text-secondary)]">{item.after}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[color:var(--heading-foreground)]">{c.cases.metricLabel}</p>
                  <p className="mt-2 text-sm leading-7 text-[color:var(--text-primary)]">{item.metric}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-6">
          <Button href={caseStudiesHref} variant="outline">
            {caseStudiesLabel}
          </Button>
        </div>
      </SectionShell>

      <SectionShell id="why-larry">
        <SectionHeader
          title={c.whyUs.title}
          subtitle={c.whyUs.intro}
          eyebrow={<p className="mb-3 text-sm font-semibold tracking-[0.08em] text-[color:var(--secondary-color)]">{c.whyUs.eyebrow}</p>}
        />
        <div className="overflow-hidden rounded-[var(--card-radius)] border border-[color:var(--border-light)]">
          <table className="w-full text-left text-sm">
            <tbody className="divide-y divide-[color:var(--border-light)]">
              {c.whyUs.rows.map((row) => (
                <tr key={row.opponent} className="bg-[color:var(--card-bg)]">
                  <td className="p-4 align-top font-medium text-[color:var(--text-secondary)] md:w-[42%]">{row.opponent}</td>
                  <td className="p-4 align-top font-semibold text-[color:var(--heading-foreground)]">{row.difference}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-base font-semibold leading-8 text-[color:var(--heading-foreground)]">{c.whyUs.punchline}</p>
      </SectionShell>

      <SectionShell id="about-larry">
        <div className="grid gap-8 lg:grid-cols-[minmax(280px,0.8fr)_minmax(0,1.2fr)] lg:items-center">
          <div className="ixp-card overflow-hidden p-2 md:p-3">
            <div className="relative aspect-[4/3] min-h-[320px] w-full overflow-hidden rounded-[var(--radius-md)]">
              <Image
                src="/mypresent.jpg"
                alt={c.about.portraitAlt}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 400px"
              />
            </div>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold tracking-[0.08em] text-[color:var(--secondary-color)]">{c.about.eyebrow}</p>
            <h2 className="max-w-[18ch] text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-[-0.02em] text-[color:var(--heading-foreground)]">
              {c.about.title}
            </h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-[color:var(--text-primary)]">{c.about.intro}</p>
            <div className="mt-4 grid gap-4">
              {c.about.body.map((paragraph) => (
                <p key={paragraph} className="text-base leading-8 text-[color:var(--text-secondary)]">
                  {paragraph}
                </p>
              ))}
            </div>
            <p className="mt-5 text-base font-semibold text-[color:var(--brand-primary)]">{c.about.identity}</p>
          </div>
        </div>
      </SectionShell>

      <FaqAccordion id="faq" title={c.faq.title} faqs={c.faq.items} defaultOpenAll />

      <SectionShell id="final-cta" className="mb-12">
        <div className="ixp-card p-6 md:p-10">
          <h2 className="max-w-[18ch] text-[clamp(1.9rem,4.5vw,3rem)] font-bold tracking-[-0.02em] text-[color:var(--heading-foreground)]">
            {c.finalCta.title}
          </h2>
          <p className="mt-4 max-w-[70ch] text-base leading-8 text-[color:var(--text-secondary)]">{c.finalCta.body}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button href={bookingHref} variant="primary">
              {c.finalCta.primary}
            </Button>
            <Button href={whatsappHref} variant="outline">
              {c.finalCta.secondary}
            </Button>
          </div>
        </div>
      </SectionShell>
    </>
  );
}
