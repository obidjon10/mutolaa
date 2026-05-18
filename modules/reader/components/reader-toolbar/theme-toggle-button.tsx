"use client";

import { useTranslations } from "next-intl";

import { MoonIcon, SunIcon } from "@/modules/icons";

import { ReaderThemeType } from "../../models";
import { ToolbarButton } from "../toolbar-button";

interface IThemeToggleButtonProps {
  theme: ReaderThemeType;
  onChange: (t: ReaderThemeType) => void;
}

export function ThemeToggleButton({ theme, onChange }: IThemeToggleButtonProps) {
  const t = useTranslations();
  const isDark = theme === "dark";

  return (
    <ToolbarButton
      icon={isDark ? <SunIcon size={16} /> : <MoonIcon size={16} />}
      label={isDark ? t("reader_yorug_rejim") : t("reader_qorongu_rejim")}
      active={isDark}
      onClick={() => onChange(isDark ? "light" : "dark")}
      theme={theme}
    />
  );
}
