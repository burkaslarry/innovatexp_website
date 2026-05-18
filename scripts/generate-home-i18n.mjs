/**
 * One-off generator: fills src/messages/homepage.{zh-tw,ja,de}.json from EN strings.
 * Uses public-ish translate wrapper — run locally only when refreshing copy.
 *
 *   node scripts/generate-home-i18n.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { translate } from "@vitalets/google-translate-api";

const root = path.resolve(import.meta.dirname, "..");
const keysPath = path.join(root, "scripts/homepage-keys.json");
const ctxPath = path.join(root, "src/app/LanguageContext.tsx");

function extractLangBlock(langKey) {
  const txt = fs.readFileSync(ctxPath, "utf8");
  const needle = `\n  ${langKey}: {`;
  const start = txt.indexOf(needle);
  if (start === -1) throw new Error(`missing ${langKey}`);
  const from = start + needle.length;
  const rest = txt.slice(from);
  const depth = { brace: 1 };
  let i = 0;
  while (i < rest.length && depth.brace > 0) {
    const c = rest[i];
    if (c === "{") depth.brace++;
    else if (c === "}") depth.brace--;
    i++;
  }
  return rest.slice(0, i - 1);
}

/** Single-line 'key': 'value' | "value" entries only */
function parseSimpleStrings(block) {
  const map = {};
  for (const line of block.split("\n")) {
    let m = line.match(/^\s*'([^']+)':\s*'((?:\\'|[^'])*)'\s*,?\s*$/);
    if (m) {
      map[m[1]] = m[2].replace(/\\'/g, "'").replace(/\\\\/g, "\\");
      continue;
    }
    m = line.match(/^\s*'([^']+)':\s*"((?:\\"|[^"])*)"\s*,?\s*$/);
    if (m) {
      map[m[1]] = m[2].replace(/\\"/g, '"').replace(/\\\\/g, "\\");
    }
  }
  return map;
}

async function sleep(ms) {
  await new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const keys = JSON.parse(fs.readFileSync(keysPath, "utf8"));
  const enBlock = extractLangBlock("en");
  const enMap = parseSimpleStrings(enBlock);

  const missing = keys.filter((k) => enMap[k] == null || enMap[k] === "");
  if (missing.length) {
    console.warn("Missing EN strings for keys:", missing.length, missing.slice(0, 15));
  }

  const ja = {};
  const de = {};
  const zhtw = {};

  let n = 0;
  for (const key of keys) {
    const text = enMap[key];
    if (!text) continue;
    n++;
    try {
      const [toJa, toDe, toTw] = await Promise.all([
        translate(text, { to: "ja" }),
        translate(text, { to: "de" }),
        translate(text, { to: "zh-TW" }),
      ]);
      ja[key] = toJa.text;
      de[key] = toDe.text;
      zhtw[key] = toTw.text;
    } catch (e) {
      console.error("fail", key, e.message);
      ja[key] = text;
      de[key] = text;
      zhtw[key] = text;
    }
    if (n % 10 === 0) console.error("progress", n, "/", keys.length);
    await sleep(120);
  }

  const outDir = path.join(root, "src/messages");
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "homepage.ja.json"), JSON.stringify(ja, null, 2));
  fs.writeFileSync(path.join(outDir, "homepage.de.json"), JSON.stringify(de, null, 2));
  fs.writeFileSync(path.join(outDir, "homepage.zh-tw.json"), JSON.stringify(zhtw, null, 2));
  console.error("wrote", outDir, "keys", Object.keys(ja).length);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
