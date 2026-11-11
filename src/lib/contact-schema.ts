import { z } from "zod";

/**
 * Shared by the multi-step enquiry form (client) and /api/contact (server).
 *
 * Step 1 picks one or more services; step 2 collects the project details;
 * step 3 reviews both before sending. Each step validates only its own
 * fields (step1Schema / step2Schema); the API validates the whole thing.
 */

export const enquiryServices = [
  { id: "new-website", label: "Build a new website" },
  { id: "redesign", label: "Redesign my existing website" },
  { id: "social-media", label: "Social media management and content" },
  { id: "digital-product", label: "Build an app or digital product" },
  { id: "scale-product", label: "Improve or scale an existing product" },
  { id: "growth-strategy", label: "Digital growth and strategy" },
  { id: "something-else", label: "Something else" },
] as const;

export type EnquiryServiceId = (typeof enquiryServices)[number]["id"];
const serviceIds = enquiryServices.map((s) => s.id) as [EnquiryServiceId, ...EnquiryServiceId[]];

export function serviceLabel(id: string) {
  return enquiryServices.find((s) => s.id === id)?.label ?? id;
}

/** Ranges follow the packages on the pricing page (Standard $500, Premium $1,200, Enterprise quoted). */
export const budgetOptions = ["Under $500", "$500 - $1,200", "$1,200 - $5,000", "$5,000 or more", "Not sure yet"] as const;

export const timelineOptions = ["As soon as possible", "Within 1 month", "1 to 3 months", "3 months or more", "Flexible"] as const;

const optionalText = (max: number) => z.string().trim().max(max).optional().default("");

export const step1Schema = z.object({
  services: z
    .array(z.enum(serviceIds), { error: "Please choose at least one service." })
    .min(1, "Please choose at least one service.")
    .max(enquiryServices.length),
  servicesNote: z.string().trim().max(500, "Please keep this under 500 characters.").optional().default(""),
});

export const step2Schema = z.object({
  fullName: z.string({ error: "Please enter your full name." }).trim().min(2, "Please enter your full name.").max(120),
  email: z.email({ error: "Please enter a valid business email address." }).max(200),
  company: z
    .string({ error: "Please enter your company or business name." })
    .trim()
    .min(1, "Please enter your company or business name.")
    .max(120),
  /** Website or social profile; free text so handles like "@prolifi" are accepted */
  link: optionalText(200),
  details: z
    .string({ error: "Please describe your project in a sentence or two (20+ characters)." })
    .trim()
    .min(20, "Please describe your project in a sentence or two (20+ characters).")
    .max(5000, "Please keep your description under 5,000 characters."),
  budget: z.union([z.enum(budgetOptions), z.literal("")]).optional().default(""),
  timeline: z.union([z.enum(timelineOptions), z.literal("")]).optional().default(""),
});

export const contactSchema = step1Schema.extend(step2Schema.shape).extend({
  /** Honeypot: real visitors never see or fill this field */
  website: z.string().max(0).optional().default(""),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

export type ContactResponse =
  | { ok: true; delivered: true }
  | { ok: true; delivered: false; reason: "not-configured" }
  | { ok: false; errors?: ContactErrors; message: string };

export function toFieldErrors(error: z.ZodError): ContactErrors {
  const out: ContactErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as keyof ContactInput;
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}
