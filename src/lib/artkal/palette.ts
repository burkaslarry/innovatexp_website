import paletteJson from "@/data/artkal-palette.json";
import type { ArtkalColor, ArtkalSeries, ColorUsage } from "@/types/artkal";

const PALETTE = paletteJson as ArtkalColor[];

const bySeries = new Map<ArtkalSeries, ArtkalColor[]>();
const byCode = new Map<string, ArtkalColor>();

for (const color of PALETTE) {
  const list = bySeries.get(color.series) ?? [];
  list.push(color);
  bySeries.set(color.series, list);
  byCode.set(`${color.series}:${color.code}`, color);
}

export function getArtkalPalette(): readonly ArtkalColor[] {
  return PALETTE;
}

export function getPaletteBySeries(series: ArtkalSeries): ArtkalColor[] {
  return bySeries.get(series) ?? [];
}

export function getColorByCode(series: ArtkalSeries, code: string): ArtkalColor | undefined {
  return byCode.get(`${series}:${code}`);
}

export function countUsage(cells: string[][], series: ArtkalSeries): ColorUsage[] {
  const counts = new Map<string, number>();
  for (const row of cells) {
    for (const code of row) {
      counts.set(code, (counts.get(code) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([code, count]) => {
      const color = getColorByCode(series, code);
      if (!color) return null;
      return { color, count };
    })
    .filter((row): row is ColorUsage => row !== null)
    .sort((a, b) => b.count - a.count || a.color.code.localeCompare(b.color.code));
}

export function formatShoppingList(usage: ColorUsage[], locale: "zh" | "en"): string {
  return usage
    .map(({ color, count }) =>
      locale === "zh"
        ? `${color.code} (${color.zhName}): ${count} 粒`
        : `${color.code} (${color.name}): ${count} beads`,
    )
    .join("\n");
}
