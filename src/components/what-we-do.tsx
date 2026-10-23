"use client";

import Link from "next/link";
import { useRef, useState, type RefObject } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ArrowRight, Check } from "@phosphor-icons/react";

import { availableServices, pillars, type Pillar, type PillarId } from "@/content/services";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/blur-fade";
import { BuildArt, LaunchArt, ScaleArt } from "@/components/stage-art";
import { useStill } from "@/components/motion/use-still";
import { AnimatedBackgroundVideo } from "@/components/motion/background-video";
import { Chars, DropScope, countChars } from "@/components/motion/drop-text";

/**
 * "What We Do": BUILD > LAUNCH > SCALE as a full-scale, scroll-driven stack.
 *
 *   intro    giant editorial type with an inline liquid-glass chip
 *   bar      sticky stage bar: clickable BUILD / LAUNCH / SCALE + progress
 *   canvas   three full-width sticky canvases, one per stage, each with its
 *            own original artwork. Every new canvas rises and tilts upright
 *            over the previous one, which settles back and dims; the artwork
 *            layers and stage copy settle in as their canvas arrives.
 *   release  the stack ends with the section and the page scrolls on.
 *
 * Plain position: sticky plus Motion's useScroll: no scroll hijacking, works
 * with keyboard, touch and screen readers. Reduced motion keeps the sticky
 * stack but removes every transform.
 */

const tone: Record<PillarId, { card: string; text: string; muted: string; label: string; chip: string; link: string }> = {
  build: {
    card: "bg-inverse text-on-inverse",
    text: "text-on-inverse",
    muted: "text-on-inverse-muted",
    label: "text-accent",
    chip: "text-on-inverse/90",
    link: "text-on-inverse decoration-white/30 hover:decoration-accent",
  },
  launch: {
    card: "bg-accent text-on-accent",
    text: "text-heading",
    muted: "text-heading/75",
    label: "text-heading",
    chip: "text-heading",
    link: "text-heading decoration-heading/30 hover:decoration-heading",
  },
  scale: {
    card: "bg-surface text-heading ring-1 ring-line",
    text: "text-heading",
    muted: "text-ink-muted",
    label: "text-accent-strong",
    chip: "text-heading",
    link: "text-heading decoration-line-strong hover:decoration-heading",
  },
};

const art = { build: BuildArt, launch: LaunchArt, scale: ScaleArt };

/** Bar height + gap; canvases stick just below the header and the stage bar */
const BAR_H = 64;
const STICK_TOP = `calc(var(--header-h) + ${BAR_H}px)`;

function useStageEnter(marker: RefObject<HTMLDivElement | null>) {
  // 0 when the canvas's top meets the bottom of the viewport, 1 when it has
  // reached its sticky position. Measured on an in-flow marker, not on the
  // sticky element itself, so the numbers stay stable while it is pinned.
  const { scrollYProgress } = useScroll({
    target: marker,
    offset: ["start end", `start ${84 + BAR_H}px`],
  });
  return scrollYProgress;
}

