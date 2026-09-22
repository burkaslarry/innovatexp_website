"use client";

import { useMemo, useState } from "react";
import { Coffee, ExternalLink, MapPin } from "lucide-react";
import shopsData from "@/data/hk-coffeeshops.json";

type CoffeeShop = {
  name: string;
  neighborhood: string;
  address: string;
  lat: number;
  lng: number;
  tags: string[];
  notes: string;
};

const SHOPS = shopsData as CoffeeShop[];

type CoffeeShopMapProps = {
  zh: boolean;
};

function mapsSearchUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function embedUrl(query: string): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}

export function CoffeeShopMap({ zh }: CoffeeShopMapProps) {
  const neighborhoods = useMemo(() => {
    const set = new Set<string>();
    for (const shop of SHOPS) set.add(shop.neighborhood);
    return ["all", ...Array.from(set).sort()];
  }, []);

  const [neighborhood, setNeighborhood] = useState<string>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SHOPS.filter((shop) => {
      if (neighborhood !== "all" && shop.neighborhood !== neighborhood) return false;
      if (!q) return true;
      return (
        shop.name.toLowerCase().includes(q) ||
        shop.address.toLowerCase().includes(q) ||
        shop.neighborhood.toLowerCase().includes(q) ||
        shop.notes.toLowerCase().includes(q)
      );
    });
  }, [neighborhood, query]);

  const embedQuery =
    neighborhood === "all"
      ? "coffee shops in Hong Kong"
      : `coffee shops in ${neighborhood}, Hong Kong`;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)]">
      <section className="ixp-card overflow-hidden p-0">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[color:var(--border-light)] px-4 py-3">
          <p className="flex items-center gap-2 text-sm font-semibold text-[color:var(--heading-foreground)]">
            <MapPin className="h-4 w-4 text-brand-primary" aria-hidden />
            {zh ? "Google 地圖" : "Google Map"}
          </p>
          <p className="text-xs text-[color:var(--text-secondary)]">
            {zh
              ? "地圖顯示 Google 咖啡店結果；點列表項可喺 Google Maps 打開。"
              : "Map shows Google coffee results; tap a list item to open it in Google Maps."}
          </p>
        </div>
        <iframe
          key={embedQuery}
          title={zh ? "香港咖啡店地圖" : "Hong Kong coffeeshop map"}
          src={embedUrl(embedQuery)}
          className="h-[460px] w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </section>

      <section className="ixp-card flex flex-col p-4">
        <div className="space-y-3">
          <label className="block">
            <span className="mb-1 block text-xs font-semibold text-[color:var(--text-secondary)]">
              {zh ? "搜尋" : "Search"}
            </span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={zh ? "店名、地區、地址…" : "Name, area, address…"}
              className="w-full rounded-lg border border-[color:var(--border-medium)] bg-[color:var(--card-bg)] px-3 py-2 text-sm text-[color:var(--heading-foreground)]"
            />
          </label>
          <div className="flex flex-wrap gap-1.5">
            {neighborhoods.map((area) => (
              <button
                key={area}
                type="button"
                onClick={() => setNeighborhood(area)}
                className={`min-h-[36px] rounded-full border px-3 py-1 text-xs font-semibold transition ${
                  neighborhood === area
                    ? "border-brand-primary bg-brand-primary/10 text-brand-primary"
                    : "border-[color:var(--border-light)] text-[color:var(--text-secondary)]"
                }`}
              >
                {area === "all" ? (zh ? "全部" : "All") : area}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-[color:var(--text-secondary)]">
          <span>
            {zh ? `共 ${filtered.length} 間` : `${filtered.length} shops`}
          </span>
        </div>

        <ul className="mt-2 max-h-[420px] space-y-2 overflow-auto pr-1">
          {filtered.map((shop) => (
            <li
              key={`${shop.name}-${shop.neighborhood}`}
              className="rounded-xl border border-[color:var(--border-light)] p-3 transition hover:border-brand-primary"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="flex items-center gap-1.5 text-sm font-bold text-[color:var(--heading-foreground)]">
                    <Coffee className="h-4 w-4 shrink-0 text-brand-primary" aria-hidden />
                    <span className="truncate">{shop.name}</span>
                  </p>
                  <p className="mt-0.5 text-xs font-semibold text-brand-primary">{shop.neighborhood}</p>
                </div>
                <a
                  href={mapsSearchUrl(`${shop.name} ${shop.address}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[36px] shrink-0 items-center gap-1 rounded-full border border-[color:var(--border-medium)] px-2.5 text-xs font-semibold hover:border-brand-primary"
                >
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                  {zh ? "地圖" : "Map"}
                </a>
              </div>
              <p className="mt-1.5 text-xs leading-5 text-[color:var(--text-secondary)]">{shop.address}</p>
              <p className="mt-1 text-xs leading-5 text-[color:var(--text-secondary)]">{shop.notes}</p>
            </li>
          ))}
          {filtered.length === 0 ? (
            <li className="py-6 text-center text-sm text-[color:var(--text-secondary)]">
              {zh ? "搵唔到符合嘅咖啡店。" : "No coffeeshops match your filter."}
            </li>
          ) : null}
        </ul>
      </section>
    </div>
  );
}
