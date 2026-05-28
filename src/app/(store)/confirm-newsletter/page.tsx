import { confirmNewsletterSubscription } from "@/app/actions/newsletter";
import Link from "next/link";

export const metadata = {
  title: "Confirmation newsletter — Domaine test",
  robots: { index: false },
};

export default async function ConfirmNewsletterPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (!token) {
    return <Result success={false} message="Lien de confirmation invalide." />;
  }

  const result = await confirmNewsletterSubscription(token);

  return (
    <Result
      success={result.success}
      message={
        result.success
          ? "Votre inscription est confirmée. Vous recevrez bientôt nos nouvelles !"
          : (result.error ?? "Une erreur est survenue.")
      }
    />
  );
}

function Result({ success, message }: { success: boolean; message: string }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-stone-50 px-6">
      <div className="w-full max-w-md py-24 text-center">
        <p className="mb-6 font-sans text-xs tracking-[0.35em] text-stone-400 uppercase">
          Newsletter
        </p>

        {success ? (
          <>
            <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
              <svg
                className="h-6 w-6 text-amber-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="mb-3 font-serif text-2xl font-light text-stone-900">
              Inscription confirmée
            </h1>
          </>
        ) : (
          <>
            <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-stone-100">
              <svg
                className="h-6 w-6 text-stone-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h1 className="mb-3 font-serif text-2xl font-light text-stone-900">Lien invalide</h1>
          </>
        )}

        <p className="mb-8 font-sans text-sm leading-relaxed text-stone-500">{message}</p>

        <Link
          href="/"
          className="font-sans text-xs tracking-[0.2em] text-amber-700 uppercase transition-colors hover:text-amber-600"
        >
          ← Retour au site
        </Link>
      </div>
    </main>
  );
}
