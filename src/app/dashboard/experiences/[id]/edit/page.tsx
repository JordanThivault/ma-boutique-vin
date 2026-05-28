import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import ExperienceForm from "@/components/admin/ExperienceForm";

export const metadata = { title: "Modifier l'expérience — Dashboard" };

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditExperiencePage({ params }: PageProps) {
  const { id } = await params;

  const experience = await db.experience.findUnique({
    where: { id },
  });

  if (!experience) notFound();

  return (
    <div>
      <h1 className="mb-8 text-2xl font-semibold text-gray-900">Modifier l expérience</h1>

      <ExperienceForm experience={experience} />
    </div>
  );
}
