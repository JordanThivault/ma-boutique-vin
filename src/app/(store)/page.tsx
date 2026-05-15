// src/app/(store)/page.tsx

import HeroSection from "@/components/store/HeroSection";
import TerroirSection from "@/components/store/TerroirSection";
import FeaturedProducts from "@/components/store/FeaturedProducts";
import SavoirFaireSection from "@/components/store/SavoirFaireSection";
import ExperiencesSection from "@/components/store/ExperiencesSection";
import JournalSection from "@/components/store/JournalSection";
import NewsletterBanner from "@/components/store/NewsletterBanner";

import { db } from "@/lib/db";

export const metadata = {
  title: "Domaine test — Chinon",
  description:
    "Vins de caractère issus du terroir de Chinon. Cabernet Franc élevé avec soin.",
};

async function getFeaturedProducts() {
  return db.product.findMany({
    where: {
      featured: true,
      published: true,
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
  });
}

async function getLatestPosts() {
  return db.post.findMany({
    where: {
      published: true,
    },
    orderBy: {
      publishedAt: "desc",
    },
    take: 3,
  });
}

export default async function HomePage() {
  const [featuredProducts, latestPosts] = await Promise.all([
    getFeaturedProducts(),
    getLatestPosts(),
  ]);

  return (
    <main>
      <HeroSection />

      <TerroirSection />

      <FeaturedProducts products={featuredProducts} />

      <SavoirFaireSection />

      <ExperiencesSection />

      <JournalSection posts={latestPosts} />

      <NewsletterBanner />
    </main>
  );
}