/**
 * Capture README screenshots from the live dev app.
 * Usage: node scripts/capture-readme-screenshots.mjs
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "docs", "screenshots");
const BASE = "http://localhost:3000";

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1100, height: 900 } });
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);

  const main = page.locator("main").first();
  await main.screenshot({ path: path.join(OUT, "demo-hero.png") });
  console.log("wrote demo-hero.png");

  async function sectionShot(heading, file) {
    const section = page.locator("section").filter({
      has: page.getByRole("heading", { name: heading }),
    });
    if ((await section.count()) === 0) {
      console.warn("skip", file, "- no section", heading);
      return;
    }
    await section.first().scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    await section.first().screenshot({ path: path.join(OUT, file) });
    console.log("wrote", file);
  }

  await sectionShot("Intervention", "demo-intervention.png");
  await sectionShot("Momentum", "demo-momentum.png");
  await sectionShot("Interaction intelligence", "demo-interaction.png");
  await sectionShot("Native ↔ drift bridge", "demo-bridge.png");

  await main.screenshot({ path: path.join(OUT, "demo-full.png") });
  console.log("wrote demo-full.png");

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
