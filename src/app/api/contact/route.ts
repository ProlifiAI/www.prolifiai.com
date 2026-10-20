import { NextResponse } from "next/server";

import { contactSchema, toFieldErrors, type ContactInput, type ContactResponse } from "@/lib/contact-schema";
import { pillarOptions, serviceOptions } from "@/content/services";
import { site } from "@/content/site";

/**
 * Project enquiry endpoint. Every enquiry is delivered to site.enquiryEmail
 * (info@prolifiai.com).
 *
 * Delivery uses the Resend REST API (https://resend.com/docs/api-reference/emails/send-email),
 * configured with server-only environment variables (see .env.example):
 *   RESEND_API_KEY      required, secret
 *   CONTACT_FROM_EMAIL  required, a sender on a domain verified in Resend,
 *                       e.g. "Prolifi Website <website@prolifiai.com>"
 *
 * The recipient is fixed in code on purpose, so a stale CONTACT_TO_EMAIL in
 * the hosting settings cannot send enquiries to an old inbox.
 *
 * Without configuration:
 *   - development: the enquiry is logged to the server console and the
 *     response says it was NOT delivered, so the UI never pretends otherwise
 *   - production: the endpoint returns 503 and the UI shows an error
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, message: "Invalid request." }, 400);
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    // A filled honeypot is a bot: answer as if accepted, deliver nothing.
    if (parsed.error.issues.some((i) => i.path[0] === "website")) {
      return json({ ok: true, delivered: true });
    }
    return json({ ok: false, errors: toFieldErrors(parsed.error), message: "Please check the highlighted fields." }, 422);
  }

  const data = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = site.enquiryEmail;

  if (!apiKey || !from) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[contact] Email delivery is not configured. Enquiry for ${to} received in development:\n`, formatText(data));
      return json({ ok: true, delivered: false, reason: "not-configured" });
    }
    console.error("[contact] RESEND_API_KEY or CONTACT_FROM_EMAIL is missing.");
    return json({ ok: false, message: "Our enquiry form is temporarily unavailable." }, 503);
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email,
        subject: `New enquiry: ${serviceLabel(data.service)} from ${data.firstName} ${data.lastName}${data.business ? ` (${data.business})` : ""}`,
        text: formatText(data),
      }),
    });
    if (!res.ok) {
      console.error("[contact] Resend responded with", res.status, await res.text());
      return json({ ok: false, message: "We could not send your message." }, 502);
    }
  } catch (err) {
    console.error("[contact] Delivery failed", err);
    return json({ ok: false, message: "We could not send your message." }, 502);
  }

  return json({ ok: true, delivered: true });
}

function json(body: ContactResponse, status = 200) {
  return NextResponse.json(body, { status });
}

function serviceLabel(value: string) {
  const service = [...serviceOptions, ...pillarOptions].find((s) => s.value === value);
  return service ? `${service.group} / ${service.label}` : value === "not-sure" ? "Not sure yet" : value;
}

function formatText(d: ContactInput) {
  return [
    `Name: ${d.firstName} ${d.lastName}`,
    `Email: ${d.email}`,
    `Business: ${d.business || "-"}`,
    `Location: ${d.location || "-"}`,
    `Service of interest: ${serviceLabel(d.service)}`,
    `Budget: ${d.budget || "-"}`,
    "",
    "Message:",
    d.details,
  ].join("\n");
}
