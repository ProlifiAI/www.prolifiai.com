# Prolifi AI: positioning, keyword research and page mapping

Prepared 2026-10-23 for www.prolifiai.com (Australia and New Zealand). Companion files:

- `keyword-research.csv`: the full dataset (1,197 searched phrases, classified)
- `autocomplete-raw-2026-10-23.json`: the raw research data
- `build-keyword-dataset.cjs`: the classification rules, re-runnable on new data

## 1. Sources, method and limitations

| Source | Used for | Access |
|---|---|---|
| Google Autocomplete (`suggestqueries.google.com`, `gl=au`/`gl=nz`, `hl=en-AU`/`en-NZ`) | Which phrases people in each country actually search | Public, used |
| Web search of agency, AI consultancy and MVP studio listings (AU and NZ) | Competitor positioning and pricing language | Public, used |
| The live site and codebase | Content inventory and audit | Used |
| Ahrefs | Volume, difficulty, rankings | **Not available** (connector needs authorisation) |
| Google Search Console, Analytics, Keyword Planner, Trends | Real impressions, clicks, conversions, volumes | **Not connected** |

What this means:

- **No search volumes, difficulty scores or CPCs are given.** Those columns say "unavailable". Autocomplete proves a phrase is searched often enough to be suggested; it does not say how often.
- Autocomplete results are partly personalised and change over time. Confidence for kept keywords is therefore "Medium".
- Search result pages (who ranks) were not observed directly; competitor notes come from web search of listings and directories, most of which are self-promotional.
- The dataset is a documented, expandable starting set, not an exhaustive list.

### Classification rules (reproducible; see the script)

1. **Exclude** phrases about other countries (India, UK, USA...), jobs, salaries, courses, tax or depreciation, templates, games and unrelated tools.
2. **Do-it-yourself and tool-list searches** ("website builder for small business", "ai tools for small business marketing") become **P3**: useful for future articles, not service pages.
3. **Intent**: cost or price words = commercial investigation; questions = informational; company/agency/services/consultant/developer/"for small business"/a city = transactional.
4. **Relevance** is High when the phrase matches a confirmed Prolifi service: websites, redesigns, landing pages, SEO and visibility, idea validation, MVPs and web apps, AI tool selection and setup.
5. **Priority**: P1 = transactional + High relevance + no city; P2 = High-relevance commercial terms, cost terms and city terms; P3 = informational; Exclude = rule 1.

Result: 154 P1 rows (90 distinct phrases across AU and NZ), 389 P2, 117 P3, 537 excluded.

## 2. Positioning audit (before)

| Area | What it said | Problem |
|---|---|---|
| Hero | "Build your digital presence. Unlock your next stage of growth." | Could be any agency. Does not say what Prolifi does, for whom, or why it is different. |
| Services | Websites, social media, product design | AI tool selection, idea validation, MVP development and SEO are all delivered but invisible. MVP development was hidden. |
| Audience | "Small and growing businesses" | No Australia or New Zealand signal anywhere, although both markets search with country terms ("ai consulting australia", "web designers nz"). |
| Problems | Hard to find, not converting, social without a plan, idea without a product | Good start; misses the two newest problems buyers have: too many AI tools, and ideas built before they are tested. |
| Differentiation | "AI-accelerated, human-led" | Strong, but competitors say "AI-powered" too. The sharper story is the one the owner gave: premium, conversion-focused work instead of generic AI-built sites that do not win customers. |
| CTA | "Start a Project" | Clear and consistent; kept. |
| Pricing | USD prices for an AU/NZ audience | Likely friction (searchers ask "website development cost in australia", "website design nz cost"). **Owner decision**; not changed. |

## 3. Competitor landscape (verified observations vs interpretation)

Observed (from public listings, 2026-10-23):

