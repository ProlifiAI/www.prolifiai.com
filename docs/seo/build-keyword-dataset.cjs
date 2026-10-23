// Builds docs/seo/keyword-research.csv from raw Google Autocomplete results.
//
// Source: suggestqueries.google.com (client=firefox), gl=au / gl=nz, hl=en-AU / en-NZ,
// collected 2026-10-23 from seed phrases in clusters A-H (see keyword-strategy.md).
// Autocomplete shows that people search a phrase; it gives NO search volume,
// difficulty or CPC, so those columns are marked "unavailable", never estimated.
//
// Usage: node docs/seo/build-keyword-dataset.cjs <suggest.json> [out.csv]
// suggest.json: [{ gl: "au"|"nz", c: clusterLetter, seed, s: suggestion }]
const fs = require("fs");
const path = require("path");

const [input, out = path.join(__dirname, "keyword-research.csv")] = process.argv.slice(2);
const rows = JSON.parse(fs.readFileSync(input, "utf8"));
const COLLECTED = "2026-10-23";

const clusterName = {
  A: "Website development and design",
  B: "Custom software, MVP and product development",
  C: "AI implementation and automation",
  D: "Idea validation and market research",
  E: "Visibility, SEO and conversion",
  F: "Problem and outcome-led searches",
  G: "Geographic and local intent",
  H: "Long-tail, comparison and positioning",
};

// Searches outside Australia / New Zealand, or about another country
const FOREIGN = /\b(india|indian|usa|uk|london|dubai|bangalore|chennai|delhi|pakistan|philippines|malaysia|kenya|nepal|kolkata|mumbai|sri lanka|lahore|islamabad|bhubaneswar|hoboken|carmarthen|surrey|brighton|south africa|abu dhabi|fl|dorset|italy|hindi|tamil|adalah|garage2global|new york|bangladesh)\b/;
// Not a buyer looking for a service: jobs, study, tax codes, games, unrelated tools
const NOISE = /\b(jobs?|salary|course|courses|meaning|full form|templates?|free|hsn|sac code|tds|images|icon|engineer|intern|roblox|simulator|tycoon|palworld|ableton|fl studio|excel|outlook|aadhaar|garage door|blinds|minecraft|youtube|pdf|mp3|handwriting|text to|photoshop|destiny|metrocard|medical|abn|survey|questionnaire|email address|train ticket|signature|jira|book|prompt|login|dashboard|help|support|anzsco|vetassess|skill assessment|certification|definition|explain|hosting|lovable|vscode|horizons|hostinger|wix|squarespace|deloitte|accenture|capgemini|cadence|slack|sap|satisfactory|biomass|whatsapp|instagram|food|ingots|cooking|your home|kmo|limited|ltd|photos|chatgpt|tools n8n|languages|life cycle|model|methodology|frameworks?|techniques|ideas|inspiration|ui$|v$|vs verification|testing|report|platform tools|manager|lead|specialist|depreciation|ato|tax|blockhouse bay|northside|cbd|north sydney|west auckland|ndis|kiwi web design|ultimate web designs|webdesign|portfolio|vs web developer|reddit|y combinator|startup school|group|hub|hiring|funding|crowdfunding|government website)\b|agency website|consulting business$|automation agency website/;

const CITY = /\b(sydney|melbourne|brisbane|perth|adelaide|canberra|hobart|gold coast|auckland|wellington|christchurch|hamilton|tauranga|dunedin)\b/;
// Someone looking for a do-it-yourself builder or a list of tools, not a studio
const DIY = /(website builder|builder for|ai tools for small business|best ai tools|ai workflow automation (tools|platform)|product discovery tools|web app development (tools|platforms)|ai automation tools)/;

