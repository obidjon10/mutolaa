"use client";

import { useEffect } from "react";
import type { Rendition } from "epubjs";

import { THEME_PALETTE } from "../constants";
import {
  FONT_FAMILY_CSS,
  ReaderFontFamilyType,
  ReaderThemeType,
} from "../models";

// Apply theme / font whenever they change.
//
// epub.js has two quirks we work around here:
//   1. `themes.register(name, rules)` appends rules to a <style> tag inside
//      each iframe but never clears it, so repeated calls accumulate
//      duplicate rules.
//   2. `themes.select(name)` does not remove previously injected <style>
//      tags for other themes. Their rules remain and — because they appear
//      later in the head on subsequent switches — win by source order.
//
// Fix: wipe any existing mutolaa-* style tags inside each iframe before
// registering + selecting. We also re-run this whenever a new chapter is
// rendered (fresh iframe = fresh head).
export function useThemeAndFont(
  rendition: Rendition | null,
  theme: ReaderThemeType,
  fontFamily: ReaderFontFamilyType,
  fontSize: number,
) {
  useEffect(() => {
    if (!rendition) return;

    const themeName = `mutolaa-${theme}`;
    const palette = THEME_PALETTE[theme];
    const rules = {
      // Force selection on regardless of what the book's bundled CSS
      // (e.g. calibre.css) sets — otherwise drag-select silently does nothing.
      "html, body, body *": {
        "user-select": "text !important",
        "-webkit-user-select": "text !important",
        "-moz-user-select": "text !important",
        "-ms-user-select": "text !important",
      },
      body: {
        "font-family": `${FONT_FAMILY_CSS[fontFamily]} !important`,
        "font-size": `${fontSize}px !important`,
        "line-height": "1.65",
        color: `${palette.text} !important`,
        background: `${palette.page} !important`,
        "padding-top": "0 !important",
      },
      p: {
        "font-family": `${FONT_FAMILY_CSS[fontFamily]} !important`,
        "font-size": `${fontSize}px !important`,
        "line-height": "1.65",
        color: `${palette.text} !important`,
      },
      "a, a:visited": {
        color: `${palette.text} !important`,
      },
      "::selection": {
        background: palette.selection,
      },
    };

    const clearInjectedStyles = () => {
      const contents = rendition.getContents() as unknown as Array<{
        document?: Document;
      }>;

      contents.forEach((c) => {
        const doc = c.document;

        if (!doc) return;
        doc
          .querySelectorAll('style[id^="epubjs-inserted-css-mutolaa-"]')
          .forEach((el) => el.remove());
      });

      // Reset epub.js' internal bookkeeping so re-registration actually
      // re-inserts the rules on next select/update.
      // @ts-expect-error accessing internal field
      const store = rendition.themes._themes as
        | Record<string, { injected?: boolean }>
        | undefined;

      if (store) {
        Object.keys(store).forEach((name) => {
          if (name.startsWith("mutolaa-")) {
            delete store[name].injected;
          }
        });
      }
    };

    const apply = () => {
      clearInjectedStyles();
      rendition.themes.register(themeName, rules);
      rendition.themes.select(themeName);
    };

    apply();
    rendition.on("rendered", apply);

    return () => {
      rendition.off("rendered", apply);
    };
  }, [rendition, fontFamily, fontSize, theme]);
}
