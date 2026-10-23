import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "@phosphor-icons/react/dist/ssr";

import { ctas } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { availableServices, legacyPillarIds, pillars, type Pillar, type Service } from "@/content/services";
import { generalFaqs } from "@/content/company";
import { cn } from "@/lib/utils";
import { ButtonLink, TextLink } from "@/components/button";
import { CtaBand, FaqSection, PageHero, ProcessSection } from "@/components/sections";
import { BlurFade } from "@/components/ui/blur-fade";
import { MagicCard } from "@/components/ui/magic-card";
import { ParallaxImage } from "@/components/motion/parallax";
import { DropText } from "@/components/motion/drop-text";

export const metadata: Metadata = pageMetadata({
  title: "Website Development, MVPs, SEO & AI Services | Prolifi AI",
  description:
    "Website design and development, SEO, idea validation, MVP and web app development, and AI tool selection and setup for businesses in Australia and New Zealand.",
  path: "/services",
});

function ServiceCard({ service }: { service: Service }) {
  return (
    <MagicCard className="h-full rounded-panel shadow-soft">
      <article className="flex h-full flex-col p-7 md:p-8">
        <h3 className="text-h3 font-semibold text-heading">{service.name}</h3>
        <p className="mt-3 text-pretty text-ink">{service.problem}</p>

        <dl className="mt-6 grid gap-5 border-t border-line pt-6 text-[0.95rem]">
          <div>
            <dt className="text-sm font-medium text-ink-muted">Who it is for</dt>
            <dd className="mt-1 text-pretty text-ink">{service.forWho}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-ink-muted">What you get</dt>
            <dd className="mt-2">
              <ul className="space-y-2">
                {service.deliverables.map((d) => (
                  <li key={d} className="flex gap-2.5 text-ink">
                    <Check size={16} weight="bold" aria-hidden className="mt-0.5 shrink-0 text-brand" />
                    {d}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-ink-muted">The benefit</dt>
            <dd className="mt-1 text-pretty font-medium text-heading">{service.benefit}</dd>
          </div>
        </dl>

        <div className="mt-auto pt-7">
          <Link
            href={`${ctas.contact.href}?service=${service.slug}`}
            className="group/link inline-flex items-center gap-1.5 text-[0.95rem] font-medium text-heading underline decoration-line-strong underline-offset-[6px] hover:decoration-heading"
          >
            Enquire about {service.name.toLowerCase()}
            <ArrowRight size={14} weight="bold" aria-hidden className="transition-transform group-hover/link:translate-x-0.5" />
          </Link>
        </div>
      </article>
    </MagicCard>
  );
}

function PillarSection({ pillar, index }: { pillar: Pillar; index: number }) {
  const services = availableServices(pillar);
  return (
    <section
      id={pillar.id}
      aria-labelledby={`${pillar.id}-title`}
      className={cn("scroll-mt-[calc(var(--header-h)+1rem)] py-24 md:py-32", index % 2 === 1 ? "bg-surface" : "bg-canvas")}
    >
      {/* Links shared before the GROW > LAUNCH rename still land here */}
      {Object.entries(legacyPillarIds)
        .filter(([, to]) => to === pillar.id)
        .map(([from]) => (
          <span key={from} id={from} aria-hidden className="block scroll-mt-[calc(var(--header-h)+1rem)]" />
        ))}
      <div className="container-page">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <BlurFade inView variant="slide-left" duration={0.75} className="lg:col-span-6">
            <p className="text-label font-semibold uppercase text-accent-strong">{pillar.focus}</p>
            <DropText
              as="h2"
              id={`${pillar.id}-title`}
              text={pillar.name}
              delay={0.1}
              className="mt-4 block text-[clamp(3.5rem,9vw,7.5rem)] font-semibold uppercase leading-[0.9] tracking-[-0.045em] text-heading"
            />
            <p className="mt-6 max-w-[30ch] text-balance text-h3 font-semibold text-heading">{pillar.message}</p>
            <p className="mt-4 max-w-[48ch] text-pretty text-lead text-ink-muted">{pillar.intro}</p>
            <div className="mt-8">
              <ButtonLink href={`${ctas.contact.href}?pillar=${pillar.id}`} hoverLabel={`Let's ${pillar.name}`}>
                Enquire about {pillar.name}
              </ButtonLink>
            </div>
          </BlurFade>
          <BlurFade inView variant="slide-right" delay={0.12} duration={0.75} className="lg:col-span-5 lg:col-start-8">
            <div className="rounded-[2rem] bg-white p-2 shadow-lift ring-1 ring-inverse/5">
              <ParallaxImage
                src={pillar.image.src}
                alt={pillar.image.alt}
                sizes="(min-width: 1024px) 40vw, 100vw"
                strength={28}
                className="aspect-[16/10] rounded-[calc(2rem-0.5rem)] bg-inverse"
              />
            </div>
          </BlurFade>
        </div>

        <ul className="mt-14 grid gap-5 md:grid-cols-2">
          {services.map((s, i) => (
            <BlurFade as="li" key={s.slug} inView direction="up" offset={16} delay={0.05 * i} duration={0.6}>
              <ServiceCard service={s} />
            </BlurFade>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  return (
    <>
      <PageHero
        video="services"
        eyebrow="Services"
        title="Build, launch and scale your business online"
        intro="Premium websites that win customers, SEO that helps them find you, and the research, MVP development and AI setup to grow from there. Start with the stage that matches where you are today."
      >
        <nav aria-label="Service pillars" className="flex flex-wrap gap-3">
          {pillars.map((p) => (
            <ButtonLink key={p.id} href={`#${p.id}`} variant="outline-inverse" hoverLabel={`See ${p.name}`}>
              {p.name}
            </ButtonLink>
          ))}
        </nav>
      </PageHero>

      {pillars.map((p, i) => (
        <PillarSection key={p.id} pillar={p} index={i} />
      ))}

      <ProcessSection title="How every project runs" />

      <section className="pt-24 md:pt-32">
        <div className="container-page">
          <div className="flex flex-col gap-4 rounded-panel bg-surface p-8 ring-1 ring-line md:flex-row md:items-center md:justify-between md:p-10">
            <div>
              <h2 className="text-h3 font-semibold text-heading">Looking for prices?</h2>
              <p className="mt-2 text-ink-muted">Website packages start from fixed prices. Social media and product work is quoted per project.</p>
            </div>
            <TextLink href={ctas.pricing.href}>{ctas.pricing.label}</TextLink>
          </div>
        </div>
      </section>

      <FaqSection items={generalFaqs} />
      <CtaBand />
    </>
  );
}
