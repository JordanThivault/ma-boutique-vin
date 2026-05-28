"use client";

import { useState } from "react";
import { submitReservation } from "@/app/actions/reservations";

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
      <div className="py-12 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
          <svg width="28" height="28" fill="none" stroke="#b45309" viewBox="0 0 24 24">
            <path
              d="M20 6L9 17l-5-5"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 className="mb-2 font-serif text-2xl font-light text-stone-900">Demande envoyée</h3>
        <p className="font-sans text-sm text-stone-500">
          Nous vous répondrons dans les 24h pour confirmer votre réservation.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="nom"
            className="mb-2 block font-sans text-xs tracking-[0.2em] text-stone-500 uppercase"
          >
            Nom complet *
          </label>
          <input
            id="nom"
            name="nom"
            type="text"
            required
            placeholder="Marie Dupont"
            className="w-full border border-stone-300 bg-white px-4 py-3 font-sans text-sm text-stone-800 placeholder-stone-300 transition-colors focus:border-stone-500 focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="mb-2 block font-sans text-xs tracking-[0.2em] text-stone-500 uppercase"
          >
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="marie@exemple.fr"
            className="w-full border border-stone-300 bg-white px-4 py-3 font-sans text-sm text-stone-800 placeholder-stone-300 transition-colors focus:border-stone-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="telephone"
            className="mb-2 block font-sans text-xs tracking-[0.2em] text-stone-500 uppercase"
          >
            Téléphone
          </label>
          <input
            id="telephone"
            name="telephone"
            type="tel"
            placeholder="06 12 34 56 78"
            className="w-full border border-stone-300 bg-white px-4 py-3 font-sans text-sm text-stone-800 placeholder-stone-300 transition-colors focus:border-stone-500 focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="date"
            className="mb-2 block font-sans text-xs tracking-[0.2em] text-stone-500 uppercase"
          >
            Date souhaitée *
          </label>
          <input
            id="date"
            name="date"
            type="date"
            required
            className="w-full border border-stone-300 bg-white px-4 py-3 font-sans text-sm text-stone-800 transition-colors focus:border-stone-500 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="experience"
          className="mb-2 block font-sans text-xs tracking-[0.2em] text-stone-500 uppercase"
        >
          Expérience souhaitée *
        </label>
        <select
          id="experience"
          name="experience"
          required
          className="w-full appearance-none border border-stone-300 bg-white px-4 py-3 font-sans text-sm text-stone-800 transition-colors focus:border-stone-500 focus:outline-none"
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
        <label
          htmlFor="message"
          className="mb-2 block font-sans text-xs tracking-[0.2em] text-stone-500 uppercase"
        >
          Message (optionnel)
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Nombre de personnes, occasion particulière, questions..."
          className="w-full resize-none border border-stone-300 bg-white px-4 py-3 font-sans text-sm text-stone-800 placeholder-stone-300 transition-colors focus:border-stone-500 focus:outline-none"
        />
      </div>

      {status === "error" && <p className="font-sans text-sm text-red-600">{errorMsg}</p>}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-stone-900 py-4 font-sans text-sm tracking-[0.2em] text-white uppercase transition-colors hover:bg-stone-700 disabled:opacity-50"
      >
        {status === "loading" ? "Envoi en cours..." : "Envoyer ma demande"}
      </button>

      <p className="text-center font-sans text-xs text-stone-400">
        * Champs obligatoires. Nous ne partageons pas vos données.
      </p>
    </form>
  );
}
