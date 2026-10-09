/**
 * Round pause/play button for anything that moves on its own for more than 5 seconds (WCAG 2.2.2):
 * the hero video and the Instagram ring. `className` positions it.
 */
export function MotionToggle({
  playing,
  onToggle,
  pauseLabel,
  playLabel,
  className = "",
}: {
  playing: boolean;
  onToggle: () => void;
  pauseLabel: string;
  playLabel: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={playing ? pauseLabel : playLabel}
      className={`absolute z-[3] flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-[rgba(10,11,13,0.6)] text-white transition-transform duration-300 ease-spring hover:border-blue-light focus-visible:border-blue-light active:scale-95 ${className}`}
    >
      {playing ? (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true" focusable="false">
          <rect x="2.5" y="1.5" width="3" height="11" rx="1" />
          <rect x="8.5" y="1.5" width="3" height="11" rx="1" />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true" focusable="false">
          <path d="M3.5 1.8v10.4a.6.6 0 0 0 .9.5l8.2-5.2a.6.6 0 0 0 0-1L4.4 1.3a.6.6 0 0 0-.9.5z" />
        </svg>
      )}
    </button>
  );
}
