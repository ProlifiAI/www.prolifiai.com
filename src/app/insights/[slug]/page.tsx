import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";

import { articles, formatDate, getArticle, readingMinutes, relatedArticles, tableOfContents } from "@/content/insights";
import { categoryById } from "@/content/insights/categories";
import { site, siteUrl } from "@/content/site";
import { articleJsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { DropText } from "@/components/motion/drop-text";
import { Reveal } from "@/components/ui/blur-fade";
import { ArticleCover } from "@/components/insights/article-cover";
import { ArticleBody } from "@/components/insights/article-body";
import { ArticleCard } from "@/components/insights/article-card";
import { InsightCta } from "@/components/insights/insight-cta";
import { ShareLinks } from "@/components/insights/share-links";
import { AuthorCard } from "@/components/insights/author-card";
import { authorByName } from "@/content/insights/authors";

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticle((await params).slug);
  if (!article) return {};
  const base = pageMetadata({
    title: `${article.seoTitle ?? article.title} | Prolifi AI`,
    description: article.description,
    path: `/insights/${article.slug}`,
  });
  return {
    ...base,
    keywords: article.keywords,
    authors: [{ name: article.author ?? site.name }],
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: article.published,
      modifiedTime: article.updated ?? article.published,
      section: categoryById(article.category).name,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const article = getArticle((await params).slug);
  if (!article) notFound();

  const category = categoryById(article.category);
  const toc = tableOfContents(article);
  const related = relatedArticles(article);
  const url = `${siteUrl}/insights/${article.slug}`;
  const author = authorByName(article.author);

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          slug: article.slug,
          title: article.title,
          description: article.description,
          published: article.published,
          updated: article.updated,
          section: category.name,
          keywords: article.keywords,
          author: author && { name: author.name, jobTitle: author.role, profile: author.profile, photo: author.photo, sameAs: author.sameAs },
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Insights", path: "/insights" },
          { name: category.name, path: `/insights/category/${category.slug}` },
          { name: article.title, path: `/insights/${article.slug}` },
        ])}
      />

      <article className="bg-canvas pb-24 pt-[calc(var(--header-h)+2.5rem)] md:pb-32 md:pt-[calc(var(--header-h)+4rem)]">
        <header className="container-page">
          <nav aria-label="Breadcrumb" className="text-sm text-ink-muted">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/insights" className="hover:text-heading hover:underline">
                  Insights
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href={`/insights/category/${category.slug}`} className="hover:text-heading hover:underline">
                  {category.name}
                </Link>
              </li>
            </ol>
          </nav>

          <div className="mt-8 max-w-4xl">
            <DropText as="h1" text={article.title} mode="load" intro delay={0.05} className="block text-balance text-h1 font-semibold text-heading" />
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-[62ch] text-pretty text-lead text-ink-muted">{article.standfirst}</p>
              <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-muted">
                {author ? (
                  <span>
                    By{" "}
                    <Link href={author.profile} rel="author" className="font-medium text-heading underline decoration-line-strong underline-offset-4 hover:decoration-heading">
                      {author.name}
                    </Link>
                    , {author.role}
                  </span>
                ) : (
                  <span className="font-medium text-heading">{site.name}</span>
                )}
                <span aria-hidden>·</span>
                <span>
                  Published <time dateTime={article.published}>{formatDate(article.published)}</time>
                </span>
                {article.updated && article.updated !== article.published && (
                  <>
                    <span aria-hidden>·</span>
                    <span>
                      Updated <time dateTime={article.updated}>{formatDate(article.updated)}</time>
                    </span>
                  </>
                )}
                <span aria-hidden>·</span>
                <span>{readingMinutes(article)} min read</span>
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="mt-10 md:mt-14">
            <ArticleCover article={article} size="hero" />
          </Reveal>
        </header>

        <div className="container-page mt-12 grid gap-12 md:mt-16 lg:grid-cols-12 lg:gap-10">
          {toc.length > 2 && (
            <aside className="lg:col-span-3">
              <nav aria-labelledby="toc-title" className="rounded-panel bg-surface p-6 ring-1 ring-line lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]">
                <h2 id="toc-title" className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
                  In this article
                </h2>
                <ol className="mt-4 space-y-2.5 text-[0.95rem]">
                  {toc.map((t) => (
                    <li key={t.id}>
                      <a href={`#${t.id}`} className="block text-pretty leading-snug text-heading/80 hover:text-heading hover:underline">
                        {t.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>
          )}

          <div className={toc.length > 2 ? "lg:col-span-8 lg:col-start-5" : "lg:col-span-8 lg:col-start-3"}>
            <div className="max-w-[68ch]">
              <ArticleBody article={article} />

              <div className="mt-14 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-8">
                <ShareLinks url={url} title={article.title} />
                <Link href={`/insights/category/${category.slug}`} className="inline-flex items-center gap-2 text-sm font-medium text-heading hover:underline">
                  <ArrowLeft size={16} weight="bold" aria-hidden />
                  More in {category.name}
                </Link>
              </div>

              {author && (
                <div className="mt-12">
                  <AuthorCard author={author} />
                </div>
              )}

              <div className="mt-8">
                <InsightCta category={category} />
              </div>
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="border-t border-line bg-surface py-20 md:py-24">
          <div className="container-page">
            <h2 id="related-title" className="text-h3 font-semibold text-heading">
              Keep reading
            </h2>
            <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <ArticleCard article={r} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
