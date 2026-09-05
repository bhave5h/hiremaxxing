import { SignUp } from "@clerk/nextjs";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Sign Up | Hiremaxxing",
  description: "Create an account on Hiremaxxing to explore talent and gigs.",
};

export default function SignUpPage() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Background Image */}
      <Image
        src="/signup.png"
        alt="Sign up background"
        fill
        priority
        sizes="100vw"
        className="object-cover -z-10 select-none pointer-events-none"
      />

      <div className="relative z-10 flex flex-col items-center">
        <div className="text-center mb-6 max-w-sm">
          <h1 className="heading-md text-black">Join Hiremaxxing</h1>
          <p className="body-sm text-neutral-700 mt-1.5 font-medium">
            Create an account to start exploring talent and opportunities.
          </p>
        </div>
        <SignUp />
      </div>
    </div>
  );
}
