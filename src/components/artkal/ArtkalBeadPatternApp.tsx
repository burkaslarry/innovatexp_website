"use client";

import { useMemo, useState, useTransition } from "react";
import { Download, FileText, Loader2 } from "lucide-react";
import { ImageUploader } from "@/components/artkal/ImageUploader";
import { ControlsPanel } from "@/components/artkal/ControlsPanel";
import { BeadCanvas } from "@/components/artkal/BeadCanvas";
import { BeadSummaryTable } from "@/components/artkal/BeadSummaryTable";
import { processImage } from "@/utils/imageProcessor";
import { downloadPatternPng } from "@/utils/pngExporter";
import { downloadPatternPdf } from "@/utils/pdfExporter";
import type { ArtkalSeries, BeadPattern, PegboardPreset } from "@/types/artkal";
import { MAX_GRID, MIN_GRID, PRESET_SIZES } from "@/types/artkal";

type ArtkalBeadPatternAppProps = {
  zh: boolean;
};

function clampGrid(value: number): number {
  if (!Number.isFinite(value)) return MIN_GRID;
  return Math.min(MAX_GRID, Math.max(MIN_GRID, Math.round(value)));
}

export function ArtkalBeadPatternApp({ zh }: ArtkalBeadPatternAppProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preset, setPreset] = useState<PegboardPreset>("1");
  const [customWidth, setCustomWidth] = useState(40);
  const [customHeight, setCustomHeight] = useState(40);
  const [maxColors, setMaxColors] = useState(18);
  const [series, setSeries] = useState<ArtkalSeries>("S");
  const [showGrid, setShowGrid] = useState(true);
  const [pattern, setPattern] = useState<BeadPattern | null>(null);
  const [highlightCode, setHighlightCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [busy, setBusy] = useState(false);

  const grid = useMemo(() => {
    if (preset === "custom") {
      return { width: clampGrid(customWidth), height: clampGrid(customHeight) };
    }
    return PRESET_SIZES[preset];
  }, [customHeight, customWidth, preset]);

  async function generate() {
    if (!file) return;
    setError(null);
    setBusy(true);
    try {
      const next = await processImage(file, {
        width: grid.width,
        height: grid.height,
        maxColors,
        series,
      });
      startTransition(() => setPattern(next));
    } catch (err) {
      setError(err instanceof Error ? err.message : zh ? "轉換失敗。" : "Processing failed.");
    } finally {
      setBusy(false);
    }
  }

  const generating = busy || isPending;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
      <aside className="ixp-card space-y-6 p-5 md:p-6">
        <ImageUploader file={file} onFile={setFile} zh={zh} />
        <ControlsPanel
          zh={zh}
          preset={preset}
          customWidth={customWidth}
          customHeight={customHeight}
          maxColors={maxColors}
          series={series}
          showGrid={showGrid}
          onPreset={setPreset}
          onCustomWidth={setCustomWidth}
          onCustomHeight={setCustomHeight}
          onMaxColors={setMaxColors}
          onSeries={setSeries}
          onShowGrid={setShowGrid}
          onGenerate={() => void generate()}
          canGenerate={Boolean(file)}
          generating={generating}
        />
        {error ? <p className="text-sm text-red-600 dark:text-red-400">{error}</p> : null}
      </aside>

      <section className="space-y-6">
        <div className="ixp-card p-5 md:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-bold text-[color:var(--heading-foreground)]">
              {zh ? "圖紙預覽" : "Pattern preview"}
            </h2>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                disabled={!pattern}
                onClick={() => pattern && downloadPatternPng(pattern)}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[color:var(--border-medium)] px-4 text-sm font-semibold disabled:opacity-40"
              >
                <Download className="h-4 w-4" aria-hidden />
                {zh ? "下載 PNG" : "Download PNG"}
              </button>
              <button
                type="button"
                disabled={!pattern}
                onClick={() => pattern && void downloadPatternPdf(pattern, { locale: zh ? "zh" : "en" })}
                className="btn-brand inline-flex min-h-[44px] items-center gap-2 rounded-full px-4 text-sm font-bold disabled:opacity-40"
              >
                <FileText className="h-4 w-4" aria-hidden />
                {zh ? "下載 PDF 圖紙" : "Download PDF"}
              </button>
            </div>
          </div>
          {generating ? (
            <div className="flex min-h-[360px] items-center justify-center gap-2 text-[color:var(--text-secondary)]">
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
              {zh ? "正在用 CIEDE2000 對色…" : "Matching Artkal colors with CIEDE2000…"}
            </div>
          ) : pattern ? (
            <BeadCanvas
              pattern={pattern}
              showGrid={showGrid}
              highlightCode={highlightCode}
              onHoverCode={setHighlightCode}
              zh={zh}
            />
          ) : (
            <p className="min-h-[200px] text-sm leading-7 text-[color:var(--text-secondary)]">
              {zh
                ? "上傳圖片後揀釘板同系列，再按「生成拼豆圖紙」。每格會對應最近嘅 Artkal 色號。"
                : "Upload an image, pick a pegboard and series, then generate. Each cell maps to the nearest Artkal code."}
            </p>
          )}
        </div>

        <div className="ixp-card p-5 md:p-6">
          <h2 className="mb-4 text-xl font-bold text-[color:var(--heading-foreground)]">
            {zh ? "用豆統計／購物清單" : "Bead count / shopping list"}
          </h2>
          <BeadSummaryTable
            usage={pattern?.usage ?? []}
            totalBeads={pattern?.totalBeads ?? 0}
            zh={zh}
            onHoverCode={setHighlightCode}
          />
        </div>
      </section>
    </div>
  );
}
