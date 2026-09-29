import type { MetadataRoute } from "next";
import { baseUrl } from "@/lib/metadata";

/** One public page; its sections are anchors, not URLs. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 }];
}
