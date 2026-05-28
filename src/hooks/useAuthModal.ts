// src/hooks/useAuthModal.ts
import { create } from "zustand";

type View = "login" | "register" | "reset-password";

interface AuthModalStore {
  isOpen: boolean;
  view: View;
  open: (view?: View) => void;
  close: () => void;
  setView: (view: View) => void;
}

export const useAuthModal = create<AuthModalStore>((set) => ({
  isOpen: false,
  view: "login",
  open: (view = "login") => set({ isOpen: true, view }),
  close: () => set({ isOpen: false }),
  setView: (view) => set({ view }),
}));
