"use client";

import { useState } from "react";
import { createProduct, updateProduct } from "@/app/actions/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, Plus, X } from "lucide-react";
import { UploadButton } from "@/lib/uploadthing";

interface Category {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  comparePrice?: number | null;
  stock: number;
  images: string[];
  categoryId?: string | null;
  featured: boolean;
  published: boolean;
  hasAlcohol: boolean;
  sku?: string | null;
  weight?: number | null;
}

interface ProductFormProps {
  categories: Category[];
  product?: Product;
}

export function ProductForm({ categories, product }: ProductFormProps) {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>(product?.images ?? []);
  const [newImageUrl, setNewImageUrl] = useState("");

  function addImage() {
    if (newImageUrl.trim() && !images.includes(newImageUrl.trim())) {
      setImages([...images, newImageUrl.trim()]);
      setNewImageUrl("");
    }
  }

  function removeImage(url: string) {
    setImages(images.filter((i) => i !== url));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    formData.set("images", JSON.stringify(images));

    const result = product
      ? await updateProduct(product.id, formData)
      : await createProduct(formData);

    if (result?.error) {
      toast.error(result.error);
      setLoading(false);
      return;
    }

    toast.success(product ? "Produit mis à jour" : "Produit créé");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* ===================== INFO ===================== */}
      <div className="rounded-2xl border bg-white p-6 space-y-4">
        <h2 className="font-semibold text-neutral-900">Informations générales</h2>

        <div>
          <Label>Nom du produit *</Label>
          <Input name="name" required defaultValue={product?.name} className="mt-1" />
        </div>

        <div>
          <Label>Description *</Label>
          <textarea
            name="description"
            required
            defaultValue={product?.description}
            rows={4}
            className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
          />
        </div>

        <div>
          <Label>Catégorie</Label>
          <Select name="categoryId" defaultValue={product?.categoryId ?? "none"}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Sélectionner une catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Aucune catégorie</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* ===================== PRIX ===================== */}
      <div className="rounded-2xl border bg-white p-6 space-y-4">
        <h2 className="font-semibold text-neutral-900">Prix & Stock</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Prix (€) *</Label>
            <Input
              name="price"
              type="number"
              step="0.01"
              required
              defaultValue={product ? (product.price / 100).toFixed(2) : ""}
            />
          </div>
          <div>
            <Label>Prix barré</Label>
            <Input
              name="comparePrice"
              type="number"
              step="0.01"
              defaultValue={product?.comparePrice ? (product.comparePrice / 100).toFixed(2) : ""}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Stock *</Label>
            <Input name="stock" type="number" required defaultValue={product?.stock ?? 0} />
          </div>
          <div>
            <Label>SKU</Label>
            <Input name="sku" defaultValue={product?.sku ?? ""} />
          </div>
        </div>

        <div>
          <Label>Poids (g)</Label>
          <Input name="weight" type="number" defaultValue={product?.weight ?? ""} />
        </div>
      </div>

      {/* ===================== IMAGES ===================== */}
      <div className="rounded-2xl border bg-white p-6 space-y-4">
        <h2 className="font-semibold text-neutral-900">Images</h2>

        <UploadButton
          endpoint="productImage"
          appearance={{
            button: "bg-neutral-900 text-white rounded-xl px-4 py-2 text-sm font-medium hover:bg-neutral-700 ut-uploading:bg-neutral-600",
            allowedContent: "text-neutral-400 text-xs mt-2",
          }}
          onClientUploadComplete={(res) => {
            const urls = res.map((f) => f.ufsUrl);
            setImages((prev) => [...prev, ...urls]);
            toast.success(`${res.length} image(s) ajoutée(s)`);
          }}
          onUploadError={(error) => { toast.error(error.message); }}
        />

        <div className="flex gap-2 mt-3">
          <Input
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            placeholder="Coller une URL image"
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addImage(); } }}
          />
          <Button type="button" variant="outline" onClick={addImage}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {images.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mt-3">
            {images.map((url) => (
              <div key={url} className="group relative aspect-square overflow-hidden rounded-lg bg-neutral-100">
                <Image src={url} alt="Image produit" fill className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(url)}
                  className="absolute right-1 top-1 h-6 w-6 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ===================== VISIBILITÉ & OPTIONS ===================== */}
      <div className="rounded-2xl border bg-white p-6 space-y-4">
        <h2 className="font-semibold">Visibilité & options</h2>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="published"
            value="true"
            defaultChecked={product?.published ?? true}
          />
          <span className="text-sm">Publié</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="featured"
            value="true"
            defaultChecked={product?.featured ?? false}
          />
          <span className="text-sm">Produit vedette</span>
        </label>

        <div className="border-t pt-4">
          <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-3">
            Alcool
          </p>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="hasAlcohol"
              value="true"
              defaultChecked={product?.hasAlcohol ?? true}
            />
            <span className="text-sm">Contient de l'alcool</span>
          </label>
          <p className="text-xs text-neutral-400 mt-1 ml-5">
            Décochez pour les vins sans alcool, jus de raisin, condiments sans alcool…
          </p>
        </div>
      </div>

      {/* ===================== ACTIONS ===================== */}
      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={() => history.back()}>
          Annuler
        </Button>
        <Button disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sauvegarde...
            </>
          ) : product ? "Mettre à jour" : "Créer"}
        </Button>
      </div>
    </form>
  );
}
