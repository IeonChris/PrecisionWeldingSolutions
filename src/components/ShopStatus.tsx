"use client";

import { useEffect, useState } from "react";
import { business, nav } from "@/content";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/** True while the shop is inside one of its `business.hours.schema` windows, in Barbados time. */
function isOpen(now: Date): boolean {
  const local = new Date(now.getTime() + business.hours.utcOffsetHours * 3_600_000);
  const day = DAYS[local.getUTCDay()];
  const minutes = local.getUTCHours() * 60 + local.getUTCMinutes();
  const toMinutes = (hhmm: string) => {
    const [h, m] = hhmm.split(":").map(Number);
    return h * 60 + m;
  };
  return business.hours.schema.some(
    (slot) => slot.dayOfWeek === day && minutes >= toMinutes(slot.opens) && minutes < toMinutes(slot.closes),
  );
}

/**
 * "Open now · until 1 PM" / "Opens Sunday 8 AM", with the phone number underneath (from 1100px).
 * The page is static, so the status is worked out in the browser and re-checked every minute.
 * Until it mounts, the block is `invisible`: nothing shows and nothing is announced (the HTML
 * never presents a stale state), but it holds the width of the closed label, so the nav links
 * don't jump when it appears.
 */
export function ShopStatus() {
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const check = () => setOpen(isOpen(new Date()));
    check();
    const timer = window.setInterval(check, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <a
      href="#contact"
      className={`flex-col items-end leading-[1.25] whitespace-nowrap text-silver max-wide:hidden wide:flex hover:text-white focus-visible:text-white active:text-blue-light ${open === null ? "invisible" : ""}`}
    >
      <span className="flex items-center gap-2 text-[13px] font-semibold text-fg">
        <span aria-hidden="true" className={`h-2 w-2 rounded-full ${open ? "bg-whatsapp" : "bg-amber"}`} />
        {open ? nav.status.open : nav.status.closed}
      </span>
      <span className="text-[12px] text-dim">{business.phone.display}</span>
    </a>
  );
}
