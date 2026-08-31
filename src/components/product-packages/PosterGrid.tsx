import type { AppLocale } from "@/lib/i18n-routing";
import type { ProductPosterItem } from "@/content/homepage";
import { PosterCard } from "./PosterCard";

const POSTER_LOCALE_DIR: Record<AppLocale, string> = {
  en: "en",
  "zh-hk": "zh-hk",
  "zh-tw": "zh-tw",
  ja: "ja",
  de: "en",
};

/*
 * Poster merchandising only. Care retainers and Snapshot live beside
 * this grid so a poster change cannot drag those offers with it.
 */
export function PosterGrid({ locale, items }: { locale: AppLocale; items: ProductPosterItem[] }) {
  const posterDir = POSTER_LOCALE_DIR[locale] ?? "en";

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {items.map((item) => (
        <PosterCard key={item.id} item={item} posterDir={posterDir} />
      ))}
    </div>
  );
}
