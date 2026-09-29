import { ImageIcon } from "@/components/Icons";

interface ImagePlaceholderProps {
  caption: string;
  /** Hide the caption text when the surrounding tile already shows it (Instagram tiles). */
  showCaption?: boolean;
  className?: string;
}

/**
 * Neutral dark stand-in for a photo that has not been supplied yet.
 * Rendered wherever an image's `src` is null in src/content.ts.
 */
export function ImagePlaceholder({ caption, showCaption = true, className = "" }: ImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={`Photo coming soon: ${caption}`}
      className={`absolute inset-0 flex flex-col items-center justify-center gap-[10px] bg-[#13171c] bg-[repeating-linear-gradient(135deg,transparent_0_14px,rgba(255,255,255,0.018)_14px_15px)] p-6 text-center shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)] ${showCaption ? "" : "pb-[34%]"} ${className}`}
    >
      <ImageIcon className="text-faint" />
      {showCaption ? <span className="max-w-[280px] text-[13px] leading-[1.4] font-semibold text-muted">{caption}</span> : null}
    </div>
  );
}
