// src/components/admin/ProductForm.tsx
"use client";

import { useState } from "react";
import { createProduct, updateProduct } from "@/app/actions/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, Plus, X } from "lucide-react";

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
    }
    // redirect handled server-side on success
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-2xl border bg-white p-6 space-y-4">
        <h2 className="font-semibold text-neutral-900">Informations générales</h2>

        <div>
          <Label htmlFor="name">Nom du produit *</Label>
          <Input
            id="name"
            name="name"
            required
            defaultValue={product?.name}
            placeholder="Mon super produit"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="description">Description *</Label>
          <textarea
            id="description"
            name="description"
            required
            defaultValue={product?.description}
            placeholder="Description détaillée du produit..."
            rows={4}
            className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
          />
        </div>

        <div>
          <Label htmlFor="categoryId">Catégorie</Label>
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

      <div className="rounded-2xl border bg-white p-6 space-y-4">
        <h2 className="font-semibold text-neutral-900">Prix & Stock</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="price">Prix (€) *</Label>
            <Input
              id="price"
              name="price"
              type="number"
              step="0.01"
              min="0.01"
              required
              defaultValue={product ? (product.price / 100).toFixed(2) : ""}
              placeholder="29.99"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="comparePrice">Prix barré (€)</Label>
            <Input
              id="comparePrice"
              name="comparePrice"
              type="number"
              step="0.01"
              defaultValue={product?.comparePrice ? (product.comparePrice / 100).toFixed(2) : ""}
              placeholder="39.99"
              className="mt-1"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="stock">Stock *</Label>
            <Input
              id="stock"
              name="stock"
              type="number"
              min="0"
              required
              defaultValue={product?.stock ?? 0}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="sku">SKU</Label>
            <Input
              id="sku"
              name="sku"
              defaultValue={product?.sku ?? ""}
              placeholder="REF-001"
              className="mt-1"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="weight">Poids (grammes)</Label>
          <Input
            id="weight"
            name="weight"
            type="number"
            min="0"
            defaultValue={product?.weight ?? ""}
            placeholder="500"
            className="mt-1"
          />
        </div>
      </div>

      <div className="rounded-2xl border bg-white p-6 space-y-4">
        <h2 className="font-semibold text-neutral-900">Images</h2>

        <div className="flex gap-2">
          <Input
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            placeholder="https://... (URL de l'image)"
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addImage())}
          />
          <Button type="button" variant="outline" onClick={addImage}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {images.length > 0 && (
          <div className="grid grid-cols-3 gap-3">
            {images.map((url) => (
              <div key={url} className="group relative aspect-square overflow-hidden rounded-lg bg-neutral-100">
                <img src={url} alt="" className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(url)}
                  className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-2xl border bg-white p-6 space-y-4">
        <h2 className="font-semibold text-neutral-900">Visibilité</h2>

        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="published"
              value="true"
              defaultChecked={product?.published ?? true}
              className="h-4 w-4 rounded border-gray-300"
            />
            <span className="text-sm">Publié</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="featured"
              value="true"
              defaultChecked={product?.featured ?? false}
              className="h-4 w-4 rounded border-gray-300"
            />
            <span className="text-sm">Produit vedette</span>
          </label>
        </div>
      </div>

      <div className="flex gap-3 justify-end">
        <Button type="button" variant="outline" onClick={() => history.back()}>
          Annuler
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Enregistrement...
            </>
          ) : product ? (
            "Mettre à jour"
          ) : (
            "Créer le produit"
          )}
        </Button>
      </div>
    </form>
  );
}
