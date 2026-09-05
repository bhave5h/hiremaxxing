export interface GigPoster {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  verified: boolean;
  responseTime: string;
  status: "online" | "away";
  whatsapp?: string;
  email?: string;
  initialGreeting: string;
}

export type GigCategory = "All" | "Design" | "Engineering" | "3D & Motion" | "Mobile" | "Marketing";

export interface Gig {
  id: string;
  title: string;
  company: string;
  category: "Design" | "Engineering" | "3D & Motion" | "Mobile" | "Marketing";
  type: "Contract" | "Fixed Project" | "Part-time" | "Hourly";
  budget: string;
  duration: string;
  location: string;
  postedAt: string;
  urgency?: "Hiring Urgently" | "Actively Reviewing" | "Featured";
  description: string;
  deliverables: string[];
  skills: string[];
  poster: GigPoster;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "poster";
  text: string;
  timestamp: string;
}
