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
    image: "https://images.unsplash.com/photo-1543418219-44e30b057fea?w=800&q=80",
  },
  {
    number: "02",
    title: "Tri et pressurage",
    description:
      "Chaque récolte passe sur table de tri. Les raisins sont ensuite foulés doucement ou pressés selon les cuvées. Nous privilégions des pressions lentes, respectueuses du raisin, pour extraire le meilleur du fruit sans amertume.",
    image: "https://images.unsplash.com/photo-1605673349582-03eb37bc7bb5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByZXNzYWdlJTIwdmlufGVufDB8fDB8fHwy",
  },
  {
    number: "03",
    title: "Vinification en cuves",
    description:
      "Les fermentations se déroulent en cuves béton thermorégulées, à des températures maîtrisées. Nous pratiquons des remontages doux et des délestages ponctuels pour structurer les tanins sans les durcir.",
    image: "https://images.unsplash.com/photo-1605673393348-ea896a63541f?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    number: "04",
    title: "Élevage en cave tuffeau",
    description:
      "Nos vins s'élèvent dans la cave creusée dans le tuffeau, à hygrométrie naturellement stable. Selon les cuvées : cuves inox pour préserver la fraîcheur, fûts de 228L ou demi-muids pour apporter structure et complexité.",
    image: "https://images.unsplash.com/photo-1568213816046-0ee1c42bd559?w=800&q=80",
  },
];

export default function SavoirFairePage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[450px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1504279577054-acfeccf8fc52?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Cave à vins"
          fill
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
          <p className="text-xs tracking-[0.35em] uppercase text-stone-300 font-sans mb-4">
            Savoir-faire
          </p>
          <h1 className="font-serif text-5xl lg:text-7xl font-light">
            De la vigne
            <br />
            à la bouteille
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <p className="font-serif text-xl lg:text-2xl font-light text-stone-600 leading-relaxed">
          Ici, rien n est laissé au hasard. Chaque geste, de la taille des
          vignes à la mise en bouteille, est pensé pour révéler ce que le
          terroir a de plus précieux à offrir.
        </p>
      </section>

      {/* Steps */}
      {STEPS.map((step, i) => (
        <section
          key={step.number}
          className={`grid lg:grid-cols-2 min-h-[480px] ${i % 2 === 0 ? "" : ""}`}
        >
          {/* Image */}
          <div
            className={`relative overflow-hidden min-h-[320px] ${
              i % 2 !== 0 ? "lg:order-2" : ""
            }`}
          >
            <Image
              src={step.image}
              alt={step.title}
              fill
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text */}
          <div
            className={`flex items-center px-12 py-16 lg:px-20 ${
              i % 2 === 0 ? "bg-stone-50" : "bg-stone-900"
            } ${i % 2 !== 0 ? "lg:order-1" : ""}`}
          >
            <div className="max-w-md">
              <span
                className={`font-serif text-6xl font-light mb-4 block ${
                  i % 2 === 0 ? "text-stone-200" : "text-stone-700"
                }`}
              >
                {step.number}
              </span>
              <h2
                className={`font-serif text-3xl lg:text-4xl font-light mb-6 ${
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
        <blockquote className="max-w-2xl mx-auto">
          <p className="font-serif text-2xl lg:text-3xl font-light text-stone-800 italic leading-relaxed mb-6">
            Un vin ne s invente pas. Il se révèle, année après année,
            millésime après millésime, au fil des saisons et du soin apporté
            à chaque vigne.
          </p>
          <cite className="text-sm tracking-[0.2em] uppercase text-amber-700 font-sans not-italic">
            Marie Mercier, vigneronne
          </cite>
        </blockquote>
      </section>
    </main>
  );
}
