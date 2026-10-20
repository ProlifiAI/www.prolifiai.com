"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { List, X } from "@phosphor-icons/react";

import { ctas, nav } from "@/content/site";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/button";
import { Logo } from "@/components/logo";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const { scrollY } = useScroll();

  // Only flips a boolean when crossing the threshold, so no per-frame renders.
  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > 12;
    if (next !== scrolled) setScrolled(next);
  });

  // Close the mobile menu on navigation
  useEffect(() => setOpen(false), [pathname]);

  // Lock scroll and support Escape while the mobile menu is open
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    // Floating glass island. The header keeps its height in the flow (sticky)
    // but pulls the next section up underneath it with a negative margin, so
    // the dark heroes run behind it. First sections pad by --header-h.
    <header className="sticky top-0 z-40 -mb-[var(--header-h)] h-[var(--header-h)] px-3 pt-3 md:px-4">
      <div
        className={cn(
          "mx-auto max-w-[1280px] rounded-full ring-1 ring-inset transition-[background-color,box-shadow] duration-500 ease-[var(--ease-reveal)]",
          "bg-white/80 backdrop-blur-xl backdrop-saturate-150 supports-[not(backdrop-filter:blur(0))]:bg-white",
          scrolled || open
            ? "shadow-[0_12px_32px_-18px_rgb(14_48_98/0.45)] ring-line"
            : "shadow-[0_8px_24px_-18px_rgb(3_12_30/0.5)] ring-white/40"
        )}
      >
        <div className="flex h-[60px] items-center justify-between gap-6 pl-5 pr-1.5 md:pl-6">
          <Link href="/" aria-label="Prolifi home" className="rounded-md">
            <Logo priority />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            {/* A soft highlight glides between items on hover or keyboard focus;
                the yellow underline marks the current page. */}
            <ul className="flex items-center gap-1" onMouseLeave={() => setHovered(null)}>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    onMouseEnter={() => setHovered(item.href)}
                    onFocus={() => setHovered(item.href)}
                    onBlur={() => setHovered(null)}
                    className={cn(
                      "relative isolate block rounded-full px-4 py-2 text-[0.95rem] font-medium transition-colors duration-300",
                      isActive(item.href) || hovered === item.href ? "text-heading" : "text-ink-muted"
                    )}
                  >
                    {hovered === item.href && (
                      <motion.span
                        layoutId="nav-hover"
                        aria-hidden
                        className="absolute inset-0 -z-10 rounded-full bg-inverse/[0.06]"
                        transition={{ type: "spring", stiffness: 420, damping: 36 }}
                      />
                    )}
                    {item.label}
                    {isActive(item.href) && (
                      <motion.span
                        layoutId="nav-active"
                        aria-hidden
                        className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-accent"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ButtonLink href={ctas.contact.href} className="hidden min-h-12 sm:inline-flex">
              {ctas.contact.label}
            </ButtonLink>
            <button
              ref={menuButton}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex size-12 items-center justify-center rounded-full text-heading ring-1 ring-inset ring-line-strong transition-colors hover:bg-inverse/[0.04] lg:hidden"
            >
              {open ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-3 bottom-3 top-[calc(var(--header-h)+0.25rem)] overflow-y-auto rounded-panel bg-white/95 shadow-lift ring-1 ring-line backdrop-blur-xl md:inset-x-4 lg:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col px-6 pb-8 pt-2">
              <ul className="divide-y divide-line border-b border-line">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + 0.06 * i, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={cn(
                        "flex items-center justify-between py-5 text-2xl font-semibold tracking-tight",
                        isActive(item.href) ? "text-heading" : "text-ink-muted"
                      )}
                    >
                      {item.label}
                      {isActive(item.href) && <span aria-hidden className="size-2 rounded-full bg-accent" />}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <ButtonLink href={ctas.contact.href} className="mt-8 self-start">
                {ctas.contact.label}
              </ButtonLink>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
