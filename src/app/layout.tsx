import type { Metadata, Viewport } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import { business } from "@/content";
import { createLocalBusinessSchema, createMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/JsonLd";
import "./globals.css";

/* Montserrat (headings, 500–800) and Open Sans (body, 400–600), self-hosted by next/font with display: swap. */
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
  variable: "--font-montserrat",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-open-sans",
});

export const metadata: Metadata = {
  ...createMetadata({
    title: "Precision Welding Solutions | Welding & Fabrication in Barbados",
    description: business.description,
  }),
  keywords: [
    "welding Barbados",
    "aluminum welding",
    "fabrication",
    "thread repair",
    "glow plug removal",
    "St. Thomas",
    "Bridgetown",
  ],
};

export const viewport: Viewport = {
  themeColor: "#0a0b0d",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${openSans.variable}`}>
      <head>
        <JsonLd data={createLocalBusinessSchema()} />
      </head>
      <body>{children}</body>
    </html>
  );
}
