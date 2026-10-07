import { about, images } from "@/content";
import { SiteImage } from "@/components/SiteImage";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="section-pad cv-auto border-y border-line bg-panel px-6 [--cv-h:1215px] md:[--cv-h:750px] lg:[--cv-h:680px]"
    >
      <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] items-center gap-14">
        <div className="relative">
          <div aria-hidden="true" className="absolute -top-4 -left-4 h-[123px] w-[123px] border-t-[3px] border-l-[3px] border-blue" />
          <div className="relative aspect-[4/5] overflow-hidden bg-slot">
            <SiteImage
              image={images.about}
              sizes="(min-width: 1248px) 572px, (min-width: 744px) calc(50vw - 52px), calc(100vw - 48px)"
            />
          </div>
          {/* Text-bearing blue fill, so `blue-strong` with a white role line (the old light-blue role was 3.3:1). */}
          <p className="absolute -right-3 -bottom-3 m-0 bg-blue-strong px-5 py-4 font-display text-[16px] leading-[1.1] font-bold tracking-[0.04em] text-white uppercase">
            {about.nameplate.name}
            <br />
            <span className="text-[14px] font-medium tracking-[0.2em] text-white">{about.nameplate.role}</span>
          </p>
        </div>

        <div>
          <p className="eyebrow m-0 mb-3">{about.eyebrow}</p>
          <h2 id="about-title" className="display m-0 mb-6 text-[clamp(28px,3.4vw,46px)] leading-[1.05] text-pretty">
            {about.title}
          </h2>
          {about.paragraphs.map((p, i) => (
            <p
              key={i}
              className={`m-0 text-[17px] leading-[1.7] text-pretty text-muted ${i === about.paragraphs.length - 1 ? "mb-8" : "mb-[18px]"}`}
            >
              {p}
            </p>
          ))}
          <ul className="m-0 mb-9 grid list-none grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-6 gap-y-3 p-0">
            {about.points.map((point) => (
              <li key={point} className="flex items-start gap-3 font-medium text-fg">
                <span aria-hidden="true" className="hex mt-[3px] h-[18px] w-[18px]" />
                {point}
              </li>
            ))}
          </ul>
          <a href="#contact" className="btn btn-outline px-6 py-[14px] text-[16px]">
            {about.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
