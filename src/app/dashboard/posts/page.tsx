// src/app/dashboard/posts/page.tsx
import Link from "next/link";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import DeletePostButton from "@/components/admin/DeletePostButton";
import { Pagination } from "@/components/admin/Pagination";
import { Button } from "@/components/ui/button";
import { Pencil, Plus, Search } from "lucide-react";
import { AdminSelect } from "@/components/admin/AdminSelect";

export const metadata = { title: "Journal — Dashboard Admin" };

const PAGE_SIZE = 15;

interface PageProps {
  searchParams: Promise<{ page?: string; q?: string; category?: string; status?: string }>;
}

export default async function AdminPostsPage({ searchParams }: PageProps) {
  const { page, q, category, status } = await searchParams;

  const currentPage = Math.max(1, parseInt(page ?? "1", 10));
  const search = q?.trim() ?? "";
  const categoryFilter = category ?? "";
  const statusFilter = status ?? ""; // "published" | "draft" | ""

  // Collect distinct categories for filter
  const rawCategories = await db.post.findMany({
    select: { category: true },
    distinct: ["category"],
    orderBy: { category: "asc" },
  });
  const categoryOptions = rawCategories.map((p) => p.category).filter(Boolean) as string[];

  const where = {
    ...(categoryFilter ? { category: categoryFilter } : {}),
    ...(statusFilter === "published"
      ? { published: true }
      : statusFilter === "draft"
        ? { published: false }
        : {}),
    ...(search
      ? {
          OR: [
            { title: { contains: search, mode: "insensitive" as const } },
            { category: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  const [total, posts] = await Promise.all([
    db.post.count({ where }),
    db.post.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (currentPage - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
  ]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Journal du domaine</h1>
          <p className="mt-1 text-neutral-500">
            {total} article{total !== 1 ? "s" : ""}
            {search || categoryFilter || statusFilter ? " (filtrés)" : ""}
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/posts/new">
            <Plus className="mr-2 h-4 w-4" />
            Nouvel article
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <form method="GET" className="mt-6 flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative min-w-[200px] flex-1">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            name="q"
            defaultValue={search}
            placeholder="Rechercher un article…"
            className="w-full rounded-xl border bg-white py-2 pr-4 pl-9 text-sm text-neutral-900 placeholder-neutral-400 focus:ring-2 focus:ring-neutral-900 focus:outline-none"
          />
        </div>

        {/* Category filter */}
        {categoryOptions.length > 0 && (
          <AdminSelect name="category" defaultValue={categoryFilter}>
            <option value="">Toutes les catégories</option>
            {categoryOptions.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </AdminSelect>
        )}

        {/* Status filter */}
        <AdminSelect name="status" defaultValue={statusFilter}>
          <option value="">Tous les statuts</option>
          <option value="published">Publiés</option>
          <option value="draft">Brouillons</option>
        </AdminSelect>

        <input type="hidden" name="page" value="1" />

        <button
          type="submit"
          className="rounded-xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
        >
          Filtrer
        </button>

        {(search || categoryFilter || statusFilter) && (
          <a
            href="/dashboard/posts"
            className="rounded-xl border px-4 py-2 text-sm text-neutral-500 transition-colors hover:bg-neutral-50"
          >
            Réinitialiser
          </a>
        )}
      </form>

      {/* Table */}
      <div className="mt-6 overflow-hidden rounded-2xl border bg-white">
        <table className="w-full text-sm">
          <thead className="border-b bg-neutral-50">
            <tr>
              {["Titre", "Catégorie", "Statut", "Date", "Actions"].map((h) => (
                <th key={h} className="px-4 py-3 text-left font-medium text-neutral-500">
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-neutral-50">
                <td className="px-4 py-3">
                  <p className="font-medium text-neutral-900">{post.title}</p>
                </td>

                <td className="px-4 py-3">
                  {post.category ? (
                    <span className="inline-block rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-600">
                      {post.category}
                    </span>
                  ) : (
                    <span className="text-neutral-400">—</span>
                  )}
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      post.published
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-neutral-100 text-neutral-600"
                    }`}
                  >
                    {post.published ? "Publié" : "Brouillon"}
                  </span>
                </td>

                <td className="px-4 py-3 text-neutral-500">
                  {post.publishedAt ? formatDate(post.publishedAt) : "—"}
                </td>

                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/dashboard/posts/${post.id}/edit`}>
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </Button>
                    <DeletePostButton postId={post.id} />
                  </div>
                </td>
              </tr>
            ))}

            {posts.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-neutral-400">
                  {search || categoryFilter || statusFilter
                    ? "Aucun article ne correspond à cette recherche."
                    : "Aucun article pour l'instant."}
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <Pagination totalPages={totalPages} currentPage={currentPage} />
      </div>
    </div>
  );
}
