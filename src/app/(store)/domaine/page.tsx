import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Le Domaine Gaud, Chinon",
  description:
    "Découvrez l’histoire, le terroir et le projet du domaine Gaud, jeune domaine viticole au cœur de l’appellation Chinon.",
};

const TIMELINE = [
  {
    year: "1845",
    title: "Construction des bâtiments",
    text: "Les bâtiments en pierre qui abritent aujourd’hui le domaine sont édifiés.",
  },
  {
    year: "2022",
    title: "Achat des bâtiments",
    text: "Nous achetons les bâtiments et posons les premières bases du projet.",
  },
  {
    year: "2024",
    title: "Premières vignes & travaux",
    text: "Nous récupérons nos premières vignes et lançons les travaux d'aménagement",
  },
  {
    year: "2025",
    title: "Lancement administratif",
    text: "Nous créons officiellement le domaine et structurons l’activité.",
  },
  {
    year: "Juin 2026",
    title: "Inauguration",
    text: "Les 13 et 14 juin 2026, nous ouvrons officiellement nos portes.",
    highlight: true,
  },
];

const SOLS = [
  {
    title: "Sables et graviers",
    text: "Apportent de la fraîcheur, de la finesse et des vins sur le fruit.",
  },
  {
    title: "Argilo-calcaires",
    text: "Structurent les vins et leur donnent de la profondeur.",
  },
  {
    title: "Parcelles alluviales",
    text: "Situées en bord de Vienne, elles sont régulièrement enrichies par les crues hivernales, apportant une grande richesse naturelle aux sols.",
  },
];

export default function DomainePage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <Image
          src="/images/notre_histoire_hero.jpg"
          alt="Le domaine"
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
          Nous avançons pas à pas, avec exigence et engagement, pour construire un domaine à taille
          humaine et donner naissance à des vins sincères, fidèles à nos terroirs.
        </p>
      </section>

      {/* Une aventure à deux */}
      <section id="equipe" className="grid min-h-[500px] lg:grid-cols-2">
        <div className="relative min-h-[360px] overflow-hidden">
          <Image
            src="/images/domaine_projet_a_2.jpg"
            alt="Sébastien et Isabelle"
            fill
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex items-center bg-stone-50 px-12 py-16 lg:px-20">
          <div className="max-w-md">
            <p className="mb-4 font-sans text-xs tracking-[0.35em] text-amber-700 uppercase">
              Une aventure à deux
            </p>
            <h2 className="mb-6 font-serif text-3xl font-light text-stone-900 lg:text-4xl">
              Un projet porté à deux
            </h2>
            <div className="space-y-6 font-sans leading-relaxed text-stone-500">
              <p>
                <span className="font-medium text-stone-900">Sébastien</span> travaille dans la
                vigne et à la cave, de la conduite du vignoble à la vinification, avec une attention
                constante portée à la qualité du raisin et à l’équilibre des vins.
              </p>
              <p>
                <span className="font-medium text-stone-900">Isabelle</span> s’occupe du développement du domaine, de la partie administrative,
                commerciale et de l’accueil. Elle participe également aux vinifications et
                contribue à faire vivre le lien entre le domaine et ceux qui découvrent nos vins.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Terroir */}
      <section id="terroir" className="grid min-h-[500px] lg:grid-cols-2">
        <div className="order-2 flex items-center bg-stone-50 px-12 py-16 lg:order-1 lg:px-20">
          <div className="max-w-md">
            <p
              className="mb-4 font-sans text-xs tracking-[0.35em] text-amber-700 uppercase"
              id="terroir-label"
            >
              Nos terroirs
            </p>
            <h2 className="mb-6 font-serif text-3xl font-light text-stone-900 lg:text-4xl">
              Une mosaïque
              <br />
              de parcelles
            </h2>
            <p className="mb-6 font-sans leading-relaxed text-stone-500">
              Nos 5,40 ha de vignes sont situés sur deux secteurs, Tavant/Sazilly et
              Cravant-les-Coteaux, au cœur de l’appellation Chinon. Plusieurs petites parcelles aux
              terroirs variés donnent toute leur richesse à nos vins.
            </p>
            <ul className="space-y-4">
              {SOLS.map((sol) => (
                <li key={sol.title}>
                  <span className="block font-serif text-lg text-stone-800">{sol.title}</span>
                  <span className="font-sans text-sm leading-relaxed text-stone-500">
                    {sol.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="relative order-1 min-h-[360px] overflow-hidden lg:order-2">
          <Image
            src="/images/domaine_parcelle.jpg"
            alt="Vignes au cœur de l’appellation Chinon"
            fill
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      {/* Objectif 2030 */}
      <section id="engagement" className="grid min-h-[500px] lg:grid-cols-2">
        <div className="relative min-h-[360px] overflow-hidden">
          {/* TODO: photo de jeunes vignes */}
          <Image
            src="/images/domaine_mouvement.jpg"
            alt="Jeunes vignes"
            fill
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex items-center bg-stone-900 px-12 py-16 lg:px-20">
          <div className="max-w-md">
            <p className="mb-4 font-sans text-xs tracking-[0.35em] text-amber-500 uppercase">
              Objectif 2030
            </p>
            <h2 className="mb-6 font-serif text-3xl font-light text-white lg:text-4xl">
              Un domaine
              <br />
              en mouvement
            </h2>
            <div className="space-y-4 font-sans leading-relaxed text-stone-400">
              <p>
                Nos vins vont continuer de se construire et d’évoluer progressivement, au rythme de
                nos vignes et de nos terroirs.
              </p>
              <p>
                Nous travaillons aujourd’hui principalement le Cabernet Franc, mais le domaine
                s’inscrit dans une dynamique d’ouverture et de développement, guidée par l’envie de
                mieux valoriser la diversité de nos sols.
              </p>
              <p>
                Dans cette logique, nous allons très prochainement planter du Chenin sur des sols
                argilo-calcaires — un cépage qui accompagnera une nouvelle étape du domaine avec la
                création, à terme, d’une cuvée de vin blanc.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Histoire / timeline */}
      <section id="histoire" className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-16 text-center">
          <p className="mb-4 font-sans text-xs tracking-[0.35em] text-amber-700 uppercase">
            Histoire
          </p>
          <h2 className="font-serif text-4xl font-light text-stone-900">Les étapes du domaine</h2>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {TIMELINE.map((step) => (
            <div key={step.year} className="text-center">
              <span
                className={`mb-3 block font-serif text-3xl font-light ${
                  step.highlight ? "text-amber-500" : "text-stone-300"
                }`}
              >
                {step.year}
              </span>
              <h3 className="mb-2 font-serif text-lg text-stone-900">{step.title}</h3>
              <p className="font-sans text-sm leading-relaxed text-stone-500">{step.text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
