import type { Metadata } from "next";
import { Petrona, Courier_Prime } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const petrona = Petrona({
  subsets: ["latin"],
  variable: "--font-petrona",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const courierPrime = Courier_Prime({
  subsets: ["latin"],
  variable: "--font-courier-prime",
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hiremaxxing — Find the people who can build it",
  description:
    "A minimal talent directory where anyone can discover freelancers, search by specialty, view profiles, and connect directly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${petrona.variable} ${courierPrime.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-white text-black font-sans">
        <ClerkProvider>
          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </ClerkProvider>
      </body>
    </html>
  );
}