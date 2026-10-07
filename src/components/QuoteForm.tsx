"use client";

import { startTransition, useActionState, useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { business, contact } from "@/content";
import { submitQuote, type QuoteState } from "@/app/actions/quote";

const initialState: QuoteState = { status: "idle" };

export function QuoteForm() {
  const [state, formAction, pending] = useActionState(submitQuote, initialState);
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const id = useId();

  useEffect(() => {
    if (state.status === "sent") {
      formRef.current?.reset();
      setSent(true);
    } else if (state.status === "error") {
      formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
    }
  }, [state]);

  // Submit through the action without React's automatic form reset, so a failed send keeps
  // what the visitor typed. The browser has already checked the `required` fields by now.
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    startTransition(() => formAction(data));
  }

  const errors = state.status === "error" ? (state.errors ?? {}) : {};
  const invalid = (name: keyof NonNullable<QuoteState["errors"]>) =>
    errors[name] ? { "aria-invalid": true as const, "aria-describedby": `${id}-${name}-error` } : {};

  const label = pending ? contact.form.sending : sent ? contact.form.sent : contact.form.submit;

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={onSubmit}
      onInput={() => sent && setSent(false)}
      aria-labelledby={`${id}-title`}
      className="flex flex-col gap-4 border border-line bg-panel p-6 sm:p-9"
    >
      <h3 id={`${id}-title`} className="m-0 mb-1 font-display text-[20px] font-bold text-white uppercase">
        {contact.form.title}
      </h3>

      {/* Honeypot: hidden from people, tempting to bots. */}
      <div className="hp" aria-hidden="true">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
        <Field label="Name" error={errors.name} errorId={`${id}-name-error`}>
          <input name="name" type="text" required maxLength={120} autoComplete="name" className="field" {...invalid("name")} />
        </Field>
        <Field label="Phone / WhatsApp" error={errors.phone} errorId={`${id}-phone-error`}>
          <input
            name="phone"
            type="tel"
            required
            maxLength={40}
            autoComplete="tel"
            inputMode="tel"
            className="field"
            {...invalid("phone")}
          />
        </Field>
      </div>

      <Field label="Describe the job" error={errors.details} errorId={`${id}-details-error`}>
        <textarea
          name="details"
          rows={5}
          maxLength={4000}
          placeholder={contact.form.descriptionPlaceholder}
          className="field resize-y"
          {...invalid("details")}
        />
      </Field>

      <button type="submit" disabled={pending} aria-disabled={pending} className="btn btn-primary w-full border-0 p-4 text-[16px] disabled:cursor-wait">
        {label}
      </button>

      {state.status === "error" && state.message ? (
        <p role="alert" className="m-0 border border-[rgba(255,107,107,0.45)] bg-[rgba(255,107,107,0.06)] px-4 py-3 text-[14px] leading-[1.5] text-fg">
          {state.message}{" "}
          <a href={business.whatsappUrl} target="_blank" rel="noopener noreferrer" className="font-semibold">
            WhatsApp {business.phone.display}
          </a>
        </p>
      ) : null}

      <p className="m-0 text-[13px] text-faint-fg">{contact.form.note}</p>

      <p aria-live="polite" className="sr-only">
        {sent ? contact.form.sent : ""}
      </p>
    </form>
  );
}

interface FieldProps {
  label: string;
  error?: string;
  errorId: string;
  children: ReactNode;
}

function Field({ label, error, errorId, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-[6px]">
      <label className="flex flex-col gap-[6px] text-[13px] tracking-[0.06em] text-dim uppercase">
        {label}
        {children}
      </label>
      {error ? (
        <p id={errorId} className="m-0 text-[13px] text-[#ff8a8a]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
