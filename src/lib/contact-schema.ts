import { z } from "zod";

/** Shared by the contact form (client) and /api/contact (server). */
export const budgetOptions = [
  "Under $500",
  "$500 - $1,000",
  "$1,000 - $2,500",
  "$2,500 or more",
  "Not sure yet",
] as const;

export const contactSchema = z.object({
  firstName: z.string().trim().min(1, "Please enter your first name.").max(80),
  lastName: z.string().trim().min(1, "Please enter your last name.").max(80),
  email: z.email("Please enter a valid email address.").max(200),
  business: z.string().trim().max(120).optional().default(""),
  location: z.string().trim().max(120).optional().default(""),
  service: z.string().trim().min(1, "Please choose the service you are interested in.").max(80),
  budget: z.string().trim().max(40).optional().default(""),
  details: z
    .string()
    .trim()
    .min(20, "Please tell us a little more about your project (at least 20 characters).")
    .max(5000, "Please keep your message under 5,000 characters."),
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