- **AU/NZ web agencies** compete on price ("affordable web design", NZ starter packages from about NZ$990 to NZ$1,500) or on narrow conversion-rate optimisation (Chromatix, White Peak Digital, Gordon Digital).
- **AU AI consultancies** (FlowWorks, PrestoFlow, wa-i, Agentive, Cleverly AI, Evisent) lead with automation, "AI employees" and hours saved; several publish fixed-price builds.
- **MVP studios** (Cabot Solutions, Bearplus, many offshore listings) lead with speed of build.

Interpretation (strategy, not fact):

- Few providers connect *deciding* with *doing*: which AI tools are worth it, whether an idea is worth building, and then building it properly.
- "Premium and conversion-focused, not template or AI-builder output" is a credible wedge: real people search "ai website builder vs professional website development" in both countries.

## 4. Positioning (after)

**Proposition:** Prolifi AI helps Australian and New Zealand businesses make the right digital call, then builds it properly: premium websites, tested products and practical AI that win customers.

**Hero (implemented):** "Make the right digital call. Then build it to win customers."

How the owner's three strategic ideas fit the existing BUILD > LAUNCH > SCALE framework:

| Strategic idea | Where it lives | Proof in the copy |
|---|---|---|
| Good businesses that are hard to find | BUILD (premium, conversion-focused websites) and LAUNCH (SEO and search visibility, social) | Hero sub-copy, problem cards, Build and Launch intros |
| Validate before you build | SCALE (idea validation, product strategy, MVP and web app development) | Problem card "An idea you have not tested", Scale intro, FAQ |
| Make AI useful | SCALE (AI tool selection and setup) and the AI + human section | Problem card "Too many AI tools", FAQ |

