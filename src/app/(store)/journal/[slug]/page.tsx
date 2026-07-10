import type { Metadata } from "next";
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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
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
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-stone-200" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute right-0 bottom-0 left-0 mx-auto max-w-4xl px-6 pb-12 text-white">
          <span className="mb-5 inline-block bg-stone-900/80 px-3 py-1 font-sans text-[10px] tracking-[0.25em] text-white uppercase">
            {post.category}
          </span>
          <h1 className="mt-3 font-serif text-4xl leading-tight font-light lg:text-6xl">
            {post.title}
          </h1>
          <p className="mt-3 font-sans text-sm tracking-wide text-stone-300">
            {post.publishedAt ? formatDate(post.publishedAt) : ""}
          </p>
        </div>
      </section>

      {/* Article content */}
      <article className="mx-auto max-w-3xl px-6 py-16">
        {post.excerpt && (
          <p className="mb-12 border-l-2 border-amber-600 pl-6 font-serif text-xl leading-relaxed whitespace-pre-line text-stone-600">
            {post.excerpt}
          </p>
        )}

        {/* Content rendered as prose */}
        <div
          className="prose prose-stone prose-lg prose-headings:font-serif prose-headings:font-light prose-p:font-sans prose-p:text-stone-600 prose-p:leading-relaxed prose-a:text-amber-700 prose-a:no-underline hover:prose-a:underline prose-img:w-full prose-img:object-cover max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      {/* Back link */}
      <div className="mx-auto max-w-3xl px-6 pb-16">
        <Link
          href="/journal"
          className="inline-flex items-center gap-2 font-sans text-sm tracking-[0.15em] text-amber-700 uppercase transition-all duration-300 hover:gap-4"
        >
          <span>←</span>
          Retour au journal
        </Link>
      </div>
    </main>
  );
}
