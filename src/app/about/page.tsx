import type { Metadata } from "next";
import { Check } from "@phosphor-icons/react/dist/ssr";

import { ctas } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { challenges, expectations, values } from "@/content/company";
import { processSteps } from "@/content/services";
import { ButtonLink } from "@/components/button";
import { SectionHeading } from "@/components/section-heading";
import { CtaBand, PageHero } from "@/components/sections";
import { FoundersSection } from "@/components/founders";
import { BlurFade } from "@/components/ui/blur-fade";
import { ParallaxImage } from "@/components/motion/parallax";
import { GlassGradientBackground } from "@/components/motion/glass-gradient";

export const metadata: Metadata = pageMetadata({
  title: "About Prolifi AI | Our Team & Approach",
  description:
    "Meet the founders of Prolifi AI, a digital studio for small and growing businesses that combines strategy, design and execution in one team.",
  path: "/about",
});

const approach = [
  {
    title: "Strategy",
    body: "We start with your goals, your customers and your market, so every page, post and feature has a job to do.",
  },
  {
    title: "Design",
    body: "We turn that thinking into clear, consistent design that makes your business easy to understand and easy to trust.",
  },
  {
    title: "Execution",
    body: "We build, launch and hand over working results: websites, campaigns and product designs, not just recommendations.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        video="about"
        eyebrow="About Prolifi"
        title="A digital studio for businesses ready to grow"
        intro="We help small and growing businesses build a stronger digital presence, reach more customers and turn good ideas into practical digital products."
      />

      {/* Why Prolifi exists */}
      <section className="py-24 md:py-32">
        <div className="container-page grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeading title="Why Prolifi exists" />
            <BlurFade inView direction="up" offset={14} delay={0.1} duration={0.6} className="mt-6 space-y-5 text-lead text-ink-muted">
              <p className="text-pretty">
                Most growing businesses know they need a better website, a clearer social media presence or a digital
                product of their own. What they often lack is a partner who explains things plainly, prices work
                honestly and understands the realities of running a business.
              </p>
              <p className="text-pretty">
                Prolifi exists to be that partner. We bring strategy, design and digital execution together in one
                team, so you can focus on running your business while your digital presence works harder for it.
              </p>
            </BlurFade>
          </div>
          <BlurFade inView variant="slide-right" delay={0.15} duration={0.75} className="lg:col-span-6">
            <div className="rounded-[2rem] bg-white p-2 shadow-lift ring-1 ring-inverse/5">
              <ParallaxImage
                src="/images/work/social-media-on-laptop-and-phone.png"
                alt="Person reviewing a social media page on a laptop while holding a phone"
                sizes="(min-width: 1024px) 45vw, 100vw"
                strength={30}
                className="aspect-[4/3] rounded-[calc(2rem-0.5rem)] bg-inverse"
              />
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Challenges */}
      <section className="border-y border-line bg-surface py-24 md:py-32">
        <div className="container-page">
          <SectionHeading
            title="The challenges we help solve"
            body="Every project starts with a business problem, not a deliverable."
          />
          <ul className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2">
            {challenges.map((c, i) => (
              <BlurFade as="li" key={c.title} inView direction="up" offset={14} delay={0.06 * i} duration={0.6} className="border-t-2 border-heading pt-6">
                <h3 className="text-h3 font-semibold text-heading">{c.title}</h3>
                <p className="mt-3 max-w-[48ch] text-pretty text-ink-muted">{c.body}</p>
              </BlurFade>
            ))}
          </ul>
        </div>
      </section>

      {/* Approach */}
      <section className="py-24 md:py-32">
        <div className="container-page">
          <SectionHeading
            title="Strategy, design and execution in one team"
            body="You do not need three separate suppliers. We take your project from first idea to launch."
          />
          <ol className="mt-14 divide-y divide-line border-y border-line">
            {approach.map((a, i) => (
              <BlurFade
                as="li"
                key={a.title}
                inView
                direction="up"
                offset={12}
                delay={0.06 * i}
                duration={0.6}
                className="grid gap-4 py-10 md:grid-cols-12 md:items-baseline md:gap-8"
              >
                <h3 className="text-[clamp(2rem,4.4vw,3.6rem)] font-semibold leading-none tracking-[-0.04em] text-heading md:col-span-5">
                  {a.title}
                </h3>
                <p className="max-w-[52ch] text-pretty text-lead text-ink-muted md:col-span-7">{a.body}</p>
              </BlurFade>
            ))}
          </ol>
        </div>
      </section>

      {/* Values */}
      <section className="relative isolate overflow-hidden py-24 text-on-inverse md:py-32">
        <GlassGradientBackground grid={false} flow />
        <div className="container-page">
          <SectionHeading tone="inverse" title="What we stand for" />
          <ul className="mt-14 grid gap-5 md:grid-cols-3">
            {values.map((v, i) => (
              <BlurFade
                as="li"
                key={v.title}
                inView
                direction="up"
                offset={16}
                delay={0.08 * i}
                duration={0.6}
                className={
                  i === 0
                    ? "rounded-panel bg-accent p-8 text-on-accent"
                    : "glass-surface rounded-panel p-8"
                }
              >
                <h3 className="text-h3 font-semibold">{v.title}</h3>
                <p className={i === 0 ? "mt-4 text-pretty text-on-accent/80" : "mt-4 text-pretty text-on-inverse-muted"}>
                  {v.body}
                </p>
              </BlurFade>
            ))}
          </ul>
        </div>
      </section>

      <FoundersSection />

      {/* Expectations and how to begin */}
      <section className="bg-canvas-deep py-24 md:py-32">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeading title="What to expect when you work with us" />
            <ul className="mt-10 space-y-4">
              {expectations.map((e) => (
                <li key={e} className="flex gap-4 text-lg text-ink">
                  <span aria-hidden className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-inverse text-accent">
                    <Check size={13} weight="bold" />
                  </span>
                  <span className="text-pretty">{e}</span>
                </li>
              ))}
            </ul>
          </div>
          <BlurFade inView direction="up" offset={18} duration={0.7} className="lg:col-span-5 lg:col-start-8">
            <div className="rounded-panel bg-surface p-8 shadow-soft ring-1 ring-line md:p-10">
              <h2 className="text-h3 font-semibold text-heading">How to begin</h2>
              <ol className="mt-6 space-y-5">
                {processSteps.slice(0, 2).map((s, i) => (
                  <li key={s.title} className="grid grid-cols-[2rem_1fr] gap-3">
                    <span aria-hidden className="flex size-8 items-center justify-center rounded-full bg-canvas text-sm font-semibold text-heading">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-heading">{s.title}</p>
                      <p className="mt-1 text-pretty text-ink-muted">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <ButtonLink href={ctas.contact.href} className="mt-8">
                {ctas.contact.label}
              </ButtonLink>
            </div>
          </BlurFade>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
