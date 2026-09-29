import "server-only";

/**
 * Best-effort rate limit for the quote form: 5 requests per IP per hour.
 * In-memory, so it only holds within one server instance. Together with the honeypot that is
 * enough for a small shop's form; swap in Upstash Redis if spam ever becomes a problem.
 */

const LIMIT = 5;
const WINDOW_MS = 60 * 60 * 1000;
const hits = new Map<string, number[]>();

export function checkRateLimit(key: string): { ok: boolean } {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= LIMIT) {
    hits.set(key, recent);
    return { ok: false };
  }
  recent.push(now);
  hits.set(key, recent);
  // Keep the map from growing without bound on a long-lived server.
  if (hits.size > 5000) {
    for (const [k, times] of hits) if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  }
  return { ok: true };
}
