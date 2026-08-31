import Image from "next/image";
import type { ProductPosterItem } from "@/content/homepage";

/*
 * One poster, one offer. The card does not decide locale paths —
 * the grid already resolved the directory.
 */
export function PosterCard({
  item,
  posterDir,
}: {
  item: ProductPosterItem;
  posterDir: string;
}) {
  return (
    <article className="ixp-card overflow-hidden">
      <div className="relative aspect-[3/4] w-full bg-[color:var(--bg-secondary)] sm:aspect-[4/5]">
        <Image
          src={`/posters/${posterDir}/${item.poster}`}
          alt={`${item.name} — ${item.tagline}`}
          fill
          className="object-contain object-top"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
      <div className="space-y-3 p-5 md:p-6">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-[color:var(--secondary-color)]">
          {item.eyebrow}
        </p>
        <h3 className="text-xl font-semibold text-[color:var(--heading-foreground)]">{item.name}</h3>
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
      </div>
    </article>
  );
}
