import { business, mobileBar } from "@/content";
import { photoWhatsappHref } from "@/lib/whatsapp";

/**
 * Phones and small tablets (below 832px): a fixed Call / Send-a-photo bar replaces the floating
 * WhatsApp button and the nav's WhatsApp button. The spacer keeps the footer's last line clear of it.
 */
export function MobileActionBar() {
  return (
    <>
      <div aria-hidden="true" className="h-[72px] bg-deep nav:hidden" />
      <nav
        aria-label="Call or WhatsApp"
        className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-2 border-t border-line bg-[rgba(10,11,13,0.96)] px-3 pt-[10px] pb-[calc(10px+env(safe-area-inset-bottom))] backdrop-blur-[10px] nav:hidden"
      >
        <a href={business.phone.href} className="btn btn-outline min-h-12 text-[15px] font-semibold text-white!">
          {mobileBar.call}
        </a>
        <a
          href={photoWhatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="btn min-h-12 bg-whatsapp text-[15px] font-bold text-whatsapp-ink hover:bg-whatsapp-hover hover:text-whatsapp-ink focus-visible:bg-whatsapp-hover focus-visible:text-whatsapp-ink"
        >
          {mobileBar.photo}
        </a>
      </nav>
    </>
  );
}
