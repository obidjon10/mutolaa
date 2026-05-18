"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button, InputOTP, Modal } from "@heroui/react";

import { XMarkIcon } from "@/modules/icons";

import { IUserCard, useVerifyCard } from "../";

const OTP_LENGTH = 6;
const SLOTS_CLASSNAME =
  "h-10 w-9 rounded-xl bg-muted dark:bg-muted-dark text-xl font-semibold text-center data-active:border-orange-500 dark:data-active:border-orange-500 shadow-none";

interface ICardOtpModalProps {
  isOpen: boolean;
  cardId: number | null;
  phone: string;
  onSuccess: (card: IUserCard) => void;
  onClose: () => void;
}

export const CardOtpModal = ({
  isOpen,
  cardId,
  phone,
  onSuccess,
  onClose,
}: ICardOtpModalProps) => {
  const t = useTranslations();
  const [otp, setOtp] = useState("");
  const { mutate: verifyCard, isPending, error } = useVerifyCard();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (value: string) => {
    setOtp(value);
    setErrorMessage(null);
    if (value.length === OTP_LENGTH && !isPending && cardId) {
      verifyCard(
        { user_card_id: cardId, verification_code: value },
        {
          onSuccess: (data) => onSuccess(data.user_card),
          onError: (err: any) => {
            const message = err?.response?.data?.errors?.[0]?.message ?? null;
            setErrorMessage(message);
          },
        },
      );
    }
  };

  const handleConfirm = () => {
    if (otp.length !== OTP_LENGTH || !cardId) return;
    verifyCard(
      { user_card_id: cardId, verification_code: otp },
      {
        onSuccess: (data) => onSuccess(data.user_card),
        onError: (err: any) => {
          const message = err?.response?.data?.errors?.[0]?.message ?? null;
          setErrorMessage(message);
        },
      },
    );
  };

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
            {isOpen && (
              <div>
                <div className="flex items-start justify-between">
                  <h2 className="font-semibold">{t("karta_tasdiqlash")}</h2>
                  <Modal.CloseTrigger className="flex size-6 items-center justify-center rounded-full bg-gray-100 dark:bg-white/5 text-gray-500 hover:bg-gray-200 dark:hover:bg-white/10">
                    <XMarkIcon size={16} />
                  </Modal.CloseTrigger>
                </div>
                <p className="mt-1 text-sm text-foreground-muted">
                  {t.rich("otp_raqamga_yuborildi", {
                    value: phone,
                    b: (chunks) => <b>{chunks}</b>,
                  })}
                </p>

                <div className="mt-5 flex justify-center">
                  {/* <InputOTP
                    maxLength={OTP_LENGTH}
                    value={otp}
                    onChange={handleChange}
                    isInvalid={!!error}
                    autoFocus
                  >
                    <InputOTP.Group className="gap-2">
                      {Array.from({ length: OTP_LENGTH }).map((_, idx) => (
                        <InputOTP.Slot
                          // eslint-disable-next-line react/no-array-index-key
                          key={idx}
                          index={idx}
                          className="h-10 w-9 rounded-xl bg-muted dark:bg-muted-dark text-xl font-semibold text-center data-active:border-orange-500 dark:data-active:border-orange-500 shadow-none"
                        />
                      ))}
                    </InputOTP.Group>
                  </InputOTP> */}
                  <InputOTP
                    autoFocus
                    value={otp}
                    maxLength={6}
                    isInvalid={!!error}
                    onChange={handleChange}
                  >
                    <InputOTP.Group>
                      <InputOTP.Slot className={SLOTS_CLASSNAME} index={0} />
                      <InputOTP.Slot className={SLOTS_CLASSNAME} index={1} />
                      <InputOTP.Slot className={SLOTS_CLASSNAME} index={2} />
                    </InputOTP.Group>
                    <InputOTP.Separator />
                    <InputOTP.Group>
                      <InputOTP.Slot className={SLOTS_CLASSNAME} index={3} />
                      <InputOTP.Slot className={SLOTS_CLASSNAME} index={4} />
                      <InputOTP.Slot className={SLOTS_CLASSNAME} index={5} />
                    </InputOTP.Group>
                  </InputOTP>
                </div>

                {errorMessage && (
                  <p className="mt-2 text-center text-sm text-red-500">
                    {errorMessage}
                  </p>
                )}

                <div className="mt-6 flex justify-end gap-3">
                  <Button
                    variant="tertiary"
                    onPress={onClose}
                    className="rounded-full"
                  >
                    {t("bekor_qilish")}
                  </Button>
                  <Button
                    onPress={handleConfirm}
                    isDisabled={otp.length !== OTP_LENGTH || isPending}
                    className="rounded-full bg-orange-500 text-white hover:bg-orange-600"
                  >
                    {isPending ? t("yuklanmoqda") : t("tasdiqlash")}
                  </Button>
                </div>
              </div>
            )}
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal.Root>
  );
};
