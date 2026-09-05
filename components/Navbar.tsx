"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SignInButton, Show, UserButton } from "@clerk/nextjs";
import { motion } from "framer-motion";

const logoTransition = { duration: 1, ease: [0.25, 0.1, 0.25, 1] as const };
const logoVariants = {
  hidden: { filter: "blur(10px)", transform: "translateY(20%)", opacity: 0 },
  visible: { filter: "blur(0px)", transform: "translateY(0%)", opacity: 1 },
};

export default function Navbar() {
  const pathname = usePathname();

  // Do not render navbar on authentication pages
  if (pathname?.startsWith("/sign-in") || pathname?.startsWith("/sign-up")) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Left: Brand Logo / Text with Blur-Reveal */}
        <motion.div
          initial="hidden"
          animate="visible"
          transition={logoTransition}
          variants={logoVariants}
        >
          <Link href="/" className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-black hover:opacity-80 transition-opacity">
            <Image
              src="/logo.png"
              alt="Hiremaxxing Logo"
              width={26}
              height={26}
              priority
              className="object-contain"
            />
            <span>Hiremaxxing</span>
          </Link>
        </motion.div>

        {/* Center: Nav Links */}
        <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-neutral-600">
          <Link href="/#talent" className="hover:text-black transition-colors">
            Find Talent
          </Link>
          <Link href="/#gigs" className="hover:text-black transition-colors">
            Gigs & Projects
          </Link>
          <Link href="/#about" className="hover:text-black transition-colors">
            About
          </Link>
        </nav>

        {/* Right: Auth Controls */}
        <div className="flex items-center gap-3">
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button
                type="button"
                className="btn-icon"
                title="Sign in"
                aria-label="Sign in"
              >
                {/* Minimal User Circle Icon ◯ */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="8" r="5" />
                  <path d="M20 21a8 8 0 0 0-16 0" />
                </svg>
              </button>
            </SignInButton>
          </Show>

          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>
      </div>
    </header>
  );
}
