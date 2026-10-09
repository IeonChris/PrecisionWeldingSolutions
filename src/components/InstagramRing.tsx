"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { instagramIntro } from "@/content";
import type { FeedPost } from "@/lib/instagram";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { PlayBadge } from "@/components/Icons";
import { MotionToggle } from "@/components/MotionToggle";

/** Auto-rotation in degrees per frame at 60 fps (scaled by frame time, so 120 Hz screens spin at the same speed). */
const AUTO_DEG_PER_FRAME = 0.12;
/** Multiplies the auto-rotation. */
const SPEED = 1;
/** Degrees of turn per pixel of drag. */
const DRAG_GAIN = 0.15;
/** How quickly the spin eases back to the auto speed after a drag (per frame). */
const EASE_BACK = 0.03;
/** How quickly a focused tile turns to the front (per frame). */
const TURN_EASE = 0.12;
const TILT_DEG = -7;
/** Pointer travel (px) past which a press counts as a drag, not a click. */
const CLICK_SLOP = 5;
/** With fewer posts than this, each post appears twice so the ring has enough slots to read as a ring. */
const DOUBLE_UP_BELOW = 9;

/** Which copy of a doubled post is live: the one in the front half of the ring (copies sit 180° apart). */
function frontCopy(post: number, count: number, step: number, angle: number): number {
  return Math.cos(((post * step + angle) * Math.PI) / 180) >= 0 ? post : post + count;
}

