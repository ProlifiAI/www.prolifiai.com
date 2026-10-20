"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { motion, useTransform, type MotionValue } from "motion/react";

import { cn } from "@/lib/utils";

/**
 * Original stage artwork for BUILD / LAUNCH / SCALE, drawn in code so it
 * stays sharp at any size. Each composition lives in a 4:3 container and is
 * sized in container-query units (cqw), so it scales as one piece from phone
 * to desktop. Layers settle into place at different speeds as their stage
 * arrives (`enter`: 0 -> 1), which gives the canvas depth while scrolling.
 *
 * These are illustrative compositions of the kind of work each stage covers.
 * They contain no client data, figures or claims.
 */

function Layer({
  enter,
  dist,
  className,
  children,
}: {
  enter: MotionValue<number>;
  /** How far (px) the layer travels as the stage arrives; larger = closer to the viewer */
  dist: number;
  className?: string;
  children: ReactNode;
}) {
  const y = useTransform(enter, [0, 1], [dist, 0]);
  const opacity = useTransform(enter, [0, 0.55], [0, 1]);
  return (
    <motion.div style={{ y, opacity }} className={cn("absolute will-change-transform", className)}>
      {children}
    </motion.div>
  );
}

const Bar = ({ className }: { className?: string }) => <span className={cn("block rounded-full", className)} />;

