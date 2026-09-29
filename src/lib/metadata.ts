import type { Metadata } from "next";
import { business, images, services } from "@/content";

function normaliseUrl(raw: string): string {
  const withProtocol = raw.startsWith("http") ? raw : `https://${raw}`;
  return withProtocol.replace(/\/+$/, "");
}

/**
 * Canonical origin. NEXT_PUBLIC_SITE_URL wins; on Vercel the production (or preview) URL is
 * used; `next dev` uses localhost; anything else falls back to `business.url`.
 */
function resolveBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return normaliseUrl(process.env.NEXT_PUBLIC_SITE_URL);
  if (process.env.VERCEL_ENV === "production" && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return normaliseUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL);
  }
  if (process.env.VERCEL_URL) return normaliseUrl(process.env.VERCEL_URL);
  if (process.env.NODE_ENV === "development") return "http://localhost:3000";
  return normaliseUrl(business.url);
}

export const baseUrl = resolveBaseUrl();

export const sameAs: string[] = [business.instagram.url];

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.mapQuery)}`;

interface CreateMetadataArgs {
  /** Full page title, used as-is. */
  title: string;
  description: string;
  path?: string;
}

export function createMetadata({ title, description, path = "/" }: CreateMetadataArgs): Metadata {
  const url = `${baseUrl}${path}`;
  const ogImage = { url: "/opengraph-image", width: 1200, height: 630, alt: `${business.name} logo` };
  return {
    title: { absolute: title },
    description,
    metadataBase: new URL(baseUrl),
    alternates: { canonical: url },
    applicationName: business.name,
    openGraph: {
      title,
      description,
      url,
      siteName: business.name,
      locale: "en_BB",
      type: "website",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage.url],
    },
    robots: { index: true, follow: true },
    formatDetection: { telephone: false },
  };
}

/* ---------- Structured data ---------- */

export function createLocalBusinessSchema() {
  const { address, geo } = business;
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${baseUrl}/#business`,
    name: business.name,
    description: business.description,
    url: `${baseUrl}/`,
    telephone: business.phone.e164,
    image: `${baseUrl}${images.logo.src}`,
    logo: `${baseUrl}${images.logo.src}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      addressLocality: address.locality,
      addressRegion: address.region,
      addressCountry: address.countryCode,
    },
    geo: { "@type": "GeoCoordinates", latitude: geo.latitude, longitude: geo.longitude },
    hasMap: mapsUrl,
    openingHoursSpecification: business.hours.schema.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${h.dayOfWeek}`,
      opens: h.opens,
      closes: h.closes,
    })),
    areaServed: { "@type": "Country", name: address.country },
    sameAs,
  };
}

/** The services section, as a Service with its catalogue of offers. */
export function createServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${baseUrl}/#services`,
    name: "Welding, fabrication and machining",
    serviceType: "Welding, metal fabrication and machining",
    provider: { "@id": `${baseUrl}/#business` },
    areaServed: { "@type": "Country", name: business.address.country },
    url: `${baseUrl}/#services`,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, description: s.desc },
      })),
    },
  };
}

/** The same services as an ordered ItemList. */
export function createServicesListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${business.name} services`,
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: s.title,
        description: s.desc,
        provider: { "@id": `${baseUrl}/#business` },
      },
    })),
  };
}

/** For future sub-pages; the one-page site has no breadcrumb trail to publish yet. */
export function createBreadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${baseUrl}${item.path}`,
    })),
  };
}
