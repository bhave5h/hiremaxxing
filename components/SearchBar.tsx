"use client";

import { useState, useRef, useEffect } from "react";
import { searchTalent } from "@/lib/search";
import { Talent } from "@/lib/types";
import SearchDropdown from "./SearchDropdown";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearchSubmit?: (query: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  onSearchSubmit,
  placeholder = "Search talent, skills, specialties, location...",
}: SearchBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Compute live search matches using the dedicated search library
  const searchResults: Talent[] = value.trim() ? searchTalent(value) : [];

  // Handle clicking outside to close autocomplete dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    } else if (e.key === "Enter") {
      if (onSearchSubmit) {
        onSearchSubmit(value);
      }
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
      <div className="relative flex items-center">
        {/* Search Icon */}
        <div className="pointer-events-none absolute left-5 text-neutral-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>

        {/* Search Input using semantic class */}
        <input
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => {
            if (value.trim()) setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="input-search pl-13 pr-12 text-base"
        />

        {/* Clear Button */}
        {value && (
          <button
            type="button"
            onClick={() => {
              onChange("");
              setIsOpen(false);
            }}
            className="absolute right-4 rounded-full p-1 text-neutral-400 hover:text-black transition-colors"
            title="Clear search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      {/* Live Autocomplete Popover */}
      <SearchDropdown
        results={searchResults}
        query={value}
        isOpen={isOpen}
        onSelectResult={() => setIsOpen(false)}
      />
    </div>
  );
}
