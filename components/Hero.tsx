"use client";

import Image from "next/image";
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
    <section className="relative w-full overflow-hidden border-b border-neutral-200/80 pt-20 pb-20 sm:pt-24 sm:pb-28 text-center">
      {/* Background Image */}
      <Image
        src="/bg.png"
        alt="Hiremaxxing hero background"
        fill
        priority
        sizes="100vw"
        className="object-cover object-bottom -z-10 select-none pointer-events-none"
      />

      {/* Subtle light overlay to guarantee perfect contrast and readability */}
      <div className="absolute inset-0 bg-white/25 -z-10 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 space-y-6 flex flex-col items-center">
        {/* Brand Logo in Hero */}
        <div className="relative h-20 w-20 sm:h-24 sm:w-24 drop-shadow-sm hover:scale-105 transition-transform duration-300">
          <Image
            src="/logo.png"
            alt="Hiremaxxing"
            fill
            priority
            sizes="(max-width: 640px) 80px, 96px"
            className="object-contain"
          />
        </div>

        <h1 className="heading-xl">
          Find the people who can build it.
        </h1>
        <p className="body-text max-w-xl mx-auto text-neutral-800 text-lg font-medium">
          Discover talented freelancers, designers, developers, creators, and professionals ready to work on your next project.
        </p>

        <div className="pt-4 w-full">
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
