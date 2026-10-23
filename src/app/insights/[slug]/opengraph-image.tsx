import { ogSize, renderOgImage } from "@/lib/og";
import { articles, getArticle } from "@/content/insights";
import { categoryById } from "@/content/insights/categories";

export const alt = "Prolifi Insights article";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

/** Share image per article: headline split at the colon, category as the eyebrow */
export default async function OpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const article = getArticle((await params).slug)!;
  const [line1, ...rest] = article.title.split(":");
  return renderOgImage({
    eyebrow: "Insights",
    line1: rest.length ? `${line1}:` : line1,
    line2: rest.join(":").trim() || " ",
    footer: categoryById(article.category).name,
  });
}
