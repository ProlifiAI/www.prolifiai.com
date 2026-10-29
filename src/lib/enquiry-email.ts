/**
 * Project enquiry notification email (sent to Prolifi via Resend).
 *
 * Pure module with no project imports, so it can be rendered and tested on
 * its own (see tests/enquiry-email.test.mjs). The API route resolves the
 * submitted dropdown values into readable labels before calling it.
 *
 * Email-client rules followed here: table layout, inline styles only,
 * system fonts, no flexbox/grid, no JavaScript, 640px max width that
 * collapses on phones, and a complete plain-text alternative.
 * Every submitted value is HTML-escaped; nothing from the visitor is ever
 * rendered as markup, and the reply link is only built from a validated
 * address.
 */

export type EnquiryEmailInput = {
  firstName: string;
  lastName: string;
  email: string;
  business: string;
  location: string;
  /** Readable service name, e.g. "Business websites" */
  service: string;
  /** Pillar the service belongs to, e.g. "Build"; empty when not applicable */
  stage: string;
  budget: string;
  details: string;
  /** Absolute site URL, used for the logo and the footer link */
  siteUrl: string;
};

export type EnquiryEmail = { subject: string; html: string; text: string };

const NOT_PROVIDED = "Not provided";

const c = {
  navy: "#0E3062",
  navyDeep: "#0A2348",
  yellow: "#F4C430",
  ink: "#0F1B30",
  muted: "#56627A",
  line: "#DDE3EC",
  panel: "#EEF2F8",
  soft: "#F6F8FB",
  page: "#F3F5F9",
  white: "#FFFFFF",
};

const font = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

/** Escapes text for HTML element content and attribute values. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Trimmed value, or the fallback when the visitor left it empty. */
function orFallback(value: string | undefined | null) {
  const v = (value ?? "").trim();
  return v || NOT_PROVIDED;
}

/** Removes line breaks and control characters, so a value is safe in a header line. */
function oneLine(value: string) {
  return value.replace(/[\u0000-\u001f\u007f]+/g, " ").replace(/\s+/g, " ").trim();
}

const EMAIL_RE = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/;

/** A mailto: link to reply to the visitor, or null when the address is not a plain, valid email. */
export function replyHref(email: string, subject: string): string | null {
  const address = email.trim();
  if (address.length > 254 || !EMAIL_RE.test(address)) return null;
  const [local, domain] = address.split("@");
  return `mailto:${encodeURIComponent(local)}@${domain}?subject=${encodeURIComponent(subject)}`;
}

export function enquirySubject(input: Pick<EnquiryEmailInput, "service" | "business">): string {
  const service = oneLine(input.service) || "General enquiry";
  const business = oneLine(input.business ?? "");
  return (business ? `New Project Enquiry — ${service} — ${business}` : `New Project Enquiry — ${service}`).slice(0, 200);
}

/** Visitor's message as HTML: escaped, paragraphs kept, single line breaks as <br>. */
function messageHtml(details: string) {
  const paragraphs = details
    .replace(/\r\n?/g, "\n")
    .trim()
    .split(/\n{2,}/)
    .map((p) => escapeHtml(p).replace(/\n/g, "<br>"));
  return paragraphs
    .map(
      (p, i) =>
        `<p style="margin:${i === 0 ? "0" : "14px"} 0 0 0;font-family:${font};font-size:15px;line-height:24px;color:${c.ink};">${p}</p>`
    )
    .join("");
}

function label(text: string, color = c.muted) {
  return `<div style="font-family:${font};font-size:11px;line-height:16px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;color:${color};">${text}</div>`;
}

function value(text: string, opts: { size?: number; weight?: number; muted?: boolean } = {}) {
  const { size = 15, weight = 500, muted = false } = opts;
  const isFallback = text === NOT_PROVIDED;
  return `<div style="margin-top:4px;font-family:${font};font-size:${size}px;line-height:${Math.round(size * 1.35)}px;font-weight:${isFallback ? 400 : weight};color:${isFallback || muted ? c.muted : c.ink};">${escapeHtml(text)}</div>`;
}

