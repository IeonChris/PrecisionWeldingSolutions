import "server-only";
import { business, instagramFallbackPosts } from "@/content";

/**
 * Latest Instagram posts for the #work grid.
 *
 * Sources, first configured wins:
 *   1. INSTAGRAM_FEED_URL      a Behold (behold.so) JSON feed. Behold refreshes the Instagram token for you.
 *   2. INSTAGRAM_ACCESS_TOKEN  a long-lived Instagram API token (Instagram Login, Business/Creator account).
 *                              Expires after 60 days unless refreshed: see `npm run instagram:refresh`.
 * Anything missing or failing falls back to `instagramFallbackPosts` in src/content.ts.
 *
 * Requests are cached by Next and re-fetched at most once an hour (ISR).
 */

export interface FeedPost {
  id: string;
  href: string;
  caption: string;
  image: string | null;
  isVideo: boolean;
  /** Run the image through next/image. False for sources that already serve resized WebP. */
  optimize: boolean;
}

export type FeedSource = "behold" | "instagram" | "fallback";

export const INSTAGRAM_REVALIDATE_SECONDS = 3600;
const GRAPH_API = "https://graph.instagram.com/v25.0";
const LIMIT = 6;

/** First line of the caption, hashtags stripped, trimmed to fit a tile. */
export function tidyCaption(raw: string | null | undefined, max = 90): string {
  if (!raw) return "";
  const firstLine = raw
    .split("\n")
    .map((line) => line.trim())
    .find(Boolean) ?? "";
  const text = firstLine
    .replace(/(^|\s)#[\p{L}\p{N}_]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
}

interface GraphMedia {
  id: string;
  caption?: string;
  media_type?: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url?: string;
  thumbnail_url?: string;
  permalink?: string;
}

async function fromInstagram(token: string): Promise<FeedPost[]> {
  const url = new URL(`${GRAPH_API}/me/media`);
  url.searchParams.set("fields", "id,caption,media_type,media_url,thumbnail_url,permalink");
  url.searchParams.set("limit", String(LIMIT));
  url.searchParams.set("access_token", token);
  const res = await fetch(url, { next: { revalidate: INSTAGRAM_REVALIDATE_SECONDS, tags: ["instagram"] } });
  if (!res.ok) throw new Error(`Instagram API responded ${res.status}`);
  const json = (await res.json()) as { data?: GraphMedia[] };
  return (json.data ?? []).map((m) => ({
    id: m.id,
    href: m.permalink ?? business.instagram.url,
    caption: tidyCaption(m.caption),
    image: (m.media_type === "VIDEO" ? m.thumbnail_url : m.media_url) ?? null,
    isVideo: m.media_type === "VIDEO",
    optimize: true,
  }));
}

interface BeholdSize {
  mediaUrl: string;
  width: number;
  height: number;
}

interface BeholdPost {
  id: string;
  permalink?: string;
  mediaType?: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  mediaUrl?: string;
  thumbnailUrl?: string;
  caption?: string;
  prunedCaption?: string;
  sizes?: Partial<Record<"small" | "medium" | "large" | "full", BeholdSize>>;
}

/** Smallest Behold rendition that is still sharp on a ~200px tile at 2x. */
function beholdImage(p: BeholdPost): string | null {
  const sizes = p.sizes ?? {};
  const pick = [sizes.small, sizes.medium, sizes.large, sizes.full].find((s) => s && s.width >= 400) ?? sizes.full;
  return pick?.mediaUrl ?? (p.mediaType === "VIDEO" ? p.thumbnailUrl : p.mediaUrl) ?? null;
}

async function fromBehold(feedUrl: string): Promise<FeedPost[]> {
  const res = await fetch(feedUrl, { next: { revalidate: INSTAGRAM_REVALIDATE_SECONDS, tags: ["instagram"] } });
  if (!res.ok) throw new Error(`Behold feed responded ${res.status}`);
  const json = (await res.json()) as { posts?: BeholdPost[] } | BeholdPost[];
  const posts = Array.isArray(json) ? json : (json.posts ?? []);
  return posts.map((p) => ({
    id: p.id,
    href: p.permalink ?? business.instagram.url,
    caption: tidyCaption(p.prunedCaption ?? p.caption),
    image: beholdImage(p),
    isVideo: p.mediaType === "VIDEO",
    optimize: false,
  }));
}

function fallbackPosts(): FeedPost[] {
  return instagramFallbackPosts.map((p) => ({
    id: p.id,
    href: p.href ?? business.instagram.url,
    caption: p.caption,
    image: p.image ?? null,
    isVideo: p.isVideo,
    optimize: true,
  }));
}

export async function getInstagramFeed(): Promise<{ posts: FeedPost[]; source: FeedSource }> {
  const feedUrl = process.env.INSTAGRAM_FEED_URL;
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  try {
    if (feedUrl) {
      const posts = await fromBehold(feedUrl);
      if (posts.length > 0) return { posts: posts.slice(0, LIMIT), source: "behold" };
    } else if (token) {
      const posts = await fromInstagram(token);
      if (posts.length > 0) return { posts: posts.slice(0, LIMIT), source: "instagram" };
    }
  } catch (err) {
    // Never log the request URL: it carries the access token.
    console.error("[instagram] live feed unavailable, showing fallback posts:", err instanceof Error ? err.message : err);
  }
  return { posts: fallbackPosts(), source: "fallback" };
}
