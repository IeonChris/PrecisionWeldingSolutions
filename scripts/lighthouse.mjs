/**
 * Runs Lighthouse (mobile and desktop) against the home page and prints the four category scores.
 *
 *   npm run build && npm run start      # in one terminal (or build:exfat on an exFAT drive)
 *   npm run lighthouse                  # in another; or LH_URL=https://your-domain npm run lighthouse
 *
 * Reports are written to ./lighthouse (git-ignored). Needs Google Chrome; set CHROME_PATH if it
 * is not in the default location.
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";

const BASE = (process.env.LH_URL || "http://localhost:3000").replace(/\/+$/, "");
const OUT = path.join(process.cwd(), "lighthouse");

if (!process.env.CHROME_PATH && process.platform === "win32") {
  process.env.CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
}

await fs.mkdir(OUT, { recursive: true });

for (const formFactor of ["mobile", "desktop"]) {
  const file = path.join(OUT, `home-${formFactor}.json`);
  const args = [
    "--yes",
    "lighthouse@12",
    `${BASE}/`,
    "--only-categories=performance,accessibility,best-practices,seo",
    `--form-factor=${formFactor}`,
    formFactor === "desktop" ? "--preset=desktop" : "--screenEmulation.mobile",
    "--throttling-method=simulate",
    "--output=json",
    `--output-path=${file}`,
    "--quiet",
    '--chrome-flags="--headless=new --no-sandbox"',
  ];
  process.stdout.write(`Auditing / (${formFactor}) ... `);
  const run = spawnSync("npx", args, { stdio: ["ignore", "ignore", "inherit"], shell: true });
  if (run.status !== 0) {
    console.log("failed");
    continue;
  }
  const json = JSON.parse(await fs.readFile(file, "utf8"));
  const c = json.categories;
  const score = (k) => Math.round(c[k].score * 100);
  console.log(
    `performance ${score("performance")} · accessibility ${score("accessibility")} · best practices ${score("best-practices")} · SEO ${score("seo")}`,
  );
  const failing = Object.values(json.audits).filter(
    (a) => a.score !== null && a.score < 0.9 && a.scoreDisplayMode !== "informative" && a.scoreDisplayMode !== "manual",
  );
  for (const a of failing) console.log(`   - ${a.id}: ${a.title}${a.displayValue ? ` (${a.displayValue})` : ""}`);
}
