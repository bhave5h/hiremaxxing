import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gigs & Opportunities | Hiremaxxing",
  description: "Browse freelance gigs, projects, and creative opportunities on Hiremaxxing.",
};

interface Gig {
  id: string;
  title: string;
  company: string;
  location: string;
  budget: string;
  skills: string[];
  description: string;
  contactMethod: string;
  contactLink: string;
}

const DUMMY_GIGS: Gig[] = [
  {
    id: "gig-1",
    title: "Brand Identity & Guidelines for AI Startup",
    company: "Cortex Labs",
    location: "Remote",
    budget: "$2,500 - $4,000",
    skills: ["Branding", "Graphic Design", "Typography", "Figma"],
    description: "Looking for a seasoned visual designer to establish complete brand positioning, color tokens, typography scales, and logo suite for our seed-stage developer tools platform.",
    contactMethod: "Email",
    contactLink: "mailto:founder@cortexlabs.ai",
  },
  {
    id: "gig-2",
    title: "Next.js & Tailwind Dashboard Implementation",
    company: "FleetPulse",
    location: "Remote / Hybrid",
    budget: "$40 - $65 / hr",
    skills: ["Frontend Development", "Next.js", "React", "TypeScript", "TailwindCSS"],
    description: "Build an interactive logistics analytics dashboard with real-time map visualizations and clean, accessible data tables. Designs ready in Figma.",
    contactMethod: "WhatsApp",
    contactLink: "https://wa.me/919876543210",
  },
  {
    id: "gig-3",
    title: "Photorealistic 3D Product Animations",
    company: "Aura Sound",
    location: "Remote",
    budget: "$1,800 - $3,000",
    skills: ["3D Design", "Blender", "Motion Design", "Cinema4D"],
    description: "Seeking a 3D artist to render high-resolution product turnarounds and exploding mechanical view animations for our new wireless audio hardware.",
    contactMethod: "Email",
    contactLink: "mailto:creative@aurasound.io",
  },
];

export default function GigsPage() {
  return (
    <div className="section-sm">
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-black transition-colors"
        >
          <span aria-hidden="true">&larr;</span> Back to directory
        </Link>
      </div>

      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="heading-lg">Gigs & Opportunities</h1>
        <p className="body-text mt-2 text-neutral-600">
          Discover active projects posted by founders, studios, and hiring teams. Connect directly with clients.
        </p>
      </div>

      <div className="space-y-6">
        {DUMMY_GIGS.map((gig) => (
          <div key={gig.id} className="card-interactive">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-black">{gig.title}</h2>
                <p className="text-sm font-medium text-neutral-600 mt-1">
                  {gig.company} · {gig.location}
                </p>
              </div>
              <div className="inline-block rounded-full bg-neutral-100 border border-neutral-200 px-3.5 py-1 text-xs font-semibold text-black whitespace-nowrap self-start">
                {gig.budget}
              </div>
            </div>

            <p className="body-text text-sm mt-4 text-neutral-700">
              {gig.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {gig.skills.map((skill) => (
                <span key={skill} className="tag text-xs">
                  {skill}
                </span>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
              <span className="text-xs text-neutral-400">
                Direct Contact via {gig.contactMethod}
              </span>
              <a
                href={gig.contactLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-xs"
              >
                Apply / Inquire &rarr;
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
