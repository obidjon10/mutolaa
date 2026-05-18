"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Button, InputOTP } from "@heroui/react";

const RESEND_COUNTDOWN_SECONDS = 120;
const OTP_LENGTH = 4;

const formatCountdown = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

interface IProps {
  errorMessage?: string;
  isConfirming: boolean;
  isResending: boolean;
  onCancel: () => void;
  onResend: () => void;
  onConfirm: (code: string) => void;
}

export const ChangeOtpStep = ({
  errorMessage,
  isConfirming,
  isResending,
  onCancel,
  onResend,
  onConfirm,
}: IProps) => {
  const t = useTranslations();
  const [otp, setOtp] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(RESEND_COUNTDOWN_SECONDS);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timeoutId = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timeoutId);
  }, [secondsLeft]);

  const handleResend = () => {
    setSecondsLeft(RESEND_COUNTDOWN_SECONDS);
    onResend();
  };

  const handleConfirm = () => {
    if (otp.length === OTP_LENGTH) onConfirm(otp);
  };

  const handleChange = (value: string) => {
    setOtp(value);
    if (value.length === OTP_LENGTH && !isConfirming) {
      onConfirm(value);
    }
  };

  let resendLabel = t("qayta_yuborish");
  if (secondsLeft > 0) {
    resendLabel = `${t("qayta_yuborish")} (${formatCountdown(secondsLeft)})`;
  } else if (isResending) {
    resendLabel = t("yuklanmoqda");
  }

  return (
    <div className="mt-4 space-y-5">
      <div className="flex justify-center">
        <InputOTP
          maxLength={OTP_LENGTH}
          value={otp}
          onChange={handleChange}
          isInvalid={!!errorMessage}
          autoFocus
        >
          <InputOTP.Group className="gap-3">
            {Array.from({ length: OTP_LENGTH }).map((_, idx) => (
              <InputOTP.Slot
                // eslint-disable-next-line react/no-array-index-key
                key={idx}
                index={idx}
                className="h-10 w-9.5 rounded-xl bg-muted dark:bg-muted-dark text-xl font-semibold text-center data-active:border-orange-500 dark:data-active:border-orange-500 shadow-none"
              />
            ))}
          </InputOTP.Group>
        </InputOTP>
      </div>

      <div className="flex items-center justify-center gap-1.5 text-sm">
        <p className="text-gray-500 dark:text-gray-400">
          {t("sms_xabar_kelmadimi")}
        </p>
        <button
          type="button"
          onClick={handleResend}
          disabled={secondsLeft > 0 || isResending}
          className="font-medium text-gray-900 dark:text-white underline disabled:no-underline disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          {resendLabel}
        </button>
      </div>

      {errorMessage ? (
        <p className="text-center text-sm text-red-500">{errorMessage}</p>
      ) : null}

      <div className="flex justify-end gap-3 pt-2">
        <Button variant="tertiary" onPress={onCancel} className="rounded-full">
          {t("bekor_qilish")}
        </Button>
        <Button
          onPress={handleConfirm}
          isDisabled={otp.length !== OTP_LENGTH || isConfirming}
          className="rounded-full bg-orange-500 text-white hover:bg-orange-600"
        >
          {isConfirming ? t("yuklanmoqda") : t("tasdiqlash")}
        </Button>
      </div>
    </div>
  );
};
