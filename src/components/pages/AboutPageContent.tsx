"use client";

import Image from "next/image";
import Link from "next/link";
import { SitePageShell } from "@/components/SitePageShell";
import { getHomepageContent } from "@/content/homepage";
import { getSiteExperience } from "@/content/site-experience";
import { getSpeakingRecords } from "@/content/case-studies";
import { AUTHOR } from "@/lib/author";
import { withLocale } from "@/lib/i18n-routing";
import { useLanguage } from "@/app/LanguageContext";

export function AboutPageContent() {
  const { locale } = useLanguage();
  const c = getHomepageContent(locale);
  const experience = getSiteExperience(locale);

  return (
    <SitePageShell title={experience.aboutTitle}>
      <div className="grid gap-8 lg:grid-cols-[minmax(240px,0.7fr)_minmax(0,1.3fr)] lg:items-start">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image src="/mypresent.jpg" alt={c.about.portraitAlt} fill className="object-cover object-center" sizes="(max-width: 1024px) 100vw, 360px" />
        </div>
        <div>
          <p data-geo-answer className="text-lg leading-8">{experience.aboutIntro}</p>
          <p className="mt-5 text-base leading-8 text-[color:var(--text-secondary)]">{experience.aboutBoundary}</p>
          <div className="mt-6 flex flex-wrap gap-6">
            <a href={AUTHOR.linkedInPersonal} rel="noopener noreferrer" target="_blank" className="inline-flex min-h-11 items-center underline underline-offset-4">{experience.profile}</a>
            <Link href={withLocale(locale, "/case-studies")} className="inline-flex min-h-11 items-center underline underline-offset-4">{experience.cases}</Link>
          </div>
        </div>
      </div>
      <section className="mt-14">
        <h2 className="text-2xl font-semibold">{experience.speakingTitle}</h2>
        <p className="mt-3 max-w-3xl leading-8 text-[color:var(--text-secondary)]">{experience.speakingIntro}</p>
        <ol className="mt-6 divide-y divide-[#c8bba9] border-y border-[#c8bba9]">
          {getSpeakingRecords(locale).map(record => (
            <li key={`${record.date}-${record.event}`} className="grid gap-3 py-5 sm:grid-cols-[8rem_1fr]">
              <time dateTime={record.date} className="font-sans text-sm">{record.date}</time>
              <div><h3 className="text-lg font-semibold">{record.event}</h3><p className="mt-2 leading-7">{record.topic}</p><p className="mt-1 text-sm text-[color:var(--text-secondary)]">{record.role}</p></div>
            </li>
          ))}
        </ol>
      </section>
      <section className="mt-14">
        <h2 className="text-2xl font-semibold">{c.partnership.title}</h2>
        <p className="mt-3 text-sm leading-7 text-[color:var(--text-secondary)]">{c.partnership.intro}</p>
        <ul className="mt-6 grid gap-6 sm:grid-cols-2">
          {c.partnership.items.map(partner => <li key={partner.name} className="border-t border-[#c8bba9] pt-4"><h3 className="font-semibold">{partner.name}</h3><p className="mt-2 text-sm leading-7 text-[color:var(--text-secondary)]">{partner.desc}</p></li>)}
        </ul>
      </section>
    </SitePageShell>
  );
}
