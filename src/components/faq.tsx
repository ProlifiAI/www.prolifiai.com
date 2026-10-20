"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "@phosphor-icons/react";

import type { Faq } from "@/content/company";
import { cn } from "@/lib/utils";

/**
 * Accessible accordion: real <button>s with aria-expanded / aria-controls,
 * one item open at a time. Height animates with Motion; reduced-motion users
 * get an instant change through the global MotionConfig.
 */
export function FaqList({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <ul className="divide-y divide-line border-y border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        const buttonId = `${baseId}-q-${i}`;
        const panelId = `${baseId}-a-${i}`;
        return (
          <li key={item.q}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-medium text-heading transition-colors hover:text-brand"
              >
                <span className="text-pretty">{item.q}</span>
                <span
                  aria-hidden
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-full ring-1 ring-inset transition-[transform,background-color,color] duration-300 ease-[var(--ease-out-expo)]",
                    isOpen ? "rotate-45 bg-inverse text-accent ring-inverse" : "text-heading ring-line-strong"
                  )}
                >
                  <Plus size={16} weight="bold" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-[62ch] pb-6 pr-12 text-pretty text-ink-muted">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
