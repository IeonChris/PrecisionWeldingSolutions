import type { NextConfig } from "next";

/*
 * Content-Security-Policy. The page is static (ISR) and Next.js adds small inline scripts to it, so
 * scripts allow 'unsafe-inline' from this origin only (a nonce would force every request to render on
 * the server). Outside sources: the Google Maps embed, and Instagram images (Behold, or Meta's CDNs).
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  // Vercel Analytics is same-origin (/_vercel/insights) in production; `next dev` loads its debug script from va.vercel-scripts.com.
  `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === "development" ? " 'unsafe-eval' https://va.vercel-scripts.com" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://behold.pictures https://*.cdninstagram.com https://*.fbcdn.net",
  "font-src 'self'",
  "media-src 'self'",
  "connect-src 'self'",
  "frame-src https://www.google.com https://maps.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Live Instagram media (Graph API) is served from Meta's CDNs. Behold feed images are
    // already resized WebP and are rendered unoptimized, so they need no entry here.
    remotePatterns: [
      { protocol: "https", hostname: "**.cdninstagram.com" },
      { protocol: "https", hostname: "**.fbcdn.net" },
    ],
  },
  experimental: {
    // Inline the (small) stylesheet into the HTML so first paint needs no extra round trip.
    inlineCss: true,
  },
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }],
      },
      {
        source: "/media/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }],
      },
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: contentSecurityPolicy },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
