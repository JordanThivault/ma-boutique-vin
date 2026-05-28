import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  fetchOptions: {
    credentials: "include",
  },
});

export type Session = typeof authClient.$Infer.Session;

// ✅ Extends le type user avec le rôle
export type SessionUser = Session["user"] & {
  role: "ADMIN" | "CUSTOMER";
};

export const { signIn, signUp, signOut, useSession, getSession } = authClient;
