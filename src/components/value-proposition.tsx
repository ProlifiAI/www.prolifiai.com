import { Sparkle, UserFocus } from "@phosphor-icons/react/dist/ssr";

import { ctas } from "@/content/site";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/button";
import { Reveal } from "@/components/ui/blur-fade";
import { GlassGradientBackground } from "@/components/motion/glass-gradient";
import { AnimatedBackgroundVideo } from "@/components/motion/background-video";
import { DrawLine } from "@/components/motion/draw-line";
import { reveal } from "@/lib/motion";

const pillars = [
  {
    n: "01",
    title: "AI-Accelerated, Human-Led",
    body: "We use AI to accelerate research, exploration, and production where it adds value. Human expertise guides strategy, creative direction, usability, messaging, and final quality.",
  },
  {
    n: "02",
    title: "Designed to Stand Apart",
    body: "Your business deserves more than a generic template. We create thoughtful, bespoke digital experiences shaped around your brand, audience, and objectives.",
  },
  {
    n: "03",
    title: "Built for Real Business Goals",
    body: "We consider usability, clear messaging, accessibility, responsiveness, and purposeful calls to action throughout the experience.",
  },
];

const aiRole = ["Research", "Exploration", "Production"];
const humanRole = ["Strategy", "Visual direction", "Usability", "Messaging", "Quality"];

/** The two halves of the process meeting in the middle: what AI speeds up, what people decide. */
function Collaboration() {
  return (
    // Stacked on phones (AI > Prolifi > People), side by side from tablet up
    <div className="relative grid grid-cols-1 items-center gap-4 sm:grid-cols-[1fr_auto_1fr] sm:gap-5">
      <Reveal inView variant="slide-left" className="glass-surface rounded-[1.4rem] p-5 sm:p-6">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-on-inverse-muted">
          <Sparkle size={16} weight="fill" aria-hidden className="text-on-inverse/70" />
          AI speeds up
        </p>
        <ul className="mt-4 space-y-2 text-sm text-on-inverse/85 sm:text-base">
          {aiRole.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </Reveal>

      <Reveal inView variant="fade-in" delay={0.25} className="relative flex flex-col items-center">
        {/* Connector: vertical on phones, horizontal from tablet up */}
        <span aria-hidden className="absolute left-1/2 h-[calc(100%+2rem)] w-px -translate-x-1/2 bg-gradient-to-b from-white/10 via-accent to-white/10 sm:hidden" />
        <span aria-hidden className="absolute top-1/2 hidden h-px w-[calc(100%+3.5rem)] -translate-y-1/2 bg-gradient-to-r from-white/10 via-accent to-white/10 sm:block" />
        <span className="relative flex size-16 items-center justify-center rounded-full bg-accent text-center text-[0.7rem] font-bold uppercase leading-tight tracking-[0.08em] text-on-accent shadow-[0_0_0_8px_rgb(244_196_48/0.12)] sm:size-20 sm:text-xs">
          Prolifi
        </span>
      </Reveal>

      <Reveal inView variant="slide-right" delay={0.1} className="rounded-[1.4rem] bg-surface p-5 text-heading shadow-lift sm:p-6">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-accent-strong">
          <UserFocus size={16} weight="fill" aria-hidden />
          People decide
        </p>
        <ul className="mt-4 space-y-2 text-sm font-medium sm:text-base">
          {humanRole.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}

/**
 * The supplied "AI and Human Integration" clip: AI-built blocks feeding a
 * human-shaped golden form. Framed like the site's other media (inset bezel,
 * rounded corners), 16:9 so the composition is never cropped, lazy-loaded
 * because the section sits well below the fold. Decorative: the copy beside
 * it carries the meaning.
 */
function IntegrationVideo() {
  return (
    <div className="rounded-[1.6rem] bg-white/[0.06] p-1.5 ring-1 ring-white/10">
      <div className="relative aspect-video overflow-hidden rounded-[calc(1.6rem-0.375rem)] bg-inverse-deep">
        <AnimatedBackgroundVideo src="/video/ai-human.mp4" poster="/video/ai-human-poster.jpg" lazy />
      </div>
    </div>
  );
}

/**
 * "The Prolifi Difference": why Prolifi is not a prompt-to-website service.
 * A dark navy panel inset on the light page, so it reads as its own chapter
 * even next to the dark process section.
 */
export function ValueProposition() {
  return (
    <section aria-labelledby="difference-title" className="px-3 py-3 md:px-4 md:py-4">
      <div className="relative isolate overflow-hidden rounded-[2rem] text-on-inverse">
        <GlassGradientBackground grid={false} flow />
        <div className="container-page py-20 md:py-28">
          <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-6">
              <Reveal inView>
                <p className="glass-surface inline-flex rounded-full px-4 py-2 text-label font-semibold uppercase text-accent">
                  The Prolifi Difference
                </p>
              </Reveal>
              <Reveal inView variant="blur-up" delay={0.08}>
                <h2 id="difference-title" className="mt-7 text-balance text-h2 font-semibold">
                  AI Gives Us Speed. <span className="text-accent">Human Expertise Gives It Purpose.</span>
                </h2>
              </Reveal>
              <Reveal inView delay={0.18}>
                <p className="mt-7 text-pretty text-lead font-medium text-on-inverse">
                  The internet doesn&apos;t need more generic websites. It needs better digital experiences.
                </p>
                <p className="mt-4 max-w-[58ch] text-pretty text-on-inverse-muted">
                  We combine AI-assisted workflows with human creativity, strategic thinking, and meticulous design
                  execution to create digital experiences that are distinctive, useful, and built around real business
                  goals.
                </p>
              </Reveal>
            </div>
            <Reveal inView variant="slide-right" delay={0.12} duration={0.8} className="lg:col-span-6">
              <IntegrationVideo />
            </Reveal>
          </div>

          {/* What AI speeds up and what people decide, meeting at Prolifi */}
          <div className="mx-auto mt-14 max-w-4xl md:mt-16">
            <Collaboration />
          </div>

          <ol className="relative mt-20 grid gap-10 md:grid-cols-3 md:gap-8">
            <DrawLine className="absolute inset-x-0 top-0 hidden h-px bg-gradient-to-r from-accent via-white/20 to-white/5 md:block" />
            {pillars.map((p, i) => (
              <Reveal as="li" key={p.n} inView delay={0.15 + i * reveal.stagger} className="md:pt-8">
                <p aria-hidden className="text-sm font-semibold tabular-nums text-accent">
                  {p.n}
                </p>
                <h3 className="mt-3 text-h3 font-semibold">{p.title}</h3>
                <p className="mt-3 text-pretty text-on-inverse-muted">{p.body}</p>
              </Reveal>
            ))}
          </ol>

          <Reveal
            inView
            delay={0.1}
            className={cn(
              "mt-16 flex flex-col items-start gap-6 border-t border-line-inverse pt-10",
              "md:flex-row md:items-center md:justify-between"
            )}
          >
            <p className="text-balance text-h3 font-semibold">
              Less generic output. <span className="text-on-inverse/70">More intentional digital experiences.</span>
            </p>
            <ButtonLink href={ctas.contact.href} variant="accent">
              Let&apos;s Work Together
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
