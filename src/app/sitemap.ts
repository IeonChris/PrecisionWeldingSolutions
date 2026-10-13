import type { MetadataRoute } from "next";
import { images, reasons } from "@/content";
import { baseUrl } from "@/lib/metadata";

/**
 * One public page; its sections are anchors, not URLs. Kris's job photos are listed with it so Google
 * Images can index them. `lastModified` is the build time, which on Vercel is when the site last changed.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const photos = [images.hero, images.about, ...reasons.map((r) => r.image), images.contactBg]
    .map((image) => image.src)
    .filter((src): src is string => !!src);
  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      images: [...new Set(photos)].map((src) => `${baseUrl}${src}`),
    },
  ];
}
