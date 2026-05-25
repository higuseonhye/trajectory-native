/**
 * Capture README + X/social screenshots from the live dev app.
 * Usage: node scripts/capture-readme-screenshots.mjs
 *
 * X posts: use x-post-v08-viewport.png (exact 1200×675 viewport — NOT full-page main).
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "docs", "screenshots");
const LAUNCH = path.join(__dirname, "..", "assets", "launch");
const BASE = "http://localhost:3000";

const SOCIAL_W = 1200;
const SOCIAL_H = 675;

/** Viewport-only clip — never screenshot full scroll height of main. */
async function viewportShot(page, file) {
  await page.screenshot({
    path: file,
    clip: { x: 0, y: 0, width: SOCIAL_W, height: SOCIAL_H },
  });
  console.log("wrote", path.basename(file), `(${SOCIAL_W}×${SOCIAL_H})`);
}

async function main() {
  await mkdir(OUT, { recursive: true });
  await mkdir(LAUNCH, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1100, height: 900 } });
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.evaluate(() => localStorage.removeItem("trajectory-native:trajectory-events"));
  await page.reload({ waitUntil: "networkidle" });
  await page.waitForTimeout(2000);
  await page.getByRole("heading", { name: "Stop drifting quietly." }).waitFor({
    timeout: 30000,
  });

  const main = page.locator("main").first();

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

  // README hero — full scroll (intentionally tall for GitHub)
  await main.screenshot({ path: path.join(OUT, "demo-hero.png") });
  console.log("wrote demo-hero.png");

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

  // --- X / social: strict viewport crops only ---
  await page.setViewportSize({ width: SOCIAL_W, height: SOCIAL_H });
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  await page.evaluate(() => window.scrollTo(0, 0));

  const topViewport = path.join(OUT, "x-post-v08-viewport.png");
  await viewportShot(page, topViewport);
  await viewportShot(page, path.join(OUT, "demo-hero-social-16x9.png"));
  await viewportShot(page, path.join(LAUNCH, "x-trajectory-infrastructure-v08.png"));

  // Focus crop: compounding + capital + graph visible
  const compounding = page.getByRole("heading", { name: "Compounding analysis" });
  if (await compounding.count()) {
    await compounding.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await viewportShot(page, path.join(OUT, "x-post-v08-compounding-focus.png"));
    await viewportShot(page, path.join(LAUNCH, "x-compounding-focus-v08.png"));
  } else {
    console.warn("skip compounding-focus — section not rendered");
  }

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
