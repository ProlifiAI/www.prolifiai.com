import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import "./globals.css";
import { site, siteUrl, socials } from "@/content/site";
import { siteJsonLd } from "@/lib/seo";
import { Providers } from "@/components/providers";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

/**
 * Site-wide defaults. Each page sets its own title, description, canonical
 * and Open Graph tags through pageMetadata() in src/lib/seo.ts.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: site.title, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.title,
    description: site.description,
    url: "/",
    locale: "en_AU",
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
  // Google Search Console HTML-tag verification, only when a real token is configured
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export const viewport: Viewport = {
  themeColor: "#0e3062",
};

const jsonLd = siteJsonLd(socials.map((s) => s.href).filter(Boolean));

/**
 * Runs before first paint. Marks that JavaScript is available (scroll-triggered
 * text may then start hidden) and decides whether the brand intro plays: only
 * on the first page of a browser session, never for reduced-motion visitors.
 * Without JavaScript there is no intro and all text is simply visible.
 */
const bootScript = `(function(){var d=document.documentElement;d.classList.add("js");try{if(!sessionStorage.getItem("prolifi-intro")&&!matchMedia("(prefers-reduced-motion: reduce)").matches){d.classList.add("intro-play");sessionStorage.setItem("prolifi-intro","1")}}catch(e){}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-AU"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      // The boot script adds classes before React hydrates
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="min-h-dvh antialiased">
        {/* Brand intro: shown by CSS only when html.intro-play is set, then slides away.
            It never blocks clicks and the page loads underneath it. */}
        <div aria-hidden className="intro">
          <span className="intro-logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/prolifi-logo.png" alt="" width={1470} height={261} className="h-10 w-auto md:h-14" />
          </span>
        </div>
        {/* Entrance animations start at opacity 0; keep content visible without JavaScript */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important;filter:none!important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          // Static, build-time data from src/content; "<" is escaped so it can never close the tag
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <a
          href="#main"
          className="sr-only z-50 rounded-full bg-inverse px-5 py-3 text-on-inverse focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Providers>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
