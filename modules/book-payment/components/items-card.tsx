"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@heroui/react";

import type { IPrice } from "@/modules/book-detail";
import { ConditionalRender } from "@/modules/common";
import { TrashIcon } from "@/modules/icons";

import { useBookSelection } from "../hooks";

type ItemKindType = "ebook" | "audio";

interface IItemRowProps {
  kind: ItemKindType;
  price: IPrice;
  isSelected: boolean;
  isPurchased: boolean;
  onToggle: (value: boolean) => void;
}

const ITEM_CONFIG: Record<
  ItemKindType,
  { labelKey: string; image: string; alt: string }
> = {
  ebook: { labelKey: "elektron_kitob", image: "/ebook.webp", alt: "EBOOK" },
  audio: { labelKey: "audiokitob", image: "/audio.webp", alt: "AUDIO" },
};

const ItemRow = ({
  kind,
  price,
  isSelected,
  isPurchased,
  onToggle,
}: IItemRowProps) => {
  const t = useTranslations();
  const config = ITEM_CONFIG[kind];
  const showSalePrice = price?.sale_percentage > 0;
  const displayPrice = showSalePrice ? price.sale_price : price?.original_price;

  return (
    <div className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
      <div className="flex items-center gap-3">
        <div className="rounded-lg size-12 relative flex items-center justify-center shrink-0">
          <Image src={config.image} alt={config.alt} fill sizes="48px" />
        </div>
        <div className="text-sm">
          <p className="text-sm font-medium mb-1">{t(config.labelKey)}</p>
          <div className="flex items-center gap-1.5">
            <p className="font-semibold">
              {Math.floor(displayPrice ?? 0).toLocaleString("ru")} UZS
            </p>
            <ConditionalRender if={showSalePrice}>
              <p className="line-through text-xs text-foreground-muted">
                {Math.floor(price?.original_price)?.toLocaleString("ru")} UZS
              </p>
            </ConditionalRender>
          </div>
        </div>
      </div>
      <ConditionalRender
        if={isSelected}
        else={
          !isPurchased && (
            <Button
              variant="tertiary"
              size="sm"
              className="rounded-full text-brand"
              onPress={() => onToggle(true)}
            >
              {t("qoshimcha_xarid")}
            </Button>
          )
        }
      >
        <button
          type="button"
          aria-label={t("ochirish")}
          onClick={() => onToggle(false)}
          className="text-[#EF4444] cursor-pointer hover:text-[#DC2626] transition-colors p-2 -m-2"
        >
          <TrashIcon size={20} />
        </button>
      </ConditionalRender>
    </div>
  );
};

interface IProps {
  ebookPrice?: IPrice;
  audioPrice?: IPrice;
  hasEbook: boolean;
  hasAudio: boolean;
  isEbookPurchased: boolean;
  isAudioBookPurchased: boolean;
}

export const ItemsCard = ({
  ebookPrice,
  audioPrice,
  hasEbook,
  hasAudio,
  isEbookPurchased,
  isAudioBookPurchased,
}: IProps) => {
  const { isEbookSelected, isAudioSelected, setEbookSelected, setAudioSelected } =
    useBookSelection();

  const showEbookRow = hasEbook && !isEbookPurchased && !!ebookPrice;
  const showAudioRow = hasAudio && !isAudioBookPurchased && !!audioPrice;

  if (!showEbookRow && !showAudioRow) return null;

  return (
    <div className="bg-white dark:bg-black rounded-2xl p-4 divide-y divide-[#E4E4E7] dark:divide-[#27272A]">
      {showEbookRow && (
        <ItemRow
          kind="ebook"
          price={ebookPrice!}
          isSelected={isEbookSelected}
          isPurchased={isEbookPurchased}
          onToggle={setEbookSelected}
        />
      )}
      {showAudioRow && (
        <ItemRow
          kind="audio"
          price={audioPrice!}
          isSelected={isAudioSelected}
          isPurchased={isAudioBookPurchased}
          onToggle={setAudioSelected}
        />
      )}
    </div>
  );
};
