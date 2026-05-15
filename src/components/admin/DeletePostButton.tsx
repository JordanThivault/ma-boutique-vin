"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { deletePost } from "@/app/actions/posts";

export default function DeletePostButton({ postId }: { postId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm("Supprimer cet article définitivement ?")) return;
    setLoading(true);
    await deletePost(postId);
    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-sm text-red-600 hover:text-red-800 disabled:opacity-50"
    >
      {loading ? "..." : "Supprimer"}
    </button>
  );
}
