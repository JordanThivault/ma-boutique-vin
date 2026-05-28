import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "@/lib/db";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,

    // ✅ Mot de passe oublié
    sendResetPassword: async ({ user, url }) => {
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: user.email,
        subject: "Réinitialisation de votre mot de passe",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Réinitialisation de mot de passe</h2>

            <p>Bonjour ${user.name},</p>

            <p>
              Vous avez demandé à réinitialiser votre mot de passe.
            </p>

            <a
              href="${url}"
              style="
                display: inline-block;
                background: #171717;
                color: white;
                padding: 12px 24px;
                border-radius: 8px;
                text-decoration: none;
                margin: 16px 0;
              "
            >
              Réinitialiser mon mot de passe
            </a>

            <p style="color: #666; font-size: 14px;">
              Ce lien expire dans 1 heure.
              Si vous n'avez pas fait cette demande, ignorez cet email.
            </p>
          </div>
        `,
      });
    },
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      enabled: !!(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET),
    },
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,

    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },

  // ✅ rôle dans la session
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "CUSTOMER",
        input: false,
      },
    },
  },

  trustedOrigins: [process.env.NEXT_PUBLIC_APP_URL as string],
});

export type Session = typeof auth.$Infer.Session;
