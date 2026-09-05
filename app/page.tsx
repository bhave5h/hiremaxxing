"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import TalentGrid from "@/components/TalentGrid";
import GigsSection from "@/components/GigsSection";
import About from "@/components/About";
import { allTalents } from "@/lib/search";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (query: string) => {
    setSearchQuery(query);
    // Smoothly scroll down to talent section if submitted
    const talentSection = document.getElementById("talent");
    if (talentSection) {
      talentSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Hero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
      />
      <TalentGrid
        initialTalents={allTalents}
        searchQuery={searchQuery}
        onClearSearch={() => setSearchQuery("")}
      />
      <GigsSection />
      <About />
    </>
  );
}
