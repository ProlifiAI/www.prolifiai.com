"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode, type RefObject } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowLeft,
  ArrowsClockwise,
  Browser,
  CaretDown,
  Check,
  CheckCircle,
  ChartLineUp,
  DeviceMobile,
  DotsThreeOutline,
  Megaphone,
  PencilSimple,
  RocketLaunch,
  WarningCircle,
  type Icon,
} from "@phosphor-icons/react";

import { websitePackages } from "@/content/pricing";
import { findPillar } from "@/content/services";
import { site } from "@/content/site";
import {
  budgetOptions,
  contactSchema,
  enquiryServices,
  serviceLabel,
  step1Schema,
  step2Schema,
  timelineOptions,
  toFieldErrors,
  type ContactErrors,
  type ContactInput,
  type ContactResponse,
  type EnquiryServiceId,
} from "@/lib/contact-schema";
import { cn } from "@/lib/utils";
import { SubmitButton } from "@/components/button";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "sent" }
  | { kind: "not-delivered" }
  | { kind: "error"; message: string };

type Values = Omit<ContactInput, "website">;

const steps = ["Services", "Your project", "Review"] as const;

const serviceIcons: Record<EnquiryServiceId, Icon> = {
  "new-website": Browser,
  redesign: ArrowsClockwise,
  "social-media": Megaphone,
  "digital-product": DeviceMobile,
  "scale-product": RocketLaunch,
  "growth-strategy": ChartLineUp,
  "something-else": DotsThreeOutline,
};

const step1Fields: (keyof Values)[] = ["services", "servicesNote"];
const step2Fields: (keyof Values)[] = ["fullName", "email", "company", "link", "details", "budget", "timeline"];

/** Service pages, insight CTAs and pricing cards link here with ?service=, ?pillar= or ?package=. */
const serviceFromSlug: Record<string, EnquiryServiceId> = {
  "business-websites": "new-website",
  "landing-pages": "new-website",
  "digital-foundations": "new-website",
  "website-redesigns": "redesign",
  "social-media-strategy": "social-media",
  "content-planning": "social-media",
  "social-media-design": "social-media",
  "campaign-creative": "social-media",
  "product-strategy": "digital-product",
  "product-development": "digital-product",
  "ux-research-ia": "digital-product",
  "ui-ux-design": "digital-product",
  "prototyping-design-systems": "digital-product",
  "seo-search-visibility": "growth-strategy",
  "ai-tool-selection": "growth-strategy",
};
const serviceFromPillar: Record<string, EnquiryServiceId> = {
  build: "new-website",
  launch: "growth-strategy",
  scale: "digital-product",
};

function useInitialValues(): Values {
  const params = useSearchParams();
  const pkg = websitePackages.find((p) => p.id === params.get("package"));
  const pillar = findPillar(params.get("pillar"));
  const fromService = serviceFromSlug[params.get("service") ?? ""];

  const services: EnquiryServiceId[] = [];
  let servicesNote = "";
  if (fromService) services.push(fromService);
  if (pkg) {
    if (!services.includes("new-website")) services.push("new-website");
    servicesNote = `I'm interested in the ${pkg.name} website package.`;
  } else if (pillar && !fromService) {
    services.push(serviceFromPillar[pillar.id]);
  }
  return { services, servicesNote, fullName: "", email: "", company: "", link: "", details: "", budget: "", timeline: "" };
}

