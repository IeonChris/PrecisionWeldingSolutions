"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { MotionToggle } from "@/components/MotionToggle";

interface HeroMediaProps {
  /** The hero photo (server-rendered, priority-loaded). Shown until the clip plays, and whenever it can't. */
  poster: ReactNode;
  video: { src: string; desktopLayout: "panel" | "full" } | null;
  /** object-position shared by the photo and the clip. */
  position?: string;
}

/**
 * Hero photo with an optional silent loop on top.
 * - The clip starts only after the page has loaded, so it never competes with the first paint.
 * - It pauses while the hero is off screen.
 * - It never autoplays under prefers-reduced-motion or Data Saver; the photo stays instead.
 * - A pause/play button is always available (WCAG 2.2.2: motion that runs longer than 5s).
 */
export function HeroMedia({ poster, video, position = "50% 50%" }: HeroMediaProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [shown, setShown] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || connection?.saveData) {
      userPaused.current = true;
    }

    let loaded = document.readyState === "complete";
    let inView = true;
    const sync = () => {
      if (!inView) v.pause();
      else if (loaded && !userPaused.current) v.play().catch(() => {});
    };
    const onLoad = () => {
      loaded = true;
      sync();
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });
    observer.observe(v);
    if (loaded) sync();
    else window.addEventListener("load", onLoad, { once: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("load", onLoad);
    };
  }, []);

  function toggle() {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      userPaused.current = false;
      v.play().catch(() => {});
    } else {
      userPaused.current = true;
      v.pause();
    }
  }

  const panel = video?.desktopLayout === "panel";

  return (
    <>
      <div className={`absolute inset-y-0 right-0 w-full bg-slot ${panel ? "hero-fade md:w-[48%] md:max-w-[760px]" : ""}`}>
        {poster}
        {video ? (
          <video
            ref={ref}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            onPlaying={() => {
              setShown(true);
              setPlaying(true);
            }}
            onPause={() => setPlaying(false)}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${shown ? "opacity-100" : "opacity-0"}`}
            style={{ objectPosition: position }}
          >
            <source src={video.src} type="video/mp4" />
          </video>
        ) : null}
      </div>

      <div aria-hidden="true" className="hero-scrim pointer-events-none absolute inset-0" />

      {video ? (
        <MotionToggle
          playing={playing}
          onToggle={toggle}
          pauseLabel="Pause background video"
          playLabel="Play background video"
          className="top-4 right-4 md:top-5 md:right-6"
        />
      ) : null}
    </>
  );
}
