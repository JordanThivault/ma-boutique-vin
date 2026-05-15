import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Le Domaine — Domaine de la Rochette, Chinon",
  description:
    "Découvrez l'histoire et le terroir du Domaine de la Rochette, ancré dans les coteaux de Chinon depuis plusieurs générations.",
};

export default function DomainePage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1600&q=80"
          alt="Vue aérienne du domaine"
          fill
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
          <p className="text-xs tracking-[0.35em] uppercase text-stone-300 font-sans mb-4">
            Le domaine
          </p>
          <h1 className="font-serif text-5xl lg:text-7xl font-light">
            Notre histoire
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <p className="font-serif text-2xl lg:text-3xl font-light text-stone-700 leading-relaxed">
          Depuis trois générations, le Domaine de la Rochette cultive une vision
          simple : exprimer, sans artifice, la vérité de notre terroir chinonais.
        </p>
      </section>

      {/* Terroir section */}
      <section id="terroir" className="grid lg:grid-cols-2 min-h-[500px]">
        <div className="relative overflow-hidden min-h-[360px]">
          <Image
            src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=900&q=80"
            alt="Vignes sur les coteaux"
            fill
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex items-center bg-stone-50 px-12 py-16 lg:px-20">
          <div className="max-w-md">
            <p className="text-xs tracking-[0.35em] uppercase text-amber-700 font-sans mb-4" id="terroir-label">
              Terroir
            </p>
            <h2 className="font-serif text-3xl lg:text-4xl font-light text-stone-900 mb-6">
              Le tuffeau,
              <br />
              pierre de Chinon
            </h2>
            <p className="text-stone-500 font-sans leading-relaxed">
              Entre Loire et coteaux, nos 14 hectares s enracinent dans le
              tuffeau, cette roche calcaire tendre et poreuse qui confère à nos
              Cabernet Franc une minéralité caractéristique. L alliance du sol
              argilo-calcaire en plateau et des graves en bord de Vienne crée
              une diversité de styles unique dans notre appellation.
            </p>
          </div>
        </div>
      </section>

      {/* Engagement section */}
      <section id="engagement" className="grid lg:grid-cols-2 min-h-[500px]">
        <div className="flex items-center bg-stone-900 px-12 py-16 lg:px-20 order-2 lg:order-1">
          <div className="max-w-md">
            <p className="text-xs tracking-[0.35em] uppercase text-amber-500 font-sans mb-4">
              Notre engagement
            </p>
            <h2 className="font-serif text-3xl lg:text-4xl font-light text-white mb-6">
              Culture raisonnée,
              <br />
              respect de la vie
            </h2>
            <p className="text-stone-400 font-sans leading-relaxed">
              En conversion vers la biodynamie depuis 2020, nous renonçons aux
              herbicides et réduisons drastiquement les intrants. Nos sols
              enherbés accueillent une biodiversité précieuse. Chaque décision
              viticole est guidée par le long terme, la santé de la vigne et la
              qualité intrinsèque du raisin.
            </p>
          </div>
        </div>
        <div className="relative overflow-hidden min-h-[360px] order-1 lg:order-2">
          <Image
            src="https://images.unsplash.com/photo-1543418219-44e30b057fea?w=900&q=80"
            alt="Travail dans les vignes"
            fill
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Histoire */}
      <section id="histoire" className="max-w-4xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.35em] uppercase text-amber-700 font-sans mb-4">
            Histoire
          </p>
          <h2 className="font-serif text-4xl font-light text-stone-900">
            Trois générations de passion
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12 text-center">
          {[
            {
              year: "1962",
              title: "La fondation",
              text: "Henri Mercier plante les premières vignes sur les coteaux de tuffeau, au-dessus de la Vienne.",
            },
            {
              year: "1988",
              title: "L'expansion",
              text: "Pierre Mercier agrandit le domaine et construit la cave taillée dans le tuffeau, idéale pour l'élevage.",
            },
            {
              year: "2012",
              title: "La transmission",
              text: "Marie Mercier reprend le domaine et engage la transition vers des pratiques plus respectueuses de l'environnement.",
            },
          ].map((item) => (
            <div key={item.year} className="flex flex-col items-center">
              <span className="font-serif text-4xl text-amber-700 mb-3">{item.year}</span>
              <h3 className="font-sans text-sm tracking-[0.15em] uppercase text-stone-900 mb-3">
                {item.title}
              </h3>
              <p className="text-stone-500 font-sans text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
