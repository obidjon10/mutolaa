"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@heroui/react";

import { ConditionalRender } from "@/modules/common";

import { IPrice, IPriceTotal } from "../models";

interface IProps {
  ebookPrice: IPrice;
  audioPrice: IPrice;
  allPrice: IPriceTotal;
  isEBookPurchased: boolean;
  isAudioBookPurchased: boolean;
}

export const BookPrices = ({
  allPrice,
  ebookPrice,
  audioPrice,
  isEBookPurchased,
  isAudioBookPurchased,
}: IProps) => {
  const t = useTranslations();

  if (
    (!audioPrice && !ebookPrice) ||
    (isEBookPurchased && isAudioBookPurchased)
  )
    return null;

  return (
    <div className="bg-muted dark:bg-muted-dark flex flex-col divide-y divide-[#E4E4E7] dark:divide-gray-700 rounded-xl p-4 mt-6 max-w-148.5">
      <ConditionalRender if={!isEBookPurchased}>
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
          <Button variant="ghost" className="rounded-full text-brand">
            {t("xarid_qilish")}
          </Button>
        </div>
      </ConditionalRender>
      <ConditionalRender if={!isAudioBookPurchased}>
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
          <Button variant="ghost" className="rounded-full text-brand">
            {t("xarid_qilish")}
          </Button>
        </div>
      </ConditionalRender>
      <ConditionalRender
        if={
          (!!audioPrice && !!ebookPrice) ||
          (!isEBookPurchased && !isAudioBookPurchased)
        }
      >
        <div className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
          <div className="flex items-center gap-4">
            <div className="rounded-lg size-12 relative flex items-center justify-center">
              <Image src="/all.webp" alt="ALL (AUDIO + EBOOK)" fill sizes="48px" />
            </div>
            <div className="text-sm font-medium">
              <p>{t("tejamkor_harid")}</p>
              <div className="flex items-center gap-1.5">
                <p className="text-[#65A30D]">
                  {Math.floor(allPrice?.total_price)?.toLocaleString("ru")} UZS
                </p>
              </div>
            </div>
          </div>
          <Button
            variant="primary"
            className="rounded-full bg-[#84CC16] text-white"
          >
            {t("xarid_qilish")}
          </Button>
        </div>
      </ConditionalRender>
    </div>
  );
};
