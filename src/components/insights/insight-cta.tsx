import type { Category } from "@/content/insights/types";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/button";

/**
 * The category's contextual next step. `inline` sits inside the article body
 * as a quiet aside; `panel` closes the article.
 */
export function InsightCta({ category, variant = "panel" }: { category: Category; variant?: "inline" | "panel" }) {
  const { heading, body, label, href } = category.cta;
  if (variant === "inline") {
    return (
      <aside aria-label="Related service" className="my-10 rounded-card border-l-4 border-accent bg-canvas-deep px-6 py-5">
        <p className="font-semibold text-heading">{heading}</p>
        <p className="mt-1 text-pretty text-[0.95rem] text-ink-muted">{body}</p>
        <a
          href={href}
          className="mt-3 inline-flex text-[0.95rem] font-medium text-heading underline decoration-accent decoration-2 underline-offset-4 hover:decoration-heading"
        >
          {label}
        </a>
      </aside>
    );
  }
  return (
    <aside aria-label="Work with Prolifi" className={cn("relative isolate overflow-hidden rounded-panel bg-inverse p-8 text-on-inverse md:p-10")}>
      <div aria-hidden className="bg-grid-inverse absolute inset-0 -z-10 opacity-50 [mask-image:radial-gradient(ellipse_70%_90%_at_100%_0%,black,transparent)]" />
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Work with Prolifi AI</p>
      <p className="mt-3 max-w-[30ch] text-balance text-h3 font-semibold">{heading}</p>
      <p className="mt-3 max-w-[52ch] text-pretty text-on-inverse-muted">{body}</p>
      <ButtonLink href={href} variant="accent" className="mt-7">
        {label}
      </ButtonLink>
    </aside>
  );
}
