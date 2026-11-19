"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type ThemeId =
  | "primary"
  | "dark"
  | "sunflower"
  | "sunflower-dark"
  | "cyber-light"
  | "cyber"
  | "eva-light"
  | "eva"
  | "crimson"
  | "crimson-dark";

export interface ThemeMeta {
  id: ThemeId;
  family: "sakura" | "sunflower" | "cyber" | "eva" | "crimson";
  name: string;
  category: "light" | "dark";
  badge: string;
  palette: {
    bg: string;
    ink: string;
    pri: string;
    acc: string;
    soft: string;
  };
}

export const SAKUGA_THEMES: ThemeMeta[] = [
  // 1. Sakura Family (Light & Dark)
  {
    id: "primary",
    family: "sakura",
    name: "Sakura Light",
    category: "light",
    badge: "Primary Light",
    palette: {
      bg: "#ffffff",
      ink: "#1d1a4a",
      pri: "#8f8df7",
      acc: "#ff5fa8",
      soft: "#b8b3ff",
    },
  },
  {
    id: "dark",
    family: "sakura",
    name: "Gojo Void Dark",
    category: "dark",
    badge: "Void Dark",
    palette: {
      bg: "#0b091f",
      ink: "#f3f0ff",
      pri: "#00e5ff",
      acc: "#ff5fa8",
      soft: "#5b4be3",
    },
  },

  // 2. Sunflower Family (Light & Dark)
  {
    id: "sunflower",
    family: "sunflower",
    name: "Sunflower Gold",
    category: "light",
    badge: "Warm Editorial",
    palette: {
      bg: "#fffdf5",
      ink: "#291e14",
      pri: "#ffd23f",
      acc: "#ff5252",
      soft: "#fae6c2",
    },
  },
  {
    id: "sunflower-dark",
    family: "sunflower",
    name: "Sunflower Dark",
    category: "dark",
    badge: "Espresso Dark",
    palette: {
      bg: "#16110a",
      ink: "#fef7ec",
      pri: "#fbbf24",
      acc: "#ff6b6b",
      soft: "#c98a1a",
    },
  },

  // 3. Cyber Family (Light & Dark)
  {
    id: "cyber-light",
    family: "cyber",
    name: "Cyber Mint",
    category: "light",
    badge: "Matrix Light",
    palette: {
      bg: "#f0faf7",
      ink: "#05261e",
      pri: "#059669",
      acc: "#d90479",
      soft: "#9ee6d5",
    },
  },
  {
    id: "cyber",
    family: "cyber",
    name: "Neo Tokyo Cyber",
    category: "dark",
    badge: "Cyberpunk Dark",
    palette: {
      bg: "#07070d",
      ink: "#00ffcc",
      pri: "#00ffcc",
      acc: "#ff007f",
      soft: "#7928ca",
    },
  },

  // 4. Eva Unit-01 Family (Light & Dark)
  {
    id: "eva-light",
    family: "eva",
    name: "Eva Sync Light",
    category: "light",
    badge: "Mecha Light",
    palette: {
      bg: "#faf7ff",
      ink: "#1a0c33",
      pri: "#16a34a",
      acc: "#ea580c",
      soft: "#c4b5fd",
    },
  },
  {
    id: "eva",
    family: "eva",
    name: "Eva Unit-01 Dark",
    category: "dark",
    badge: "Berserk Dark",
    palette: {
      bg: "#0f0a1c",
      ink: "#eedeff",
      pri: "#76ff03",
      acc: "#ff5252",
      soft: "#8b5cf6",
    },
  },

  // 5. Crimson Family (Light & Dark)
  {
    id: "crimson",
    family: "crimson",
    name: "Nichirin Crimson",
    category: "light",
    badge: "Demon Slayer Light",
    palette: {
      bg: "#fbf8f5",
      ink: "#1a0f12",
      pri: "#d90429",
      acc: "#800f2f",
      soft: "#f28b97",
    },
  },
  {
    id: "crimson-dark",
    family: "crimson",
    name: "Blood Moon Dark",
    category: "dark",
    badge: "Nichirin Dark",
    palette: {
      bg: "#12080a",
      ink: "#fff0f3",
      pri: "#ef233c",
      acc: "#ff4d6d",
      soft: "#9f1225",
    },
  },
];

// Symmetrical Light <-> Dark mapping for each theme
const THEME_PAIR_MAP: Record<ThemeId, ThemeId> = {
  primary: "dark",
  dark: "primary",
  sunflower: "sunflower-dark",
  "sunflower-dark": "sunflower",
  "cyber-light": "cyber",
  cyber: "cyber-light",
  "eva-light": "eva",
  eva: "eva-light",
  crimson: "crimson-dark",
  "crimson-dark": "crimson",
};

interface SakugaThemeContextType {
  theme: ThemeId;
  currentMeta: ThemeMeta;
  themes: ThemeMeta[];
  isDark: boolean;
  setTheme: (id: ThemeId) => void;
  toggleDark: () => void;
}

const SakugaThemeContext = createContext<SakugaThemeContextType>({
  theme: "primary",
  currentMeta: SAKUGA_THEMES[0],
  themes: SAKUGA_THEMES,
  isDark: false,
  setTheme: () => {},
  toggleDark: () => {},
});

export function SakugaThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>("primary");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("sakuga-theme") as ThemeId;
      if (saved && SAKUGA_THEMES.some((t) => t.id === saved)) {
        setThemeState(saved);
        document.documentElement.setAttribute("data-theme", saved);
      } else {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const initial: ThemeId = prefersDark ? "dark" : "primary";
        setThemeState(initial);
        document.documentElement.setAttribute("data-theme", initial);
      }
    } catch (e) {
      // Ignore in strict private mode
    }
    setMounted(true);
  }, []);

  const setTheme = (nextTheme: ThemeId) => {
    setThemeState(nextTheme);
    try {
      localStorage.setItem("sakuga-theme", nextTheme);
      document.documentElement.setAttribute("data-theme", nextTheme);
    } catch (e) {}

    const fx = (window as any).SakugaFX;
    if (fx && typeof fx.ticks === "function") {
      fx.ticks(window.innerWidth / 2, 60, { n: 8, r: 20, len: 20, life: 0.4 });
    }
  };

  const currentMeta =
    SAKUGA_THEMES.find((t) => t.id === theme) || SAKUGA_THEMES[0];

  const isDark = currentMeta.category === "dark";

  // Symmetrical Light/Dark switch across every color family
  const toggleDark = () => {
    const nextTheme = THEME_PAIR_MAP[theme] || (isDark ? "primary" : "dark");
    setTheme(nextTheme);
  };

  return (
    <SakugaThemeContext.Provider
      value={{
        theme,
        currentMeta,
        themes: SAKUGA_THEMES,
        isDark,
        setTheme,
        toggleDark,
      }}
    >
      {children}
    </SakugaThemeContext.Provider>
  );
}

export function useSakugaTheme() {
  return useContext(SakugaThemeContext);
}
