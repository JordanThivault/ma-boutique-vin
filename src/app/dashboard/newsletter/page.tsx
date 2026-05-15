import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Newsletter — Dashboard" };

export default async function NewsletterPage() {
  const subscribers = await db.newsletterSubscriber.findMany({
    where: { active: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Newsletter</h1>
        <span className="text-sm text-gray-500">
          {subscribers.length} abonné(s) actif(s)
        </span>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-3 font-medium text-gray-500 text-xs uppercase tracking-wider">
                Email
              </th>
              <th className="text-left px-6 py-3 font-medium text-gray-500 text-xs uppercase tracking-wider">
                Inscrit le
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {subscribers.length === 0 && (
              <tr>
                <td colSpan={2} className="text-center py-12 text-gray-400">
                  Aucun abonné pour le moment.
                </td>
              </tr>
            )}
            {subscribers.map((sub) => (
              <tr key={sub.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-900">{sub.email}</td>
                <td className="px-6 py-4 text-gray-400 text-xs">
                  {formatDate(sub.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
