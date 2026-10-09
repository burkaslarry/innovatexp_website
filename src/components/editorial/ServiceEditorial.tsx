import type { ReactNode } from "react";
import Link from "next/link";
import { EditorialChrome } from "@/components/editorial/EditorialChrome";
import { ScrollReveal } from "@/components/ScrollReveal";

export function ServiceEditorial({
  eyebrow,
  title,
  answer,
  children,
}: {
  eyebrow: string;
  title: string;
  answer: string;
  children: ReactNode;
}) {
  return (
    <EditorialChrome>
    <main className="bg-[color:var(--bg-base)] text-[color:var(--text-primary)]">
      <article className="mx-auto max-w-5xl px-5 pb-28 pt-12 md:px-8 md:pt-16">
        <header>
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[color:var(--brand-green)]">{eyebrow}</p>
          <h1 className="mt-5 max-w-[18ch] font-[family-name:var(--font-heading)] text-[2.5rem] leading-[1.08] tracking-[-0.03em] md:text-[3.75rem]">
            {title}
          </h1>
          <p
            data-geo-answer=""
            className="mt-8 max-w-2xl border-l-2 border-[color:var(--pain-accent)] pl-5 text-lg leading-8 text-[color:var(--text-secondary)] md:text-xl"
          >
            {answer}
          </p>
        </header>
        <div className="mt-16 flex flex-col gap-14 md:gap-20">{children}</div>
      </article>
    </main>
    </EditorialChrome>
  );
}

export function EditorialSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <ScrollReveal>
      <section>
        <h2 className="font-[family-name:var(--font-heading)] text-3xl tracking-tight md:text-4xl">{title}</h2>
        <div className="mt-6">{children}</div>
      </section>
    </ScrollReveal>
  );
}

export function EditorialCta({
  href,
  title,
  body,
  label,
}: {
  href: string;
  title: string;
  body?: string;
  label: string;
}) {
  return (
    <ScrollReveal>
      <section className="ixp-card px-6 py-8 md:px-10 md:py-10">
        <h2 className="font-[family-name:var(--font-heading)] text-3xl tracking-tight">{title}</h2>
        {body ? <p className="mt-3 max-w-xl leading-7 text-[color:var(--text-secondary)]">{body}</p> : null}
        <Link href={href} className="btn-brand btn-focus-ring mt-6 inline-flex min-h-12 items-center px-6 py-3 text-sm">
          {label}
        </Link>
      </section>
    </ScrollReveal>
  );
}
