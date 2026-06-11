// src/app/(store)/page.tsx
import { Suspense } from "react";
import HeroSection from "@/components/store/HeroSection";
import TerroirSection from "@/components/store/TerroirSection";
import FeaturedProducts from "@/components/store/FeaturedProducts";
import { FeaturedProductsSkeleton } from "@/components/store/FeaturedProductsSkeleton";
import SavoirFaireSection from "@/components/store/SavoirFaireSection";
import ExperiencesSection from "@/components/store/ExperiencesSection";
import JournalSection from "@/components/store/JournalSection";
import NewsletterBanner from "@/components/store/NewsletterBanner";
import { db } from "@/lib/db";

export const metadata = {
  title: "Domaine Gaud — AOP Chinon, Val de Loire",
  description: "Vins de caractère issus du terroir de Chinon.",
};

// ─── Composants async séparés ────────────────────────────

async function FeaturedProductsSection() {
  const products = await db.product.findMany({
    where: { featured: true, published: true },
    include: { category: true },
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  return <FeaturedProducts products={products} />;
}

async function JournalSectionWrapper() {
  const posts = await db.post.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
    take: 3,
  });

  return <JournalSection posts={posts} />;
}

// ─── Page principale ─────────────────────────────────────
export default function HomePage() {
  return (
    <main>
      <HeroSection />

      <TerroirSection />

      <Suspense fallback={<FeaturedProductsSkeleton />}>
        <FeaturedProductsSection />
      </Suspense>

      <SavoirFaireSection />

      <ExperiencesSection />

      <Suspense
        fallback={
          <section className="bg-stone-50 px-6 py-24 lg:py-32">
            <div className="mx-auto max-w-6xl">
              <div className="mb-16 flex flex-col items-center gap-3">
                <div className="h-3 w-24 animate-pulse rounded bg-stone-200" />
                <div className="h-8 w-64 animate-pulse rounded bg-stone-200" />
              </div>
              <div className="grid gap-10 md:grid-cols-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex flex-col gap-3">
                    <div
                      className="w-full animate-pulse rounded bg-stone-200"
                      style={{ paddingBottom: "65%" }}
                    />
                    <div className="h-4 w-3/4 animate-pulse rounded bg-stone-200" />
                    <div className="h-3 w-1/3 animate-pulse rounded bg-stone-200" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        }
      >
        <JournalSectionWrapper />
      </Suspense>

      <NewsletterBanner />
    </main>
  );
}
