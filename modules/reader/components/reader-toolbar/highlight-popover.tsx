"use client";

import { RefObject } from "react";
import { useTranslations } from "next-intl";
import { Popover } from "@heroui/react";
import classNames from "classnames";

import { MarkerIcon } from "@/modules/icons";

import {
  HIGHLIGHT_COLORS,
  HighlightColorType,
  ReaderThemeType,
} from "../../models";
import { ToolbarButton } from "../toolbar-button";

import { POPOVER_CONTENT_CLS, POPOVER_TITLE_CLS } from "./constants";

interface IHighlightPopoverProps {
  triggerRef: RefObject<HTMLDivElement | null>;
  activeColor: HighlightColorType | null;
  onChange: (color: HighlightColorType | null) => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  theme: ReaderThemeType;
}

export function HighlightPopover({
  triggerRef,
  activeColor,
  onChange,
  isOpen,
  onOpenChange,
  theme,
}: IHighlightPopoverProps) {
  const t = useTranslations();

  return (
    <Popover.Root isOpen={isOpen} onOpenChange={onOpenChange}>
      <Popover.Trigger>
        <ToolbarButton
          icon={<MarkerIcon />}
          label={t("reader_markerlash")}
          active={Boolean(activeColor)}
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
          <div className={POPOVER_TITLE_CLS}>{t("reader_markerlash")}</div>
          <div className="flex items-center gap-2 px-2 pb-1">
            {(Object.keys(HIGHLIGHT_COLORS) as HighlightColorType[]).map(
              (color) => {
                const isActive = activeColor === color;

                return (
                  <button
                    key={color}
                    type="button"
                    aria-label={color}
                    onClick={() => onChange(isActive ? null : color)}
                    className={classNames(
                      "h-6 w-6 rounded-full cursor-pointer transition-transform",
                      "hover:scale-110",
                      isActive &&
                        "ring-2 ring-white/80 ring-offset-2 ring-offset-[#2A2A2C]",
                    )}
                    style={{ backgroundColor: HIGHLIGHT_COLORS[color] }}
                  />
                );
              },
            )}
          </div>
        </Popover.Dialog>
      </Popover.Content>
    </Popover.Root>
  );
}
