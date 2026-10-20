"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CaretDown } from "@phosphor-icons/react";

import { testimonials, type Testimonial } from "@/content/company";
import { ease, reveal } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/ui/blur-fade";

/**
 * "Client Experiences": editorial testimonial cards after the approved card
 * reference (portrait or monogram, quote mark, name, role, divider, quote).
 *
 * The first testimonial is featured (larger type, wider column). Each card
 * opens on a faithful one-sentence excerpt with an accessible "Read full
 * testimonial" disclosure that reveals the complete supplied text.
 * Portraits are shown only when one is confirmed for that client;
 * otherwise an initials monogram is used. No ratings are shown.
 */
function initials(name: string) {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function TestimonialCard({ t, featured }: { t: Testimonial; featured: boolean }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <figure
      className={cn(
        "group relative flex h-full flex-col rounded-[1.75rem] bg-surface p-7 ring-1 ring-line transition-[transform,box-shadow] duration-500 ease-[var(--ease-reveal)] hover:-translate-y-1 hover:shadow-lift md:p-10",
        featured ? "shadow-soft" : ""
      )}
    >
      <div className="flex items-start justify-between gap-6">
        {t.portrait ? (
          <Image src={t.portrait} alt={`Portrait of ${t.name}`} width={64} height={64} className="size-16 rounded-full object-cover" />
        ) : (
          <span aria-hidden className="flex size-16 items-center justify-center rounded-full bg-inverse text-lg font-semibold tracking-[0.04em] text-accent">
            {initials(t.name)}
          </span>
        )}
        <span aria-hidden className="font-serif text-[4.5rem] leading-[0.6] text-accent transition-transform duration-500 group-hover:-translate-y-1">
          &rdquo;
        </span>
      </div>

      <figcaption className="mt-6">
        <p className="text-xl font-semibold tracking-[-0.02em] text-heading">{t.name}</p>
        <p className="mt-1 text-[0.95rem] font-medium text-accent-strong">
          {t.role}, {t.organisation}
        </p>
      </figcaption>

      <div aria-hidden className="mt-6 h-px w-24 bg-line-strong" />

      <blockquote className="mt-6 flex-1">
        <p
          className={cn(
            "text-pretty font-medium tracking-[-0.015em] text-heading",
            featured ? "text-[clamp(1.25rem,1.9vw,1.6rem)] leading-[1.4]" : "text-[clamp(1.1rem,1.5vw,1.3rem)] leading-[1.45]"
          )}
        >
          &ldquo;{t.excerpt}&rdquo;
        </p>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={panelId}
              role="region"
              aria-label={`Full testimonial from ${t.name}`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: ease.reveal }}
              className="overflow-hidden"
            >
              <div className="space-y-4 pt-6 text-pretty leading-relaxed text-ink-muted">
                {t.full.map((para) => (
                  <p key={para.slice(0, 32)}>{para}</p>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </blockquote>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
        <span className="rounded-full bg-canvas px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-heading ring-1 ring-inset ring-line">
          {t.project}
        </span>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="group/btn inline-flex min-h-11 items-center gap-2 rounded-full px-1 text-sm font-semibold text-heading underline decoration-line-strong underline-offset-[6px] transition-colors hover:decoration-heading"
        >
          {open ? "Show less" : "Read full testimonial"}
          <CaretDown
            size={14}
            weight="bold"
            aria-hidden
            className={cn("transition-transform duration-300", open && "rotate-180")}
          />
        </button>
      </div>
    </figure>
  );
}

export function TestimonialsSection() {
  const items = testimonials.filter((t) => t.approved);
  if (items.length === 0) return null;

  return (
    <section aria-labelledby="testimonials-title" className="py-24 md:py-32">
      <div className="container-page">
        <SectionHeading
          eyebrow="Client experiences"
          title={<span id="testimonials-title">Good Work Matters. So Does How It Feels to Work Together.</span>}
          body="Every project begins with listening. These experiences reflect the collaboration, care, and creative thinking we bring to the work."
        />
        <ul className="mt-14 grid items-start gap-5 lg:grid-cols-12">
          {items.map((t, i) => (
            <Reveal
              as="li"
              key={t.name}
              inView
              variant={i === 0 ? "slide-left" : "slide-right"}
              delay={i * reveal.stagger}
              duration={0.75}
              className={cn(i === 0 ? "lg:col-span-7" : "lg:col-span-5 lg:mt-16")}
            >
              <TestimonialCard t={t} featured={i === 0} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
