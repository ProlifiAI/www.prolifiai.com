import Link from "next/link";

import { activeCategories, categories } from "@/content/insights";
import { cn } from "@/lib/utils";

/**
 * Category navigation. Categories without articles yet are shown (so readers
 * see the full editorial scope) but are not links, so there are never empty
 * category pages.
 */
export function CategoryNav({ current }: { current?: string }) {
  const active = new Set(activeCategories().map((c) => c.id));
  const pill = "inline-flex min-h-10 items-center rounded-full px-4 text-sm font-medium transition-colors";
  return (
    <nav aria-label="Insight categories">
      <ul className="flex flex-wrap gap-2">
        <li>
          <Link
            href="/insights"
            aria-current={!current ? "page" : undefined}
            className={cn(pill, !current ? "bg-inverse text-on-inverse" : "bg-surface text-heading ring-1 ring-inset ring-line hover:ring-heading/30")}
          >
            All insights
          </Link>
        </li>
        {categories.map((c) => (
          <li key={c.id}>
            {active.has(c.id) ? (
              <Link
                href={`/insights/category/${c.slug}`}
                aria-current={current === c.id ? "page" : undefined}
                className={cn(pill, current === c.id ? "bg-inverse text-on-inverse" : "bg-surface text-heading ring-1 ring-inset ring-line hover:ring-heading/30")}
              >
                {c.name}
              </Link>
            ) : (
              <span className={cn(pill, "cursor-default text-ink-muted/80 ring-1 ring-inset ring-line/70")}>
                {c.name}
                <span className="ml-2 rounded-full bg-canvas-deep px-2 py-0.5 text-[0.7rem] font-semibold uppercase tracking-[0.08em]">Soon</span>
              </span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
