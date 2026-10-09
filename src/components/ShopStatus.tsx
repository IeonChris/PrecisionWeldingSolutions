"use client";

import { useEffect, useState } from "react";
import { business, nav } from "@/content";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

/** "17:00" → "5 PM", "08:30" → "8:30 AM". */
function clock(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}${m ? `:${String(m).padStart(2, "0")}` : ""} ${h < 12 ? "AM" : "PM"}`;
}

/** Open/closed and the label to show, from `business.hours.schema` in Barbados time. */
function shopStatus(now: Date): { open: boolean; label: string } {
  const local = new Date(now.getTime() + business.hours.utcOffsetHours * 3_600_000);
  const today = local.getUTCDay();
  const minutes = local.getUTCHours() * 60 + local.getUTCMinutes();
  const slots = business.hours.schema;
  const current = slots.find(
    (s) => s.dayOfWeek === DAYS[today] && minutes >= toMinutes(s.opens) && minutes < toMinutes(s.closes),
  );
  if (current) return { open: true, label: nav.status.open.replace("{time}", clock(current.closes)) };
  // Next opening: later today, else the first day ahead with hours.
  for (let ahead = 0; ahead < 7; ahead++) {
    const day = DAYS[(today + ahead) % 7];
    const next = slots
      .filter((s) => s.dayOfWeek === day && (ahead > 0 || toMinutes(s.opens) > minutes))
      .sort((a, b) => toMinutes(a.opens) - toMinutes(b.opens))[0];
    if (!next) continue;
    const template = ahead === 0 ? nav.status.opensToday : ahead === 1 ? nav.status.opensTomorrow : nav.status.opensLater;
    return { open: false, label: template.replace("{day}", day).replace("{time}", clock(next.opens)) };
  }
  return { open: false, label: "" };
}

/**
 * "Open now · until 5 PM" / "Opens tomorrow 8 AM", with the phone number underneath (from 1100px).
 * The page is static, so the status is worked out in the browser and re-checked every minute.
 * Until it mounts, the block is `invisible`: nothing shows and nothing is announced (the HTML
 * never presents a stale state), but it holds the width of a typical label, so the nav links
 * don't jump when it appears.
 */
export function ShopStatus() {
  const [status, setStatus] = useState<{ open: boolean; label: string } | null>(null);

  useEffect(() => {
    const check = () => setStatus(shopStatus(new Date()));
    check();
    const timer = window.setInterval(check, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <a
      href="#contact"
      className={`flex-col items-end leading-[1.25] whitespace-nowrap text-silver max-wide:hidden wide:flex hover:text-white focus-visible:text-white active:text-blue-light ${status ? "" : "invisible"}`}
    >
      <span className="flex items-center gap-2 text-[13px] font-semibold text-fg">
        <span aria-hidden="true" className={`h-2 w-2 rounded-full ${status?.open ? "bg-whatsapp" : "bg-amber"}`} />
        {status?.label ?? nav.status.open.replace("{time}", "5 PM")}
      </span>
      <span className="text-[12px] text-dim">{business.phone.display}</span>
    </a>
  );
}
