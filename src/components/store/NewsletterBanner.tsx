"use client";

import { useState } from "react";
import { subscribeToNewsletter } from "@/app/actions/newsletter-reservations";

export default function NewsletterBanner() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");

    const result = await subscribeToNewsletter(email);
    if (result.success) {
      setStatus("success");
      setMessage("Merci ! Vous recevrez bientôt nos nouvelles.");
      setEmail("");
    } else {
      setStatus("error");
      setMessage(result.error ?? "Une erreur est survenue.");
    }
  }

  return (
    <section className="bg-stone-900 py-20 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-xs tracking-[0.35em] uppercase text-amber-500 font-sans mb-4">
          Newsletter
        </p>
        <h2 className="font-serif text-3xl lg:text-4xl font-light text-white mb-3">
          Recevez les nouvelles du domaine
        </h2>
        <p className="text-stone-400 font-sans text-sm mb-10">
          Millésimes, vendanges, événements — les nouvelles du domaine directement dans votre boîte.
        </p>

        {status === "success" ? (
          <p className="text-amber-400 font-sans text-sm tracking-wide">{message}</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre e-mail"
              required
              className="flex-1 bg-transparent border border-stone-600 text-white placeholder-stone-500 px-5 py-3 text-sm font-sans focus:outline-none focus:border-stone-400 transition-colors"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-8 py-3 bg-amber-700 text-white text-sm font-sans tracking-[0.15em] uppercase hover:bg-amber-600 transition-colors disabled:opacity-50 whitespace-nowrap"
            >
              {status === "loading" ? "..." : "S'inscrire"}
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="text-red-400 font-sans text-xs mt-3">{message}</p>
        )}
      </div>
    </section>
  );
}
