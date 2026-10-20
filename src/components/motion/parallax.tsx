"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

import { parallax } from "@/lib/motion";
import { useStill } from "@/components/motion/use-still";
import { cn } from "@/lib/utils";

/** 1 on desktop, a smaller factor on phones. Read once per breakpoint change, never per frame. */
function useParallaxFactor() {
  const [factor, setFactor] = useState(parallax.desktop);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setFactor(mq.matches ? parallax.mobile : parallax.desktop);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return factor;
}

/**
 * Maps the element's journey through the viewport (entering at the bottom,
 * leaving at the top) to a vertical offset of ±distance px.
 * Uses Motion's scroll-linked values: no scroll listeners, no React re-renders per frame.
 */
export function useParallaxY(target: RefObject<HTMLElement | null>, distance: number): MotionValue<number> {
  const reduce = useStill();
  const factor = useParallaxFactor();
  const { scrollYProgress } = useScroll({ target, offset: ["start end", "end start"] });
  const d = reduce ? 0 : distance * factor;
  return useTransform(scrollYProgress, [0, 1], [-d, d]);
}

/** Moves its children at a different speed from the page. Positive distance = slower than scroll. */
export function Parallax({
  children,
  distance = 40,
  className,
}: {
  children: ReactNode;
  distance?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const y = useParallaxY(ref, distance);
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className="h-full will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}

/**
 * Image that drifts inside a clipped frame. The image layer is taller than the
 * frame by 2 x |strength|, so it never reveals an empty edge and the crop stays intentional.
 * A negative strength moves the image the opposite way (for layered compositions).
 */
export function ParallaxImage({
  src,
  alt,
  sizes,
  priority,
  strength = 36,
  className,
  imageClassName,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  strength?: number;
  className?: string;
  imageClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const y = useParallaxY(ref, strength);
  const bleed = Math.abs(strength);
  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div style={{ y, top: -bleed, bottom: -bleed }} className="absolute inset-x-0 will-change-transform">
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={cn("object-cover", imageClassName)} />
      </motion.div>
    </div>
  );
}
