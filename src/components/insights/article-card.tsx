import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

import type { Article } from "@/content/insights/types";
import { categoryById } from "@/content/insights/categories";
import { formatDate, readingMinutes } from "@/content/insights";
import { cn } from "@/lib/utils";
import { ArticleCover } from "@/components/insights/article-cover";

/** Article summary for listings. `feature` is the large lead article on the Insights page. */
export function ArticleCard({ article, feature = false, headingLevel = "h3" }: { article: Article; feature?: boolean; headingLevel?: "h2" | "h3" }) {
  const category = categoryById(article.category);
  const Heading = headingLevel;
  return (
    <article
      className={cn(
        "group relative h-full rounded-panel bg-surface p-2 ring-1 ring-line transition-[transform,box-shadow] duration-300 ease-[var(--ease-reveal)] hover:-translate-y-1 hover:shadow-lift focus-within:shadow-lift",
        feature && "grid gap-2 md:grid-cols-12 md:items-center"
      )}
    >
      <div className={cn(feature && "md:col-span-7")}>
        <ArticleCover article={article} size={feature ? "feature" : "card"} />
      </div>
      <div className={cn("flex flex-col p-5", feature ? "md:col-span-5 md:p-8" : "")}>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-strong">{category.name}</p>
        <Heading className={cn("mt-3 text-balance font-semibold text-heading", feature ? "text-h3 md:text-[1.9rem] md:leading-tight" : "text-xl leading-snug")}>
          {/* The whole card is clickable through this link's stretched hit area */}
          <Link href={`/insights/${article.slug}`} className="outline-none after:absolute after:inset-0 after:rounded-panel focus-visible:after:ring-2 focus-visible:after:ring-focus">
            {article.title}
          </Link>
        </Heading>
        <p className={cn("mt-3 text-pretty text-ink-muted", feature ? "text-lead" : "text-[0.95rem]")}>{article.description}</p>
        <p className="mt-5 flex items-center gap-2 text-sm text-ink-muted">
          <time dateTime={article.published}>{formatDate(article.published)}</time>
          <span aria-hidden>·</span>
          <span>{readingMinutes(article)} min read</span>
          <ArrowRight
            size={16}
            weight="bold"
            aria-hidden
            className="ml-auto text-heading transition-transform duration-300 group-hover:translate-x-1"
          />
        </p>
      </div>
    </article>
  );
}
