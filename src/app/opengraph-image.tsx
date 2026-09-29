import { ImageResponse } from "next/og";
import { business } from "@/content";
import { baseUrl } from "@/lib/metadata";

export const runtime = "edge";
export const alt = "Precision Welding Solutions: welding, fabrication and machining in St. Thomas, Barbados";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Absolute logo URL: the dev server locally, the public site in production.
const logoUrl =
  process.env.NODE_ENV === "development" ? "http://localhost:3000/images/logo.png" : `${baseUrl}/images/logo.png`;

const HEADLINE = ["Precision welding.", "Clean. Strong.", "Exact."];
const EYEBROW = "St. Thomas, Barbados";
const SERVICES = "Welding · Fabrication · Machining";
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

async function loadLogo(): Promise<ArrayBuffer | null> {
  try {
    const res = await fetch(logoUrl);
    return res.ok ? await res.arrayBuffer() : null;
  } catch {
    return null;
  }
}

/** Branded 1200×630 card: logo left, the hero line right, on the site's black with a blue glow. */
export default async function OpenGraphImage() {
  const displayText = [...HEADLINE, EYEBROW, SERVICES].join(" ").toUpperCase();
  const [logo, montserrat, openSans] = await Promise.all([
    loadLogo(),
    googleFont("Montserrat", 800, displayText),
    googleFont("Open+Sans", 600, `${CTA}${SERVICES}`),
  ]);

  const fonts = [
    ...(montserrat ? [{ name: "Montserrat", data: montserrat, weight: 800 as const, style: "normal" as const }] : []),
    ...(openSans ? [{ name: "Open Sans", data: openSans, weight: 600 as const, style: "normal" as const }] : []),
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 56,
          padding: "0 72px 0 56px",
          backgroundColor: "#0a0b0d",
          backgroundImage:
            "radial-gradient(640px 420px at 22% 50%, rgba(30,127,224,0.30), transparent 70%), radial-gradient(900px 520px at 100% 0%, rgba(59,157,255,0.14), transparent 70%)",
          color: "#e6e9ed",
          fontFamily: "Open Sans",
        }}
      >
        {logo ? (
          // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
          <img src={logo as unknown as string} width={420} height={420} style={{ borderRadius: 24 }} />
        ) : (
          <div style={{ display: "flex", width: 420, height: 420 }} />
        )}

        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 26 }}>
            <div style={{ width: 40, height: 3, background: "#3b9dff" }} />
            <div
              style={{
                fontFamily: "Montserrat",
                fontSize: 20,
                letterSpacing: "0.22em",
                color: "#3b9dff",
                textTransform: "uppercase",
              }}
            >
              {EYEBROW}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: "Montserrat",
              fontSize: 66,
              lineHeight: 0.98,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
            }}
          >
            <span>{HEADLINE[0]}</span>
            <span>{HEADLINE[1]}</span>
            <span style={{ color: "#3b9dff" }}>{HEADLINE[2]}</span>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 30,
              fontFamily: "Montserrat",
              fontSize: 20,
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
              marginTop: 34,
              padding: "16px 26px",
              background: "#1e7fe0",
              borderRadius: 6,
              fontSize: 26,
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
}
