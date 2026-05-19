"use client";

import { useCallback } from "react";
import { parseAsStringLiteral, useQueryState } from "nuqs";

import type { BookSelectionType } from "../models";

const SELECT_VALUES = ["ebook", "audio", "both", "none"] as const;

const SELECTION_PARSER = parseAsStringLiteral(SELECT_VALUES).withDefault(
  "both",
);

/**
 * URL-backed selection state for the book-payment page.
 * The `?select` query param is the source of truth so that the choice
 * survives reloads and is shareable.
 */
export const useBookSelection = () => {
  const [selection, setSelection] = useQueryState("select", SELECTION_PARSER);

  const isEbookSelected = selection === "ebook" || selection === "both";
  const isAudioSelected = selection === "audio" || selection === "both";

  const setEbookSelected = useCallback(
    (value: boolean) => {
      let next: BookSelectionType;
      if (value && isAudioSelected) next = "both";
      else if (value) next = "ebook";
      else if (isAudioSelected) next = "audio";
      else next = "none";
      setSelection(next);
    },
    [isAudioSelected, setSelection],
  );

  const setAudioSelected = useCallback(
    (value: boolean) => {
      let next: BookSelectionType;
      if (value && isEbookSelected) next = "both";
      else if (value) next = "audio";
      else if (isEbookSelected) next = "ebook";
      else next = "none";
      setSelection(next);
    },
    [isEbookSelected, setSelection],
  );

  return {
    selection,
    isEbookSelected,
    isAudioSelected,
    isEmpty: selection === "none",
    setEbookSelected,
    setAudioSelected,
  };
};
