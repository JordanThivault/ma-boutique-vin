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
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-24 text-center text-white">
        <p className="mb-5 font-sans text-xs tracking-[0.35em] text-stone-300 uppercase">
          Expériences
        </p>
        <h2 className="mb-4 font-serif text-4xl font-light lg:text-6xl">Vivre le domaine</h2>
        <p className="mb-12 font-sans text-base tracking-wide text-stone-300">
          Déguster, visiter, comprendre.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/experiences#degustation"
            className="bg-white px-8 py-3.5 font-sans text-sm tracking-[0.15em] text-stone-900 uppercase transition-colors duration-300 hover:bg-stone-100"
          >
            Réserver une dégustation
          </Link>
          <Link
            href="/experiences#visite"
            className="border border-white/60 px-8 py-3.5 font-sans text-sm tracking-[0.15em] text-white uppercase transition-colors duration-300 hover:bg-white/10"
          >
            Visiter le domaine
          </Link>
        </div>
      </div>
    </section>
  );
}
