import { Talent } from "./types";
import talentDataRaw from "@/data/talent.json";

export const allTalents: Talent[] = talentDataRaw as Talent[];

/**
 * Searches talent list across multiple fields:
 * - name
 * - designation
 * - organization
 * - location
 * - primarySpecialty
 * - subSpecialty
 * - tags
 * 
 * Case-insensitive, partial-match capable, fast client-side execution.
 */
export function searchTalent(query: string, list: Talent[] = allTalents): Talent[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) {
    return list;
  }

  // Split query into tokens for multi-term matching (e.g., "graphic nagpur")
  const tokens = trimmed.split(/\s+/).filter(Boolean);

  return list.filter((talent) => {
    const searchableStrings = [
      talent.name,
      talent.designation,
      talent.organization,
      talent.location,
      talent.primarySpecialty,
      talent.subSpecialty,
      ...talent.tags,
    ].map((s) => s.toLowerCase());

    // All tokens must match at least one searchable field
    return tokens.every((token) =>
      searchableStrings.some((field) => field.includes(token))
    );
  });
}

/**
 * Retrieves an individual talent profile by ID.
 */
export function getTalentById(id: string, list: Talent[] = allTalents): Talent | undefined {
  return list.find((t) => t.id === id);
}

/**
 * Extracts a deduplicated list of all primary specialties.
 */
export function getAllSpecialties(list: Talent[] = allTalents): string[] {
  const specialties = new Set<string>();
  list.forEach((t) => {
    if (t.primarySpecialty) {
      specialties.add(t.primarySpecialty);
    }
  });
  return Array.from(specialties).sort();
}
