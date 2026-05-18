"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import {
  DEFAULT_READER_PREFS,
  IReaderPrefs,
  READER_FONT_FAMILIES,
  READER_FONT_SIZE_MAX,
  READER_FONT_SIZE_MIN,
  READER_THEMES,
  ReaderFontFamilyType,
  ReaderThemeType,
} from "../models";

const STORAGE_KEY = "mutolaa:reader-prefs";

const clampSize = (n: number) =>
  Math.min(READER_FONT_SIZE_MAX, Math.max(READER_FONT_SIZE_MIN, Math.round(n)));

const readFromStorage = (): IReaderPrefs => {
  if (typeof window === "undefined") return DEFAULT_READER_PREFS;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (!raw) return DEFAULT_READER_PREFS;

    const parsed = JSON.parse(raw) as Partial<IReaderPrefs>;
    const fontFamily = READER_FONT_FAMILIES.includes(
      parsed.fontFamily as ReaderFontFamilyType,
    )
      ? (parsed.fontFamily as ReaderFontFamilyType)
      : DEFAULT_READER_PREFS.fontFamily;
    const fontSize =
      typeof parsed.fontSize === "number"
        ? clampSize(parsed.fontSize)
        : DEFAULT_READER_PREFS.fontSize;
    const theme = READER_THEMES.includes(parsed.theme as ReaderThemeType)
      ? (parsed.theme as ReaderThemeType)
      : DEFAULT_READER_PREFS.theme;

    return { fontFamily, fontSize, theme };
  } catch {
    return DEFAULT_READER_PREFS;
  }
};

export const useReaderPrefs = () => {
  const [prefs, setPrefs] = useState<IReaderPrefs>(() =>
    typeof window === "undefined" ? DEFAULT_READER_PREFS : readFromStorage(),
  );
  const hasMounted = useRef(false);

  useEffect(() => {
    hasMounted.current = true;
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch {
      /* ignore quota/private-mode errors */
    }
  }, [prefs]);

  const setFontFamily = useCallback((fontFamily: ReaderFontFamilyType) => {
    setPrefs((prev) => ({ ...prev, fontFamily }));
  }, []);

  const setFontSize = useCallback((fontSize: number) => {
    setPrefs((prev) => ({ ...prev, fontSize: clampSize(fontSize) }));
  }, []);

  const incrementFontSize = useCallback((delta: number) => {
    setPrefs((prev) => ({ ...prev, fontSize: clampSize(prev.fontSize + delta) }));
  }, []);

  const setTheme = useCallback((theme: ReaderThemeType) => {
    setPrefs((prev) => ({ ...prev, theme }));
  }, []);

  return {
    prefs,
    hydrated: true,
    setFontFamily,
    setFontSize,
    incrementFontSize,
    setTheme,
  };
};
