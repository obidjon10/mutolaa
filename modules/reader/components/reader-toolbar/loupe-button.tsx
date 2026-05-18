"use client";

import { useTranslations } from "next-intl";

import { LoupeIcon } from "@/modules/icons";

import { ReaderThemeType } from "../../models";
import { ToolbarButton } from "../toolbar-button";

interface ILoupeButtonProps {
  active: boolean;
  onToggle: () => void;
  theme: ReaderThemeType;
}

export function LoupeButton({ active, onToggle, theme }: ILoupeButtonProps) {
  const t = useTranslations();

  return (
    <ToolbarButton
      icon={<LoupeIcon size={40} />}
      label={t("reader_lupa")}
      active={active}
      onClick={onToggle}
      theme={theme}
    />
  );
}
