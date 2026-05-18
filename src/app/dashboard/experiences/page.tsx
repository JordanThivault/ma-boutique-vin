// src/app/dashboard/experiences/page.tsx

import Link from "next/link";
import { db } from "@/lib/db";
import DeleteExperienceButton from "@/components/admin/DeleteExperienceButton";

import { Button } from "@/components/ui/button";
import { Eye, Pencil, Plus } from "lucide-react";

export const metadata = { title: "Expériences — Dashboard" };

export default async function AdminExperiencesPage() {
  const experiences = await db.experience.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">
            Expériences
          </h1>
          <p className="mt-1 text-neutral-500">
            {experiences.length} expérience
            {experiences.length !== 1 ? "s" : ""}
          </p>
        </div>

        <Button asChild>
          <Link href="/dashboard/experiences/new">
            <Plus className="mr-2 h-4 w-4" />
            Nouvelle expérience
          </Link>
        </Button>
      </div>

      {/* Table */}
      <div className="mt-8 rounded-2xl border bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 border-b">
            <tr>
              {["Ordre", "Titre", "Type", "Prix", "Statut", "Actions"].map(
                (h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left font-medium text-neutral-500"
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody className="divide-y">
            {experiences.map((exp) => (
              <tr key={exp.id} className="hover:bg-neutral-50">
                {/* Ordre */}
                <td className="px-4 py-3 text-neutral-400">
                  {exp.order}
                </td>

                {/* Titre */}
                <td className="px-4 py-3">
                  <div>
                    <p className="font-medium text-neutral-900">
                      {exp.title}
                    </p>
                    <p className="text-xs text-neutral-400">
                      {exp.duration}
                    </p>
                  </div>
                </td>

                {/* Type */}
                <td className="px-4 py-3 text-neutral-500">
                  {exp.type}
                </td>

                {/* Prix */}
                <td className="px-4 py-3 font-medium text-neutral-900">
                  {exp.price}
                </td>

                {/* Statut */}
                <td className="px-4 py-3">
                  <span
                    className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      exp.active
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-neutral-100 text-neutral-600"
                    }`}
                  >
                    {exp.active ? "Visible" : "Masquée"}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {/* Voir */}
                    <Button variant="ghost" size="icon" asChild>
                      <Link href="/experiences" target="_blank">
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>

                    {/* Modifier */}
                    <Button variant="ghost" size="icon" asChild>
                      <Link
                        href={`/dashboard/experiences/${exp.id}/edit`}
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </Button>

                    {/* Supprimer */}
                    <DeleteExperienceButton
                      experienceId={exp.id}
                    />
                  </div>
                </td>
              </tr>
            ))}

            {experiences.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-12 text-center text-neutral-400"
                >
                  Aucune expérience — créez-en une !
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}