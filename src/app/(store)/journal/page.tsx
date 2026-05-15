import { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Journal du domaine — Domaine de la Rochette",
  description:
    "Actualités, vendanges, événements : suivez la vie du Domaine de la Rochette au fil des saisons.",
};

const CATEGORIES = ["Tous", "Vendanges", "Coulisses", "Événement", "Actualité", "Millésimes"];

async function getPosts(category?: string) {
  return db.post.findMany({
    where: {
      published: true,
      ...(category && category !== "Tous" ? { category } : {}),
    },
    orderBy: { publishedAt: "desc" },
  });
}

export default async function JournalPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const activeCategory = searchParams.category || "Tous";
  const posts = await getPosts(activeCategory);

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[380px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1543418219-44e30b057fea?w=1600&q=80"
          alt="Journal du domaine"
          fill
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
          <p className="text-xs tracking-[0.35em] uppercase text-stone-300 font-sans mb-4">
            Journal
          </p>
          <h1 className="font-serif text-5xl lg:text-7xl font-light">
            Dans les coulisses
          </h1>
        </div>
      </section>

      {/* Category filter */}
      <div className="border-b border-stone-200 bg-white sticky top-20 z-30">
        <div className="max-w-6xl mx-auto px-6 flex gap-6 overflow-x-auto py-4 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={cat === "Tous" ? "/journal" : `/journal?category=${cat}`}
              className={`text-[11px] tracking-[0.25em] uppercase font-sans whitespace-nowrap pb-1 border-b-2 transition-colors ${
                activeCategory === cat
                  ? "border-amber-700 text-stone-900"
                  : "border-transparent text-stone-400 hover:text-stone-700"
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>

      {/* Posts grid */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        {posts.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-stone-400 font-sans text-sm">Aucun article pour le moment.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.map((post) => (
              <Link key={post.id} href={`/journal/${post.slug}`} className="group block">
                <div
                  className="relative overflow-hidden mb-5"
                  style={{ paddingBottom: "65%" }}
                >
                  {post.coverImage ? (
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-stone-100" />
                  )}
                  <span className="absolute top-3 left-3 text-[10px] tracking-[0.25em] uppercase font-sans bg-stone-900/80 text-white px-2.5 py-1">
                    {post.category}
                  </span>
                </div>
                <h2 className="font-serif text-xl font-light text-stone-900 mb-2 group-hover:text-amber-700 transition-colors leading-snug">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="text-stone-400 font-sans text-sm leading-relaxed mb-3 line-clamp-2">
                    {post.excerpt}
                  </p>
                )}
                <p className="text-xs text-stone-400 font-sans tracking-wide">
                  {post.publishedAt ? formatDate(post.publishedAt) : ""}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
