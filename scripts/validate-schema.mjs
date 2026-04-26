import fs from "node:fs";
import path from "node:path";

const targetFile = path.resolve("src/app/components/StructuredData.tsx");
const source = fs.readFileSync(targetFile, "utf8");

const requiredTokens = [
  '"@type": "Organization"',
  '"@type": "Service"',
  '"@type": "FAQPage"',
  "Azure OpenAI",
  "AI Agent",
  "AggregateOffer",
];

const missing = requiredTokens.filter((token) => !source.includes(token));

if (missing.length > 0) {
  console.error("Schema validation failed. Missing tokens:");
  for (const token of missing) {
    console.error(`- ${token}`);
  }
  process.exit(1);
}

console.log("Schema validation passed.");
