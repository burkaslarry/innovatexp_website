import { BEAD_SIZE_MM } from "@/types/artkal";
import { contrastInk, renderPatternToCanvas } from "@/utils/canvasRenderer";
import { getColorByCode } from "@/lib/artkal/palette";
import type { BeadPattern } from "@/types/artkal";

function hexToRgb(hex: string): [number, number, number] {
  const raw = hex.replace("#", "");
  return [
    Number.parseInt(raw.slice(0, 2), 16),
    Number.parseInt(raw.slice(2, 4), 16),
    Number.parseInt(raw.slice(4, 6), 16),
  ];
}

export async function downloadPatternPdf(
  pattern: BeadPattern,
  options: { locale: "zh" | "en"; filename?: string },
): Promise<void> {
  const [{ jsPDF }, autoTableModule] = await Promise.all([import("jspdf"), import("jspdf-autotable")]);
  const autoTable = autoTableModule.default;
  const zh = options.locale === "zh";
  const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text(zh ? "Artkal 拼豆圖紙" : "Artkal Bead Pattern Blueprint", 14, 18);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(
    zh
      ? `${pattern.series} 系列 · ${pattern.width} × ${pattern.height} · 合共 ${pattern.totalBeads} 粒 · ${pattern.usage.length} 色`
      : `${pattern.series}-series · ${pattern.width} × ${pattern.height} · ${pattern.totalBeads} beads · ${pattern.usage.length} colors`,
    14,
    26,
  );

  const preview = renderPatternToCanvas(pattern, {
    cellSize: Math.max(8, Math.min(18, Math.floor(900 / Math.max(pattern.width, pattern.height)))),
    showGrid: true,
    showCodes: false,
  });
  const previewData = preview.toDataURL("image/png");
  const previewMaxW = pageW - 28;
  const previewMaxH = 92;
  const previewRatio = preview.width / preview.height;
  let previewW = previewMaxW;
  let previewH = previewW / previewRatio;
  if (previewH > previewMaxH) {
    previewH = previewMaxH;
    previewW = previewH * previewRatio;
  }
  doc.addImage(previewData, "PNG", 14, 32, previewW, previewH);

  autoTable(doc, {
    startY: 32 + previewH + 8,
    head: [[zh ? "色號" : "Code", zh ? "中文" : "Chinese", zh ? "English" : "English", "HEX", zh ? "數量（粒）" : "Qty"]],
    body: pattern.usage.map((row) => [
      row.color.code,
      row.color.zhName,
      row.color.name,
      row.color.hex,
      String(row.count),
    ]),
    styles: { fontSize: 8, cellPadding: 1.4 },
    headStyles: { fillColor: [88, 28, 135], textColor: 255 },
    didDrawCell: (data) => {
      if (data.section !== "body" || data.column.index !== 0) return;
      const usage = pattern.usage[data.row.index];
      if (!usage) return;
      const rgb = hexToRgb(usage.color.hex);
      doc.setFillColor(rgb[0], rgb[1], rgb[2]);
      doc.rect(data.cell.x + 1, data.cell.y + 1.2, 3.2, 3.2, "F");
    },
    columnStyles: {
      0: { cellWidth: 22, cellPadding: { left: 6, right: 2, top: 1.4, bottom: 1.4 } },
    },
  });

  const beadMm = BEAD_SIZE_MM[pattern.series];
  const margin = 10;
  const headerH = 12;
  const usableW = pageW - margin * 2;
  const usableH = pageH - margin * 2 - headerH;
  const colsPerPage = Math.max(1, Math.floor(usableW / beadMm));
  const rowsPerPage = Math.max(1, Math.floor(usableH / beadMm));
  const tileCols = Math.ceil(pattern.width / colsPerPage);
  const tileRows = Math.ceil(pattern.height / rowsPerPage);

  for (let ty = 0; ty < tileRows; ty += 1) {
    for (let tx = 0; tx < tileCols; tx += 1) {
      doc.addPage();
      const originX = tx * colsPerPage;
      const originY = ty * rowsPerPage;
      const cols = Math.min(colsPerPage, pattern.width - originX);
      const rows = Math.min(rowsPerPage, pattern.height - originY);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text(
        zh
          ? `1:1 拼豆紙（每格 ${beadMm}mm）  行 ${originY + 1}–${originY + rows}  列 ${originX + 1}–${originX + cols}`
          : `1:1 sheet (${beadMm}mm/bead)  rows ${originY + 1}–${originY + rows}  cols ${originX + 1}–${originX + cols}`,
        margin,
        margin + 4,
      );
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.text(
        zh ? "請以 100% 比例列印。格內色號對應 Artkal 色袋。" : "Print at 100% scale. Cell codes match Artkal bag labels.",
        margin,
        margin + 9,
      );

      const fontSize = beadMm >= 5 ? 4.2 : 2.6;
      for (let y = 0; y < rows; y += 1) {
        const row = pattern.cells[originY + y];
        if (!row) continue;
        for (let x = 0; x < cols; x += 1) {
          const code = row[originX + x];
          if (!code) continue;
          const color = getColorByCode(pattern.series, code);
          if (!color) continue;
          const px = margin + x * beadMm;
          const py = margin + headerH + y * beadMm;
          const rgb = color.rgb;
          doc.setFillColor(rgb[0], rgb[1], rgb[2]);
          doc.rect(px, py, beadMm, beadMm, "F");
          doc.setDrawColor(40);
          doc.setLineWidth(0.12);
          doc.rect(px, py, beadMm, beadMm, "S");
          const ink = contrastInk(color.rgb);
          const inkRgb = hexToRgb(ink);
          doc.setTextColor(inkRgb[0], inkRgb[1], inkRgb[2]);
          doc.setFontSize(fontSize);
          doc.text(code, px + beadMm / 2, py + beadMm / 2 + fontSize * 0.12, { align: "center" });
        }
      }
    }
  }

  doc.save(options.filename ?? "artkal-bead-blueprint.pdf");
}
