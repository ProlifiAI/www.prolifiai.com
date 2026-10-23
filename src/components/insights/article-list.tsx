"use client";

import { useMemo, useState, type ReactNode } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";

/**
 * Article listing with a simple search box. The full list is rendered on the
 * server (search engines and no-JavaScript visitors see every card); typing
 * filters the cards in place by title, summary and category.
 */
export function ArticleList({
  items,
  className,
}: {
  items: { key: string; text: string; node: ReactNode }[];
  className?: string;
}) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const shown = useMemo(() => (q ? items.filter((i) => i.text.toLowerCase().includes(q)) : items), [items, q]);

  return (
    <div className={className}>
      <div role="search" className="relative max-w-md">
        <label htmlFor="insights-search" className="sr-only">
          Search insights
        </label>
        <MagnifyingGlass size={18} aria-hidden className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted" />
        <input
          id="insights-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search insights"
          className="h-12 w-full rounded-full bg-surface pl-11 pr-4 text-[0.95rem] text-ink ring-1 ring-inset ring-line-strong placeholder:text-ink-muted/70 focus:outline-none focus:ring-[1.5px] focus:ring-heading"
        />
      </div>
      <p aria-live="polite" className="sr-only">
        {q ? `${shown.length} ${shown.length === 1 ? "article" : "articles"} found` : ""}
      </p>
      {shown.length > 0 ? (
        <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((i) => (
            <li key={i.key}>{i.node}</li>
          ))}
        </ul>
      ) : (
        <p className="mt-8 rounded-panel bg-surface p-8 text-ink-muted ring-1 ring-line">
          No articles match &ldquo;{query}&rdquo; yet. Try another word, or browse the categories above.
        </p>
      )}
    </div>
  );
}
