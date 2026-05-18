"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { Spinner } from "@heroui/react";
import type { Contents, Rendition } from "epubjs";

import { readerBaseStyles, THEME_PALETTE } from "../constants";
import {
  useBookPagination,
  usePaneReflowSync,
  useReaderSearch,
  useRenditionHighlights,
  useThemeAndFont,
} from "../hooks";
import {
  HighlightColorType,
  IHighlight,
  IReaderBook,
  ReaderFontFamilyType,
  ReaderThemeType,
} from "../models";

import { ReaderLoupe } from "./reader-loupe";
import { ReaderToolbar } from "./reader-toolbar";

const ReactReader = dynamic(
  () => import("react-reader").then((m) => m.ReactReader),
  { ssr: false },
);

interface IReaderViewProps {
  book: IReaderBook;
  fontFamily: ReaderFontFamilyType;
  fontSize: number;
  theme: ReaderThemeType;
  onFontFamilyChange: (f: ReaderFontFamilyType) => void;
  onFontSizeChange: (n: number) => void;
  onThemeChange: (t: ReaderThemeType) => void;
  highlights?: IHighlight[];
  onCreateHighlight?: (highlight: Omit<IHighlight, "id" | "created_at">) => void;
}

export function ReaderView({
  book,
  fontFamily,
  fontSize,
  theme,
  onFontFamilyChange,
  onFontSizeChange,
  onThemeChange,
  highlights,
  onCreateHighlight,
}: IReaderViewProps) {
  const t = useTranslations();

  const [location, setLocation] = useState<string | number | null>(
    book.last_location ?? 0,
  );
  const [rendition, setRendition] = useState<Rendition | null>(null);
  const [activeHighlightColor, setActiveHighlightColor] =
    useState<HighlightColorType | null>(null);
  const [isHighlightPopoverOpen, setIsHighlightPopoverOpen] = useState(false);
  const [isLoupeActive, setIsLoupeActive] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const activeColorRef = useRef(activeHighlightColor);

  useEffect(() => {
    activeColorRef.current = activeHighlightColor;
  }, [activeHighlightColor]);

  useThemeAndFont(rendition, theme, fontFamily, fontSize);
  useRenditionHighlights(rendition, highlights);
  usePaneReflowSync(rendition);

  const { currentPage, totalPages } = useBookPagination(rendition, location);

  const {
    searchQuery,
    setSearchQuery,
    debouncedSearchQuery,
    searchResults,
    currentResultIndex,
    handleSearchResults,
    goToSearchResult,
  } = useReaderSearch(rendition, setLocation);

  const createHighlight = useCallback(
    (cfiRange: string, text: string, color: HighlightColorType) => {
      onCreateHighlight?.({
        book_slug: book.slug,
        cfi_range: cfiRange,
        color,
        text,
      });
    },
    [book.slug, onCreateHighlight],
  );

  // Highlighting is only active while the popover is open: the user clicks
  // the marker icon, picks a color, drag-selects text → highlight applied.
  // Page-flip swipes are disabled in this mode so the drag-select isn't
  // captured as a navigation gesture (see `swipeable` on ReactReader below).
  const handleTextSelected = useCallback(
    (cfiRange: string, contents: Contents) => {
      const color = activeColorRef.current;
      if (!color) return;

      const selection = contents.window.getSelection();
      const text = selection?.toString().trim() ?? "";
      if (!text) return;

      createHighlight(cfiRange, text, color);
      selection?.removeAllRanges();
    },
    [createHighlight],
  );

  // Closing the popover (marker icon, outside click, Escape) exits highlight
  // mode — clears the active color so the next selection won't highlight.
  const handleHighlightPopoverOpenChange = useCallback((open: boolean) => {
    setIsHighlightPopoverOpen(open);
    if (!open) setActiveHighlightColor(null);
  }, []);

  const handleLocationChanged = useCallback((loc: string) => {
    setLocation(loc);
  }, []);

  const epubOptions = useMemo(
    () => ({
      flow: "paginated" as const,
      manager: "default",
      spread: "auto" as const,
      minSpreadWidth: 768,
      allowScriptedContent: false,
      allowPopups: false,
    }),
    [],
  );

  // react-reader 2.0.15 always renders the z-index:200 swipeWrapper overlay
  // regardless of the `swipeable` prop — and SwipeWrapper's mousedown handler
  // calls preventDefault, which kills text selection. While the popover is
  // open we make that overlay event-transparent so drag-selects reach the
  // iframe directly.
  const readerStyles = useMemo(
    () =>
      isHighlightPopoverOpen
        ? {
            ...readerBaseStyles,
            swipeWrapper: {
              ...readerBaseStyles.swipeWrapper,
              pointerEvents: "none" as const,
            },
          }
        : readerBaseStyles,
    [isHighlightPopoverOpen],
  );

  const palette = THEME_PALETTE[theme];

  return (
    <div
      ref={containerRef}
      className="relative mx-auto h-[calc(100dvh-3.5rem)] max-h-225 w-full max-w-330 px-1 py-1.5 rounded-lg sm:px-1 md:h-[calc(100dvh-4rem)]"
      style={{ backgroundColor: palette.spineFrame }}
    >
      <div
        className="relative h-full w-full overflow-hidden shadow-[0_30px_60px_-20px_rgba(0,0,0,0.25)]"
        style={{ backgroundColor: palette.page }}
      >
        {/* Central spine shadow — left page */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 bottom-0 right-1/2 hidden w-12 md:block z-10"
          style={{
            background: `linear-gradient(to left, ${palette.shadowFrom} 0%, ${palette.shadowTo} 32%)`,
          }}
        />
        {/* Central spine shadow — right page */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 bottom-0 left-1/2 hidden w-12 md:block z-10"
          style={{
            background: `linear-gradient(to right, ${palette.shadowFrom} 0%, ${palette.shadowTo} 32%)`,
          }}
        />
        {/* Central spine line */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 bottom-0 left-1/2 hidden w-0.5 -translate-x-1/2 md:block z-10"
          style={{ backgroundColor: palette.spineLine }}
        />

        <ReactReader
          url={book.epub_url}
          location={location}
          locationChanged={handleLocationChanged}
          getRendition={setRendition}
          handleTextSelected={handleTextSelected}
          epubOptions={epubOptions}
          showToc={false}
          readerStyles={readerStyles}
          searchQuery={debouncedSearchQuery}
          onSearchResults={handleSearchResults}
          contextLength={30}
          swipeable={!isHighlightPopoverOpen}
          loadingView={
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <Spinner />
              <span className="text-sm text-foreground-muted">{t("yuklanmoqda")}</span>
            </div>
          }
        />

        <ReaderLoupe active={isLoupeActive} containerRef={containerRef} />
      </div>

      <ReaderToolbar
        currentPage={currentPage}
        totalPages={totalPages}
        activeHighlightColor={activeHighlightColor}
        onHighlightColorChange={setActiveHighlightColor}
        isHighlightPopoverOpen={isHighlightPopoverOpen}
        onHighlightPopoverOpenChange={handleHighlightPopoverOpenChange}
        isLoupeActive={isLoupeActive}
        onToggleLoupe={() => setIsLoupeActive((v) => !v)}
        fontFamily={fontFamily}
        onFontFamilyChange={onFontFamilyChange}
        fontSize={fontSize}
        onFontSizeChange={onFontSizeChange}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        searchResultsCount={searchResults.length}
        currentSearchResultIndex={currentResultIndex}
        onPrevSearchResult={() => goToSearchResult(-1)}
        onNextSearchResult={() => goToSearchResult(1)}
        theme={theme}
        onThemeChange={onThemeChange}
      />
    </div>
  );
}
