import Link from "next/link";
import Image from "next/image";

export default function TerroirSection() {
  return (
    <section className="grid lg:grid-cols-2 min-h-[600px]">
      {/* Image */}
      <div className="relative overflow-hidden min-h-[400px] lg:min-h-0">
        <Image
          src="/images/terroir_home_page.jpg"
          alt="Vignes au cœur de l’appellation Chinon"
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
            Une mosaïque
            <br />
            de parcelles
          </h2>
          <p className="text-stone-500 font-sans leading-relaxed text-base mb-8">
            Au cœur de l’appellation Chinon, nos 5,40 ha de vignes se répartissent
            en petites parcelles aux sols variés — sables et graviers,
            argilo-calcaires et terres alluviales en bord de Vienne. Cette
            mosaïque de terroirs, travaillée autour du Cabernet Franc, donne
            naissance à des vins aux expressions multiples, fidèles à l’identité
            de chaque lieu.
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