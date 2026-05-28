"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCampaign, updateCampaign } from "@/app/actions/newsletter";

interface CampaignFormProps {
  campaign?: { id: string; subject: string; content: string };
}

const TEMPLATES = [
  {
    label: "Actualité domaine",
    content: `<h2 style="font-family:Georgia,serif;font-weight:300;font-size:24px;color:#1c1917;margin:0 0 16px;">Bonjour,</h2>
<p style="color:#57534e;margin:0 0 16px;">Voici les dernières nouvelles du domaine.</p>
<p style="color:#57534e;margin:0 0 24px;">[Votre contenu ici]</p>
<a href="https://domaine-test.fr/journal" style="display:inline-block;background:#1c1917;color:#fff;padding:12px 28px;text-decoration:none;font-family:sans-serif;font-size:12px;letter-spacing:0.15em;text-transform:uppercase;">Lire la suite</a>`,
  },
  {
    label: "Nouveau millésime",
    content: `<h2 style="font-family:Georgia,serif;font-weight:300;font-size:24px;color:#1c1917;margin:0 0 8px;">Le millésime [ANNÉE] est arrivé</h2>
<p style="color:#a8a29e;font-family:sans-serif;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;margin:0 0 20px;">Nouveau millésime</p>
<p style="color:#57534e;margin:0 0 16px;">[Description du millésime]</p>
<a href="https://domaine-test.fr/products" style="display:inline-block;background:#1c1917;color:#fff;padding:12px 28px;text-decoration:none;font-family:sans-serif;font-size:12px;letter-spacing:0.15em;text-transform:uppercase;">Découvrir les vins</a>`,
  },
  {
    label: "Invitation événement",
    content: `<h2 style="font-family:Georgia,serif;font-weight:300;font-size:24px;color:#1c1917;margin:0 0 8px;">Vous êtes invité(e)</h2>
<p style="color:#57534e;margin:0 0 8px;"><strong>Date :</strong> [DATE]</p>
<p style="color:#57534e;margin:0 0 8px;"><strong>Lieu :</strong> Domaine de la test, Chinon</p>
<p style="color:#57534e;margin:0 0 20px;">[Description de l'événement]</p>
<a href="https://domaine-test.fr/experiences" style="display:inline-block;background:#1c1917;color:#fff;padding:12px 28px;text-decoration:none;font-family:sans-serif;font-size:12px;letter-spacing:0.15em;text-transform:uppercase;">Réserver ma place</a>`,
  },
];

export default function CampaignForm({ campaign }: CampaignFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [content, setContent] = useState(campaign?.content ?? "");
  const [subject, setSubject] = useState(campaign?.subject ?? "");
  const isEditing = !!campaign;

  function applyTemplate(tpl: (typeof TEMPLATES)[0]) {
    if (content && !confirm("Remplacer le contenu actuel par ce modèle ?")) return;
    setContent(tpl.content);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = isEditing
      ? await updateCampaign(campaign.id, { subject, content })
      : await createCampaign({ subject, content });

    if (result.success) {
      router.push("/dashboard/newsletter");
      router.refresh();
    } else {
      setError(result.error ?? "Erreur");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      {/* Modèles rapides */}
      <div>
        <p className="mb-2 text-sm font-medium text-gray-700">Modèles rapides</p>
        <div className="flex flex-wrap gap-2">
          {TEMPLATES.map((tpl) => (
            <button
              key={tpl.label}
              type="button"
              onClick={() => applyTemplate(tpl)}
              className="rounded border border-gray-300 px-3 py-1.5 text-xs text-gray-600 transition-colors hover:bg-gray-50"
            >
              {tpl.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Sujet de l email *</label>
        <input
          type="text"
          required
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Nouvelles du domaine — Automne 2025"
          className="w-full rounded border border-gray-300 px-4 py-2.5 text-sm focus:border-gray-500 focus:outline-none"
        />
      </div>

      <div>
        <div className="mb-1 flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">
            Contenu *{" "}
            <span className="font-normal text-gray-400">
              (HTML — le header et footer domaine sont ajoutés automatiquement)
            </span>
          </label>
        </div>
        <textarea
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={18}
          placeholder="<p>Bonjour,</p><p>Voici les nouvelles du domaine...</p>"
          className="w-full resize-y rounded border border-gray-300 px-4 py-3 font-mono text-sm focus:border-gray-500 focus:outline-none"
        />
        <p className="mt-1 text-xs text-gray-400">
          Utilisez du HTML simple : &lt;p&gt;, &lt;h2&gt;, &lt;strong&gt;, &lt;a href=...&gt;,
          &lt;img&gt;
        </p>
      </div>

      {/* Aperçu */}
      {content && (
        <div>
          <p className="mb-2 text-sm font-medium text-gray-700">Aperçu du corps</p>
          <div
            className="prose prose-sm max-w-none rounded border border-gray-200 bg-white p-6"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-4 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="rounded bg-stone-900 px-8 py-2.5 text-sm text-white transition-colors hover:bg-stone-700 disabled:opacity-50"
        >
          {loading
            ? "Enregistrement..."
            : isEditing
              ? "Mettre à jour le brouillon"
              : "Créer le brouillon"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded border border-gray-300 px-6 py-2.5 text-sm text-gray-600 transition-colors hover:bg-gray-50"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}
