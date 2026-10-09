import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

// docs/claims.md marks these specific outcome and sector claims as UNVERIFIED.
// Scan only publishable source, not the evidence register itself.
const roots = ["src", "public"];
const extensions = new Set([".ts", ".tsx", ".json", ".txt", ".md"]);
const forbidden = [
  /(?:HK\$|HKD\s*)50(?:,|\.)000[^\n]{0,55}(?:\/\s*月|每月|per month|\/month|im Monat|月あたり)/iu,
  /(?:每月|月あたり|im Monat)[^\n]{0,55}(?:HK\$|HKD\s*)50(?:,|\.)000/iu,
  /已服務培訓中心[／/]診所[／/]Fitness[／/]專業服務/u,
  /Served training centres, clinics, fitness\s*&\s*professional services/iu,
];

async function filesUnder(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) return filesUnder(filename);
    return entry.isFile() && extensions.has(path.extname(filename)) ? [filename] : [];
  }));
  return nested.flat();
}

const files = (await Promise.all(roots.map(filesUnder))).flat();
const matches = [];
for (const filename of files) {
  const lines = (await readFile(filename, "utf8")).split("\n");
  lines.forEach((line, index) => {
    if (forbidden.some((pattern) => pattern.test(line))) matches.push(`${filename}:${index + 1}`);
  });
}
if (matches.length) {
  console.error(`Unverified public claims found:\n${matches.join("\n")}`);
  process.exitCode = 1;
} else {
  console.log("Public claims check passed.");
}
