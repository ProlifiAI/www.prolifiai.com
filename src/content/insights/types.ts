/**
 * Content model for Prolifi Insights (the blog).
 *
 * Articles are typed data, rendered by one shared template, so publishing a
 * new article means adding one file to ./articles and registering it in
 * ./index.ts. No layout work, no CMS.
 *
 * Inline formatting inside text: **bold**, *italic* and [link text](/url).
 */

export type CategoryId = "websites" | "business-growth" | "ai-in-practice" | "design" | "ideas-validation" | "search-visibility";

export type Category = {
  id: CategoryId;
  /** URL segment: /insights/category/<slug> */
  slug: string;
  name: string;
  /** One line, used on cards and in navigation */
  short: string;
  /** Intro paragraph on the category page */
  description: string;
  seoTitle: string;
  metaDescription: string;
  /** Contextual call to action shown in this category's articles */
  cta: { heading: string; body: string; label: string; href: string };
};

export type Block =
  | { type: "p"; text: string }
  /** id becomes the anchor for the table of contents */
  | { type: "h2"; text: string; id: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string; cite?: string }
  /** A highlighted framework, checklist or key point */
  | { type: "callout"; title: string; text?: string; items?: string[] }
  /** The category's contextual call to action, placed where it reads naturally */
  | { type: "cta" }
  /** Numbered references for factual claims */
  | { type: "sources"; items: { label: string; href?: string }[] };

export type Article = {
  slug: string;
  title: string;
  /** Title for search results, if different from the headline (keep under 60 characters) */
  seoTitle?: string;
  /** Meta description and card excerpt (150-160 characters) */
  description: string;
  /** The standfirst under the headline */
  standfirst: string;
  category: CategoryId;
  /** ISO dates. Only real publication and update dates. */
  published: string;
  updated?: string;
  /**
   * Author, by name from the team in src/content/company.ts (verified people
   * only). Omit to credit the Prolifi AI organisation.
   */
  author?: string;
  /** The primary search topic and supporting terms (from docs/content/editorial-plan.md) */
  keywords: string[];
  featured?: boolean;
  body: Block[];
};
