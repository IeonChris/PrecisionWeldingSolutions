import { business, whatsappBand } from "@/content";

export function WhatsAppBand() {
  return (
    <section
      aria-labelledby="band-title"
      className="cv-auto relative overflow-hidden bg-blue px-6 py-14 [--cv-h:235px] md:py-[72px] md:[--cv-h:160px] lg:[--cv-h:76px]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[repeating-linear-gradient(-45deg,transparent_0_40px,rgba(255,255,255,0.06)_40px_80px)]"
      />
      <div className="relative mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-8">
        <div>
          <h2 id="band-title" className="display m-0 mb-[10px] text-[clamp(28px,3.4vw,48px)] leading-[1.05] text-white">
            {whatsappBand.title}
          </h2>
          <p className="m-0 text-[18px] text-blue-tint">{whatsappBand.body}</p>
        </div>
        <a
          href={business.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ink px-8 py-5 text-[18px] max-sm:w-full max-sm:px-5 max-sm:text-[16px] sm:whitespace-nowrap"
        >
          <span
            aria-hidden="true"
            className="h-[10px] w-[10px] shrink-0 rounded-full bg-whatsapp shadow-[0_0_0_4px_rgba(37,211,102,0.25)]"
          />
          WhatsApp {business.phone.display}
        </a>
      </div>
    </section>
  );
}
