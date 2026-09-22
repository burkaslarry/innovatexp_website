"use client";

import { Grid3x3, Palette } from "lucide-react";
import type { ArtkalSeries, PegboardPreset } from "@/types/artkal";
import { MAX_COLORS, MAX_GRID, MIN_COLORS, MIN_GRID } from "@/types/artkal";

type ControlsPanelProps = {
  zh: boolean;
  preset: PegboardPreset;
  customWidth: number;
  customHeight: number;
  maxColors: number;
  series: ArtkalSeries;
  showGrid: boolean;
  onPreset: (preset: PegboardPreset) => void;
  onCustomWidth: (value: number) => void;
  onCustomHeight: (value: number) => void;
  onMaxColors: (value: number) => void;
  onSeries: (series: ArtkalSeries) => void;
  onShowGrid: (show: boolean) => void;
  onGenerate: () => void;
  canGenerate: boolean;
  generating: boolean;
};

export function ControlsPanel({
  zh,
  preset,
  customWidth,
  customHeight,
  maxColors,
  series,
  showGrid,
  onPreset,
  onCustomWidth,
  onCustomHeight,
  onMaxColors,
  onSeries,
  onShowGrid,
  onGenerate,
  canGenerate,
  generating,
}: ControlsPanelProps) {
  const presets: { id: PegboardPreset; label: string }[] = [
    { id: "1", label: zh ? "1 板 29×29" : "1 board 29×29" },
    { id: "4", label: zh ? "4 板 58×58" : "4 boards 58×58" },
    { id: "72", label: zh ? "72×72" : "72×72" },
    { id: "100", label: zh ? "100×100" : "100×100" },
    { id: "custom", label: zh ? "自訂寬×高" : "Custom W×H" },
  ];

  return (
    <div className="space-y-5">
      <fieldset>
        <legend className="mb-2 flex items-center gap-2 text-sm font-semibold text-[color:var(--heading-foreground)]">
          <Grid3x3 className="h-4 w-4" aria-hidden />
          {zh ? "釘板尺寸" : "Pegboard size"}
        </legend>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {presets.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onPreset(item.id)}
              className={`min-h-[44px] rounded-xl border px-3 py-2 text-sm font-semibold transition ${
                preset === item.id
                  ? "border-brand-primary bg-brand-primary/10 text-brand-primary"
                  : "border-[color:var(--border-light)] text-[color:var(--text-secondary)]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        {preset === "custom" ? (
          <div className="mt-3 grid grid-cols-2 gap-3">
            <label className="text-xs font-semibold text-[color:var(--text-secondary)]">
              {zh ? "寬（粒）" : "Width (beads)"}
              <input
                type="number"
                min={MIN_GRID}
                max={MAX_GRID}
                value={customWidth}
                onChange={(event) => onCustomWidth(Number(event.target.value))}
                className="mt-1 w-full rounded-lg border border-[color:var(--border-medium)] bg-[color:var(--card-bg)] px-3 py-2 text-sm text-[color:var(--heading-foreground)]"
              />
            </label>
            <label className="text-xs font-semibold text-[color:var(--text-secondary)]">
              {zh ? "高（粒）" : "Height (beads)"}
              <input
                type="number"
                min={MIN_GRID}
                max={MAX_GRID}
                value={customHeight}
                onChange={(event) => onCustomHeight(Number(event.target.value))}
                className="mt-1 w-full rounded-lg border border-[color:var(--border-medium)] bg-[color:var(--card-bg)] px-3 py-2 text-sm text-[color:var(--heading-foreground)]"
              />
            </label>
          </div>
        ) : null}
      </fieldset>

      <label className="block">
        <span className="mb-2 flex items-center justify-between text-sm font-semibold text-[color:var(--heading-foreground)]">
          <span className="flex items-center gap-2">
            <Palette className="h-4 w-4" aria-hidden />
            {zh ? "最多色數" : "Max colors"}
          </span>
          <span className="tabular-nums text-brand-primary">{maxColors}</span>
        </span>
        <input
          type="range"
          min={MIN_COLORS}
          max={MAX_COLORS}
          value={maxColors}
          onChange={(event) => onMaxColors(Number(event.target.value))}
          className="w-full accent-[color:var(--brand-primary)]"
        />
        <span className="mt-1 block text-xs text-[color:var(--text-secondary)]">
          {zh ? "合併相近色，減少要買嘅色袋。" : "Groups similar shades to reduce bead bags."}
        </span>
      </label>

      <fieldset>
        <legend className="mb-2 text-sm font-semibold text-[color:var(--heading-foreground)]">
          {zh ? "Artkal 系列" : "Artkal series"}
        </legend>
        <div className="grid grid-cols-3 gap-2">
          {(
            [
              ["S", zh ? "S 5mm" : "S 5mm"],
              ["A", zh ? "A 2.6mm" : "A 2.6mm"],
              ["C", zh ? "C 2.6mm" : "C 2.6mm"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => onSeries(id)}
              className={`min-h-[44px] rounded-xl border px-3 py-2 text-sm font-semibold transition ${
                series === id
                  ? "border-brand-primary bg-brand-primary/10 text-brand-primary"
                  : "border-[color:var(--border-light)] text-[color:var(--text-secondary)]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs leading-5 text-[color:var(--text-secondary)]">
          {series === "S"
            ? zh
              ? "S 系列用官方色號（S01 白、S13 黑、S44 天藍）。"
              : "S-series uses official codes (S01 White, S13 Black, S44 Sky Blue)."
            : series === "A"
              ? zh
                ? "A 系列包含 A01 編號同 A1／B13／H5 色族碼（黃／綠／中性）。"
                : "A-series includes A01 numbers plus family codes such as A1, B13, H5."
              : zh
                ? "C 系列為 2.6mm 硬豆官方色號。"
                : "C-series is the official 2.6mm hard mini palette."}
        </p>
      </fieldset>

      <label className="flex min-h-[44px] items-center gap-2 text-sm font-semibold text-[color:var(--heading-foreground)]">
        <input type="checkbox" checked={showGrid} onChange={(event) => onShowGrid(event.target.checked)} />
        {zh ? "顯示格線" : "Show grid lines"}
      </label>

      <button
        type="button"
        onClick={onGenerate}
        disabled={!canGenerate || generating}
        className="btn-brand inline-flex min-h-[48px] w-full items-center justify-center rounded-[var(--btn-radius)] px-5 text-base font-bold disabled:opacity-50"
      >
        {generating ? (zh ? "轉換中…" : "Processing…") : zh ? "生成拼豆圖紙" : "Generate pattern"}
      </button>
    </div>
  );
}
