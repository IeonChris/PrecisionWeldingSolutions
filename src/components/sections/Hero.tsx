import { business, hero, heroVideo, images } from "@/content";
import { photoWhatsappHref } from "@/lib/whatsapp";
import { SiteImage } from "@/components/SiteImage";
import { HeroMedia } from "@/components/HeroMedia";
import { WhatsAppIcon } from "@/components/Icons";

export function Hero() {
  const panel = heroVideo?.desktopLayout === "panel";
  return (
    <section
      aria-labelledby="hero-title"
      className="relative flex min-h-[clamp(560px,82vh,760px)] items-end overflow-hidden bg-base"
    >
      <HeroMedia
        video={heroVideo}
        position={images.hero.position}
        poster={
          <SiteImage
            image={images.hero}
            sizes={panel ? "(min-width: 1584px) 760px, (min-width: 768px) 48vw, 100vw" : "100vw"}
            priority
          />
        }
      />
      <div className="relative mx-auto w-full max-w-[1248px] px-6 pt-[120px] pb-14">
        <p className="eyebrow m-0 mb-5 inline-flex items-center gap-[10px]">
          <span aria-hidden="true" className="h-[2px] w-[28px] bg-blue-light" />
          {hero.eyebrow}
        </p>
        <h1
          id="hero-title"
          className="display m-0 mb-5 max-w-[820px] text-[clamp(38px,5.4vw,76px)] leading-[0.98] tracking-[-0.02em] text-balance text-white"
        >
          {hero.title} <span className="text-blue-light">{hero.titleAccent}</span>
        </h1>
        <p className="m-0 mb-8 max-w-[540px] text-[18px] leading-[1.6] text-pretty text-silver">{hero.sub}</p>
        <div className="flex flex-wrap gap-3">
          <a
            href={photoWhatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary min-h-[52px] gap-[10px] px-[26px] py-4 text-[16px]"
          >
            <WhatsAppIcon size={20} />
            {hero.primaryCta}
          </a>
          <a href={business.phone.href} className="btn btn-ghost min-h-[52px] px-[26px] py-4 text-[16px]">
            {hero.callCta} {business.phone.display}
          </a>
        </div>

        <ul className="m-0 mt-12 grid max-w-[860px] list-none grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))] gap-x-8 gap-y-5 border-t border-white/14 p-0 pt-6">
          {hero.proof.map((item) => (
            <li key={item.value}>
              <span className="block font-display text-[22px] leading-[1.1] font-extrabold text-white">{item.value}</span>
              <span className="mt-1 block text-[13px] text-muted">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
