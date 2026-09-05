"use client";

import SearchBar from "./SearchBar";

interface HeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit?: (query: string) => void;
}

export default function Hero({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
}: HeroProps) {
  return (
    <section className="section pt-20 pb-16 text-center">
      <div className="mx-auto max-w-3xl space-y-6">
        <h1 className="heading-xl">
          Find the people who can build it.
        </h1>
        <p className="body-text max-w-xl mx-auto text-neutral-600 text-lg">
          Discover talented freelancers, designers, developers, creators, and professionals ready to work on your next project.
        </p>

        <div className="pt-4">
          <SearchBar
            value={searchQuery}
            onChange={onSearchChange}
            onSearchSubmit={onSearchSubmit}
          />
        </div>
      </div>
    </section>
  );
}
