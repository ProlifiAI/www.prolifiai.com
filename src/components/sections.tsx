import type { ReactNode } from "react";

import { ctas } from "@/content/site";
import { processSteps } from "@/content/services";
import type { Faq } from "@/content/company";
import { cn } from "@/lib/utils";
import { ButtonLink, TextLink } from "@/components/button";
import { SectionHeading } from "@/components/section-heading";
import { FaqList } from "@/components/faq";
import { Reveal } from "@/components/ui/blur-fade";
import { DotPattern } from "@/components/ui/dot-pattern";
import { GlassGradientBackground } from "@/components/motion/glass-gradient";
import { BrandVideoBackground, type PageVideo } from "@/components/motion/brand-video-background";
import { Parallax } from "@/components/motion/parallax";
import { DrawLine } from "@/components/motion/draw-line";

/* ------------------------------------------------------------------
   Page hero for inner pages: the page's own video under a navy gradient,
   on a parallax background layer, content revealed eyebrow > heading > intro > actions.
   Top padding clears the floating header, which overlaps the hero.
------------------------------------------------------------------- */
export function PageHero({
  eyebrow,
  title,
  intro,
  video,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro: ReactNode;
  /** The page's own hero clip; without one, the CSS liquid-glass gradient */
  video?: PageVideo;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden text-on-inverse">
      <Parallax distance={70} className="absolute -inset-y-20 inset-x-0 -z-10">
        {video ? <BrandVideoBackground video={video} align="left" /> : <GlassGradientBackground className="z-0" />}
      </Parallax>
      <div className="container-page pb-20 pt-[calc(var(--header-h)+3.5rem)] md:pb-28 md:pt-[calc(var(--header-h)+5rem)]">
        <Reveal>
          <p className="glass-surface mb-7 inline-flex items-center gap-2 rounded-full px-4 py-2 text-label font-semibold uppercase text-accent">
            {eyebrow}
          </p>
        </Reveal>
        <Reveal variant="blur-up" delay={0.08}>
          <h1 className="max-w-4xl text-balance text-h1 font-semibold">{title}</h1>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="mt-6 max-w-[56ch] text-pretty text-lead text-on-inverse-muted">{intro}</p>
        </Reveal>
        {children && (
          <Reveal delay={0.28} className="mt-9 flex flex-wrap gap-3">
            {children}
          </Reveal>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   How Prolifi works: dark section; the connector draws itself, then
   each step rises in sequence.
------------------------------------------------------------------- */
export function ProcessSection({ title = "A clear process from first call to launch" }: { title?: string }) {
  return (
    <section className="relative isolate overflow-hidden bg-inverse py-24 text-on-inverse md:py-32">
      <div aria-hidden className="bg-grid-inverse absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      <div className="container-page">
        <SectionHeading
          tone="inverse"
          title={title}
          body="No surprises. You know what is happening, what it costs and what comes next at every stage."
        />
        <ol className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
          <DrawLine className="absolute left-0 right-0 top-[1.15rem] hidden h-px bg-gradient-to-r from-accent via-white/25 to-white/5 md:block" />
          {processSteps.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              inView
              delay={0.25 + 0.1 * i}
              className="relative grid grid-cols-[2.5rem_1fr] gap-4 md:block"
            >
              <span
                aria-hidden
                className={cn(
                  "relative flex size-9 items-center justify-center rounded-full ring-1 ring-inset",
                  i === 0 ? "bg-accent text-on-accent ring-accent" : "bg-inverse text-on-inverse ring-white/25"
                )}
              >
                <span className="text-xs font-semibold">{i + 1}</span>
              </span>
              <div className="md:mt-7">
                <h3 className="text-h3 font-semibold">{step.title}</h3>
                <p className="mt-3 max-w-[32ch] text-pretty text-on-inverse-muted">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   FAQ: sticky intro on the left, accordion on the right.
------------------------------------------------------------------- */
export function FaqSection({ items, title = "Questions, answered" }: { items: Faq[]; title?: string }) {
  return (
    <section className="py-24 md:py-32">
      <div className="container-page grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading title={title} />
            <Reveal inView delay={0.15}>
              <p className="mt-5 max-w-sm text-pretty text-ink-muted">
                Cannot find what you are looking for? Tell us about your project and we will get back to you.
              </p>
              <div className="mt-8">
                <TextLink href={ctas.contact.href}>Ask us directly</TextLink>
              </div>
            </Reveal>
          </div>
        </div>
        <Reveal inView variant="slide-right" delay={0.1} className="lg:col-span-7 lg:col-start-6">
          <FaqList items={items} />
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   Final call to action. Yellow band, carried over and refined.
------------------------------------------------------------------- */
export function CtaBand({
  title = "Ready to grow your business?",
  body = "Let's build something great together. No pressure, just a conversation.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="px-3 pb-3 md:px-4 md:pb-4">
      <div className="relative isolate overflow-hidden rounded-panel bg-accent text-on-accent">
        <DotPattern
          width={18}
          height={18}
          cr={1.1}
          className="-z-10 text-inverse/[0.12] [mask-image:radial-gradient(ellipse_55%_80%_at_100%_50%,black,transparent)]"
        />
        <div className="container-page flex flex-col items-start gap-8 py-16 md:flex-row md:items-end md:justify-between md:py-20">
          <div>
            <Reveal inView variant="blur-up">
              <h2 className="max-w-2xl text-balance text-h2 font-semibold text-heading">{title}</h2>
            </Reveal>
            <Reveal inView delay={0.1}>
              <p className="mt-4 max-w-xl text-pretty text-lead text-heading/75">{body}</p>
            </Reveal>
          </div>
          <Reveal inView variant="slide-right" delay={0.2}>
            <ButtonLink href={ctas.contact.href}>{ctas.contact.label}</ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
