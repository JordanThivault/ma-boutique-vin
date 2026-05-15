import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Réservations — Dashboard" };

const EXPERIENCE_LABELS: Record<string, string> = {
  degustation: "Dégustation",
  visite: "Visite domaine",
  evenement: "Événement",
};

const STATUS_STYLES: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  CONFIRMED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
};

const STATUS_LABELS: Record<string, string> = {
  PENDING: "En attente",
  CONFIRMED: "Confirmée",
  CANCELLED: "Annulée",
};

export default async function ReservationsPage() {
  const reservations = await db.reservation.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Réservations</h1>
        <span className="text-sm text-gray-500">{reservations.length} demande(s)</span>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 font-medium text-gray-500 text-xs uppercase tracking-wider">Nom</th>
                <th className="text-left px-6 py-3 font-medium text-gray-500 text-xs uppercase tracking-wider">Contact</th>
                <th className="text-left px-6 py-3 font-medium text-gray-500 text-xs uppercase tracking-wider">Expérience</th>
                <th className="text-left px-6 py-3 font-medium text-gray-500 text-xs uppercase tracking-wider">Date souhaitée</th>
                <th className="text-left px-6 py-3 font-medium text-gray-500 text-xs uppercase tracking-wider">Statut</th>
                <th className="text-left px-6 py-3 font-medium text-gray-500 text-xs uppercase tracking-wider">Reçu le</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {reservations.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-400">
                    Aucune réservation pour le moment.
                  </td>
                </tr>
              )}
              {reservations.map((res) => (
                <tr key={res.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{res.nom}</td>
                  <td className="px-6 py-4">
                    <div className="text-gray-600">{res.email}</div>
                    {res.telephone && <div className="text-gray-400 text-xs">{res.telephone}</div>}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {EXPERIENCE_LABELS[res.experience] ?? res.experience}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{formatDate(res.date)}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLES[res.status]}`}>
                      {STATUS_LABELS[res.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-xs">{formatDate(res.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
