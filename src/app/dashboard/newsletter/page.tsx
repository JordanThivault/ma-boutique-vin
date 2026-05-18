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
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-sm text-gray-500 mb-1">Abonnés actifs</p>
          <p className="text-3xl font-semibold text-gray-900">{subscribers.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-sm text-gray-500 mb-1">Campagnes envoyées</p>
          <p className="text-3xl font-semibold text-gray-900">
            {campaigns.filter((c) => c.status === "SENT").length}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-sm text-gray-500 mb-1">Brouillons</p>
          <p className="text-3xl font-semibold text-gray-900">
            {campaigns.filter((c) => c.status === "DRAFT").length}
          </p>
        </div>
      </div>

      {/* Campagnes */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Campagnes</h2>
          <Button asChild>
            <Link href="/dashboard/newsletter/new">
              <Plus className="mr-2 h-4 w-4" />
              Nouvelle campagne
            </Link>
          </Button>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Sujet</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Envoyée à</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {campaigns.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-gray-400">
                    Aucune campagne. Créez-en une !
                  </td>
                </tr>
              )}
              {campaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900 max-w-xs truncate">
                    {campaign.subject}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      campaign.status === "SENT"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {campaign.status === "SENT" ? "Envoyée" : "Brouillon"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {campaign.status === "SENT" ? `${campaign.recipientCount} destinataires` : "—"}
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-xs">
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
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Abonnés ({subscribers.length})
        </h2>
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden max-h-96 overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Inscrit le</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {subscribers.length === 0 && (
                <tr>
                  <td colSpan={2} className="text-center py-8 text-gray-400">Aucun abonné.</td>
                </tr>
              )}
              {subscribers.map((sub) => (
                <tr key={sub.id} className="hover:bg-gray-50">
                  <td className="px-6 py-3 text-gray-700">{sub.email}</td>
                  <td className="px-6 py-3 text-gray-400 text-xs">{formatDate(sub.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
