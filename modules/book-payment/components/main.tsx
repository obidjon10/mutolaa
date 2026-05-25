"use client";

import { useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { useRouter } from "@/i18n/navigation";
import { useAppDispatch, useAppSelector } from "@/lib";
import { ChevronRightIcon } from "@/modules/icons";

import { useBookPurchaseData, useBookSelection } from "../hooks";
import { findPurchaseItem } from "../models";
import { resetBookPayment } from "../store";

import { CoinSaleCard } from "./coin-sale-card";
import { ItemsCard } from "./items-card";
import { PaymentMethodCard } from "./payment-method-card";
import { BookPaymentSkeleton } from "./skeleton";
import { TotalSection } from "./total-section";

export const Main = () => {
  const t = useTranslations();
  const { back } = useRouter();
  const dispatch = useAppDispatch();
  const { slug } = useParams<{ slug: string }>();
  const { purchaseData, isLoading } = useBookPurchaseData(slug);

  const { isEbookSelected, isAudioSelected } = useBookSelection();
  const isCoinSaleOn = useAppSelector(
    ({ bookPayment }) => bookPayment?.isCoinSaleOn,
  );
  const selectedCoinSaleId = useAppSelector(
    ({ bookPayment }) => bookPayment?.selectedCoinSaleId,
  );
  const activeTab = useAppSelector(
    ({ bookPayment }) => bookPayment?.activeTab,
  );

  const isCoinSaleVisible =
    !!purchaseData?.book?.is_coin_sale_available && activeTab === "card";

  // Reset all transient state on unmount so the next visit starts clean.
  useEffect(() => () => void dispatch(resetBookPayment()), [dispatch]);

  const { finalPrice, originalPrice } = useMemo(() => {
    if (!purchaseData) return { finalPrice: 0, originalPrice: 0 };

    const ebookItem = findPurchaseItem(purchaseData?.purchase_detail, "ebook");
    const audioItem = findPurchaseItem(
      purchaseData?.purchase_detail,
      "audiobook",
    );
    const itemPrice = (item?: typeof ebookItem) => {
      if (!item) return 0;
      return (item?.price?.sale_percentage ?? 0) > 0
        ? (item?.price?.sale_price ?? 0)
        : (item?.price?.original_price ?? 0);
    };

    let subtotal = 0;
    let baseline = 0;
    if (isEbookSelected && isAudioSelected) {
      subtotal = purchaseData?.bundle?.total_sale_price ?? 0;
      baseline = purchaseData?.bundle?.total_price ?? 0;
    } else if (isEbookSelected) {
      subtotal = itemPrice(ebookItem);
      baseline = ebookItem?.price?.original_price ?? 0;
    } else if (isAudioSelected) {
      subtotal = itemPrice(audioItem);
      baseline = audioItem?.price?.original_price ?? 0;
    }

    let final = subtotal;
    if (isCoinSaleVisible && isCoinSaleOn && selectedCoinSaleId) {
      const selected = purchaseData?.coin_sales?.find(
        (s) => s?.id === selectedCoinSaleId,
      );
      if (selected) {
        final = subtotal * (1 - (selected?.discount_percentage ?? 0) / 100);
      }
    }

    return { finalPrice: final, originalPrice: baseline };
  }, [
    purchaseData,
    isEbookSelected,
    isAudioSelected,
    isCoinSaleVisible,
    isCoinSaleOn,
    selectedCoinSaleId,
  ]);

  if (isLoading || !purchaseData) return <BookPaymentSkeleton />;

  const ebookItem = findPurchaseItem(purchaseData?.purchase_detail, "ebook");
  const audioItem = findPurchaseItem(
    purchaseData?.purchase_detail,
    "audiobook",
  );

  return (
    <div className="mx-auto my-4 mr-4 p-6 sm:p-8 min-h-[94.4vh] rounded-2xl bg-white dark:bg-black shadow-card">
      <div
        className="flex items-center gap-3 mb-12 cursor-pointer w-fit"
        onClick={() => back()}
      >
        <div className="bg-muted dark:bg-muted-dark size-12 rounded-full flex items-center justify-center">
          <ChevronRightIcon size={24} className="rotate-180" />
        </div>
        <div>
          <h1 className="text-xl font-semibold">
            {purchaseData?.book?.title}
          </h1>
          <p className="text-foreground-muted text-sm">
            {t("kitob_xarid_qilish")}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-131.5 bg-muted dark:bg-muted-dark rounded-4xl p-6 space-y-3.5">
        <ItemsCard
          ebookPrice={ebookItem?.price}
          audioPrice={audioItem?.price}
          hasEbook={!!ebookItem}
          hasAudio={!!audioItem}
          isEbookPurchased={!!ebookItem?.is_purchased}
          isAudioBookPurchased={!!audioItem?.is_purchased}
        />
        {isCoinSaleVisible && <CoinSaleCard />}
        <PaymentMethodCard />
        <TotalSection
          purchaseData={purchaseData}
          finalPrice={finalPrice}
          originalPrice={originalPrice}
        />
      </div>
    </div>
  );
};
