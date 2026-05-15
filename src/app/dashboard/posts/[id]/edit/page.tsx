// src/app/dashboard/posts/[id]/edit/page.tsx

import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import PostForm from "@/components/admin/PostForm";

export const metadata = { title: "Modifier l'article — Dashboard" };

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditPostPage({ params }: PageProps) {
  const { id } = await params;

  const post = await db.post.findUnique({
    where: { id },
  });

  if (!post) notFound();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif">Modifier l article</h1>
        <p className="text-sm text-gray-500 mt-1">
          Modifiez le contenu du journal du domaine.
        </p>
      </div>

      <PostForm post={post} />
    </div>
  );
}