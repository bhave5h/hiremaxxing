import Link from "next/link";
import Image from "next/image";
import { Talent } from "@/lib/types";

interface TalentCardProps {
  talent: Talent;
}

export default function TalentCard({ talent }: TalentCardProps) {
  const isAvailable = talent.availability === "Available";
  const isOpen = talent.availability === "Open to Offers";

  return (
    <div className="card-interactive flex flex-col justify-between text-center group">
      <div>
        {/* Profile Picture */}
        <div className="mx-auto mb-4 relative h-20 w-20 overflow-hidden rounded-full border border-neutral-200 bg-neutral-100">
          <Image
            src={talent.profilePicture}
            alt={talent.name}
            fill
            sizes="80px"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Identity & Role */}
        <h3 className="text-lg font-semibold text-black tracking-tight group-hover:underline">
          <Link href={`/talent/${talent.id}`}>
            {talent.name}
          </Link>
        </h3>
        <p className="text-sm font-medium text-neutral-800 mt-0.5">
          {talent.designation}
        </p>
        <p className="text-xs text-neutral-500 mt-1">
          {talent.organization} · {talent.location}
        </p>

        {/* Availability Badge */}
        <div className="mt-3 flex items-center justify-center gap-1.5 text-xs">
          <span
            className={`h-2 w-2 rounded-full ${
              isAvailable
                ? "bg-emerald-500"
                : isOpen
                ? "bg-amber-500"
                : "bg-neutral-300"
            }`}
          />
          <span className={isAvailable || isOpen ? "font-medium text-neutral-700" : "text-neutral-400"}>
            {talent.availability}
          </span>
        </div>

        {/* Specialty */}
        <div className="mt-4 pt-3 border-t border-neutral-100">
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
            {talent.primarySpecialty}
          </p>
          <p className="text-xs text-neutral-600 mt-0.5">
            {talent.subSpecialty}
          </p>
        </div>

        {/* Tags */}
        <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5">
          {talent.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* View Profile Action */}
      <div className="mt-6 pt-4 border-t border-neutral-100">
        <Link
          href={`/talent/${talent.id}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-black hover:gap-2 transition-all"
        >
          View Profile <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </div>
  );
}
