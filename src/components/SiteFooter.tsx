import type { ReactNode } from "react";
import { business, footer, footerLinks } from "@/content";
import { Brand } from "@/components/Brand";
import { ClockIcon, InstagramIcon, PhoneIcon, WhatsAppIcon } from "@/components/Icons";

const heading = "m-0 mb-[6px] font-display text-[12px] font-bold tracking-[0.14em] text-white uppercase";
// Footer links grow to 44px touch targets on phones; the design's 14px rhythm returns from tablet up.
const column = "flex flex-col gap-0 md:gap-[14px]";
const linkRow = "link-quiet inline-flex items-center gap-3 self-start max-md:min-h-[44px]";

export function SiteFooter() {
  const { address } = business;
  return (
    <footer className="cv-auto border-t border-line bg-deep px-6 pt-14 pb-10 text-[15px] text-dim [--cv-h:980px] md:pt-[72px] md:[--cv-h:594px] lg:[--cv-h:380px]">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-x-10 gap-y-10 border-b border-line pb-12 md:gap-y-12">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Brand variant="footer" />
            </div>
            <p className="m-0 leading-[1.7] text-pretty text-muted">{footer.blurb}</p>
            <address className="leading-[1.6] text-blue-light not-italic">
              {address.street}, {address.locality},
              <br />
              {address.regionShort}, {address.country}
            </address>
          </div>

          <nav aria-label="Footer" className={column}>
            <h2 className={heading}>Quick links</h2>
            {footerLinks.map((l) => (
              <a key={l.href} href={l.href} className={linkRow}>
                {l.label}
              </a>
            ))}
          </nav>

          <div className={column}>
            <h2 className={heading}>Contact us</h2>
            <ContactRow href={business.phone.href} icon={<PhoneIcon className="shrink-0 text-blue-light" />}>
              {business.phone.display}
            </ContactRow>
            <ContactRow href={business.whatsappUrl} external icon={<WhatsAppIcon className="shrink-0 text-blue-light" />}>
              WhatsApp us
            </ContactRow>
            <ContactRow href={business.instagram.url} external icon={<InstagramIcon className="shrink-0 text-blue-light" />}>
              @{business.instagram.handle}
            </ContactRow>
            <div className="flex items-center gap-3 text-silver max-md:min-h-[44px]">
              <ClockIcon className="shrink-0 text-blue-light" />
              {business.hours.footer}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 pt-8 text-center text-[14px] leading-[1.6]">
          <p className="m-0 text-silver">
            © {new Date().getFullYear()} {business.name}. All rights reserved.
          </p>
          <p className="m-0 tracking-[0.04em] text-faint-fg">
            Designed &amp; Developed by{" "}
            <a
              href={business.credit.url}
              target="_blank"
              rel="noopener"
              className="font-semibold text-dim hover:text-white focus-visible:text-white active:text-blue-light max-md:inline-block max-md:py-3"
            >
              {business.credit.name}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function ContactRow({ href, external, icon, children }: { href: string; external?: boolean; icon: ReactNode; children: ReactNode }) {
  return (
    <a href={href} className={linkRow} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {icon}
      {children}
    </a>
  );
}
