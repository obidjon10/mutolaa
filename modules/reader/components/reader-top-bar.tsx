"use client";

import { useTranslations } from "next-intl";

import { useRouter } from "@/i18n/navigation";
import { ChevronRightIcon } from "@/modules/icons";

export function ReaderTopBar() {
  const router = useRouter();
  const t = useTranslations();

  return (
    <header className="absolute z-30 px-6">
      <button
        type="button"
        aria-label={t("orqaga")}
        title={t("orqaga")}
        onClick={() => router.back()}
        className="inline-flex cursor-pointer size-10 shrink-0 items-center justify-center rounded-full bg-muted dark:bg-muted-dark transition-colors hover:bg-muted/80 dark:hover:bg-muted-dark/80"
      >
        <ChevronRightIcon size={20} className="rotate-180" />
      </button>
    </header>
  );
}
