/**
 * Pricing. Edit packages here; the home page preview, the pricing page and
 * the comparison table all read from this file.
 *
 * Prices in US dollars, as set by Prolifi (October 2026): Starter $450,
 * Professional $900, Custom "Contact us". All one-off payments. Package names,
 * inclusions and the comparison mapping are unchanged from the original design.
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
    id: "starter",
    name: "Starter",
    price: 450,
    billing: "One-off payment",
    summary: "For small businesses starting their digital journey.",
    features: [
      "Responsive website design and development",
      "SEO-ready site structure",
      "1 round of revisions",
    ],
    cta: "Start with Starter",
  },
  {
    id: "professional",
    name: "Professional",
    price: 900,
    billing: "One-off payment",
    summary: "For growing businesses ready to stand out from competitors.",
    features: [
      "Everything in Starter",
      "Custom branding and UI design system",
      "Social media integration and strategy",
      "3 rounds of revisions",
      "Priority support and faster turnaround",
      "Analytics dashboard",
    ],
    highlighted: true,
    cta: "Choose Professional",
  },
  {
    id: "custom",
    name: "Custom",
    price: null,
    billing: "Quoted per project",
    summary: "For organisations with complex, multi-channel needs.",
    features: [
      "Everything in Professional",
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
  { feature: "Responsive website", values: { starter: true, professional: true, custom: true } },
  { feature: "SEO-ready structure", values: { starter: true, professional: true, custom: true } },
  { feature: "Rounds of revisions", values: { starter: "1", professional: "3", custom: "Unlimited" } },
  { feature: "Custom branding and UI system", values: { starter: false, professional: true, custom: true } },
  { feature: "Social media integration", values: { starter: false, professional: true, custom: true } },
  { feature: "Priority support", values: { starter: false, professional: true, custom: true } },
  { feature: "Analytics dashboard", values: { starter: false, professional: true, custom: true } },
  { feature: "Dedicated account manager", values: { starter: false, professional: false, custom: true } },
  { feature: "Bespoke features and reporting", values: { starter: false, professional: false, custom: true } },
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
    title: "Social media and launch campaigns",
    body: "Priced on the channels, content volume and campaign length you need. Ongoing support or a one-off campaign.",
  },
  {
    pillar: "Scale",
    pillarId: "scale",
    title: "Product strategy and UX design",
    body: "Priced on product scope and stage, from a focused strategy sprint to full interface design and prototyping.",
  },
] as const;

export function formatPrice(price: number) {
  return `${currency.symbol}${price.toLocaleString("en-US")}`;
}
