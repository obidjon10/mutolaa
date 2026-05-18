"use client";

import { useCallback, useSyncExternalStore } from "react";

export interface ILabelItem {
  id: number;
  label: string;
}

const STORAGE_KEY = "filter-label-cache";

const entryKey = (param: string, id: number) => `${param}:${id}`;

const readStore = (): Record<string, string> => {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
};

const writeStore = (cache: Record<string, string>) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
  } catch {
    // quota or private-mode error — swallow; the cache is best-effort.
  }
};

/**
 * Persistent client-side cache of filter labels keyed by (URL param, id),
 * backed by localStorage so labels survive reloads and revisits. Pages that
 * already know a label (e.g. book detail with author/dubber/category names)
 * call `setFilterLabels` to seed it; the search page's `useFilterTags` calls
 * `useFilterLabel` as a fallback when the paginated list endpoints haven't
 * yielded the id.
 *
 * Writes and reads are intentionally split:
 *   - `setFilterLabels` is a plain function: no hook → no hydration
 *     subscription → no re-renders for write-only callers like AuthorCard or
 *     SearchLink.
 *   - `useFilterLabel` is a hook: it needs hydration gating because reading
 *     localStorage on the server differs from the client (would cause a
 *     hydration mismatch otherwise).
 */
export const setFilterLabels = (param: string, items: ILabelItem[]) => {
  if (!items.length) return;
  const cache = readStore();
  let changed = false;
  items.forEach(({ id, label }) => {
    const key = entryKey(param, id);
    if (cache[key] !== label) {
      cache[key] = label;
      changed = true;
    }
  });
  if (changed) writeStore(cache);
};

// Hydration-detection via useSyncExternalStore: the server snapshot returns
// false (matching SSR's missing localStorage), and the client snapshot returns
// true once React has committed on the client.
const subscribeNoop = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export const useFilterLabel = () => {
  const hydrated = useSyncExternalStore(
    subscribeNoop,
    getClientSnapshot,
    getServerSnapshot,
  );

  return useCallback(
    (param: string, id: number): string | undefined => {
      if (!hydrated) return undefined;
      return readStore()[entryKey(param, id)];
    },
    [hydrated],
  );
};
