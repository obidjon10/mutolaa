"use client";

import { useCallback } from "react";
import { useTranslations } from "next-intl";
import { toast } from "@heroui/react";

interface IProps {
  url: string;
  title?: string;
}

export const useShare = () => {
  const t = useTranslations();

  const share = useCallback(
    async ({ url, title }: IProps) => {
      const sharedText = title ? `${url}\n${title}` : url;
      const shareData: ShareData = {
        title,
        text: sharedText,
        url,
      };

      if (typeof navigator !== "undefined" && navigator.share) {
        try {
          await navigator.share(shareData);
          return;
        } catch (err) {
          // User cancelled or share failed; fall back to clipboard only if not
          // an explicit abort.
          if ((err as Error).name === "AbortError") return;
        }
      }

      try {
        await navigator.clipboard.writeText(url);
        toast.success(t("havola_nusxalandi"));
      } catch {
        toast.danger(t("ulashishning_iloji_bolmadi"));
      }
    },
    [t],
  );

  return { share };
};
