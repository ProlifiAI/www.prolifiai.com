import type { Article } from "@/content/insights/types";

/**
 * Primary search topic: "how much does a website cost in australia"
 * (editorial plan #2). Secondary: small business website cost, website
 * running costs, web design quote questions.
 *
 * Market ranges are cited and dated in the sources block (both pages opened
 * 2026-10-28). No Prolifi package prices are quoted here because the pricing
 * page is in USD; the article links to it instead.
 */
export const websiteCostAustralia: Article = {
  slug: "how-much-does-a-website-cost-australia",
  title: "How Much Does a Website Cost in Australia? A Plain-English 2026 Guide",
  seoTitle: "How Much Does a Website Cost in Australia? (2026)",
  description:
    "Real 2026 website prices for Australian small businesses: DIY, small business, custom and eCommerce, plus the running costs nobody mentions upfront.",
  standfirst:
    "Three quotes, three wildly different numbers. Here is what Australian businesses actually pay for a website in 2026, what drives the price, and the running costs to budget for after launch.",
  category: "websites",
  published: "2026-10-28",
  author: "Paul Stephen",
  keywords: [
    "how much does a website cost in australia",
    "small business website cost",
    "website cost australia 2026",
    "website maintenance cost",
    "web design quote",
  ],
  body: [
    {
      type: "p",
      text: "If you have asked three web designers for a quote and got three wildly different numbers, you are not alone. A small business website in Australia can cost anywhere from a few hundred dollars to well over $10,000. Both ends of that range can be the right answer for different businesses.",
    },
    {
      type: "p",
      text: "This guide shows what the market charges in 2026, where the money goes, and how to work out what you actually need.",
    },

    { type: "h2", id: "short-answer", text: "The short answer" },
    {
      type: "p",
      text: "Most Australian small businesses spend **$2,000 to $6,000** on a professionally built 5 to 10 page website. Custom-designed sites usually run **$6,000 to $15,000**, and online stores start around **$5,000** and climb quickly from there [1][2].",
    },
    {
      type: "callout",
      title: "Typical website costs in Australia (AUD, 2026)",
      items: [
        "**DIY builder** (Wix, Squarespace): $30 to $60 a month, plus your own time. Best for testing an idea on a very tight budget.",
        "**Landing page**: $800 to $3,000. One offer, one campaign, one call to action.",
        "**Small business website** (5 to 10 pages): $2,000 to $6,000. Trades, clinics, consultants and local services.",
        "**Custom design and build**: $6,000 to $15,000. Brands that need to stand out or publish a lot of content.",
        "**eCommerce store**: $5,000 to $60,000+. Selling products online, priced by the size of the store.",
      ],
    },

    { type: "h2", id: "what-drives-the-price", text: "What actually drives the price" },
    {
      type: "p",
      text: "The number of pages matters less than most people think. These matter more:",
    },
    {
      type: "ul",
      items: [
        "**Custom design or a template.** A template gets you online fast. Custom design makes you look like you, not like the business down the road using the same theme.",
        "**Features.** Online bookings, quote forms that feed your CRM, payments and member areas each add build and testing time.",
        "**Content.** Who is writing the words and supplying the photos? Copywriting is often the hidden line item that stalls projects for weeks.",
        "**Who builds it.** Freelancers, small studios and large agencies price very differently, and Sydney and Melbourne rates sit at the top of the range [2].",
      ],
    },

    { type: "h2", id: "running-costs", text: "The running costs nobody mentions upfront" },
    {
      type: "p",
      text: "The build is a one-off. Keeping the site fast, secure and findable is not. Budget roughly [1]:",
    },
    {
      type: "ul",
      items: [
        "**Domain (.com.au):** $15 to $30 a year",
        "**Hosting:** $15 to $150 a month",
        "**Maintenance or care plan:** $50 to $300 a month",
      ],
    },
    {
      type: "p",
      text: "A site with no updates, backups or security patches slowly becomes a liability. Ask every designer you speak to what happens *after* launch.",
    },

    { type: "h2", id: "cheap-websites", text: "Is a cheap website a false economy?" },
    {
      type: "p",
      text: "Not always. A simple, well-structured site that loads fast and tells people clearly what you do, where you work and how to contact you will beat an expensive site that is slow and confusing.",
    },
    {
      type: "p",
      text: "What *is* a false economy is a site Google cannot read. Before you sign off, check that your designer sets up:",
    },
    {
      type: "ul",
      items: [
        "a page title and description for every page",
        "a sitemap submitted to Google Search Console",
        "mobile-friendly layouts and fast load times",
        "your business on Google Business Profile, linked to the site",
      ],
    },

    { type: "h2", id: "questions-to-ask", text: "Five questions to ask before you pay a deposit" },
    {
      type: "ol",
      items: [
        "Do I own the domain, the website and the content outright?",
        "How many rounds of revisions are included?",
        "What is the ongoing monthly cost, and what does it cover?",
        "Will the site be set up for Google (sitemap, Search Console, page titles)?",
        "Can I update text and images myself without calling you?",
      ],
    },
    { type: "cta" },

    { type: "h2", id: "where-prolifi-fits", text: "Where Prolifi fits" },
    {
      type: "p",
      text: "Prolifi builds websites for Australian and New Zealand businesses with fixed, written quotes, so you know the full cost before anything starts. Every site is SEO-ready from day one. See our [website packages](/pricing) or [tell us about your project](/contact).",
    },
    {
      type: "p",
      text: "Not sure you need a website yet? Read [Do tradies still need a website?](/insights/do-tradies-need-a-website)",
    },
    {
      type: "sources",
      items: [
        { label: "What's The Damage. Web design cost guide (Australia), verified October 2026.", href: "https://whatsthedamage.com.au/web-design-cost/" },
        { label: "WP Creative. How much does a website cost in Australia? August 2026.", href: "https://wpcreative.com.au/how-much-does-a-website-cost-in-australia/" },
      ],
    },
  ],
};
