import type { ReactNode } from "react";
import type { SiteImage as SiteImageData } from "@/content";
import { SiteImage } from "@/components/SiteImage";

interface FixedBackgroundProps {
  id?: string;
  image: SiteImageData;
  /** CSS background for the scrim layer between the photo and the content. */
  scrim: string;
  className?: string;
  /** Classes for the content layer, e.g. `cv-auto` to defer rendering below the fold. */
  contentClassName?: string;
  labelledBy?: string;
  children: ReactNode;
}

/**
 * Section whose photo stays still while the content scrolls over it.
 * The section clips (clip-path: inset(0)) a position:fixed, viewport-sized photo layer,
 * which behaves the same on iOS Safari where background-attachment: fixed does not.
 */
export function FixedBackground({ id, image, scrim, className = "", contentClassName = "", labelledBy, children }: FixedBackgroundProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`fixed-bg ${className}`}>
      <div className="fixed-bg-media" aria-hidden="true">
        {image.src ? <SiteImage image={image} sizes="100vw" decorative /> : null}
      </div>
      <div className="pointer-events-none absolute inset-0 z-[1]" style={{ background: scrim }} aria-hidden="true" />
      <div className={`relative z-[2] ${contentClassName}`}>{children}</div>
    </section>
  );
}
