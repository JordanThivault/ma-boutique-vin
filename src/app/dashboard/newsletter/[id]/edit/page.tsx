import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import CampaignForm from "@/components/admin/CampaignForm";

export const metadata = { title: "Modifier la campagne — Dashboard" };

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditCampaignPage({ params }: PageProps) {
  const { id } = await params;

  const campaign = await db.newsletterCampaign.findUnique({
    where: { id },
  });

  if (!campaign || campaign.status === "SENT") notFound();

  return (
    <div>
      <h1>Modifier le brouillon</h1>
      <CampaignForm campaign={campaign} />
    </div>
  );
}
