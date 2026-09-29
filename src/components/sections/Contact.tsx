import { business, contact, images } from "@/content";
import { FixedBackground } from "@/components/FixedBackground";
import { QuoteForm } from "@/components/QuoteForm";

const dt = "pt-1 text-[12px] font-semibold tracking-[0.12em] text-faint-fg uppercase";

export function Contact() {
  const { address } = business;
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(business.mapQuery)}&z=16&output=embed`;

  return (
    <FixedBackground
      id="contact"
      labelledBy="contact-title"
      image={images.contactBg}
      scrim="linear-gradient(180deg,rgba(10,11,13,.86),rgba(10,11,13,.78) 50%,rgba(10,11,13,.86))"
      className="section-pad px-6"
      contentClassName="cv-auto [--cv-h:1210px] md:[--cv-h:650px] lg:[--cv-h:650px]"
    >
      <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-14">
        <div>
          <p className="eyebrow m-0 mb-3">{contact.eyebrow}</p>
          <h2 id="contact-title" className="display m-0 mb-8 text-[clamp(28px,3.4vw,46px)] leading-[1.05]">
            {contact.title}
          </h2>

          <dl className="m-0 grid grid-cols-[auto_1fr] gap-x-6 gap-y-[18px] text-[16px]">
            <dt className={dt}>Phone</dt>
            <dd className="m-0">
              <a href={business.phone.href} className="font-semibold text-white hover:text-blue-light active:text-blue">
                {business.phone.display}
              </a>
              <div className="text-[14px] text-dim">{contact.phoneNote}</div>
            </dd>

            <dt className={dt}>Address</dt>
            <dd className="m-0 text-fg">
              <address className="not-italic">
                {address.street}, {address.locality}
                <br />
                {address.region}, {address.country}
              </address>
            </dd>

            <dt className={dt}>Hours</dt>
            <dd className="m-0 text-fg">
              {business.hours.days}
              <br />
              <span className="text-[14px] text-dim">{business.hours.note}</span>
            </dd>

            <dt className={dt}>Social</dt>
            <dd className="m-0">
              <a href={business.instagram.url} target="_blank" rel="noopener noreferrer" className="active:text-blue">
                @{business.instagram.handle}
              </a>
            </dd>
          </dl>

          <div className="relative mt-9 aspect-video overflow-hidden border border-line bg-slot">
            <iframe
              title={contact.mapTitle}
              src={mapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0 [filter:invert(0.9)_hue-rotate(180deg)_saturate(0.7)_contrast(0.95)]"
            />
          </div>
        </div>

        <QuoteForm />
      </div>
    </FixedBackground>
  );
}
