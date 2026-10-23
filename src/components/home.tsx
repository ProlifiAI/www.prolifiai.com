import { CursorClick, Lightbulb, MagnifyingGlass, Megaphone, Asterisk } from "@phosphor-icons/react/dist/ssr";

import { availableServices, pillars } from "@/content/services";
import { challenges, projects } from "@/content/company";
import { websitePackages } from "@/content/pricing";
import { TextLink } from "@/components/button";
import { SectionHeading } from "@/components/section-heading";
import { PricingCard } from "@/components/pricing-card";
import { Reveal } from "@/components/ui/blur-fade";
import { Marquee } from "@/components/ui/marquee";
import { ParallaxImage } from "@/components/motion/parallax";
import { HeroAchievementCards } from "@/components/hero-cards";

export { HomeHero } from "@/components/home-hero";

/* ------------------------------------------------------------------
   Hero visual: rises out of the hero (overlapping it) as a framed
   "double-bezel" image, with floating achievement cards around it.
   The image and each card move at different scroll speeds for depth.
------------------------------------------------------------------- */
export function FeaturedComposition() {
  return (
    <section aria-label="Prolifi at a glance" className="relative z-10 -mt-28 md:-mt-36">
      <div className="container-page">
        <div className="relative mx-auto max-w-4xl">
          <Reveal inView amount={0.05} duration={0.9}>
            <div className="rounded-[2rem] bg-white/70 p-2 shadow-lift ring-1 ring-inverse/5">
              <ParallaxImage
                src="/images/work/website-design-on-laptop.png"
                alt="Laptop on a desk showing a website with the headline Build your dream website"
                sizes="(min-width: 1024px) 880px, 100vw"
                strength={34}
                priority
                className="aspect-[16/9] rounded-[calc(2rem-0.5rem)] bg-inverse"
              />
            </div>
          </Reveal>
          <HeroAchievementCards />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   Proposition and the problems Prolifi solves
------------------------------------------------------------------- */
const challengeIcons = [MagnifyingGlass, CursorClick, Megaphone, Lightbulb];

export function Proposition() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-page">
        <Reveal inView variant="blur-up" duration={0.8}>
          <p className="max-w-5xl text-balance text-[clamp(1.6rem,3vw,2.6rem)] font-medium leading-[1.2] tracking-[-0.03em] text-heading">
            Prolifi AI is a strategy, design and development studio for Australian and New Zealand businesses.{" "}
            <span className="text-ink-muted">
              We help you decide what is worth doing, then build it properly, so customers can find you, trust you and
              buy from you.
            </span>
          </p>
        </Reveal>

        <h2 className="sr-only">Problems we solve</h2>
        <ul className="mt-16 grid gap-px overflow-hidden rounded-panel bg-line ring-1 ring-line sm:grid-cols-2 lg:grid-cols-4">
          {challenges.map((c, i) => {
            const Icon = challengeIcons[i];
            return (
              <Reveal as="li" key={c.title} inView delay={0.08 * i} className="group bg-surface p-7 transition-colors duration-500 hover:bg-canvas">
                <span className="flex size-11 items-center justify-center rounded-full bg-canvas text-brand transition-colors duration-500 group-hover:bg-inverse group-hover:text-accent">
                  <Icon size={20} weight="duotone" aria-hidden />
                </span>
                <h3 className="mt-6 text-lg font-semibold text-heading">{c.title}</h3>
                <p className="mt-2 text-pretty text-ink-muted">{c.body}</p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   Capability marquee (the one marquee on the site)
------------------------------------------------------------------- */
export function CapabilityMarquee() {
  const names = pillars.flatMap((p) => availableServices(p).map((s) => s.name));
  return (
    <section aria-label="Services we offer" className="border-y border-line bg-surface py-6">
      <Marquee pauseOnHover repeat={3} className="[--duration:60s] [--gap:2.5rem] [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        {names.map((n) => (
          <span key={n} className="flex items-center gap-10 whitespace-nowrap text-xl font-medium tracking-[-0.02em] text-heading md:text-2xl">
            {n}
            <Asterisk size={18} weight="bold" aria-hidden className="text-accent" />
          </span>
        ))}
      </Marquee>
    </section>
  );
}

/* ------------------------------------------------------------------
   Pricing preview
------------------------------------------------------------------- */
export function PricingPreview() {
  return (
    <section className="bg-canvas-deep py-24 md:py-32">
      <div className="container-page">
        <SectionHeading
          eyebrow="Pricing"
          title="Website packages with clear, upfront prices"
          body="One-off website prices in US dollars. SEO, social media, MVP and AI work is quoted to fit your project."
        />
        <ul className="mt-14 grid items-stretch gap-5 lg:mt-20 lg:grid-cols-3">
          {websitePackages.map((pkg, i) => (
            <Reveal as="li" key={pkg.id} inView delay={0.1 * i} duration={0.7}>
              <PricingCard pkg={pkg} />
            </Reveal>
          ))}
        </ul>
        <Reveal inView delay={0.2} className="mt-12">
          <TextLink href="/pricing">Compare packages in detail</TextLink>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   Conditional proof sections. Both stay hidden until real, approved
   content exists in src/content/company.ts.
------------------------------------------------------------------- */
export function SelectedWork() {
  const items = projects.filter((p) => p.approved);
  if (items.length === 0) return null;
  return (
    <section className="py-24 md:py-32">
      <div className="container-page">
        <SectionHeading title="Selected work" />
        <ul className="mt-14 grid gap-6 md:grid-cols-2">
          {items.map((p, i) => (
            <Reveal as="li" key={p.title} inView delay={0.08 * i}>
              <article className="group">
                <ParallaxImage
                  src={p.image}
                  alt={`${p.title} for ${p.client}`}
                  sizes="(min-width: 768px) 45vw, 100vw"
                  className="aspect-[4/3] rounded-panel bg-canvas-deep"
                />
                <p className="mt-5 text-sm font-medium text-brand">{p.pillar}</p>
                <h3 className="mt-1 text-h3 font-semibold text-heading">{p.title}</h3>
                <p className="mt-2 text-ink-muted">{p.summary}</p>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
