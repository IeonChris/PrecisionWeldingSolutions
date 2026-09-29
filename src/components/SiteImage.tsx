import Image from "next/image";
import type { SiteImage as SiteImageData } from "@/content";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";

interface SiteImageProps {
  image: SiteImageData;
  /** Required by next/image for responsive srcset selection. */
  sizes: string;
  priority?: boolean;
  /** Decorative backgrounds pass true so the photo is skipped by screen readers. */
  decorative?: boolean;
  className?: string;
}

/** A content.ts photo that fills its (positioned) parent, or the captioned placeholder when `src` is null. */
export function SiteImage({ image, sizes, priority = false, decorative = false, className = "" }: SiteImageProps) {
  if (!image.src) return <ImagePlaceholder caption={image.placeholder} />;
  return (
    <Image
      src={image.src}
      alt={decorative ? "" : image.alt}
      fill
      sizes={sizes}
      priority={priority}
      className={`object-cover ${className}`}
      style={{ objectPosition: image.position ?? "50% 50%" }}
    />
  );
}
