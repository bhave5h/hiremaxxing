export type AvailabilityStatus = "Available" | "Open to Offers" | "Busy";

export interface Talent {
  id: string;
  name: string;
  designation: string;
  organization: string;
  location: string;
  availability: AvailabilityStatus;
  primarySpecialty: string;
  subSpecialty: string;
  yearsExperience: number;
  portfolioLink: string;
  linkedin: string;
  email: string;
  profilePicture: string;
  tags: string[];
  x?: string;
  whatsapp?: string;
  bio?: string;
}

export interface SearchResult {
  talent: Talent;
  matchedFields: string[];
}
