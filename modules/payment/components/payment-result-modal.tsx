"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Button, Modal } from "@heroui/react";
import confetti from "canvas-confetti";

import { ConditionalRender } from "@/modules/common";
import { XMarkIcon } from "@/modules/icons";

import { ISubscribePremiumResponse } from "../models";

interface IPaymentResultModalProps {
  isOpen: boolean;
  type: "success" | "error";
  planName?: string;
  result?: ISubscribePremiumResponse | null;
  errorMessage?: string | null;
  onAction: () => void;
  onClose: () => void;
}

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return [
    String(d.getDate()).padStart(2, "0"),
    String(d.getMonth() + 1).padStart(2, "0"),
    d.getFullYear(),
  ].join("-");
};

const SuccessIcon = () => (
  <div className="size-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600">
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.4881 3.43057C13.8026 3.70014 13.839 4.17361 13.5694 4.48811L7.56944 11.4881C7.43349 11.6467 7.23754 11.7414 7.02878 11.7495C6.82003 11.7575 6.61739 11.6781 6.46967 11.5303L2.96967 8.03034C2.67678 7.73745 2.67678 7.26258 2.96967 6.96968C3.26256 6.67679 3.73744 6.67679 4.03033 6.96968L6.95764 9.89699L12.4306 3.51192C12.7001 3.19743 13.1736 3.161 13.4881 3.43057Z"
        fill="#17C964"
      />
    </svg>
  </div>
);

const ErrorIcon = () => (
  <div className="size-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-500">
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M1 1L13 13M13 1L1 13"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  </div>
);

export const PaymentResultModal = ({
  isOpen,
  type,
  planName,
  result,
  errorMessage,
  onAction,
  onClose,
}: IPaymentResultModalProps) => {
  const t = useTranslations();
  const isSuccess = type === "success";

  useEffect(() => {
    if (isOpen && isSuccess) {
      confetti({
        particleCount: 160,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [isOpen, isSuccess]);

  return (
    <Modal.Root
      isOpen={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog>
            <div className="flex items-start justify-between">
              <ConditionalRender if={isSuccess} else={<ErrorIcon />}>
                <SuccessIcon />
              </ConditionalRender>
              <Modal.CloseTrigger className="flex size-6 items-center justify-center rounded-full bg-gray-100 dark:bg-white/5 text-gray-500 hover:bg-gray-200 dark:hover:bg-white/10">
                <XMarkIcon size={16} />
              </Modal.CloseTrigger>
            </div>

            <h2 className="mt-4 font-semibold text-lg">
              {isSuccess ? t("tolov_muvaffaqiyatli") : t("xatolik_yuz_berdi")}
            </h2>

            <div className="mt-2 text-sm text-foreground-muted space-y-0.5">
              {isSuccess ? (
                <>
                  <p>
                    {t("siz_rejaga_obuna_boldingiz", {
                      plan: planName as string,
                    })}
                  </p>
                  {result?.next_payment_time && (
                    <p>
                      {t("keyingi_tolov_sanasi", {
                        date: formatDate(result.next_payment_time),
                      })}
                    </p>
                  )}
                </>
              ) : (
                <p>{errorMessage}</p>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <Button
                onPress={onAction}
                className={
                  isSuccess
                    ? "bg-brand text-white hover:bg-orange-600 rounded-full"
                    : "rounded-full"
                }
                variant={isSuccess ? undefined : "tertiary"}
              >
                {isSuccess ? t("asosiyga_qaytish") : t("yopish")}
              </Button>
            </div>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal.Root>
  );
};
