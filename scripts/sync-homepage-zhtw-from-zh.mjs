/**
 * Populate homepage.zh-tw.json from translations.zh (HK Traditional) — no external API.
 * For homepage-keys missing from zh, falls back to EN (logged).
 *
 *   node scripts/sync-homepage-zhtw-from-zh.mjs
 */
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const keysPath = path.join(root, "scripts/homepage-keys.json");
const ctxPath = path.join(root, "src/app/LanguageContext.tsx");
const twPath = path.join(root, "src/messages/homepage.zh-tw.json");

function extractLangBlock(langKey) {
  const txt = fs.readFileSync(ctxPath, "utf8");
  const needle = `\n  ${langKey}: {`;
  const start = txt.indexOf(needle);
  if (start === -1) throw new Error(`missing ${langKey}`);
  const from = start + needle.length;
  const rest = txt.slice(from);
  let brace = 1;
  let i = 0;
  while (i < rest.length && brace > 0) {
    const c = rest[i];
    if (c === "{") brace++;
    else if (c === "}") brace--;
    i++;
  }
  return rest.slice(0, i - 1);
}

function skipWs(i, s) {
  while (i < s.length && /\s/.test(s[i])) i++;
  return i;
}

function skipLineComment(i, s) {
  if (s.slice(i, i + 2) === "//") {
    while (i < s.length && s[i] !== "\n") i++;
  }
  return i;
}

function readSingleQuotedKey(i, s) {
  if (s[i] !== "'") return null;
  i++;
  let key = "";
  while (i < s.length) {
    if (s[i] === "\\") {
      key += s[i + 1];
      i += 2;
      continue;
    }
    if (s[i] === "'") return { key, next: i + 1 };
    key += s[i];
    i++;
  }
  throw new Error("unterminated translation key");
}

function readSingleQuotedString(i, s) {
  if (s[i] !== "'") return null;
  i++;
  let val = "";
  while (i < s.length) {
    if (s[i] === "\\") {
      val += s[i + 1];
      i += 2;
      continue;
    }
    if (s[i] === "'") return { value: val, next: i + 1 };
    val += s[i];
    i++;
  }
  throw new Error("unterminated single-quoted string");
}

function readDoubleQuotedString(i, s) {
  if (s[i] !== '"') return null;
  i++;
  let val = "";
  while (i < s.length) {
    if (s[i] === "\\") {
      val += s[i + 1];
      i += 2;
      continue;
    }
    if (s[i] === '"') return { value: val, next: i + 1 };
    val += s[i];
    i++;
  }
  throw new Error("unterminated double-quoted string");
}

function readTemplateLiteral(i, s) {
  if (s[i] !== "`") return null;
  i++;
  let val = "";
  while (i < s.length) {
    if (s[i] === "\\") {
      val += s[i + 1];
      i += 2;
      continue;
    }
    if (s[i] === "`") return { value: val, next: i + 1 };
    if (s[i] === "$" && s[i + 1] === "{") {
      let depth = 1;
      i += 2;
      while (i < s.length && depth > 0) {
        if (s[i] === "{") depth++;
        else if (s[i] === "}") depth--;
        i++;
      }
      val += String(new Date().getFullYear());
      continue;
    }
    val += s[i];
    i++;
  }
  throw new Error("unterminated template literal");
}

function parseTranslationBlock(block) {
  const map = {};
  let i = 0;
  while (i < block.length) {
    i = skipWs(i, block);
    if (i >= block.length) break;
    const beforeComment = i;
    i = skipLineComment(i, block);
    if (i !== beforeComment) continue;
    i = skipWs(i, block);

    const kr = readSingleQuotedKey(i, block);
    if (!kr) {
      i++;
      continue;
    }
    i = kr.next;
    i = skipWs(i, block);
    if (block[i] !== ":") {
      i++;
      continue;
    }
    i++;
    i = skipWs(i, block);

    const vr =
      readSingleQuotedString(i, block) ??
      readDoubleQuotedString(i, block) ??
      readTemplateLiteral(i, block);
    if (!vr) {
      throw new Error(`No parseable value for key '${kr.key}' near: ${block.slice(i, i + 80)}`);
    }
    map[kr.key] = vr.value;
    i = vr.next;
    i = skipWs(i, block);
    if (block[i] === ",") i++;
  }
  return map;
}

const keys = JSON.parse(fs.readFileSync(keysPath, "utf8"));
const zh = parseTranslationBlock(extractLangBlock("zh"));
const en = parseTranslationBlock(extractLangBlock("en"));

const out = {};
const fallbacks = [];
for (const k of keys) {
  if (zh[k] != null && zh[k] !== "") out[k] = zh[k];
  else if (en[k] != null) {
    out[k] = en[k];
    fallbacks.push(k);
  }
}

if (fallbacks.length) {
  console.warn("zh missing, used EN:", fallbacks.length, fallbacks.slice(0, 30));
}

fs.writeFileSync(twPath, `${JSON.stringify(out, null, 2)}\n`);
console.error("wrote", twPath, "keys", keys.length);
