// src/components/admin/DeleteExperienceButton.tsx
"use client";

import { useState } from "react";
import { deleteExperience } from "@/app/actions/experiences";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function DeleteExperienceButton({
  experienceId,
}: {
  experienceId: string;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);

    try {
      const result = await deleteExperience(experienceId);

      if (result?.error) {
        toast.error(result.error);
        setLoading(false);
        return;
      }

      toast.success("Expérience supprimée");

      setOpen(false);

      // refresh UI
      window.location.reload();
    } catch {
      toast.error("Erreur lors de la suppression");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-neutral-400 hover:text-red-500"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Supprimer l’expérience</DialogTitle>

          <DialogDescription>
            Êtes-vous sûr de vouloir supprimer cette expérience ?
            <br />
            Cette action est irréversible.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Annuler
          </Button>

          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Supprimer"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}