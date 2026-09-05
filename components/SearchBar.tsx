"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { searchTalent } from "@/lib/search";
import { Talent } from "@/lib/types";
import SearchDropdown from "./SearchDropdown";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearchSubmit?: (query: string) => void;
  placeholders?: string[];
}

const DEFAULT_PLACEHOLDERS = [
  "Search talent, skills, specialties...",
  "Try 'Graphic Designer' or 'Branding'...",
  "Search for 'UI/UX' or 'Figma'...",
  "Try 'Next.js' or 'Full Stack'...",
  "Search by location, like 'Nagpur' or 'Bengaluru'...",
  "Try 'AI/ML' or 'Motion Designer'...",
];

export default function SearchBar({
  value,
  onChange,
  onSearchSubmit,
  placeholders = DEFAULT_PLACEHOLDERS,
}: SearchBarProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [, setIsFocused] = useState(false);
  // Detect OS for ⌘ vs Ctrl key in shortcut indicator
  const [isMac] = useState(() => {
    if (typeof window !== "undefined" && typeof navigator !== "undefined") {
      return /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform || navigator.userAgent || "");
    }
    return false;
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Smooth blur-slide placeholder animation loop (siddz.com inspired)
  useEffect(() => {
    if (value) return; // Pause animation while user has typed query

    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % placeholders.length);
        setIsAnimating(false);
      }, 300);
    }, 3200);

    return () => clearInterval(interval);
  }, [value, placeholders.length]);

  // Global shortcut (Cmd+K / Ctrl+K) to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Compute live search matches using the dedicated search library
  const searchResults: Talent[] = useMemo(() => {
    return value.trim() ? searchTalent(value) : [];
  }, [value]);

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
      inputRef.current?.blur();
    } else if (e.key === "Enter") {
      if (onSearchSubmit) {
        onSearchSubmit(value);
      }
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
      {/* Sleek Search Bar Shell */}
      <div className="relative flex items-center w-full px-3 py-1.5 bg-white border border-neutral-300 rounded-full transition-all duration-300 ease-out hover:border-black focus-within:border-black shadow-sm">
        {/* Search Icon */}
        <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 text-neutral-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
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

        {/* Input & Animated Placeholder Area */}
        <div className="relative flex-1 h-11 flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => {
              setIsFocused(true);
              if (value.trim()) setIsOpen(true);
            }}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            className="w-full h-full bg-transparent text-black text-[15px] outline-none placeholder-transparent pr-3 font-normal"
          />

          {/* Animated Placeholders with slide & blur keyframes */}
          {!value && (
            <div className="absolute inset-0 flex items-center pointer-events-none overflow-hidden">
              <span
                key={currentIndex}
                className="text-neutral-400 text-[15px] select-none font-normal truncate"
                style={{
                  animation: isAnimating
                    ? "placeholder-slide-up 0.3s ease-in-out forwards"
                    : "placeholder-slide-in 0.3s ease-in-out forwards",
                }}
              >
                {placeholders[currentIndex]}
              </span>
            </div>
          )}
        </div>

        {/* Right Side Action: Clear Button or Keyboard Shortcut */}
        <div className="flex items-center gap-1 pr-2">
          {value ? (
            <button
              type="button"
              onClick={() => {
                onChange("");
                setIsOpen(false);
                inputRef.current?.focus();
              }}
              className="w-7 h-7 flex items-center justify-center rounded-full text-neutral-400 hover:text-black hover:bg-neutral-100 transition-colors"
              title="Clear search"
              aria-label="Clear search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
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
          ) : (
            <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-xs text-neutral-500 bg-neutral-100 border border-neutral-200 rounded-md font-sans select-none pointer-events-none">
              <span className="text-[12px]">{isMac ? "⌘" : "Ctrl"}</span>
              <span>K</span>
            </kbd>
          )}
        </div>
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
