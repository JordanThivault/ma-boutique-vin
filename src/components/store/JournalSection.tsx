import Link from "next/link";
import { formatDate } from "@/lib/utils";
import Image from "next/image";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: string | null;
  category: string;
  publishedAt: Date | null;
}

interface JournalSectionProps {
  posts: Post[];
}

export default function JournalSection({ posts }: JournalSectionProps) {
  return (
    <section className="bg-stone-50 px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="mb-4 font-sans text-xs tracking-[0.35em] text-amber-700 uppercase">
            Journal du domaine
          </p>
          <h2 className="font-serif text-4xl font-light text-stone-900 lg:text-5xl">
            Dans les coulisses
          </h2>
        </div>

        {/* Posts grid */}
        {posts.length > 0 ? (
          <div className="mb-14 grid gap-8 md:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="mb-14 grid gap-8 md:grid-cols-3">
            <PostCardPlaceholder
              category="Vendanges"
              title="Vendanges 2024"
              date="12 septembre 2024"
            />
            <PostCardPlaceholder
              category="Coulisses"
              title="Dans les coulisses de la cave"
              date="3 septembre 2024"
            />
            <PostCardPlaceholder
              category="Événement"
              title="Journée portes ouvertes"
              date="25 août 2024"
            />
          </div>
        )}

        <div className="text-center">
          <Link
            href="/journal"
            className="inline-flex items-center gap-2 font-sans text-sm tracking-[0.15em] text-amber-700 uppercase transition-all duration-300 hover:gap-4"
          >
            Voir tous les articles
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/journal/${post.slug}`} className="group block">
      <div className="relative mb-4 overflow-hidden" style={{ paddingBottom: "65%" }}>
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-stone-200" />
        )}
        <span className="absolute top-3 left-3 bg-stone-900/80 px-2.5 py-1 font-sans text-[10px] tracking-[0.25em] text-white uppercase">
          {post.category}
        </span>
      </div>
      <h3 className="mb-1 font-serif text-lg font-light text-stone-900 transition-colors group-hover:text-amber-700">
        {post.title}
      </h3>
      {post.publishedAt && (
        <p className="font-sans text-xs tracking-wide text-stone-400">
          {formatDate(post.publishedAt)}
        </p>
      )}
    </Link>
  );
}

function PostCardPlaceholder({
  category,
  title,
  date,
}: {
  category: string;
  title: string;
  date: string;
}) {
  return (
    <div className="group block">
      <div className="relative mb-4 overflow-hidden bg-stone-200" style={{ paddingBottom: "65%" }}>
        <span className="absolute top-3 left-3 bg-stone-900/80 px-2.5 py-1 font-sans text-[10px] tracking-[0.25em] text-white uppercase">
          {category}
        </span>
      </div>
      <h3 className="mb-1 font-serif text-lg font-light text-stone-900">{title}</h3>
      <p className="font-sans text-xs tracking-wide text-stone-400">{date}</p>
    </div>
  );
}
