// Tests for the enquiry notification email. Run with `npm test` (Node's built-in
// test runner; Node strips the TypeScript types from the imported module).
// The values below are test fixtures only; nothing here ships in the site.
import { test } from "node:test";
import assert from "node:assert/strict";

import { buildEnquiryEmail, enquirySubject, escapeHtml, replyHref } from "../src/lib/enquiry-email.ts";

const base = {
  fullName: "Ada Okafor",
  email: "ada@example.com",
  company: "Okafor Studio",
  link: "okaforstudio.com",
  services: ["Build a new website"],
  servicesNote: "",
  budget: "$500 - $1,200",
  timeline: "1 to 3 months",
  details: "We need a new website.\n\nIt should take bookings.",
  siteUrl: "https://www.prolifiai.com",
};

test("shows the submitted values, with services and budget in the summary", () => {
  const { html, text, subject } = buildEnquiryEmail(base);
  for (const v of ["Build a new website", "$500 - $1,200", "1 to 3 months", "Okafor Studio", "okaforstudio.com", "Ada Okafor", "ada@example.com"]) {
    assert.ok(html.includes(escapeHtml(v)), `html is missing ${v}`);
  }
  assert.ok(html.indexOf("Service of interest") < html.indexOf("Client details"), "summary comes before client details");
  assert.match(text, /Services of interest: Build a new website/);
  assert.match(text, /Budget range: \$500 - \$1,200/);
  assert.match(text, /Preferred timeline: 1 to 3 months/);
  assert.equal(subject, "New Project Enquiry — Build a new website — Okafor Studio");
});

test("lists every chosen service and the step-one note", () => {
  const services = ["Build a new website", "Social media management and content", "Digital growth and strategy"];
  const { html, text, subject } = buildEnquiryEmail({ ...base, services, servicesNote: "Launching in March." });
  for (const s of services) assert.ok(html.includes(escapeHtml(s)), `html is missing ${s}`);
  assert.ok(html.includes("Services of interest"));
  assert.match(text, /Services of interest: Build a new website, Social media management and content, Digital growth and strategy/);
  assert.ok(html.includes("Launching in March.") && text.includes("Launching in March."));
  assert.equal(subject, "New Project Enquiry — Build a new website +2 more — Okafor Studio");
});

test("missing optional fields read 'Not provided', never undefined or empty", () => {
  const { html, text, subject } = buildEnquiryEmail({ ...base, company: "", link: "   ", budget: "", timeline: "" });
  assert.equal(subject, "New Project Enquiry — Build a new website");
  assert.equal((text.match(/Not provided/g) ?? []).length, 4);
  assert.ok(!/undefined|null|\{\{|\$\{/.test(html), "no raw template output");
  assert.ok(!/undefined|null/.test(text));
});

test("escapes HTML and special characters in every visitor field", () => {
  const evil = '<script>alert("x")</script> & <b>bold</b> \'quote\'';
  const { html } = buildEnquiryEmail({ ...base, fullName: evil, company: evil, link: evil, services: [evil], servicesNote: evil, details: evil });
  assert.ok(!html.includes("<script>"), "no script tag");
  assert.ok(!html.includes("<b>bold</b>"), "no injected markup");
  assert.ok(html.includes("&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt; &amp; &lt;b&gt;bold&lt;/b&gt; &#39;quote&#39;"));
});

test("keeps the message's paragraphs and line breaks", () => {
  const { html, text } = buildEnquiryEmail({ ...base, details: "Line one\nLine two\r\n\r\nSecond paragraph" });
  assert.ok(html.includes("Line one<br>Line two</p>"));
  assert.ok(html.includes(">Second paragraph</p>"));
  assert.ok(text.includes("Line one\nLine two\n\nSecond paragraph"));
});

test("subject cannot carry header injection or line breaks", () => {
  const subject = enquirySubject({ services: ["Websites\r\nBcc: x@evil.test"], company: "Acme\nCo" });
  assert.ok(!/[\r\n]/.test(subject));
  assert.equal(subject, "New Project Enquiry — Websites Bcc: x@evil.test — Acme Co");
});

test("reply link: encoded for valid addresses, omitted for unsafe ones", () => {
  assert.equal(replyHref("ada@example.com", "Re: Hi & bye"), "mailto:ada@example.com?subject=Re%3A%20Hi%20%26%20bye");
  assert.equal(replyHref("ada+web@example.com", "x"), "mailto:ada%2Bweb@example.com?subject=x");
  assert.equal(replyHref('ada@example.com?bcc=x@evil.test', "x"), null);
  assert.equal(replyHref("javascript:alert(1)", "x"), null);
  assert.equal(replyHref("not-an-email", "x"), null);

  const ok = buildEnquiryEmail(base).html;
  assert.ok(ok.includes("Reply to Enquiry"));
  const bad = buildEnquiryEmail({ ...base, email: "broken address" }).html;
  assert.ok(!bad.includes("Reply to Enquiry"), "button omitted without a valid address");
  assert.ok(!bad.includes('href="mailto:broken'), "no broken mailto link");
});

test("email is table-based and self-contained", () => {
  const { html } = buildEnquiryEmail(base);
  assert.ok(html.includes('role="presentation"'));
  assert.ok(!/<script|display:\s*(flex|grid)|<link /i.test(html), "no scripts, flex/grid or external stylesheets");
  assert.ok(html.includes("https://www.prolifiai.com/brand/prolifi-logo-white.png"));
  assert.ok(html.includes("Prolifi AI &middot; Website Enquiry Notification"));
});
