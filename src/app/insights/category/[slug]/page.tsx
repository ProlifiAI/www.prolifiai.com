import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { activeCategories, articlesIn } from "@/content/insights";
import { categoryBySlug } from "@/content/insights/categories";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { CtaBand, PageHero } from "@/components/sections";
import { JsonLd } from "@/components/json-ld";
import { CategoryNav } from "@/components/insights/category-nav";
import { ArticleGrid, CategoryOverview } from "@/components/insights/listing";

/** Only categories with at least one article get a page; the rest return 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return activeCategories().map((c) => ({ slug: c.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = categoryBySlug((await params).slug);
  if (!category) return {};
  return pageMetadata({ title: category.seoTitle, description: category.metaDescription, path: `/insights/category/${category.slug}` });
}

export default async function CategoryPage({ params }: Props) {
  const category = categoryBySlug((await params).slug);
  if (!category) notFound();
  const list = articlesIn(category.id);
  if (list.length === 0) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Insights", path: "/insights" },
          { name: category.name, path: `/insights/category/${category.slug}` },
        ])}
      />
      <PageHero eyebrow="Prolifi Insights" title={category.name} intro={category.description} />

      <section className="bg-canvas py-16 md:py-24">
        <div className="container-page">
          <CategoryNav current={category.id} />
          <h2 className="mt-12 text-h3 font-semibold text-heading">
            {list.length} {list.length === 1 ? "article" : "articles"} in {category.name}
          </h2>
          <ArticleGrid list={list} />
        </div>
      </section>

      <section aria-labelledby="other-categories" className="border-t border-line bg-surface py-20 md:py-24">
        <div className="container-page">
          <h2 id="other-categories" className="text-h3 font-semibold text-heading">
            Other subjects
          </h2>
          <div className="mt-8">
            <CategoryOverview exclude={category.id} />
          </div>
        </div>
      </section>

      <CtaBand title={category.cta.heading} body={category.cta.body} />
    </>
  );
}
