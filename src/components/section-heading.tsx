import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/blur-fade";
import { DropText } from "@/components/motion/drop-text";

/**
 * Standard section heading. Reveals in order: eyebrow, then the heading
 * (the signature character drop for plain-text titles, a blur-to-sharp
 * otherwise), then the supporting copy.
 * Eyebrows are rationed (roughly one per three sections).
 */
export function SectionHeading({
  eyebrow,
  title,
  body,
  tone = "default",
  align = "left",
  as: Tag = "h2",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  body?: ReactNode;
  tone?: "default" | "inverse";
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
}) {
  const inverse = tone === "inverse";
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <Reveal inView>
          <p
            className={cn(
              "mb-5 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-label font-semibold uppercase",
              inverse ? "glass-surface text-accent" : "bg-accent/15 text-accent-strong"
            )}
          >
            {eyebrow}
          </p>
        </Reveal>
      )}
      {typeof title === "string" ? (
        <DropText
          as={Tag}
          text={title}
          delay={eyebrow ? 0.08 : 0}
          className={cn("block text-balance text-h2 font-semibold", inverse ? "text-on-inverse" : "text-heading")}
        />
      ) : (
        <Reveal inView variant="blur-up" delay={eyebrow ? 0.08 : 0}>
          <Tag className={cn("text-balance text-h2 font-semibold", inverse ? "text-on-inverse" : "text-heading")}>
            {title}
          </Tag>
        </Reveal>
      )}
      {body && (
        <Reveal inView delay={eyebrow ? 0.18 : 0.1}>
          <p
            className={cn(
              "mt-5 max-w-[60ch] text-pretty text-lead",
              align === "center" && "mx-auto",
              inverse ? "text-on-inverse-muted" : "text-ink-muted"
            )}
          >
            {body}
          </p>
        </Reveal>
      )}
    </div>
  );
}
