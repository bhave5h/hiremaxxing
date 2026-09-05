import { SignUp } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | Hiremaxxing",
  description: "Create an account on Hiremaxxing to explore talent and gigs.",
};

export default function SignUpPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-16 px-4">
      <div className="text-center mb-8 max-w-sm">
        <h1 className="heading-md text-black">Join Hiremaxxing</h1>
        <p className="body-sm text-neutral-500 mt-1.5">
          Create an account to start exploring talent and opportunities.
        </p>
      </div>
      <SignUp />
    </div>
  );
}
