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
