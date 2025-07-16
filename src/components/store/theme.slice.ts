import { create } from "zustand";

export const useThemeStore = create<{ dark: boolean; toggle: () => void }>((set) => ({
  dark:
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches,
  toggle: () => set((s) => ({ dark: !s.dark })),
}));