import { intro } from "@/content";

export function Intro() {
  return (
    <section aria-labelledby="intro-title" className="border-y border-line bg-panel px-6 py-14 md:py-[72px]">
      <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] items-center gap-12">
        <div>
          <p className="eyebrow m-0 mb-3">{intro.eyebrow}</p>
          <h2 id="intro-title" className="display m-0 mb-4 text-[clamp(26px,3vw,40px)] leading-[1.1]">
            {intro.title}
          </h2>
          <p className="m-0 text-[16px] leading-[1.7] text-pretty text-muted">{intro.body}</p>
        </div>

        <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-[2px] border border-line bg-line p-0">
          <li className="flex flex-col items-center justify-center gap-[6px] bg-blue px-5 py-7 text-center">
            <span className="font-display text-[40px] leading-none font-extrabold text-white">{intro.stat.value}</span>
            <span className="font-display text-[12px] font-bold tracking-[0.08em] text-blue-tint uppercase">
              {intro.stat.label}
            </span>
          </li>
          {intro.pillars.map((pillar) => (
            <li key={pillar} className="flex flex-col items-center gap-[10px] bg-base px-5 py-7 text-center">
              <span aria-hidden="true" className="hex h-[22px] w-[22px]" />
              <span className="font-display text-[13px] font-bold tracking-[0.08em] text-white uppercase">{pillar}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
