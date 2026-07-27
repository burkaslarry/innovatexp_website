import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const OUT = path.join(process.cwd(), "docs", "screenshots", "round2-ui");
const BASE = process.env.SCREENSHOT_BASE || "http://localhost:3000";

const shots = [
  { name: "homepage-zh-hk-hero", url: "/zh-hk", wait: 1200 },
  { name: "homepage-zh-hk-programs", url: "/zh-hk#programs", wait: 800 },
  { name: "homepage-zh-hk-pricing", url: "/zh-hk#ai-coaching-pricing", wait: 800 },
  { name: "homepage-en-nav", url: "/en#product-pillars", wait: 800 },
  { name: "bookme-zh-hk", url: "/zh-hk/bookme", wait: 1500 },
  { name: "not-found-ja", url: "/ja/this-page-does-not-exist-xyz", wait: 600 },
];

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch();
  const desktop = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const mobile = await browser.newPage({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });

  for (const shot of shots) {
    const url = `${BASE}${shot.url}`;
    for (const [suffix, page] of [
      ["desktop", desktop],
      ["mobile", mobile],
    ]) {
      await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
      await page.waitForTimeout(shot.wait);
      const file = path.join(OUT, `${shot.name}-${suffix}.png`);
      await page.screenshot({ path: file, fullPage: shot.name.startsWith("homepage") && suffix === "desktop" });
      console.log("saved", file);
    }
  }

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
