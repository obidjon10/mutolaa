"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Spinner, toast } from "@heroui/react";
import { useQueryClient } from "@tanstack/react-query";

import { Link, useRouter } from "@/i18n/navigation";
import { useAppSelector } from "@/lib";
import type { IBookDetail } from "@/modules/book-detail";
import { ConditionalRender } from "@/modules/common";
import { useTransactionStatus } from "@/modules/payment";
import { PaymentPendingModal } from "@/modules/payment/components/payment-pending-modal";

import {
  useBookOrderCreate,
  useBookSelection,
  usePurchaseBook,
} from "../hooks";

interface IProps {
  bookDetail: IBookDetail;
  finalPrice: number;
}

export const TotalSection = ({ bookDetail, finalPrice }: IProps) => {
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
      router.push(`/book/${bookDetail.slug}`);
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
      book: bookDetail.id,
      ebook: isEbookSelected ? (bookDetail.ebook?.id ?? null) : null,
      audiobook: isAudioSelected ? (bookDetail.audiobook?.id ?? null) : null,
    };

    try {
      if (isCardTab) {
        await purchaseBook({
          ...basePayload,
          coin_sale:
            bookDetail.is_coin_sale_available && isCoinSaleOn
              ? selectedCoinSaleId
              : null,
          card: activeCardId!,
        });
        toast.success(t("tolov_muvaffaqiyatli"));
        router.push(`/book/${bookDetail.slug}`);
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
        <p className="text-sm text-foreground font-medium mb-6">
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
          <div className="font-semibold text-2xl whitespace-nowrap">
            {Math.floor(finalPrice).toLocaleString("ru")} UZS
          </div>
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
