import type { Article } from "@/content/insights/types";
import { categoryById } from "@/content/insights/categories";
import { cn } from "@/lib/utils";

/**
 * Typographic cover for an article: the brand's navy panel, blueprint grid
 * and a yellow accent, with the category and headline set as the artwork.
 * Drawn in CSS so every article has a consistent, sharp cover without stock
 * photography. Decorative: the headline is always present as real text nearby.
 */
export function ArticleCover({ article, size = "card", className }: { article: Article; size?: "card" | "feature" | "hero"; className?: string }) {
  const category = categoryById(article.category);
  return (
    <div
      aria-hidden
      className={cn(
        "relative isolate flex overflow-hidden bg-inverse text-on-inverse",
        size === "hero" ? "aspect-[16/7] rounded-panel" : size === "feature" ? "aspect-[16/10] rounded-[1.4rem]" : "aspect-[16/10] rounded-[1.1rem]",
        className
      )}
    >
      <div className="bg-grid-inverse absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(ellipse_80%_80%_at_80%_20%,black,transparent)]" />
      <div className="absolute -right-[12%] -top-[30%] -z-10 size-[70%] rounded-full bg-[radial-gradient(closest-side,rgb(57_120_232/0.35),transparent)]" />
      <div
        className={cn(
          "mt-auto flex w-full flex-col",
          size === "hero" ? "gap-4 p-8 md:p-12" : size === "feature" ? "gap-3 p-7 md:p-9" : "gap-2 p-5"
        )}
      >
        <span className="h-1 w-10 rounded-full bg-accent" />
        <span className={cn("font-semibold uppercase tracking-[0.16em] text-accent", size === "card" ? "text-[0.6rem]" : "text-label")}>
          {category.name}
        </span>
        <span
          className={cn(
            "max-w-[22ch] text-balance font-semibold leading-[1.05] tracking-[-0.03em]",
            size === "hero" ? "text-[clamp(1.6rem,3.4vw,2.8rem)]" : size === "feature" ? "text-[clamp(1.35rem,2.4vw,2rem)]" : "text-lg"
          )}
        >
          {article.title.split(":")[0]}
        </span>
      </div>
    </div>
  );
}
