"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Input, Modal, toast } from "@heroui/react";

import { getApiErrorMessage } from "@/modules/common";
import { EnvelopeIcon, XMarkIcon } from "@/modules/icons";

import { useChangeEmail, useSendChangeEmailCode } from "../hooks";

import { ChangeOtpStep } from "./change-otp-step";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  currentEmail?: string;
}

interface IContentProps {
  currentEmail: string;
  onClose: () => void;
}

type StepType = "input" | "otp";

const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const EditEmailContent = ({ currentEmail, onClose }: IContentProps) => {
  const t = useTranslations();
  const [step, setStep] = useState<StepType>("input");
  const [email, setEmail] = useState("");
  const [session, setSession] = useState("");

  const {
    mutate: sendCode,
    isPending: isSending,
    error: sendError,
  } = useSendChangeEmailCode();
  const {
    mutate: confirm,
    isPending: isConfirming,
    error: confirmError,
  } = useChangeEmail();

  const onSendCode = () => {
    if (!isValidEmail(email)) return;

    sendCode(
      { email },
      {
        onSuccess: (data) => {
          setSession(data?.session);
          setStep("otp");
        },
        onError: (err) =>
          toast.danger(getApiErrorMessage(err, t("xatolik_yuz_berdi"))),
      },
    );
  };

  const onConfirm = (code: string) => {
    confirm(
      { email, code, session },
      {
        onSuccess: () => onClose(),
        onError: (err) =>
          toast.danger(getApiErrorMessage(err, t("xatolik_yuz_berdi"))),
      },
    );
  };

  const isOtpStep = step === "otp";

  return (
    <div>
      <div className="flex items-start justify-between">
        <div className="flex size-10 items-center justify-center rounded-full bg-gray-100 dark:bg-white/5">
          <EnvelopeIcon />
        </div>
        <Modal.CloseTrigger className="flex size-6 items-center justify-center rounded-full bg-gray-100 dark:bg-white/5 text-gray-500 hover:bg-gray-200 dark:hover:bg-white/10">
          <XMarkIcon size={16} />
        </Modal.CloseTrigger>
      </div>

      <h2 className="mt-5 font-semibold text-gray-900 dark:text-white">
        {isOtpStep
          ? t("yangi_e_pochtani_tasdiqlang")
          : t("e_pochtani_ozgartirish")}
      </h2>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        {isOtpStep &&
          t.rich("otp_pochtaga_yuborildi", {
            value: email,
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
          <Input
            type="email"
            fullWidth
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={currentEmail || "example@mail.com"}
            className="mt-1 h-9 rounded-xl bg-muted dark:bg-muted-dark shadow-none"
          />
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
              isDisabled={!isValidEmail(email) || isSending}
              className="rounded-full bg-orange-500 text-white hover:bg-orange-600"
            >
              {isSending ? t("yuklanmoqda") : t("e_pochtani_tasdiqlash")}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export const EditEmailModal = ({
  isOpen,
  onClose,
  currentEmail = "",
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
            <EditEmailContent currentEmail={currentEmail} onClose={onClose} />
          ) : null}
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  </Modal.Root>
);
