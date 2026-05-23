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

  function applyTemplate(tpl: typeof TEMPLATES[0]) {
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
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      {/* Modèles rapides */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">Modèles rapides</p>
        <div className="flex flex-wrap gap-2">
          {TEMPLATES.map((tpl) => (
            <button
              key={tpl.label}
              type="button"
              onClick={() => applyTemplate(tpl)}
              className="px-3 py-1.5 text-xs border border-gray-300 rounded text-gray-600 hover:bg-gray-50 transition-colors"
            >
              {tpl.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Sujet de l email *</label>
        <input
          type="text" required value={subject} onChange={(e) => setSubject(e.target.value)}
          placeholder="Nouvelles du domaine — Automne 2025"
          className="w-full border border-gray-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-gray-500"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="block text-sm font-medium text-gray-700">
            Contenu *{" "}
            <span className="text-gray-400 font-normal">(HTML — le header et footer domaine sont ajoutés automatiquement)</span>
          </label>
        </div>
        <textarea
          required value={content} onChange={(e) => setContent(e.target.value)}
          rows={18}
          placeholder="<p>Bonjour,</p><p>Voici les nouvelles du domaine...</p>"
          className="w-full border border-gray-300 rounded px-4 py-3 text-sm font-mono focus:outline-none focus:border-gray-500 resize-y"
        />
        <p className="text-xs text-gray-400 mt-1">
          Utilisez du HTML simple : &lt;p&gt;, &lt;h2&gt;, &lt;strong&gt;, &lt;a href=...&gt;, &lt;img&gt;
        </p>
      </div>

      {/* Aperçu */}
      {content && (
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Aperçu du corps</p>
          <div
            className="border border-gray-200 rounded p-6 bg-white prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      )}

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div className="flex gap-4 pt-2">
        <button
          type="submit" disabled={loading}
          className="px-8 py-2.5 bg-stone-900 text-white text-sm rounded hover:bg-stone-700 transition-colors disabled:opacity-50"
        >
          {loading ? "Enregistrement..." : isEditing ? "Mettre à jour le brouillon" : "Créer le brouillon"}
        </button>
        <button
          type="button" onClick={() => router.back()}
          className="px-6 py-2.5 border border-gray-300 text-gray-600 text-sm rounded hover:bg-gray-50 transition-colors"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}
