// src/app/(store)/page.tsx
import Link from "next/link";
import { db } from "@/lib/db";
import { ProductCard } from "@/components/store/ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Truck, RefreshCcw } from "lucide-react";

async function getFeaturedProducts() {
  return db.product.findMany({
    where: { featured: true, published: true, stock: { gt: 0 } },
    include: { category: true },
    take: 8,
    orderBy: { createdAt: "desc" },
  });
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-neutral-950 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-950 to-black" />
        <div className="relative mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8 lg:py-40">
          <div className="max-w-2xl">
            <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white/80 ring-1 ring-white/20">
              Nouvelle collection disponible
            </span>
            <h1 className="mt-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Site en cours de développement{" "}
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                certaines fonctionnalités peuvent être incomplètes ou en cours de test.
              </span>
            </h1>
            <p className="mt-6 text-xl text-neutral-300">
              Découvrez notre sélection de produits soigneusement choisis pour
              vous offrir le meilleur de chaque catégorie.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" className="bg-white text-black hover:bg-neutral-100">
                <Link href="/products">
                  Voir la collection
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                <Link href="/products?featured=true">Meilleures ventes</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="border-b bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              {
                icon: Truck,
                title: "Livraison rapide",
                desc: "Expédition sous 24h ouvrées",
              },
              {
                icon: ShieldCheck,
                title: "Paiement sécurisé",
                desc: "Transactions cryptées Stripe",
              },
              {
                icon: RefreshCcw,
                title: "Retours gratuits",
                desc: "30 jours pour changer d'avis",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-neutral-900">{title}</p>
                  <p className="text-sm text-neutral-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      {featuredProducts.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold text-neutral-900">
                Produits vedettes
              </h2>
              <p className="mt-2 text-neutral-500">
                Une sélection de nos meilleurs articles
              </p>
            </div>
            <Button asChild variant="outline">
              <Link href="/products">
                Tout voir <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* CTA Banner */}
      <section className="bg-amber-500">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">
              Livraison offerte dès 60€
            </h2>
            <p className="mt-4 text-amber-100">
              Profitez de la livraison standard gratuite sur toutes vos
              commandes supérieures à 60€.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-8 bg-white text-amber-600 hover:bg-amber-50"
            >
              <Link href="/products">Commander maintenant</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
