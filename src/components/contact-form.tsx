"use client";

import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle, WarningCircle, CaretDown } from "@phosphor-icons/react";

import { findPillar, pillarOptions, pillars, serviceOptions } from "@/content/services";
import { websitePackages } from "@/content/pricing";
import { site } from "@/content/site";
import {
  budgetOptions,
  contactSchema,
  toFieldErrors,
  type ContactErrors,
  type ContactInput,
  type ContactResponse,
} from "@/lib/contact-schema";
import { cn } from "@/lib/utils";
import { SubmitButton } from "@/components/button";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "sent" }
  | { kind: "not-delivered" }
  | { kind: "error"; message: string };

const fieldOrder: (keyof ContactInput)[] = ["firstName", "lastName", "email", "business", "location", "service", "budget", "details"];

/** Reads ?service=, ?package= and ?pillar= so CTAs across the site can preselect the form. */
function useInitialValues() {
  const params = useSearchParams();
  const serviceParam = params.get("service") ?? "";
  const packageParam = params.get("package") ?? "";
  const pillarParam = params.get("pillar") ?? "";

  const pkg = websitePackages.find((p) => p.id === packageParam);
  const pillar = findPillar(pillarParam);

  let service = serviceOptions.some((o) => o.value === serviceParam) ? serviceParam : "";
  let details = "";
  if (pkg) {
    service = service || "business-websites";
    details = `I'm interested in the ${pkg.name} website package.\n\n`;
  } else if (pillar && !service) {
    service = `${pillar.id}-general`;
    details = `I'd like to talk about ${pillar.name}: ${pillar.focus.toLowerCase()}.\n\n`;
  }
  return { service, details };
}

