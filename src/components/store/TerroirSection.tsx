import Link from "next/link";
import Image from "next/image";

export default function TerroirSection() {
  return (
    <section className="grid min-h-[600px] lg:grid-cols-2">
      {/* Image */}
      <div className="relative min-h-[400px] overflow-hidden lg:min-h-0">
        <Image
          src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=900&q=80"
          alt="Vignes sur les coteaux de Chinon"
          fill
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
        />
      </div>

      {/* Text */}
      <div className="flex items-center bg-stone-50 px-12 py-20 lg:px-20">
        <div className="max-w-md">
          <p className="mb-5 font-sans text-xs tracking-[0.35em] text-amber-700 uppercase">
            Terroir
          </p>
          <h2 className="mb-6 font-serif text-4xl leading-tight font-light text-stone-900 lg:text-5xl">
            Le terroir
            <br />
            de Chinon
          </h2>
          <p className="mb-8 font-sans text-base leading-relaxed text-stone-500">
            Entre Loire et coteaux, nos vignes s enracinent dans un sol unique qui façonne des vins
            d identité, fins et élégants. Le tuffeau, pierre calcaire emblématique du Val de Loire,
            confère à nos Cabernet Franc une minéralité rare et une fraîcheur persistante.
          </p>
          <Link
            href="/domaine"
            className="inline-flex items-center gap-2 font-sans text-sm tracking-[0.15em] text-amber-700 uppercase transition-all duration-300 hover:gap-4"
          >
            Découvrir le domaine
            <span className="text-base">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
