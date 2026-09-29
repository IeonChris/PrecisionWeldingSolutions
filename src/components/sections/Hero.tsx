import { business, hero, images } from "@/content";
import { SiteImage } from "@/components/SiteImage";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative flex min-h-[640px] items-end overflow-hidden">
      <div className="absolute inset-0 bg-slot">
        <SiteImage image={images.hero} sizes="100vw" priority />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(10,11,13,0.96)_0%,rgba(10,11,13,0.75)_50%,rgba(10,11,13,0.2)_100%)]"
      />
      {/* The design's hero container is border-box, so its content sits 24px further in than other sections. */}
      <div className="relative mx-auto w-full max-w-[1200px] px-6 pt-[120px] pb-16 sm:pb-20">
        <p className="eyebrow m-0 mb-[22px] inline-flex items-center gap-[10px]">
          <span aria-hidden="true" className="h-[2px] w-[28px] bg-blue-light" />
          {hero.eyebrow}
        </p>
        <h1
          id="hero-title"
          className="display m-0 mb-6 max-w-[900px] text-[clamp(42px,5.6vw,84px)] leading-[0.98] tracking-[-0.02em]"
        >
          {hero.titleLines[0]}
          <br />
          {hero.titleLines[1]} <span className="text-blue-light">{hero.titleAccent}</span>
        </h1>
        <p className="m-0 mb-[34px] max-w-[520px] text-[18px] leading-[1.6] text-silver">{hero.sub}</p>
        <div className="flex flex-wrap gap-[14px]">
          <a
            href={business.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary px-7 py-4 text-[16px]"
          >
            WhatsApp {business.phone.display}
          </a>
          <a href={hero.secondaryCta.href} className="btn btn-ghost px-7 py-4 text-[16px]">
            {hero.secondaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
