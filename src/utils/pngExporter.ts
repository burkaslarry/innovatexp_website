import { renderPatternToCanvas } from "@/utils/canvasRenderer";
import type { BeadPattern } from "@/types/artkal";

export function downloadPatternPng(pattern: BeadPattern, filename = "artkal-bead-pattern.png"): void {
  const cellSize = Math.max(16, Math.min(40, Math.floor(2400 / Math.max(pattern.width, pattern.height))));
  const canvas = renderPatternToCanvas(pattern, {
    cellSize,
    showGrid: true,
    showCodes: cellSize >= 22,
  });
  const url = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
}
