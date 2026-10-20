"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

import { ease } from "@/lib/motion";

/**
 * Counts from 0 to `value` once, when the number first scrolls into view.
 *
 * - No layout shift: the final value is rendered invisibly underneath to
 *   reserve the exact width, and digits use tabular figures.
 * - Accessible: screen readers get the final value from a visually hidden
 *   span; the animating digits are aria-hidden.
 * - Reduced motion: shows the final value immediately.
 * - Writes straight to the DOM node, so counting causes no React re-renders.
 */
export function CountUp({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1.3,
  delay = 0,
  className,
  suffixClassName,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  delay?: number;
  className?: string;
  suffixClassName?: string;
}) {
  const wrap = useRef<HTMLSpanElement>(null);
  const digits = useRef<HTMLSpanElement>(null);
  const seen = useInView(wrap, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const final = value.toFixed(decimals);

  // Once JS runs, park the number at 0 (off screen) so it can count up on entry
  useEffect(() => {
    const node = digits.current;
    if (node && !seen && !reduce) node.textContent = (0).toFixed(decimals);
    // Only on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const node = digits.current;
    if (!node || !seen) return;
    if (reduce) {
      node.textContent = final;
      return;
    }
    const controls = animate(0, value, {
      duration,
      delay,
      ease: ease.reveal,
      onUpdate: (v) => {
        node.textContent = v.toFixed(decimals);
      },
    });
    return () => controls.stop();
  }, [seen, reduce, value, decimals, duration, delay, final]);

  return (
    <span ref={wrap} className={className}>
      <span className="sr-only">
        {prefix}
        {final}
        {suffix}
      </span>
      <span aria-hidden className="inline-grid tabular-nums">
        {/* Reserves the final width so nothing moves while counting */}
        <span className="invisible col-start-1 row-start-1">
          {prefix}
          {final}
          {suffix}
        </span>
        <span className="col-start-1 row-start-1">
          {prefix}
          {/* Server HTML shows the final value, so it is correct without JS */}
          <span ref={digits}>{final}</span>
          <span className={suffixClassName}>{suffix}</span>
        </span>
      </span>
    </span>
  );
}
