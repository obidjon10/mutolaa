"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button, Separator, Spinner } from "@heroui/react";

import { useAppSelector } from "@/lib";
import { ConditionalRender } from "@/modules/common";

import {
  useCreateOrder,
  useSubscribePremium,
  useTransactionStatus,
} from "../hooks";
import { IPromoCodeResponse, ISubscribePremiumResponse } from "../models";

import { PaymentPendingModal } from "./payment-pending-modal";
import { PaymentResultModal } from "./payment-result-modal";
import { PromoCode } from "./promo-code";

type PaymentStateType = "idle" | "pending" | "success" | "error";

export const TotalSection = () => {
  const t = useTranslations();
  const router = useRouter();

  const plan = useAppSelector(({ payment }) => payment?.plan);
  const activeTab = useAppSelector(({ payment }) => payment.activeTab);
  const provider = useAppSelector(({ payment }) => payment.provider);
  const activeCardId = useAppSelector(({ payment }) => payment.activeCardId);

  const [promo, setPromo] = useState<IPromoCodeResponse | null>(null);
  const [promoCodeText, setPromoCodeText] = useState<string | null>(null);
  const [paymentState, setPaymentState] = useState<PaymentStateType>("idle");
  const [paymentResult, setPaymentResult] =
    useState<ISubscribePremiumResponse | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [pendingOrderId, setPendingOrderId] = useState<number | null>(null);
  const [pendingPaymentUrl, setPendingPaymentUrl] = useState<string | null>(
    null,
  );

  const { mutateAsync: createOrder, isPending: isCreatingOrder } =
    useCreateOrder();
  const { mutateAsync: subscribePremium, isPending: isSubscribing } =
    useSubscribePremium();

  useTransactionStatus(
    pendingOrderId,
    () => {
      setPendingOrderId(null);
      setPaymentState("success");
    },
    () => {
      setPendingOrderId(null);
      setPaymentError(t("tolov_vaqti_tugadi"));
      setPaymentState("error");
    },
  );

  const isSubscribeTab = activeTab === "subscribe";

  const originalPrice = Number(plan?.price);
  const finalPrice =
    isSubscribeTab && promo
      ? originalPrice * (1 - promo.discount_percent / 100)
      : originalPrice;

  const isPending = isCreatingOrder || isSubscribing;
  const canPay = isSubscribeTab
    ? !!activeCardId && !!plan?.id
    : !!provider && !!plan?.id;

  const handlePromoSuccess = (
    res: IPromoCodeResponse,
    encryptedText: string,
  ) => {
    setPromo(res);
    setPromoCodeText(encryptedText);
  };

  const handleError = (err: unknown) => {
    const errorMessage = (
      err as { response?: { data?: { errors?: { message: string }[] } } }
    )?.response?.data?.errors?.[0]?.message;
    setPaymentError(errorMessage as string);
    setPaymentState("error");
  };

  const handlePay = async () => {
    if (!plan?.id || !canPay) return;

    try {
      if (isSubscribeTab) {
        const result = await subscribePremium({
          tariff: plan.id,
          card: activeCardId!,
          ...(promoCodeText && { promo_code_text: promoCodeText }),
        });
        setPaymentResult(result);
        setPaymentState("success");
      } else {
        const { payment_url: paymentUrl, id: orderId } = await createOrder({
          tariff: plan.id,
          provider: provider!,
        });
        window.open(paymentUrl, "_blank");
        setPendingPaymentUrl(paymentUrl);
        setPendingOrderId(orderId);
        setPaymentState("pending");
      }
    } catch (err) {
      handleError(err);
    }
  };

  const handleCloseResult = () => {
    setPaymentState("idle");
    setPaymentResult(null);
    setPaymentError(null);
  };

  const handleClosePending = () => {
    // keep pendingOrderId so polling continues in background
    setPaymentState("idle");
  };

  return (
    <>
      <div className="bg-white dark:bg-black rounded-2xl p-4 mt-8">
        <div className="space-y-2 mb-6 text-sm">
          <div className="flex items-center justify-between">
            <div className="text-foreground-muted">{t("obuna_turi")}:</div>
            <div className="font-medium">{plan?.name}</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-foreground-muted">{t("tolov_summasi")}:</div>
            <div className="flex items-center gap-2">
              <span className="font-medium">
                {Number(plan?.price)?.toLocaleString("ru")} UZS
              </span>
            </div>
          </div>
          <ConditionalRender if={isSubscribeTab && promo}>
            <div className="flex items-center justify-between">
              <div className="text-[#2EAD62]">{t("promokod_chegirma")}:</div>
              <div className="font-medium text-[#2EAD62]">
                -{(originalPrice - finalPrice).toLocaleString("ru")} UZS
              </div>
            </div>
          </ConditionalRender>
          <Separator />
        </div>
        <ConditionalRender if={isSubscribeTab && !promo}>
          <PromoCode onSuccess={handlePromoSuccess} />
        </ConditionalRender>
        <div className="flex items-center gap-6">
          <Button
            size="lg"
            className="flex-1"
            isDisabled={!canPay}
            isPending={isPending}
            onPress={handlePay}
          >
            {({ isPending }) => (
              <>
                <ConditionalRender if={isPending}>
                  <Spinner color="current" size="sm" />
                </ConditionalRender>
                {t("tolov_qilish")}{" "}
              </>
            )}
          </Button>
          <div className="font-semibold text-2xl">
            {finalPrice.toLocaleString("ru")} UZS
          </div>
        </div>
      </div>

      <PaymentPendingModal
        isOpen={paymentState === "pending"}
        paymentUrl={pendingPaymentUrl ?? ""}
        onClose={handleClosePending}
      />

      <PaymentResultModal
        isOpen={paymentState === "success" || paymentState === "error"}
        type={paymentState === "error" ? "error" : "success"}
        planName={plan?.name}
        result={paymentResult}
        errorMessage={paymentError}
        onAction={
          paymentState === "success"
            ? () => router.push("/")
            : handleCloseResult
        }
        onClose={handleCloseResult}
      />
    </>
  );
};
