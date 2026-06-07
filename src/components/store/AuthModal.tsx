"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient, signUp } from "@/lib/auth-client";
import { useAuthModal } from "@/hooks/useAuthModal";
import { toast } from "sonner";
import { Loader2, X, Wine, Eye, EyeOff } from "lucide-react";
import Image from "next/image";

export function AuthModal() {
  const { isOpen, view, close, setView } = useAuthModal();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  if (!isOpen) return null;

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const { error } = await authClient.signIn.email({
      email: fd.get("email") as string,
      password: fd.get("password") as string,
    });
    if (error) {
      toast.error(error.message ?? "Email ou mot de passe incorrect");
      setLoading(false);
      return;
    }
    toast.success("Connexion réussie !");
    close();
    router.refresh();
    setLoading(false);
  }

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const { error } = await signUp.email({
      name: fd.get("name") as string,
      email: fd.get("email") as string,
      password: fd.get("password") as string,
    });
    if (error) {
      toast.error(error.message ?? "Erreur lors de la création du compte");
      setLoading(false);
      return;
    }
    toast.success("Compte créé avec succès !");
    close();
    router.refresh();
    setLoading(false);
  }

  async function handleReset(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    await authClient.requestPasswordReset({
      email: fd.get("email") as string,
      redirectTo: "/reset-password/confirm",
    });
    setResetSent(true);
    setLoading(false);
  }

  async function handleGoogle() {
    try {
      setGoogleLoading(true);
      await authClient.signIn.social({ provider: "google", callbackURL: "/" });
    } catch {
      toast.error("Erreur avec Google");
      setGoogleLoading(false);
    }
  }

  const titles = {
    login: { heading: "Bienvenue", sub: "Accédez à votre espace" },
    register: { heading: "Rejoindre", sub: "Créez votre compte" },
    "reset-password": { heading: "Mot de passe", sub: "Réinitialisez votre accès" },
  };

  const { heading, sub } = titles[view];

  return (
    <>
      <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm" onClick={close} />

      <div className="fixed inset-0 z-[201] flex items-center justify-center px-4">
        <div
          className="relative w-full max-w-md overflow-hidden rounded-2xl bg-stone-50 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header décoratif */}
          <div className="relative overflow-hidden bg-stone-900 px-8 pt-8 pb-6">
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 right-0 h-64 w-64 translate-x-20 -translate-y-20 rounded-full border border-white" />
              <div className="absolute bottom-0 left-0 h-40 w-40 -translate-x-10 translate-y-10 rounded-full border border-white" />
            </div>

            <div className="mb-8 text-center brightness-0 invert">
              <Image
                src="/logo.png"
                alt="Domaine Gaud"
                width={439}
                height={267}
                className="mx-auto h-auto w-[180px]"
                priority
              />
              <p className="mb-1 pt-8 font-sans text-[10px] tracking-[0.3em] text-amber-500 uppercase">
                {sub}
              </p>
              <h2 className="font-serif text-3xl font-light text-white">{heading}</h2>
            </div>

            <button
              onClick={close}
              className="absolute top-4 right-4 p-1 text-stone-400 transition-colors hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Corps */}
          <div className="px-8 py-7">
            {view === "login" && (
              <form onSubmit={handleLogin} className="space-y-4">
                <Field label="Email" name="email" type="email" placeholder="vous@exemple.fr" />
                <Field
                  label="Mot de passe"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                />

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setView("reset-password")}
                    className="font-sans text-xs text-stone-400 transition-colors hover:text-amber-700"
                  >
                    Mot de passe oublié ?
                  </button>
                </div>

                <SubmitButton loading={loading}>Se connecter</SubmitButton>
                <Divider />
                <GoogleButton loading={googleLoading} onClick={handleGoogle} />

                <p className="pt-1 text-center font-sans text-xs text-stone-400">
                  Pas encore de compte ?{" "}
                  <button
                    type="button"
                    onClick={() => setView("register")}
                    className="font-medium text-amber-700 transition-colors hover:text-amber-800"
                  >
                    Créer un compte
                  </button>
                </p>
              </form>
            )}

            {view === "register" && (
              <form onSubmit={handleRegister} className="space-y-4">
                <Field label="Prénom et nom" name="name" type="text" placeholder="Jean Dupont" />
                <Field label="Email" name="email" type="email" placeholder="vous@exemple.fr" />
                <Field
                  label="Mot de passe"
                  name="password"
                  type="password"
                  placeholder="Minimum 8 caractères"
                  minLength={8}
                />

                <SubmitButton loading={loading}>Créer mon compte</SubmitButton>
                <Divider />
                <GoogleButton loading={googleLoading} onClick={handleGoogle} />

                <p className="pt-1 text-center font-sans text-xs text-stone-400">
                  Déjà un compte ?{" "}
                  <button
                    type="button"
                    onClick={() => setView("login")}
                    className="font-medium text-amber-700 transition-colors hover:text-amber-800"
                  >
                    Se connecter
                  </button>
                </p>
              </form>
            )}

            {view === "reset-password" && (
              <>
                {resetSent ? (
                  <div className="space-y-3 py-4 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
                      <Wine className="h-5 w-5 text-amber-700" />
                    </div>
                    <p className="font-serif text-lg text-stone-900">Email envoyé</p>
                    <p className="font-sans text-sm text-stone-500">
                      Vérifiez votre boîte mail et cliquez sur le lien reçu.
                    </p>
                    <button
                      onClick={() => {
                        setResetSent(false);
                        setView("login");
                      }}
                      className="font-sans text-xs font-medium text-amber-700 transition-colors hover:text-amber-800"
                    >
                      ← Retour à la connexion
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleReset} className="space-y-4">
                    <p className="font-sans text-sm text-stone-500">
                      Entrez votre email, nous vous enverrons un lien de réinitialisation.
                    </p>
                    <Field label="Email" name="email" type="email" placeholder="vous@exemple.fr" />
                    <SubmitButton loading={loading}>Envoyer le lien</SubmitButton>
                    <p className="text-center font-sans text-xs text-stone-400">
                      <button
                        type="button"
                        onClick={() => setView("login")}
                        className="font-medium text-amber-700 transition-colors hover:text-amber-800"
                      >
                        ← Retour à la connexion
                      </button>
                    </p>
                  </form>
                )}
              </>
            )}
          </div>

          <div className="px-8 pb-5">
            <p className="text-center font-sans text-[10px] text-stone-300">
              L&apos;abus d&apos;alcool est dangereux pour la santé. À consommer avec modération.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Sous-composants ─────────────────────────────────────

