// app/dashboard/newsletter/new/page.tsx
import CampaignForm from "@/components/admin/CampaignForm";

export const metadata = { title: "Nouvelle campagne — Dashboard" };

export default function NewCampaignPage() {
  return (
    <div>
      <h1 className="mb-2 text-2xl font-semibold text-gray-900">Nouvelle campagne</h1>
      <p className="mb-8 text-sm text-gray-500">
        Rédigez votre campagne, enregistrez-la en brouillon, puis envoyez-la quand vous êtes
        prêt(e).
      </p>
      <CampaignForm />
    </div>
  );
}
