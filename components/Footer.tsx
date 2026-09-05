"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  // Do not render footer on authentication pages
  if (pathname?.startsWith("/sign-in") || pathname?.startsWith("/sign-up")) {
    return null;
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden border-t border-neutral-100">
      {/* Full Page Background Image */}
      <Image
        src="/footer.png"
        alt="Hiremaxxing landscape"
        fill
        sizes="100vw"
        className="object-cover object-bottom -z-10 select-none pointer-events-none"
        priority
      />

      {/* Top Section */}
      <div className="mx-auto max-w-7xl w-full px-6 pt-20 sm:pt-28">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">
          <div className="max-w-xl space-y-4">
            <div className="flex items-center gap-2.5">
              <Image
                src="/logo.png"
                alt="Hiremaxxing"
                width={32}
                height={32}
                className="object-contain"
              />
              <span className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
                The Talent Discovery Platform
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-black">
              Find the people who can build it.
            </h2>
            <p className="text-base sm:text-lg text-neutral-600 max-w-md leading-relaxed">
              Discover freelancers, designers, developers, creators, and builders ready for your next big venture.
            </p>
          </div>

          <div className="flex flex-wrap gap-8 sm:gap-14 text-sm font-medium text-neutral-800">
            <div className="flex flex-col gap-3">
              <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">
                Navigation
              </span>
              <Link href="/#talent" className="hover:text-black transition-colors">
                Talent Directory
              </Link>
              <Link href="/gigs" className="hover:text-black transition-colors">
                Explore Gigs
              </Link>
              <Link href="/#about" className="hover:text-black transition-colors">
                About Platform
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">
                Action
              </span>
              <button
                type="button"
                onClick={scrollToTop}
                className="text-left hover:text-black transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>Back to Top</span>
                <span aria-hidden="true">&uarr;</span>
              </button>
              <a
                href="https://github.com/bhave5h/hiremaxxing"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black transition-colors"
              >
                GitHub ↗
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Giant Brand Typography in Center/Sky Area */}
      <div className="my-auto py-12 text-center pointer-events-none select-none">
        <span className="text-6xl sm:text-8xl md:text-9xl font-extrabold tracking-tighter text-black/5 block">
          HIREMAXXING
        </span>
      </div>

      {/* Bottom Floating Bar with "Made by Bhavesh" */}
      <div className="mx-auto max-w-7xl w-full px-6 pb-10 sm:pb-12">
        <div className="rounded-2xl border border-white/60 bg-white/85 backdrop-blur-md shadow-lg p-5 sm:px-8 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-700">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Hiremaxxing"
              width={20}
              height={20}
              className="object-contain"
            />
            <span className="font-semibold text-black text-sm">Hiremaxxing</span>
            <span className="text-neutral-400">·</span>
            <span>© 2026 All rights reserved.</span>
          </div>

          <div className="flex items-center gap-2">
            <span>Built for the Clerk Hackathon.</span>
          </div>

          {/* User Requested: Made by Bhavesh */}
          <div className="flex items-center gap-1.5 text-sm font-medium text-black">
            <span>Made by</span>
            <a
              href="https://www.bhaavesssh.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold underline underline-offset-4 hover:opacity-75 transition-opacity text-black"
            >
              Bhavesh
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