export function ContactForm() {
  const initial = useInitialValues();
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [values, setValues] = useState<Values>(initial);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const headingRef = useRef<HTMLHeadingElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const firstRender = useRef(true);
  // Synchronous lock: state updates are async, so a fast double click could
  // otherwise start two requests before the button disables
  const inFlight = useRef(false);

  // Move focus to the new step's heading, so keyboard and screen-reader users land at its start
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus({ preventScroll: true });
    headingRef.current?.closest("form")?.scrollIntoView({ block: "start", behavior: reduceMotion ? "auto" : "smooth" });
  }, [step, reduceMotion]);

  function set<K extends keyof Values>(key: K, value: Values[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function toggleService(id: EnquiryServiceId) {
    set("services", values.services.includes(id) ? values.services.filter((s) => s !== id) : [...values.services, id]);
  }

  function goTo(next: number) {
    setDirection(next > step ? 1 : -1);
    setStatus({ kind: "idle" });
    setStep(next);
  }

  /** Focuses the first invalid control of the current step. */
  function focusFirst(next: ContactErrors, fields: (keyof Values)[]) {
    const first = fields.find((k) => next[k]);
    if (!first) return;
    requestAnimationFrame(() => {
      const el = document.querySelector<HTMLElement>(first === "services" ? "[data-service-option]" : `#field-${first}`);
      el?.focus();
    });
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (step === 0 || step === 1) {
      const schema = step === 0 ? step1Schema : step2Schema;
      const parsed = schema.safeParse(values);
      if (!parsed.success) {
        const next = toFieldErrors(parsed.error);
        setErrors(next);
        focusFirst(next, step === 0 ? step1Fields : step2Fields);
        return;
      }
      setErrors({});
      setValues((v) => ({ ...v, ...parsed.data }));
      goTo(step + 1);
      return;
    }

    if (inFlight.current) return;
    const parsed = contactSchema.safeParse({ ...values, website: honeypotRef.current?.value ?? "" });
    if (!parsed.success) {
      const next = toFieldErrors(parsed.error);
      setErrors(next);
      if (step1Fields.some((k) => next[k])) goTo(0);
      else if (step2Fields.some((k) => next[k])) goTo(1);
      return;
    }

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
      } else if (data?.ok && !data.delivered) {
        setStatus({ kind: "not-delivered" });
      } else {
        if (data && !data.ok && data.errors) {
          setErrors(data.errors);
          if (step1Fields.some((k) => data.errors?.[k])) goTo(0);
          else if (step2Fields.some((k) => data.errors?.[k])) goTo(1);
        }
        setStatus({ kind: "error", message: data && !data.ok ? data.message : "Something went wrong." });
      }
    } catch {
      setStatus({ kind: "error", message: "We could not reach the server. Please check your connection." });
    } finally {
      inFlight.current = false;
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  function startOver() {
    setValues({ ...initial, services: [], servicesNote: "" });
    setErrors({});
    setDirection(-1);
    setStep(0);
    setStatus({ kind: "idle" });
  }

  if (status.kind === "sent") {
    return (
      <motion.div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-panel bg-surface p-8 shadow-soft ring-1 ring-line outline-none md:p-12"
      >
        <span className="flex size-12 items-center justify-center rounded-full bg-accent text-on-accent">
          <CheckCircle size={26} weight="fill" aria-hidden />
        </span>
        <h2 className="mt-6 text-h3 font-semibold text-heading">Thank you, your enquiry has been sent</h2>
        <p className="mt-3 max-w-[48ch] text-pretty text-ink-muted">
          We have received your project details and will reply to {values.email || "the email address you provided"}.
        </p>
        <button
          type="button"
          onClick={startOver}
          className="mt-8 text-[0.95rem] font-medium text-heading underline decoration-line-strong underline-offset-[6px] hover:decoration-heading"
        >
          Send another enquiry
        </button>
      </motion.div>
    );
  }

  const pending = status.kind === "submitting";
  const slide = reduceMotion ? 0 : 28;

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-label="Project enquiry"
      className="scroll-mt-[calc(var(--header-h)+1rem)] rounded-panel bg-surface p-6 shadow-soft ring-1 ring-line sm:p-8 md:p-10"
    >
      <Progress step={step} />

      <AnimatePresence mode="wait" initial={false} custom={direction}>
        <motion.div
          key={step}
          custom={direction}
          initial={{ opacity: 0, x: direction * slide }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -slide }}
          transition={{ duration: reduceMotion ? 0.15 : 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {step === 0 && (
            <StepServices
              headingRef={headingRef}
              values={values}
              errors={errors}
              onToggle={toggleService}
              onNote={(v) => set("servicesNote", v)}
            />
          )}
          {step === 1 && <StepDetails headingRef={headingRef} values={values} errors={errors} set={set} />}
          {step === 2 && <StepReview headingRef={headingRef} values={values} onEdit={goTo} />}
        </motion.div>
      </AnimatePresence>

      {/* Honeypot, hidden from people and assistive technology */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input ref={honeypotRef} type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div ref={statusRef} tabIndex={-1} aria-live="polite" className="outline-none">
        <AnimatePresence mode="wait">
          {status.kind === "error" && (
            <Notice key="error">
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
            <Notice key="dev">
              Your details are valid, but email delivery is not configured on this server, so this enquiry was not sent.
              Add the Resend settings from .env.example to enable delivery.
            </Notice>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-8 flex flex-col-reverse gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => goTo(step - 1)}
            disabled={pending}
            className="group inline-flex items-center justify-center gap-2 self-center rounded-full px-2 py-2 text-[0.95rem] font-medium text-heading transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:opacity-50 sm:self-auto"
          >
            <ArrowLeft
              size={16}
              weight="bold"
              aria-hidden
              className="transition-transform duration-[var(--duration-button)] ease-[var(--ease-reveal)] group-hover:-translate-x-1"
            />
            Back
          </button>
        ) : (
          <p className="text-sm text-ink-muted">Takes about two minutes. We only use your details to reply.</p>
        )}
        <SubmitButton pending={pending} className="justify-between sm:justify-start">
          {step < 2 ? "Continue" : pending ? "Sending..." : "Submit Enquiry"}
        </SubmitButton>
      </div>
    </form>
  );
}

/* ------------------------------------------------------------------ */

/** Step counter plus three segments; the current segment fills with brand yellow. */
function Progress({ step }: { step: number }) {
  return (
    <div className="mb-8">
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-label font-semibold uppercase text-ink-muted">
          Step {step + 1} of {steps.length}
          <span className="sr-only">: {steps[step]}</span>
        </p>
        <p aria-hidden className="text-sm font-medium text-heading">
          {steps[step]}
        </p>
      </div>
      <ol aria-hidden className="mt-3 grid grid-cols-3 gap-2">
        {steps.map((label, i) => (
          <li key={label} className="h-1.5 overflow-hidden rounded-full bg-line">
            <motion.span
              className={cn("block h-full rounded-full", i < step ? "bg-heading" : "bg-accent")}
              initial={false}
              animate={{ width: i <= step ? "100%" : "0%" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </li>
        ))}
      </ol>
    </div>
  );
}

type HeadingRef = RefObject<HTMLHeadingElement | null>;

function StepHeading({ headingRef, title, intro }: { headingRef: HeadingRef; title: string; intro: string }) {
  return (
    <div className="mb-7">
      <h2 ref={headingRef} tabIndex={-1} className="text-balance text-h3 font-semibold tracking-[-0.02em] text-heading outline-none">
        {title}
      </h2>
      <p className="mt-2 text-pretty text-ink-muted">{intro}</p>
    </div>
  );
}

function StepServices({
  headingRef,
  values,
  errors,
  onToggle,
  onNote,
}: {
  headingRef: HeadingRef;
  values: Values;
  errors: ContactErrors;
  onToggle: (id: EnquiryServiceId) => void;
  onNote: (v: string) => void;
}) {
  return (
    <>
      <StepHeading
        headingRef={headingRef}
        title="What can we help you build or grow?"
        intro="Select all the services you're interested in."
      />
      <fieldset aria-describedby={errors.services ? "services-error" : undefined}>
        <legend className="sr-only">Services you are interested in</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {enquiryServices.map((s) => {
            const selected = values.services.includes(s.id);
            const Icon = serviceIcons[s.id];
            return (
              <label
                key={s.id}
                className={cn(
                  "group relative flex min-h-16 cursor-pointer items-center gap-3.5 rounded-card px-4 py-3.5 ring-inset transition-[background-color,box-shadow,color,transform] duration-200 active:scale-[0.99]",
                  "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-focus",
                  selected
                    ? "bg-inverse text-on-inverse shadow-[0_12px_28px_-16px_rgb(14_48_98/0.7)] ring-2 ring-accent"
                    : "bg-canvas text-heading ring-1 ring-line-strong hover:ring-heading/40",
                  errors.services && !selected && "ring-danger/50"
                )}
              >
                <input
                  type="checkbox"
                  data-service-option
                  className="sr-only"
                  checked={selected}
                  onChange={() => onToggle(s.id)}
                  aria-invalid={errors.services ? true : undefined}
                />
                <span
                  aria-hidden
                  className={cn(
                    "flex size-10 shrink-0 items-center justify-center rounded-full transition-colors duration-200",
                    selected ? "bg-white/10 text-accent" : "bg-inverse/[0.06] text-heading"
                  )}
                >
                  <Icon size={20} weight={selected ? "fill" : "regular"} />
                </span>
                <span className="flex-1 text-[0.95rem] font-medium leading-snug">{s.label}</span>
                <span
                  aria-hidden
                  className={cn(
                    "flex size-6 shrink-0 items-center justify-center rounded-full transition-[background-color,box-shadow,transform] duration-200",
                    selected ? "scale-100 bg-accent text-on-accent" : "scale-90 ring-1 ring-inset ring-line-strong"
                  )}
                >
                  {selected && <Check size={13} weight="bold" />}
                </span>
              </label>
            );
          })}
        </div>
        <ErrorText id="services-error" error={errors.services} />
      </fieldset>

      <Field name="servicesNote" label="Tell us a little more about what you need" optional error={errors.servicesNote} className="mt-3">
        {(p) => (
          <textarea
            {...p}
            rows={3}
            maxLength={500}
            value={values.servicesNote}
            onChange={(e) => onNote(e.target.value)}
            placeholder="e.g. A five-page site with online bookings, launching next quarter"
            className={cn(p.className, "h-auto min-h-24 resize-y py-3 leading-relaxed")}
          />
        )}
      </Field>
    </>
  );
}

function StepDetails({
  headingRef,
  values,
  errors,
  set,
}: {
  headingRef: HeadingRef;
  values: Values;
  errors: ContactErrors;
  set: <K extends keyof Values>(key: K, value: Values[K]) => void;
}) {
  return (
    <>
      <StepHeading
        headingRef={headingRef}
        title="Tell us about your project"
        intro="Just the essentials. We will follow up with any questions."
      />
      <div className="grid min-w-0 gap-x-5 gap-y-2 sm:grid-cols-2">
        <Field name="fullName" label="Full name" required error={errors.fullName}>
          {(p) => (
            <input
              {...p}
              type="text"
              autoComplete="name"
              placeholder="e.g. Paul Stephen"
              value={values.fullName}
              onChange={(e) => set("fullName", e.target.value)}
            />
          )}
        </Field>
        <Field name="email" label="Business email" required error={errors.email}>
          {(p) => (
            <input
              {...p}
              type="email"
              autoComplete="email"
              inputMode="email"
              placeholder="you@company.com"
              value={values.email}
              onChange={(e) => set("email", e.target.value)}
            />
          )}
        </Field>
        <Field name="company" label="Company or business name" required error={errors.company}>
          {(p) => (
            <input
              {...p}
              type="text"
              autoComplete="organization"
              placeholder="Your business or organisation"
              value={values.company}
              onChange={(e) => set("company", e.target.value)}
            />
          )}
        </Field>
        <Field name="link" label="Website or social media link" optional error={errors.link}>
          {(p) => (
            <input
              {...p}
              type="text"
              inputMode="url"
              autoComplete="url"
              placeholder="yourbusiness.com or @yourhandle"
              value={values.link}
              onChange={(e) => set("link", e.target.value)}
            />
          )}
        </Field>
        <Field name="details" label="Brief project description" required error={errors.details} className="sm:col-span-2">
          {(p) => (
            <textarea
              {...p}
              rows={5}
              value={values.details}
              onChange={(e) => set("details", e.target.value)}
              placeholder="What are you looking to achieve, and what does success look like?"
              className={cn(p.className, "h-auto min-h-36 resize-y py-3 leading-relaxed")}
            />
          )}
        </Field>
        <Field name="budget" label="Estimated budget" optional error={errors.budget}>
          {(p) => (
            <SelectWrap>
              <select
                {...p}
                value={values.budget}
                data-empty={!values.budget}
                onChange={(e) => set("budget", e.target.value as Values["budget"])}
              >
                <option value="">Select a range</option>
                {budgetOptions.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </SelectWrap>
          )}
        </Field>
        <Field name="timeline" label="Preferred timeline" optional error={errors.timeline}>
          {(p) => (
            <SelectWrap>
              <select
                {...p}
                value={values.timeline}
                data-empty={!values.timeline}
                onChange={(e) => set("timeline", e.target.value as Values["timeline"])}
              >
                <option value="">Select a timeline</option>
                {timelineOptions.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </SelectWrap>
          )}
        </Field>
      </div>
    </>
  );
}

function StepReview({ headingRef, values, onEdit }: { headingRef: HeadingRef; values: Values; onEdit: (step: number) => void }) {
  const details: [string, string][] = [
    ["Full name", values.fullName],
    ["Business email", values.email],
    ["Company", values.company],
    ["Website or social", values.link],
    ["Estimated budget", values.budget],
    ["Preferred timeline", values.timeline],
  ];
  return (
    <>
      <StepHeading
        headingRef={headingRef}
        title="Review and submit"
        intro="Check everything looks right. You can go back and edit any part."
      />
      <div className="space-y-4">
        <ReviewCard title="Services" onEdit={() => onEdit(0)}>
          <ul className="flex flex-wrap gap-2">
            {values.services.map((id) => (
              <li
                key={id}
                className="inline-flex items-center gap-1.5 rounded-full bg-inverse px-3 py-1.5 text-sm font-medium text-on-inverse"
              >
                <Check size={12} weight="bold" aria-hidden className="text-accent" />
                {serviceLabel(id)}
              </li>
            ))}
          </ul>
          {values.servicesNote && <p className="mt-4 whitespace-pre-line text-pretty text-[0.95rem] text-ink">{values.servicesNote}</p>}
        </ReviewCard>

        <ReviewCard title="Your project" onEdit={() => onEdit(1)}>
          <dl className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
            {details.map(([label, value]) => (
              <div key={label} className="min-w-0">
                <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-ink-muted">{label}</dt>
                <dd className={cn("mt-1 break-words text-[0.95rem]", value ? "font-medium text-heading" : "text-ink-muted")}>
                  {value || "Not provided"}
                </dd>
              </div>
            ))}
            <div className="sm:col-span-2">
              <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-ink-muted">Project description</dt>
              <dd className="mt-1 whitespace-pre-line break-words text-pretty text-[0.95rem] text-ink">{values.details}</dd>
            </div>
          </dl>
        </ReviewCard>
      </div>
    </>
  );
}

function ReviewCard({ title, onEdit, children }: { title: string; onEdit: () => void; children: ReactNode }) {
  return (
    <section className="rounded-card bg-canvas p-5 ring-1 ring-inset ring-line sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h3 className="text-sm font-semibold text-heading">{title}</h3>
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-heading ring-1 ring-inset ring-line-strong transition-colors hover:bg-inverse hover:text-on-inverse focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
        >
          <PencilSimple size={14} aria-hidden />
          Edit<span className="sr-only"> {title.toLowerCase()}</span>
        </button>
      </div>
      {children}
    </section>
  );
}

type ControlProps = {
  id: string;
  name: string;
  required?: boolean;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
  className: string;
};

/**
 * One look for every control: 48px tall, pale neutral fill, thin blue-grey
 * border; hover darkens the border, focus turns it navy with a soft navy
 * halo, errors turn it red. Placeholders are muted so they read as examples,
 * never as entered text. A closed select still showing its placeholder
 * (data-empty) uses the same muted colour.
 */
const controlClass = cn(
  "h-12 w-full rounded-field bg-canvas px-4 text-[0.95rem] text-ink ring-1 ring-inset ring-line-strong",
  "transition-[box-shadow,background-color] duration-200",
  "placeholder:text-ink-muted/70 data-[empty=true]:text-ink-muted/80",
  "hover:ring-heading/35",
  "focus:bg-surface focus:outline-none focus:ring-[1.5px] focus:ring-heading focus:shadow-[0_0_0_4px_rgb(14_48_98/0.08)]",
  "aria-[invalid=true]:ring-[1.5px] aria-[invalid=true]:ring-danger aria-[invalid=true]:focus:shadow-[0_0_0_4px_rgb(180_35_24/0.1)]",
  "disabled:cursor-not-allowed disabled:opacity-60"
);

function Field({
  name,
  label,
  required,
  optional,
  error,
  className,
  children,
}: {
  name: keyof Values;
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  className?: string;
  children: (props: ControlProps) => ReactNode;
}) {
  const id = `field-${name}`;
  const errorId = `${id}-error`;
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-sm font-medium text-heading">
        {label}
        {required && (
          <span aria-hidden className="ml-0.5 text-danger">
            *
          </span>
        )}
        {optional && <span className="ml-1.5 font-normal text-ink-muted">(optional)</span>}
      </label>
      {children({
        id,
        name,
        required,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": error ? errorId : undefined,
        className: controlClass,
      })}
      <ErrorText id={errorId} error={error} />
    </div>
  );
}

/** Space for one line of error text is always reserved, so messages never push the form around. */
function ErrorText({ id, error }: { id: string; error?: string }) {
  return (
    <p id={id} className="flex min-h-5 items-start gap-1.5 pt-1 text-[0.8rem] leading-5 text-danger">
      {error && (
        <>
          <WarningCircle size={15} weight="fill" aria-hidden className="mt-[3px] shrink-0" />
          {error}
        </>
      )}
    </p>
  );
}

function SelectWrap({ children }: { children: ReactNode }) {
  return (
    <div className="relative [&>select]:cursor-pointer [&>select]:appearance-none [&>select]:pr-11">
      {children}
      <CaretDown size={15} aria-hidden className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-muted" />
    </div>
  );
}

function Notice({ children }: { children: ReactNode }) {
  return (
    <motion.div
      role="alert"
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
