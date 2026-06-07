import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Savoir-faire — Domaine de la Rochette",
  description:
    "De la vigne à la bouteille, découvrez les méthodes de vinification du Domaine de la Rochette à Chinon.",
};

const STEPS = [
  {
    number: "01",
    title: "Vendanges manuelles",
    description:
      "Nous récoltons intégralement à la main, en plusieurs passages dans les vignes, pour sélectionner les grappes à leur parfaite maturité. Les vendangeurs trient au fur et à mesure, dans les rangs, pour ne garder que les meilleures baies.",
    image: "/images/vendanges_manuelles.jpg",
  },
  {
    number: "02",
    title: "Tri et pressurage",
    description:
      "Chaque récolte passe sur table de tri. Les raisins sont ensuite foulés doucement ou pressés selon les cuvées. Nous privilégions des pressions lentes, respectueuses du raisin, pour extraire le meilleur du fruit sans amertume.",
    image: "/images/tri_pressurage.jpg",
  },
  {
    number: "03",
    title: "Vinification en cuves",
    description:
      "Les fermentations se déroulent en cuves béton thermorégulées, à des températures maîtrisées. Nous pratiquons des remontages doux et des délestages ponctuels pour structurer les tanins sans les durcir.",
    image: "/images/vinification.jpg",
  },
  {
    number: "04",
    title: "Élevage en cave tuffeau",
    description:
      "Nos vins s'élèvent dans la cave creusée dans le tuffeau, à hygrométrie naturellement stable. Selon les cuvées : cuves inox pour préserver la fraîcheur, fûts de 228L ou demi-muids pour apporter structure et complexité.",
    image: "/images/cave.jpg",
  },
];

export default function SavoirFairePage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[450px] overflow-hidden">
        <Image
          src="/images/savoir_faire_hero.jpg"
          alt="Cave à vins"
          fill
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
          <p className="mb-4 font-sans text-xs tracking-[0.35em] text-stone-300 uppercase">
            Savoir-faire
          </p>
          <h1 className="font-serif text-5xl font-light lg:text-7xl">
            De la vigne
            <br />à la bouteille
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <p className="font-serif text-xl leading-relaxed font-light text-stone-600 lg:text-2xl">
          Ici, rien n'est laissé au hasard. Chaque geste, de la taille des vignes à la mise en
          bouteille, est pensé pour révéler ce que le terroir a de plus précieux à offrir.
        </p>
      </section>

      {/* Steps */}
      {STEPS.map((step, i) => (
        <section
          key={step.number}
          className={`grid min-h-[480px] lg:grid-cols-2 ${i % 2 === 0 ? "" : ""}`}
        >
          {/* Image */}
          <div
            className={`relative min-h-[320px] overflow-hidden ${i % 2 !== 0 ? "lg:order-2" : ""}`}
          >
            <Image src={step.image} alt={step.title} fill className="h-full w-full object-cover" />
          </div>

          {/* Text */}
          <div
            className={`flex items-center px-12 py-16 lg:px-20 ${
              i % 2 === 0 ? "bg-stone-50" : "bg-stone-900"
            } ${i % 2 !== 0 ? "lg:order-1" : ""}`}
          >
            <div className="max-w-md">
              <span
                className={`mb-4 block font-serif text-6xl font-light ${
                  i % 2 === 0 ? "text-stone-200" : "text-stone-700"
                }`}
              >
                {step.number}
              </span>
              <h2
                className={`mb-6 font-serif text-3xl font-light lg:text-4xl ${
                  i % 2 === 0 ? "text-stone-900" : "text-white"
                }`}
              >
                {step.title}
              </h2>
              <p
                className={`font-sans leading-relaxed ${
                  i % 2 === 0 ? "text-stone-500" : "text-stone-400"
                }`}
              >
                {step.description}
              </p>
            </div>
          </div>
        </section>
      ))}

      {/* Philosophy quote */}
      <section className="bg-amber-50 px-6 py-20 text-center">
        <blockquote className="mx-auto max-w-2xl">
          <p className="mb-6 font-serif text-2xl leading-relaxed font-light text-stone-800 italic lg:text-3xl">
            Un vin ne s'invente pas. Il se révèle, année après année, millésime après millésime, au
            fil des saisons et du soin apporté à chaque vigne.
          </p>
          <cite className="font-sans text-sm tracking-[0.2em] text-amber-700 uppercase not-italic">
            Sébastien Gaud, vigneron
          </cite>
        </blockquote>
      </section>
    </main>
  );
}
