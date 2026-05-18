"use client";

import { RefObject } from "react";
import { useTranslations } from "next-intl";
import { Popover } from "@heroui/react";
import classNames from "classnames";

import { FontFamilyIcon } from "@/modules/icons";

import {
  READER_FONT_FAMILIES,
  ReaderFontFamilyType,
  ReaderThemeType,
} from "../../models";
import { ToolbarButton } from "../toolbar-button";

import { CheckIcon, POPOVER_CONTENT_CLS, POPOVER_TITLE_CLS } from "./constants";

interface IFontFamilyPopoverProps {
  triggerRef: RefObject<HTMLDivElement | null>;
  fontFamily: ReaderFontFamilyType;
  onChange: (font: ReaderFontFamilyType) => void;
  theme: ReaderThemeType;
}

export function FontFamilyPopover({
  triggerRef,
  fontFamily,
  onChange,
  theme,
}: IFontFamilyPopoverProps) {
  const t = useTranslations();

  return (
    <Popover.Root>
      <Popover.Trigger>
        <ToolbarButton
          icon={<FontFamilyIcon size={18} />}
          label={t("reader_shrift_turi")}
          theme={theme}
        />
      </Popover.Trigger>
      <Popover.Content
        triggerRef={triggerRef}
        placement="top"
        offset={8}
        className={classNames(POPOVER_CONTENT_CLS, "min-w-55")}
      >
        <Popover.Dialog className="outline-none p-0">
          <div className={POPOVER_TITLE_CLS}>
            {t("reader_shrift_turini_ozgartirish")}
          </div>
          <ul className="flex flex-col">
            {READER_FONT_FAMILIES.map((font) => {
              const selected = font === fontFamily;

              return (
                <li key={font}>
                  <button
                    type="button"
                    onClick={() => onChange(font)}
                    className={classNames(
                      "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
                      selected
                        ? "bg-white/10 text-white"
                        : "text-white/70 hover:bg-white/5 hover:text-white",
                    )}
                  >
                    <span>{font}</span>
                    {selected && <CheckIcon />}
                  </button>
                </li>
              );
            })}
          </ul>
        </Popover.Dialog>
      </Popover.Content>
    </Popover.Root>
  );
}
