"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@heroui/react";

import { useRouter } from "@/i18n/navigation";
import type { BookSelectionType } from "@/modules/book-payment";
import { ConditionalRender } from "@/modules/common";

import { IPrice, IPriceTotal } from "../models";

interface IProps {
  slug: string;
  ebookPrice: IPrice;
  audioPrice: IPrice;
  allPrice: IPriceTotal;
  isEBookPurchased: boolean;
  isAudioBookPurchased: boolean;
}

export const BookPrices = ({
  slug,
  allPrice,
  ebookPrice,
  audioPrice,
  isEBookPurchased,
  isAudioBookPurchased,
}: IProps) => {
  const t = useTranslations();
  const router = useRouter();

  const goToPayment = (select: BookSelectionType) =>
    router.push(`/book/${slug}/payment?select=${select}`);

  if (
    (!audioPrice && !ebookPrice) ||
    (isEBookPurchased && isAudioBookPurchased)
  )
    return null;

  return (
    <div className="bg-muted dark:bg-muted-dark flex flex-col divide-y divide-[#E4E4E7] dark:divide-gray-700 rounded-xl p-4 mt-6 max-w-148.5">
      <ConditionalRender if={!isEBookPurchased && !!ebookPrice}>
        <div className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
          <div className="flex items-center gap-4">
            <div className="rounded-lg size-12 relative flex items-center justify-center">
              <Image src="/ebook.webp" alt="EBOOOK" fill sizes="48px" />
            </div>
            <div className="text-sm font-medium">
              <p>{t("elektron_kitob")}</p>
              <div className="flex items-center gap-1.5">
                <p>
                  <ConditionalRender
                    if={ebookPrice?.sale_percentage > 0}
                    else={Math.floor(
                      ebookPrice?.original_price,
                    )?.toLocaleString("ru")}
                  >
                    {Math.floor(ebookPrice?.sale_price)?.toLocaleString("ru")}
                  </ConditionalRender>{" "}
                  UZS
                </p>
                <ConditionalRender if={ebookPrice?.sale_percentage > 0}>
                  <p className="line-through text-xs text-foreground-muted">
                    {Math.floor(ebookPrice?.original_price)?.toLocaleString(
                      "ru",
                    )}{" "}
                    UZS
                  </p>
                </ConditionalRender>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            className="rounded-full text-brand"
            onPress={() => goToPayment("ebook")}
          >
            {t("xarid_qilish")}
          </Button>
        </div>
      </ConditionalRender>
      <ConditionalRender if={!isAudioBookPurchased && !!audioPrice}>
        <div className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
          <div className="flex items-center gap-4">
            <div className="rounded-lg size-12 flex items-center relative justify-center">
              <Image src="/audio.webp" alt="AUDIO" fill sizes="48px" />
            </div>
            <div className="text-sm font-medium">
              <p>{t("audiokitob")}</p>
              <div className="flex items-center gap-1.5">
                <p>
                  <ConditionalRender
                    if={audioPrice?.sale_percentage > 0}
                    else={Math.floor(
                      audioPrice?.original_price,
                    )?.toLocaleString("ru")}
                  >
                    {Math.floor(audioPrice?.sale_price)?.toLocaleString("ru")}
                  </ConditionalRender>{" "}
                  UZS
                </p>
                <ConditionalRender if={audioPrice?.sale_percentage > 0}>
                  <p className="line-through text-xs text-foreground-muted">
                    {Math.floor(audioPrice?.original_price)?.toLocaleString(
                      "ru",
                    )}{" "}
                    UZS
                  </p>
                </ConditionalRender>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            className="rounded-full text-brand"
            onPress={() => goToPayment("audio")}
          >
            {t("xarid_qilish")}
          </Button>
        </div>
      </ConditionalRender>
      <ConditionalRender
        if={
          !isEBookPurchased &&
          !isAudioBookPurchased &&
          !!audioPrice &&
          !!ebookPrice
        }
      >
        <div className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
          <div className="flex items-center gap-4">
            <div className="rounded-lg size-12 relative flex items-center justify-center">
              <Image src="/all.webp" alt="ALL (AUDIO + EBOOK)" fill sizes="48px" />
            </div>
            <div className="text-sm font-medium">
              <p>
                {t(
                  allPrice?.total_sale_price
                    ? "tejamkor_harid"
                    : "elektron_va_audio",
                )}
              </p>
              <div className="flex items-center gap-1.5">
                <p className={allPrice?.total_sale_price ? "text-[#65A30D]" : undefined}>
                  {Math.floor(
                    allPrice?.total_sale_price ?? allPrice?.total_price,
                  )?.toLocaleString("ru")}{" "}
                  UZS
                </p>
                <ConditionalRender if={!!allPrice?.total_sale_price}>
                  <p className="line-through text-xs text-foreground-muted">
                    {Math.floor(allPrice?.total_price)?.toLocaleString("ru")}{" "}
                    UZS
                  </p>
                </ConditionalRender>
              </div>
            </div>
          </div>
          <Button
            variant="primary"
            className="rounded-full bg-[#84CC16] text-white"
            onPress={() => goToPayment("both")}
          >
            {t("xarid_qilish")}
          </Button>
        </div>
      </ConditionalRender>
    </div>
  );
};
