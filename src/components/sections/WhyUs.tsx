import { images, reasons, whyIntro } from "@/content";
import { FixedBackground } from "@/components/FixedBackground";

export function WhyUs() {
  return (
    <FixedBackground
      id="why"
      labelledBy="why-title"
      image={images.whyBg}
      scrim="linear-gradient(180deg,rgba(10,11,13,.86),rgba(10,11,13,.78) 50%,rgba(10,11,13,.86))"
      className="section-pad px-6"
      contentClassName="cv-auto [--cv-h:950px] md:[--cv-h:520px] lg:[--cv-h:480px]"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mx-auto mb-12 max-w-[640px] text-center md:mb-14">
          <p className="eyebrow m-0 mb-3">{whyIntro.eyebrow}</p>
          <h2 id="why-title" className="display m-0 text-[clamp(28px,3.4vw,46px)] leading-[1.05]">
            {whyIntro.title}
          </h2>
        </div>
        <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-7 p-0">
          {reasons.map((r) => (
            <li key={r.num} className="border-t-[3px] border-blue pt-[22px]">
              <span className="mb-[10px] block font-display text-[34px] leading-none font-extrabold text-white/28">{r.num}</span>
              <h3 className="m-0 mb-[10px] font-display text-[18px] font-bold text-white uppercase">{r.title}</h3>
              <p className="m-0 text-[15px] leading-[1.6] text-pretty text-muted">{r.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </FixedBackground>
  );
}
