// src/app/(auth)/reset-password/confirm/page.tsx
"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

function ConfirmContent() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;
    const confirm = formData.get("confirm") as string;

    if (password !== confirm) {
      toast.error("Les mots de passe ne correspondent pas");
      setLoading(false);
      return;
    }

    const { error } = await authClient.resetPassword({
      newPassword: password,
      token: token ?? "",
    });

    if (error) {
      toast.error("Lien invalide ou expiré");
      setLoading(false);
      return;
    }

    toast.success("Mot de passe mis à jour !");
    router.push("/login");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border bg-white p-8 shadow-sm">
          <h1 className="text-xl font-semibold text-neutral-900">Nouveau mot de passe</h1>
          <p className="mt-2 text-sm text-neutral-500">
            Choisissez un nouveau mot de passe sécurisé.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <Label htmlFor="password">Nouveau mot de passe</Label>
              <PasswordInput
                id="password"
                name="password"
                placeholder="Minimum 8 caractères"
                minLength={8}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="confirm">Confirmer le mot de passe</Label>
              <PasswordInput
                id="confirm"
                name="confirm"
                placeholder="Répétez le mot de passe"
                minLength={8}
                required
                className="mt-1"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Mise à jour...
                </>
              ) : (
                "Mettre à jour le mot de passe"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmResetPasswordPage() {
  return (
    <Suspense>
      <ConfirmContent />
    </Suspense>
  );
}
