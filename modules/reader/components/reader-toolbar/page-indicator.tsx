"use client";

import { useTranslations } from "next-intl";

interface IPageIndicatorProps {
  currentPage: number;
  totalPages: number;
}

export function PageIndicator({ currentPage, totalPages }: IPageIndicatorProps) {
  const t = useTranslations();

  if (totalPages <= 0) return null;

  return (
    <div className="pointer-events-auto flex items-center gap-2 rounded-full bg-[#000000A3] px-4 py-2 text-xs text-white shadow-xl backdrop-blur-md">
      <span className="tabular-nums">
        {t("reader_sahifa", { current: currentPage, total: totalPages })}
      </span>
    </div>
  );
}
