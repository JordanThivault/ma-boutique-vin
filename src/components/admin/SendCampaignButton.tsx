"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { sendCampaign } from "@/app/actions/newsletter";
import { toast } from "sonner";

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

import { Send, Loader2 } from "lucide-react";

export default function SendCampaignButton({
  campaignId,
  subscriberCount,
}: {
  campaignId: string;
  subscriberCount: number;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    setLoading(true);

    const result = await sendCampaign(campaignId);

    if (result?.error) {
      toast.error(result.error);
      setLoading(false);
      return;
    }

    toast.success("📩 Campagne envoyée avec succès");

    setOpen(false);
    router.refresh();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-amber-700 hover:text-amber-900"
          disabled={subscriberCount === 0}
          title={subscriberCount === 0 ? "Aucun abonné" : "Envoyer la campagne"}
        >
          <Send className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Envoyer la campagne</DialogTitle>

          <DialogDescription>
            Envoyer cette campagne à <strong>{subscriberCount}</strong> abonné(s) ?
            <br />
            Cette action est irréversible.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
            Annuler
          </Button>

          <Button onClick={handleSend} disabled={loading || subscriberCount === 0}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Envoyer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
