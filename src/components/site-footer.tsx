import Image from "next/image";
import Link from "next/link";
import {
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
  XLogo,
} from "@phosphor-icons/react/dist/ssr";

import { legalLine, nav, site, socials } from "@/content/site";
import { pillars } from "@/content/services";
import { Logo } from "@/components/logo";
import { Reveal } from "@/components/ui/blur-fade";
import { RollText } from "@/components/motion/drop-text";

const socialIcons = {
  LinkedIn: LinkedinLogo,
  Instagram: InstagramLogo,
  Facebook: FacebookLogo,
  X: XLogo,
} as const;

export function SiteFooter() {
  const activeSocials = socials.filter((s) => s.href);
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-inverse-deep text-on-inverse">
      <div className="container-page grid gap-12 pb-12 pt-20 md:grid-cols-12">
        <div className="md:col-span-5">
          <Link href="/" aria-label="Prolifi home" className="inline-block rounded-md">
            <Logo tone="inverse" />
          </Link>
          <p className="mt-6 max-w-sm text-pretty text-on-inverse-muted">{site.tagline}</p>
          {activeSocials.length > 0 && (
            <ul className="mt-8 flex gap-2">
              {activeSocials.map((s) => {
                const Icon = socialIcons[s.label];
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Prolifi on ${s.label}`}
                      className="flex size-11 items-center justify-center rounded-full ring-1 ring-inset ring-white/15 transition-colors hover:bg-white/10"
                    >
                      <Icon size={18} />
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 md:col-span-6 md:col-start-7 md:grid-cols-3">
          <div>
            <h2 className="text-sm font-medium text-accent">Company</h2>
            <ul className="mt-5 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="roll-host text-on-inverse-muted transition-colors hover:text-on-inverse">
                    <RollText text={item.label} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-medium text-accent">Services</h2>
            <ul className="mt-5 space-y-3">
              {pillars.map((p) => (
                <li key={p.id}>
                  <Link href={`/services#${p.id}`} className="roll-host text-on-inverse-muted transition-colors hover:text-on-inverse">
                    <RollText text={p.name} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {site.contactEmail && (
            <div className="col-span-2 md:col-span-1">
              <h2 className="text-sm font-medium text-accent">Email</h2>
              <a
                href={`mailto:${site.contactEmail}`}
                className="mt-5 inline-block break-all text-on-inverse-muted transition-colors hover:text-on-inverse"
              >
                {site.contactEmail}
              </a>
            </div>
          )}
        </nav>
      </div>

      <div className="container-page">
        <div className="flex flex-col gap-3 border-t border-line-inverse py-6 text-sm text-on-inverse-muted md:flex-row md:justify-between">
          <p>&copy; {year} Prolifi. All rights reserved.</p>
          {legalLine && <p>{legalLine}</p>}
        </div>
      </div>

      {/* Oversized wordmark, carried over from the original footer, using the official logo.
          It rises into place once as the footer comes into view: the page's closing gesture. */}
      <div aria-hidden className="container-page select-none overflow-hidden pt-6">
        <Reveal inView variant="fade-up" duration={0.9} amount={0.2}>
        <Image
          src="/brand/prolifi-logo-white.png"
          alt=""
          width={1664}
          height={288}
          sizes="100vw"
          className="h-auto w-full translate-y-[22%] opacity-[0.06] grayscale"
        />
        </Reveal>
      </div>
    </footer>
  );
}
