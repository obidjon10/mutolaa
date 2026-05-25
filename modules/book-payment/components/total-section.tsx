"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Spinner, toast } from "@heroui/react";
import { useQueryClient } from "@tanstack/react-query";

import { Link, useRouter } from "@/i18n/navigation";
import { useAppSelector } from "@/lib";
import { ConditionalRender } from "@/modules/common";
import { useTransactionStatus } from "@/modules/payment";
import { PaymentPendingModal } from "@/modules/payment/components/payment-pending-modal";

import {
  useBookOrderCreate,
  useBookSelection,
  usePurchaseBook,
} from "../hooks";
import { findPurchaseItem, type IBookPurchaseData } from "../models";

interface IProps {
  purchaseData: IBookPurchaseData;
  finalPrice: number;
  originalPrice: number;
}

export const TotalSection = ({
  purchaseData,
  finalPrice,
  originalPrice,
}: IProps) => {
  const { book } = purchaseData;
  const ebookItem = findPurchaseItem(purchaseData?.purchase_detail, "ebook");
  const audioItem = findPurchaseItem(
    purchaseData?.purchase_detail,
    "audiobook",
  );
  const hasDiscount = originalPrice > finalPrice;
  const t = useTranslations();
  const router = useRouter();
  const queryClient = useQueryClient();

  const activeTab = useAppSelector(({ bookPayment }) => bookPayment.activeTab);
  const provider = useAppSelector(({ bookPayment }) => bookPayment.provider);
  const activeCardId = useAppSelector(
    ({ bookPayment }) => bookPayment.activeCardId,
  );
  const isCoinSaleOn = useAppSelector(
    ({ bookPayment }) => bookPayment.isCoinSaleOn,
  );
  const selectedCoinSaleId = useAppSelector(
    ({ bookPayment }) => bookPayment.selectedCoinSaleId,
  );

  const { isEbookSelected, isAudioSelected, isEmpty } = useBookSelection();

  const [pendingPaymentUrl, setPendingPaymentUrl] = useState<string | null>(
    null,
  );
  const [pendingOrderId, setPendingOrderId] = useState<number | null>(null);

  useTransactionStatus(
    pendingOrderId,
    () => {
      setPendingOrderId(null);
      setPendingPaymentUrl(null);
      toast.success(t("tolov_muvaffaqiyatli"));
      queryClient.invalidateQueries({ queryKey: ["book-detail"] });
      // Replace (not push) so the back button skips the payment page
      // and returns the user to wherever they came from before /book-payment.
      router.replace(`/book/${book.slug}`);
    },
    () => {
      setPendingOrderId(null);
      setPendingPaymentUrl(null);
      toast.danger(t("tolov_vaqti_tugadi"));
    },
    "bookorder",
  );

  const { mutateAsync: purchaseBook, isPending: isPurchasing } =
    usePurchaseBook();
  const { mutateAsync: createOrder, isPending: isCreatingOrder } =
    useBookOrderCreate();

  const isPending = isPurchasing || isCreatingOrder;
  const isCardTab = activeTab === "card";

  const canPay =
    !isEmpty &&
    (isCardTab ? !!activeCardId : !!provider) &&
    (!isCoinSaleOn || !!selectedCoinSaleId);

  const handleError = (err: unknown) => {
    const message =
      (err as { response?: { data?: { errors?: { message: string }[] } } })
        ?.response?.data?.errors?.[0]?.message ?? t("xatolik_yuz_berdi");
    toast.danger(message);
  };

  const handlePay = async () => {
    if (!canPay) return;

    const basePayload = {
      book: book.id,
      ebook: isEbookSelected ? (ebookItem?.id ?? null) : null,
      audiobook: isAudioSelected ? (audioItem?.id ?? null) : null,
    };

    try {
      if (isCardTab) {
        await purchaseBook({
          ...basePayload,
          coin_sale:
            book.is_coin_sale_available && isCoinSaleOn
              ? selectedCoinSaleId
              : null,
          card: activeCardId!,
        });
        toast.success(t("tolov_muvaffaqiyatli"));
        router.replace(`/book/${book.slug}`);
        queryClient.invalidateQueries({ queryKey: ["book-detail"] });
      } else {
        const { payment_url: paymentUrl, id: orderId } = await createOrder({
          ...basePayload,
          provider: provider!,
        });
        window.open(paymentUrl, "_blank");
        setPendingPaymentUrl(paymentUrl);
        setPendingOrderId(orderId);
      }
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-black rounded-2xl p-4">
        <p className="text-sm text-foreground dark:text-white font-medium mb-6">
          {t.rich("oferta_warning", {
            link: (chunks) => (
              <Link
                href="/terms"
                className="text-brand underline underline-offset-2"
              >
                {chunks}
              </Link>
            ),
          })}
        </p>
        <div className="flex items-center gap-4">
          <div className="flex items-baseline gap-2 whitespace-nowrap">
            <span className="font-semibold text-2xl">
              {Math.floor(finalPrice).toLocaleString("ru")} UZS
            </span>
            {hasDiscount && (
              <span className="text-sm font-medium line-through text-[#EF4444]">
                {Math.floor(originalPrice).toLocaleString("ru")} UZS
              </span>
            )}
          </div>
          <Button
            size="lg"
            className="flex-1 rounded-full"
            isDisabled={!canPay}
            isPending={isPending}
            onPress={handlePay}
          >
            {({ isPending: pending }) => (
              <>
                <ConditionalRender if={pending}>
                  <Spinner color="current" size="sm" />
                </ConditionalRender>
                {t("sotib_olish")}
              </>
            )}
          </Button>
        </div>
      </div>

      <PaymentPendingModal
        isOpen={!!pendingPaymentUrl}
        paymentUrl={pendingPaymentUrl ?? ""}
        onClose={() => setPendingPaymentUrl(null)}
      />
    </>
  );
};
