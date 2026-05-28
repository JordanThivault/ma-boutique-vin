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
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
          <p className="mb-4 font-sans text-xs tracking-[0.35em] text-stone-300 uppercase">
            Le domaine
          </p>
          <h1 className="font-serif text-5xl font-light lg:text-7xl">Notre histoire</h1>
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <p className="font-serif text-2xl leading-relaxed font-light text-stone-700 lg:text-3xl">
          Depuis trois générations, le Domaine de la Rochette cultive une vision simple : exprimer,
          sans artifice, la vérité de notre terroir chinonais.
        </p>
      </section>

      {/* Terroir section */}
      <section id="terroir" className="grid min-h-[500px] lg:grid-cols-2">
        <div className="relative min-h-[360px] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=900&q=80"
            alt="Vignes sur les coteaux"
            fill
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex items-center bg-stone-50 px-12 py-16 lg:px-20">
          <div className="max-w-md">
            <p
              className="mb-4 font-sans text-xs tracking-[0.35em] text-amber-700 uppercase"
              id="terroir-label"
            >
              Terroir
            </p>
            <h2 className="mb-6 font-serif text-3xl font-light text-stone-900 lg:text-4xl">
              Le tuffeau,
              <br />
              pierre de Chinon
            </h2>
            <p className="font-sans leading-relaxed text-stone-500">
              Entre Loire et coteaux, nos 14 hectares s enracinent dans le tuffeau, cette roche
              calcaire tendre et poreuse qui confère à nos Cabernet Franc une minéralité
              caractéristique. L alliance du sol argilo-calcaire en plateau et des graves en bord de
              Vienne crée une diversité de styles unique dans notre appellation.
            </p>
          </div>
        </div>
      </section>

      {/* Engagement section */}
      <section id="engagement" className="grid min-h-[500px] lg:grid-cols-2">
        <div className="order-2 flex items-center bg-stone-900 px-12 py-16 lg:order-1 lg:px-20">
          <div className="max-w-md">
            <p className="mb-4 font-sans text-xs tracking-[0.35em] text-amber-500 uppercase">
              Notre engagement
            </p>
            <h2 className="mb-6 font-serif text-3xl font-light text-white lg:text-4xl">
              Culture raisonnée,
              <br />
              respect de la vie
            </h2>
            <p className="font-sans leading-relaxed text-stone-400">
              En conversion vers la biodynamie depuis 2020, nous renonçons aux herbicides et
              réduisons drastiquement les intrants. Nos sols enherbés accueillent une biodiversité
              précieuse. Chaque décision viticole est guidée par le long terme, la santé de la vigne
              et la qualité intrinsèque du raisin.
            </p>
          </div>
        </div>
        <div className="relative order-1 min-h-[360px] overflow-hidden lg:order-2">
          <Image
            src="https://images.unsplash.com/photo-1543418219-44e30b057fea?w=900&q=80"
            alt="Travail dans les vignes"
            fill
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      {/* Histoire */}
      <section id="histoire" className="mx-auto max-w-4xl px-6 py-24">
        <div className="mb-16 text-center">
          <p className="mb-4 font-sans text-xs tracking-[0.35em] text-amber-700 uppercase">
            Histoire
          </p>
          <h2 className="font-serif text-4xl font-light text-stone-900">
            Trois générations de passion
          </h2>
        </div>

        <div className="grid gap-12 text-center md:grid-cols-3">
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
              <span className="mb-3 font-serif text-4xl text-amber-700">{item.year}</span>
              <h3 className="mb-3 font-sans text-sm tracking-[0.15em] text-stone-900 uppercase">
                {item.title}
              </h3>
              <p className="font-sans text-sm leading-relaxed text-stone-500">{item.text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
