// src/hooks/useAuthModal.ts
import { create } from "zustand";

export type AuthView = "login" | "register" | "reset-password";

interface AuthModalStore {
  isOpen: boolean;
  view: AuthView;
  open: (view?: AuthView) => void;
  close: () => void;
  setView: (view: AuthView) => void;
}

export const useAuthModal = create<AuthModalStore>((set) => ({
  isOpen: false,
  view: "login",
  open: (view = "login") => set({ isOpen: true, view }),
  close: () => set({ isOpen: false }),
  setView: (view) => set({ view }),
}));
