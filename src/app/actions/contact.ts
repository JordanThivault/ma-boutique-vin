"use server";

import { resend } from "@/lib/emails/resend";

// ============================================================
// SOUMISSION CONTACT
// ============================================================

interface ContactData {
  nom: string;
  email: string;
  sujet: string;
  message: string;
}

export async function submitContact(
  data: ContactData
): Promise<{ success: boolean; error?: string }> {
  if (!data.nom || !data.email || !data.message) {
    return { success: false, error: "Veuillez remplir tous les champs obligatoires." };
  }

  try {
    // Notification à l'équipe (replyTo = visiteur pour répondre en un clic)
    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail) {
      await resend.emails.send({
        from: "Contact <contact@domaine-gaud.com>",
        to: adminEmail,
        replyTo: data.email,
        subject: `Nouveau message — ${data.sujet || "Sans sujet"}`,
        html: `
          <p><strong>Nom :</strong> ${data.nom}</p>
          <p><strong>Email :</strong> ${data.email}</p>
          <p><strong>Sujet :</strong> ${data.sujet || "—"}</p>
          <p><strong>Message :</strong></p>
          <p style="white-space:pre-wrap;">${data.message}</p>
        `,
      });
    }

    // Accusé de réception au visiteur
    await resend.emails.send({
      from: "Domaine Gaud <contact@domaine-gaud.com>",
      to: data.email,
      subject: "Votre message — Domaine Gaud",
      html: `
        <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#292524;line-height:1.6;">
          <h1 style="font-weight:300;">Message bien reçu</h1>
          <p>Bonjour ${data.nom},</p>
          <p>Nous avons bien reçu votre message et vous répondrons dans les plus brefs délais.</p>
          ${data.sujet ? `<p><strong>Sujet :</strong> ${data.sujet}</p>` : ""}
          <p style="color:#78716c;font-size:12px;margin-top:32px;">L'abus d'alcool est dangereux pour la santé. À consommer avec modération.</p>
        </div>
      `,
    });

    return { success: true };
  } catch (err) {
    console.error("Contact error:", err);
    return { success: false, error: "Une erreur est survenue." };
  }
}