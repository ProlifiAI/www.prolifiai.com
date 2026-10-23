import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { articles, featuredArticle, pageCount, pageOf } from "@/content/insights";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections";
import { CategoryNav } from "@/components/insights/category-nav";
import { ArticleGrid, Pagination } from "@/components/insights/listing";

/**
 * /insights/page/2 and onwards. Only generated once there are more articles
 * than fit on the first page; every other number returns 404.
 */
const rest = () => articles.filter((a) => a.slug !== featuredArticle()?.slug);

export const dynamicParams = false;

export function generateStaticParams() {
  const total = pageCount(rest());
  return Array.from({ length: Math.max(0, total - 1) }, (_, i) => ({ page: String(i + 2) }));
}

type Props = { params: Promise<{ page: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { page } = await params;
  return pageMetadata({
    title: `Insights, page ${page} | Prolifi AI`,
    description: `More practical articles on websites, AI, design, product ideas and search visibility from Prolifi AI. Page ${page}.`,
    path: `/insights/page/${page}`,
  });
}

export default async function InsightsPageN({ params }: Props) {
  const n = Number((await params).page);
  const list = rest();
  const total = pageCount(list);
  if (!Number.isInteger(n) || n < 2 || n > total) notFound();

  return (
    <>
      <PageHero eyebrow="Prolifi Insights" title={`More insights, page ${n}`} intro="Practical, honest advice on websites, AI, design and product ideas." />
      <section className="bg-canvas py-16 md:py-24">
        <div className="container-page">
          <CategoryNav />
          <div className="mt-12">
            <ArticleGrid list={pageOf(list, n)} />
            <Pagination base="/insights" current={n} total={total} />
          </div>
        </div>
      </section>
    </>
  );
}
