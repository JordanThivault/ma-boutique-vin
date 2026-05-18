"use client";

import { useState } from "react";
import { submitReservation } from "@/app/actions/newsletter-reservations";

interface Experience {
  id: string;
  title: string;
  type: string;
}

interface ReservationFormProps {
  experiences?: Experience[];
}

export default function ReservationForm({ experiences = [] }: ReservationFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    const result = await submitReservation({
      nom: formData.get("nom") as string,
      email: formData.get("email") as string,
      telephone: formData.get("telephone") as string,
      experience: formData.get("experience") as string,
      date: formData.get("date") as string,
      message: formData.get("message") as string,
    });

    if (result.success) {
      setStatus("success");
    } else {
      setStatus("error");
      setErrorMsg(result.error ?? "Une erreur est survenue.");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-6">
          <svg width="28" height="28" fill="none" stroke="#b45309" viewBox="0 0 24 24">
            <path d="M20 6L9 17l-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="font-serif text-2xl font-light text-stone-900 mb-2">
          Demande envoyée
        </h3>
        <p className="text-stone-500 font-sans text-sm">
          Nous vous répondrons dans les 24h pour confirmer votre réservation.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="nom" className="block text-xs tracking-[0.2em] uppercase text-stone-500 font-sans mb-2">
            Nom complet *
          </label>
          <input
            id="nom"
            name="nom"
            type="text"
            required
            placeholder="Marie Dupont"
            className="w-full border border-stone-300 px-4 py-3 text-sm font-sans text-stone-800 placeholder-stone-300 focus:outline-none focus:border-stone-500 bg-white transition-colors"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-xs tracking-[0.2em] uppercase text-stone-500 font-sans mb-2">
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="marie@exemple.fr"
            className="w-full border border-stone-300 px-4 py-3 text-sm font-sans text-stone-800 placeholder-stone-300 focus:outline-none focus:border-stone-500 bg-white transition-colors"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="telephone" className="block text-xs tracking-[0.2em] uppercase text-stone-500 font-sans mb-2">
            Téléphone
          </label>
          <input
            id="telephone"
            name="telephone"
            type="tel"
            placeholder="06 12 34 56 78"
            className="w-full border border-stone-300 px-4 py-3 text-sm font-sans text-stone-800 placeholder-stone-300 focus:outline-none focus:border-stone-500 bg-white transition-colors"
          />
        </div>
        <div>
          <label htmlFor="date" className="block text-xs tracking-[0.2em] uppercase text-stone-500 font-sans mb-2">
            Date souhaitée *
          </label>
          <input
            id="date"
            name="date"
            type="date"
            required
            className="w-full border border-stone-300 px-4 py-3 text-sm font-sans text-stone-800 focus:outline-none focus:border-stone-500 bg-white transition-colors"
          />
        </div>
      </div>

      <div>
        <label htmlFor="experience" className="block text-xs tracking-[0.2em] uppercase text-stone-500 font-sans mb-2">
          Expérience souhaitée *
        </label>
        <select
          id="experience"
          name="experience"
          required
          className="w-full border border-stone-300 px-4 py-3 text-sm font-sans text-stone-800 focus:outline-none focus:border-stone-500 bg-white transition-colors appearance-none"
        >
          <option value="">Choisir une expérience</option>
          {experiences.length > 0 ? (
            experiences.map((exp) => (
              <option key={exp.id} value={exp.title}>
                {exp.title}
              </option>
            ))
          ) : (
            <>
              <option value="Dégustation">Dégustation guidée</option>
              <option value="Visite">Visite du domaine</option>
              <option value="Événement">Événement / Privatisation</option>
            </>
          )}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-xs tracking-[0.2em] uppercase text-stone-500 font-sans mb-2">
          Message (optionnel)
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Nombre de personnes, occasion particulière, questions..."
          className="w-full border border-stone-300 px-4 py-3 text-sm font-sans text-stone-800 placeholder-stone-300 focus:outline-none focus:border-stone-500 bg-white transition-colors resize-none"
        />
      </div>

      {status === "error" && (
        <p className="text-red-600 text-sm font-sans">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-4 bg-stone-900 text-white text-sm font-sans tracking-[0.2em] uppercase hover:bg-stone-700 transition-colors disabled:opacity-50"
      >
        {status === "loading" ? "Envoi en cours..." : "Envoyer ma demande"}
      </button>

      <p className="text-xs text-stone-400 font-sans text-center">
        * Champs obligatoires. Nous ne partageons pas vos données.
      </p>
    </form>
  );
}
