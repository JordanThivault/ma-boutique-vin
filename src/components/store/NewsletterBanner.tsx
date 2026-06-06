"use client";

import { useState } from "react";
import { subscribeToNewsletter } from "@/app/actions/newsletter";

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
      setMessage(
        "Un email de confirmation vous a été envoyé. Cliquez sur le lien pour finaliser votre inscription."
      );
      setEmail("");
      setConsent(false);
    } else {
      setStatus("error");
      setMessage(result.error ?? "Une erreur est survenue.");
    }
  }

  return (
    <section className="bg-stone-900 px-6 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="mb-4 font-sans text-xs tracking-[0.35em] text-amber-500 uppercase">
          Newsletter
        </p>
        <h2 className="mb-3 font-serif text-3xl font-light text-white lg:text-4xl">
          Recevez les nouvelles du domaine
        </h2>
        <p className="mb-10 font-sans text-sm text-stone-400">
          Millésimes, vendanges, événements — les nouvelles du domaine directement dans votre boîte.
        </p>

        {status === "success" ? (
          <div className="mx-auto max-w-md">
            <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-amber-700/20">
              <svg
                className="h-5 w-5 text-amber-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <p className="font-sans text-sm leading-relaxed tracking-wide text-amber-400">
              {message}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre e-mail"
                required
                className="flex-1 border border-stone-600 bg-transparent px-5 py-3 font-sans text-sm text-white placeholder-stone-500 transition-colors focus:border-stone-400 focus:outline-none"
              />
              <button
                type="submit"
                disabled={status === "loading" || !consent}
                className="bg-amber-700 px-8 py-3 font-sans text-sm tracking-[0.15em] whitespace-nowrap text-white uppercase transition-colors hover:bg-amber-600 disabled:opacity-50"
              >
                {status === "loading" ? "..." : "S'inscrire"}
              </button>
            </div>

            <label className="group flex cursor-pointer items-start gap-3 text-left">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                required
                className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-amber-600"
              />
              <span className="font-sans text-xs leading-relaxed text-stone-400 transition-colors group-hover:text-stone-300">
                J'accepte de recevoir la newsletter du Domaine Gaud. Je peux me
                désinscrire à tout moment via le lien présent dans chaque email.{" "}
                <a
                  href="/confidentialite"
                  className="underline transition-colors hover:text-stone-200"
                >
                  Politique de confidentialité
                </a>
                .
              </span>
            </label>
          </form>
        )}

        {status === "error" && <p className="mt-3 font-sans text-xs text-red-400">{message}</p>}
      </div>
    </section>
  );
}
