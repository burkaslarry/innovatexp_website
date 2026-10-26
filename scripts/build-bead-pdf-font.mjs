#!/usr/bin/env node
/**
 * Rebuild public/fonts/NotoSansSC-PDF.ttf (CJK subset for jsPDF UTF-8).
 * Requires: pyftsubset (fonttools) and a source Noto Sans SC TTF path.
 *
 * Usage:
 *   node scripts/build-bead-pdf-font.mjs /path/to/NotoSansSC.ttf
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = process.argv[2];
if (!source) {
  console.error("Usage: node scripts/build-bead-pdf-font.mjs /path/to/NotoSansSC.ttf");
  process.exit(1);
}

const palette = JSON.parse(readFileSync(join(root, "src/data/artkal-palette.json"), "utf8"));
const ui = `
拼豆圖紙生成器藍圖系列合共粒色中文數量請以比例列印格內色號對應色袋標籤
1:1拼豆紙每格行列下載購物清單色號
·×－—–／、。，：；（）【】「」『』％%
`;
const chars = new Set([...ui, ..."ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 .,;:!?@#%&*()[]{}<>/\\-+_=~`\"'|"]);
for (const color of palette) {
  for (const ch of `${color.zhName ?? ""}${color.name ?? ""}${color.code ?? ""}`) chars.add(ch);
}

const charsFile = join(root, "public/fonts/.bead-pdf-chars.txt");
const outFile = join(root, "public/fonts/NotoSansSC-PDF.ttf");
writeFileSync(charsFile, [...chars].join(""), "utf8");

const result = spawnSync(
  "pyftsubset",
  [
    source,
    `--text-file=${charsFile}`,
    `--output-file=${outFile}`,
    "--layout-features=*",
    "--glyph-names",
    "--symbol-cmap",
    "--legacy-cmap",
    "--notdef-glyph",
    "--notdef-outline",
    "--recommended-glyphs",
    "--name-IDs=*",
    "--name-legacy",
    "--name-languages=*",
  ],
  { stdio: "inherit" },
);

if (result.status !== 0) process.exit(result.status ?? 1);
console.log(`Wrote ${outFile} (${chars.size} unique chars)`);
