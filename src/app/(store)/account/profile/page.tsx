// src/app/(store)/account/profile/page.tsx
"use client";

import { useState } from "react";
import { useSession, authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, User, Mail, Lock } from "lucide-react";
import { redirect } from "next/navigation";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const [loadingName, setLoadingName] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);

  if (isPending) return null;
  if (!session) redirect("/login");

  async function handleUpdateName(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoadingName(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;

    const { error } = await authClient.updateUser({ name });

    if (error) {
      toast.error("Erreur lors de la mise à jour");
    } else {
      toast.success("Nom mis à jour !");
    }

    setLoadingName(false);
  }

  async function handleUpdatePassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoadingPassword(true);

    const formData = new FormData(e.currentTarget);
    const currentPassword = formData.get("currentPassword") as string;
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (newPassword !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      setLoadingPassword(false);
      return;
    }

    const { error } = await authClient.changePassword({
      currentPassword,
      newPassword,
      revokeOtherSessions: false,
    });

    if (error) {
      toast.error(error.message ?? "Mot de passe actuel incorrect");
    } else {
      toast.success("Mot de passe mis à jour !");
      (e.target as HTMLFormElement).reset();
    }

    setLoadingPassword(false);
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900">Mon profil</h1>
        <p className="mt-1 text-neutral-500">
          Gérez vos informations personnelles
        </p>
      </div>

      <div className="space-y-6">

        {/* Infos compte */}
        <div className="rounded-2xl border bg-white p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100">
              <User className="h-5 w-5 text-neutral-600" />
            </div>
            <div>
              <p className="font-medium text-neutral-900">
                {session.user.name}
              </p>
              <p className="text-sm text-neutral-400">
                {session.user.email}
              </p>
            </div>
          </div>

          {/* Modifier nom */}
          <form onSubmit={handleUpdateName} className="space-y-4">
            <h2 className="font-semibold text-neutral-900 flex items-center gap-2">
              <User className="h-4 w-4" />
              Modifier mon nom
            </h2>
            <div>
              <Label htmlFor="name">Nom complet</Label>
              <Input
                id="name"
                name="name"
                defaultValue={session.user.name}
                required
                className="mt-1"
              />
            </div>
            <Button type="submit" disabled={loadingName}>
              {loadingName ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Mise à jour...
                </>
              ) : (
                "Mettre à jour"
              )}
            </Button>
          </form>
        </div>

        {/* Email — lecture seule */}
        <div className="rounded-2xl border bg-white p-6">
          <h2 className="font-semibold text-neutral-900 flex items-center gap-2 mb-4">
            <Mail className="h-4 w-4" />
            Adresse email
          </h2>
          <div>
            <Label>Email</Label>
            <Input
              value={session.user.email}
              disabled
              className="mt-1 bg-neutral-50 text-neutral-400"
            />
            <p className="mt-2 text-xs text-neutral-400">
              L email ne peut pas être modifié.
            </p>
          </div>
        </div>

        {/* Modifier mot de passe */}
        <div className="rounded-2xl border bg-white p-6">
          <h2 className="font-semibold text-neutral-900 flex items-center gap-2 mb-4">
            <Lock className="h-4 w-4" />
            Modifier mon mot de passe
          </h2>
          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <div>
              <Label htmlFor="currentPassword">Mot de passe actuel</Label>
              <Input
                id="currentPassword"
                name="currentPassword"
                type="password"
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="newPassword">Nouveau mot de passe</Label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                minLength={8}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                minLength={8}
                required
                className="mt-1"
              />
            </div>
            <Button type="submit" disabled={loadingPassword}>
              {loadingPassword ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Mise à jour...
                </>
              ) : (
                "Changer le mot de passe"
              )}
            </Button>
          </form>
        </div>

        {/* Supprimer compte */}
        <div className="rounded-2xl border border-red-100 bg-white p-6">
          <h2 className="font-semibold text-red-600 mb-2">
            Zone de danger
          </h2>
          <p className="text-sm text-neutral-500 mb-4">
            La suppression de votre compte est définitive et irréversible.
            Toutes vos données seront effacées.
          </p>
          <Button
            variant="outline"
            className="border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600"
            onClick={() => toast.error("Contactez-nous pour supprimer votre compte")}
          >
            Supprimer mon compte
          </Button>
        </div>

      </div>
    </div>
  );
}