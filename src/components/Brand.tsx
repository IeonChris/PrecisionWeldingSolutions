import Image from "next/image";
import { images } from "@/content";

const variants = {
  // Sizes are the design's content-box values (image + border) expressed as border-box totals.
  nav: {
    avatar: "h-[56px] w-[56px] border-2",
    px: 56,
    position: "50% 38%",
    word: "text-[18px] leading-none",
    sub: "text-[10px]",
  },
  navSm: {
    avatar: "h-[48px] w-[48px] border-2",
    px: 48,
    position: "50% 38%",
    word: "text-[16px] leading-none",
    sub: "text-[9px]",
  },
  footer: {
    avatar: "h-[48px] w-[48px] border-2",
    px: 48,
    position: "50% 40%",
    word: "text-[15px] leading-[1.1]",
    sub: "text-[9px]",
  },
} as const;

interface BrandProps {
  variant: keyof typeof variants;
}

/** Round logo avatar + "PRECISION / WELDING SOLUTIONS" wordmark. */
export function Brand({ variant }: BrandProps) {
  const v = variants[variant];
  return (
    <>
      <Image
        src={images.logo.src}
        alt=""
        width={v.px}
        height={v.px}
        sizes={`${v.px}px`}
        className={`${v.avatar} shrink-0 rounded-full border-blue object-cover`}
        style={{ objectPosition: v.position }}
      />
      <span className={`${v.word} font-display font-extrabold tracking-[0.02em] text-white`}>
        PRECISION
        <br />
        <span className={`${v.sub} font-semibold tracking-[0.28em] text-blue-light`}>WELDING SOLUTIONS</span>
      </span>
    </>
  );
}
