import { images, reasons } from "@/content";
import { baseUrl } from "@/lib/metadata";

/*
 * Written by hand rather than with app/sitemap.ts: Next puts <image:image> entries before <lastmod>,
 * but the sitemap schema requires extension elements after <priority>, and Search Console reported
 * the generated file as unreadable. One public page (its sections are anchors), with Kris's job
 * photos listed as image entries so Google Images can index them. <lastmod> is the build time,
 * which on Vercel is when the site last changed.
 */
export const dynamic = "force-static";

const escapeXml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

export function GET() {
  const photos = [images.hero, images.about, ...reasons.map((r) => r.image), images.contactBg]
    .map((image) => image.src)
    .filter((src): src is string => !!src);
  const imageEntries = [...new Set(photos)]
    .map((src) => `    <image:image>\n      <image:loc>${escapeXml(`${baseUrl}${src}`)}</image:loc>\n    </image:image>`)
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${escapeXml(`${baseUrl}/`)}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
${imageEntries}
  </url>
</urlset>
`;

  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
