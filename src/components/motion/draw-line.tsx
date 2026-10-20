"use client";

import { motion } from "motion/react";

import { ease } from "@/lib/motion";

/** A hairline that draws itself from the left when it scrolls into view (transform only). */
export function DrawLine({ className }: { className?: string }) {
  return (
    <motion.span
      aria-hidden
      className={className}
      style={{ originX: 0 }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 1.1, ease: ease.reveal }}
    />
  );
}
