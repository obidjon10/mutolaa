"use client";

import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import type { Rendition } from "epubjs";

const SEARCH_FILL = "#FACC15";
const SEARCH_FILL_FOCUSED = "#FB923C";
const MAX_SEARCH_RESULTS = 500;
const SEARCH_DEBOUNCE_MS = 250;

export interface ISearchResult {
  cfi: string;
  excerpt: string;
}

export interface IUseReaderSearchResult {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  debouncedSearchQuery: string;
  searchResults: ISearchResult[];
  currentResultIndex: number;
  handleSearchResults: (results: ISearchResult[]) => void;
  goToSearchResult: (delta: 1 | -1) => void;
}

// Owns all search-related state for the reader:
//   1. debouncing the input into react-reader's `searchQuery` prop,
//   2. painting/clearing the search marks as epub.js highlights,
//   3. tracking which result is currently focused and re-painting it in a
//      distinct color,
//   4. navigating between results via prev/next by moving `location`.
//
// The actual full-book search is done inside `<ReactReader>` via its
// `searchQuery` + `onSearchResults` props (which joins adjacent text nodes
// before indexing, so multi-node queries like "zinasiga" match as a whole).
export function useReaderSearch(
  rendition: Rendition | null,
  setLocation: Dispatch<SetStateAction<string | number | null>>,
): IUseReaderSearchResult {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ISearchResult[]>([]);
  const [currentResultIndex, setCurrentResultIndex] = useState(0);

  const searchCfisRef = useRef<Set<string>>(new Set());
  const prevFocusedIndexRef = useRef(0);

  const addSearchMark = useCallback(
    (cfi: string, focused: boolean) => {
      if (!rendition) return;
      try {
        rendition.annotations.add(
          "highlight",
          cfi,
          {},
          undefined,
          `mutolaa-search-${cfi}${focused ? "-focused" : ""}`,
          {
            fill: focused ? SEARCH_FILL_FOCUSED : SEARCH_FILL,
            "fill-opacity": focused ? "0.55" : "0.35",
            "mix-blend-mode": "multiply",
          },
        );
      } catch {
        /* cfi may be invalid for some sections */
      }
    },
    [rendition],
  );

  const clearSearchMarks = useCallback(() => {
    if (!rendition) return;
    searchCfisRef.current.forEach((cfi) => {
      try {
        rendition.annotations.remove(cfi, "highlight");
      } catch {
        /* noop */
      }
    });
    searchCfisRef.current.clear();
  }, [rendition]);

  useEffect(() => {
    const query = searchQuery.trim();
    const timer = window.setTimeout(() => {
      setDebouncedSearchQuery(query.length >= 2 ? query : "");
    }, SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [searchQuery]);

  const handleSearchResults = useCallback(
    (results: ISearchResult[]) => {
      clearSearchMarks();

      if (!rendition || !results.length) {
        setSearchResults([]);
        setCurrentResultIndex(0);
        return;
      }

      const trimmed = results.slice(0, MAX_SEARCH_RESULTS);

      trimmed.forEach((r, i) => {
        addSearchMark(r.cfi, i === 0);
        searchCfisRef.current.add(r.cfi);
      });

      prevFocusedIndexRef.current = 0;
      setSearchResults(trimmed);
      setCurrentResultIndex(0);
      setLocation(trimmed[0].cfi);
    },
    [rendition, clearSearchMarks, addSearchMark, setLocation],
  );

  // Re-paint focused vs. unfocused when the focused index changes.
  useEffect(() => {
    if (!rendition || !searchResults.length) {
      prevFocusedIndexRef.current = 0;
      return;
    }

    const prev = prevFocusedIndexRef.current;
    const next = currentResultIndex;

    if (prev === next) return;

    const prevCfi = searchResults[prev]?.cfi;
    const nextCfi = searchResults[next]?.cfi;

    if (prevCfi) {
      try {
        rendition.annotations.remove(prevCfi, "highlight");
      } catch {
        /* noop */
      }
      addSearchMark(prevCfi, false);
    }

    if (nextCfi) {
      try {
        rendition.annotations.remove(nextCfi, "highlight");
      } catch {
        /* noop */
      }
      addSearchMark(nextCfi, true);
    }

    prevFocusedIndexRef.current = next;
  }, [rendition, searchResults, currentResultIndex, addSearchMark]);

  const goToSearchResult = useCallback(
    (delta: 1 | -1) => {
      if (!searchResults.length) return;
      const next =
        (currentResultIndex + delta + searchResults.length) %
        searchResults.length;
      setCurrentResultIndex(next);
      setLocation(searchResults[next].cfi);
    },
    [searchResults, currentResultIndex, setLocation],
  );

  return {
    searchQuery,
    setSearchQuery,
    debouncedSearchQuery,
    searchResults,
    currentResultIndex,
    handleSearchResults,
    goToSearchResult,
  };
}
