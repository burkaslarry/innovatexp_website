"use client";

import Image from "next/image";
import { SitePageShell } from "@/components/SitePageShell";
import { getHomepageContent } from "@/content/homepage";
import { useLanguage } from "@/app/LanguageContext";

export function AboutPageContent() {
  const { locale } = useLanguage();
  const c = getHomepageContent(locale);

  return (
    <SitePageShell title={c.about.title}>
      <div className="grid gap-8 lg:grid-cols-[minmax(240px,0.7fr)_minmax(0,1.3fr)] lg:items-start">
        <div className="ixp-card overflow-hidden p-2">
          <div className="relative aspect-[4/3] min-h-[280px] w-full overflow-hidden rounded-[var(--radius-md)]">
            <Image
              src="/mypresent.jpg"
              alt={c.about.portraitAlt}
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 360px"
            />
          </div>
        </div>
        <div>
          <p className="text-lg font-semibold leading-8 text-[color:var(--text-primary)]">{c.about.intro}</p>
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

      <section className="mt-14">
        <h2 className="text-xl font-bold text-[color:var(--heading-foreground)]">{c.partnership.title}</h2>
        <p className="mt-2 text-sm leading-7 text-[color:var(--text-secondary)]">{c.partnership.intro}</p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {c.partnership.items.map((p) => (
            <li key={p.name} className="ixp-card flex items-center gap-3 p-4">
              {p.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.logo} alt="" className="h-10 w-16 object-contain" />
              ) : null}
              <div>
                <p className="font-semibold text-[color:var(--heading-foreground)]">{p.name}</p>
                <p className="text-sm text-[color:var(--text-secondary)]">{p.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </SitePageShell>
  );
}
