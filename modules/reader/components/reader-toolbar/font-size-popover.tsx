"use client";

import { RefObject } from "react";
import { useTranslations } from "next-intl";
import { Popover } from "@heroui/react";

import { FontSizeIcon, PlusIcon } from "@/modules/icons";

import {
  READER_FONT_SIZE_MAX,
  READER_FONT_SIZE_MIN,
  READER_FONT_SIZE_STEP,
  ReaderThemeType,
} from "../../models";
import { ToolbarButton } from "../toolbar-button";

import { MinusIcon, POPOVER_CONTENT_CLS, POPOVER_TITLE_CLS } from "./constants";

interface IFontSizePopoverProps {
  triggerRef: RefObject<HTMLDivElement | null>;
  fontSize: number;
  onChange: (size: number) => void;
  theme: ReaderThemeType;
}

export function FontSizePopover({
  triggerRef,
  fontSize,
  onChange,
  theme,
}: IFontSizePopoverProps) {
  const t = useTranslations();

  return (
    <Popover.Root>
      <Popover.Trigger>
        <ToolbarButton
          icon={<FontSizeIcon size={18} />}
          label={t("reader_shrift_olchami")}
          theme={theme}
        />
      </Popover.Trigger>
      <Popover.Content
        triggerRef={triggerRef}
        placement="top"
        offset={8}
        className={POPOVER_CONTENT_CLS}
      >
        <Popover.Dialog className="outline-none p-0">
          <div className={POPOVER_TITLE_CLS}>
            {t("reader_shrift_olchamini_sozlash")}
          </div>
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              aria-label="increase"
              onClick={() =>
                onChange(
                  Math.min(READER_FONT_SIZE_MAX, fontSize + READER_FONT_SIZE_STEP),
                )
              }
              className="flex size-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <PlusIcon />
            </button>
            <span className="min-w-14 text-center text-sm font-medium text-white tabular-nums">
              {fontSize}px
            </span>
            <button
              type="button"
              aria-label="decrease"
              onClick={() =>
                onChange(
                  Math.max(READER_FONT_SIZE_MIN, fontSize - READER_FONT_SIZE_STEP),
                )
              }
              className="flex size-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <MinusIcon size={16} />
            </button>
          </div>
        </Popover.Dialog>
      </Popover.Content>
    </Popover.Root>
  );
}