/** Two cells side by side that stack on phones (via the .stack class). */
function pair(left: string, right: string, gap = 24) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
<tr>
<td class="stack" width="50%" valign="top" style="padding-right:${gap / 2}px;">${left}</td>
<td class="stack stack-gap" width="50%" valign="top" style="padding-left:${gap / 2}px;">${right}</td>
</tr>
</table>`;
}

function sectionTitle(text: string) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
<tr><td style="padding-bottom:12px;border-bottom:1px solid ${c.line};">${label(text, c.navy)}</td></tr>
</table>`;
}

export function buildEnquiryEmail(input: EnquiryEmailInput): EnquiryEmail {
  const fullName = oneLine(`${input.firstName} ${input.lastName}`) || NOT_PROVIDED;
  const email = input.email.trim();
  const business = orFallback(input.business);
  const location = orFallback(input.location);
  const budget = orFallback(input.budget);
  const service = orFallback(input.service);
  const stage = (input.stage ?? "").trim();
  const details = (input.details ?? "").trim() || NOT_PROVIDED;
  const siteUrl = input.siteUrl.replace(/\/$/, "");
  const siteHost = siteUrl.replace(/^https?:\/\//, "");

  const subject = enquirySubject({ service: input.service, business: input.business });
  const reply = replyHref(email, "Re: Your project enquiry with Prolifi");
  const preheader = `${service}${budget !== NOT_PROVIDED ? ` · ${budget}` : ""} · from ${fullName}`;

  const replyButton = reply
    ? `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:28px;">
<tr><td bgcolor="${c.navy}" style="border-radius:999px;">
<a href="${escapeHtml(reply)}" style="display:inline-block;padding:14px 28px;font-family:${font};font-size:15px;line-height:20px;font-weight:600;color:${c.white};text-decoration:none;border-radius:999px;">Reply to Enquiry <span style="color:${c.yellow};">&rarr;</span></a>
</td></tr>
</table>
<div style="margin-top:12px;font-family:${font};font-size:13px;line-height:20px;color:${c.muted};">Or reply to this email: it goes straight to ${escapeHtml(email)}.</div>`
    : "";

  const emailValue = reply
    ? `<div style="margin-top:4px;font-family:${font};font-size:15px;line-height:20px;font-weight:500;"><a href="mailto:${escapeHtml(email)}" style="color:${c.navy};text-decoration:underline;">${escapeHtml(email)}</a></div>`
    : value(email || NOT_PROVIDED);

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${escapeHtml(subject)}</title>
<style>
  @media only screen and (max-width: 620px) {
    .container { width: 100% !important; }
    .px { padding-left: 22px !important; padding-right: 22px !important; }
    .stack { display: block !important; width: 100% !important; padding-left: 0 !important; padding-right: 0 !important; }
    .stack-gap { padding-top: 18px !important; }
    .hero-value { font-size: 22px !important; line-height: 28px !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background-color:${c.page};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${c.page};">${escapeHtml(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${c.page}" style="background-color:${c.page};">
<tr><td align="center" style="padding:32px 12px;">

<table role="presentation" class="container" width="640" cellpadding="0" cellspacing="0" border="0" style="width:640px;max-width:640px;background-color:${c.white};border:1px solid ${c.line};border-radius:14px;overflow:hidden;">

<!-- Header -->
<tr><td class="px" bgcolor="${c.navy}" style="background-color:${c.navy};padding:28px 40px 30px 40px;border-bottom:3px solid ${c.yellow};">
<img src="${escapeHtml(siteUrl)}/brand/prolifi-logo-white.png" width="128" height="24" alt="PROLIFI" style="display:block;border:0;outline:none;width:128px;height:auto;font-family:${font};font-size:20px;font-weight:700;letter-spacing:4px;color:${c.white};">
<div style="margin-top:22px;font-family:${font};font-size:12px;line-height:16px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;color:${c.yellow};">New project enquiry</div>
<div style="margin-top:6px;font-family:${font};font-size:15px;line-height:22px;color:#C9D3E6;">You&#39;ve received a new enquiry through the Prolifi website.</div>
</td></tr>

<!-- Project summary -->
<tr><td class="px" style="padding:28px 40px 0 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${c.panel}" style="background-color:${c.panel};border-radius:12px;">
<tr><td style="padding:24px 24px 22px 24px;">
${pair(
  `${label("Service of interest")}<div class="hero-value" style="margin-top:6px;font-family:${font};font-size:24px;line-height:30px;font-weight:700;color:${service === NOT_PROVIDED ? c.muted : c.navy};">${escapeHtml(service)}</div>${
    stage ? `<div style="margin-top:6px;font-family:${font};font-size:12px;line-height:16px;font-weight:600;letter-spacing:1.2px;text-transform:uppercase;color:${c.muted};">${escapeHtml(stage)} stage</div>` : ""
  }`,
  `${label("Budget range")}<div class="hero-value" style="margin-top:6px;font-family:${font};font-size:24px;line-height:30px;font-weight:700;color:${budget === NOT_PROVIDED ? c.muted : c.navy};">${escapeHtml(budget)}</div>`
)}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:20px;">
<tr><td style="border-top:1px solid #D3DBE8;font-size:0;line-height:0;height:1px;">&nbsp;</td></tr>
</table>
<div style="height:18px;line-height:18px;font-size:0;">&nbsp;</div>
${pair(`${label("Business")}${value(business, { weight: 600 })}`, `${label("Location")}${value(location, { weight: 600 })}`)}
</td></tr>
</table>
</td></tr>

<!-- Client details -->
<tr><td class="px" style="padding:32px 40px 0 40px;">
${sectionTitle("Client details")}
<div style="height:16px;line-height:16px;font-size:0;">&nbsp;</div>
${pair(`${label("Full name")}${value(fullName, { weight: 600 })}`, `${label("Email address")}${emailValue}`)}
</td></tr>

<!-- Project details -->
<tr><td class="px" style="padding:32px 40px 0 40px;">
${sectionTitle("Project details")}
<div style="height:16px;line-height:16px;font-size:0;">&nbsp;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${c.soft}" style="background-color:${c.soft};border:1px solid ${c.line};border-radius:10px;">
<tr><td style="padding:20px 22px;">${messageHtml(details)}</td></tr>
</table>
${replyButton}
</td></tr>

<!-- Footer -->
<tr><td class="px" style="padding:36px 40px 28px 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
<tr><td style="padding-top:18px;border-top:1px solid ${c.line};font-family:${font};font-size:12px;line-height:18px;color:${c.muted};">
Prolifi AI &middot; Website Enquiry Notification &middot; <a href="${escapeHtml(siteUrl)}" style="color:${c.muted};text-decoration:underline;">${escapeHtml(siteHost)}</a>
</td></tr>
</table>
</td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;

  const text = [
    "PROLIFI — NEW PROJECT ENQUIRY",
    "You've received a new enquiry through the Prolifi website.",
    "",
    "PROJECT SUMMARY",
    `Service of interest: ${service}${stage ? ` (${stage} stage)` : ""}`,
    `Budget range: ${budget}`,
    `Business: ${business}`,
    `Location: ${location}`,
    "",
    "CLIENT DETAILS",
    `Full name: ${fullName}`,
    `Email address: ${email || NOT_PROVIDED}`,
    "",
    "PROJECT DETAILS",
    details.replace(/\r\n?/g, "\n"),
    "",
    reply ? `Reply to this email to respond to ${fullName} directly.` : "",
    "",
    "—",
    `Prolifi AI · Website Enquiry Notification · ${siteHost}`,
  ]
    .filter((line, i, all) => !(line === "" && all[i - 1] === ""))
    .join("\n");

  return { subject, html, text };
}
