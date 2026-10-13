import Image from "next/image";
import Link from "next/link";
import type { ProductPosterItem } from "@/content/homepage";
import type { AppLocale } from "@/lib/i18n-routing";
import { withLocale } from "@/lib/i18n-routing";

/*
 * One poster, one offer. The card does not decide locale paths —
 * the grid already resolved the directory.
 */
export function PosterCard({
  item,
  posterDir,
  locale,
}: {
  item: ProductPosterItem;
  posterDir: string;
  locale: AppLocale;
}) {
  const paths: Record<string, string> = { accountxp: "/products#accounting-tools-demo", smartsales: "/smartsales-crm", eventxp: "/eventxp", consultancy: "/ai-consulting" };
  const detailHref = withLocale(locale, item.href || paths[item.id] || `/bookme?interest=${encodeURIComponent(item.id)}`);

  return (
    <article className="ixp-card overflow-hidden">
      {item.id === "smartsales" ? (
        <div className="border-b border-[#c8bba9] bg-[#eee8de] p-6 md:p-8">
          <p className="text-xs uppercase tracking-widest text-[#6f5436]">SmartSales CRM</p>
          <p className="mt-4 text-2xl leading-snug">{locale.startsWith("zh") ? "先定流程，再分開計上線同維護。" : "Scope first. Separate setup from care."}</p>
          <p className="mt-4 text-sm leading-7">{item.price}</p>
        </div>
      ) : (
        <div className="relative aspect-[3/4] w-full bg-[color:var(--bg-secondary)] sm:aspect-[4/5]">
          <Image src={`/posters/${posterDir}/${item.poster}`} alt={`${item.name} — ${item.tagline}`} fill className="object-contain object-top" sizes="(max-width: 1024px) 100vw, 50vw" />
        </div>
      )}
      <div className="space-y-3 p-5 md:p-6">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-[color:var(--secondary-color)]">
          {item.eyebrow}
        </p>
        <h3 className="text-xl font-semibold text-[color:var(--heading-foreground)]">
          {detailHref ? (
            <Link href={detailHref} className="hover:text-[color:var(--brand-primary)]">
              {item.name}
            </Link>
          ) : (
            item.name
          )}
        </h3>
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
        {detailHref ? (
          <Link
            href={detailHref}
            className="inline-flex text-sm font-semibold text-[color:var(--brand-primary)] underline-offset-2 hover:underline"
          >
            {locale.startsWith("zh") ? "了解更多" : locale === "ja" ? "詳しく見る" : locale === "de" ? "Mehr erfahren" : "Learn more"}
          </Link>
        ) : null}
      </div>
    </article>
  );
}
