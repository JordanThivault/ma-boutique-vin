// src/app/actions/posts.ts
"use server";

import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { slugify } from "@/lib/utils";

// --------------------------------------------------
// ZOD SCHEMA
// --------------------------------------------------

const PostSchema = z.object({
  title: z.string().trim().min(3, "Titre trop court"),
  slug: z.string().optional(),
  excerpt: z.string().optional(),
  content: z.string().trim().min(10, "Contenu trop court"),
  coverImage: z.string().optional(),
  category: z.string().min(1, "Catégorie requise"),
  published: z.boolean(),
});

// --------------------------------------------------
// TYPES
// --------------------------------------------------

export type PostInput = z.infer<typeof PostSchema>;

// --------------------------------------------------
// AUTH ADMIN
// --------------------------------------------------

async function requireAdmin() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  return session;
}

// --------------------------------------------------
// BUILD POST DATA
// --------------------------------------------------

async function buildPostData(data: PostInput) {
  const parsed = PostSchema.safeParse(data);

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0].message,
    };
  }

  const values = parsed.data;

  const baseSlug = values.slug?.trim() || slugify(values.title);

  return {
    data: {
      title: values.title,
      slug: baseSlug,
      excerpt: values.excerpt || null,
      content: values.content,
      coverImage: values.coverImage || null,
      category: values.category,
      published: values.published,
      publishedAt: values.published ? new Date() : null,
    },
  };
}

// --------------------------------------------------
// CREATE POST
// --------------------------------------------------

export async function createPost(data: PostInput) {
  await requireAdmin();

  const result = await buildPostData(data);

  if ("error" in result) {
    return result;
  }

  try {
    // Vérifie slug existant
    const existingPost = await db.post.findUnique({
      where: {
        slug: result.data.slug,
      },
    });

    if (existingPost) {
      return {
        error: "Un post avec ce slug existe déjà",
      };
    }

    await db.post.create({
      data: result.data,
    });

    revalidatePath("/dashboard/posts");
    revalidatePath("/journal");
    revalidatePath("/");
  } catch (error) {
    console.error(error);

    return {
      error: "Erreur lors de la création du post",
    };
  }

  redirect("/dashboard/posts");
}

// --------------------------------------------------
// UPDATE POST
// --------------------------------------------------

export async function updatePost(id: string, data: PostInput) {
  await requireAdmin();

  const result = await buildPostData(data);

  if ("error" in result) {
    return result;
  }

  try {
    // Vérifie slug utilisé par un autre post
    const existingPost = await db.post.findFirst({
      where: {
        slug: result.data.slug,
        NOT: {
          id,
        },
      },
    });

    if (existingPost) {
      return {
        error: "Un autre post utilise déjà ce slug",
      };
    }

    await db.post.update({
      where: { id },
      data: result.data,
    });

    revalidatePath("/dashboard/posts");
    revalidatePath("/journal");
    revalidatePath(`/journal/${result.data.slug}`);
    revalidatePath("/");
  } catch (error) {
    console.error(error);

    return {
      error: "Erreur lors de la mise à jour du post",
    };
  }

  redirect("/dashboard/posts");
}

// --------------------------------------------------
// DELETE POST
// --------------------------------------------------

export async function deletePost(id: string) {
  await requireAdmin();

  try {
    await db.post.delete({
      where: { id },
    });

    revalidatePath("/dashboard/posts");
    revalidatePath("/journal");
    revalidatePath("/");

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    return {
      error: "Impossible de supprimer ce post",
    };
  }
}
