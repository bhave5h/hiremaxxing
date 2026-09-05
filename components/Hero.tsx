"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import SearchBar from "./SearchBar";

const transition = { duration: 1, ease: [0.25, 0.1, 0.25, 1] as const };
const variants = {
  hidden: { filter: "blur(10px)", transform: "translateY(20%)", opacity: 0 },
  visible: { filter: "blur(0px)", transform: "translateY(0%)", opacity: 1 },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

const headingText = "Find the people who can build it.";
const headingWords = headingText.split(" ");

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

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-10 mx-auto max-w-3xl px-6 space-y-6 flex flex-col items-center"
      >
        {/* Brand Logo in Hero with Blur-Reveal */}
        <motion.div
          transition={transition}
          variants={variants}
          className="relative h-20 w-20 sm:h-24 sm:w-24 drop-shadow-sm hover:scale-105 transition-transform duration-300"
        >
          <Image
            src="/logo.png"
            alt="Hiremaxxing"
            fill
            priority
            sizes="(max-width: 640px) 80px, 96px"
            className="object-contain"
          />
        </motion.div>

        {/* Heading with Word-by-Word Blur-Reveal */}
        <h1 className="heading-xl">
          {headingWords.map((word, index) => (
            <React.Fragment key={index}>
              <motion.span
                className="inline-block"
                transition={transition}
                variants={variants}
              >
                {word}
              </motion.span>
              {index < headingWords.length - 1 && " "}
            </React.Fragment>
          ))}
        </h1>

        {/* Subtext with Blur-Reveal */}
        <motion.p
          className="body-text max-w-xl mx-auto text-neutral-800 text-lg font-medium"
          transition={transition}
          variants={variants}
        >
          Discover talented freelancers, designers, developers, creators, and professionals ready to work on your next project.
        </motion.p>

        {/* Search Form with Blur-Reveal */}
        <motion.div
          className="pt-4 w-full"
          transition={transition}
          variants={variants}
        >
          <SearchBar
            value={searchQuery}
            onChange={onSearchChange}
            onSearchSubmit={onSearchSubmit}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
