import { reasons, whyIntro } from "@/content";
import { SiteImage } from "@/components/SiteImage";

export function WhyUs() {
  return (
    <section
      id="why"
      aria-labelledby="why-title"
      className="cv-auto bg-base px-6 py-[clamp(64px,9vw,104px)] [--cv-h:2550px] min-[560px]:[--cv-h:1400px] wide:[--cv-h:730px]"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-10 grid grid-cols-[repeat(auto-fit,minmax(min(360px,100%),1fr))] items-end gap-x-14 gap-y-4">
          <div>
            <p className="eyebrow m-0 mb-3">{whyIntro.eyebrow}</p>
            <h2 id="why-title" className="display m-0 text-[clamp(28px,3.4vw,46px)] leading-[1.05] text-balance text-white">
              {whyIntro.title}
            </h2>
          </div>
          <p className="m-0 max-w-[440px] text-[16px] leading-[1.6] text-pretty text-muted">{whyIntro.note}</p>
        </div>

        <ul className="m-0 grid list-none grid-cols-1 gap-x-4 gap-y-8 p-0 min-[560px]:grid-cols-2 wide:grid-cols-4">
          {reasons.map((r) => (
            <li key={r.num}>
              <figure className="m-0 flex flex-col gap-[18px]">
                <div className="relative aspect-[4/5] overflow-hidden bg-slot">
                  <SiteImage
                    image={r.image}
                    sizes="(min-width: 1100px) 288px, (min-width: 560px) calc(50vw - 32px), calc(100vw - 48px)"
                  />
                  <span className="absolute bottom-3 left-3 bg-[rgba(10,11,13,0.82)] px-[10px] py-[6px] text-[12px] font-semibold tracking-[0.04em] text-fg">
                    {r.chip}
                  </span>
                </div>
                <figcaption className="flex flex-col gap-2">
                  <div className="flex items-baseline gap-3 border-t-2 border-blue pt-[14px]">
                    <span className="font-display text-[14px] font-bold text-blue-light">{r.num}</span>
                    <h3 className="m-0 font-display text-[18px] font-bold text-white uppercase">{r.title}</h3>
                  </div>
                  <p className="m-0 text-[15px] leading-[1.6] text-pretty text-muted">{r.desc}</p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
