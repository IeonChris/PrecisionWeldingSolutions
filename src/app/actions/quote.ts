"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { serviceOptions } from "@/content";
import { checkRateLimit } from "@/lib/rate-limit";
import { sendQuoteEmail } from "@/lib/email";
import { baseUrl } from "@/lib/metadata";

type FieldName = "name" | "phone" | "service" | "details";

export interface QuoteState {
  status: "idle" | "sent" | "error";
  message?: string;
  errors?: Partial<Record<FieldName, string>>;
}

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(120, "Keep your name under 120 characters."),
  phone: z
    .string()
    .trim()
    .max(40, "That number looks too long.")
    .refine((v) => (v.match(/\d/g) ?? []).length >= 7, "Enter a phone or WhatsApp number Kris can reach you on."),
  service: z.enum(serviceOptions, { message: "Choose a service." }),
  details: z.string().trim().max(4000, "Keep the description under 4,000 characters.").default(""),
});

const text = (value: FormDataEntryValue | null) => (typeof value === "string" ? value : undefined);

async function clientIp(): Promise<string> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  return (forwarded?.split(",")[0] ?? h.get("x-real-ip") ?? "unknown").trim();
}

export async function submitQuote(_prev: QuoteState, formData: FormData): Promise<QuoteState> {
  // Honeypot: people never see this field. Bots that fill it get a quiet "success".
  if (text(formData.get("company"))) return { status: "sent" };

  const parsed = schema.safeParse({
    name: text(formData.get("name")),
    phone: text(formData.get("phone")),
    service: text(formData.get("service")),
    details: text(formData.get("details")),
  });
  if (!parsed.success) {
    const errors: QuoteState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0]) as FieldName;
      errors[key] ??= issue.message;
    }
    return { status: "error", message: "Check the highlighted fields, or send the details on WhatsApp:", errors };
  }

  if (!checkRateLimit(await clientIp()).ok) {
    return { status: "error", message: "Too many requests from this connection in the last hour. Message Kris directly:" };
  }

  const result = await sendQuoteEmail({ ...parsed.data, siteUrl: baseUrl, receivedAt: new Date().toISOString() });
  if (result === "sent") return { status: "sent" };

  if (result === "not-configured" && process.env.NODE_ENV !== "production") {
    // Local development without Resend keys: log the request so the form can still be exercised.
    console.info("[quote] (dev) email not configured. Request received:", parsed.data);
    return { status: "sent" };
  }

  return { status: "error", message: "That didn't go through. Message Kris on WhatsApp instead:" };
}
