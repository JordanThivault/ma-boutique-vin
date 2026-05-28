"use server";

import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

// ============================================================
// ADMIN
// ============================================================

async function requireAdmin() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Non autorisé");
  }
  return session;
}

// ============================================================
// CRUD EXPÉRIENCES
// ============================================================

export interface ExperiencePayload {
  title: string;
  type: string;
  duration: string;
  price: string;
  description: string;
  includes: string;
  image?: string;
  order?: number;
  active?: boolean;
}

function parseIncludes(raw: string): string[] {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export async function createExperience(data: ExperiencePayload) {
  try {
    await requireAdmin();
    await db.experience.create({
      data: {
        title: data.title,
        type: data.type,
        duration: data.duration,
        price: data.price,
        description: data.description,
        includes: parseIncludes(data.includes),
        image: data.image || null,
        order: Number(data.order ?? 0),
        active: data.active ?? true,
      },
    });
    revalidatePath("/experiences");
    revalidatePath("/dashboard/experiences");
    return { success: true };
  } catch (err) {
    console.error("Create experience error:", err);
    return { success: false, error: "Une erreur est survenue." };
  }
}

export async function updateExperience(id: string, data: ExperiencePayload) {
  try {
    await requireAdmin();
    await db.experience.update({
      where: { id },
      data: {
        title: data.title,
        type: data.type,
        duration: data.duration,
        price: data.price,
        description: data.description,
        includes: parseIncludes(data.includes),
        image: data.image || null,
        order: Number(data.order ?? 0),
        active: data.active ?? true,
      },
    });
    revalidatePath("/experiences");
    revalidatePath("/dashboard/experiences");
    return { success: true };
  } catch (err) {
    console.error("Update experience error:", err);
    return { success: false, error: "Une erreur est survenue." };
  }
}

export async function deleteExperience(id: string) {
  try {
    await requireAdmin();
    await db.experience.delete({ where: { id } });
    revalidatePath("/experiences");
    revalidatePath("/dashboard/experiences");
    return { success: true };
  } catch (err) {
    console.error("Delete experience error:", err);
    return { success: false, error: "Une erreur est survenue." };
  }
}
