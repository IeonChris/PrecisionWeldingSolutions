import { business, contact, images } from "@/content";
import { FixedBackground } from "@/components/FixedBackground";
import { QuoteForm } from "@/components/QuoteForm";

// The shop-front photo behind this list is bright (white sky), so the small secondary text uses
// lighter tokens than elsewhere: measured worst case over the photo is 4.5:1 or better.
const dt = "pt-1 text-[12px] font-semibold tracking-[0.12em] text-muted uppercase";
const subline = "text-[14px] text-muted";

export function Contact() {
  const { address } = business;
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(business.mapQuery)}&z=16&output=embed`;

  return (
    <FixedBackground
      id="contact"
      labelledBy="contact-title"
      image={images.contactBg}
      scrim="linear-gradient(180deg,rgba(10,11,13,.86),rgba(10,11,13,.82) 50%,rgba(10,11,13,.86))"
      className="section-pad px-6"
      contentClassName="cv-auto [--cv-h:1130px] md:[--cv-h:565px] lg:[--cv-h:640px]"
    >
      <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-14">
        <div>
          <p className="eyebrow m-0 mb-3">{contact.eyebrow}</p>
          <h2 id="contact-title" className="display m-0 mb-8 text-[clamp(28px,3.4vw,46px)] leading-[1.05] text-pretty">
            {contact.title}
          </h2>

          <dl className="m-0 grid grid-cols-[auto_1fr] gap-x-6 gap-y-[18px] text-[16px]">
            <dt className={dt}>Phone</dt>
            <dd className="m-0">
              <a href={business.phone.href} className="font-semibold text-white hover:text-blue-light active:text-blue">
                {business.phone.display}
              </a>
              <div className={subline}>{contact.phoneNote}</div>
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
              <span className={subline}>{business.hours.note}</span>
            </dd>

            <dt className={dt}>Social</dt>
            <dd className="m-0">
              <a
                href={business.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-hover hover:text-white focus-visible:text-white active:text-blue-light"
              >
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
