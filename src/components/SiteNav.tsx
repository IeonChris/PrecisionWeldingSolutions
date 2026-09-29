"use client";

import { useEffect, useRef, useState } from "react";
import { business, navLinks } from "@/content";
import { Brand } from "@/components/Brand";
import { WhatsAppIcon } from "@/components/Icons";

/**
 * Sticky nav. From the `nav` breakpoint up it is the design's single bar; below it the
 * links collapse into a hamburger panel (not designed in the handoff, kept deliberately plain).
 */
export function SiteNav() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!panelRef.current?.contains(target) && !toggleRef.current?.contains(target)) setOpen(false);
    };
    // Close if the viewport grows past the `nav` breakpoint (globals.css) while the panel is open.
    const mq = window.matchMedia("(min-width: 52rem)");
    const onMq = () => mq.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    mq.addEventListener("change", onMq);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50">
      <nav
        aria-label="Main"
        className="relative z-[2] border-b border-line bg-[rgba(10,11,13,0.92)] backdrop-blur-[10px]"
      >
        <div className="container-site flex items-center justify-between gap-6 py-3">
          <a
            href="#top"
            className="flex min-h-[44px] items-center gap-3 rounded-[2px] text-white hover:text-white active:opacity-80"
            aria-label={`${business.name}, back to top`}
          >
            <Brand variant="nav" />
          </a>

          <ul className="m-0 hidden list-none gap-7 p-0 text-[15px] font-medium nav:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="link-quiet">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href={business.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary whitespace-nowrap px-[18px] py-[10px] text-[14px] max-xs:hidden"
            >
              WhatsApp us
            </a>
            <button
              ref={toggleRef}
              type="button"
              className="btn btn-outline h-[44px] w-[44px] flex-col gap-1 p-0 nav:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
            >
              <span className="menu-bar" />
              <span className="menu-bar" />
              <span className="menu-bar" />
            </button>
          </div>
        </div>
      </nav>

      <div
        ref={panelRef}
        id="mobile-menu"
        data-open={open}
        className="menu-panel absolute inset-x-0 top-full z-[1] border-b border-line bg-[rgba(10,11,13,0.97)] shadow-menu backdrop-blur-[10px] nav:hidden"
      >
        <ul className="container-site m-0 list-none py-2">
          {navLinks.map((l) => (
            <li key={l.href} className="border-b border-line last:border-b-0">
              <a
                href={l.href}
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
                className="link-quiet flex min-h-[52px] items-center font-display text-[15px] font-bold tracking-[0.08em] uppercase"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="container-site pb-5">
          <a
            href={business.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={open ? 0 : -1}
            onClick={() => setOpen(false)}
            className="btn btn-primary w-full px-5 py-3 text-[16px]"
          >
            <WhatsAppIcon size={20} />
            WhatsApp {business.phone.display}
          </a>
        </div>
      </div>
    </header>
  );
}
