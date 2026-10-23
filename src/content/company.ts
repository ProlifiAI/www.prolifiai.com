/**
 * About-page content, team, FAQs and social proof.
 */

export type Founder = {
  name: string;
  role: string;
  /**
   * Transparent cut-out taken from the approved founders design
   * (assets/references/founders-reference.webp). 556 x 572 px; the bottom
   * 392 px sit on the portrait gradient card, the top 180 px rise above it.
   */
  portrait: string;
  linkedin: string;
  instagram: string;
  email: string;
};

/** Founders, in the order of "Meet The Faces Behind Prolifi". Links supplied by Prolifi. */
export const team: Founder[] = [
  {
    name: "Damilola Oluwafemi",
    role: "COO / Co-founder",
    portrait: "/images/team/damilola-oluwafemi-cutout.png",
    linkedin: "https://www.linkedin.com/in/damilola-oluwafemi-a6b898129/",
    instagram: "https://www.instagram.com/_iamdamie/",
    email: "DammieFemi@gmail.com",
  },
  {
    name: "Paul Stephen",
    role: "CEO / Co-founder",
    portrait: "/images/team/paul-stephen-cutout.png",
    linkedin: "https://www.linkedin.com/in/mrpaulstephen/",
    instagram: "https://www.instagram.com/iam_paulpaliviero/",
    email: "paliviero@gmail.com",
  },
  {
    name: "Deborah Praise Madubuchi",
    role: "CMO / Co-founder",
    portrait: "/images/team/deborah-praise-madubuchi-cutout.png",
    linkedin: "https://www.linkedin.com/in/deborah-praise-463809201/",
    instagram: "https://www.instagram.com/deborah.praise_/",
    email: "deboraheke3@gmail.com",
  },
];

/**
 * Homepage "Our Impact" metrics.
 *
 * Numeric claims carry `verified`. Unverified ones are shown in local
 * development (marked "Needs confirmation") so the design can be reviewed,
 * and are NOT rendered in production. Set verified: true once the figure is
 * confirmed. For the rating, keep only the variant you can substantiate:
 * either 4.5/5 ("Client Rating") or 95% ("Client Satisfaction"), never both.
 */
export type ImpactMetric =
  | {
      kind: "number";
      id: string;
      /** Final value counted up to */
      value: number;
      decimals?: number;
      prefix?: string;
      /** Shown after the number, e.g. "+", "%", "/5" */
      suffix?: string;
      label: string;
      description: string;
      verified: boolean;
    }
  | {
      kind: "text";
      id: string;
      /** Displayed as-is, never counted */
      display: string;
      label?: string;
      description: string;
    };

export const impactMetrics: ImpactMetric[] = [
  {
    kind: "number",
    id: "websites",
    value: 10,
    suffix: "+",
    label: "Websites Delivered",
    description: "Digital experiences created to help businesses establish a stronger online presence.",
    // Confirmed by Prolifi (Paul Stephen), 2026-10-19
    verified: true,
  },
  {
    kind: "number",
    id: "rating",
    value: 4.5,
    decimals: 1,
    suffix: "/5",
    label: "Client Rating",
    description: "A reflection of the quality and experience delivered to clients.",
    // Confirmed by Prolifi (Paul Stephen), 2026-10-19
    verified: true,
  },
  // Alternative, only if this is the substantiated figure instead of the rating:
  // { kind: "number", id: "satisfaction", value: 95, suffix: "%", label: "Client Satisfaction",
  //   description: "A reflection of the quality and experience delivered to clients.", verified: false },
  {
    kind: "text",
    id: "expertise",
    display: "B2B · SaaS · B2C",
    description: "Experience across different business models, digital products, and customer experiences.",
  },
  {
    kind: "text",
    id: "design",
    display: "Design-Led Delivery",
    description: "Consistent visual systems, thoughtful interactions, and carefully executed digital experiences.",
  },
];

/** "What We Represent" values from the existing About page, with real descriptions. */
export const values = [
  {
    title: "Integrity",
    body: "Clear scopes, honest prices and straight answers, including when something is not the right fit for you.",
  },
  {
    title: "Communication",
    body: "You always know what we are working on, what we need from you and what happens next.",
  },
  {
    title: "Excellence",
    body: "Considered work in the details that customers notice: clear words, fast pages and consistent design.",
  },
] as const;

/** Business challenges Prolifi addresses. Shared by home and about pages. */
export const challenges = [
  {
    title: "Hard to find online",
    body: "Customers search for what you do and find your competitors, an outdated site or nothing at all.",
  },
  {
    title: "Visitors do not convert",
    body: "People land on your site, but a template look and a vague message send them away without enquiring.",
  },
  {
    title: "Too many AI tools, no plan",
    body: "There is a new tool every week. You are not sure which ones fit your business or are worth paying for.",
  },
  {
    title: "An idea you have not tested",
    body: "You want to build an app or platform, but do not know yet whether customers will use it or pay for it.",
  },
] as const;

/** What working with Prolifi looks like. Confirm these match how the team works. */
export const expectations = [
  "A written proposal with scope, timeline and price before work starts",
  "Regular progress updates and agreed review points",
  "Plain-language explanations, without jargon",
  "Everything handed over to you at launch",
] as const;

export type Faq = { q: string; a: string };

/**
 * FAQs. The old home and about pages showed placeholder questions from
 * another template ("What is A&O Essentials?"). These replace them. The
 * pricing questions come from the old pricing page.
 */
