import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | Hiremaxxing",
  description: "Sign in to Hiremaxxing to discover top talent and creative opportunities.",
};

export default function SignInPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-16 px-4">
      <div className="text-center mb-8 max-w-sm">
        <h1 className="heading-md text-black">Welcome to Hiremaxxing</h1>
        <p className="body-sm text-neutral-500 mt-1.5">
          Sign in to discover freelancers and connect directly.
        </p>
      </div>
      <SignIn />
    </div>
  );
}
