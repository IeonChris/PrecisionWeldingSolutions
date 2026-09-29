import { business } from "@/content";
import { WhatsAppIcon } from "@/components/Icons";

export function FloatingWhatsApp() {
  return (
    <a
      href={business.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fab fixed right-[22px] bottom-[22px] z-[60] flex h-[58px] w-[58px] items-center justify-center rounded-full bg-whatsapp text-white shadow-float hover:bg-whatsapp-hover hover:text-white focus-visible:bg-whatsapp-hover focus-visible:text-white"
    >
      <WhatsAppIcon size={30} />
    </a>
  );
}
