import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import Image from "next/image";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const post = await db.post.findUnique({
    where: { slug },
  });

  if (!post) return {};

  return {
    title: `${post.title} — Journal du domaine`,
    description: post.excerpt ?? undefined,
    openGraph: {
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;

  const post = await db.post.findFirst({
    where: {
      slug,
      published: true,
    },
  });

  if (!post) notFound();

  return (
    <main>
      {/* Header article */}
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-stone-200" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-12 text-white max-w-4xl mx-auto">
          <span className="text-[10px] tracking-[0.25em] uppercase font-sans bg-stone-900/80 text-white px-3 py-1 mb-5 inline-block">
            {post.category}
          </span>
          <h1 className="font-serif text-4xl lg:text-6xl font-light leading-tight mt-3">
            {post.title}
          </h1>
          <p className="text-stone-300 font-sans text-sm mt-3 tracking-wide">
            {post.publishedAt ? formatDate(post.publishedAt) : ""}
          </p>
        </div>
      </section>

      {/* Article content */}
      <article className="max-w-3xl mx-auto px-6 py-16">
        {post.excerpt && (
          <p className="font-serif text-xl text-stone-600 leading-relaxed border-l-2 border-amber-600 pl-6 mb-12">
            {post.excerpt}
          </p>
        )}

        {/* Content rendered as prose */}
        <div
          className="prose prose-stone prose-lg max-w-none
            prose-headings:font-serif prose-headings:font-light
            prose-p:font-sans prose-p:text-stone-600 prose-p:leading-relaxed
            prose-a:text-amber-700 prose-a:no-underline hover:prose-a:underline
            prose-img:w-full prose-img:object-cover"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      {/* Back link */}
      <div className="max-w-3xl mx-auto px-6 pb-16">
        <Link
          href="/journal"
          className="inline-flex items-center gap-2 text-sm tracking-[0.15em] uppercase font-sans text-amber-700 hover:gap-4 transition-all duration-300"
        >
          <span>←</span>
          Retour au journal
        </Link>
      </div>
    </main>
  );
}
