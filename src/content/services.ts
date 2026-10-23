/**
 * Services, grouped into the three Prolifi pillars: BUILD, LAUNCH, SCALE.
 *
 *   BUILD   premium websites that convert        (websites, landing pages, redesigns, digital foundations)
 *   LAUNCH  get found and get chosen             (SEO and search visibility, social strategy, content, social design, campaign creative)
 *   SCALE   validate, build and automate         (idea validation, MVP and web app development, AI tool selection and setup,
 *                                                  UX research, UI/UX design, prototyping)
 *
 * SEO, idea validation, MVP/web app development and AI tool selection were
 * confirmed as delivered services by Prolifi on 2026-10-23. Deliverables describe the shape of the work,
 * not guaranteed scope; the final scope of every project is agreed in a
 * written proposal.
 */

export type Service = {
  slug: string;
  name: string;
  /** The problem the service addresses, in the customer's words */
  problem: string;
  /** Who it suits */
  forWho: string;
  deliverables: string[];
  /** The practical benefit */
  benefit: string;
  /**
   * Set to false to hide a service that Prolifi cannot currently deliver.
   * Hidden services also disappear from the contact form options.
   */
  available: boolean;
};

export type PillarId = "build" | "launch" | "scale";

export type Pillar = {
  id: PillarId;
  name: string;
  /** What the pillar does, in three or four words */
  focus: string;
  /** Core brand message for the pillar */
  message: string;
  intro: string;
  image: { src: string; alt: string };
  services: Service[];
};

export const pillars: Pillar[] = [
  {
    id: "build",
    name: "Build",
    focus: "Premium websites that convert",
    message: "A website built to win customers, not just to look good.",
    intro:
      "Your website is often the first conversation a customer has with you. We plan, design and develop premium websites and landing pages around one goal: helping the right people understand what you do and get in touch. No templates, no generic AI output.",
    image: {
      src: "/images/work/website-design-on-laptop.png",
      alt: "Laptop on a desk showing a website with the headline Build your dream website",
    },
    services: [
      {
        slug: "business-websites",
        name: "Business websites",
        problem: "You have no website, or a template site that looks like everyone else's and does not bring in enquiries.",
        forWho: "Small and growing businesses across Australia and New Zealand.",
        deliverables: [
          "Customer and message planning",
          "Conversion-focused page structure",
          "Responsive design and development",
          "SEO-ready build and launch",
        ],
        benefit: "A site that answers customer questions and makes it easy to get in touch.",
        available: true,
      },
      {
        slug: "landing-pages",
        name: "Landing pages",
        problem: "You are launching an offer or campaign and need one focused page that converts.",
        forWho: "Businesses running promotions, launches or paid campaigns.",
        deliverables: ["Offer and message structure", "Conversion-focused page design", "Enquiry or sign-up form", "Launch support"],
        benefit: "One clear page, one clear action, so campaign traffic does not go to waste.",
        available: true,
      },
      {
        slug: "website-redesigns",
        name: "Website redesigns",
        problem: "Your site looks dated, is hard to update, or gets visitors but not enquiries.",
        forWho: "Businesses that have outgrown their first website.",
        deliverables: ["Review of the current site", "Updated structure and content plan", "New design", "Rebuild and launch"],
        benefit: "A site that matches the quality of your work, without losing what already works.",
        available: true,
      },
      {
        slug: "digital-foundations",
        name: "Digital foundations",
        problem: "Your brand, domain, email and online profiles are scattered or inconsistent.",
        forWho: "New businesses, or teams tidying up their online presence.",
        deliverables: ["Brand basics for digital use", "Domain and business email guidance", "Consistent online profiles", "Simple handover notes"],
        benefit: "A tidy, consistent base that every future campaign can build on.",
        available: true,
      },
    ],
  },
  {
    id: "launch",
    name: "Launch",
    focus: "Get found and get chosen",
    message: "Help the right customers find you, then choose you.",
    intro:
      "Good businesses lose customers to competitors who are simply easier to find. We improve how you show up on Google and social media, and shape the content and campaigns that get your offer in front of the people already looking for it.",
    image: {
      src: "/images/work/social-media-on-laptop-and-phone.png",
      alt: "Person browsing a social media profile on a laptop while holding a phone",
    },
    services: [
      {
        slug: "seo-search-visibility",
        name: "SEO and search visibility",
        problem: "Customers search for what you do, and find your competitors instead.",
        forWho: "Businesses with a good offer that are hard to find on Google.",
        deliverables: [
          "Keyword and competitor research",
          "On-page SEO for your key pages",
          "Google Business Profile review",
          "Technical checks and fixes",
        ],
        benefit: "Easier to find for the searches that matter to your business, without promises of overnight rankings.",
        available: true,
      },
      {
        slug: "social-media-strategy",
        name: "Social media strategy",
        problem: "You post when you can, but it is not bringing in enquiries.",
        forWho: "Businesses that want social media to support real business goals.",
        deliverables: ["Audience and channel review", "Content pillars and tone of voice", "Posting rhythm", "Simple measures of success"],
        benefit: "A clear plan for what to post, where and why.",
        available: true,
      },
      {
        slug: "content-planning",
        name: "Content planning",
        problem: "Coming up with ideas every week takes time you do not have.",
        forWho: "Owners and small teams managing their own channels.",
        deliverables: ["Monthly content calendar", "Post ideas and captions", "Key dates and campaigns mapped in advance"],
        benefit: "You always know what is going out next.",
        available: true,
      },
      {
        slug: "social-media-design",
        name: "Social media design",
        problem: "Your posts look different every time and do not feel like your brand.",
        forWho: "Businesses that want a consistent, recognisable feed.",
        deliverables: ["Branded post and story templates", "Designed posts and carousels", "Profile and cover visuals"],
        benefit: "A feed that looks professional and is instantly recognisable as yours.",
        available: true,
      },
      {
        slug: "campaign-creative",
        name: "Digital campaign creative",
        problem: "You have a launch, event or promotion and need assets that work across channels.",
        forWho: "Businesses running time-bound campaigns.",
        deliverables: ["Campaign concept", "Social and ad creative in the sizes you need", "Matching landing page visuals"],
        benefit: "One campaign idea, executed consistently everywhere it appears.",
        available: true,
      },
    ],
  },
  {
    id: "scale",
    name: "Scale",
    focus: "Validate, build and automate",
    message: "Test the idea, then build what is worth building.",
    intro:
      "Before you spend on an app, a platform or another stack of AI tools, find out what is worth it. We research the opportunity, shape a realistic first version, develop MVPs and web apps, and set up AI tools that take real work off your team.",
    image: {
      src: "/images/work/mobile-app-on-smartphone.png",
      alt: "Smartphone showing a social app resting on a laptop keyboard",
    },
    services: [
      {
        slug: "product-strategy",
        name: "Idea validation and product strategy",
        problem: "You have an idea, but no evidence yet that customers want it or would pay for it.",
        forWho: "Founders and businesses planning a new product, platform or app.",
        deliverables: [
          "Problem and customer research",
          "Competitor and alternatives review",
          "Assumptions to test before you build",
          "A realistic first-release plan",
        ],
        benefit: "A clear go, refine or rethink decision before you commit a development budget.",
        available: true,
      },
      {
        slug: "product-development",
        name: "MVP and web app development",
        problem: "Your idea is ready to test with real users, or your designs need to become a working product.",
        forWho: "Founders and teams ready to launch a first version.",
        deliverables: ["Front-end and back-end development", "Testing before launch", "Launch and handover"],
        benefit: "One team from idea to a working product, without paying for features nobody needs yet.",
        available: true,
      },
      {
        slug: "ai-tool-selection",
        name: "AI tool selection and setup",
        problem: "There are hundreds of AI tools and you do not know which ones fit your business, or how to make them stick.",
        forWho: "Owners and teams who want AI to save real time, not add another subscription.",
        deliverables: [
          "Review of the work you want to speed up",
          "Shortlist of suitable tools for your budget",
          "Setup and workflow automation",
          "Team handover and simple guides",
        ],
        benefit: "AI that does useful work in your business, chosen for your needs rather than the hype.",
        available: true,
      },
      {
        slug: "ux-research-ia",
        name: "UX research and information architecture",
        problem: "People find your product confusing, or you are not sure how they will use it.",
        forWho: "Products that are new, growing or being reworked.",
        deliverables: ["User interviews or reviews", "User journeys", "Navigation and content structure"],
        benefit: "Decisions based on how people actually behave.",
        available: true,
      },
      {
        slug: "ui-ux-design",
        name: "UI/UX design",
        problem: "Your product works, but it does not feel easy or polished to use.",
        forWho: "Web and mobile products at any stage.",
        deliverables: ["User flows", "Interface design for key screens", "Interaction states and edge cases"],
        benefit: "An interface people understand the first time they use it.",
        available: true,
      },
      {
        slug: "prototyping-design-systems",
        name: "Prototyping and design systems",
        problem: "You need to test an idea, or your screens are drifting apart as the product grows.",
        forWho: "Teams validating ideas or scaling a product.",
        deliverables: ["Clickable prototypes", "Reusable component library", "Design documentation for developers"],
        benefit: "Test before you build, then build faster and more consistently.",
        available: true,
      },
      {
        // Hidden until Prolifi confirms it can deliver development in-house
        // or through a named partner. Set available: true to publish it.
        slug: "product-development",
        name: "Digital product development",
        problem: "Your designs are ready and you need them built.",
        forWho: "Teams with a validated product design.",
        deliverables: ["Front-end and back-end build", "Testing", "Launch support"],
        benefit: "One team from design through to a working product.",
        available: false,
      },
    ],
  },
];

