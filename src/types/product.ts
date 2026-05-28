// src/types/product.ts

// Type complet (pages produit, ProductCard, AddToCartButton...)
export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  comparePrice?: number | null;
  images: string[];
  stock: number;
  featured: boolean;
  category?: { name: string } | null;
  description?: string | null;
}

// Type allégé pour le cart (ce que Zustand stocke)
export type CartProduct = {
  id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
  stock: number;
};