export function InstagramRing({ posts }: { posts: FeedPost[] }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLUListElement>(null);
  // Pause/play (WCAG 2.2.2). Starts paused under "reduce motion"; dragging works either way.
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPaused(true);
  }, []);
  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  const doubled = posts.length > 0 && posts.length < DOUBLE_UP_BELOW;
  const slots = doubled ? [...posts, ...posts] : posts;
  const count = posts.length;
  const total = slots.length;
  const step = total > 0 ? 360 / total : 0;

  useEffect(() => {
    const stage = stageRef.current;
    const ring = ringRef.current;
    if (!stage || !ring || total === 0) return;

    const tiles = Array.from(ring.querySelectorAll<HTMLLIElement>(":scope > li"));
    const links = tiles.map((li) => li.querySelector("a"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    let radius = 0;
    let angle = 0;
    let velocity = 0;
    let turnTo: number | null = null;
    let hovering = false;
    let focusWithin = false;
    let dragging = false;
    let pendingDx = 0;
    let lastX = 0;
    let downX = 0;
    let downY = 0;
    let travel = 0;
    const live = Array.from({ length: count }, (_, p) => frontCopy(p, count, step, 0));
    let frame = 0;
    let last = 0;
    let visible = false;

    const measure = () => {
      const css = getComputedStyle(ring);
      const tile = parseFloat(css.getPropertyValue("--tile")) || 260;
      const gap = parseFloat(css.getPropertyValue("--gap")) || 0;
      radius = tile / 2 / Math.tan(Math.PI / total) + gap;
    };

    const apply = () => {
      ring.style.transform = `translateZ(${-radius}px) rotateX(${TILT_DEG}deg) rotateY(${angle}deg)`;
      if (!doubled) return;
      // Only the front copy of each post is focusable and announced; its twin is on the hidden back face.
      for (let p = 0; p < count; p++) {
        const next = frontCopy(p, count, step, angle);
        if (next === live[p]) continue;
        const prev = live[p];
        live[p] = next;
        const hadFocus = tiles[prev].contains(document.activeElement);
        tiles[next].inert = false;
        tiles[prev].inert = true;
        if (hadFocus) links[next]?.focus({ preventScroll: true });
      }
    };

    const tick = (now: number) => {
      const dt = last ? Math.min(now - last, 64) / (1000 / 60) : 1;
      last = now;
      if (turnTo !== null) {
        const diff = turnTo - angle;
        if (reduced.matches || Math.abs(diff) < 0.05) {
          angle = turnTo;
          turnTo = null;
        } else {
          angle += diff * (1 - Math.pow(1 - TURN_EASE, dt));
        }
        velocity = 0;
      } else if (dragging) {
        velocity = pendingDx * DRAG_GAIN;
        pendingDx = 0;
        angle += velocity;
      } else {
        const auto = pausedRef.current || hovering || focusWithin ? 0 : AUTO_DEG_PER_FRAME * SPEED;
        velocity += (auto - velocity) * (1 - Math.pow(1 - EASE_BACK, dt));
        angle += velocity * dt;
      }
      if (turnTo === null && Math.abs(angle) > 3600) angle %= 360;
      apply();
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (frame || !visible) return;
      last = 0;
      frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    // Dragging: pointerdown on the stage, then follow the pointer on window until it lifts.
    const onMove = (e: PointerEvent) => {
      pendingDx += e.clientX - lastX;
      lastX = e.clientX;
      travel = Math.max(travel, Math.hypot(e.clientX - downX, e.clientY - downY));
    };
    const onUp = () => {
      dragging = false;
      stage.dataset.dragging = "false";
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      if ((e.target as Element).closest?.("button")) return;
      dragging = true;
      turnTo = null;
      pendingDx = 0;
      travel = 0;
      lastX = downX = e.clientX;
      downY = e.clientY;
      stage.dataset.dragging = "true";
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
      window.addEventListener("pointercancel", onUp);
    };
    // A drag that ends over a tile must not open the post (keyboard activation has detail 0).
    const onClick = (e: MouseEvent) => {
      if (e.detail !== 0 && travel > CLICK_SLOP) e.preventDefault();
    };
    const onDragStart = (e: DragEvent) => e.preventDefault();

    // Pause while a mouse is over a tile.
    const onOver = (e: PointerEvent) => {
      if (e.pointerType === "mouse") hovering = !!(e.target as Element).closest?.(".ig-tile");
    };
    const onLeave = () => {
      hovering = false;
    };

    // Keyboard: a focused tile turns to the front; arrows move to the neighbouring tile.
    const slotOf = (el: Element | null) => Number((el as HTMLElement | null)?.closest<HTMLElement>("[data-slot]")?.dataset.slot ?? -1);
    const onFocusIn = (e: FocusEvent) => {
      focusWithin = true;
      const slot = slotOf(e.target as Element);
      if (slot < 0) return;
      const base = -slot * step;
      turnTo = base + 360 * Math.round((angle - base) / 360);
    };
    const onFocusOut = (e: FocusEvent) => {
      if (!ring.contains(e.relatedTarget as Node | null)) focusWithin = false;
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      const slot = slotOf(document.activeElement);
      if (slot < 0) return;
      e.preventDefault();
      let next = (slot + (e.key === "ArrowRight" ? 1 : -1) + total) % total;
      if (tiles[next].inert) next = (next + count) % total;
      links[next]?.focus({ preventScroll: true });
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });

    measure();
    apply();
    io.observe(stage);
    window.addEventListener("resize", measure);
    stage.addEventListener("pointerdown", onDown);
    stage.addEventListener("pointerover", onOver);
    stage.addEventListener("pointerleave", onLeave);
    stage.addEventListener("dragstart", onDragStart);
    ring.addEventListener("click", onClick);
    ring.addEventListener("focusin", onFocusIn);
    ring.addEventListener("focusout", onFocusOut);
    ring.addEventListener("keydown", onKey);

    return () => {
      stop();
      onUp();
      io.disconnect();
      window.removeEventListener("resize", measure);
      stage.removeEventListener("pointerdown", onDown);
      stage.removeEventListener("pointerover", onOver);
      stage.removeEventListener("pointerleave", onLeave);
      stage.removeEventListener("dragstart", onDragStart);
      ring.removeEventListener("click", onClick);
      ring.removeEventListener("focusin", onFocusIn);
      ring.removeEventListener("focusout", onFocusOut);
      ring.removeEventListener("keydown", onKey);
    };
  }, [count, doubled, step, total]);

  const stageStyle: CSSProperties = {
    perspective: "var(--ig-persp)",
    WebkitPerspective: "var(--ig-persp)",
    perspectiveOrigin: "50% 40%",
    WebkitPerspectiveOrigin: "50% 40%",
  };
  const ringStyle = {
    "--slots": total,
    transformStyle: "preserve-3d",
    WebkitTransformStyle: "preserve-3d",
    transform: `translateZ(calc(var(--r) * -1)) rotateX(${TILT_DEG}deg)`,
  } as CSSProperties;

  return (
    <div ref={stageRef} className="ig-stage h-[400px] min-[900px]:h-auto min-[900px]:flex-1" style={stageStyle}>
      {/* Floor: a faint blue wash over the lower 46% and a blurred glow under the ring. */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[46%] bg-[linear-gradient(180deg,rgba(31,116,214,0),rgba(31,116,214,0.08))]" />
      <div
        aria-hidden="true"
        className="absolute bottom-[7%] left-1/2 h-[120px] w-[1100px] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(31,116,214,0.45),rgba(31,116,214,0))] blur-[24px] max-[899px]:h-[80px] max-[899px]:w-[700px]"
      />
      <MotionToggle
        playing={!paused}
        onToggle={() => setPaused((p) => !p)}
        pauseLabel={instagramIntro.pauseLabel}
        playLabel={instagramIntro.playLabel}
        className="top-4 right-6 min-[900px]:right-24"
      />
      <ul ref={ringRef} className="ig-ring" style={ringStyle}>
        {slots.map((post, i) => {
          const twin = doubled && i !== frontCopy(i % count, count, step, 0);
          return (
            <li
              key={`${post.id}-${i}`}
              className="ig-tile"
              inert={twin}
              style={{ "--i": i, backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" } as CSSProperties}
            >
              <a
                href={post.href}
                target="_blank"
                rel="noopener noreferrer"
                data-slot={i}
                draggable={false}
                className="group absolute inset-0 block overflow-hidden rounded-[8px] bg-base active:opacity-90"
              >
                {post.image ? (
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    draggable={false}
                    sizes="(max-width: 899px) 180px, 260px"
                    unoptimized={!post.optimize}
                    className="object-cover"
                  />
                ) : (
                  <ImagePlaceholder caption={post.caption} showCaption={false} />
                )}
                {post.isVideo ? <PlayBadge /> : null}
                {post.caption ? (
                  <span className="ig-caption pointer-events-none absolute inset-x-0 bottom-0 bg-[linear-gradient(rgba(10,11,13,0),rgba(10,11,13,0.88)_24px,rgba(10,11,13,0.94))] px-3 pt-7 pb-3 text-[14px] leading-[1.4] text-white">
                    <span className="line-clamp-2">
                      <span className="sr-only">{instagramIntro.postLabel}: </span>
                      {post.caption}
                    </span>
                  </span>
                ) : (
                  <span className="sr-only">{instagramIntro.postLabel}</span>
                )}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
