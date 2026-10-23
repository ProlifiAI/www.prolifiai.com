import type { Article, Block, CategoryId } from "@/content/insights/types";
import { categories, categoryById } from "@/content/insights/categories";
import { subjectiveNatureOfDesign } from "@/content/insights/articles/subjective-nature-of-design";

/**
 * Prolifi Insights registry. To publish an article:
 *   1. add a file in ./articles exporting an Article
 *   2. add it to the list below
 * Listings, category pages, related articles, the sitemap and structured data
 * all update automatically.
 */
const all: Article[] = [subjectiveNatureOfDesign];

export { categories, categoryById };
export type { Article, Block, CategoryId };

/** Articles per listing page */
export const PAGE_SIZE = 9;

/** Newest first */
export const articles = [...all].sort((a, b) => b.published.localeCompare(a.published));

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);

export const articlesIn = (category: CategoryId) => articles.filter((a) => a.category === category);

/** Categories that have at least one article: the only ones that get their own page */
export const activeCategories = () => categories.filter((c) => articlesIn(c.id).length > 0);

export const featuredArticle = () => articles.find((a) => a.featured) ?? articles[0];

/** Plain text of an inline-formatted string */
export const plain = (text: string) =>
  text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\*([^*]+)\*/g, "$1");

function blockText(b: Block): string {
  switch (b.type) {
    case "p":
    case "h2":
    case "h3":
    case "quote":
      return b.text;
    case "ul":
    case "ol":
      return b.items.join(" ");
    case "callout":
      return [b.title, b.text ?? "", ...(b.items ?? [])].join(" ");
    default:
      return "";
  }
}

/** Reading time at about 225 words a minute, rounded up */
export function readingMinutes(article: Article) {
  const words = plain(article.body.map(blockText).join(" ")).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 225));
}

/** Table of contents from the article's H2 sections */
export const tableOfContents = (article: Article) =>
  article.body.filter((b): b is Extract<Block, { type: "h2" }> => b.type === "h2").map((b) => ({ id: b.id, text: b.text }));

/** Same category first, then the most recent others */
export function relatedArticles(article: Article, limit = 3) {
  const others = articles.filter((a) => a.slug !== article.slug);
  const same = others.filter((a) => a.category === article.category);
  const rest = others.filter((a) => a.category !== article.category);
  return [...same, ...rest].slice(0, limit);
}

export const pageCount = (list: Article[]) => Math.max(1, Math.ceil(list.length / PAGE_SIZE));
export const pageOf = (list: Article[], page: number) => list.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

/** "23 October 2026" */
export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("en-AU", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(iso));
