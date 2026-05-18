"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Button, Tooltip } from "@heroui/react";
import classNames from "classnames";

import { useRouter } from "@/i18n/navigation";
import { XMarkIcon } from "@/modules/icons";

import {
  HighlightColorType,
  ReaderFontFamilyType,
  ReaderThemeType,
} from "../../models";

import { FontFamilyPopover } from "./font-family-popover";
import { FontSizePopover } from "./font-size-popover";
// import { HighlightPopover } from "./highlight-popover";
import { LoupeButton } from "./loupe-button";
import { PageIndicator } from "./page-indicator";
import { SearchPopover } from "./search-popover";
import { ThemeToggleButton } from "./theme-toggle-button";
import { ToolbarSeparator } from "./toolbar-separator";

interface IReaderToolbarProps {
  currentPage: number;
  totalPages: number;
  activeHighlightColor: HighlightColorType | null;
  onHighlightColorChange: (color: HighlightColorType | null) => void;
  isHighlightPopoverOpen: boolean;
  onHighlightPopoverOpenChange: (open: boolean) => void;
  isLoupeActive: boolean;
  onToggleLoupe: () => void;
  fontFamily: ReaderFontFamilyType;
  onFontFamilyChange: (font: ReaderFontFamilyType) => void;
  fontSize: number;
  onFontSizeChange: (size: number) => void;
  searchQuery: string;
  onSearchQueryChange: (q: string) => void;
  searchResultsCount: number;
  currentSearchResultIndex: number;
  onPrevSearchResult: () => void;
  onNextSearchResult: () => void;
  theme: ReaderThemeType;
  onThemeChange: (t: ReaderThemeType) => void;
}

export function ReaderToolbar({
  currentPage,
  totalPages,
  // Highlight feature is paused — kept in the props to avoid touching the
  // caller while the JSX below is commented out.
  activeHighlightColor: _activeHighlightColor,
  onHighlightColorChange: _onHighlightColorChange,
  isHighlightPopoverOpen: _isHighlightPopoverOpen,
  onHighlightPopoverOpenChange: _onHighlightPopoverOpenChange,
  isLoupeActive,
  onToggleLoupe,
  fontFamily,
  onFontFamilyChange,
  fontSize,
  onFontSizeChange,
  searchQuery,
  onSearchQueryChange,
  searchResultsCount,
  currentSearchResultIndex,
  onPrevSearchResult,
  onNextSearchResult,
  theme,
  onThemeChange,
}: IReaderToolbarProps) {
  // All popovers anchor against the toolbar pill (not their individual
  // triggers) so every popover opens in the same top-center position with
  // an 8px gap above the toolbar.
  const toolbarRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const t = useTranslations();

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex flex-col items-center gap-2 px-4 sm:bottom-6">
      <PageIndicator currentPage={currentPage} totalPages={totalPages} />

      <div className="flex items-center gap-2">
        <div
          ref={toolbarRef}
          className="pointer-events-auto h-12.5 flex items-center gap-1 rounded-2xl bg-[#000000A3] px-2 py-1.5 shadow-2xl backdrop-blur-md"
        >
          {/* <HighlightPopover
            triggerRef={toolbarRef}
            activeColor={activeHighlightColor}
            onChange={onHighlightColorChange}
            isOpen={isHighlightPopoverOpen}
            onOpenChange={onHighlightPopoverOpenChange}
            theme={theme}
          />

          <ToolbarSeparator /> */}

          <SearchPopover
            triggerRef={toolbarRef}
            searchQuery={searchQuery}
            onSearchQueryChange={onSearchQueryChange}
            searchResultsCount={searchResultsCount}
            currentSearchResultIndex={currentSearchResultIndex}
            onPrevSearchResult={onPrevSearchResult}
            onNextSearchResult={onNextSearchResult}
            theme={theme}
          />

          <ToolbarSeparator />

          <LoupeButton
            active={isLoupeActive}
            onToggle={onToggleLoupe}
            theme={theme}
          />

          <ToolbarSeparator />

          <ThemeToggleButton theme={theme} onChange={onThemeChange} />

          <ToolbarSeparator />

          <FontSizePopover
            triggerRef={toolbarRef}
            fontSize={fontSize}
            onChange={onFontSizeChange}
            theme={theme}
          />

          <ToolbarSeparator />

          <FontFamilyPopover
            triggerRef={toolbarRef}
            fontFamily={fontFamily}
            onChange={onFontFamilyChange}
            theme={theme}
          />
        </div>
        
        <Tooltip delay={0}>
          <Button
            isIconOnly
            aria-label={t("yopish")}
            onClick={() => router.back()}
            className="pointer-events-auto size-11.5 min-w-0 rounded-full bg-[#000000A3] text-white shadow-2xl backdrop-blur-md hover:bg-[#000000c2]"
          >
            <XMarkIcon size={20} />
          </Button>
          <Tooltip.Content
            showArrow
            className={classNames(
              theme === "dark"
                ? "bg-white/90 text-black"
                : "bg-black/80 text-white",
            )}
          >
            <Tooltip.Arrow
              className={
                theme === "dark"
                  ? "[&>svg>path]:fill-white/90"
                  : "[&>svg>path]:fill-black/80"
              }
            />
            <p>{t("ortga_qaytish")}</p>
          </Tooltip.Content>
        </Tooltip>
      </div>
    </div>
  );
}
