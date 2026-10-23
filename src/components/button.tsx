import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { ComponentProps, ReactNode } from "react";

import { hoverLabels } from "@/content/site";
import { RollText } from "@/components/motion/drop-text";
import { cn } from "@/lib/utils";

type Variant = "primary" | "accent" | "outline" | "inverse" | "outline-inverse";

/**
 * Pill button with the Prolifi arrow "puck".
 *
 * Hover / keyboard focus, one coordinated reveal (same duration and easing
 * for every part, --duration-button-reveal / --ease-button):
 *   1. a circular colour layer rises from below the button and covers it
 *   2. the label rolls up and out while a replacement label rolls in on the
 *      new colour (see `hoverLabels` in content/site.ts)
 *   3. the right-pointing arrow rolls out and its twin rolls in with the label
 *
 * Both labels share one grid cell, so the button is sized to the longer one
 * and nothing shifts. The replacement label is aria-hidden: the accessible
 * name is always the visible default label. The colour ball is clipped by the
 * button's own overflow-hidden pill. Tailwind v4 applies hover styles only on
 * devices that can hover, so touch screens never get a stuck state; keyboard
 * focus triggers the same reveal plus a visible focus ring. Reduced motion:
 * the parts swap instantly without moving.
 */
const base =
  "group/btn relative isolate inline-flex min-h-12 shrink-0 items-center gap-3 overflow-hidden whitespace-nowrap rounded-full py-1.5 pl-6 pr-1.5 text-[0.95rem] font-medium tracking-[-0.01em] transition-[transform,box-shadow] duration-[var(--duration-button)] ease-[var(--ease-reveal)] hover:scale-[1.025] active:scale-[0.98] motion-reduce:hover:scale-100 focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-focus";

const reveal = "duration-[var(--duration-button-reveal)] ease-[var(--ease-button)] motion-reduce:transition-none";

const variants: Record<Variant, { root: string; ball: string; hoverText: string; puck: string }> = {
  primary: {
    root: "bg-inverse text-on-inverse shadow-[0_10px_24px_-12px_rgb(14_48_98/0.6)]",
    ball: "bg-accent",
    hoverText: "text-on-accent",
    puck: "bg-accent text-on-accent group-hover/btn:bg-inverse group-hover/btn:text-accent group-focus-visible/btn:bg-inverse group-focus-visible/btn:text-accent",
  },
  accent: {
    root: "bg-accent text-on-accent shadow-[inset_0_1px_0_rgb(255_255_255/0.45),0_10px_24px_-12px_rgb(244_196_48/0.7)]",
    ball: "bg-inverse",
    hoverText: "text-on-inverse",
    puck: "bg-inverse text-accent group-hover/btn:bg-accent group-hover/btn:text-on-accent group-focus-visible/btn:bg-accent group-focus-visible/btn:text-on-accent",
  },
  outline: {
    root: "text-heading ring-1 ring-inset ring-line-strong hover:ring-inverse focus-visible:ring-inverse",
    ball: "bg-inverse",
    hoverText: "text-on-inverse",
    puck: "bg-inverse/[0.07] text-heading group-hover/btn:bg-accent group-hover/btn:text-on-accent group-focus-visible/btn:bg-accent group-focus-visible/btn:text-on-accent",
  },
  inverse: {
    root: "bg-surface text-heading shadow-[0_10px_24px_-12px_rgb(0_0_0/0.5)]",
    ball: "bg-accent",
    hoverText: "text-on-accent",
    puck: "bg-accent text-on-accent group-hover/btn:bg-inverse group-hover/btn:text-accent group-focus-visible/btn:bg-inverse group-focus-visible/btn:text-accent",
  },
  "outline-inverse": {
    root: "text-on-inverse ring-1 ring-inset ring-white/30 hover:ring-white focus-visible:ring-white",
    ball: "bg-surface",
    hoverText: "text-heading",
    puck: "bg-white/12 text-on-inverse group-hover/btn:bg-inverse group-hover/btn:text-accent group-focus-visible/btn:bg-inverse group-focus-visible/btn:text-accent",
  },
};

/** The colour layer: a circle wider than the button, parked just below it, that rises to its centre. */
function Ball({ className, forceUp }: { className: string; forceUp?: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute left-1/2 top-1/2 -z-10 aspect-square w-[calc(100%+3rem)] rounded-full transition-[translate]",
        forceUp
          ? "[translate:-50%_-50%]"
          : "[translate:-50%_1.75rem] group-hover/btn:[translate:-50%_-50%] group-focus-visible/btn:[translate:-50%_-50%]",
        reveal,
        className
      )}
    />
  );
}

