/**
 * Refreshes a long-lived Instagram API token (Instagram API with Instagram Login).
 *
 *   npm run instagram:refresh                      # reads INSTAGRAM_ACCESS_TOKEN from .env.local
 *   npm run instagram:refresh -- <token>           # or pass the token explicitly
 *
 * Long-lived tokens last 60 days. A token can be refreshed once it is at least 24 hours old and
 * has not expired; the refresh returns a NEW token, valid for 60 days from today. Paste it into
 * INSTAGRAM_ACCESS_TOKEN in Vercel (Settings → Environment Variables) and redeploy.
 *
 * Not needed when the feed comes from Behold (INSTAGRAM_FEED_URL): Behold refreshes for you.
 */
import fs from "node:fs";
import path from "node:path";

function tokenFromEnvFile() {
  const file = path.join(process.cwd(), ".env.local");
  if (!fs.existsSync(file)) return undefined;
  const line = fs
    .readFileSync(file, "utf8")
    .split(/\r?\n/)
    .find((l) => l.startsWith("INSTAGRAM_ACCESS_TOKEN="));
  return line?.slice("INSTAGRAM_ACCESS_TOKEN=".length).trim().replace(/^["']|["']$/g, "") || undefined;
}

const token = process.argv[2] || process.env.INSTAGRAM_ACCESS_TOKEN || tokenFromEnvFile();
if (!token) {
  console.error("No token. Pass one as an argument or set INSTAGRAM_ACCESS_TOKEN in .env.local.");
  process.exit(1);
}

const url = new URL("https://graph.instagram.com/refresh_access_token");
url.searchParams.set("grant_type", "ig_refresh_token");
url.searchParams.set("access_token", token);

const res = await fetch(url);
const body = await res.json().catch(() => ({}));
if (!res.ok || !body.access_token) {
  console.error(`Refresh failed (HTTP ${res.status}):`, body.error?.message ?? body);
  console.error("If the token has expired, generate a new one in the Meta developer dashboard.");
  process.exit(1);
}

const expires = new Date(Date.now() + Number(body.expires_in) * 1000);
console.log("New long-lived token (update INSTAGRAM_ACCESS_TOKEN in Vercel and .env.local, then redeploy):\n");
console.log(body.access_token);
console.log(`\nValid until ${expires.toISOString().slice(0, 10)}. Refresh again before then (a calendar reminder at ~50 days works).`);
