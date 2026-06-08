import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Journal du domaine — Domaine Gaud",
  description:
    "Actualités, vendanges, événements : suivez la vie du Domaine Gaud au fil des saisons.",
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
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const activeCategory = category || "Tous";
  const posts = await getPosts(activeCategory);

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[380px] overflow-hidden">
        <Image
          src="/images/journal.jpg"
          alt="Journal du domaine"
          fill
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
          <p className="mb-4 font-sans text-xs tracking-[0.35em] text-stone-300 uppercase">
            Journal
          </p>
          <h1 className="font-serif text-5xl font-light lg:text-7xl">Dans les coulisses</h1>
        </div>
      </section>

      {/* Category filter */}
      <div className="sticky top-20 z-30 border-b border-stone-200 bg-white">
        <div className="scrollbar-hide mx-auto flex max-w-6xl gap-6 overflow-x-auto px-6 py-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={cat === "Tous" ? "/journal" : `/journal?category=${cat}`}
              className={`border-b-2 pb-1 font-sans text-[11px] tracking-[0.25em] whitespace-nowrap uppercase transition-colors ${
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
      <section className="mx-auto max-w-6xl px-6 py-16">
        {posts.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-sans text-sm text-stone-400">Aucun article pour le moment.</p>
          </div>
        ) : (
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link key={post.id} href={`/journal/${post.slug}`} className="group block">
                <div className="relative mb-5 overflow-hidden" style={{ paddingBottom: "65%" }}>
                  {post.coverImage ? (
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-stone-100" />
                  )}
                  <span className="absolute top-3 left-3 bg-stone-900/80 px-2.5 py-1 font-sans text-[10px] tracking-[0.25em] text-white uppercase">
                    {post.category}
                  </span>
                </div>
                <h2 className="mb-2 font-serif text-xl leading-snug font-light text-stone-900 transition-colors group-hover:text-amber-700">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="mb-3 line-clamp-2 font-sans text-sm leading-relaxed text-stone-400">
                    {post.excerpt}
                  </p>
                )}
                <p className="font-sans text-xs tracking-wide text-stone-400">
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
