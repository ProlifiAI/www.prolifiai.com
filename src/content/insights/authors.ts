import { team } from "@/content/company";

/**
 * Article authors come from the verified team list, so names, roles, photos
 * and profile links are defined once and stay consistent across the site.
 */
export type Author = {
  name: string;
  role: string;
  photo: string;
  /** On-site profile (the founders section of the About page) */
  profile: string;
  /** External profiles for structured data and the author card */
  sameAs: string[];
};

const photos: Record<string, string> = {
  "Paul Stephen": "/images/team/paul-stephen.jpg",
};

export function authorByName(name: string | undefined): Author | undefined {
  if (!name) return undefined;
  const person = team.find((t) => t.name === name);
  if (!person) return undefined;
  return {
    name: person.name,
    role: person.role.replace(" / ", " & "),
    photo: photos[person.name] ?? person.portrait,
    profile: "/about#founders-title",
    sameAs: [person.linkedin, person.instagram].filter(Boolean),
  };
}
