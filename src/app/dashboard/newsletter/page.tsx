import Link from "next/link";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import DeleteCampaignButton from "@/components/admin/DeleteCampaignButton";
import SendCampaignButton from "@/components/admin/SendCampaignButton";
import { Button } from "@/components/ui/button";
import { Plus, Pencil } from "lucide-react";

export const metadata = { title: "Newsletter — Dashboard" };

export default async function NewsletterPage() {
  const [subscribers, campaigns] = await Promise.all([
    db.newsletterSubscriber.findMany({ where: { active: true }, orderBy: { createdAt: "desc" } }),
    db.newsletterCampaign.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  return (
    <div className="space-y-10">
      {/* Stats header */}
      <div className="grid grid-cols-3 gap-6">
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <p className="mb-1 text-sm text-gray-500">Abonnés actifs</p>
          <p className="text-3xl font-semibold text-gray-900">{subscribers.length}</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <p className="mb-1 text-sm text-gray-500">Campagnes envoyées</p>
          <p className="text-3xl font-semibold text-gray-900">
            {campaigns.filter((c) => c.status === "SENT").length}
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <p className="mb-1 text-sm text-gray-500">Brouillons</p>
          <p className="text-3xl font-semibold text-gray-900">
            {campaigns.filter((c) => c.status === "DRAFT").length}
          </p>
        </div>
      </div>

      {/* Campagnes */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Campagnes</h2>
          <Button asChild>
            <Link href="/dashboard/newsletter/new">
              <Plus className="mr-2 h-4 w-4" />
              Nouvelle campagne
            </Link>
          </Button>
        </div>

        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Sujet
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Envoyée à
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Date
                </th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {campaigns.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-400">
                    Aucune campagne. Créez-en une !
                  </td>
                </tr>
              )}
              {campaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50">
                  <td className="max-w-xs truncate px-6 py-4 font-medium text-gray-900">
                    {campaign.subject}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        campaign.status === "SENT"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {campaign.status === "SENT" ? "Envoyée" : "Brouillon"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {campaign.status === "SENT" ? `${campaign.recipientCount} destinataires` : "—"}
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-400">
                    {campaign.sentAt ? formatDate(campaign.sentAt) : formatDate(campaign.createdAt)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      {/* ENVOYER (uniquement draft) */}
                      {campaign.status === "DRAFT" && (
                        <SendCampaignButton
                          campaignId={campaign.id}
                          subscriberCount={subscribers.length}
                        />
                      )}

                      {/* EDIT */}
                      {campaign.status === "DRAFT" && (
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/dashboard/newsletter/${campaign.id}/edit`}>
                            <Pencil className="h-4 w-4" />
                          </Link>
                        </Button>
                      )}

                      {/* DELETE */}
                      <DeleteCampaignButton
                        campaignId={campaign.id}
                        isSent={campaign.status === "SENT"}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Liste abonnés */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Abonnés ({subscribers.length})</h2>
        <div className="max-h-96 overflow-hidden overflow-y-auto rounded-lg border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead className="sticky top-0 border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Inscrit le
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {subscribers.length === 0 && (
                <tr>
                  <td colSpan={2} className="py-8 text-center text-gray-400">
                    Aucun abonné.
                  </td>
                </tr>
              )}
              {subscribers.map((sub) => (
                <tr key={sub.id} className="hover:bg-gray-50">
                  <td className="px-6 py-3 text-gray-700">{sub.email}</td>
                  <td className="px-6 py-3 text-xs text-gray-400">{formatDate(sub.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
