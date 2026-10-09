import Image from "next/image";
import { business, images, instagramIntro } from "@/content";
import type { FeedPost } from "@/lib/instagram";
import { InstagramRing } from "@/components/InstagramRing";

export function InstagramFeed({ posts }: { posts: FeedPost[] }) {
  const { handle, url } = business.instagram;
  const [first, ...rest] = handle.split("_");
  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="cv-auto flex flex-col overflow-hidden border-y border-ig-line bg-ig-bg [--cv-h:620px] min-[900px]:h-[820px] min-[900px]:[--cv-h:818px]"
    >
      <div className="flex flex-col gap-6 px-6 pt-14 min-[900px]:flex-row min-[900px]:items-center min-[900px]:justify-between min-[900px]:gap-8 min-[900px]:px-24 min-[900px]:pt-[72px]">
        <div className="flex min-w-0 items-center gap-4 sm:gap-5">
          <Image
            src={images.logo.src}
            alt=""
            width={84}
            height={84}
            sizes="84px"
            className="h-[84px] w-[84px] shrink-0 rounded-full border-[3px] border-ig-blue bg-base object-cover p-[2px]"
            style={{ objectPosition: "50% 38%" }}
          />
          <div className="min-w-0">
            <p className="m-0 mb-2 font-display text-[13px] font-semibold tracking-[0.24em] text-ig-eyebrow uppercase">
              {instagramIntro.eyebrow}
            </p>
            {/* The handle is ~19× its font size wide, so it scales to fill the room beside the avatar (and, from
                900px, the button) on one line, up to 38px. On narrow phones it breaks after the underscore. */}
            <h2
              id="work-title"
              className="m-0 font-display text-[clamp(19px,calc((100vw-152px)/19),38px)] leading-[1.05] font-extrabold text-white uppercase [overflow-wrap:anywhere] max-[379px]:text-[17px] min-[900px]:text-[clamp(24px,calc((100vw-551px)/19),38px)]"
            >
              @{first}_
              <wbr />
              {rest.join("_")}
            </h2>
          </div>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn shrink-0 self-start rounded-[6px] bg-ig-blue px-[26px] py-4 font-display text-[16px] font-bold whitespace-nowrap text-white hover:bg-ig-blue-hover hover:text-white focus-visible:bg-ig-blue-hover focus-visible:text-white active:bg-blue-strong min-[900px]:self-center max-xs:w-full"
        >
          {instagramIntro.button}
        </a>
      </div>
      <InstagramRing posts={posts} />
    </section>
  );
}
