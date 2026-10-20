import Image from "next/image";
import { EnvelopeSimple, InstagramLogo, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";

import { team, type Founder } from "@/content/company";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/blur-fade";

/**
 * Founder portrait, following the approved founders design: each person sits
 * on their own light grey-to-white card, heads rising above the card edge,
 * all three bottom-aligned at identical dimensions.
 *
 * Geometry comes from the cut-outs (556 x 572 px): the card fills the bottom
 * 392 px (68.53%). The portrait layer is clipped to the card's bottom corners
 * so clothing never pokes past the rounded edge.
 */
export function FounderCard({ founder }: { founder: Founder }) {
  const links = [
    { label: `${founder.name} on LinkedIn`, href: founder.linkedin, Icon: LinkedinLogo, external: true },
    { label: `${founder.name} on Instagram`, href: founder.instagram, Icon: InstagramLogo, external: true },
    { label: `Email ${founder.name}`, href: `mailto:${founder.email}`, Icon: EnvelopeSimple, external: false },
  ];

  return (
    <figure className="group/founder">
      <div className="relative aspect-[556/572]">
        <div className="bg-portrait absolute inset-x-0 bottom-0 h-[68.53%] rounded-[1.25rem] transition-shadow duration-500 ease-[var(--ease-reveal)] group-hover/founder:shadow-[0_24px_48px_-28px_rgb(14_48_98/0.35)]" />
        <Image
          src={founder.portrait}
          alt={`Portrait of ${founder.name}, ${founder.role}`}
          fill
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 30vw, 88vw"
          className="object-contain object-bottom [clip-path:inset(0_round_0_0_1.25rem_1.25rem)]"
        />
      </div>
      <figcaption className="mt-6 text-center">
        <p className="text-[1.3rem] font-semibold tracking-[-0.02em] text-heading">{founder.name}</p>
        <p className="mt-1 text-[0.95rem] tracking-[0.02em] text-ink-muted">{founder.role}</p>
        <ul className="mt-5 flex items-center justify-center gap-2.5">
          {links.map(({ label, href, Icon, external }) => (
            <li key={href}>
              <a
                href={href}
                aria-label={label}
                title={label}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={cn(
                  "flex size-11 items-center justify-center rounded-full bg-surface text-heading ring-1 ring-inset ring-line",
                  "transition-[transform,background-color,color,box-shadow] duration-[var(--duration-button)] ease-[var(--ease-reveal)]",
                  "hover:-translate-y-0.5 hover:bg-inverse hover:text-accent hover:ring-inverse hover:shadow-[0_10px_20px_-10px_rgb(14_48_98/0.6)]",
                  "active:translate-y-0 active:scale-95 motion-reduce:hover:translate-y-0"
                )}
              >
                <Icon size={19} weight="fill" aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      </figcaption>
    </figure>
  );
}

/** "Meet The Faces Behind Prolifi": centred heading above three evenly spaced profiles. */
export function FoundersSection({ className }: { className?: string }) {
  return (
    <section aria-labelledby="founders-title" className={cn("bg-surface py-24 md:py-32", className)}>
      <div className="container-page">
        <Reveal inView variant="blur-up" className="mx-auto max-w-3xl text-center">
          <p className="text-label font-semibold uppercase text-accent-strong">Meet Prolifi</p>
          <h2 id="founders-title" className="mt-4 text-balance text-h2 font-semibold text-heading">
            Meet The Faces Behind Prolifi
          </h2>
        </Reveal>
        <ul className="mx-auto mt-16 grid max-w-sm gap-14 sm:max-w-none sm:grid-cols-3 sm:gap-5 lg:max-w-6xl lg:gap-8">
          {team.map((f, i) => (
            <Reveal as="li" key={f.name} inView delay={0.12 + i * 0.1}>
              <FounderCard founder={f} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
