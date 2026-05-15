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
    <section className="bg-stone-50 py-24 lg:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.35em] uppercase text-amber-700 font-sans mb-4">
            Journal du domaine
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl font-light text-stone-900">
            Dans les coulisses
          </h2>
        </div>

        {/* Posts grid */}
        {posts.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8 mb-14">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8 mb-14">
            <PostCardPlaceholder category="Vendanges" title="Vendanges 2024" date="12 septembre 2024" />
            <PostCardPlaceholder category="Coulisses" title="Dans les coulisses de la cave" date="3 septembre 2024" />
            <PostCardPlaceholder category="Événement" title="Journée portes ouvertes" date="25 août 2024" />
          </div>
        )}

        <div className="text-center">
          <Link
            href="/journal"
            className="inline-flex items-center gap-2 text-sm tracking-[0.15em] uppercase font-sans text-amber-700 hover:gap-4 transition-all duration-300"
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
      <div className="relative overflow-hidden mb-4" style={{ paddingBottom: "65%" }}>
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 bg-stone-200" />
        )}
        <span className="absolute top-3 left-3 text-[10px] tracking-[0.25em] uppercase font-sans bg-stone-900/80 text-white px-2.5 py-1">
          {post.category}
        </span>
      </div>
      <h3 className="font-serif text-lg font-light text-stone-900 mb-1 group-hover:text-amber-700 transition-colors">
        {post.title}
      </h3>
      {post.publishedAt && (
        <p className="text-xs text-stone-400 font-sans tracking-wide">
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
      <div className="relative overflow-hidden mb-4 bg-stone-200" style={{ paddingBottom: "65%" }}>
        <span className="absolute top-3 left-3 text-[10px] tracking-[0.25em] uppercase font-sans bg-stone-900/80 text-white px-2.5 py-1">
          {category}
        </span>
      </div>
      <h3 className="font-serif text-lg font-light text-stone-900 mb-1">{title}</h3>
      <p className="text-xs text-stone-400 font-sans tracking-wide">{date}</p>
    </div>
  );
}
