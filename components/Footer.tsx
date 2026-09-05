import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <Link href="/" className="text-base font-bold tracking-tight text-black">
              Hiremaxxing
            </Link>
            <p className="body-sm text-neutral-500 mt-1">
              Find the people who can build it.
            </p>
          </div>

          <div className="flex items-center gap-6 text-sm font-medium text-neutral-600">
            <Link href="/#talent" className="hover:text-black transition-colors">
              Talent
            </Link>
            <Link href="/gigs" className="hover:text-black transition-colors">
              Gigs
            </Link>
            <Link href="/#about" className="hover:text-black transition-colors">
              About
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p>© 2026 Hiremaxxing. All rights reserved.</p>
          <p>Built for the Clerk Hackathon.</p>
        </div>
      </div>
    </footer>
  );
}
