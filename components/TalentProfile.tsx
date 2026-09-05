import Link from "next/link";
import Image from "next/image";
import { Talent } from "@/lib/types";

interface TalentProfileProps {
  talent: Talent;
}

export default function TalentProfile({ talent }: TalentProfileProps) {
  const isAvailable = talent.availability === "Available";
  const isOpen = talent.availability === "Open to Offers";

  return (
    <div className="section-sm">
      {/* Back to Directory Link */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-black transition-colors"
        >
          <span aria-hidden="true">&larr;</span> Back to directory
        </Link>
      </div>

      {/* Main Profile Card */}
      <div className="card overflow-hidden">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Profile Picture */}
          <div className="relative h-32 w-32 md:h-40 md:w-40 flex-shrink-0 overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100">
            <Image
              src={talent.profilePicture}
              alt={talent.name}
              fill
              sizes="(max-width: 768px) 128px, 160px"
              priority
              className="object-cover"
            />
          </div>

          {/* Core Info */}
          <div className="flex-1 text-center md:text-left space-y-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div>
                <h1 className="heading-lg text-black">{talent.name}</h1>
                <p className="text-lg font-medium text-neutral-800">
                  {talent.designation}
                </p>
              </div>

              {/* Availability Indicator */}
              <div className="inline-flex items-center justify-center md:justify-start gap-2 rounded-full border border-neutral-200 px-3.5 py-1.5 text-xs">
                <span
                  className={`h-2 w-2 rounded-full ${
                    isAvailable
                      ? "bg-emerald-500"
                      : isOpen
                      ? "bg-amber-500"
                      : "bg-neutral-300"
                  }`}
                />
                <span className={isAvailable || isOpen ? "font-medium text-neutral-900" : "text-neutral-500"}>
                  {talent.availability}
                </span>
              </div>
            </div>

            <p className="body-sm text-neutral-500">
              {talent.organization} · {talent.location}
            </p>

            {talent.bio && (
              <p className="body-text text-neutral-700 pt-2">
                {talent.bio}
              </p>
            )}
          </div>
        </div>

        {/* Profile Metadata Grid */}
        <div className="mt-8 pt-8 border-t border-neutral-100 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          <div className="rounded-lg border border-neutral-100 bg-neutral-50/50 p-4">
            <p className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">
              Primary Specialty
            </p>
            <p className="text-sm font-semibold text-black mt-1">
              {talent.primarySpecialty}
            </p>
            <p className="text-xs text-neutral-500 mt-0.5">
              {talent.subSpecialty}
            </p>
          </div>

          <div className="rounded-lg border border-neutral-100 bg-neutral-50/50 p-4">
            <p className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">
              Experience
            </p>
            <p className="text-sm font-semibold text-black mt-1">
              {talent.yearsExperience} {talent.yearsExperience === 1 ? "Year" : "Years"}
            </p>
            <p className="text-xs text-neutral-500 mt-0.5">
              Professional practice
            </p>
          </div>

          <div className="rounded-lg border border-neutral-100 bg-neutral-50/50 p-4">
            <p className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">
              Location
            </p>
            <p className="text-sm font-semibold text-black mt-1">
              {talent.location}
            </p>
            <p className="text-xs text-neutral-500 mt-0.5">
              Available for remote & local
            </p>
          </div>
        </div>

        {/* Tags / Skills */}
        <div className="mt-8 pt-6 border-t border-neutral-100">
          <p className="text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-3">
            Skills & Specialties
          </p>
          <div className="flex flex-wrap gap-2">
            {talent.tags.map((tag) => (
              <span key={tag} className="tag text-xs px-3.5 py-1.5">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Direct Contact Actions */}
        <div className="mt-8 pt-6 border-t border-neutral-100">
          <p className="text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-4">
            Direct Contact & Links
          </p>
          <div className="flex flex-wrap items-center gap-3">
            {talent.portfolioLink && (
              <a
                href={talent.portfolioLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary gap-2"
              >
                <span>Portfolio</span>
                <span aria-hidden="true">&nearr;</span>
              </a>
            )}

            {talent.linkedin && (
              <a
                href={talent.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary gap-2"
              >
                <span>LinkedIn</span>
                <span aria-hidden="true">&nearr;</span>
              </a>
            )}

            {talent.email && (
              <a
                href={`mailto:${talent.email}`}
                className="btn-secondary gap-2"
              >
                <span>Email</span>
                <span aria-hidden="true">&rarr;</span>
              </a>
            )}

            {talent.whatsapp && (
              <a
                href={`https://wa.me/${talent.whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary gap-2"
              >
                <span>WhatsApp</span>
                <span aria-hidden="true">&nearr;</span>
              </a>
            )}

            {talent.x && (
              <a
                href={talent.x}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary gap-2"
              >
                <span>X (Twitter)</span>
                <span aria-hidden="true">&nearr;</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
