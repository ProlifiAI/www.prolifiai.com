/**
 * Site-wide content and settings. Everything the Prolifi team may want to
 * edit lives in /src/content.
 *
 * Honesty rule for this folder: content taken from the existing Prolifi
 * design (assets/references/prolifi-current.png) or from the project brief
 * can be published. Claims that could not be verified (testimonials, client
 * projects, metrics, guarantees) are kept with `approved: false` and are NOT
 * rendered until someone at Prolifi confirms them.
 */

/**
 * The one canonical domain. Every other host (prolifiai.com, http://) 308-redirects
 * here at Vercel, and canonical URLs, Open Graph URLs and the sitemap all use it.
 */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.prolifiai.com").replace(/\/$/, "");

export const site = {
  name: "Prolifi AI",
  alternateName: "Prolifi",
  title: "Prolifi AI | Websites, MVPs & AI for Australian & NZ Businesses",
  shortTitle: "Prolifi",
  description:
    "Premium websites, MVP development and practical AI setup for Australian and New Zealand businesses. Decide what is worth building, then build it to win customers.",
  /** Short line under the logo in the footer */
  tagline:
    "Prolifi AI helps businesses across Australia and New Zealand decide what is worth building, then builds it properly: websites, products and AI that win customers.",
  /** Where website enquiries are delivered (server-side only; see /api/contact) */
  enquiryEmail: "info@prolifiai.com",
  /** Optional public address shown on the contact page and as a fallback when delivery fails. */
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
] as const;

/**
 * One label per intent, used everywhere on the site.
 * The previous design used "Let's Work Together", "Send Us A Message",
 * "Get Started" and "Let's Talk" for the same intent.
 */
export const ctas = {
  contact: { label: "Start a Project", href: "/contact" },
  services: { label: "Explore Our Services", href: "/services" },
  pricing: { label: "See Pricing", href: "/pricing" },
} as const;

/**
 * Replacement labels revealed when a button is hovered or focused. Each says
 * the same thing as the button in other words, so the button never promises
 * a different action. Buttons not listed here roll their own label.
 */
export const hoverLabels: Record<string, string> = {
  "Start a Project": "Let's Begin",
  "Explore Our Services": "Discover Services",
  "See Pricing": "Compare Packages",
  "Let's Work Together": "Start a Project",
  "Request a Quote": "Tell Us What You Need",
  "Back to Home": "Go Home",
  "Start with Starter": "Choose Starter",
  "Choose Professional": "Go Professional",
  "Contact Us": "Let's Talk",
  "Send Message": "Send to Prolifi",
};

/**
 * Social profiles. The existing design shows Instagram and podcast icons in
 * the footer and LinkedIn/Instagram/email icons on team cards, but no URLs.
 * Entries with an empty href are not rendered (no dead links).
 */
export const socials: { label: "LinkedIn" | "Instagram" | "Facebook" | "X"; href: string }[] = [
  { label: "LinkedIn", href: "" },
  { label: "Instagram", href: "" },
  { label: "Facebook", href: "" },
  { label: "X", href: "" },
];

/**
 * Legal line for the footer. The existing design contains placeholder text
 * ("Registered in England & Wales. Company No. 00000000"). Add the real
 * registration details here; an empty string hides the line.
 */
export const legalLine = "";
