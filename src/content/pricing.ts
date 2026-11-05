/**
 * Pricing. Edit packages here; the home page preview, the pricing page and
 * the comparison table all read from this file.
 *
 * Prices in US dollars, as set by Prolifi: Standard $500, Premium $1,200,
 * Enterprise "Contact us" (renamed from Starter and Custom, 2026-10-25; Professional renamed
 * Premium and prices raised from $450 and $900, 2026-11-05). All one-off payments. Inclusions
 * and the comparison mapping are unchanged from the original design.
 *
 * NOT carried over from the old design, because they could not be verified:
 *   - "Money-back guarantee" and "30-day free trial" badges
 *   - "Upgrade or cancel anytime" (does not apply to one-off payments)
 *   - the stray ".65" cents shown next to each price
 *   - "Complete digital transformation solution" (too vague to be an inclusion)
 * Re-add any of these only once they are real policies.
 */

export const currency = {
  code: "USD",
  symbol: "$",
} as const;

export type Package = {
  id: string;
  name: string;
  /** Whole-dollar price, or null when quoted per project */
  price: number | null;
  billing: string;
  summary: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
};

export const websitePackages: Package[] = [
  {
    id: "standard",
    name: "Standard",
    price: 500,
    billing: "One-off payment",
    summary: "For small businesses starting their digital journey.",
    features: [
      "Responsive website design and development",
      "SEO-ready site structure",
      "1 round of revisions",
    ],
    cta: "Start with Standard",
  },
  {
    id: "premium",
    name: "Premium",
    price: 1200,
    billing: "One-off payment",
    summary: "For growing businesses ready to stand out from competitors.",
    features: [
      "Everything in Standard",
      "Custom branding and UI design system",
      "Social media integration and strategy",
      "3 rounds of revisions",
      "Priority support and faster turnaround",
      "Analytics dashboard",
    ],
    highlighted: true,
    cta: "Choose Premium",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: null,
    billing: "Quoted per project",
    summary: "For organisations with complex, multi-channel needs.",
    features: [
      "Everything in Premium",
      "Bespoke feature development",
      "Dedicated account manager",
      "Unlimited revisions",
      "Agreed delivery timelines",
      "Custom reporting",
    ],
    cta: "Contact Us",
  },
];

/** Rows for the comparison table. true = included, false = not included. */
export const comparison: { feature: string; values: Record<string, boolean | string> }[] = [
  { feature: "Responsive website", values: { standard: true, premium: true, enterprise: true } },
  { feature: "SEO-ready structure", values: { standard: true, premium: true, enterprise: true } },
  { feature: "Rounds of revisions", values: { standard: "1", premium: "3", enterprise: "Unlimited" } },
  { feature: "Custom branding and UI system", values: { standard: false, premium: true, enterprise: true } },
  { feature: "Social media integration", values: { standard: false, premium: true, enterprise: true } },
  { feature: "Priority support", values: { standard: false, premium: true, enterprise: true } },
  { feature: "Analytics dashboard", values: { standard: false, premium: true, enterprise: true } },
  { feature: "Dedicated account manager", values: { standard: false, premium: false, enterprise: true } },
  { feature: "Bespoke features and reporting", values: { standard: false, premium: false, enterprise: true } },
];

/**
 * LAUNCH and SCALE work. The old design had "Social Media" and "Product Mgmt"
 * pricing tabs but no prices for them, so they are presented as quoted work.
 * `pillarId` links each card to the matching contact-form option.
 */
export const quotedWork = [
  {
    pillar: "Launch",
    pillarId: "launch",
    title: "SEO, social media and launch campaigns",
    body: "Priced on the search visibility, channels and campaign length you need. Ongoing support or a one-off project.",
  },
  {
    pillar: "Scale",
    pillarId: "scale",
    title: "Idea validation, MVPs and AI setup",
    body: "Priced on scope and stage, from a focused validation sprint to an MVP build or an AI setup for your team.",
  },
] as const;

export function formatPrice(price: number) {
  return `${currency.symbol}${price.toLocaleString("en-US")}`;
}
