"use client";

import Link from "next/link";
import Image from "next/image";
import { Talent } from "@/lib/types";

interface SearchDropdownProps {
  results: Talent[];
  query: string;
  isOpen: boolean;
  onSelectResult?: () => void;
}

export default function SearchDropdown({
  results,
  query,
  isOpen,
  onSelectResult,
}: SearchDropdownProps) {
  if (!isOpen || !query.trim()) {
    return null;
  }

  return (
    <div className="absolute left-0 right-0 top-full mt-2 z-40 max-h-80 overflow-y-auto rounded-2xl border border-neutral-200 bg-white p-2 shadow-lg">
      {results.length === 0 ? (
        <div className="py-6 px-4 text-center text-sm text-neutral-500">
          No talent found matching &ldquo;<span className="font-semibold text-black">{query}</span>&rdquo;
        </div>
      ) : (
        <div className="divide-y divide-neutral-100">
          {results.slice(0, 8).map((talent) => (
            <Link
              key={talent.id}
              href={`/talent/${talent.id}`}
              onClick={onSelectResult}
              className="flex items-center gap-3.5 px-4 py-3 rounded-xl hover:bg-neutral-50 transition-colors text-left group"
            >
              <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border border-neutral-200 bg-neutral-100">
                <Image
                  src={talent.profilePicture}
                  alt={talent.name}
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-black truncate group-hover:underline">
                    {talent.name}
                  </p>
                  <span className="text-xs text-neutral-400 whitespace-nowrap">
                    {talent.location}
                  </span>
                </div>
                <p className="text-xs text-neutral-600 truncate">
                  {talent.designation} · {talent.primarySpecialty}
                </p>
              </div>
            </Link>
          ))}
          {results.length > 8 && (
            <div className="pt-2 pb-1 text-center">
              <span className="text-xs text-neutral-400">
                + {results.length - 8} more matches in directory below
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
