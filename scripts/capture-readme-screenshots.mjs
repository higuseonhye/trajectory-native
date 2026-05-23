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
  await sectionShot("Compounding analysis", "demo-compounding.png");
  await sectionShot("Capital & leverage reflection", "demo-capital-leverage.png");
  await sectionShot("Trajectory graph", "demo-trajectory-graph.png");
  await sectionShot("Decision journal", "demo-decision-journal.png");
  await sectionShot("Institutional memory", "demo-institutional-memory.png");
  await sectionShot("Interaction intelligence", "demo-interaction.png");
  await sectionShot("Native ↔ drift bridge", "demo-bridge.png");

  await main.screenshot({ path: path.join(OUT, "demo-full.png") });
  console.log("wrote demo-full.png");

  // 16:9 crop for X / social — top of workspace (hero + intervention + compounding)
  await page.setViewportSize({ width: 1200, height: 675 });
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  await main.screenshot({ path: path.join(OUT, "demo-hero-social-16x9.png") });
  console.log("wrote demo-hero-social-16x9.png");

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