function Field({
  label,
  name,
  type,
  placeholder,
  minLength,
}: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  minLength?: number;
}) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";

  return (
    <div>
      <label className="mb-1.5 block font-sans text-[10px] tracking-[0.2em] text-stone-500 uppercase">
        {label}
      </label>
      <div className="relative">
        <input
          name={name}
          type={isPassword ? (show ? "text" : "password") : type}
          placeholder={placeholder}
          required
          minLength={minLength}
          className="w-full rounded-lg border border-stone-200 bg-white px-4 py-2.5 pr-10 font-sans text-sm text-stone-800 placeholder-stone-300 transition-colors focus:border-stone-400 focus:outline-none"
        />
        {isPassword && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShow((v) => !v)}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-stone-300 transition-colors hover:text-stone-500"
            aria-label={show ? "Masquer" : "Afficher"}
          >
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
      </div>
    </div>
  );
}

function SubmitButton({ loading, children }: { loading: boolean; children: React.ReactNode }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-stone-900 py-3 font-sans text-[11px] tracking-[0.25em] text-white uppercase transition-colors hover:bg-stone-700 disabled:opacity-50"
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : children}
    </button>
  );
}

function Divider() {
  return (
    <div className="relative my-4">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-stone-200" />
      </div>
      <div className="relative flex justify-center">
        <span className="bg-stone-50 px-3 font-sans text-[10px] tracking-widest text-stone-300 uppercase">
          ou
        </span>
      </div>
    </div>
  );
}

function GoogleButton({ loading, onClick }: { loading: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className="flex w-full items-center justify-center gap-3 rounded-lg border border-stone-200 bg-white py-2.5 font-sans text-sm text-stone-700 transition-colors hover:bg-stone-50 disabled:opacity-50"
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <svg className="h-4 w-4" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
      )}
      Continuer avec Google
    </button>
  );
}
