import type { Metadata } from "next";

import { articles, featuredArticle, pageCount, pageOf } from "@/content/insights";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { CtaBand, PageHero } from "@/components/sections";
import { SectionHeading } from "@/components/section-heading";
import { JsonLd } from "@/components/json-ld";
import { CategoryNav } from "@/components/insights/category-nav";
import { ArticleCard } from "@/components/insights/article-card";
import { ArticleGrid, CategoryOverview, Pagination } from "@/components/insights/listing";

export const metadata: Metadata = pageMetadata({
  title: "Insights: Websites, AI, Design & Product Ideas | Prolifi AI",
  description:
    "Practical, honest advice for business owners and founders on websites, AI tools, design decisions, product validation and being found online.",
  path: "/insights",
});

export default function InsightsPage() {
  const lead = featuredArticle();
  const rest = articles.filter((a) => a.slug !== lead?.slug);
  const total = pageCount(rest);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Insights", path: "/insights" }])} />
      <PageHero
        video="insights"
        eyebrow="Prolifi Insights"
        title="Insights for better digital decisions"
        intro="Practical, honest advice on websites, AI, design and product ideas. Written to help you understand the problem, make a better decision and take the right next step."
      />

      <section aria-labelledby="latest-title" className="bg-canvas py-16 md:py-24">
        <div className="container-page">
          <CategoryNav />

          {lead && (
            <div className="mt-12">
              <h2 id="latest-title" className="sr-only">
                Featured article
              </h2>
              <ArticleCard article={lead} feature headingLevel="h3" />
            </div>
          )}

          {rest.length > 0 && (
            <div className="mt-16">
              <h2 className="text-h3 font-semibold text-heading">More insights</h2>
              <ArticleGrid list={pageOf(rest, 1)} />
              <Pagination base="/insights" current={1} total={total} />
            </div>
          )}
        </div>
      </section>

      <section className="border-t border-line bg-surface py-20 md:py-28">
        <div className="container-page">
          <SectionHeading
            title="Six subjects, one goal"
            body="Every article sits in one of six categories, each tied to a decision our clients face. Better decisions first, then the right work."
          />
          <div className="mt-12">
            <CategoryOverview />
          </div>
        </div>
      </section>

      <CtaBand
        title="Working through one of these decisions?"
        body="Tell us what you are trying to figure out. We will recommend a sensible starting point, then put the scope and price in writing."
      />
    </>
  );
}
