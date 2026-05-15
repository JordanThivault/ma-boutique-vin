import Link from "next/link";
import Image from "next/image";

export default function ExperiencesSection() {
  return (
    <section className="relative min-h-[500px] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1568213816046-0ee1c42bd559?w=1600&q=80"
          alt="Dégustation au domaine"
          fill
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white px-6 py-24">
        <p className="text-xs tracking-[0.35em] uppercase text-stone-300 font-sans mb-5">
          Expériences
        </p>
        <h2 className="font-serif text-4xl lg:text-6xl font-light mb-4">
          Vivre le domaine
        </h2>
        <p className="font-sans text-stone-300 text-base tracking-wide mb-12">
          Déguster, visiter, comprendre.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/experiences#degustation"
            className="px-8 py-3.5 bg-white text-stone-900 text-sm font-sans tracking-[0.15em] uppercase hover:bg-stone-100 transition-colors duration-300"
          >
            Réserver une dégustation
          </Link>
          <Link
            href="/experiences#visite"
            className="px-8 py-3.5 border border-white/60 text-white text-sm font-sans tracking-[0.15em] uppercase hover:bg-white/10 transition-colors duration-300"
          >
            Visiter le domaine
          </Link>
        </div>
      </div>
    </section>
  );
}
