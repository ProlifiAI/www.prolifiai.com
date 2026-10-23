"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";

import { ctas } from "@/content/site";
import { pillars } from "@/content/services";
import { ButtonLink } from "@/components/button";
import { Reveal } from "@/components/ui/blur-fade";
import { AnimatedBackgroundVideo } from "@/components/motion/background-video";
import { Chars, DropScope, countChars } from "@/components/motion/drop-text";

const heroLine1 = "Make the right digital call.";
const heroLine2 = "Then build it to win";
const heroAccent = "customers.";
import { useStill } from "@/components/motion/use-still";

/**
 * Home hero. Layers, back to front:
 *   1. Google Flow liquid-glass video (poster on phones / reduced motion),
 *      drifting down slower than the page and scaling gently: depth.
 *   2. Readability overlays: a soft navy pool behind the text and a fade
 *      into the section below.
 *   3. A slow warm light field.
 *   4. Content, which stays put until the visitor is well past it, then eases
 *      up and fades: the one deliberate scroll-linked fade on the site.
 * The clip's two glass forms reach towards the centre, so the copy is centred
 * in the space between them.
 */
export function HomeHero() {
  const ref = useRef<HTMLElement>(null);
  const still = useStill();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const bgY = useTransform(scrollYProgress, [0, 1], still ? ["0%", "0%"] : ["0%", "24%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], still ? [1.04, 1.04] : [1.04, 1.16]);
  const glowY = useTransform(scrollYProgress, [0, 1], still ? [0, 0] : [0, 160]);
  const contentY = useTransform(scrollYProgress, [0, 1], still ? [0, 0] : [0, -80]);
  const contentOpacity = useTransform(scrollYProgress, [0.4, 0.85], [1, still ? 1 : 0]);

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[max(640px,100svh)] items-center overflow-hidden bg-inverse text-on-inverse"
    >
      <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0 -z-20 origin-top will-change-transform">
        <AnimatedBackgroundVideo src="/video/hero-background.mp4" poster="/video/hero-poster.jpg" />
      </motion.div>

      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_50%_at_50%_50%,rgb(8_29_61/0.62),transparent_78%)]" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-inverse-deep/70 via-transparent to-inverse" />
      <motion.div
        aria-hidden
        style={{ y: glowY }}
        className="absolute -bottom-40 left-1/2 -z-10 size-[42rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(244_196_48/0.13),transparent)]"
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="container-page relative pb-36 pt-[calc(var(--header-h)+3rem)] text-center md:pb-44"
      >
        <Reveal>
          <p className="glass-surface inline-flex items-center gap-2 whitespace-nowrap rounded-full px-3.5 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.1em] text-accent sm:px-4 sm:text-label">
            Websites, MVPs &amp; AI · Australia &amp; NZ
          </p>
        </Reveal>

        {/* Signature character drop (after the brand intro when it plays) */}
        <DropScope
          as="h1"
          id="hero-title"
          mode="load"
          intro
          delay={0.12}
          label={`${heroLine1} ${heroLine2} ${heroAccent}`}
          chars={countChars(heroLine1, heroLine2, heroAccent)}
          className="mx-auto mt-8 max-w-6xl text-balance text-display font-semibold lg:text-wrap"
        >
          <span className="lg:block">
            <Chars text={heroLine1} />
          </span>{" "}
          <span className="text-on-inverse/70 lg:block lg:whitespace-nowrap">
            <Chars text={heroLine2} from={countChars(heroLine1)} />{" "}
            <span className="text-accent">
              <Chars text={heroAccent} from={countChars(heroLine1, heroLine2)} />
            </span>
          </span>
        </DropScope>

        <Reveal delay={0.22}>
          <p className="mx-auto mt-7 max-w-[46ch] text-pretty text-lead text-on-inverse/80">
            We help Australian and New Zealand businesses pick the right AI tools, test ideas before investing, and
            launch premium websites and products built to convert.
          </p>
        </Reveal>

        <Reveal delay={0.32} className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href={ctas.contact.href} variant="accent">
            {ctas.contact.label}
          </ButtonLink>
          <ButtonLink href={ctas.services.href} variant="outline-inverse">
            {ctas.services.label}
          </ButtonLink>
        </Reveal>

        <Reveal delay={0.45} className="mt-14">
          <nav aria-label="What we do">
            <ul className="glass-surface mx-auto inline-flex rounded-full p-1.5">
              {pillars.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/services#${p.id}`}
                    className="group flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-on-inverse/85 transition-colors duration-300 hover:bg-white/10 hover:text-on-inverse sm:px-5 sm:text-sm"
                  >
                    {p.name}
                    <ArrowRight
                      size={13}
                      weight="bold"
                      aria-hidden
                      className="text-accent transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Reveal>
      </motion.div>
    </section>
  );
}
