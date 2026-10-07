import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

export interface BusinessNotificationProps {
  name: string;
  phone: string;
  details: string;
  /** Public site origin, for the logo and footer links. */
  siteUrl: string;
  /** ISO timestamp of when the request came in. */
  receivedAt: string;
}

/** Digits for wa.me. Local 7-digit Barbados numbers get the +1 246 prefix. */
export function whatsappDigits(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 7) return `1246${digits}`;
  if (digits.length === 10 && digits.startsWith("246")) return `1${digits}`;
  return digits;
}

const display = "Montserrat, 'Arial Black', 'Helvetica Neue', Arial, sans-serif";
const sans = "'Open Sans', 'Segoe UI', 'Helvetica Neue', Helvetica, Arial, sans-serif";

export default function BusinessNotification(props: BusinessNotificationProps) {
  const firstName = props.name.split(" ")[0] || props.name;
  const received = new Intl.DateTimeFormat("en-GB", {
    timeZone: "America/Barbados",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(props.receivedAt));
  const replyText = `Hi ${firstName}, this is Kris from Precision Welding Solutions about your quote request.`;
  const waHref = `https://wa.me/${whatsappDigits(props.phone)}?text=${encodeURIComponent(replyText)}`;
  const rows: [string, string][] = [
    ["Name", props.name],
    ["Phone / WhatsApp", props.phone],
    ["Received", `${received} (Barbados)`],
  ];

  return (
    <Html lang="en">
      <Head />
      <Preview>{`${props.name} wants a quote. Reply on WhatsApp: ${props.phone}`}</Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={header}>
            <Img
              src={`${props.siteUrl}/images/logo.png`}
              width="88"
              height="88"
              alt="Precision Welding Solutions"
              style={logo}
            />
          </Section>
          <Section style={band}>
            <Text style={bandText}>New quote request</Text>
          </Section>

          <Section style={card}>
            <Heading as="h1" style={heading}>
              {props.name}
            </Heading>
            <Text style={sub}>Quote request · {props.phone}</Text>
            <Hr style={rule} />
            {rows.map(([k, v]) => (
              <table key={k} width="100%" cellPadding={0} cellSpacing={0} role="presentation" style={row}>
                <tbody>
                  <tr>
                    <td style={cellKey}>{k}</td>
                    <td style={cellVal}>{v}</td>
                  </tr>
                </tbody>
              </table>
            ))}
            <Text style={sectionLabel}>The job</Text>
            <Text style={paragraph}>{props.details || "No description given. Ask for photos on WhatsApp."}</Text>
            <Button href={waHref} style={button}>
              Reply to {firstName} on WhatsApp
            </Button>
            <Text style={callLine}>
              or call <Link href={`tel:+${whatsappDigits(props.phone)}`} style={inlineLink}>{props.phone}</Link>
            </Text>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              Sent by the quote form at{" "}
              <Link href={props.siteUrl} style={footerLink}>
                {props.siteUrl.replace(/^https?:\/\//, "")}
              </Link>
            </Text>
            <Text style={footerText}>
              <Link href="https://instagram.com/precision_weldingsolutions" style={footerLink}>
                Instagram
              </Link>
              {"  ·  "}
              <Link href="https://wa.me/12462525877" style={footerLink}>
                WhatsApp
              </Link>
              {"  ·  "}Reece Rd, St. Thomas, Barbados
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const body: React.CSSProperties = { backgroundColor: "#eef1f4", fontFamily: sans, margin: 0, padding: "24px 0" };
const container: React.CSSProperties = { maxWidth: "560px", margin: "0 auto" };
const header: React.CSSProperties = { backgroundColor: "#0a0b0d", textAlign: "center", padding: "24px 0 20px", borderRadius: "4px 4px 0 0" };
const logo: React.CSSProperties = { display: "block", margin: "0 auto", borderRadius: "50%", border: "2px solid #1e7fe0" };
const band: React.CSSProperties = {
  backgroundColor: "#1e7fe0",
  backgroundImage: "repeating-linear-gradient(-45deg, transparent 0 20px, rgba(255,255,255,0.08) 20px 40px)",
  textAlign: "center",
  padding: "10px 0",
};
const bandText: React.CSSProperties = {
  margin: 0,
  color: "#ffffff",
  fontFamily: display,
  fontSize: "13px",
  fontWeight: 800,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
};
const card: React.CSSProperties = {
  backgroundColor: "#ffffff",
  border: "1px solid #dde3ea",
  borderTop: "0",
  borderRadius: "0 0 4px 4px",
  padding: "28px 28px 24px",
};
const heading: React.CSSProperties = {
  fontFamily: display,
  fontWeight: 800,
  fontSize: "24px",
  lineHeight: "30px",
  color: "#0a0b0d",
  textTransform: "uppercase",
  margin: "0 0 4px",
};
const sub: React.CSSProperties = { fontSize: "15px", lineHeight: "22px", color: "#4a5563", margin: 0 };
const rule: React.CSSProperties = { borderColor: "#dde3ea", margin: "18px 0" };
const row: React.CSSProperties = { borderBottom: "1px solid #eef1f4" };
const cellKey: React.CSSProperties = {
  width: "150px",
  padding: "9px 0",
  fontSize: "12px",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "#4a5563",
  fontWeight: 600,
  verticalAlign: "top",
};
const cellVal: React.CSSProperties = { padding: "9px 0", fontSize: "15px", lineHeight: "22px", color: "#0a0b0d", verticalAlign: "top" };
const sectionLabel: React.CSSProperties = {
  fontSize: "12px",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "#1e7fe0",
  fontWeight: 700,
  margin: "22px 0 6px",
};
const paragraph: React.CSSProperties = { fontSize: "15px", lineHeight: "24px", color: "#0a0b0d", margin: "0 0 24px", whiteSpace: "pre-wrap" };
const button: React.CSSProperties = {
  backgroundColor: "#1e7fe0",
  color: "#ffffff",
  fontSize: "15px",
  fontWeight: 600,
  padding: "14px 24px",
  borderRadius: "4px",
  textDecoration: "none",
  display: "inline-block",
};
const callLine: React.CSSProperties = { fontSize: "14px", lineHeight: "20px", color: "#4a5563", margin: "12px 0 0" };
const inlineLink: React.CSSProperties = { color: "#1e7fe0", fontWeight: 600 };
const footer: React.CSSProperties = { padding: "20px 8px 0", textAlign: "center" };
const footerText: React.CSSProperties = { fontSize: "12px", lineHeight: "18px", color: "#6b7480", margin: "0 0 6px" };
const footerLink: React.CSSProperties = { color: "#1e7fe0" };
