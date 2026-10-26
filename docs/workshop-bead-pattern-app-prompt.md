# Workshop prompt：用 AI 重做「拼豆圖紙生成器」Web App

用途：InnovateXP / Larry Lo 教學工作坊。學員把下面整段 prompt 貼去 Cursor、Claude、或 ChatGPT，就能由零生出同類瀏覽器工具。  
公開產品名只用「拼豆／fuse bead／色號」，不要寫任何第三方拼豆品牌名。

---

## Prompt（直接複製）

```text
Build a free, client-side web app: “Bead Pattern Generator” (拼豆圖紙生成器).

GOAL
Turn a user photo into a printable fuse-bead (拼豆) blueprint:
- Each grid cell is one bead.
- Each cell maps to the nearest color code from a fixed palette (codes like S01, A2, B13, H5).
- Show a live preview, per-color bead counts (shopping list), and export PNG + 1:1 PDF.
- All image processing stays in the browser. Do not upload the photo to a server.
- Do NOT use or display any third-party bead brand name in UI, SEO, PDF, filenames, or schema.

STACK (preferred)
- Next.js App Router + TypeScript + React
- Canvas 2D for preview / PNG
- jsPDF + jspdf-autotable for PDF
- culori (or equivalent) for CIE Lab + CIEDE2000 distance
- No login, no backend for the converter itself

PALETTE DATA
- JSON array of colors: { series: "S"|"A"|"C", code, name, zhName, hex, rgb: [r,g,b] }
- Series sizes for 1:1 print: S = 5.0 mm/bead, A/C = 2.6 mm/bead
- Provide at least one series with 30+ real-looking codes so demos work
- Never show a brand field in the UI

UX
1. Upload / drag-drop JPG or PNG (plus “load sample image”)
2. Pegboard presets: 29×29, 58×58, 72×72, 100×100, custom W×H (clamp ~8–120)
3. Max colors slider (e.g. 5–35): merge similar shades so fewer bags are needed
4. Series picker: S / A / C (label as “Bead series / 豆系列”, show mm size)
5. Generate button → busy state with “CIEDE2000 matching…”
6. Preview canvas: colored cells, optional grid, hover highlight by code
7. Summary table: swatch, code, zh name, en name, hex, count; copy shopping list
8. Download PNG; Download PDF blueprint

IMAGE PIPELINE
1. Draw source image into an offscreen canvas at target width×height (nearest-neighbor or area average)
2. For each pixel → RGB → Lab → nearest palette color by CIEDE2000
3. If distinct codes > maxColors, iteratively merge closest Lab pairs (or quantize) until within limit
4. Build cells[][] of color codes + usage counts sorted by frequency

PDF (CRITICAL — UTF-8 / CJK)
- Default jsPDF fonts (Helvetica) CANNOT render Chinese → mojibake.
- Embed a subset TTF (e.g. Noto Sans SC subset covering UI strings + all zhName glyphs).
- Load font from /fonts/… via fetch → base64 → doc.addFileToVFS + doc.addFont.
- Set that font for titles, table (autotable styles.font), and sheet headers.
- Page 1: title “拼豆圖紙” / “Bead Pattern Blueprint”, meta line, preview image, usage table.
- Later pages: 1:1 tiled sheets at physical mm size; print note “print at 100%”; cell codes ASCII OK.
- Filenames: bead-blueprint.pdf / bead-pattern.png (no brand tokens).

COPY / I18N
- Support zh (Cantonese-friendly Traditional) and en toggles or locale prop.
- Public strings: 拼豆圖紙生成器 / Bead Pattern Generator.
- Never mention third-party bead brands.

QUALITY BAR FOR WORKSHOP DEMO
- Works offline after first load (font + palette cached).
- Mobile-usable controls (min 44px tap targets).
- Clear empty state: upload → pick board → generate.
- Error if palette empty for selected series.
- PDF Chinese names must be readable (no □□□ or garbled bytes).

DELIVERABLES
1. Working app page
2. Palette JSON + loader
3. processImage / CIEDE2000 matcher
4. Canvas preview + PNG export
5. PDF export with embedded Unicode font
6. Short README: how to regenerate the font subset when zhName list grows
```

---

## 教學節奏建議（90 分鐘）

| 段 | 時間 | 學員做什麼 |
| --- | --- | --- |
| 1 | 10 分 | 講清楚產品：上傳 → 對色 → 購物清單 → 1:1 列印；強調瀏覽器內處理 |
| 2 | 15 分 | 貼 prompt，生出骨架；檢查沒有第三方品牌字樣 |
| 3 | 20 分 | 實作／核對 CIEDE2000 + maxColors 合併 |
| 4 | 20 分 | PDF：故意用 Helvetica 睇亂碼，再加 UTF-8 subset font 對比 |
| 5 | 15 分 | 匯出 PNG／PDF，用電話／釘板尺寸講 5mm vs 2.6mm |
| 6 | 10 分 | 回顧：palette 資料、離線處理、字型 subset 維護 |

## 教練檢查清單

- [ ] UI／PDF／檔名／meta 都無第三方品牌字
- [ ] 中文 PDF 標題同色名可讀（UTF-8 字型已嵌入）
- [ ] 1:1 頁用 mm，唔係只靠螢幕像素
- [ ] 相片唔經 server
- [ ] 色數上限真係減少色袋

## 可選加分題

- Highlight one color across preview + table
- Multi-page PDF tile map index
- Persist last settings in `localStorage`
- PWA / offline cache for palette + font
