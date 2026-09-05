import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Sign In | Hiremaxxing",
  description: "Sign in to Hiremaxxing to discover top talent and creative opportunities.",
};

export default function SignInPage() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Background Image */}
      <Image
        src="/bg.png"
        alt="Login background"
        fill
        priority
        sizes="100vw"
        className="object-cover -z-10 select-none pointer-events-none"
      />

      <div className="relative z-10 flex flex-col items-center">
        <div className="text-center mb-6 max-w-sm">
          <h1 className="heading-md text-black">Welcome to Hiremaxxing</h1>
          <p className="body-sm text-neutral-700 mt-1.5 font-medium">
            Sign in to discover freelancers and connect directly.
          </p>
        </div>
        <SignIn />
      </div>
    </div>
  );
}
