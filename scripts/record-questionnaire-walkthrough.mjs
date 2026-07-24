/**
 * Screen-record AI Consultation Questionnaire walkthrough (zh-hk).
 * Writes public/videos/questionnaire-walkthrough.{webm,mp4}
 *
 * Usage:
 *   QUESTIONNAIRE_URL=http://localhost:3456/zh-hk/ai-consultation-questionnaire node scripts/record-questionnaire-walkthrough.mjs
 *   COLOR_SCHEME=dark …  # optional dark-mode capture
 */
import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "../public/videos");
const URL =
  process.env.QUESTIONNAIRE_URL ||
  "http://localhost:3456/zh-hk/ai-consultation-questionnaire";
const COLOR_SCHEME = process.env.COLOR_SCHEME === "dark" ? "dark" : "light";

async function clickChip(page, label) {
  await page.getByRole("button", { name: label }).first().click();
  await page.waitForTimeout(320);
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const videoDir = path.join(OUT_DIR, "_pw-video-tmp");
  fs.rmSync(videoDir, { recursive: true, force: true });
  fs.mkdirSync(videoDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    locale: "zh-HK",
    colorScheme: COLOR_SCHEME,
    recordVideo: { dir: videoDir, size: { width: 1280, height: 800 } },
  });
  const page = await context.newPage();

  // Demo recording: mock API so success + pricing screen always appears
  await page.route("**/api/questionnaire", async (route) => {
    await new Promise((r) => setTimeout(r, 700));
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true, email: { provider: "demo" }, notion: { ok: true } }),
    });
  });

  console.log("Opening", URL, "colorScheme=", COLOR_SCHEME);
  await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(1000);
  await page.locator("text=3 分鐘 AI 流程健康檢查").first().scrollIntoViewIfNeeded();
  await page.waitForTimeout(700);

  // A — pause after first selection so white-on-primary chips are visible
  await clickChip(page, "專業服務／顧問");
  await page.waitForTimeout(500);
  await clickChip(page, "創辦人／老闆");
  await clickChip(page, "3–10 人");
  await page.waitForTimeout(400);
  await page.getByRole("button", { name: "下一頁" }).click();
  await page.waitForTimeout(700);

  // B
  await clickChip(page, "WhatsApp／電話／網站查詢跟進");
  await clickChip(page, "Sales pipeline／報價／客戶跟進");
  await clickChip(page, "資料散落 WhatsApp、Excel、Email、表單");
  await clickChip(page, "容易漏跟進、漏客或漏單");
  await clickChip(page, "2–5 小時");
  await clickChip(page, "影響明顯");
  await page.getByRole("button", { name: "下一頁" }).click();
  await page.waitForTimeout(700);

  // C
  await clickChip(page, "有用 ChatGPT／Claude 等，但未融入流程");
  await clickChip(page, "更快回覆客戶");
  await clickChip(page, "減少漏單／漏跟進");
  await clickChip(page, "1–3 個月內");
  await page.getByRole("button", { name: "下一頁" }).click();
  await page.waitForTimeout(700);

  // D
  await clickChip(page, "可以先了解");
  await page.getByPlaceholder("你的稱呼").fill("Larry Demo");
  await page.getByPlaceholder("公司／機構").fill("InnovateXP Demo Co");
  await page.getByPlaceholder("you@company.com").fill("demo+questionnaire@innovatexp.co");
  await page.locator('input[type="tel"]').fill("+85290000000");
  await page.waitForTimeout(400);
  await page.getByRole("checkbox").check();
  await page.waitForTimeout(400);
  await page.getByRole("button", { name: "提交問卷" }).click();

  await page.getByText("多謝完成流程健康檢查").waitFor({ timeout: 20000 });
  console.log("Success screen visible");
  await page.waitForTimeout(1500);
  await page.evaluate(() => window.scrollBy(0, 360));
  await page.waitForTimeout(1800);
  await page.screenshot({
    path: path.join(OUT_DIR, `questionnaire-walkthrough-final-${COLOR_SCHEME}.png`),
    fullPage: true,
  });

  await page.close();
  await context.close();
  await browser.close();

  const videos = fs.readdirSync(videoDir).filter((f) => f.endsWith(".webm"));
  if (!videos.length) throw new Error("No video produced");
  const webmOut = path.join(OUT_DIR, "questionnaire-walkthrough.webm");
  const mp4Out = path.join(OUT_DIR, "questionnaire-walkthrough.mp4");
  fs.copyFileSync(path.join(videoDir, videos[0]), webmOut);
  fs.rmSync(videoDir, { recursive: true, force: true });

  execSync(
    `ffmpeg -y -i "${webmOut}" -c:v libx264 -pix_fmt yuv420p -movflags +faststart -an "${mp4Out}"`,
    { stdio: "inherit" },
  );
  console.log("Wrote", mp4Out);
  console.log("Wrote", webmOut);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
