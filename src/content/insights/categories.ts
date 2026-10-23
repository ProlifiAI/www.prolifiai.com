import type { Category } from "@/content/insights/types";

/**
 * The six editorial categories. Each maps to a real Prolifi service area, so
 * every article has a natural, relevant next step. A category only gets its
 * own page once it has at least one published article.
 */
export const categories: Category[] = [
  {
    id: "websites",
    slug: "websites",
    name: "Websites & Development",
    short: "Planning, building and improving a website that does its job.",
    description:
      "Practical guidance on the decisions behind a useful business website: when to rebuild or improve, what affects the cost, how to choose a developer, and what turns visitors into enquiries.",
    seoTitle: "Website Development Advice for Businesses | Prolifi Insights",
    metaDescription:
      "Practical guidance on planning, building and improving a business website: costs, rebuild or improve decisions, choosing a developer and earning enquiries.",
    cta: {
      heading: "Planning a website, or wondering if yours needs rebuilding?",
      body: "Tell us what your site needs to do. We will recommend a sensible starting point and put the scope and price in writing.",
      label: "Discuss your website",
      href: "/contact?pillar=build",
    },
  },
  {
    id: "business-growth",
    slug: "business-growth",
    name: "Business & Growth",
    short: "Making better decisions about digital investment and growth.",
    description:
      "How to decide where digital time and money should go: finding the gaps in your online presence, judging whether an investment is worthwhile, and connecting spending to real business goals.",
    seoTitle: "Digital Growth Decisions for Small Business | Prolifi Insights",
    metaDescription:
      "How to decide where digital time and money should go: online presence gaps, judging whether an investment is worthwhile, and tying spend to business goals.",
    cta: {
      heading: "Not sure where your digital budget should go first?",
      body: "Tell us where you are stuck. We will help you work out what is worth doing now and what can wait.",
      label: "Talk it through",
      href: "/contact",
    },
  },
  {
    id: "ai-in-practice",
    slug: "ai-in-practice",
    name: "AI in Practice",
    short: "Which AI tools are worth it, and how to use them well.",
    description:
      "A grounded look at AI for small and growing businesses: how to choose and evaluate tools, when automation makes sense, and how to move from experimenting to using AI with purpose.",
    seoTitle: "Practical AI for Small Business | Prolifi Insights",
    metaDescription:
      "A grounded look at AI for small businesses: choosing and evaluating tools, knowing when automation makes sense, and putting AI to work with purpose.",
    cta: {
      heading: "Trying to work out which AI tools are worth it?",
      body: "We look at the work you want to speed up, compare suitable tools for your budget and set up the ones worth keeping.",
      label: "Ask about AI setup",
      href: "/contact?service=ai-tool-selection",
    },
  },
  {
    id: "design",
    slug: "design",
    name: "Design, Creativity & Decision-Making",
    short: "The human side of design: taste, feedback and judgement.",
    description:
      "Design sits between personal taste and measurable outcomes. These articles explore feedback, stakeholder dynamics, self-doubt and how to make design decisions you can explain and defend.",
    seoTitle: "Design, Creativity & Decision-Making | Prolifi Insights",
    metaDescription:
      "Design between personal taste and measurable outcomes: feedback, stakeholder dynamics, self-doubt, and making design decisions you can explain.",
    cta: {
      heading: "Want design decisions you can explain, not just defend?",
      body: "We design websites and products around your customers and your goals, and show the reasoning behind every decision.",
      label: "Start a design conversation",
      href: "/contact?service=ui-ux-design",
    },
  },
  {
    id: "ideas-validation",
    slug: "ideas-validation",
    name: "Ideas, Research & Product Validation",
    short: "Testing an idea before you invest in building it.",
    description:
      "Practical, honest guidance for founders: telling a real customer problem from an assumed one, what research can and cannot tell you, and what belongs in a first version.",
    seoTitle: "Idea Validation, MVPs & Product Research | Prolifi Insights",
    metaDescription:
      "Practical guidance for founders: real versus assumed customer problems, what research can and cannot tell you, and what belongs in a first version.",
    cta: {
      heading: "Have an idea you want to test before you build?",
      body: "We research the problem, the people who have it and what already exists, then recommend whether to build, refine or rethink.",
      label: "Talk through your idea",
      href: "/contact?service=product-strategy",
    },
  },
  {
    id: "search-visibility",
    slug: "search-visibility",
    name: "Search Visibility & Digital Experience",
    short: "Being found, understood and chosen online.",
    description:
      "How businesses become easier to find and easier to choose: search intent, site structure, what local SEO can realistically do, and the path from a search result to an enquiry.",
    seoTitle: "Search Visibility & Website Experience | Prolifi Insights",
    metaDescription:
      "How businesses become easier to find and to choose online: search intent, site structure, realistic local SEO and the path from search result to enquiry.",
    cta: {
      heading: "Customers cannot find you, or find you and leave?",
      body: "We look at how you show up in search and what happens when people land on your site, then fix what matters most.",
      label: "Review your visibility",
      href: "/contact?service=seo-search-visibility",
    },
  },
];

export const categoryById = (id: Category["id"]) => categories.find((c) => c.id === id)!;
export const categoryBySlug = (slug: string) => categories.find((c) => c.slug === slug);
