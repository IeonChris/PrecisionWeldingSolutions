"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";
import { contact } from "@/content";
import { quoteWhatsappHref } from "@/lib/whatsapp";

/**
 * Quote request that goes straight to Kris on WhatsApp: "Send request" opens a chat with the name,
 * number and job already typed in. WhatsApp links can't carry files, so the visitor adds the photo
 * in the chat before sending. Nothing is sent to or stored on the server.
 */
export function QuoteForm() {
  const id = useId();
  const [opened, setOpened] = useState<string | null>(null);
  const { form } = contact;

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (name: string) => String(data.get(name) ?? "").trim();
    const href = quoteWhatsappHref({ name: value("name"), phone: value("phone"), job: value("job") });
    // A new tab keeps the site open on computers; phones hand the link to the WhatsApp app.
    const tab = window.open(href, "_blank");
    if (tab) tab.opener = null;
    else window.location.href = href;
    setOpened(href);
  }

  // The browser checks the required fields; the number also needs at least 7 digits.
  function checkPhone(input: HTMLInputElement) {
    const digits = (input.value.match(/\d/g) ?? []).length;
    input.setCustomValidity(input.value && digits < 7 ? form.phoneError : "");
  }

  return (
    <form
      onSubmit={onSubmit}
      onInput={() => opened && setOpened(null)}
      aria-labelledby={`${id}-title`}
      className="flex flex-col gap-4 border border-line bg-panel p-6 sm:p-9"
    >
      <h3 id={`${id}-title`} className="m-0 mb-1 font-display text-[20px] font-bold text-white uppercase">
        {form.title}
      </h3>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
        <Field label={form.labels.name}>
          <input name="name" type="text" required minLength={2} maxLength={120} autoComplete="name" className="field" />
        </Field>
        <Field label={form.labels.phone}>
          <input
            name="phone"
            type="tel"
            required
            maxLength={40}
            autoComplete="tel"
            inputMode="tel"
            className="field"
            onInput={(e) => checkPhone(e.currentTarget)}
            onInvalid={(e) => checkPhone(e.currentTarget)}
          />
        </Field>
      </div>

      <Field label={form.labels.job}>
        <textarea
          name="job"
          rows={5}
          required
          maxLength={1500}
          placeholder={form.descriptionPlaceholder}
          className="field resize-y"
        />
      </Field>

      <button type="submit" className="btn btn-primary w-full border-0 p-4 text-[16px]">
        {form.submit}
      </button>

      <p className="m-0 text-[13px] text-faint-fg">{form.note}</p>

      <p aria-live="polite" className="m-0 text-[14px] leading-[1.5] text-fg empty:hidden">
        {opened ? (
          <>
            {form.opened}{" "}
            <a href={opened} target="_blank" rel="noopener noreferrer" className="font-semibold max-md:inline-block max-md:py-3">
              {form.reopen}
            </a>
          </>
        ) : null}
      </p>
    </form>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-[6px] text-[13px] tracking-[0.06em] text-dim uppercase">
      {label}
      {children}
    </label>
  );
}
