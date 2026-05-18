"use client";

import { useTranslations } from "next-intl";

import { useAppSelector } from "@/lib";
import { ConditionalRender } from "@/modules/common";
import { MutolaaIcon } from "@/modules/icons";

import { AuthTabs } from "./tabs";

export function LoginForm() {
  const t = useTranslations();
  const email = useAppSelector(({ auth }) => auth.email);
  const phone = useAppSelector(({ auth }) => auth.phone);
  const method = useAppSelector(({ auth }) => auth.method);
  const isOtpSection = useAppSelector(({ auth }) => auth.step === "otp");

  const displayValue = method === "phone" ? `+998 ${phone}` : email;

  return (
    <div className="flex flex-col items-center">
      {/* Logo */}
      <MutolaaIcon size={56} />

      <h1 className="mt-5 text-xl font-semibold text-gray-900 dark:text-gray-100">
        <ConditionalRender
          if={!isOtpSection}
          else={t(method === "phone" ? "raqam_tasdiqlang" : "pochta_tasdiqlang")}
        >
          {t("mutolaaga_hush_kelibsiz")}
        </ConditionalRender>
      </h1>
      <p className="mt-2 text-center font-medium text-gray-500 dark:text-gray-400">
        <ConditionalRender
          if={!isOtpSection}
          else={t.rich(
            method === "phone"
              ? "otp_raqamga_yuborildi"
              : "otp_pochtaga_yuborildi",
            {
              value: displayValue,
              b: (chunks) => <b>{chunks}</b>,
            },
          )}
        >
          {t("iltimos_shaxsiy_hisobingizga_kirish_uchun")}
        </ConditionalRender>
      </p>

      <AuthTabs />

      {/* <ConditionalRender if={!isOtpSection}>
        <div className="mt-6 flex w-full items-center gap-3">
          <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
          <span className="text-xs text-gray-400">
            {t("yoki_quyidagi_opsiyalar_orqali")}
          </span>
          <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
        </div>

        <div className="mt-6 flex w-full gap-3">
          <button className="flex flex-1 items-center justify-center gap-2 rounded-full border border-gray-200 dark:border-gray-700 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
            <GoogleIcon />
            Google
          </button>
          <button className="flex flex-1 items-center justify-center gap-2 rounded-full border border-gray-200 dark:border-gray-700 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
            <AppleIcon />
            Apple
          </button>
        </div>
      </ConditionalRender> */}
    </div>
  );
}
