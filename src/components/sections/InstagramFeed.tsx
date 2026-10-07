import Image from "next/image";
import { business, instagramIntro } from "@/content";
import type { FeedPost } from "@/lib/instagram";
import { LogoRing } from "@/components/Brand";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { PlayBadge } from "@/components/Icons";

export function InstagramFeed({ posts }: { posts: FeedPost[] }) {
  const { handle, url } = business.instagram;
  const [first, ...rest] = handle.split("_");
  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="section-pad cv-auto border-t border-line bg-panel px-6 [--cv-h:670px] md:[--cv-h:600px] lg:[--cv-h:410px]"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-6">
          <div className="flex min-w-0 items-center gap-[14px] sm:gap-[18px]">
            <LogoRing />
            <div className="min-w-0">
              <p className="eyebrow m-0 mb-[6px]">{instagramIntro.eyebrow}</p>
              <h2
                id="work-title"
                className="display m-0 text-[clamp(18px,2.4vw,30px)] leading-[1.05] text-pretty [overflow-wrap:anywhere] max-[359px]:text-[16px]"
              >
                {/* Allow the handle to break after the underscore on narrow phones. */}@{first}_
                <wbr />
                {rest.join("_")}
              </h2>
            </div>
          </div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary whitespace-nowrap px-[22px] py-3 text-[15px] max-xs:w-full"
          >
            {instagramIntro.button}
          </a>
        </div>

        <ul className="m-0 grid list-none grid-cols-2 gap-[10px] p-0 sm:grid-cols-[repeat(auto-fill,minmax(180px,1fr))]">
          {posts.map((post) => (
            <li key={post.id}>
              <a
                href={post.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square overflow-hidden bg-base active:opacity-90"
              >
                <span className="absolute inset-0 transition-transform duration-700 ease-spring group-hover:scale-[1.045] group-focus-visible:scale-[1.045]">
                  {post.image ? (
                    <Image
                      src={post.image}
                      alt=""
                      fill
                      sizes="(min-width: 1248px) 193px, (min-width: 640px) 25vw, 50vw"
                      unoptimized={!post.optimize}
                      className="object-cover"
                    />
                  ) : (
                    <ImagePlaceholder caption={post.caption} showCaption={false} />
                  )}
                </span>
                {post.isVideo ? <PlayBadge /> : null}
                {/* The strip is near-solid behind the text: reels often have their own text burned in at the
                    bottom. Posts without a caption get no strip, only the screen-reader name. */}
                {post.caption ? (
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-[linear-gradient(rgba(10,11,13,0),rgba(10,11,13,0.88)_22px,rgba(10,11,13,0.94))] px-3 pt-6 pb-[10px] text-[13px] leading-[1.35] font-medium text-fg">
                    <span className="line-clamp-3">
                      <span className="sr-only">{instagramIntro.postLabel}: </span>
                      {post.caption}
                    </span>
                  </span>
                ) : (
                  <span className="sr-only">{instagramIntro.postLabel}</span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
