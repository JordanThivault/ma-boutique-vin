"use client";

import { useState } from "react";
import { submitContact } from "@/app/actions/contact";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    const result = await submitContact({
      nom: formData.get("nom") as string,
      email: formData.get("email") as string,
      sujet: formData.get("sujet") as string,
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
        <h3 className="mb-2 font-serif text-2xl font-light text-stone-900">Message envoyé</h3>
        <p className="font-sans text-sm text-stone-500">
          Nous vous répondrons dans les plus brefs délais.
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

      <div>
        <label
          htmlFor="sujet"
          className="mb-2 block font-sans text-xs tracking-[0.2em] text-stone-500 uppercase"
        >
          Sujet
        </label>
        <input
          id="sujet"
          name="sujet"
          type="text"
          placeholder="Dégustation, commande, question..."
          className="w-full border border-stone-300 bg-white px-4 py-3 font-sans text-sm text-stone-800 placeholder-stone-300 transition-colors focus:border-stone-500 focus:outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-2 block font-sans text-xs tracking-[0.2em] text-stone-500 uppercase"
        >
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Votre message..."
          className="w-full resize-none border border-stone-300 bg-white px-4 py-3 font-sans text-sm text-stone-800 placeholder-stone-300 transition-colors focus:border-stone-500 focus:outline-none"
        />
      </div>

      {status === "error" && <p className="font-sans text-sm text-red-600">{errorMsg}</p>}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-stone-900 py-4 font-sans text-sm tracking-[0.2em] text-white uppercase transition-colors hover:bg-stone-700 disabled:opacity-50"
      >
        {status === "loading" ? "Envoi en cours..." : "Envoyer mon message"}
      </button>

      <p className="text-center font-sans text-xs text-stone-400">
        * Champs obligatoires. Nous ne partageons pas vos données.
      </p>
    </form>
  );
}