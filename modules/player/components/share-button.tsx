"use client";

import { useCallback } from "react";
import { useLocale, useTranslations } from "next-intl";
import classNames from "classnames";

import { useShare } from "@/modules/common";
import { ShareIcon } from "@/modules/icons";

import { useAudioTrack } from "../context";

interface IProps {
  className?: string;
}

export const ShareButton = ({ className = "" }: IProps) => {
  const t = useTranslations();
  const locale = useLocale();
  const track = useAudioTrack();
  const { share } = useShare();

  const onShare = useCallback(async () => {
    if (!track?.slug) return;

    const url = `${window.location.origin}/${locale}/book/${track.slug}`;

    await share({
      url,
      title: track.title,
    });
  }, [track, locale, share]);

  const disabled = !track?.slug;

  return (
    <button
      type="button"
      onClick={onShare}
      disabled={disabled}
      aria-label={t("ulashish")}
      className={classNames(
        "inline-flex cursor-pointer items-center justify-center rounded-full transition-colors",
        "hover:text-brand",
        disabled && "opacity-40 cursor-not-allowed hover:text-current",
        className,
      )}
    >
      <ShareIcon />
    </button>
  );
};
