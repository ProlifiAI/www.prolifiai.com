"use client";

import { createElement, useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

/**
 * The element that holds a character drop and decides when it plays
 * (see drop-text.tsx). The only part of the system that needs JavaScript:
 * in "view" mode it adds [data-drop-in] the first time it scrolls into view.
 */

/** Per-character delay: the whole word-wave spreads over about half a second, as in the reference */
function stepFor(chars: number) {
  return Math.min(0.04, Math.max(0.015, 0.5 / Math.max(chars, 1)));
}

export type ScopeProps = {
  as?: ElementType;
  /** The full text, read by assistive technology (omit inside links, which name themselves) */
  label?: string;
  mode?: "load" | "view";
  /** Wait for the brand intro (page-load text only) */
  intro?: boolean;
  /** Extra delay in seconds */
  delay?: number;
  /** Number of visible characters inside, for the stagger spacing */
  chars: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  [key: string]: unknown;
};

export function DropScope({ as = "span", label, mode = "view", intro = false, delay = 0, chars, className, style, children, ...rest }: ScopeProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (mode !== "view") return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute("data-drop-in", "");
          io.disconnect();
        }
      },
      // The top margin reaches far above the viewport, so any heading the visitor has already
      // scrolled past (a fast fling, an anchor jump) counts as seen and is never left hidden.
      { rootMargin: "100000px 0px -12% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [mode]);

  const vars = {
    "--drop-step": `${stepFor(chars)}s`,
    "--drop-delay": intro ? `calc(var(--intro-offset) + ${delay}s)` : `${delay}s`,
  } as CSSProperties;

  return createElement(
    as,
    {
      ref,
      className: className ? `drop ${className}` : "drop",
      style: { ...vars, ...style },
      "data-drop-in": mode === "load" ? "" : undefined,
      "aria-label": label,
      ...rest,
    },
    children
  );
}

