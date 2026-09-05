"use client";

import { useState, useMemo } from "react";
import { Talent } from "@/lib/types";
import { searchTalent, getAllSpecialties } from "@/lib/search";
import TalentCard from "./TalentCard";

interface TalentGridProps {
  initialTalents: Talent[];
  searchQuery: string;
  onClearSearch?: () => void;
}

export default function TalentGrid({
  initialTalents,
  searchQuery,
  onClearSearch,
}: TalentGridProps) {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("All");

  const specialties = useMemo(() => {
    return ["All", ...getAllSpecialties(initialTalents)];
  }, [initialTalents]);

  // Filter based on both text search and specialty pill selection
  const filteredTalents = useMemo(() => {
    let result = initialTalents;

    // Apply text search
    if (searchQuery.trim()) {
      result = searchTalent(searchQuery, result);
    }

    // Apply specialty pill filter
    if (selectedSpecialty !== "All") {
      result = result.filter(
        (t) => t.primarySpecialty.toLowerCase() === selectedSpecialty.toLowerCase()
      );
    }

    return result;
  }, [initialTalents, searchQuery, selectedSpecialty]);

  return (
    <section id="talent" className="section pt-4">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="heading-lg">Find Talent</h2>
        <p className="body-text mt-2 text-neutral-600">
          Explore freelancers and professionals ready to work on your next project.
        </p>
      </div>

      {/* Specialty Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10 max-w-4xl mx-auto">
        {specialties.map((specialty) => {
          const isActive = selectedSpecialty === specialty;
          return (
            <button
              key={specialty}
              type="button"
              onClick={() => setSelectedSpecialty(specialty)}
              className={isActive ? "tag-active" : "tag-interactive"}
            >
              {specialty}
            </button>
          );
        })}
      </div>

      {/* Search Status / Clear Filter */}
      {(searchQuery.trim() || selectedSpecialty !== "All") && (
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-neutral-200">
          <p className="text-sm text-neutral-600">
            Showing <span className="font-semibold text-black">{filteredTalents.length}</span> talent profile
            {filteredTalents.length === 1 ? "" : "s"}
            {searchQuery && (
              <>
                {" "}matching &ldquo;
                <span className="font-medium text-black">{searchQuery}</span>&rdquo;
              </>
            )}
            {selectedSpecialty !== "All" && (
              <>
                {" "}in <span className="font-medium text-black">{selectedSpecialty}</span>
              </>
            )}
          </p>

          <button
            type="button"
            onClick={() => {
              setSelectedSpecialty("All");
              if (onClearSearch) onClearSearch();
            }}
            className="text-xs font-medium text-neutral-500 hover:text-black transition-colors underline"
          >
            Reset filters
          </button>
        </div>
      )}

      {/* Talent Grid: 1 col mobile, 2 cols tablet, 3-4 cols desktop */}
      {filteredTalents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTalents.map((talent) => (
            <TalentCard key={talent.id} talent={talent} />
          ))}
        </div>
      ) : (
        <div className="card text-center py-16 px-6 max-w-lg mx-auto">
          <p className="text-base font-semibold text-black">No talent found</p>
          <p className="body-text text-sm mt-1">
            We couldn&apos;t find anyone matching your current filters or search term.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedSpecialty("All");
              if (onClearSearch) onClearSearch();
            }}
            className="btn-primary mt-6 text-xs"
          >
            Clear Search & Filters
          </button>
        </div>
      )}
    </section>
  );
}
