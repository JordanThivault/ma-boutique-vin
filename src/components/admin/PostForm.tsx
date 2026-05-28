"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPost, updatePost } from "@/app/actions/posts";
import { UploadButton } from "@/lib/uploadthing"; // ← comme ProductForm
import Image from "next/image";

interface PostFormProps {
  post?: {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    coverImage: string | null;
    category: string;
    published: boolean;
  };
}

const CATEGORIES = ["Vendanges", "Coulisses", "Événement", "Actualité", "Millésimes"];

export default function PostForm({ post }: PostFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [coverImage, setCoverImage] = useState(post?.coverImage ?? "");
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");

  const isEditing = !!post;

  function generateSlug(value: string) {
    return value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const fd = new FormData(e.currentTarget);

    const data = {
      title: fd.get("title") as string,
      slug: fd.get("slug") as string,
      excerpt: fd.get("excerpt") as string,
      content: fd.get("content") as string,
      coverImage,
      category: fd.get("category") as string,
      published: fd.get("published") === "on",
    };

    const result = isEditing ? await updatePost(post.id, data) : await createPost(data);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      {/* TITRE */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Titre *</label>
        <input
          name="title"
          type="text"
          required
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (!isEditing) setSlug(generateSlug(e.target.value));
          }}
          className="w-full rounded border border-gray-300 px-4 py-2.5 text-sm focus:border-gray-500 focus:outline-none"
        />
      </div>

      {/* SLUG */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Slug (URL) *</label>
        <input
          name="slug"
          type="text"
          required
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-full rounded border border-gray-300 px-4 py-2.5 font-mono text-sm focus:border-gray-500 focus:outline-none"
        />
        <p className="mt-1 text-xs text-gray-400">ex: vendanges-2024</p>
      </div>

      {/* CATÉGORIE + IMAGE */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Catégorie *</label>
          <select
            name="category"
            required
            defaultValue={post?.category || "Actualité"}
            className="w-full rounded border border-gray-300 px-4 py-2.5 text-sm focus:border-gray-500 focus:outline-none"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* IMAGE DE COUVERTURE */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Image de couverture
          </label>
          {coverImage ? (
            <div className="relative">
              <Image
                src={coverImage}
                alt="Couverture"
                width={400}
                height={200}
                className="h-32 w-full rounded border border-gray-200 object-cover"
              />
              <button
                type="button"
                onClick={() => setCoverImage("")}
                className="absolute top-1 right-1 rounded bg-white px-2 py-1 text-xs text-gray-600 shadow hover:bg-red-50 hover:text-red-600"
              >
                Supprimer
              </button>
            </div>
          ) : (
            <UploadButton
              endpoint="productImage" // ← même endpoint que ProductForm
              onClientUploadComplete={(res) => {
                if (res?.[0]?.ufsUrl) setCoverImage(res[0].ufsUrl); // ← ufsUrl comme ProductForm
              }}
              onUploadError={(err) => setError(`Upload échoué : ${err.message}`)}
              appearance={{
                button: "bg-stone-900 text-white text-sm px-4 py-2 rounded hover:bg-stone-700",
                allowedContent: "text-xs text-gray-400",
              }}
            />
          )}
        </div>
      </div>

      {/* EXTRAIT */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Extrait (chapeau)</label>
        <textarea
          name="excerpt"
          rows={2}
          defaultValue={post?.excerpt ?? ""}
          placeholder="Résumé affiché dans les listes..."
          className="w-full resize-none rounded border border-gray-300 px-4 py-2.5 text-sm focus:border-gray-500 focus:outline-none"
        />
      </div>

      {/* CONTENU */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Contenu * <span className="font-normal text-gray-400">(HTML accepté)</span>
        </label>
        <textarea
          name="content"
          rows={16}
          required
          defaultValue={post?.content}
          placeholder="<p>Contenu de l'article...</p>"
          className="w-full resize-y rounded border border-gray-300 px-4 py-2.5 font-mono text-sm focus:border-gray-500 focus:outline-none"
        />
      </div>

      {/* PUBLIER */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="published"
          name="published"
          defaultChecked={post?.published ?? false}
          className="rounded"
        />
        <label htmlFor="published" className="text-sm font-medium text-gray-700">
          Publier immédiatement
        </label>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-4 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="rounded bg-stone-900 px-8 py-2.5 text-sm text-white transition-colors hover:bg-stone-700 disabled:opacity-50"
        >
          {loading ? "Enregistrement..." : isEditing ? "Mettre à jour" : "Créer l'article"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded border border-gray-300 px-6 py-2.5 text-sm text-gray-600 transition-colors hover:bg-gray-50"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}
