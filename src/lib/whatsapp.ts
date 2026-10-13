import { business, whatsappMessages } from "@/content";

/** wa.me link with an optional prefilled first line. Every WhatsApp link goes through here. */
export function whatsappHref(text?: string): string {
  return text ? `${business.whatsappUrl}?text=${encodeURIComponent(text)}` : business.whatsappUrl;
}

/** "Hi Kris, here is a photo of the part." */
export const photoWhatsappHref = whatsappHref(whatsappMessages.photo);

/** "Hi Kris, I need help with: {service}. Photo attached." */
export function serviceWhatsappHref(service: string): string {
  return whatsappHref(whatsappMessages.service.replace("{service}", service));
}

/** The quote form's message with the visitor's details filled in (replacer functions, so a "$" they type stays as typed). */
export function quoteWhatsappHref(fields: { name: string; phone: string; job: string }): string {
  return whatsappHref(
    whatsappMessages.quote
      .replace("{name}", () => fields.name)
      .replace("{phone}", () => fields.phone)
      .replace("{job}", () => fields.job),
  );
}
