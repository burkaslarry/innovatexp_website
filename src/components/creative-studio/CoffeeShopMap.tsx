"use client";

import { useMemo, useState } from "react";
import { Clock, Coffee, ExternalLink, MapPin, Music, Plug, Table, Table2, Utensils, Wifi } from "lucide-react";
import shopsData from "@/data/hk-coffeeshops.json";

type ShopType = "coffee" | "tea";
type Outlets = "yes" | "few" | "no";
type WifiStatus = "yes" | "no" | "unknown";
type TimeLimit = "none" | "60" | "90" | "120";

type CoffeeShop = {
  name: string;
  neighborhood: string;
  address: string;
  lat: number;
  lng: number;
  type: ShopType;
  outlets: Outlets;
  wifi?: WifiStatus;
  tableFor2: boolean;
  tableFor4: boolean;
  music: boolean;
  timeLimit: TimeLimit;
  mustOrder: boolean;
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

type ChipProps = {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

function Chip({ active, onClick, children }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-[34px] rounded-full border px-3 py-1 text-xs font-semibold transition ${
        active
          ? "border-brand-primary bg-brand-primary/10 text-brand-primary"
          : "border-[color:var(--border-light)] text-[color:var(--text-secondary)]"
      }`}
    >
      {children}
    </button>
  );
}

function AttrBadge({ icon: Icon, on, label }: { icon: React.ComponentType<{ className?: string }>; on: boolean; label: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${
        on
          ? "border-brand-primary/40 text-brand-primary"
          : "border-[color:var(--border-light)] text-[color:var(--text-secondary)] line-through opacity-60"
      }`}
      title={label}
    >
      <Icon className="h-3 w-3" aria-hidden />
      {label}
    </span>
  );
}