/* ------------------------------------------------------------------ */
/* BUILD: a website blueprint coming together                          */
/* ------------------------------------------------------------------ */
export function BuildArt({ enter }: { enter: MotionValue<number> }) {
  return (
    <div aria-hidden className="@container relative aspect-[4/3] w-full">
      {/* Dimension marker */}
      <Layer enter={enter} dist={30} className="left-[4%] top-[1%] w-[64%]">
        <div className="flex items-center gap-[1cqw] text-[1.35cqw] font-medium uppercase tracking-[0.14em] text-on-inverse/55">
          <span className="h-[1.4cqw] w-px bg-accent" />
          <span className="h-px flex-1 bg-white/25" />
          <span className="whitespace-nowrap">1440 px · 12-column grid</span>
          <span className="h-px flex-1 bg-white/25" />
          <span className="h-[1.4cqw] w-px bg-accent" />
        </div>
      </Layer>

      {/* The page being built */}
      <Layer enter={enter} dist={50} className="left-[4%] top-[7%] h-[80%] w-[64%]">
        <div className="relative h-full overflow-hidden rounded-[1.8cqw] bg-white/[0.06] p-[2.6cqw] ring-1 ring-white/20">
          {/* corner registration marks */}
          {["left-[1cqw] top-[1cqw] border-l border-t", "right-[1cqw] top-[1cqw] border-r border-t", "left-[1cqw] bottom-[1cqw] border-l border-b", "right-[1cqw] bottom-[1cqw] border-r border-b"].map((c) => (
            <span key={c} className={cn("absolute size-[2cqw] border-accent", c)} />
          ))}
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-[0.8cqw]">
              <span className="size-[1.8cqw] rounded-full bg-accent" />
              <Bar className="h-[0.9cqw] w-[7cqw] bg-white/70" />
            </span>
            <span className="flex gap-[1.4cqw]">
              <Bar className="h-[0.7cqw] w-[4cqw] bg-white/30" />
              <Bar className="h-[0.7cqw] w-[4cqw] bg-white/30" />
              <Bar className="h-[0.7cqw] w-[4cqw] bg-white/30" />
            </span>
          </div>
          <div className="mt-[4cqw] space-y-[1.2cqw]">
            <Bar className="h-[3.2cqw] w-[78%] bg-white/90" />
            <Bar className="h-[3.2cqw] w-[58%] bg-white/90" />
            <Bar className="h-[3.2cqw] w-[38%] bg-accent" />
          </div>
          <div className="mt-[2.4cqw] space-y-[0.9cqw]">
            <Bar className="h-[0.8cqw] w-[64%] bg-white/30" />
            <Bar className="h-[0.8cqw] w-[52%] bg-white/30" />
          </div>
          <div className="mt-[2.6cqw] flex gap-[1.2cqw]">
            <span className="h-[3.6cqw] w-[13cqw] rounded-full bg-accent" />
            <span className="h-[3.6cqw] w-[11cqw] rounded-full ring-1 ring-white/40" />
          </div>
          <div className="absolute inset-x-[2.6cqw] bottom-[2.6cqw] h-[34%] overflow-hidden rounded-[1.2cqw]">
            <Image src="/images/work/website-design-on-laptop.png" alt="" fill sizes="(min-width: 1024px) 480px, 60vw" loading="eager" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-inverse/60 to-transparent" />
          </div>
        </div>
      </Layer>

      {/* Type specimen */}
      <Layer enter={enter} dist={95} className="right-[2%] top-[12%] w-[34%]">
        <div className="rounded-[1.8cqw] bg-surface p-[2.6cqw] shadow-[0_3cqw_6cqw_-2cqw_rgb(3_12_30/0.55)]">
          <p className="text-[11cqw] font-semibold leading-[0.85] tracking-[-0.05em] text-heading">Aa</p>
          <p className="mt-[1.6cqw] text-[1.35cqw] font-semibold uppercase tracking-[0.14em] text-accent-strong">Type system</p>
          <div className="mt-[1.6cqw] space-y-[1cqw] border-t border-line pt-[1.6cqw]">
            {[
              ["Display", "w-[80%]", "h-[1.6cqw]"],
              ["Heading", "w-[64%]", "h-[1.2cqw]"],
              ["Body", "w-[90%]", "h-[0.7cqw]"],
            ].map(([label, w, h]) => (
              <div key={label} className="flex items-center gap-[1.2cqw]">
                <span className="w-[8cqw] text-[1.2cqw] text-ink-muted">{label}</span>
                <Bar className={cn("bg-heading/80", w, h)} />
              </div>
            ))}
          </div>
        </div>
      </Layer>

      {/* Brand colours */}
      <Layer enter={enter} dist={140} className="bottom-[4%] right-[4%]">
        <div className="flex gap-[1.6cqw] rounded-full bg-inverse-deep/80 p-[1.2cqw] ring-1 ring-white/15">
          {[
            ["bg-inverse ring-1 ring-white/40", "#0E3062"],
            ["bg-accent", "#F4C430"],
            ["bg-canvas", "#F7F8FA"],
          ].map(([c, hex]) => (
            <span key={hex} className="flex items-center gap-[0.8cqw] pr-[0.6cqw]">
              <span className={cn("size-[4.4cqw] rounded-full", c)} />
              <span className="text-[1.25cqw] font-medium text-on-inverse/75">{hex}</span>
            </span>
          ))}
        </div>
      </Layer>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* LAUNCH: a coordinated campaign board                                */
/* ------------------------------------------------------------------ */
export function LaunchArt({ enter }: { enter: MotionValue<number> }) {
  return (
    <div aria-hidden className="@container relative aspect-[4/3] w-full">
      {/* Post 1 */}
      <Layer enter={enter} dist={60} className="left-[3%] top-[12%] w-[30%]">
        <div className="aspect-square -rotate-6 rounded-[2cqw] bg-inverse p-[2.4cqw] text-on-inverse shadow-[0_3cqw_6cqw_-2cqw_rgb(14_48_98/0.55)]">
          <div className="flex h-full flex-col justify-between">
            <span className="flex items-center gap-[0.8cqw] text-[1.3cqw] font-semibold uppercase tracking-[0.14em] text-accent">
              <span className="size-[1.4cqw] rounded-full bg-accent" /> Your brand
            </span>
            <p className="text-[4.8cqw] font-semibold leading-[0.95] tracking-[-0.04em]">
              Now
              <br />
              open.
            </p>
          </div>
        </div>
      </Layer>

      {/* Post 2: photo */}
      <Layer enter={enter} dist={95} className="left-[24%] top-[4%] z-10 w-[32%]">
        <div className="relative aspect-square rotate-2 overflow-hidden rounded-[2cqw] shadow-[0_3cqw_7cqw_-2cqw_rgb(14_48_98/0.6)] ring-[0.6cqw] ring-surface">
          <Image src="/images/work/social-media-on-laptop-and-phone.png" alt="" fill sizes="(min-width: 1024px) 260px, 40vw" loading="eager" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-inverse via-inverse/20 to-transparent" />
          <div className="absolute inset-x-[2.2cqw] bottom-[2.2cqw] flex items-end justify-between">
            <p className="text-[3cqw] font-semibold leading-none tracking-[-0.03em] text-on-inverse">Launch week</p>
            <span className="rounded-full bg-accent px-[1.2cqw] py-[0.5cqw] text-[1.2cqw] font-semibold text-on-accent">Story</span>
          </div>
        </div>
      </Layer>

      {/* Post 3 */}
      <Layer enter={enter} dist={75} className="left-[48%] top-[16%] w-[27%]">
        <div className="aspect-square rotate-6 rounded-[2cqw] bg-surface p-[2.4cqw] shadow-[0_3cqw_6cqw_-2cqw_rgb(14_48_98/0.45)]">
          <div className="flex h-full flex-col justify-between">
            <span className="flex gap-[0.6cqw]">
              <span className="size-[1.2cqw] rounded-full bg-heading" />
              <span className="size-[1.2cqw] rounded-full bg-accent" />
              <span className="size-[1.2cqw] rounded-full bg-line-strong" />
            </span>
            <p className="text-[3.5cqw] font-semibold leading-[1] tracking-[-0.035em] text-heading">
              New look.
              <br />
              Same heart.
            </p>
          </div>
        </div>
      </Layer>

      {/* Story frame */}
      <Layer enter={enter} dist={130} className="right-[3%] top-[3%] w-[19%]">
        <div className="aspect-[9/16] rounded-[2.4cqw] bg-inverse p-[1.6cqw] text-on-inverse shadow-[0_3cqw_7cqw_-2cqw_rgb(14_48_98/0.6)] ring-[0.5cqw] ring-inverse-deep">
          <div className="flex gap-[0.6cqw]">
            <span className="h-[0.5cqw] flex-1 rounded-full bg-accent" />
            <span className="h-[0.5cqw] flex-1 rounded-full bg-white/30" />
            <span className="h-[0.5cqw] flex-1 rounded-full bg-white/30" />
          </div>
          <div className="flex h-[88%] flex-col justify-between pt-[3cqw]">
            <p className="text-[2.6cqw] font-semibold leading-[1] tracking-[-0.03em]">
              Coming
              <br />
              soon
            </p>
            <span className="mx-auto rounded-full bg-white/15 px-[1.4cqw] py-[0.6cqw] text-[1.1cqw] font-medium">Swipe up</span>
          </div>
        </div>
      </Layer>

      {/* Content calendar */}
      <Layer enter={enter} dist={45} className="bottom-[3%] left-[3%] w-[70%]">
        <div className="rounded-[2cqw] bg-surface p-[2.2cqw] shadow-[0_3cqw_6cqw_-2.5cqw_rgb(14_48_98/0.45)]">
          <div className="flex items-center justify-between">
            <p className="text-[1.7cqw] font-semibold text-heading">Launch plan</p>
            <span className="rounded-full bg-accent/25 px-[1.2cqw] py-[0.4cqw] text-[1.2cqw] font-semibold text-accent-strong">Week 1</span>
          </div>
          <div className="mt-[1.6cqw] grid grid-cols-7 gap-[1cqw]">
            {[
              ["M", ["bg-heading"]],
              ["T", []],
              ["W", ["bg-accent", "bg-heading"]],
              ["T", ["bg-heading"]],
              ["F", ["bg-accent"]],
              ["S", []],
              ["S", ["bg-heading"]],
            ].map(([d, dots], i) => (
              <div key={i} className="flex flex-col items-center gap-[0.8cqw] rounded-[1cqw] bg-canvas py-[1.2cqw]">
                <span className="text-[1.2cqw] font-semibold text-ink-muted">{d as string}</span>
                <span className="flex h-[1.4cqw] gap-[0.5cqw]">
                  {(dots as string[]).map((c, j) => (
                    <span key={j} className={cn("size-[1.4cqw] rounded-full", c)} />
                  ))}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Layer>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* SCALE: a product system working together                            */
/* ------------------------------------------------------------------ */
function Node({ label, className, highlight }: { label: string; className: string; highlight?: boolean }) {
  return (
    <span
      className={cn(
        "absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-[1cqw] px-[1.6cqw] py-[1cqw] text-[1.4cqw] font-semibold shadow-[0_1.4cqw_3cqw_-1.6cqw_rgb(14_48_98/0.5)]",
        highlight ? "bg-accent text-on-accent" : "bg-surface text-heading ring-1 ring-line",
        className
      )}
    >
      {label}
    </span>
  );
}

export function ScaleArt({ enter }: { enter: MotionValue<number> }) {
  return (
    <div aria-hidden className="@container relative aspect-[4/3] w-full">
      {/* Information architecture */}
      <Layer enter={enter} dist={40} className="inset-y-[4%] left-0 w-[64%]">
        <div className="relative h-full w-full">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            <g fill="none" stroke="rgb(14 48 98 / 0.28)" strokeWidth="0.35" vectorEffect="non-scaling-stroke">
              <path d="M44 12 C44 24, 14 22, 14 38" />
              <path d="M44 12 L44 38" />
              <path d="M44 12 C44 24, 76 22, 76 38" />
              <path d="M44 38 C44 52, 26 50, 26 66" />
              <path d="M44 38 C44 52, 62 50, 62 66" />
              <path d="M14 38 L14 58" strokeDasharray="1 1.4" />
              <path d="M76 38 L76 58" strokeDasharray="1 1.4" />
            </g>
          </svg>
          <Node label="Product" className="left-[44%] top-[12%]" />
          <Node label="Onboarding" className="left-[14%] top-[38%]" />
          <Node label="Workspace" className="left-[44%] top-[38%]" highlight />
          <Node label="Settings" className="left-[76%] top-[38%]" />
          <Node label="Projects" className="left-[26%] top-[66%]" />
          <Node label="Insights" className="left-[62%] top-[66%]" />
          <span className="absolute left-[14%] top-[60%] size-[1.4cqw] -translate-x-1/2 rounded-full bg-heading/30" />
          <span className="absolute left-[76%] top-[60%] size-[1.4cqw] -translate-x-1/2 rounded-full bg-heading/30" />
        </div>
      </Layer>

      {/* App screen */}
      <Layer enter={enter} dist={120} className="right-[4%] top-[3%] w-[25%]">
        <div className="aspect-[9/19] rounded-[3.2cqw] bg-inverse p-[1.1cqw] shadow-[0_3cqw_7cqw_-2cqw_rgb(14_48_98/0.55)]">
          <div className="flex h-full flex-col gap-[1.2cqw] overflow-hidden rounded-[2.4cqw] bg-canvas p-[1.6cqw]">
            <div className="flex items-center justify-between">
              <Bar className="h-[0.9cqw] w-[7cqw] bg-heading" />
              <span className="size-[2.4cqw] rounded-full bg-accent" />
            </div>
            <div className="rounded-[1.4cqw] bg-inverse p-[1.4cqw]">
              <Bar className="h-[0.7cqw] w-[60%] bg-white/50" />
              <Bar className="mt-[1cqw] h-[1.6cqw] w-[80%] bg-white" />
              <div className="mt-[1.4cqw] flex items-end gap-[0.7cqw]">
                {["h-[2cqw]", "h-[3.4cqw]", "h-[2.6cqw]", "h-[4.4cqw]", "h-[3.6cqw]"].map((h, i) => (
                  <span key={i} className={cn("flex-1 rounded-full", h, i === 3 ? "bg-accent" : "bg-white/25")} />
                ))}
              </div>
            </div>
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center gap-[1cqw] rounded-[1.2cqw] bg-surface p-[1cqw] ring-1 ring-line">
                <span className={cn("size-[2.4cqw] rounded-[0.8cqw]", i === 0 ? "bg-accent" : "bg-canvas-deep")} />
                <span className="flex-1 space-y-[0.6cqw]">
                  <Bar className="h-[0.7cqw] w-[70%] bg-heading/70" />
                  <Bar className="h-[0.5cqw] w-[45%] bg-heading/25" />
                </span>
              </div>
            ))}
            <div className="mt-auto flex justify-around rounded-[1.2cqw] bg-surface py-[1.2cqw] ring-1 ring-line">
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className={cn("size-[1.4cqw] rounded-full", i === 1 ? "bg-heading" : "bg-heading/20")} />
              ))}
            </div>
          </div>
        </div>
      </Layer>

      {/* Component kit */}
      <Layer enter={enter} dist={80} className="bottom-[3%] left-[34%] w-[38%]">
        <div className="rounded-[2cqw] bg-surface p-[2.2cqw] shadow-[0_3cqw_6cqw_-2.5cqw_rgb(14_48_98/0.5)] ring-1 ring-line">
          <p className="text-[1.3cqw] font-semibold uppercase tracking-[0.14em] text-accent-strong">Design system</p>
          <div className="mt-[1.6cqw] flex flex-wrap items-center gap-[1cqw]">
            <span className="rounded-full bg-inverse px-[1.8cqw] py-[0.9cqw] text-[1.3cqw] font-semibold text-on-inverse">Primary</span>
            <span className="rounded-full px-[1.8cqw] py-[0.9cqw] text-[1.3cqw] font-semibold text-heading ring-1 ring-line-strong">Secondary</span>
            <span className="rounded-full bg-accent px-[1.8cqw] py-[0.9cqw] text-[1.3cqw] font-semibold text-on-accent">Accent</span>
          </div>
          <div className="mt-[1.6cqw] flex items-center gap-[1.4cqw]">
            <span className="flex h-[3.6cqw] flex-1 items-center rounded-[1cqw] bg-canvas px-[1.4cqw] ring-1 ring-line">
              <span className="h-[2cqw] w-px bg-heading" />
            </span>
            <span className="relative h-[2.8cqw] w-[5.2cqw] rounded-full bg-inverse">
              <span className="absolute right-[0.4cqw] top-1/2 size-[2cqw] -translate-y-1/2 rounded-full bg-accent" />
            </span>
          </div>
        </div>
      </Layer>
    </div>
  );
}