function classify(r) {
  const k = r.s.toLowerCase();
  const country = r.gl === "au" ? "Australia" : "New Zealand";
  const city = (k.match(CITY) || [])[0];
  const nationalMention = /\baustralia\b/.test(k) ? "Australia (national)" : /\b(nz|new zealand)\b/.test(k) ? "New Zealand (national)" : "";
  const location = city ? city[0].toUpperCase() + city.slice(1) : nationalMention || "No location in query";

  // Exclusions first
  if (FOREIGN.test(k)) return { country, location, exclude: "Targets another country or region" };
  if (city && ((r.gl === "au" && /auckland|wellington|christchurch/.test(city)) || (r.gl === "nz" && /sydney|melbourne|brisbane|perth|adelaide/.test(city))))
    return { country, location, exclude: "City outside this country's market" };
  if (NOISE.test(k)) return { country, location, exclude: "Not service-buyer intent (jobs, study, tax, tools, games or unrelated)" };

  // Do-it-yourself and tool-list searches: useful for content, not a service page
  if (DIY.test(k) && !/ai website builder vs professional/.test(k))
    return { country, location, intent: "Informational (tool / do-it-yourself)", funnel: "Awareness", relevance: "Medium", priority: "P3", page: "Future article / FAQ", use: "Future educational content (choosing AI tools, builder vs professional site)" };

  // Intent
  const question = /^(how|why|what|which|best)\b/.test(k);
  const cost = /\b(cost|costs|price|pricing|rates?|hourly rate|how much)\b/.test(k);
  const service = /\b(company|companies|agency|agencies|services?|consultant|consultants|consulting|developer|developers|designer|designers|near me|firm|partner|for small business(es)?|for startups?|for small business owners|for tradies|implementation|automation agency)\b/.test(k) || !!city;
  let intent, funnel;
  if (cost) { intent = "Commercial investigation"; funnel = "Consideration"; }
  else if (question) { intent = "Informational (problem-aware)"; funnel = "Awareness"; }
  else if (service) { intent = "Transactional / commercial"; funnel = "Decision"; }
  else { intent = "Commercial investigation"; funnel = "Consideration"; }

  // Fit with Prolifi's confirmed services (websites, social/launch, SEO, idea validation, MVP/web apps, AI selection and setup)
  const fitHigh = /(website|web design|web development|web developer|website design|redesign|mvp|web app|app develop|software development for small|ai consult|ai implementation|ai automation|ai integration|workflow automation|business process automation|ai tools for small business|validate|validation|feasibility|seo|google business profile|conversion|premium web|ai website builder vs professional|landing page)/.test(k);
  const relevance = fitHigh ? "High" : "Medium";

  // Priority (documented in keyword-strategy.md)
  let priority;
  if (intent === "Transactional / commercial" && relevance === "High" && !city) priority = "P1";
  else if (relevance === "High" && (intent === "Transactional / commercial" || intent === "Commercial investigation")) priority = "P2";
  else if (intent.startsWith("Informational")) priority = "P3";
  else priority = "P2";

  // Page mapping (existing URLs only; future pages are flagged)
  let page;
  if (cost && /(website|web)/.test(k)) page = "/pricing";
  else if (/(mvp|web app|app develop|software|saas|prototype|product discovery|validate|validation|feasibility|product strategy|product management)/.test(k)) page = "/services#scale";
  else if (/(ai |ai$|automation|workflow)/.test(k)) page = "/services#scale (AI)";
  else if (/(seo|google business|visibility|showing up on google|coming up on google|ranking)/.test(k)) page = "/services#launch";
  else if (/(convert|conversion)/.test(k)) page = "/services#build";
  else if (/(website|web design|web develop|web designer|website designer|redesign)/.test(k)) page = city ? "/services#build (future location page only if justified)" : "/services#build";
  else page = "Future content";
  if (intent.startsWith("Informational") && !cost) page = "Future article / FAQ";

  const use = priority === "P1" ? "Title, H1/H2 or body copy on mapped page" : priority === "P2" ? "Body copy, FAQ or supporting heading" : "Future educational content";
  return { country, location, intent, funnel, relevance, priority, page, use };
}

const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
const header = [
  "keyword", "country", "location", "topic_cluster", "search_intent", "funnel_stage",
  "monthly_search_volume", "keyword_difficulty", "cpc", "serp_observation",
  "commercial_relevance", "business_value", "priority", "recommended_page", "recommended_use",
  "source", "date_collected", "confidence", "exclusion_reason", "seed_phrase",
];
const lines = [header.join(",")];
const counts = {};
for (const r of rows) {
  const c = classify(r);
  const priority = c.exclude ? "Exclude" : c.priority;
  counts[priority] = (counts[priority] || 0) + 1;
  lines.push([
    r.s, c.country, c.location, clusterName[r.c] || r.c,
    c.intent || "", c.funnel || "",
    "unavailable", "unavailable", "unavailable",
    "Not observed (no SERP tool); see competitor notes in keyword-strategy.md",
    c.relevance || "Low", c.exclude ? "Low" : c.relevance === "High" ? (c.priority === "P1" ? "High" : "Medium") : "Low",
    priority, c.page || "", c.use || "",
    `Google Autocomplete (gl=${r.gl})`, COLLECTED,
    c.exclude ? "High (excluded on clear rule)" : "Medium (autocomplete confirms the phrase is searched; no volume data)",
    c.exclude || "", r.seed,
  ].map(esc).join(","));
}
fs.writeFileSync(out, lines.join("\n") + "\n");
console.log(`wrote ${rows.length} rows to ${out}`, counts);
