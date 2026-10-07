import "server-only";
import { Resend } from "resend";
import { render } from "@react-email/render";
import * as React from "react";
import BusinessNotification, { type BusinessNotificationProps } from "@/emails/BusinessNotification";
import { business } from "@/content";

const DEFAULT_FROM = `${business.name} <onboarding@resend.dev>`;

export type EmailResult = "sent" | "not-configured" | "failed";

/** Emails a quote request to the owner (QUOTE_TO) through Resend. */
export async function sendQuoteEmail(props: BusinessNotificationProps): Promise<EmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_TO;
  if (!apiKey || !to) {
    console.warn("[quote] RESEND_API_KEY or QUOTE_TO not set; email skipped");
    return "not-configured";
  }
  const resend = new Resend(apiKey);
  const element = React.createElement(BusinessNotification, props);
  const [html, text] = await Promise.all([render(element), render(element, { plainText: true })]);
  const { error } = await resend.emails.send({
    from: process.env.EMAIL_FROM || DEFAULT_FROM,
    to: to
      .split(",")
      .map((address) => address.trim())
      .filter(Boolean),
    subject: `Quote request: ${props.name}`,
    html,
    text,
  });
  if (error) {
    console.error("[quote] Resend error", error);
    return "failed";
  }
  return "sent";
}
