import type { Metadata } from "next";

import { site, siteUrl } from "@/content/site";

/**
 * Per-page metadata with a matching canonical URL, Open Graph and Twitter
 * card. Each route also has its own opengraph-image.tsx, which Next.js adds
 * to the og:image / twitter:image tags automatically.
 *
 * `title` is the full title shown in search results (no template), so each
 * page can be written for its own search intent.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: `/${string}`;
}): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_AU",
      title,
      description,
      url: path,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

/**
 * Organization + WebSite structured data. Only facts that appear on the site:
 * no address, ratings or reviews. Social profiles are added only once real
 * URLs exist in content/site.ts.
 */
export function siteJsonLd(sameAs: string[]) {
  const org = {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: site.name,
    alternateName: site.alternateName,
    url: `${siteUrl}/`,
    logo: `${siteUrl}/brand/prolifi-logo.png`,
    description: site.description,
    email: site.enquiryEmail,
    ...(sameAs.length ? { sameAs } : {}),
  };
  const website = {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: site.name,
    url: `${siteUrl}/`,
    inLanguage: "en-AU",
    publisher: { "@id": `${siteUrl}/#organization` },
  };
  return { "@context": "https://schema.org", "@graph": [org, website] };
}

/** BreadcrumbList structured data, from root to the current page */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}

/**
 * BlogPosting structured data. Author is the Prolifi AI organisation unless an
 * article names a verified person. No ratings or invented fields.
 */
export function articleJsonLd(a: {
  slug: string;
  title: string;
  description: string;
  published: string;
  updated?: string;
  section: string;
  keywords: string[];
  author?: { name: string; url?: string };
}) {
  const url = `${siteUrl}/insights/${a.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: a.title,
    description: a.description,
    image: `${url}/opengraph-image`,
    datePublished: a.published,
    dateModified: a.updated ?? a.published,
    articleSection: a.section,
    keywords: a.keywords.join(", "),
    inLanguage: "en-AU",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    author: a.author
      ? { "@type": "Person", name: a.author.name, ...(a.author.url ? { url: a.author.url } : {}) }
      : { "@type": "Organization", name: site.name, url: `${siteUrl}/` },
    publisher: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: site.name,
      logo: { "@type": "ImageObject", url: `${siteUrl}/brand/prolifi-logo.png` },
    },
  };
}