export const availableServices = (pillar: Pillar) => pillar.services.filter((s) => s.available);

/** Options for the "service of interest" field on the contact form */
export const serviceOptions = pillars.flatMap((p) =>
  availableServices(p).map((s) => ({ value: s.slug, label: s.name, group: p.name }))
);

/**
 * Pillar-level enquiry options ("Launch, not sure which service yet"), so a
 * customer can enquire about any pillar without picking a specific service.
 */
export const pillarOptions = pillars.map((p) => ({
  value: `${p.id}-general`,
  label: `${p.name}: not sure which service yet`,
  group: p.name,
  pillar: p.id,
}));

/** Old pillar ids still used by links shared before the rename. */
export const legacyPillarIds: Record<string, PillarId> = { grow: "launch" };

export function findPillar(id: string | null | undefined) {
  if (!id) return undefined;
  const key = (legacyPillarIds[id] ?? id) as PillarId;
  return pillars.find((p) => p.id === key);
}

/** How Prolifi works. Shared by the home and services pages. */
export const processSteps = [
  {
    title: "Discover",
    body: "We look at the problem first: your customers, your options and whether the idea or tool is worth it.",
  },
  {
    title: "Plan",
    body: "You receive a written proposal with scope, timeline and price before any work begins.",
  },
  {
    title: "Design and build",
    body: "We design, share progress and refine with you at agreed review points.",
  },
  {
    title: "Go live and grow",
    body: "We launch, hand over everything you need and help you plan the next step.",
  },
] as const;
