import { business } from "@/content";

/** Thin info bar above the nav: address and hours left, phone and Instagram right. */
export function TopStrip() {
  const { address } = business;
  return (
    <div id="top" className="border-b border-line bg-strip text-[13px] text-strip-fg">
      <div className="container-site flex flex-wrap justify-between gap-x-4 py-2 max-sm:gap-y-0">
        <div className="flex flex-wrap gap-x-6 gap-y-[2px] max-sm:py-[2px]">
          <span>
            {address.street}, {address.locality}, {address.regionShort}, {address.country}
          </span>
          <span>{business.hours.short}</span>
        </div>
        <div className="flex gap-5">
          <a
            href={business.phone.href}
            className="inline-flex items-center font-semibold text-fg hover:text-white focus-visible:text-white active:text-blue-light max-sm:min-h-[44px]"
          >
            {business.phone.display}
          </a>
          <a
            href={business.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-strip-fg hover:text-white focus-visible:text-white active:text-blue-light max-sm:min-h-[44px]"
          >
            @{business.instagram.handle}
          </a>
        </div>
      </div>
    </div>
  );
}
