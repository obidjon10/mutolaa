"use client";

import { RefObject } from "react";
import { useTranslations } from "next-intl";
import { Popover } from "@heroui/react";
import classNames from "classnames";

import { ChevronRightIcon, SearchIcon } from "@/modules/icons";

import { ReaderThemeType } from "../../models";
import { ToolbarButton } from "../toolbar-button";

import { POPOVER_CONTENT_CLS, POPOVER_TITLE_CLS } from "./constants";

interface ISearchPopoverProps {
  triggerRef: RefObject<HTMLDivElement | null>;
  searchQuery: string;
  onSearchQueryChange: (q: string) => void;
  searchResultsCount: number;
  currentSearchResultIndex: number;
  onPrevSearchResult: () => void;
  onNextSearchResult: () => void;
  theme: ReaderThemeType;
}

export function SearchPopover({
  triggerRef,
  searchQuery,
  onSearchQueryChange,
  searchResultsCount,
  currentSearchResultIndex,
  onPrevSearchResult,
  onNextSearchResult,
  theme,
}: ISearchPopoverProps) {
  const t = useTranslations();
  const showResultsRow = searchQuery.trim().length >= 2;

  return (
    <Popover.Root>
      <Popover.Trigger>
        <ToolbarButton
          icon={<SearchIcon width={17} height={17} />}
          label={t("reader_kitob_ichida_qidirish")}
          active={Boolean(searchQuery)}
          theme={theme}
        />
      </Popover.Trigger>
      <Popover.Content
        triggerRef={triggerRef}
        placement="top"
        offset={8}
        className={classNames(POPOVER_CONTENT_CLS, "min-w-[260px]")}
      >
        <Popover.Dialog className="outline-none p-0">
          <div className={POPOVER_TITLE_CLS}>
            {t("reader_kitob_ichida_qidirish")}
          </div>
          <div className="px-1 pb-1">
            <div className="flex h-9 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3">
              <input
                autoFocus
                value={searchQuery}
                onChange={(e) => onSearchQueryChange(e.target.value)}
                placeholder={t("reader_kalit_sozni_kiriting")}
                className="flex-1 bg-transparent text-sm text-white placeholder:text-white/40 outline-none"
              />
              <SearchIcon
                width={14}
                height={14}
                className="shrink-0 text-white/60"
              />
            </div>

            {showResultsRow && (
              <div className="mt-2 flex items-center justify-between gap-2 px-1">
                <span className="text-xs text-white/60 tabular-nums">
                  {searchResultsCount > 0
                    ? `${currentSearchResultIndex + 1}/${searchResultsCount}`
                    : t("reader_hech_natija_topilmadi")}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    aria-label={t("reader_oldingi_natija")}
                    onClick={onPrevSearchResult}
                    disabled={searchResultsCount === 0}
                    className="flex h-7 w-7 items-center justify-center rounded-full text-white/80 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <ChevronRightIcon size={14} className="rotate-180" />
                  </button>
                  <button
                    type="button"
                    aria-label={t("reader_keyingi_natija")}
                    onClick={onNextSearchResult}
                    disabled={searchResultsCount === 0}
                    className="flex h-7 w-7 items-center justify-center rounded-full text-white/80 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <ChevronRightIcon size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </Popover.Dialog>
      </Popover.Content>
    </Popover.Root>
  );
}