function StageCanvas({
  pillar,
  index,
  enter,
  next,
  still,
  markerRef,
}: {
  pillar: Pillar;
  index: number;
  enter: MotionValue<number>;
  next: MotionValue<number> | null;
  still: boolean;
  markerRef: RefObject<HTMLDivElement | null>;
}) {
  const t = tone[pillar.id];
  const Art = art[pillar.id];
  const services = availableServices(pillar);

  // Incoming: rise and tilt upright. The first canvas arrives flat.
  const rotateX = useTransform(enter, [0, 1], still || index === 0 ? [0, 0] : [16, 0]);
  // Outgoing: settle back and dim as the next canvas covers it
  const zero = useTransform(enter, () => 0);
  const covered = next ?? zero;
  const scale = useTransform(covered, [0, 1], still ? [1, 1] : [1, 0.93]);
  const dim = useTransform(covered, [0, 1], [0, still ? 0 : 0.45]);
  // Copy settles in slightly after the canvas
  const copyY = useTransform(enter, [0.35, 1], still ? [0, 0] : [36, 0]);
  const copyOpacity = useTransform(enter, [0.35, 0.9], still ? [1, 1] : [0, 1]);
  // Reduced motion: artwork is shown fully settled from the start
  const one = useTransform(enter, () => 1);
  const settle = still ? one : enter;

  return (
    <>
      <div ref={markerRef} aria-hidden className="h-0" />
      <div
        className="sticky pb-4"
        style={{ top: STICK_TOP, perspective: 1600, height: `calc(100dvh - var(--header-h) - ${BAR_H}px)` }}
      >
        <motion.article
          id={`stage-${pillar.id}`}
          tabIndex={-1}
          aria-labelledby={`stage-${pillar.id}-title`}
          style={{ rotateX, scale, transformOrigin: "50% 100%" }}
          className={cn(
            "relative h-full overflow-hidden rounded-[2rem] outline-none shadow-[0_-30px_60px_-40px_rgb(14_48_98/0.45)]",
            t.card
          )}
        >
          {pillar.id === "build" && (
            <div aria-hidden className="bg-grid-inverse absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_80%_80%_at_70%_40%,black,transparent)]" />
          )}
          {pillar.id === "scale" && (
            <div
              aria-hidden
              className="absolute inset-0 opacity-60 [background-image:radial-gradient(rgb(14_48_98/0.14)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_70%_80%_at_70%_50%,black,transparent)]"
            />
          )}

          <div className="relative grid h-full grid-rows-[auto_1fr] gap-4 p-6 md:p-10 lg:grid-cols-12 lg:grid-rows-1 lg:items-center lg:gap-8 lg:p-14">
            {/* Stage copy */}
            <motion.div style={{ y: copyY, opacity: copyOpacity }} className="lg:col-span-4">
              <p className={cn("text-xs font-semibold uppercase tracking-[0.16em] md:text-label", t.label)}>{pillar.focus}</p>
              <h3
                id={`stage-${pillar.id}-title`}
                className={cn("mt-3 text-[clamp(2.8rem,7vw,6.4rem)] font-semibold uppercase leading-[0.85] tracking-[-0.05em]", t.text)}
              >
                {pillar.name}
              </h3>
              <p className={cn("mt-4 max-w-[24ch] text-balance text-lg font-medium leading-snug md:text-[1.35rem]", t.text)}>
                {pillar.message}
              </p>
              <ul className="mt-6 hidden space-y-2 md:block">
                {services.map((s) => (
                  <li key={s.slug} className={cn("flex items-center gap-2.5 text-[0.95rem]", t.chip)}>
                    <Check size={14} weight="bold" aria-hidden className={t.label} />
                    {s.name}
                  </li>
                ))}
              </ul>
              <Link
                href={`/services#${pillar.id}`}
                className={cn("group mt-6 inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-[6px] md:mt-8", t.link)}
              >
                Explore {pillar.name}
                <ArrowRight size={14} weight="bold" aria-hidden className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </motion.div>

            {/* Stage artwork */}
            {/* On phones the artwork bleeds into the card padding so it reads larger */}
            <div className="-mx-3 flex min-h-0 items-center justify-center sm:mx-0 lg:col-span-8">
              <div className="w-full max-w-[min(100%,calc((100dvh-var(--header-h)-12rem)*4/3))]">
                <Art enter={settle} />
              </div>
            </div>
          </div>

          {/* Dims as the next canvas covers it */}
          <motion.div aria-hidden style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-inverse-deep" />
        </motion.article>
      </div>
    </>
  );
}

