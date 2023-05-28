import { create, StoreApi } from "zustand";
import { persist } from "zustand/middleware";

interface StoreState {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const themeStore = (set: StoreApi<StoreState>["setState"]) => ({
  darkMode: false,
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
});

export const useThemeStore = create(
  persist(themeStore, { name: "kanban-theme" })
);
