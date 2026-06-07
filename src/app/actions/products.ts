// src/app/actions/products.ts
"use server";

import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { slugify } from "@/lib/utils";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const ProductSchema = z.object({
  name: z.string().min(2, "Le nom doit faire au moins 2 caractères"),
  description: z.string().min(10, "La description doit faire au moins 10 caractères"),
  price: z.coerce.number().min(1, "Le prix doit être supérieur à 0"),
  comparePrice: z.coerce.number().optional(),
  stock: z.coerce.number().min(0),
  images: z.string(),
  categoryId: z.string().optional(),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  hasAlcohol: z.boolean().default(true),
  isBottle: z.boolean().default(true),
  sku: z.string().optional(),
  weight: z.coerce.number().optional(),
});

async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }
  return session;
}

export async function createProduct(formData: FormData) {
  await requireAdmin();

  const raw = {
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    comparePrice: formData.get("comparePrice") || undefined,
    stock: formData.get("stock"),
    images: formData.get("images") || "[]",
    categoryId: formData.get("categoryId") || undefined,
    featured: formData.get("featured") === "true",
    published: formData.get("published") === "true",
    hasAlcohol: formData.get("hasAlcohol") === "true",
    isBottle: formData.get("isBottle") === "true",
    sku: formData.get("sku") || undefined,
    weight: formData.get("weight") || undefined,
  };

  const parsed = ProductSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const { name, price, comparePrice, ...rest } = parsed.data;
  const images = JSON.parse(rest.images) as string[];

  try {
    await db.product.create({
      data: {
        name,
        slug: slugify(name),
        price: Math.round(price * 100),
        comparePrice: comparePrice ? Math.round(comparePrice * 100) : undefined,
        images,
        description: rest.description,
        stock: rest.stock,
        categoryId: rest.categoryId || null,
        featured: rest.featured,
        published: rest.published,
        hasAlcohol: rest.hasAlcohol,
        isBottle: rest.isBottle,
        sku: rest.sku || null,
        weight: rest.weight,
      },
    });

    revalidatePath("/dashboard/products");
    revalidatePath("/products");
  } catch (error: unknown) {
    if ((error as { code?: string })?.code === "P2002") {
      return { error: "Un produit avec ce nom existe déjà" };
    }
    return { error: "Erreur lors de la création du produit" };
  }

  redirect("/dashboard/products");
}

export async function updateProduct(id: string, formData: FormData) {
  await requireAdmin();

  const raw = {
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    comparePrice: formData.get("comparePrice") || undefined,
    stock: formData.get("stock"),
    images: formData.get("images") || "[]",
    categoryId: formData.get("categoryId") || undefined,
    featured: formData.get("featured") === "true",
    published: formData.get("published") === "true",
    hasAlcohol: formData.get("hasAlcohol") === "true",
    isBottle: formData.get("isBottle") === "true",
    sku: formData.get("sku") || undefined,
    weight: formData.get("weight") || undefined,
  };

  const parsed = ProductSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const { name, price, comparePrice, ...rest } = parsed.data;
  const images = JSON.parse(rest.images) as string[];

  try {
    await db.product.update({
      where: { id },
      data: {
        name,
        slug: slugify(name),
        price: Math.round(price * 100),
        comparePrice: comparePrice ? Math.round(comparePrice * 100) : null,
        images,
        description: rest.description,
        stock: rest.stock,
        categoryId: rest.categoryId || null,
        featured: rest.featured,
        published: rest.published,
        hasAlcohol: rest.hasAlcohol,
        isBottle: rest.isBottle,
        sku: rest.sku || null,
        weight: rest.weight,
      },
    });

    revalidatePath("/dashboard/products");
    revalidatePath("/products");
  } catch (error: unknown) {
    if ((error as { code?: string })?.code === "P2002") {
      return { error: "Un produit avec ce nom existe déjà" };
    }
    return { error: "Erreur lors de la mise à jour du produit" };
  }

  redirect("/dashboard/products");
}

export async function deleteProduct(id: string) {
  await requireAdmin();

  try {
    await db.product.delete({ where: { id } });
    revalidatePath("/dashboard/products");
    revalidatePath("/products");
    return { success: true };
  } catch (error) {
    console.error("deleteProduct error:", error);
    return {
      error:
        "Impossible de supprimer ce produit. Il est probablement lié à une commande existante.",
    };
  }
}
