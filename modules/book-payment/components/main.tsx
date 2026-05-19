"use client";

import { useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { useRouter } from "@/i18n/navigation";
import { useAppDispatch, useAppSelector } from "@/lib";
import { type IPrice,useBookDetail } from "@/modules/book-detail";
import { ChevronRightIcon } from "@/modules/icons";

import { useBookSelection, useCoinSales } from "../hooks";
import { resetBookPayment } from "../store";

import { CoinSaleCard } from "./coin-sale-card";
import { ItemsCard } from "./items-card";
import { PaymentMethodCard } from "./payment-method-card";
import { BookPaymentSkeleton } from "./skeleton";
import { TotalSection } from "./total-section";

const itemPrice = (price?: IPrice) => {
  if (!price) return 0;
  return price.sale_percentage > 0 ? price.sale_price : price.original_price;
};

export const Main = () => {
  const t = useTranslations();
  const { back } = useRouter();
  const dispatch = useAppDispatch();
  const { slug } = useParams<{ slug: string }>();
  const { bookDetail, isLoading } = useBookDetail(slug);

  const { isEbookSelected, isAudioSelected } = useBookSelection();
  const { coinSales } = useCoinSales();
  const isCoinSaleOn = useAppSelector(
    ({ bookPayment }) => bookPayment.isCoinSaleOn,
  );
  const selectedCoinSaleId = useAppSelector(
    ({ bookPayment }) => bookPayment.selectedCoinSaleId,
  );
  const activeTab = useAppSelector(({ bookPayment }) => bookPayment.activeTab);

  const isCoinSaleVisible =
    !!bookDetail?.is_coin_sale_available && activeTab === "card";

  // Reset all transient state on unmount so the next visit starts clean.
  useEffect(() => () => void dispatch(resetBookPayment()), [dispatch]);

  const finalPrice = useMemo(() => {
    if (!bookDetail) return 0;

    let subtotal = 0;
    if (isEbookSelected && isAudioSelected) {
      subtotal = bookDetail.price?.total_sale_price ?? 0;
    } else if (isEbookSelected) {
      subtotal = itemPrice(bookDetail.ebook?.price);
    } else if (isAudioSelected) {
      subtotal = itemPrice(bookDetail.audiobook?.price);
    }

    if (isCoinSaleVisible && isCoinSaleOn && selectedCoinSaleId) {
      const selected = coinSales.find((s) => s.id === selectedCoinSaleId);
      if (selected) {
        return subtotal * (1 - selected.discount_percentage / 100);
      }
    }

    return subtotal;
  }, [
    bookDetail,
    isEbookSelected,
    isAudioSelected,
    isCoinSaleVisible,
    isCoinSaleOn,
    selectedCoinSaleId,
    coinSales,
  ]);

  if (isLoading || !bookDetail) return <BookPaymentSkeleton />;

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
          <h1 className="text-xl font-semibold">{bookDetail.title}</h1>
          <p className="text-foreground-muted text-sm">
            {t("kitob_xarid_qilish")}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-131.5 bg-muted dark:bg-muted-dark rounded-4xl p-6 space-y-3.5">
        <ItemsCard
          ebookPrice={bookDetail.ebook?.price}
          audioPrice={bookDetail.audiobook?.price}
          hasEbook={bookDetail.has_ebook}
          hasAudio={bookDetail.has_audiobook}
          isEbookPurchased={
            bookDetail.user_book_rights?.is_ebook_purchased
          }
          isAudioBookPurchased={
            bookDetail.user_book_rights?.is_audiobook_purchased
          }
        />
        {isCoinSaleVisible && <CoinSaleCard />}
        <PaymentMethodCard />
        <TotalSection bookDetail={bookDetail} finalPrice={finalPrice} />
      </div>
    </div>
  );
};