export const generalFaqs: Faq[] = [
  {
    q: "What kind of businesses does Prolifi work with?",
    a: "Small and growing businesses and founders across Australia and New Zealand: teams that need a website that wins customers, want to use AI properly, or are planning a digital product.",
  },
  {
    q: "Which service do I need?",
    a: "If your website does not bring in enquiries, start with Build. If customers cannot find you on Google or social media, look at Launch. If you have an idea for an app or platform, or want AI to take on real work in your business, Scale covers idea validation, MVP and web app development, and AI tool selection and setup. Not sure? Tell us where you are stuck and we will recommend a starting point.",
  },
  {
    q: "How is your website different from an AI-built or template site?",
    a: "Every page is planned around your customers and the action you want them to take: clear messaging, fast pages and an easy path to enquire. A template or AI builder gives you a page. We build a site designed to win business.",
  },
  {
    q: "Can you help us choose the right AI tools?",
    a: "Yes. We start with the work you want to speed up, compare suitable tools against your budget and the systems you already use, then set up the ones worth keeping. If a tool is not worth paying for, we will tell you.",
  },
  {
    q: "Can you tell us whether our idea is worth building?",
    a: "We research the problem, who has it, how they solve it today and what already exists, then recommend whether to build, refine or rethink. Research reduces risk; it cannot guarantee success, and we will be honest about what the evidence shows.",
  },
  {
    q: "How does a project start?",
    a: "Send us a project enquiry. We will arrange a conversation, then send a written proposal with scope, timeline and price. Work begins once you approve it.",
  },
  {
    q: "How long does a project take?",
    a: "It depends on the scope. Your proposal includes a timeline, and we agree it with you before work starts.",
  },
  {
    q: "Will I be able to update my website myself?",
    a: "Tell us how you would like to manage your content and we will plan the build around it, including a handover so your team knows how things work.",
  },
];

export const pricingFaqs: Faq[] = [
  {
    q: "What does the Starter package include?",
    a: "A responsive website designed and developed for your business, an SEO-ready structure and one round of revisions.",
  },
  {
    q: "Are payments one-off or subscription-based?",
    a: "Website packages are one-off payments. SEO, social media, MVP and AI work is quoted per project, depending on what you need.",
  },
  {
    q: "Can I start with Starter and add more later?",
    a: "Yes. Many businesses start small. Tell us what you would like to add and we will quote the additional work.",
  },
  {
    q: "What currency are your prices in?",
    a: "All package prices are shown in US dollars (USD).",
  },
  {
    q: "What if my project does not fit a package?",
    a: "Choose Custom or send us a project enquiry. We will scope the work and send a quote.",
  },
];

export type Testimonial = {
  name: string;
  role: string;
  organisation: string;
  /** What Prolifi delivered, taken from the testimonial itself */
  project: string;
  /** A faithful sentence from the full text, shown first */
  excerpt: string;
  /** The complete testimonial, one string per paragraph */
  full: string[];
  /** Optional portrait; only add one confirmed to belong to this client */
  portrait?: string;
  approved: boolean;
};

/**
 * Client testimonials, supplied by Prolifi on 2026-10-19. Text is as supplied,
 * except "Prolifil" in the first testimonial, corrected to "Prolifi".
 * Client email addresses were supplied for verification and are deliberately
 * not published. The earlier template reviews (Sarah Johnson, Marcus Obi,
 * Amara Diallo) were placeholders and have been removed.
 */
export const testimonials: Testimonial[] = [
  {
    name: "Judith Aruya",
    role: "Founder",
    organisation: "J.A Growth Partners",
    project: "Website",
    excerpt:
      "Prolifi did an excellent job translating my ideas into a professional online presence that reflects the vision and values of J.A Growth Partners.",
    full: [
      "Working with Prolifi to bring the vision for J.A Growth Partners to life through our website has been a wonderful experience. I truly appreciate his creativity, professionalism, attention to detail, and dedication to understanding my business needs.",
      "Prolifi did an excellent job translating my ideas into a professional online presence that reflects the vision and values of J.A Growth Partners. His willingness to listen, understand my goals, and bring my ideas to life made the entire process smooth and enjoyable.",
      "I'm grateful for his contribution to this important milestone in building my business. I would gladly recommend Prolifi to individuals and businesses looking for a reliable, creative, and professional website designer.",
      "Thank you, Prolifi, for helping J.A Growth Partners take this important step toward building a strong and credible brand online!",
    ],
    approved: true,
  },
  {
    name: "Elobuike Jacinta",
    role: "Founder",
    organisation: "Elzer Mental Health Consults",
    project: "Graphic design",
    excerpt:
      "Prolifi did an excellent job bringing our ideas to life through creative and professional graphic designs that reflect the values and identity of Elzer Mental Health Consults.",
    full: [
      "Working with Prolifi on the graphics design for Elzer Mental Health Consults has been a wonderful experience. I truly appreciate his creativity, professionalism, attention to detail, and dedication to understanding our brand and its vision.",
      "Prolifi did an excellent job bringing our ideas to life through creative and professional graphic designs that reflect the values and identity of Elzer Mental Health Consults. His willingness to listen, understand our needs, and deliver designs that align with our vision made the entire process smooth and enjoyable.",
      "I am grateful for his contribution to building our brand identity and creating a professional visual presence for our mental health services. I would gladly recommend Prolifi to individuals and businesses looking for a reliable, creative, and professional graphic designer who is committed to delivering quality work.",
      "Thank you, Prolifi, for helping Elzer Mental Health Consults communicate our vision through impactful and professional designs!",
    ],
    approved: true,
  },
];

/**
 * Case studies. None of the work samples in the reference files are
 * confirmed Prolifi client projects, so none are listed. Add entries with
 * approved: true and an image in /public/images/work to show the
 * "Selected work" section on the home page.
 */
export const projects: {
  title: string;
  client: string;
  pillar: "Build" | "Launch" | "Scale";
  summary: string;
  image: string;
  href?: string;
  approved: boolean;
}[] = [];
