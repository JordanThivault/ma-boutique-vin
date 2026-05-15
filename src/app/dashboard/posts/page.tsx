import Link from "next/link";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import DeletePostButton from "@/components/admin/DeletePostButton";

export const metadata = { title: "Journal — Dashboard Admin" };

export default async function AdminPostsPage() {
  const posts = await db.post.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Journal du domaine</h1>
        <Link
          href="/dashboard/posts/new"
          className="px-5 py-2.5 bg-stone-900 text-white text-sm font-sans rounded hover:bg-stone-700 transition-colors"
        >
          + Nouvel article
        </Link>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-3 font-medium text-gray-500 text-xs uppercase tracking-wider">
                Titre
              </th>
              <th className="text-left px-6 py-3 font-medium text-gray-500 text-xs uppercase tracking-wider">
                Catégorie
              </th>
              <th className="text-left px-6 py-3 font-medium text-gray-500 text-xs uppercase tracking-wider">
                Statut
              </th>
              <th className="text-left px-6 py-3 font-medium text-gray-500 text-xs uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {posts.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-12 text-gray-400">
                  Aucun article pour l instant.
                </td>
              </tr>
            )}
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">
                  {post.title}
                </td>
                <td className="px-6 py-4 text-gray-500">{post.category}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      post.published
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {post.published ? "Publié" : "Brouillon"}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {post.publishedAt ? formatDate(post.publishedAt) : "—"}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-3">
                    <Link
                      href={`/dashboard/posts/${post.id}/edit`}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Modifier
                    </Link>
                    <DeletePostButton postId={post.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