export function CoffeeShopMap({ zh }: CoffeeShopMapProps) {
  const neighborhoods = useMemo(() => {
    const set = new Set<string>();
    for (const shop of SHOPS) set.add(shop.neighborhood);
    return ["all", ...Array.from(set).sort()];
  }, []);

  const [neighborhood, setNeighborhood] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | ShopType>("all");
  const [outletsFilter, setOutletsFilter] = useState<"all" | Outlets>("all");
  const [timeFilter, setTimeFilter] = useState<"all" | "limited" | "none">("all");
  const [mustOrderFilter, setMustOrderFilter] = useState<"all" | "yes" | "no">("all");
  const [musicFilter, setMusicFilter] = useState<"all" | "yes" | "no">("all");
  const [tableFilter, setTableFilter] = useState<"all" | "2" | "4">("all");
  const [wifiFilter, setWifiFilter] = useState<"all" | "yes">("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SHOPS.filter((shop) => {
      if (neighborhood !== "all" && shop.neighborhood !== neighborhood) return false;
      if (typeFilter !== "all" && shop.type !== typeFilter) return false;
      if (outletsFilter !== "all" && shop.outlets !== outletsFilter) return false;
      if (timeFilter === "limited" && shop.timeLimit === "none") return false;
      if (timeFilter === "none" && shop.timeLimit !== "none") return false;
      if (mustOrderFilter === "yes" && !shop.mustOrder) return false;
      if (mustOrderFilter === "no" && shop.mustOrder) return false;
      if (musicFilter === "yes" && !shop.music) return false;
      if (musicFilter === "no" && shop.music) return false;
      if (tableFilter === "2" && !shop.tableFor2) return false;
      if (tableFilter === "4" && !shop.tableFor4) return false;
      if (wifiFilter === "yes" && shop.wifi !== "yes") return false;
      if (!q) return true;
      return (
        shop.name.toLowerCase().includes(q) ||
        shop.address.toLowerCase().includes(q) ||
        shop.neighborhood.toLowerCase().includes(q) ||
        shop.notes.toLowerCase().includes(q)
      );
    });
  }, [neighborhood, query, typeFilter, outletsFilter, timeFilter, mustOrderFilter, musicFilter, tableFilter, wifiFilter]);

  const embedQuery =
    typeFilter === "tea"
      ? neighborhood === "all"
        ? "霸王茶姬 Hong Kong"
        : `霸王茶姬 ${neighborhood} Hong Kong`
      : typeFilter === "coffee"
        ? neighborhood === "all"
          ? "coffee shops in Hong Kong"
          : `coffee shops in ${neighborhood}, Hong Kong`
        : neighborhood === "all"
          ? "coffee and tea shops in Hong Kong"
          : `coffee and tea shops in ${neighborhood}, Hong Kong`;

  const t = zh
    ? {
        map: "Google 地圖",
        mapNote: "地圖顯示 Google 搜尋結果；點列表項可喺 Google Maps 打開。",
        search: "搜尋",
        searchPh: "店名、地區、地址…",
        all: "全部",
        type: "類型",
        coffee: "咖啡",
        tea: "茶飲",
        outlets: "電插",
        wifi: "Wi-Fi",
        wifiYes: "有 Wi-Fi",
        wifiUnknown: "Wi-Fi 未核",
        yes: "有",
        few: "少",
        no: "冇",
        time: "限時",
        noLimit: "無限時",
        limited: "有限時",
        mustOrder: "必須消費",
        mustBuy: "要買",
        noNeed: "唔使",
        music: "音樂",
        table: "檯型",
        t2: "2人檯",
        t4: "4人檯",
        count: (n: number) => `共 ${n} 間`,
        openMap: "地圖",
        none: "搵唔到符合嘅店。",
        disclaim: "屬性為社群整理，可能隨時變；以門市為準。",
      }
    : {
        map: "Google Map",
        mapNote: "Map shows Google search results; tap a list item to open it in Google Maps.",
        search: "Search",
        searchPh: "Name, area, address…",
        all: "All",
        type: "Type",
        coffee: "Coffee",
        tea: "Tea",
        outlets: "Outlets",
        wifi: "Wi-Fi",
        wifiYes: "Has Wi-Fi",
        wifiUnknown: "Wi-Fi unknown",
        yes: "Yes",
        few: "Few",
        no: "No",
        time: "Time limit",
        noLimit: "No limit",
        limited: "Limited",
        mustOrder: "Must order",
        mustBuy: "Must buy",
        noNeed: "No",
        music: "Music",
        table: "Tables",
        t2: "2-seat",
        t4: "4-seat",
        count: (n: number) => `${n} shops`,
        openMap: "Map",
        none: "No shops match your filter.",
        disclaim: "Attributes are community-sourced and may change; check with the shop.",
      };

  return (
    <div className="space-y-4">
      <div className="ixp-card overflow-hidden p-0">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[color:var(--border-light)] px-4 py-3">
          <p className="flex items-center gap-2 text-sm font-semibold text-[color:var(--heading-foreground)]">
            <MapPin className="h-4 w-4 text-brand-primary" aria-hidden />
            {t.map}
          </p>
          <p className="text-xs text-[color:var(--text-secondary)]">{t.mapNote}</p>
        </div>
        <iframe
          key={embedQuery}
          title={zh ? "香港咖啡茶飲地圖" : "Hong Kong coffee & tea map"}
          src={embedUrl(embedQuery)}
          className="h-[460px] w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>

      <div className="ixp-card space-y-4 p-4">
        <div className="grid gap-3 md:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-xs font-semibold text-[color:var(--text-secondary)]">{t.search}</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t.searchPh}
              className="w-full rounded-lg border border-[color:var(--border-medium)] bg-[color:var(--card-bg)] px-3 py-2 text-sm text-[color:var(--heading-foreground)]"
            />
          </label>
          <div>
            <span className="mb-1 block text-xs font-semibold text-[color:var(--text-secondary)]">{t.type}</span>
            <div className="flex flex-wrap gap-1.5">
              <Chip active={typeFilter === "all"} onClick={() => setTypeFilter("all")}>{t.all}</Chip>
              <Chip active={typeFilter === "coffee"} onClick={() => setTypeFilter("coffee")}>{t.coffee}</Chip>
              <Chip active={typeFilter === "tea"} onClick={() => setTypeFilter("tea")}>{t.tea}</Chip>
            </div>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <span className="mb-1 block text-xs font-semibold text-[color:var(--text-secondary)]">{t.outlets}</span>
            <div className="flex flex-wrap gap-1.5">
              <Chip active={outletsFilter === "all"} onClick={() => setOutletsFilter("all")}>{t.all}</Chip>
              <Chip active={outletsFilter === "yes"} onClick={() => setOutletsFilter("yes")}>{t.yes}</Chip>
              <Chip active={outletsFilter === "few"} onClick={() => setOutletsFilter("few")}>{t.few}</Chip>
              <Chip active={outletsFilter === "no"} onClick={() => setOutletsFilter("no")}>{t.no}</Chip>
            </div>
          </div>
          <div>
            <span className="mb-1 block text-xs font-semibold text-[color:var(--text-secondary)]">{t.wifi}</span>
            <div className="flex flex-wrap gap-1.5">
              <Chip active={wifiFilter === "all"} onClick={() => setWifiFilter("all")}>{t.all}</Chip>
              <Chip active={wifiFilter === "yes"} onClick={() => setWifiFilter("yes")}>{t.wifiYes}</Chip>
            </div>
          </div>
          <div>
            <span className="mb-1 block text-xs font-semibold text-[color:var(--text-secondary)]">{t.time}</span>
            <div className="flex flex-wrap gap-1.5">
              <Chip active={timeFilter === "all"} onClick={() => setTimeFilter("all")}>{t.all}</Chip>
              <Chip active={timeFilter === "none"} onClick={() => setTimeFilter("none")}>{t.noLimit}</Chip>
              <Chip active={timeFilter === "limited"} onClick={() => setTimeFilter("limited")}>{t.limited}</Chip>
            </div>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <div>
            <span className="mb-1 block text-xs font-semibold text-[color:var(--text-secondary)]">{t.mustOrder}</span>
            <div className="flex flex-wrap gap-1.5">
              <Chip active={mustOrderFilter === "all"} onClick={() => setMustOrderFilter("all")}>{t.all}</Chip>
              <Chip active={mustOrderFilter === "yes"} onClick={() => setMustOrderFilter("yes")}>{t.mustBuy}</Chip>
              <Chip active={mustOrderFilter === "no"} onClick={() => setMustOrderFilter("no")}>{t.noNeed}</Chip>
            </div>
          </div>
          <div>
            <span className="mb-1 block text-xs font-semibold text-[color:var(--text-secondary)]">{t.music}</span>
            <div className="flex flex-wrap gap-1.5">
              <Chip active={musicFilter === "all"} onClick={() => setMusicFilter("all")}>{t.all}</Chip>
              <Chip active={musicFilter === "yes"} onClick={() => setMusicFilter("yes")}>{t.yes}</Chip>
              <Chip active={musicFilter === "no"} onClick={() => setMusicFilter("no")}>{t.no}</Chip>
            </div>
          </div>
          <div>
            <span className="mb-1 block text-xs font-semibold text-[color:var(--text-secondary)]">{t.table}</span>
            <div className="flex flex-wrap gap-1.5">
              <Chip active={tableFilter === "all"} onClick={() => setTableFilter("all")}>{t.all}</Chip>
              <Chip active={tableFilter === "2"} onClick={() => setTableFilter("2")}>{t.t2}</Chip>
              <Chip active={tableFilter === "4"} onClick={() => setTableFilter("4")}>{t.t4}</Chip>
            </div>
          </div>
        </div>

        <div>
          <span className="mb-1 block text-xs font-semibold text-[color:var(--text-secondary)]">
            {zh ? "地區" : "Neighborhood"}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {neighborhoods.map((area) => (
              <Chip key={area} active={neighborhood === area} onClick={() => setNeighborhood(area)}>
                {area === "all" ? t.all : area}
              </Chip>
            ))}
          </div>
        </div>

        <p className="text-xs text-[color:var(--text-secondary)]">
          {t.count(filtered.length)} · <span className="opacity-70">{t.disclaim}</span>
        </p>

        <ul className="max-h-[520px] space-y-2 overflow-auto pr-1">
          {filtered.map((shop, idx) => (
            <li
              key={`${shop.name}-${shop.neighborhood}-${idx}`}
              className="rounded-xl border border-[color:var(--border-light)] p-3 transition hover:border-brand-primary"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="flex items-center gap-1.5 text-sm font-bold text-[color:var(--heading-foreground)]">
                    {shop.type === "tea" ? (
                      <Utensils className="h-4 w-4 shrink-0 text-brand-primary" aria-hidden />
                    ) : (
                      <Coffee className="h-4 w-4 shrink-0 text-brand-primary" aria-hidden />
                    )}
                    <span className="truncate">{shop.name}</span>
                  </p>
                  <p className="mt-0.5 text-xs font-semibold text-brand-primary">{shop.neighborhood}</p>
                </div>
                <a
                  href={mapsSearchUrl(`${shop.name} ${shop.address}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[34px] shrink-0 items-center gap-1 rounded-full border border-[color:var(--border-medium)] px-2.5 text-xs font-semibold hover:border-brand-primary"
                >
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                  {t.openMap}
                </a>
              </div>
              <p className="mt-1.5 text-xs leading-5 text-[color:var(--text-secondary)]">{shop.address}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                <AttrBadge icon={Plug} on={shop.outlets !== "no"} label={`${t.outlets}: ${shop.outlets === "yes" ? t.yes : shop.outlets === "few" ? t.few : t.no}`} />
                <AttrBadge icon={Wifi} on={shop.wifi === "yes"} label={shop.wifi === "yes" ? t.wifiYes : shop.wifi === "no" ? `${t.wifi}: ${t.no}` : t.wifiUnknown} />
                <AttrBadge icon={Table2} on={shop.tableFor2} label={t.t2} />
                <AttrBadge icon={Table} on={shop.tableFor4} label={t.t4} />
                <AttrBadge icon={Music} on={shop.music} label={t.music} />
                <AttrBadge icon={Clock} on={shop.timeLimit !== "none"} label={shop.timeLimit === "none" ? t.noLimit : `${shop.timeLimit}m`} />
                <AttrBadge icon={Coffee} on={shop.mustOrder} label={shop.mustOrder ? t.mustBuy : t.noNeed} />
              </div>
              <p className="mt-1.5 text-xs leading-5 text-[color:var(--text-secondary)]">{shop.notes}</p>
            </li>
          ))}
          {filtered.length === 0 ? (
            <li className="py-6 text-center text-sm text-[color:var(--text-secondary)]">{t.none}</li>
          ) : null}
        </ul>
      </div>
    </div>
  );
}
