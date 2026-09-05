import Link from "next/link";
import { Metadata } from "next";
import GigsSection from "@/components/GigsSection";

export const metadata: Metadata = {
  title: "Gigs & Opportunities | Hiremaxxing",
  description: "Browse freelance gigs, projects, and creative opportunities on Hiremaxxing with direct poster chat.",
};

export default function GigsPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 pt-10">
      <div className="mb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-black transition-colors"
        >
          <span aria-hidden="true">&larr;</span> Back to directory
        </Link>
      </div>

      <GigsSection />
    </div>
  );
}
