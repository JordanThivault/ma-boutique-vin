import ExperienceForm from "@/components/admin/ExperienceForm";

export const metadata = { title: "Nouvelle expérience — Dashboard" };

export default function NewExperiencePage() {
  return (
    <div>
      <h1 className="mb-8 text-2xl font-semibold text-gray-900">Nouvelle expérience</h1>
      <ExperienceForm />
    </div>
  );
}
