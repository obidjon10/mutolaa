"use client";

import { createContext, useCallback, useContext, useState } from "react";

type ThemeType = "light" | "dark";

interface IThemeContext {
  theme: ThemeType;
  toggleTheme: () => void;
}

const ThemeContext = createContext<IThemeContext>({
  theme: "light",
  toggleTheme: () => {},
});

export const THEME_COOKIE = "theme";
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

function applyTheme(theme: ThemeType) {
  const root = document.documentElement;

  // Suppress all CSS transitions during the swap so elements with
  // `transition-colors` (hover affordances) don't slowly fade between
  // light/dark palettes — the toggle should feel instant.
  const stop = document.createElement("style");
  stop.appendChild(
    document.createTextNode(
      "*,*::before,*::after{transition:none !important}",
    ),
  );
  document.head.appendChild(stop);

  root.classList.remove("light", "dark");
  root.classList.add(theme);
  root.setAttribute("data-theme", theme);
  document.cookie = `${THEME_COOKIE}=${theme}; path=/; max-age=${ONE_YEAR_SECONDS}; samesite=lax`;

  // Force a synchronous style flush so the new theme is committed without
  // animation, then drop the suppression for subsequent hover interactions.
  void window.getComputedStyle(document.body).color;
  document.head.removeChild(stop);
}

export function ThemeProvider({
  initialTheme = "light",
  children,
}: {
  initialTheme?: ThemeType;
  children: React.ReactNode;
}) {
  // initialTheme comes from the server reading the THEME cookie in the
  // layout. Trust it as-is on the client to guarantee SSR/CSR parity —
  // re-reading document.cookie here causes hydration mismatches when the
  // initializer runs.
  const [theme, setTheme] = useState<ThemeType>(initialTheme);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next: ThemeType = prev === "light" ? "dark" : "light";

      if (typeof document !== "undefined") applyTheme(next);

      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