/** Default label rolls up and out; the replacement rolls in from below, in the same cell. */
function RollingLabel({ label, hoverLabel, hoverText }: { label: ReactNode; hoverLabel: ReactNode; hoverText: string }) {
  return (
    <span className="relative grid justify-items-start overflow-hidden py-0.5 [&>*]:[grid-area:1/1]">
      <span
        className={cn(
          "transition-transform group-hover/btn:-translate-y-[130%] group-focus-visible/btn:-translate-y-[130%]",
          reveal
        )}
      >
        {label}
      </span>
      <span
        aria-hidden
        className={cn(
          "translate-y-[130%] transition-transform group-hover/btn:translate-y-0 group-focus-visible/btn:translate-y-0",
          reveal,
          hoverText
        )}
      >
        {hoverLabel}
      </span>
    </span>
  );
}

function Puck({ className }: { className: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full transition-colors",
        reveal,
        className
      )}
    >
      {/* Arrows point straight right; the visible one rolls up and out as its twin rolls in with the new label */}
      <ArrowRight
        size={16}
        weight="bold"
        className={cn("transition-transform group-hover/btn:-translate-y-7 group-focus-visible/btn:-translate-y-7", reveal)}
      />
      <ArrowRight
        size={16}
        weight="bold"
        className={cn(
          "absolute translate-y-7 transition-transform group-hover/btn:translate-y-0 group-focus-visible/btn:translate-y-0",
          reveal
        )}
      />
    </span>
  );
}

/** The replacement label: explicit prop, else the shared table, else the same words. */
function resolveHoverLabel(children: ReactNode, hoverLabel?: ReactNode) {
  if (hoverLabel) return hoverLabel;
  if (typeof children === "string" && hoverLabels[children]) return hoverLabels[children];
  return children;
}

type LinkButtonProps = {
  href: string;
  variant?: Variant;
  children: ReactNode;
  /** Text revealed on hover/focus. Must describe the same action as `children`. */
  hoverLabel?: ReactNode;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

export function ButtonLink({ href, variant = "primary", children, hoverLabel, className, ...rest }: LinkButtonProps) {
  const v = variants[variant];
  return (
    <Link href={href} className={cn(base, v.root, className)} {...rest}>
      <Ball className={v.ball} />
      <RollingLabel label={children} hoverLabel={resolveHoverLabel(children, hoverLabel)} hoverText={v.hoverText} />
      <Puck className={v.puck} />
    </Link>
  );
}

type SubmitButtonProps = {
  children: ReactNode;
  hoverLabel?: ReactNode;
  pending?: boolean;
  className?: string;
};

export function SubmitButton({ children, hoverLabel, pending, className }: SubmitButtonProps) {
  const v = variants.primary;
  return (
    <button
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      className={cn(base, v.root, "disabled:cursor-wait disabled:opacity-90 disabled:hover:scale-100", className)}
    >
      <Ball className={v.ball} forceUp={pending} />
      {pending ? (
        // While sending: settled on the yellow surface, no roll, a spinner in the puck
        <span className={cn("py-0.5", v.hoverText)}>{children}</span>
      ) : (
        <RollingLabel label={children} hoverLabel={resolveHoverLabel(children, hoverLabel)} hoverText={v.hoverText} />
      )}
      {pending ? (
        <span aria-hidden className="flex size-9 items-center justify-center rounded-full bg-inverse">
          <span className="size-4 animate-spin rounded-full border-2 border-accent/30 border-t-accent motion-reduce:animate-none" />
        </span>
      ) : (
        <Puck className={v.puck} />
      )}
    </button>
  );
}

/** Quiet text link with an arrow, for secondary navigation inside sections. */
export function TextLink({
  href,
  children,
  className,
  tone = "default",
}: {
  href: string;
  children: ReactNode;
  className?: string;
  tone?: "default" | "inverse";
}) {
  return (
    <Link
      href={href}
      className={cn(
        "roll-host group inline-flex items-center gap-1.5 bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-1 text-[0.95rem] font-medium transition-[background-size,color] duration-[var(--duration-button)] ease-[var(--ease-reveal)] hover:bg-[length:100%_1px]",
        tone === "default" ? "text-heading" : "text-on-inverse",
        "underline decoration-1 underline-offset-[6px] hover:no-underline",
        tone === "default" ? "decoration-line-strong" : "decoration-white/30",
        className
      )}
    >
      {/* Plain-text labels roll letter by letter on hover */}
      {typeof children === "string" ? <RollText text={children} /> : children}
      <ArrowRight
        size={14}
        weight="bold"
        aria-hidden
        className="transition-transform duration-[var(--duration-button)] ease-[var(--ease-reveal)] group-hover:translate-x-1"
      />
    </Link>
  );
}
