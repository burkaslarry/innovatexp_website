import { converter, differenceCiede2000 } from "culori";
import { countUsage, getPaletteBySeries } from "@/lib/artkal/palette";
import type { ArtkalColor, ArtkalSeries, BeadPattern, ProcessImageOptions } from "@/types/artkal";

const toLab = converter("lab");
const deltaE = differenceCiede2000();

type LabColor = NonNullable<ReturnType<typeof toLab>>;

type PaletteEntry = {
  color: ArtkalColor;
  lab: LabColor;
};

const paletteCache = new Map<ArtkalSeries, PaletteEntry[]>();

function rgbToLab(r: number, g: number, b: number): LabColor {
  return (
    toLab({ mode: "rgb", r: r / 255, g: g / 255, b: b / 255 }) ?? {
      mode: "lab",
      l: 0,
      a: 0,
      b: 0,
    }
  );
}

function getPreparedPalette(series: ArtkalSeries): PaletteEntry[] {
  const cached = paletteCache.get(series);
  if (cached) return cached;
  const prepared = getPaletteBySeries(series).map((color) => ({
    color,
    lab: rgbToLab(...color.rgb),
  }));
  paletteCache.set(series, prepared);
  return prepared;
}

function nearestColor(lab: LabColor, palette: PaletteEntry[]): ArtkalColor {
  let best = palette[0]!;
  let bestDelta = Number.POSITIVE_INFINITY;
  for (const entry of palette) {
    const d = deltaE(lab, entry.lab);
    if (d < bestDelta) {
      bestDelta = d;
      best = entry;
    }
  }
  return best.color;
}

function uniqueCodes(cells: string[][]): string[] {
  const set = new Set<string>();
  for (const row of cells) {
    for (const code of row) set.add(code);
  }
  return [...set];
}

function remapCells(cells: string[][], fromCode: string, toCode: string): void {
  for (const row of cells) {
    for (let x = 0; x < row.length; x += 1) {
      if (row[x] === fromCode) row[x] = toCode;
    }
  }
}

/**
 * Collapse similar shades until `maxColors` distinct Artkal bags remain.
 * Closest CIEDE2000 pair is merged; the less-used code is remapped onto the more-used one.
 */
function limitDistinctColors(
  cells: string[][],
  series: ArtkalSeries,
  maxColors: number,
  palette: PaletteEntry[],
): void {
  const labByCode = new Map(palette.map((entry) => [entry.color.code, entry.lab]));
  let codes = uniqueCodes(cells);
  while (codes.length > maxColors) {
    const usage = countUsage(cells, series);
    const countByCode = new Map(usage.map((row) => [row.color.code, row.count]));
    let bestDelta = Number.POSITIVE_INFINITY;
    let mergeFrom = codes[0]!;
    let mergeTo = codes[1] ?? codes[0]!;

    for (let i = 0; i < codes.length; i += 1) {
      const a = codes[i]!;
      const labA = labByCode.get(a);
      if (!labA) continue;
      for (let j = i + 1; j < codes.length; j += 1) {
        const b = codes[j]!;
        const labB = labByCode.get(b);
        if (!labB) continue;
        const d = deltaE(labA, labB);
        if (d < bestDelta) {
          bestDelta = d;
          const countA = countByCode.get(a) ?? 0;
          const countB = countByCode.get(b) ?? 0;
          if (countA <= countB) {
            mergeFrom = a;
            mergeTo = b;
          } else {
            mergeFrom = b;
            mergeTo = a;
          }
        }
      }
    }

    remapCells(cells, mergeFrom, mergeTo);
    codes = uniqueCodes(cells);
  }
}

function downsampleImage(
  source: CanvasImageSource,
  sourceWidth: number,
  sourceHeight: number,
  width: number,
  height: number,
): ImageData {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) {
    throw new Error("Canvas 2D context is unavailable.");
  }
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(source, 0, 0, sourceWidth, sourceHeight, 0, 0, width, height);
  return ctx.getImageData(0, 0, width, height);
}

async function loadImage(file: File): Promise<{ source: CanvasImageSource; width: number; height: number }> {
  if (typeof createImageBitmap === "function") {
    const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
    return { source: bitmap, width: bitmap.width, height: bitmap.height };
  }
  const url = URL.createObjectURL(file);
  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("Could not read the image file."));
      img.src = url;
    });
    return { source: image, width: image.naturalWidth, height: image.naturalHeight };
  } finally {
    URL.revokeObjectURL(url);
  }
}

export async function processImage(file: File, options: ProcessImageOptions): Promise<BeadPattern> {
  const palette = getPreparedPalette(options.series);
  if (palette.length === 0) {
    throw new Error(`No Artkal ${options.series}-series colors are loaded.`);
  }

  const image = await loadImage(file);
  const data = downsampleImage(image.source, image.width, image.height, options.width, options.height);
  if ("close" in image.source && typeof image.source.close === "function") {
    image.source.close();
  }

  const cells: string[][] = Array.from({ length: options.height }, () => Array<string>(options.width).fill(""));
  const { data: pixels } = data;

  for (let y = 0; y < options.height; y += 1) {
    const row = cells[y]!;
    for (let x = 0; x < options.width; x += 1) {
      const i = (y * options.width + x) * 4;
      const r = pixels[i] ?? 0;
      const g = pixels[i + 1] ?? 0;
      const b = pixels[i + 2] ?? 0;
      const a = pixels[i + 3] ?? 255;
      const lab = a < 16 ? rgbToLab(255, 255, 255) : rgbToLab(r, g, b);
      row[x] = nearestColor(lab, palette).code;
    }
  }

  limitDistinctColors(cells, options.series, options.maxColors, palette);
  const usage = countUsage(cells, options.series);

  return {
    width: options.width,
    height: options.height,
    series: options.series,
    cells,
    usage,
    totalBeads: options.width * options.height,
  };
}
