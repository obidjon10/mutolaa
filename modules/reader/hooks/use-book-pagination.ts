"use client";

import { useEffect, useMemo, useState } from "react";
import type { Rendition } from "epubjs";

// Track total pages via generated locations and derive the current page
// from the rendition's location CFI.
export function useBookPagination(
  rendition: Rendition | null,
  location: string | number | null,
) {
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!rendition) return;

    const book = rendition.book;

    let cancelled = false;

    book.ready
      .then(() => book.locations.generate(1600))
      .then(() => {
        if (cancelled) return;
        setTotalPages(book.locations.length());
      })
      .catch(() => {
        /* noop */
      });

    return () => {
      cancelled = true;
    };
  }, [rendition]);

  const currentPage = useMemo(() => {
    if (!rendition || typeof location !== "string" || totalPages === 0)
      return 0;

    const pageIdx = rendition.book.locations.locationFromCfi(location);

    return typeof pageIdx === "number" && pageIdx >= 0 ? pageIdx + 1 : 0;
  }, [rendition, location, totalPages]);

  return { currentPage, totalPages };
}
