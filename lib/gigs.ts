import { Gig, GigCategory } from "./gigTypes";
import rawGigs from "@/data/gigs.json";

export const allGigs: Gig[] = rawGigs as Gig[];

export function getGigById(id: string): Gig | undefined {
  return allGigs.find((g) => g.id === id);
}

export function filterGigsByCategory(category: GigCategory, list: Gig[] = allGigs): Gig[] {
  if (category === "All") {
    return list;
  }
  return list.filter((g) => g.category === category);
}

export const GIG_CATEGORIES: GigCategory[] = [
  "All",
  "Design",
  "Engineering",
  "3D & Motion",
  "Mobile",
  "Marketing",
];
