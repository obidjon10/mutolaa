"use client";

import { useEffect } from "react";
import type { Contents, Rendition } from "epubjs";

// Keep marks-pane overlays (highlights, search marks, underlines) aligned
// with the text when the iframe reflows — e.g. after font-size or font-
// family changes.
//
// epub.js only re-renders the marks-pane inside `view.reframe()`, which
// skips the render when iframe dimensions are unchanged (typical in
// paginated mode on font-size changes). We subscribe to every iframe's
// resize/expand event and force a pane re-render on all rendered views.
export function usePaneReflowSync(rendition: Rendition | null) {
  useEffect(() => {
    if (!rendition) return;

    const renderPanes = () => {
      const manager = (rendition as unknown as {
        manager?: {
          views?: { _views?: Array<{ pane?: { render: () => void } }> };
        };
      }).manager;
      const views = manager?.views?._views;

      if (!views) return;
      views.forEach((v) => {
        try {
          v.pane?.render();
        } catch {
          /* noop */
        }
      });
    };

    const onContent = (contents: Contents) => {
      const c = contents as unknown as {
        on: (e: string, cb: () => void) => void;
      };
      c.on("resize", renderPanes);
      c.on("expand", renderPanes);
    };

    rendition.hooks.content.register(onContent);

    // Also attach to any already-rendered contents (first chapter usually
    // renders before this effect runs).
    (rendition.getContents() as unknown as Contents[]).forEach(onContent);

    return () => {
      try {
        rendition.hooks.content.deregister(onContent);
      } catch {
        /* noop */
      }
    };
  }, [rendition]);
}
