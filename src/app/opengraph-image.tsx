import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import sharp from "sharp";
import { business, images } from "@/content";

/*
 * Rendered once at build time on Node (not the edge) so the card can be re-encoded as JPEG:
 * WhatsApp silently drops link-preview images over ~300 KB, and a photo card as PNG is ~650 KB.
 * Assets are read from /public directly, so no absolute URLs are needed.
 */
export const dynamic = "force-static";
export const alt = "Precision Welding Solutions: welding and fabrication in St. Thomas, Barbados";
export const size = { width: 1200, height: 630 };
export const contentType = "image/jpeg";

const HEADLINE = ["Precision", "welding.", "Clean. Strong."];
const ACCENT = "Exact.";
const EYEBROW = "St. Thomas, Barbados";
const SERVICES = "Welding · Fabrication · Repairs";
const CTA = `WhatsApp ${business.phone.display}`;

/** Fetches a Google Font as TTF, subset to the characters actually drawn. */
async function googleFont(family: string, weight: number, text: string): Promise<ArrayBuffer | null> {
  try {
    const api = `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&text=${encodeURIComponent(text)}`;
    const css = await (await fetch(api)).text();
    const src = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);
    if (!src) return null;
    const res = await fetch(src[1]);
    return res.ok ? await res.arrayBuffer() : null;
  } catch {
    return null;
  }
}

/** A /public image as a data URI for Satori, or null if it's missing. */
async function publicImage(src: string | null): Promise<string | null> {
  if (!src) return null;
  try {
    const file = await readFile(path.join(process.cwd(), "public", src));
    const type = src.endsWith(".png") ? "image/png" : "image/jpeg";
    return `data:${type};base64,${file.toString("base64")}`;
  } catch {
    return null;
  }
}

/** Branded 1200×630 card: Kris's spark shower on the left fading into black, logo and hero line on the right. */
export default async function OpenGraphImage() {
  const displayText = [...HEADLINE, ACCENT, EYEBROW, SERVICES].join(" ").toUpperCase();
  const [logo, photo, montserrat, openSans] = await Promise.all([
    publicImage(images.logo.src),
    publicImage(images.share.src),
    googleFont("Montserrat", 800, displayText),
    googleFont("Open+Sans", 600, CTA),
  ]);

  const fonts = [
    ...(montserrat ? [{ name: "Montserrat", data: montserrat, weight: 800 as const, style: "normal" as const }] : []),
    ...(openSans ? [{ name: "Open Sans", data: openSans, weight: 600 as const, style: "normal" as const }] : []),
  ];

  const png = new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#0a0b0d",
          backgroundImage: "radial-gradient(900px 520px at 100% 0%, rgba(59,157,255,0.14), transparent 70%)",
          color: "#e6e9ed",
          fontFamily: "Open Sans",
        }}
      >
        <div style={{ display: "flex", position: "relative", width: 480, height: 630 }}>
          {photo ? (
            // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
            <img src={photo} width={480} height={630} style={{ objectFit: "cover" }} />
          ) : null}
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: 220,
              height: 630,
              backgroundImage: "linear-gradient(90deg, rgba(10,11,13,0), #0a0b0d)",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flex: 1, padding: "0 64px 0 28px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 28 }}>
            {logo ? (
              // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
              <img src={logo} width={84} height={84} style={{ borderRadius: 84, border: "2px solid #1e7fe0" }} />
            ) : null}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 32, height: 3, background: "#3b9dff" }} />
              <div
                style={{
                  fontFamily: "Montserrat",
                  fontSize: 19,
                  letterSpacing: "0.22em",
                  color: "#3b9dff",
                  textTransform: "uppercase",
                }}
              >
                {EYEBROW}
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: "Montserrat",
              fontSize: 60,
              lineHeight: 0.98,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
            }}
          >
            {HEADLINE.map((line) => (
              <span key={line}>{line}</span>
            ))}
            <span style={{ color: "#3b9dff" }}>{ACCENT}</span>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontFamily: "Montserrat",
              fontSize: 18,
              letterSpacing: "0.16em",
              color: "#8b95a1",
              textTransform: "uppercase",
            }}
          >
            {SERVICES}
          </div>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              alignItems: "center",
              gap: 12,
              marginTop: 30,
              padding: "15px 24px",
              background: "#1e7fe0",
              borderRadius: 6,
              fontSize: 24,
              color: "#ffffff",
            }}
          >
            <div style={{ width: 12, height: 12, borderRadius: 12, background: "#25d366" }} />
            {CTA}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );

  const jpeg = await sharp(Buffer.from(await png.arrayBuffer()))
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();
  return new Response(new Uint8Array(jpeg), { headers: { "Content-Type": contentType } });
}
