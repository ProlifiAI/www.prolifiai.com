# Prolifi Insights: editorial plan

Prepared 2026-10-23. Editorial principle: **help people understand the problem, make a better decision, and take the right next step.**

## How topics were researched

- Google Autocomplete for Australia and New Zealand (`gl=au` / `gl=nz`): 35 topic seeds across the six categories, 380 suggestions. Raw data: `blog-autocomplete-2026-10-23.json`.
- Combined with the site keyword research in `docs/seo/keyword-strategy.md`.
- **Not available:** search volumes, keyword difficulty and Search Console data. Autocomplete shows a phrase is searched; it does not say how often. Nothing below is a traffic forecast.
- Rule: one article per search intent. Where two ideas share an intent they are merged, so articles do not compete with each other.

## Publishing priority

Priority favours topics that (1) match a real searched phrase, (2) lead naturally to a Prolifi service, and (3) can be written with genuine expertise and verifiable sources.

| # | Working title | Category | Primary search topic (seen in autocomplete) | Intent | Audience and problem | CTA | Evidence needed |
|---|---|---|---|---|---|---|---|
| 1 | **The Subjective Nature of Design: Why Good Work Gets Rejected** (published) | Design | is design subjective; design is subjective or objective; graphic design is subjective | Informational | Designers, and the owners who review their work; frustration with subjective feedback | Start a design conversation | Mere-exposure effect, WCAG contrast, usability heuristics, imposter phenomenon (all cited) |
| 2 | How Much Does a Website Cost in Australia and New Zealand? | Websites | how much does a website cost in australia; how much does a website cost nz; small business website cost | Commercial investigation | Owners budgeting a site; unclear what drives price | Discuss your website | Prolifi's published packages; general cost drivers. No competitor prices unless cited and dated |
| 3 | Website Builder or Web Developer? An Honest Comparison | Websites | website builder vs web developer; ai website builder vs professional website development | Commercial investigation | Owners tempted by AI builders | Discuss your website | Builder features and limits, checked on the publish date |
| 4 | How to Validate a Business Idea Before You Build It | Ideas | how to validate a business idea; how to test a business idea; ...without spending money | Informational | Founders with an untested idea | Talk through your idea | Established validation methods; no success-rate statistics unless sourced |
| 5 | How to Choose the Right AI Tools for Your Business | AI in Practice | how to choose the right ai tools for your business; how to evaluate ai tools | Commercial investigation | Owners overwhelmed by AI tools | Ask about AI setup | A selection framework; named tools checked for current features and pricing |
| 6 | Why Is My Business Not Showing Up on Google? | Search | why is my business not showing up on google; ...on google maps | Problem-aware | Owners invisible in search | Review your visibility | Google Business Profile and Search Central documentation |
| 7 | Website Traffic but No Leads? Where the Journey Breaks | Search | website traffic but no leads; website traffic but no sales | Problem-aware | Sites with visitors but no enquiries | Review your visibility | Usability and conversion principles; no invented benchmarks |
| 8 | What Is an MVP (and What Belongs in Yours)? | Ideas | what is an mvp; what is an mvp in business; how to build an mvp for your startup | Informational | First-time founders scoping a build | Talk through your idea | Definitions and a scoping method |
| 9 | How to Choose a Web Design Agency | Websites | how to choose a web design agency; how to choose the right web design company | Commercial investigation | Owners comparing providers | Discuss your website | An evaluation checklist; no claims about competitors |
| 10 | When AI Automation Makes Sense, and When It Does Not | AI in Practice | when to use ai vs automation; what can ai automate in accounting | Informational | Owners considering automation | Ask about AI setup | Clear criteria and realistic limits |
| 11 | How to Respond to Subjective Design Feedback | Design | how to respond to design feedback; design feedback from clients | Informational (how-to) | Designers and in-house teams | Start a design conversation | Practical frameworks; extends article 1 with a different intent |
| 12 | What Makes a Good Business Website? | Websites | what makes a good business website; ...for a small business | Informational | Owners judging their current site | Discuss your website | Usability, accessibility and content principles |
| 13 | Is Your Digital Spend Working? | Business & Growth | how to measure digital marketing roi | Informational | Owners unsure what their digital spend returns | Talk it through | A measurement approach; no invented ROI figures |
| 14 | Online Presence for Small Business: Finding the Gaps | Business & Growth | online presence for small business; importance of online presence for small businesses | Informational | Owners with a patchy presence | Talk it through | A practical audit checklist |
| 15 | How to Do Competitor Research Without Copying | Ideas | how to do competitor research; how to do competitor analysis for a product | Informational | Founders and marketers | Talk through your idea | Method and ethical boundaries |
| 16 | Search Intent, Explained for Business Owners | Search | search intent; search intent in seo | Informational | Owners writing their own site content | Review your visibility | Google documentation |
| 17 | Is AI Accurate? Checking AI Output Before You Rely on It | AI in Practice | is ai accurate; is ai accurate information | Informational | Teams using AI for content or admin | Ask about AI setup | Documented limitations from AI providers; verification steps |
| 18 | Imposter Syndrome in Design: A Practical Guide | Design | imposter syndrome designer; imposter syndrome graphic designer | Informational | Designers early in their careers | Start a design conversation | Clance and Imes (1978); no clinical advice |

**Cannibalisation notes.** Articles 1 and 11 share a theme but target different intents (understanding the problem versus a how-to). Article 18 should link to article 1 rather than repeat it. Articles 6 and 7 split visibility (not found) from conversion (found but not chosen).

## Internal linking

- Every article links to its category page and, where it helps the reader, to the matching service section on `/services` (#build, #launch or #scale).
- Articles link to each other by intent: cost (2) ↔ builder vs developer (3) ↔ choosing an agency (9); validation (4) → MVP (8) → competitor research (15); not on Google (6) ↔ traffic but no leads (7).
- Category CTAs open the existing contact form with the matching service preselected.

## How to publish a new article

1. Copy `src/content/insights/articles/subjective-nature-of-design.ts` as a template.
2. Fill in the fields: slug, title, description (150-160 characters), standfirst, category, today's date as `published`, keywords from this plan, and the body blocks.
3. Add it to the list in `src/content/insights/index.ts`.
4. The Insights page, its category page (created automatically once it has an article), related articles, the sitemap, the share image and the structured data all update on their own.

## Quality bar for every article

Each article must offer at least one of: a clear explanation, a practical framework, an honest trade-off, a decision guide or a next step. No invented client stories, statistics, interviews or case studies. Factual claims are cited in the article's Sources block. Named tools are checked for current features and pricing on the publish date.

## Measurement (when analytics are connected)

Track organic landing pages for `/insights/*`, scroll depth, clicks on the in-article and closing CTAs, and contact submissions where the preselected service matches the article's category.
