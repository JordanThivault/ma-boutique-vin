import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import ReservationStatusButton from "@/components/admin/ReservationStatusButton";

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

  const pending = reservations.filter((r) => r.status === "PENDING").length;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Réservations</h1>
        <div className="flex items-center gap-3">
          {pending > 0 && (
            <span className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800">
              {pending} en attente
            </span>
          )}
          <span className="text-sm text-gray-400">{reservations.length} total</span>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Nom
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Expérience
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Date souhaitée
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Actions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Reçu le
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {reservations.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400">
                    Aucune réservation pour le moment.
                  </td>
                </tr>
              )}
              {reservations.map((res) => (
                <tr key={res.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{res.nom}</td>
                  <td className="px-6 py-4">
                    <div className="text-gray-600">{res.email}</div>
                    {res.telephone && <div className="text-xs text-gray-400">{res.telephone}</div>}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {EXPERIENCE_LABELS[res.experience] ?? res.experience}
                    {res.message && (
                      <p
                        className="mt-0.5 max-w-[180px] truncate text-xs text-gray-400"
                        title={res.message}
                      >
                        {res.message}
                      </p>
                    )}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-700">{formatDate(res.date)}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[res.status]}`}
                    >
                      {STATUS_LABELS[res.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <ReservationStatusButton
                      reservationId={res.id}
                      currentStatus={res.status as "PENDING" | "CONFIRMED" | "CANCELLED"}
                    />
                  </td>
                  <td className="px-6 py-4 text-xs whitespace-nowrap text-gray-400">
                    {formatDate(res.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
