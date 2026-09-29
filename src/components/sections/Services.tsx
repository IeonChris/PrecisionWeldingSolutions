import { business, images, services, servicesIntro } from "@/content";
import { FixedBackground } from "@/components/FixedBackground";

export function Services() {
  return (
    <FixedBackground
      id="services"
      labelledBy="services-title"
      image={images.servicesBg}
      scrim="linear-gradient(180deg,rgba(10,11,13,.78),rgba(10,11,13,.66) 50%,rgba(10,11,13,.78))"
      contentClassName="cv-auto [--cv-h:2200px] md:[--cv-h:1380px] lg:[--cv-h:1190px]"
    >
      <div className="container-site pt-[72px] pb-20 text-center md:pt-[110px] md:pb-[120px]">
        <p className="eyebrow m-0 mb-3">{servicesIntro.eyebrow}</p>
        <h2 id="services-title" className="display m-0 mb-[14px] text-[clamp(30px,3.8vw,52px)] leading-[1.05] text-white">
          {servicesIntro.title} <span className="text-blue-light">{servicesIntro.titleAccent}</span>
        </h2>
        <p className="mx-auto mt-0 mb-5 max-w-[520px] text-[17px] leading-[1.6] text-pretty text-silver">
          {servicesIntro.body}
        </p>
        <div aria-hidden="true" className="mx-auto mb-12 h-[2px] w-20 bg-blue-light md:mb-[72px]" />

        <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-x-10 gap-y-12 p-0 md:gap-y-14">
          {services.map((s) => (
            <li key={s.num} className="flex flex-col items-center gap-[10px]">
              <span className="font-display text-[44px] leading-none font-extrabold text-white">{s.num}</span>
              <h3 className="m-0 font-display text-[20px] leading-[1.15] font-bold text-blue-light uppercase">{s.title}</h3>
              <p className="m-0 max-w-[340px] text-[15px] leading-[1.6] text-pretty text-fg">{s.desc}</p>
              <p className="m-0 text-[12px] tracking-[0.16em] text-dim uppercase">{s.tags}</p>
            </li>
          ))}
          <li className="flex flex-col items-center justify-center gap-[14px] border border-[rgba(59,157,255,0.5)] px-6 py-7">
            <h3 className="m-0 font-display text-[22px] leading-[1.1] font-extrabold text-white uppercase">
              {servicesIntro.cta.title}
            </h3>
            <p className="m-0 text-[15px] leading-[1.6] text-silver">{servicesIntro.cta.body}</p>
            <a
              href={business.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary px-5 py-3 text-[14px]"
            >
              {servicesIntro.cta.button}
            </a>
          </li>
        </ul>
      </div>
    </FixedBackground>
  );
}
