import Link from "next/link";
import Image from "next/image";

export default function TerroirSection() {
  return (
    <section className="grid lg:grid-cols-2 min-h-[600px]">
      {/* Image */}
      <div className="relative overflow-hidden min-h-[400px] lg:min-h-0">
        <Image
          src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=900&q=80"
          alt="Vignes sur les coteaux de Chinon"
          fill
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
        />
      </div>

      {/* Text */}
      <div className="flex items-center bg-stone-50 px-12 py-20 lg:px-20">
        <div className="max-w-md">
          <p className="text-xs tracking-[0.35em] uppercase text-amber-700 font-sans mb-5">
            Terroir
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl font-light text-stone-900 leading-tight mb-6">
            Le terroir
            <br />
            de Chinon
          </h2>
          <p className="text-stone-500 font-sans leading-relaxed text-base mb-8">
            Entre Loire et coteaux, nos vignes s enracinent dans un sol unique
            qui façonne des vins d identité, fins et élégants. Le tuffeau,
            pierre calcaire emblématique du Val de Loire, confère à nos Cabernet
            Franc une minéralité rare et une fraîcheur persistante.
          </p>
          <Link
            href="/domaine"
            className="inline-flex items-center gap-2 text-sm tracking-[0.15em] uppercase font-sans text-amber-700 hover:gap-4 transition-all duration-300"
          >
            Découvrir le domaine
            <span className="text-base">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
