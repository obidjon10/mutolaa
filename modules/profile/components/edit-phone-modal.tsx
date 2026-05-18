"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Input, Modal } from "@heroui/react";

import { formatPhone, getApiErrorMessage } from "@/modules/common";
import { SmartphoneIcon, XMarkIcon } from "@/modules/icons";

import { useChangePhone, useSendChangePhoneCode } from "../hooks";

import { ChangeOtpStep } from "./change-otp-step";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  currentPhone?: string;
}

interface IContentProps {
  currentPhone: string;
  onClose: () => void;
}

type StepType = "input" | "otp";

const PHONE_LENGTH = 9;

const EditPhoneContent = ({ currentPhone, onClose }: IContentProps) => {
  const t = useTranslations();
  const [step, setStep] = useState<StepType>("input");
  const [phone, setPhone] = useState("");
  const [session, setSession] = useState("");

  const {
    mutate: sendCode,
    isPending: isSending,
    error: sendError,
  } = useSendChangePhoneCode();
  const {
    mutate: confirm,
    isPending: isConfirming,
    error: confirmError,
  } = useChangePhone();

  const fullPhone = `+998${phone.replace(/\s/g, "")}`;
  const isValidPhone = phone.replace(/\s/g, "").length === PHONE_LENGTH;

  const onSendCode = () => {
    if (!isValidPhone) return;

    sendCode(
      { phone: fullPhone },
      {
        onSuccess: (data) => {
          setSession(data?.session);
          setStep("otp");
        },
      },
    );
  };

  const onConfirm = (code: string) => {
    confirm(
      { phone: fullPhone, code, session },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  const isOtpStep = step === "otp";

  return (
    <div>
      <div className="flex items-start justify-between">
        <div className="flex size-10 items-center justify-center rounded-full bg-gray-100 dark:bg-white/5">
          <SmartphoneIcon />
        </div>
        <Modal.CloseTrigger className="flex size-6 items-center justify-center rounded-full bg-gray-100 dark:bg-white/5 text-gray-500 hover:bg-gray-200 dark:hover:bg-white/10">
          <XMarkIcon size={16} />
        </Modal.CloseTrigger>
      </div>

      <h2 className="mt-5 font-semibold text-gray-900 dark:text-white">
        {isOtpStep
          ? t("yangi_telefon_raqamni_tasdiqlang")
          : t("telefon_raqamni_ozgartirish")}
      </h2>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        {isOtpStep &&
          t.rich("otp_raqamga_yuborildi", {
            value: fullPhone,
            b: (chunks) => <b>{chunks}</b>,
          })}
      </p>

      {isOtpStep ? (
        <ChangeOtpStep
          errorMessage={getApiErrorMessage(confirmError)}
          isConfirming={isConfirming}
          isResending={isSending}
          onCancel={onClose}
          onResend={onSendCode}
          onConfirm={onConfirm}
        />
      ) : (
        <>
          <div className="mt-1 flex gap-2">
            <div className="flex h-9 items-center rounded-xl bg-muted dark:bg-muted-dark px-3 text-sm text-gray-700 dark:text-gray-300">
              +998
            </div>
            <Input
              value={phone}
              onChange={(e) => setPhone(formatPhone(e.target.value))}
              placeholder={
                currentPhone
                  ? formatPhone(currentPhone.slice(4))
                  : "00 000 00 00"
              }
              className="flex-1 h-9 rounded-xl bg-muted dark:bg-muted-dark shadow-none"
              autoFocus
            />
          </div>
          {sendError ? (
            <p className="mt-2 text-sm text-red-500">
              {getApiErrorMessage(sendError)}
            </p>
          ) : null}

          <div className="mt-6 flex justify-end gap-3">
            <Button
              variant="tertiary"
              onPress={onClose}
              className="rounded-full"
            >
              {t("bekor_qilish")}
            </Button>
            <Button
              onPress={onSendCode}
              isDisabled={!isValidPhone || isSending}
              className="rounded-full bg-orange-500 text-white hover:bg-orange-600"
            >
              {isSending ? t("yuklanmoqda") : t("telefon_raqamni_tasdiqlash")}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export const EditPhoneModal = ({
  isOpen,
  onClose,
  currentPhone = "",
}: IProps) => (
  <Modal.Root
    isOpen={isOpen}
    onOpenChange={(open) => {
      if (!open) onClose();
    }}
  >
    <Modal.Backdrop>
      <Modal.Container>
        <Modal.Dialog>
          {isOpen ? (
            <EditPhoneContent currentPhone={currentPhone} onClose={onClose} />
          ) : null}
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  </Modal.Root>
);