One promise ties them together: **decide first, then execute properly**, with written scope and price before work starts (already Prolifi's process).

Assumptions to confirm with the business:

1. Prolifi works with clients anywhere in Australia and New Zealand remotely (copy says "across Australia and New Zealand", no office claims).
2. AI tool selection and setup, idea validation research, MVP/web app development and SEO are delivered in-house or through a reliable partner (owner confirmed 2026-10-23).
3. Mobile apps are not promised; "web apps and MVPs" are.

## 5. Keyword-to-page mapping (existing URLs only)

| Page | Primary topic | Secondary terms (from P1/P2) | Intent | Title (implemented) |
|---|---|---|---|---|
| `/` | Websites, MVPs and AI for AU/NZ businesses | website development company, ai consultant for small business, mvp development for startups, premium website design agency | Commercial | Prolifi AI \| Websites, MVPs & AI for Australian & NZ Businesses |
| `/services` | Website development, MVP and AI implementation services | website design and development services, small business seo services, ai implementation consultant for small business, mvp development services, business idea validation | Transactional | Website Development, MVPs, SEO & AI Services \| Prolifi AI |
| `/services#build` | Website development and redesign | website developer for small business, website redesign services, conversion focused web design agency | Transactional | (section) |
| `/services#launch` | SEO, search visibility and social | seo services australia, small business seo agency, local seo services for small business | Transactional | (section) |
| `/services#scale` | Idea validation, MVPs, web apps, AI setup | validate my business idea, mvp development for startups, web app development services, ai automation for small businesses | Transactional | (section) |
| `/pricing` | Website development cost | website development cost in australia, how much does a website cost nz, small business website cost | Commercial investigation | Website Development Cost & Packages \| Prolifi AI |
| `/about` | Who Prolifi is | (brand) | Navigational | About Prolifi AI \| Strategy, Design & Development Team |
| `/contact` | Start a project | (brand + service) | Transactional | Contact Prolifi AI \| Start Your Website, MVP or AI Project |

**Cannibalisation watch:** the homepage and `/services` both mention every service. Keep the homepage on the overall proposition and let `/services` carry the service-specific terms (as implemented). Do not add service terms to `/about`.

**Not targeted:** city pages (Sydney, Melbourne, Auckland...) are P2 only. Create one only with genuine local proof (clients, case studies) for that city.

## 6. Future content (recommendations, not built)

| Topic | Target searches (P2/P3) | Format |
|---|---|---|
| How much does a website cost in Australia / NZ? | how much does a website cost in australia, website design nz cost, small business website cost | Guide (pairs with /pricing) |
| AI website builder vs a professionally built website | ai website builder vs professional website development, website redesign ai | Comparison article |
| How to choose the right AI tools for your business | how to choose the right ai tools for your business, ai tools for small business owners | Guide |
| How to validate a business idea before you build | how to validate a business idea, validate my business idea, business idea feasibility | Guide + checklist |
| How to build an MVP for your startup | how to build an mvp for your startup, mvp development process | Guide |
| Why is my website not showing up on Google / not converting? | why is my website not showing up on google, why is my website not converting | Diagnostic article |
| Case studies | (all commercial terms; proof) | Case study pages, once client approval exists |

## 7. Measurement plan (no tracking was added)

When analytics are connected, track: contact-form submissions by `service` value, CTA clicks ("Start a Project" by page), `/pricing` to `/contact` visits, and Search Console impressions for the P1 terms above. Hypotheses worth testing: the new hero increases scroll depth and contact visits; showing AUD/NZD prices increases pricing-page conversions.

## 8. What was changed in the site (2026-10-23)

Copy and metadata only. No layout, component structure, styling, motion, images, video, forms, tracking or URLs changed.

| Area | File | Change |
|---|---|---|
| Hero badge, H1, sub-copy | `src/components/home-hero.tsx` | "Make the right digital call. Then build it to win customers."; AU/NZ and services in badge and sub-copy |
| Site title, description, footer line | `src/content/site.ts` | New proposition and AU/NZ market |
| Proposition paragraph, pricing preview line | `src/components/home.tsx` | Strategy-design-development studio for AU/NZ; quoted SEO/MVP/AI work |
| Problem cards | `src/content/company.ts` | Added "Too many AI tools, no plan" and "An idea you have not tested" |
| FAQs | `src/content/company.ts` | Updated audience and service-fit answers; added three FAQs (template/AI-built sites, choosing AI tools, idea validation) |
| BUILD / LAUNCH / SCALE focus, message, intro | `src/content/services.ts` | Premium websites that convert / Get found and get chosen / Validate, build and automate |
| Services | `src/content/services.ts` | Added SEO and search visibility, AI tool selection and setup; renamed Product strategy to Idea validation and product strategy; published MVP and web app development (was hidden). These also appear in the contact form options. |
| What we do intro, value pillar 02, CTA band | components | Outcome-led wording |
| Services, pricing, about, contact titles and descriptions; services and about intros | `src/app/*/page.tsx` | Mapped to the keyword plan above |
| Share images | `src/app/opengraph-image.tsx`, `src/app/services/opengraph-image.tsx` | Match the new proposition |

## 9. Validation

- Pages reviewed: home, services, pricing, about, contact, header, footer, FAQs, metadata.
- Fit: hero H1 stays two lines on desktop (same height as before); the Scale stage lists six services and fits at 1440x900 and 1280x720; no horizontal overflow at 390 px.
- Checks run: TypeScript, ESLint, the email template tests (7/7) and a production build all pass.
- Claims: no rankings, leads, revenue or outcomes are promised; SEO and validation copy states the limits explicitly. Prices were not changed.
- Skills used: `marketing:seo-audit` (keyword research and on-page method). Ahrefs and analytics connectors were unavailable, so no volumes or performance data were used.

## 10. Decisions for the owner

1. **Currency:** prices are in USD for an AU/NZ audience. Consider AUD and NZD.
2. **Price positioning:** the stated goal of selling premium websites (around $10k) does not match the published $450 and $900 packages. The copy positions on quality and conversion and does not quote a premium price; align the packages when ready.
3. **Proof:** case studies with client approval would strengthen every commercial page more than any copy change.
