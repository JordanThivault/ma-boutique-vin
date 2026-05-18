"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  createExperience,
  updateExperience,
} from "@/app/actions/newsletter-reservations";

import Image from "next/image";
import { UploadButton } from "@/lib/uploadthing";
import { X, Plus } from "lucide-react";

interface ExperienceFormProps {
  experience?: {
    id: string;
    title: string;
    type: string;
    duration: string;
    price: string;
    description: string;
    includes: string[];
    image: string | null;
    order: number;
    active: boolean;
  };
}

export default function ExperienceForm({ experience }: ExperienceFormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [image, setImage] = useState<string>(experience?.image ?? "");
  const [newImageUrl, setNewImageUrl] = useState("");

  const isEditing = !!experience;

  function addImageFromUrl() {
    if (newImageUrl.trim()) {
      setImage(newImageUrl.trim());
      setNewImageUrl("");
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const fd = new FormData(e.currentTarget);

    const data = {
      title: fd.get("title") as string,
      type: fd.get("type") as string,
      duration: fd.get("duration") as string,
      price: fd.get("price") as string,
      description: fd.get("description") as string,
      includes: fd.get("includes") as string,
      image: image || "",
      order: Number(fd.get("order") ?? 0),
      active: fd.get("active") === "on",
    };

    const result = isEditing
      ? await updateExperience(experience.id, data)
      : await createExperience(data);

    if (result.success) {
      router.push("/dashboard/experiences");
      router.refresh();
    } else {
      setError(result.error ?? "Erreur");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">

      {/* ================= INFO ================= */}
      <div className="border rounded-2xl p-6 space-y-4">
        <h2 className="font-semibold">Informations</h2>

        <input
          name="title"
          required
          defaultValue={experience?.title}
          placeholder="Titre"
          className="w-full border p-3 rounded"
        />

        <input
          name="type"
          required
          defaultValue={experience?.type}
          placeholder="Type (Dégustation / Visite / Événement)"
          className="w-full border p-3 rounded"
        />

        <div className="grid grid-cols-2 gap-3">
          <input
            name="duration"
            required
            defaultValue={experience?.duration}
            placeholder="Durée"
            className="border p-3 rounded"
          />

          <input
            name="price"
            required
            defaultValue={experience?.price}
            placeholder="Prix"
            className="border p-3 rounded"
          />
        </div>

        <input
          name="order"
          type="number"
          defaultValue={experience?.order ?? 0}
          className="border p-3 rounded w-full"
          placeholder="Ordre"
        />
      </div>

      {/* ================= IMAGE UPLOADTHING ================= */}
      <div className="border rounded-2xl p-6 space-y-4">
        <h2 className="font-semibold">Image</h2>

        <UploadButton
          endpoint="productImage"
          appearance={{
            button:
              "bg-neutral-900 text-white rounded-xl px-4 py-2 text-sm font-medium hover:bg-neutral-700 ut-uploading:bg-neutral-600",
            allowedContent: "text-neutral-400 text-xs mt-2",
          }}
          onClientUploadComplete={(res) => {
            if (res?.[0]?.ufsUrl) {
              setImage(res[0].ufsUrl);
            }
          }}
          onUploadError={(err) => {
            setError(err.message);
          }}
        />

        {/* URL fallback */}
        <div className="flex gap-2">
          <input
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            placeholder="Ou coller une URL image"
            className="border p-3 rounded w-full"
          />
          <button
            type="button"
            onClick={addImageFromUrl}
            className="px-3 border rounded"
          >
            <Plus size={16} />
          </button>
        </div>

        {/* preview */}
        {image && (
          <div className="relative w-full h-60 rounded overflow-hidden">
            <Image
              src={image}
              alt="preview"
              fill
              className="object-cover"
            />

            <button
              type="button"
              onClick={() => setImage("")}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded"
            >
              <X size={14} />
            </button>
          </div>
        )}
      </div>

      {/* ================= DESCRIPTION ================= */}
      <textarea
        name="description"
        required
        defaultValue={experience?.description}
        rows={4}
        placeholder="Description"
        className="w-full border p-3 rounded"
      />

      {/* ================= INCLUDES ================= */}
      <textarea
        name="includes"
        defaultValue={experience?.includes.join("\n")}
        rows={4}
        placeholder={"1 élément par ligne\nDégustation\nVisite cave"}
        className="w-full border p-3 rounded font-mono"
      />

      {/* ================= ACTIVE ================= */}
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="active"
          defaultChecked={experience?.active ?? true}
        />
        Visible sur le site
      </label>

      {/* ================= ERROR ================= */}
      {error && <p className="text-red-600 text-sm">{error}</p>}

      {/* ================= ACTIONS ================= */}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-6 py-3 rounded"
        >
          {loading
            ? "Sauvegarde..."
            : isEditing
            ? "Mettre à jour"
            : "Créer"}
        </button>

        <button
          type="button"
          onClick={() => router.back()}
          className="border px-6 py-3 rounded"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}