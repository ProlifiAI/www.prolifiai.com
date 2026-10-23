import Link from "next/link";

import type { Article } from "@/content/insights/types";
import { categories } from "@/content/insights/categories";
import { articlesIn, plain } from "@/content/insights";
import { cn } from "@/lib/utils";
import { ArticleCard } from "@/components/insights/article-card";
import { ArticleList } from "@/components/insights/article-list";

/** Searchable card grid for a set of articles */
export function ArticleGrid({ list }: { list: Article[] }) {
  const cat = (id: Article["category"]) => categories.find((c) => c.id === id)!.name;
  return (
    <ArticleList
      items={list.map((a) => ({
        key: a.slug,
        text: `${a.title} ${plain(a.description)} ${cat(a.category)}`,
        node: <ArticleCard article={a} />,
      }))}
    />
  );
}

/** Numbered page links; page 1 is /insights (or the category root) */
export function Pagination({ base, current, total }: { base: string; current: number; total: number }) {
  if (total <= 1) return null;
  const href = (n: number) => (n === 1 ? base : `${base}/page/${n}`);
  return (
    <nav aria-label="Pages" className="mt-12 flex items-center justify-center gap-2">
      {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
        <Link
          key={n}
          href={href(n)}
          aria-current={n === current ? "page" : undefined}
          className={cn(
            "flex size-11 items-center justify-center rounded-full text-sm font-semibold",
            n === current ? "bg-inverse text-on-inverse" : "bg-surface text-heading ring-1 ring-inset ring-line hover:ring-heading/30"
          )}
        >
          {n}
        </Link>
      ))}
    </nav>
  );
}

/** The six categories as cards: active ones link to their page, the rest show they are coming */
export function CategoryOverview({ exclude }: { exclude?: string }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {categories
        .filter((c) => c.id !== exclude)
        .map((c) => {
          const count = articlesIn(c.id).length;
          const inner = (
            <>
              <p className="text-lg font-semibold text-heading">{c.name}</p>
              <p className="mt-2 text-pretty text-[0.95rem] text-ink-muted">{c.short}</p>
              <p className="mt-4 text-sm font-medium text-accent-strong">
                {count > 0 ? `${count} ${count === 1 ? "article" : "articles"}` : "First articles coming soon"}
              </p>
            </>
          );
          return (
            <li key={c.id}>
              {count > 0 ? (
                <Link
                  href={`/insights/category/${c.slug}`}
                  className="block h-full rounded-panel bg-surface p-6 ring-1 ring-line transition-[transform,box-shadow] duration-300 ease-[var(--ease-reveal)] hover:-translate-y-1 hover:shadow-lift"
                >
                  {inner}
                </Link>
              ) : (
                <div className="h-full rounded-panel bg-surface/60 p-6 ring-1 ring-line/70">{inner}</div>
              )}
            </li>
          );
        })}
    </ul>
  );
}
