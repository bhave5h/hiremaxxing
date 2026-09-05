import Link from "next/link";
import { getTalentById, allTalents } from "@/lib/search";
import TalentProfile from "@/components/TalentProfile";

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return allTalents.map((talent) => ({
    id: talent.id,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const talent = getTalentById(id);

  if (!talent) {
    return {
      title: "Talent Not Found | Hiremaxxing",
    };
  }

  return {
    title: `${talent.name} - ${talent.designation} | Hiremaxxing`,
    description: `${talent.name} is a ${talent.designation} based in ${talent.location}, specializing in ${talent.primarySpecialty}.`,
  };
}

export default async function TalentPage({ params }: PageProps) {
  const { id } = await params;
  const talent = getTalentById(id);

  if (!talent) {
    return (
      <div className="section-sm text-center py-20">
        <div className="card max-w-md mx-auto py-12 px-6">
          <h1 className="heading-md text-black">Talent Profile Not Found</h1>
          <p className="body-text text-sm mt-2 text-neutral-600">
            The talent profile you are looking for does not exist or may have been removed.
          </p>
          <div className="mt-6">
            <Link href="/" className="btn-primary">
              Return to Directory
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <TalentProfile talent={talent} />;
}
