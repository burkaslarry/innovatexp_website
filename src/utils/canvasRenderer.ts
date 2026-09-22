import { getColorByCode } from "@/lib/artkal/palette";
import type { BeadPattern } from "@/types/artkal";

export type PatternView = {
  offsetX: number;
  offsetY: number;
  cellSize: number;
  showGrid: boolean;
  showCodes: boolean;
  highlightCode: string | null;
};

function luminance(rgb: [number, number, number]): number {
  const channel = (v: number) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(rgb[0]) + 0.7152 * channel(rgb[1]) + 0.0722 * channel(rgb[2]);
}

export function contrastInk(rgb: [number, number, number]): string {
  return luminance(rgb) > 0.55 ? "#1a1a1a" : "#ffffff";
}

export function drawBeadPattern(
  ctx: CanvasRenderingContext2D,
  pattern: BeadPattern,
  view: PatternView,
): void {
  const { width, height, cells, series } = pattern;
  const { offsetX, offsetY, cellSize, showGrid, showCodes, highlightCode } = view;

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.fillStyle = "#f4f1ea";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  const hole = Math.max(1.2, cellSize * 0.18);
  const radius = Math.max(1, cellSize * 0.46);
  const showLabels = showCodes && cellSize >= 22;

  for (let y = 0; y < height; y += 1) {
    const row = cells[y];
    if (!row) continue;
    for (let x = 0; x < width; x += 1) {
      const code = row[x];
      if (!code) continue;
      const color = getColorByCode(series, code);
      if (!color) continue;

      const cx = offsetX + x * cellSize + cellSize / 2;
      const cy = offsetY + y * cellSize + cellSize / 2;
      const dimmed = Boolean(highlightCode) && highlightCode !== code;

      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = color.hex;
      ctx.globalAlpha = dimmed ? 0.28 : 1;
      ctx.fill();
      ctx.globalAlpha = 1;

      ctx.beginPath();
      ctx.arc(cx, cy, hole, 0, Math.PI * 2);
      ctx.fillStyle = dimmed ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.55)";
      ctx.fill();

      if (highlightCode === code) {
        ctx.beginPath();
        ctx.arc(cx, cy, radius + 0.8, 0, Math.PI * 2);
        ctx.strokeStyle = "#111827";
        ctx.lineWidth = Math.max(1.5, cellSize * 0.08);
        ctx.stroke();
      }

      if (showGrid) {
        ctx.strokeStyle = "rgba(15, 23, 42, 0.18)";
        ctx.lineWidth = 1;
        ctx.strokeRect(offsetX + x * cellSize, offsetY + y * cellSize, cellSize, cellSize);
      }

      if (showLabels) {
        ctx.fillStyle = contrastInk(color.rgb);
        ctx.font = `600 ${Math.max(7, Math.floor(cellSize * 0.28))}px ui-sans-serif, system-ui, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(code, cx, cy + hole * 0.15);
      }
    }
  }
}

export function renderPatternToCanvas(
  pattern: BeadPattern,
  options: { cellSize: number; showGrid: boolean; showCodes: boolean },
): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(pattern.width * options.cellSize));
  canvas.height = Math.max(1, Math.round(pattern.height * options.cellSize));
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas 2D context is unavailable.");
  }
  drawBeadPattern(ctx, pattern, {
    offsetX: 0,
    offsetY: 0,
    cellSize: options.cellSize,
    showGrid: options.showGrid,
    showCodes: options.showCodes,
    highlightCode: null,
  });
  return canvas;
}
