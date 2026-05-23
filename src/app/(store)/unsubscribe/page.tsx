import { unsubscribeNewsletter } from "@/app/actions/newsletter";
import Link from "next/link";

export const metadata = {
  title: "Désinscription newsletter — Domaine de la Rochette",
  robots: { index: false },
};

export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (!token) {
    return <UnsubscribeResult success={false} message="Lien de désinscription invalide." />;
  }

  const result = await unsubscribeNewsletter(token);

  return (
    <UnsubscribeResult
      success={result.success}
      message={
        result.success
          ? "Vous avez bien été désinscrit(e) de notre newsletter."
          : (result.error ?? "Une erreur est survenue.")
      }
    />
  );
}

function UnsubscribeResult({
  success,
  message,
}: {
  success: boolean;
  message: string;
}) {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-stone-50">
      <div className="max-w-md w-full text-center py-24">
        <p className="text-xs tracking-[0.35em] uppercase text-stone-400 font-sans mb-6">
          Newsletter
        </p>

        {success ? (
          <>
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-6">
              <svg className="w-6 h-6 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="font-serif text-2xl font-light text-stone-900 mb-3">
              Désinscription confirmée
            </h1>
            <p className="text-stone-500 font-sans text-sm leading-relaxed mb-8">
              {message}
            </p>
          </>
        ) : (
          <>
            <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-6">
              <svg className="w-6 h-6 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="font-serif text-2xl font-light text-stone-900 mb-3">
              Lien invalide
            </h1>
            <p className="text-stone-500 font-sans text-sm leading-relaxed mb-8">
              {message}
            </p>
          </>
        )}

        <Link
          href="/"
          className="text-xs tracking-[0.2em] uppercase text-amber-700 hover:text-amber-600 font-sans transition-colors"
        >
          ← Retour au site
        </Link>
      </div>
    </main>
  );
}
