"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button, InputOTP, Spinner, toast } from "@heroui/react";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getApiErrorMessage } from "@/modules/common";

import { getDeviceId } from "../utils/get-device-id";
import { setStep, useLogin, useSendCode } from "../";

const RESEND_COUNTDOWN_SECONDS = 120;

const formatCountdown = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

export const OtpForm = () => {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const { push } = useRouter();
  const phone = useAppSelector(({ auth }) => auth.phone);
  const email = useAppSelector(({ auth }) => auth.email);
  const method = useAppSelector(({ auth }) => auth.method);
  const session = useAppSelector(({ auth }) => auth.session);
  const incomingPage = useAppSelector(({ auth }) => auth.incomingPage);
  const [otp, setOtp] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(RESEND_COUNTDOWN_SECONDS);
  const [isNavigating, startTransition] = useTransition();
  const { mutate, error, isPending } = useLogin();
  const { mutate: resendCode, isPending: isResending } = useSendCode();

  const isBusy = isPending || isNavigating;

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timeoutId = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timeoutId);
  }, [secondsLeft]);

  const onResend = () => {
    const params =
      method === "phone"
        ? { phone: `+998${phone.replace(/\s/g, "")}` }
        : { email };

    resendCode(params, {
      onSuccess: () => setSecondsLeft(RESEND_COUNTDOWN_SECONDS),
      onError: (err) => {
        toast.danger(err?.message || t("xatolik_yuz_berdi"));
      },
    });
  };

  const verify = (code: string) => {
    if (code.length !== 4 || isBusy) return;

    mutate(
      {
        ...(method === "phone"
          ? { phone: `+998${phone.replace(/\s/g, "")}` }
          : { email }),
        device_id: getDeviceId(),
        code,
        session,
      },
      {
        onSuccess: (data) => {
          if (data.created) {
            dispatch(setStep("profile"));
            return;
          }
          startTransition(() => {
            push(incomingPage || "/");
          });
        },
      },
    );
  };

  const onOtpChange = (value: string) => {
    setOtp(value);
    if (value.length === 4) {
      verify(value);
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
      <div className="flex justify-center mb-1">
        <InputOTP
          maxLength={4}
          value={otp}
          onChange={onOtpChange}
          isInvalid={!!error}
          autoFocus
        >
          <InputOTP.Group className="gap-3">
            <InputOTP.Slot
              index={0}
              className="h-10 w-9.5 shadow-none rounded-xl bg-muted dark:bg-muted-dark text-xl font-semibold text-center data-active:border-orange-500 dark:data-active:border-orange-500"
            />
            <InputOTP.Slot
              index={1}
              className="h-10 w-9.5 shadow-none rounded-xl bg-muted dark:bg-muted-dark text-xl font-semibold text-center data-active:border-orange-500 dark:data-active:border-orange-500"
            />
            <InputOTP.Slot
              index={2}
              className="h-10 w-9.5 shadow-none rounded-xl bg-muted dark:bg-muted-dark text-xl font-semibold text-center data-active:border-orange-500 dark:data-active:border-orange-500"
            />
            <InputOTP.Slot
              index={3}
              className="h-10 w-9.5 shadow-none rounded-xl bg-muted dark:bg-muted-dark text-xl font-semibold text-center data-active:border-orange-500 dark:data-active:border-orange-500"
            />
          </InputOTP.Group>
        </InputOTP>
      </div>
      <div className="flex items-center justify-center gap-1.25 text-sm px-1 pt-1">
        <p className="text-foreground-muted">{t("sms_xabar_kelmadimi")}</p>
        <button
          type="button"
          onClick={onResend}
          disabled={secondsLeft > 0 || isResending}
          className="text-foreground font-medium underline disabled:no-underline disabled:text-foreground-muted disabled:cursor-not-allowed"
        >
          {resendLabel}
        </button>
      </div>

      {error && (
        <p className="text-center text-sm text-red-500">
          {getApiErrorMessage(error)}
        </p>
      )}

      <div className="space-y-3">
        <Button
          className="w-full rounded-full gap-2 bg-orange-500 text-white hover:bg-orange-600"
          size="lg"
          onPress={() => verify(otp)}
          isPending={isBusy}
          isDisabled={otp.length !== 4}
        >
          {isBusy ? <Spinner size="sm" color="current" /> : null}
          {t("tasdiqlash")}
        </Button>
        <Button
          size="lg"
          fullWidth
          variant="tertiary"
          className="text-orange-500"
          onPress={() => dispatch(setStep("input"))}
        >
          {method === "phone"
            ? "Boshqa telefon raqam kiritish"
            : "Boshqa elektron pochta kiritish"}
        </Button>
      </div>
    </div>
  );
};
