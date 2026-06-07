import Link from "next/link";
import Image from "next/image";

export default function TerroirSection() {
  return (
    <section className="grid min-h-[600px] lg:grid-cols-2">
      {/* Image */}
      <div className="relative min-h-[400px] overflow-hidden lg:min-h-0">
        <Image
          src="/images/terroir_home_page.jpg"
          alt="Vignes au cœur de l’appellation Chinon"
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
            Une mosaïque
            <br />
            de parcelles
          </h2>
          <p className="mb-8 font-sans text-base leading-relaxed text-stone-500">
            Au cœur de l’appellation Chinon, nos 5,40 ha de vignes se répartissent en petites
            parcelles aux sols variés — sables et graviers, argilo-calcaires et terres alluviales en
            bord de Vienne. Cette mosaïque de terroirs, travaillée autour du Cabernet Franc, donne
            naissance à des vins aux expressions multiples, fidèles à l’identité de chaque lieu.
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
