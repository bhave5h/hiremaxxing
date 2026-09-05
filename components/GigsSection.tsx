"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Gig, GigCategory } from "@/lib/gigTypes";
import { allGigs, GIG_CATEGORIES } from "@/lib/gigs";
import PosterChatModal from "./PosterChatModal";

interface GigsSectionProps {
  initialGigs?: Gig[];
}

export default function GigsSection({ initialGigs = allGigs }: GigsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<GigCategory>("All");
  const [activeChatGig, setActiveChatGig] = useState<Gig | null>(null);

  const filteredGigs = useMemo(() => {
    if (selectedCategory === "All") {
      return initialGigs;
    }
    return initialGigs.filter((g) => g.category === selectedCategory);
  }, [initialGigs, selectedCategory]);

  return (
    <section id="gigs" className="section pt-6 pb-20 border-t border-neutral-100">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-mono text-neutral-600 mb-3">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Live Gigs · Direct Contact</span>
        </div>
        <h2 className="heading-lg">Active Gigs & Projects</h2>
        <p className="body-text mt-2 text-neutral-600">
          Browse open contracts and freelance projects posted by founders and studios. Skip the middleman and chat directly with the poster.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10 max-w-4xl mx-auto">
        {GIG_CATEGORIES.map((category) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={isActive ? "tag-active" : "tag-interactive"}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Results Count / Reset */}
      {selectedCategory !== "All" && (
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-neutral-200 max-w-6xl mx-auto">
          <p className="text-sm text-neutral-600">
            Showing <span className="font-semibold text-black">{filteredGigs.length}</span> gig
            {filteredGigs.length === 1 ? "" : "s"} in{" "}
            <span className="font-medium text-black">{selectedCategory}</span>
          </p>
          <button
            type="button"
            onClick={() => setSelectedCategory("All")}
            className="text-xs font-medium text-neutral-500 hover:text-black transition-colors underline cursor-pointer"
          >
            Show all gigs
          </button>
        </div>
      )}

      {/* Gigs Grid */}
      {filteredGigs.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {filteredGigs.map((gig) => {
            const { poster } = gig;
            const whatsappNumber = poster.whatsapp?.replace(/[^0-9]/g, "");
            const whatsappUrl = whatsappNumber
              ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                  `Hi ${poster.name}, I'm reaching out about your gig "${gig.title}" on Hiremaxxing.`
                )}`
              : null;

            return (
              <div
                key={gig.id}
                className="card-interactive flex flex-col justify-between group hover:shadow-md transition-all"
              >
                <div>
                  {/* Card Meta Top Bar */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      {gig.urgency && (
                        <span
                          className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${
                            gig.urgency === "Hiring Urgently"
                              ? "bg-red-50 text-red-700 border-red-200"
                              : gig.urgency === "Featured"
                              ? "bg-purple-50 text-purple-700 border-purple-200"
                              : "bg-blue-50 text-blue-700 border-blue-200"
                          }`}
                        >
                          {gig.urgency}
                        </span>
                      )}
                      <span className="text-xs text-neutral-400 font-mono">
                        {gig.postedAt}
                      </span>
                    </div>

                    <span className="inline-block rounded-full bg-neutral-100 border border-neutral-200 px-3 py-1 text-xs font-bold text-black whitespace-nowrap">
                      {gig.budget}
                    </span>
                  </div>

                  {/* Title & Company */}
                  <h3 className="text-xl font-bold text-black tracking-tight group-hover:underline">
                    {gig.title}
                  </h3>
                  <p className="text-sm font-medium text-neutral-600 mt-1">
                    {gig.company} · {gig.location} · {gig.duration} ·{" "}
                    <span className="text-neutral-500 font-normal">{gig.type}</span>
                  </p>

                  {/* Description */}
                  <p className="body-text text-sm mt-3.5 text-neutral-700 line-clamp-3">
                    {gig.description}
                  </p>

                  {/* Deliverables Preview */}
                  {gig.deliverables && gig.deliverables.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-neutral-100">
                      <p className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold mb-1.5">
                        Key Deliverables
                      </p>
                      <ul className="space-y-1">
                        {gig.deliverables.slice(0, 2).map((item, idx) => (
                          <li
                            key={idx}
                            className="text-xs text-neutral-600 flex items-start gap-1.5"
                          >
                            <span className="text-black font-bold">·</span>
                            <span className="truncate">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Skills / Tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {gig.skills.map((skill) => (
                      <span key={skill} className="tag text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Poster Preview & Direct Chat Action Footer */}
                <div className="mt-6 pt-4 border-t border-neutral-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-neutral-50/70 -mx-6 -mb-6 p-4 rounded-b-xl">
                  {/* Poster Identity */}
                  <div className="flex items-center gap-2.5">
                    <div className="relative h-10 w-10 flex-shrink-0 rounded-full overflow-hidden border border-neutral-200 bg-neutral-100">
                      <Image
                        src={poster.avatar}
                        alt={poster.name}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                      <span
                        className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white ${
                          poster.status === "online" ? "bg-emerald-500" : "bg-amber-500"
                        }`}
                        title={poster.status === "online" ? "Online now" : "Away"}
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-semibold text-black leading-tight">
                          {poster.name}
                        </span>
                        {poster.verified && (
                          <svg
                            className="h-3.5 w-3.5 text-black fill-current"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                          </svg>
                        )}
                      </div>
                      <p className="text-[11px] text-neutral-500">
                        {poster.role} ·{" "}
                        <span className="text-emerald-600 font-medium">
                          {poster.status === "online" ? "Active now" : "Offline"}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Actions: Chat with Poster + External Quick Link */}
                  <div className="flex items-center gap-2">
                    {whatsappUrl && (
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-icon h-9 w-9 text-emerald-600 hover:text-emerald-700 hover:border-emerald-600 bg-white"
                        title="Chat on WhatsApp"
                        aria-label="Direct WhatsApp"
                      >
                        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.15C10.57 20.15 9.12 19.75 7.85 19L7.55 18.82L4.43 19.64L5.26 16.59L5.06 16.27C4.24 14.97 3.8 13.46 3.8 11.91C3.8 7.37 7.5 3.67 12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.59 20.15 12.05 20.15ZM16.57 14.44C16.32 14.32 15.11 13.72 14.88 13.64C14.65 13.56 14.49 13.52 14.32 13.76C14.16 14.01 13.68 14.58 13.53 14.75C13.39 14.91 13.24 14.93 12.99 14.81C12.74 14.68 11.94 14.42 10.99 13.57C10.25 12.91 9.75 12.1 9.6 11.85C9.46 11.6 9.58 11.47 9.71 11.34C9.82 11.23 9.96 11.05 10.08 10.91C10.21 10.76 10.25 10.66 10.33 10.49C10.41 10.33 10.37 10.19 10.31 10.06C10.25 9.94 9.76 8.74 9.56 8.24C9.36 7.76 9.16 7.82 9.01 7.81C8.87 7.81 8.71 7.81 8.54 7.81C8.38 7.81 8.11 7.87 7.89 8.11C7.66 8.36 7.03 8.95 7.03 10.15C7.03 11.35 7.91 12.51 8.03 12.67C8.16 12.84 9.76 15.31 12.21 16.37C12.8 16.62 13.25 16.77 13.61 16.89C14.2 17.07 14.73 17.05 15.16 16.98C15.63 16.91 16.62 16.38 16.82 15.8C17.03 15.22 17.03 14.73 16.97 14.62C16.91 14.52 16.82 14.47 16.57 14.44Z" />
                        </svg>
                      </a>
                    )}

                    <button
                      type="button"
                      onClick={() => setActiveChatGig(gig)}
                      className="btn-primary text-xs py-2 px-3.5 gap-1.5 shadow-sm"
                    >
                      <svg
                        className="h-3.5 w-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                      <span>Chat with Poster</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="card text-center py-16 px-6 max-w-lg mx-auto">
          <p className="text-base font-semibold text-black">No gigs found</p>
          <p className="body-text text-sm mt-1">
            There are currently no active gigs in this category.
          </p>
          <button
            type="button"
            onClick={() => setSelectedCategory("All")}
            className="btn-primary mt-6 text-xs"
          >
            View All Gigs
          </button>
        </div>
      )}

      {/* Poster Chat Modal */}
      <PosterChatModal
        gig={activeChatGig}
        isOpen={Boolean(activeChatGig)}
        onClose={() => setActiveChatGig(null)}
      />
    </section>
  );
}
