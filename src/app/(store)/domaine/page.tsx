import { Metadata } from "next";
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
    text: "Nous plantons les premières vignes et lançons les travaux d’aménagement.",
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
          Nous avançons pas à pas, avec exigence et engagement, pour construire
          un domaine à taille humaine et donner naissance à des vins sincères,
          fidèles à nos terroirs.
        </p>
      </section>

      {/* Une aventure à deux */}
      <section id="equipe" className="grid lg:grid-cols-2 min-h-[500px]">
        <div className="relative overflow-hidden min-h-[360px]">
          <Image
            src="/images/domaine_projet_a_2.jpg"
            alt="Sébastien et Isabelle"
            fill
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex items-center bg-stone-50 px-12 py-16 lg:px-20">
          <div className="max-w-md">
            <p className="text-xs tracking-[0.35em] uppercase text-amber-700 font-sans mb-4">
              Une aventure à deux
            </p>
            <h2 className="font-serif text-3xl lg:text-4xl font-light text-stone-900 mb-6">
              Un projet porté à deux
            </h2>
            <div className="space-y-6 text-stone-500 font-sans leading-relaxed">
              <p>
                <span className="text-stone-900 font-medium">Sébastien</span>{" "}
                travaille dans la vigne et à la cave, de la conduite du vignoble
                à la vinification, avec une attention constante portée à la
                qualité du raisin et à l’équilibre des vins.
              </p>
              <p>
                De mon côté, je m’occupe du développement du domaine, de la
                partie administrative, commerciale et de l’accueil. Je participe
                également aux vinifications et je contribue à faire vivre le lien
                entre le domaine et ceux qui découvrent nos vins.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Terroir */}
      <section id="terroir" className="grid lg:grid-cols-2 min-h-[500px]">
        <div className="flex items-center bg-stone-50 px-12 py-16 lg:px-20 order-2 lg:order-1">
          <div className="max-w-md">
            <p
              className="text-xs tracking-[0.35em] uppercase text-amber-700 font-sans mb-4"
              id="terroir-label"
            >
              Nos terroirs
            </p>
            <h2 className="font-serif text-3xl lg:text-4xl font-light text-stone-900 mb-6">
              Une mosaïque
              <br />
              de parcelles
            </h2>
            <p className="text-stone-500 font-sans leading-relaxed mb-6">
              Nos 5,40 ha de vignes sont situés sur deux secteurs,
              Tavant/Sazilly et Cravant-les-Coteaux, au cœur de l’appellation
              Chinon. Plusieurs petites parcelles aux terroirs variés donnent
              toute leur richesse à nos vins.
            </p>
            <ul className="space-y-4">
              {SOLS.map((sol) => (
                <li key={sol.title}>
                  <span className="block font-serif text-lg text-stone-800">
                    {sol.title}
                  </span>
                  <span className="text-sm text-stone-500 font-sans leading-relaxed">
                    {sol.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="relative overflow-hidden min-h-[360px] order-1 lg:order-2">
          <Image
            src="/images/domaine_parcelle.jpg"
            alt="Vignes au cœur de l’appellation Chinon"
            fill
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Objectif 2030 */}
      <section id="engagement" className="grid lg:grid-cols-2 min-h-[500px]">
        <div className="relative overflow-hidden min-h-[360px]">
          {/* TODO: photo de jeunes vignes */}
          <Image
            src="/images/domaine_mouvement.jpg"
            alt="Jeunes vignes"
            fill
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex items-center bg-stone-900 px-12 py-16 lg:px-20">
          <div className="max-w-md">
            <p className="text-xs tracking-[0.35em] uppercase text-amber-500 font-sans mb-4">
              Objectif 2030
            </p>
            <h2 className="font-serif text-3xl lg:text-4xl font-light text-white mb-6">
              Un domaine
              <br />
              en mouvement
            </h2>
            <div className="space-y-4 text-stone-400 font-sans leading-relaxed">
              <p>
                Nos vins vont continuer de se construire et d’évoluer
                progressivement, au rythme de nos vignes et de nos terroirs.
              </p>
              <p>
                Nous travaillons aujourd’hui principalement le Cabernet Franc,
                mais le domaine s’inscrit dans une dynamique d’ouverture et de
                développement, guidée par l’envie de mieux valoriser la diversité
                de nos sols.
              </p>
              <p>
                Dans cette logique, nous allons très prochainement planter du
                Chenin sur des sols argilo-calcaires — un cépage qui accompagnera
                une nouvelle étape du domaine avec la création, à terme, d’une
                cuvée de vin blanc.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Histoire / timeline */}
      <section id="histoire" className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.35em] uppercase text-amber-700 font-sans mb-4">
            Histoire
          </p>
          <h2 className="font-serif text-4xl font-light text-stone-900">
            Les étapes du domaine
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {TIMELINE.map((step) => (
            <div key={step.year} className="text-center">
              <span
                className={`font-serif text-3xl font-light block mb-3 ${
                  step.highlight ? "text-amber-500" : "text-stone-300"
                }`}
              >
                {step.year}
              </span>
              <h3 className="font-serif text-lg text-stone-900 mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-stone-500 font-sans leading-relaxed">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}