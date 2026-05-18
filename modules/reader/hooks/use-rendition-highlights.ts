"use client";

import { useEffect } from "react";
import type { Rendition } from "epubjs";

import { HIGHLIGHT_COLORS, IHighlight } from "../models";

// Re-apply user highlights whenever the set changes or a page renders.
export function useRenditionHighlights(
  rendition: Rendition | null,
  highlights: IHighlight[] | undefined,
) {
  useEffect(() => {
    if (!rendition) return;

    const apply = () => {
      highlights?.forEach((h) => {
        try {
          rendition.annotations.remove(h.cfi_range, "highlight");
          rendition.annotations.add(
            "highlight",
            h.cfi_range,
            {},
            undefined,
            "mutolaa-highlight",
            {
              fill: HIGHLIGHT_COLORS[h.color],
              "fill-opacity": "0.35",
              "mix-blend-mode": "multiply",
            },
          );
        } catch {
          /* cfi might be invalid across book versions */
        }
      });
    };

    apply();
    rendition.on("rendered", apply);

    return () => {
      rendition.off("rendered", apply);
    };
  }, [rendition, highlights]);
}
