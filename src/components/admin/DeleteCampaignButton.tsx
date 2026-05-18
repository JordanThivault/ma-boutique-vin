// src/components/admin/DeleteCampaignButton.tsx
"use client";

import { useState } from "react";
import { deleteCampaign } from "@/app/actions/newsletter-reservations";

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
import { useRouter } from "next/navigation";

export default function DeleteCampaignButton({
  campaignId,
  isSent,
}: {
  campaignId: string;
  isSent: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    if (isSent) {
      toast.error("Impossible de supprimer une campagne déjà envoyée.");
      return;
    }

    setLoading(true);

    try {
      const result = await deleteCampaign(campaignId);

      if (result?.error) {
        toast.error(result.error);
        setLoading(false);
        return;
      }

      toast.success("Campagne supprimée");

      setOpen(false);

      // refresh dashboard
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
          disabled={isSent}
          title={isSent ? "Campagne envoyée (non supprimable)" : "Supprimer"}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Supprimer la campagne</DialogTitle>

          <DialogDescription>
            Êtes-vous sûr de vouloir supprimer cette campagne ?
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
            disabled={loading || isSent}
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