export function WhatWeDo() {
  const still = useStill();
  const stack = useRef<HTMLDivElement>(null);
  const m0 = useRef<HTMLDivElement>(null);
  const m1 = useRef<HTMLDivElement>(null);
  const m2 = useRef<HTMLDivElement>(null);
  const markers = [m0, m1, m2];
  const e0 = useStageEnter(m0);
  const e1 = useStageEnter(m1);
  const e2 = useStageEnter(m2);
  const enters = [e0, e1, e2];

  const { scrollYProgress: overall } = useScroll({ target: stack, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);

  // Active stage = the latest canvas that has risen at least halfway
  const update = () => {
    const next = e2.get() > 0.5 ? 2 : e1.get() > 0.5 ? 1 : 0;
    setActive((a) => (a === next ? a : next));
  };
  useMotionValueEvent(e1, "change", update);
  useMotionValueEvent(e2, "change", update);

  const goTo = (i: number) => {
    const marker = markers[i].current;
    const stackEl = stack.current;
    if (!marker || !stackEl) return;
    // Scroll so that canvas i sits exactly in its pinned position. Uses the
    // bar's stuck position (header + bar), not its current one: before the bar
    // sticks it sits lower, which would under-scroll.
    const headerH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 84;
    const stickTop = headerH + BAR_H;
    const top = marker.getBoundingClientRect().top + window.scrollY - stickTop;
    window.scrollTo({ top: i === 0 ? stackEl.getBoundingClientRect().top + window.scrollY - 1 : top, behavior: still ? "auto" : "smooth" });
    document.getElementById(`stage-${pillars[i].id}`)?.focus({ preventScroll: true });
  };

  return (
    <section aria-labelledby="what-we-do-title" className="relative bg-canvas pb-24 pt-24 md:pb-32 md:pt-32">
      {/* Intro: editorial type */}
      <div className="container-page">
        <Reveal inView>
          <p className="inline-flex rounded-full bg-accent/15 px-3 py-1.5 text-label font-semibold uppercase text-accent-strong">What we do</p>
        </Reveal>
        {/* Signature character drop, one wave across the three lines */}
        <DropScope
          as="h2"
          id="what-we-do-title"
          delay={0.05}
          label="Build, Launch, Scale."
          chars={countChars("Build,", "Launch,", "Scale.")}
          className="mt-6 block text-[clamp(3.4rem,11vw,10.5rem)] font-semibold uppercase leading-[0.86] tracking-[-0.055em] text-heading"
        >
            <span className="block">
              <Chars text="Build," />
            </span>
            <span className="flex items-center gap-[0.18em]">
              {/* The supplied Build/Launch/Grow capsule clip, cropped to its gold-rimmed pill
                  (2.22:1), so the pill itself is the chip; its own gold rim replaces the ring */}
              <span
                aria-hidden
                className="relative inline-block aspect-[2.22] h-[0.72em] shrink-0 overflow-hidden rounded-full bg-inverse"
              >
                <AnimatedBackgroundVideo
                  src="/video/build-launch-scale-chip.mp4"
                  poster="/video/build-launch-scale-chip-poster.jpg"
                  lazy
                />
              </span>
              <Chars text="Launch," from={countChars("Build,")} />
            </span>
            <span className="block text-right">
              <Chars text="Scale" from={countChars("Build,", "Launch,")} />
              <span className="text-accent">
                <Chars text="." from={countChars("Build,", "Launch,", "Scale")} />
              </span>
            </span>
        </DropScope>
        <Reveal inView delay={0.16}>
          <p className="mt-8 max-w-[52ch] text-pretty text-lead text-ink-muted">
            Three stages, one partner. Get a website that wins customers, get found by the people looking for you,
            then validate, build and automate what comes next. Scroll through each stage.
          </p>
        </Reveal>
      </div>

      {/* Sticky stack */}
      <div ref={stack} className="container-page mt-16 md:mt-24">
        <div
          data-stage-bar
          className="sticky z-20 flex items-center justify-between gap-4 bg-canvas/90 backdrop-blur supports-[not(backdrop-filter:blur(0))]:bg-canvas"
          style={{ top: "var(--header-h)", height: BAR_H }}
        >
          <nav aria-label="Service stages" className="flex items-center gap-1 sm:gap-2">
            {pillars.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => goTo(i)}
                aria-current={i === active ? "step" : undefined}
                className={cn(
                  "relative flex min-h-11 items-center gap-2 rounded-full px-3 text-xs font-semibold uppercase tracking-[0.14em] transition-colors duration-300 sm:px-4 sm:text-sm",
                  i === active ? "text-heading" : "text-ink-muted hover:text-heading"
                )}
              >
                {i === active && (
                  <motion.span
                    layoutId="stage-pill"
                    aria-hidden
                    className="absolute inset-0 -z-10 rounded-full bg-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 34 }}
                  />
                )}
                {p.name}
              </button>
            ))}
          </nav>
          <div aria-hidden className="hidden h-1 w-40 overflow-hidden rounded-full bg-line sm:block md:w-64">
            <motion.div style={{ scaleX: overall, originX: 0 }} className="h-full rounded-full bg-heading" />
          </div>
        </div>

        {pillars.map((p, i) => (
          <StageCanvas
            key={p.id}
            pillar={p}
            index={i}
            enter={enters[i]}
            next={enters[i + 1] ?? null}
            still={still}
            markerRef={markers[i]}
          />
        ))}
        {/* Lets the final stage hold for a moment before the section releases */}
        <div aria-hidden className="h-[30vh]" />
      </div>
    </section>
  );
}