export function ContactForm() {
  const initial = useInitialValues();
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  // Synchronous lock: state updates are async, so a fast double click could
  // otherwise start two requests before the button disables
  const inFlight = useRef(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inFlight.current) return;
    const form = e.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());

    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const next = toFieldErrors(parsed.error);
      setErrors(next);
      setStatus({ kind: "idle" });
      const first = fieldOrder.find((k) => next[k]);
      if (first) (form.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }

    setErrors({});
    setStatus({ kind: "submitting" });
    inFlight.current = true;
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = (await res.json().catch(() => null)) as ContactResponse | null;

      if (data?.ok && data.delivered) {
        setStatus({ kind: "sent" });
        form.reset();
      } else if (data?.ok && !data.delivered) {
        setStatus({ kind: "not-delivered" });
      } else {
        if (data && !data.ok && data.errors) setErrors(data.errors);
        setStatus({ kind: "error", message: data && !data.ok ? data.message : "Something went wrong." });
      }
    } catch {
      setStatus({ kind: "error", message: "We could not reach the server. Please check your connection." });
    } finally {
      inFlight.current = false;
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  if (status.kind === "sent") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="rounded-panel bg-surface p-8 shadow-soft ring-1 ring-line outline-none md:p-12">
        <span className="flex size-12 items-center justify-center rounded-full bg-accent text-on-accent">
          <CheckCircle size={26} weight="fill" aria-hidden />
        </span>
        <h2 className="mt-6 text-h3 font-semibold text-heading">Thank you, your message has been sent</h2>
        <p className="mt-3 max-w-[48ch] text-pretty text-ink-muted">
          We have received your project details and will reply to the email address you provided.
        </p>
        <button
          type="button"
          onClick={() => setStatus({ kind: "idle" })}
          className="mt-8 text-[0.95rem] font-medium text-heading underline decoration-line-strong underline-offset-[6px] hover:decoration-heading"
        >
          Send another message
        </button>
      </div>
    );
  }

  const pending = status.kind === "submitting";

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      aria-describedby="form-note"
      className="rounded-panel bg-surface p-6 shadow-soft ring-1 ring-line sm:p-8 md:p-10"
    >
      <p id="form-note" className="mb-8 text-sm text-ink-muted">
        Fields marked <span aria-hidden className="text-danger">*</span>
        <span className="sr-only">with an asterisk</span> are required.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field name="firstName" label="First name" required error={errors.firstName}>
          {(p) => <input {...p} type="text" autoComplete="given-name" />}
        </Field>
        <Field name="lastName" label="Last name" required error={errors.lastName}>
          {(p) => <input {...p} type="text" autoComplete="family-name" />}
        </Field>
        <Field name="email" label="Email" required error={errors.email} className="sm:col-span-2">
          {(p) => <input {...p} type="email" autoComplete="email" inputMode="email" />}
        </Field>
        <Field name="business" label="Business name" error={errors.business}>
          {(p) => <input {...p} type="text" autoComplete="organization" />}
        </Field>
        <Field name="location" label="Location" hint="City or country" error={errors.location}>
          {(p) => <input {...p} type="text" autoComplete="address-level2" />}
        </Field>
        <Field name="service" label="Service of interest" required error={errors.service}>
          {(p) => (
            <SelectWrap>
              <select {...p} defaultValue={initial.service}>
                <option value="" disabled>
                  Choose a service
                </option>
                {pillars.map((pillar) => (
                  <optgroup key={pillar.id} label={`${pillar.name}: ${pillar.focus}`}>
                    {serviceOptions
                      .filter((o) => o.group === pillar.name)
                      .map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    {pillarOptions
                      .filter((o) => o.pillar === pillar.id)
                      .map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                  </optgroup>
                ))}
                <option value="not-sure">Not sure yet</option>
              </select>
            </SelectWrap>
          )}
        </Field>
        <Field name="budget" label="Budget range" hint="Optional" error={errors.budget}>
          {(p) => (
            <SelectWrap>
              <select {...p} defaultValue="">
                <option value="">Prefer not to say</option>
                {budgetOptions.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </SelectWrap>
          )}
        </Field>
        <Field
          name="details"
          label="Project details"
          required
          hint="What do you need, and what would success look like?"
          error={errors.details}
          className="sm:col-span-2"
        >
          {(p) => <textarea {...p} rows={6} defaultValue={initial.details} className={cn(p.className, "min-h-40 resize-y py-3")} />}
        </Field>

        {/* Honeypot, hidden from people and assistive technology */}
        <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label>
            Website
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
      </div>

      <div ref={statusRef} tabIndex={-1} aria-live="polite" className="outline-none">
        <AnimatePresence mode="wait">
          {status.kind === "error" && (
            <Notice key="error" tone="error">
              {status.message}{" "}
              {site.contactEmail ? (
                <>
                  You can also email us at{" "}
                  <a className="font-medium underline" href={`mailto:${site.contactEmail}`}>
                    {site.contactEmail}
                  </a>
                  .
                </>
              ) : (
                "Please try again in a moment."
              )}
            </Notice>
          )}
          {status.kind === "not-delivered" && (
            <Notice key="dev" tone="error">
              Your details are valid, but email delivery is not configured on this server, so this enquiry was not sent.
              Add the Resend settings from .env.example to enable delivery.
            </Notice>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-8 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink-muted">We only use your details to reply to your enquiry.</p>
        <SubmitButton pending={pending}>{pending ? "Sending..." : "Send Message"}</SubmitButton>
      </div>
    </form>
  );
}

/* ------------------------------------------------------------------ */

type ControlProps = {
  id: string;
  name: string;
  required?: boolean;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
  className: string;
};

const controlClass =
  "w-full rounded-field bg-canvas px-4 py-3 text-base text-ink ring-1 ring-inset ring-line-strong transition-[box-shadow,background-color] placeholder:text-ink-muted hover:ring-heading/30 focus:bg-surface focus:outline-none focus:ring-2 focus:ring-focus aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-danger";

function Field({
  name,
  label,
  required,
  hint,
  error,
  className,
  children,
}: {
  name: keyof ContactInput;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  className?: string;
  children: (props: ControlProps) => ReactNode;
}) {
  const id = `field-${name}`;
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-sm font-medium text-heading">
        {label}
        {required && (
          <span aria-hidden className="ml-0.5 text-danger">
            *
          </span>
        )}
      </label>
      {hint && (
        <p id={hintId} className="-mt-1 text-sm text-ink-muted">
          {hint}
        </p>
      )}
      {children({
        id,
        name,
        required,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": [hintId, errorId].filter(Boolean).join(" ") || undefined,
        className: controlClass,
      })}
      {error && (
        <p id={errorId} className="flex items-center gap-1.5 text-sm text-danger">
          <WarningCircle size={16} weight="fill" aria-hidden />
          {error}
        </p>
      )}
    </div>
  );
}

function SelectWrap({ children }: { children: ReactNode }) {
  return (
    <div className="relative [&>select]:appearance-none [&>select]:pr-10">
      {children}
      <CaretDown size={16} aria-hidden className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-muted" />
    </div>
  );
}

function Notice({ tone, children }: { tone: "error"; children: ReactNode }) {
  return (
    <motion.div
      role={tone === "error" ? "alert" : undefined}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="mt-8 flex gap-3 rounded-card bg-danger/[0.06] p-4 text-sm text-danger ring-1 ring-inset ring-danger/20"
    >
      <WarningCircle size={20} weight="fill" aria-hidden className="shrink-0" />
      <p className="text-pretty">{children}</p>
    </motion.div>
  );
}
