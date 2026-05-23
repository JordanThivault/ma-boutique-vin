"use client";

import { useState } from "react";
import { subscribeToNewsletter } from "@/app/actions/newsletter-reservations";

export default function NewsletterBanner() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || !consent) return;
    setStatus("loading");

    const result = await subscribeToNewsletter(email, consent);
    if (result.success) {
      setStatus("success");
      setMessage("Un email de confirmation vous a été envoyé. Cliquez sur le lien pour finaliser votre inscription.");
      setEmail("");
      setConsent(false);
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
          <div className="max-w-md mx-auto">
            <div className="w-10 h-10 rounded-full bg-amber-700/20 flex items-center justify-center mx-auto mb-4">
              <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-amber-400 font-sans text-sm tracking-wide leading-relaxed">
              {message}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
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
                disabled={status === "loading" || !consent}
                className="px-8 py-3 bg-amber-700 text-white text-sm font-sans tracking-[0.15em] uppercase hover:bg-amber-600 transition-colors disabled:opacity-50 whitespace-nowrap"
              >
                {status === "loading" ? "..." : "S'inscrire"}
              </button>
            </div>

            <label className="flex items-start gap-3 text-left cursor-pointer group">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                required
                className="mt-0.5 h-4 w-4 shrink-0 accent-amber-600 cursor-pointer"
              />
              <span className="text-xs text-stone-400 font-sans leading-relaxed group-hover:text-stone-300 transition-colors">
                J'accepte de recevoir la newsletter du Domaine de la Rochette. Je peux me désinscrire
                à tout moment via le lien présent dans chaque email.{" "}
                <a href="/confidentialite" className="underline hover:text-stone-200 transition-colors">
                  Politique de confidentialité
                </a>
                .
              </span>
            </label>
          </form>
        )}

        {status === "error" && (
          <p className="text-red-400 font-sans text-xs mt-3">{message}</p>
        )}
      </div>
    </section>
  );
}
