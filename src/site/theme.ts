import { createContext, useContext } from "react";

export type ThemeName = "classic" | "field";

export const themes: { id: ThemeName; label: string; summary: string }[] = [
  {
    id: "classic",
    label: "Classic",
    summary: "Slate casings, copper faces, amber focus.",
  },
  {
    id: "field",
    label: "Field Hardware",
    summary: "Olive housings, brass faces, canvas-toned text.",
  },
];

export const ThemeContext = createContext<{
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
}>({ theme: "classic", setTheme: () => {} });

export function useTheme() {
  return useContext(ThemeContext);
}

const storageKey = "layered-ui:theme";

export function readStoredTheme(): ThemeName {
  try {
    const stored = window.localStorage.getItem(storageKey);
    return stored === "field" ? "field" : "classic";
  } catch {
    return "classic";
  }
}

export function storeTheme(theme: ThemeName) {
  try {
    window.localStorage.setItem(storageKey, theme);
  } catch {
    /* storage unavailable: the choice lasts for this visit only */
  }
}
