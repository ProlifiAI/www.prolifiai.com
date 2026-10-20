"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { motion } from "motion/react";
import { Star } from "@phosphor-icons/react";

import { impactMetrics } from "@/content/company";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/blur-fade";
import { useParallaxY } from "@/components/motion/parallax";

/**
 * Floating achievement cards around the home hero visual, after the
 * approved hero reference (wide card upper right, compact cards lower left
 * and lower right). Only verified figures from `impactMetrics` are used;
 * the third card illustrates the Build > Launch > Scale framework and is
 * labelled as such, so it never reads as analytics data.
 *
 * Each card layers four independent motions, all transform/opacity only:
 *   entrance (Reveal) > scroll parallax (own speed) > idle float (own
 *   period and distance, CSS) > hover lift (pointer devices only).
 * Reduced motion: no float, no parallax, opacity-only entrance.
 *
 * Desktop/tablet: absolutely positioned around the image frame.
 * Phones: a tidy two-column arrangement under the image.
 */
function metric(id: string) {
  const m = impactMetrics.find((x) => x.id === id);
  return m && m.kind === "number" && m.verified ? m : undefined;
}

function FloatingCard({
  children,
  className,
  delay,
  speed,
  float,
}: {
  children: ReactNode;
  className?: string;
  delay: number;
  /** Scroll parallax distance in px (negative = moves up faster than the page) */
  speed: number;
  float: { duration: string; distance: string };
}) {
  const ref = useRef<HTMLDivElement>(null);
  const y = useParallaxY(ref, speed);
  return (
    <Reveal delay={delay} duration={0.8} className={cn("pointer-events-auto", className)}>
      <motion.div ref={ref} style={{ y }}>
        <div
          className="animate-float"
          style={{ "--float-duration": float.duration, "--float-distance": float.distance } as CSSProperties}
        >
          <div className="rounded-[1.1rem] bg-surface p-4 shadow-[0_1px_2px_rgb(14_48_98/0.06),0_24px_48px_-24px_rgb(14_48_98/0.45)] ring-1 ring-inverse/[0.07] transition-[transform,box-shadow] duration-500 ease-[var(--ease-reveal)] hover:-translate-y-1 hover:shadow-[0_1px_2px_rgb(14_48_98/0.06),0_32px_60px_-24px_rgb(14_48_98/0.5)] sm:p-5">
            {children}
          </div>
        </div>
      </motion.div>
    </Reveal>
  );
}

export function HeroAchievementCards() {
  const websites = metric("websites");
  const rating = metric("rating");

  return (
    <div
      className={cn(
        // Phones: grid under the image
        "mt-6 grid grid-cols-2 gap-3",
        // Tablet and up: overlay around the image frame
        "md:pointer-events-none md:absolute md:inset-0 md:mt-0 md:block"
      )}
    >
      {/* 1. Wide primary card, upper right */}
      <FloatingCard
        delay={0.35}
        speed={-46}
        float={{ duration: "6.5s", distance: "-9px" }}
        className="col-span-2 md:absolute md:-right-6 md:top-10 md:w-[16rem] lg:-right-20 lg:w-[18rem]"
      >
        {websites ? (
          <>
            <p className="text-[0.95rem] font-semibold tracking-[-0.01em] text-heading">{websites.label}</p>
            <p className="mt-1 text-sm text-ink-muted">Websites, landing pages and redesigns</p>
            <p className="mt-4 text-[2rem] font-semibold leading-none tracking-[-0.04em] text-heading sm:text-[2.4rem]">
              {websites.value}
              <span className="text-accent-strong">{websites.suffix}</span>
            </p>
          </>
        ) : (
          <>
            <p className="text-[0.95rem] font-semibold text-heading">Design + technology</p>
            <p className="mt-1 text-sm text-ink-muted">Strategy, design and build in one team</p>
            <p className="mt-4 text-xl font-semibold text-heading">Built around your business</p>
          </>
        )}
      </FloatingCard>

      {/* 2. Compact card, lower left */}
      <FloatingCard
        delay={0.5}
        speed={-24}
        float={{ duration: "8s", distance: "-7px" }}
        className="md:absolute md:-left-6 md:bottom-16 md:w-[11rem] lg:-left-20 lg:w-[12rem]"
      >
        <span className="flex size-9 items-center justify-center rounded-full bg-inverse text-accent">
          <Star size={17} weight="fill" aria-hidden />
        </span>
        {rating ? (
          <>
            <p className="mt-4 text-[1.9rem] font-semibold leading-none tracking-[-0.04em] text-heading">
              {rating.value.toFixed(rating.decimals ?? 0)}
              <span className="text-lg text-ink-muted">{rating.suffix}</span>
            </p>
            <p className="mt-2 text-sm text-ink-muted">{rating.label}</p>
          </>
        ) : (
          <>
            <p className="mt-4 text-lg font-semibold leading-tight text-heading">B2B · SaaS · B2C</p>
            <p className="mt-1 text-sm text-ink-muted">Business models served</p>
          </>
        )}
      </FloatingCard>

      {/* 3. Framework card with a mini bar graphic, lower right */}
      <FloatingCard
        delay={0.65}
        speed={-34}
        float={{ duration: "9.5s", distance: "-10px" }}
        className="md:absolute md:-bottom-14 md:right-8 md:w-[14rem] lg:-right-10 lg:w-[15rem]"
      >
        <p className="text-[0.95rem] font-semibold text-heading">Our framework</p>
        <p className="mt-1 flex items-center gap-2 text-sm text-ink-muted">
          Three stages
          <span className="hidden whitespace-nowrap rounded-full bg-accent/20 px-2 py-0.5 text-[0.7rem] font-semibold text-accent-strong sm:inline">
            One partner
          </span>
        </p>
        <div
          role="img"
          aria-label="Illustration of the Build, Launch and Scale stages, each building on the last"
          className="mt-4 grid grid-cols-3 items-end gap-2"
        >
          {[
            { label: "Build", h: "h-8" },
            { label: "Launch", h: "h-12" },
            { label: "Scale", h: "h-16" },
          ].map((b, i) => (
            <div key={b.label} className="flex flex-col items-center gap-1.5">
              <span
                className={cn(
                  "w-6 rounded-full",
                  b.h,
                  i === 2 ? "bg-inverse" : "bg-canvas-deep ring-1 ring-inset ring-line"
                )}
              />
              <span aria-hidden className="text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-ink-muted">
                {b.label}
              </span>
            </div>
          ))}
        </div>
      </FloatingCard>
    </div>
  );
}
