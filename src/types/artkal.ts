export type ArtkalSeries = "S" | "A" | "C";

export interface ArtkalColor {
  brand: "Artkal";
  series: ArtkalSeries;
  code: string;
  name: string;
  zhName: string;
  hex: string;
  rgb: [number, number, number];
}

export type PegboardPreset = "1" | "4" | "72" | "100" | "custom";

export interface GridSize {
  width: number;
  height: number;
}

export interface ColorUsage {
  color: ArtkalColor;
  count: number;
}

export interface BeadPattern {
  width: number;
  height: number;
  series: ArtkalSeries;
  /** Row-major grid of Artkal color codes. */
  cells: string[][];
  usage: ColorUsage[];
  totalBeads: number;
}

export interface ProcessImageOptions {
  width: number;
  height: number;
  maxColors: number;
  series: ArtkalSeries;
}

export const PEGBOARD_SIZE = 29;
export const PRESET_SIZES: Record<Exclude<PegboardPreset, "custom">, GridSize> = {
  "1": { width: PEGBOARD_SIZE, height: PEGBOARD_SIZE },
  "4": { width: PEGBOARD_SIZE * 2, height: PEGBOARD_SIZE * 2 },
  "72": { width: 72, height: 72 },
  "100": { width: 100, height: 100 },
};

export const MIN_GRID = 8;
export const MAX_GRID = 120;
export const MIN_COLORS = 5;
export const MAX_COLORS = 35;

/** Physical bead diameter in millimetres (1:1 print). */
export const BEAD_SIZE_MM: Record<ArtkalSeries, number> = {
  S: 5,
  A: 2.6,
  C: 2.6,
};
