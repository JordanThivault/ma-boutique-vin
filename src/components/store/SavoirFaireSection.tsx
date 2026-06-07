import Link from "next/link";
import Image from "next/image";

export default function SavoirFaireSection() {
  return (
    <section className="grid min-h-[600px] lg:grid-cols-2">
      {/* Text — dark */}
      <div className="order-2 flex items-center bg-stone-900 px-12 py-20 lg:order-1 lg:px-20">
        <div className="max-w-md">
          <p className="mb-5 font-sans text-xs tracking-[0.35em] text-amber-500 uppercase">
            Savoir-faire
          </p>
          <h2 className="mb-6 font-serif text-4xl leading-tight font-light text-white lg:text-5xl">
            De la vigne
            <br />à la cave
          </h2>
          <p className="mb-10 font-sans text-base leading-relaxed text-stone-400">
            Ici, tout se fait à deux. Sébastien travaille la vigne et la cave, de la conduite du
            vignoble à la vinification, avec une attention constante portée à la qualité du raisin
            et à l’équilibre des vins. Pas à pas, avec exigence et engagement, nous construisons un
            domaine à taille humaine et des vins sincères, fidèles à nos terroirs.
          </p>

          <Link
            href="/savoir-faire"
            className="inline-flex items-center gap-2 font-sans text-sm tracking-[0.15em] text-amber-500 uppercase transition-all duration-300 hover:gap-4"
          >
            Notre philosophie
            <span className="text-base">→</span>
          </Link>
        </div>
      </div>

      {/* Image */}
      <div className="relative order-1 min-h-[400px] overflow-hidden lg:order-2 lg:min-h-0">
        <Image
          src="/images/savoir_home_page.jpg"
          alt="Travail à la cave du domaine"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
        />
      </div>
    </section>
  );
}
