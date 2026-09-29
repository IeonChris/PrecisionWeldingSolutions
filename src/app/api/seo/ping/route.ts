import { NextRequest, NextResponse } from "next/server";
import { baseUrl } from "@/lib/metadata";

export const dynamic = "force-dynamic";

/**
 * GET /api/seo/ping?token=PING_SECRET (or Authorization: Bearer PING_SECRET)
 * Pings Google and Bing with the sitemap URL after a content change.
 *
 * Note: Google retired its sitemap ping endpoint in 2023 and now answers 404; submitting the
 * sitemap once in Search Console is what counts there. The call is kept for parity with our
 * other sites and harmlessly reports the status it gets back.
 */
export async function GET(request: NextRequest) {
  const secret = process.env.PING_SECRET;
  const bearer = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  const token = bearer || request.nextUrl.searchParams.get("token");
  if (!secret || token !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sitemap = `${baseUrl}/sitemap.xml`;
  const encoded = encodeURIComponent(sitemap);

  const [google, bing] = await Promise.allSettled([
    fetch(`https://www.google.com/ping?sitemap=${encoded}`, { cache: "no-store" }),
    fetch(`https://www.bing.com/ping?sitemap=${encoded}`, { cache: "no-store" }),
  ]);

  const summarise = (r: PromiseSettledResult<Response>) => ({
    success: r.status === "fulfilled" && r.value.ok,
    status: r.status === "fulfilled" ? r.value.status : "error",
  });

  return NextResponse.json({
    sitemap,
    google: summarise(google),
    bing: summarise(bing),
    timestamp: new Date().toISOString(),
  });
}
