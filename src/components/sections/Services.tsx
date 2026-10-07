import { services, servicesIntro } from "@/content";
import { photoWhatsappHref, serviceWhatsappHref } from "@/lib/whatsapp";

export function Services() {
  const [line1, line2] = servicesIntro.titleLines;
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="cv-auto border-b border-line bg-panel px-6 py-[clamp(64px,9vw,104px)] [--cv-h:1640px] md:[--cv-h:1290px] lg:[--cv-h:975px]"
    >
      <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] items-start gap-x-[72px] gap-y-10">
        {/* Sticky beside the list from 768px; a plain block above it on phones. */}
        <div className="flex max-w-[400px] flex-col gap-5 md:sticky md:top-[104px]">
          <p className="eyebrow m-0">{servicesIntro.eyebrow}</p>
          <h2
            id="services-title"
            className="display m-0 text-[clamp(34px,4.4vw,60px)] leading-[0.95] tracking-[-0.02em] text-white"
          >
            {line1}
            <br />
            {line2}
          </h2>
          <p className="m-0 text-[17px] leading-[1.6] text-pretty text-muted">{servicesIntro.body}</p>
          <div className="mt-2 flex flex-col gap-[14px] border-t border-line pt-5">
            <p className="m-0 text-[15px] leading-[1.55] text-silver">
              <strong className="text-white">{servicesIntro.help.lead}</strong> {servicesIntro.help.body}
            </p>
            <a
              href={photoWhatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary self-start px-5 py-[13px] text-[15px]"
            >
              {servicesIntro.help.button}
            </a>
          </div>
        </div>

        <ul className="m-0 list-none border-b border-field p-0">
          {services.map((s, i) => (
            <li key={s.title}>
              <a
                href={serviceWhatsappHref(s.title)}
                target="_blank"
                rel="noopener noreferrer"
                className="grid grid-cols-[40px_minmax(0,1fr)_28px] gap-x-4 gap-y-1 border-t border-field pt-7 pb-[26px] text-fg hover:text-blue-light focus-visible:text-blue-light active:text-blue"
              >
                <span className="pt-[5px] font-display text-[14px] font-semibold text-faint-fg">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="m-0 font-display text-[clamp(20px,2vw,26px)] leading-[1.1] font-bold tracking-[-0.005em] text-white uppercase">
                    {s.title}
                  </h3>
                  <p className="m-0 text-[16px] leading-[1.55] text-pretty text-muted">{s.desc}</p>
                  <p className="m-0 mt-1 text-[13px] leading-[1.5] tracking-[0.04em] text-dim">{s.methods}</p>
                </div>
                <span aria-hidden="true" className="pt-[2px] text-right text-[22px] leading-none">
                  ↗
                </span>
                <span className="sr-only">{servicesIntro.rowAction}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
