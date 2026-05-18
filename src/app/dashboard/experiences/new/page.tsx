import ExperienceForm from "@/components/admin/ExperienceForm";

export const metadata = { title: "Nouvelle expérience — Dashboard" };

export default function NewExperiencePage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">Nouvelle expérience</h1>
      <ExperienceForm />
    </div>
  );
}
