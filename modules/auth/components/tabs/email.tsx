import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button, Input, Spinner } from "@heroui/react";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getApiErrorMessage } from "@/modules/common";

import { setEmail, useSendCode } from "../../";

export const Email = () => {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const email = useAppSelector(({ auth }) => auth.email);
  const { mutate, error, isPending } = useSendCode();

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const onContinue = () => {
    if (!isValidEmail) return;

    mutate({ email });
  };

  return (
    <div className="mt-4 space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
          {t("elektron_pochta")} <span className="text-red-500">*</span>
        </label>
        <Input
          type="email"
          value={email}
          placeholder="hudhud@mutolaa.com"
          onChange={(e) => dispatch(setEmail(e.target.value))}
          onKeyDown={(e) => e.key === "Enter" && onContinue()}
          className="w-full h-9 rounded-xl bg-muted dark:bg-muted-dark shadow-none"
        />
      </div>

      {error && <p className="text-sm text-red-500">{getApiErrorMessage(error)}</p>}

      <p className="text-xs text-gray-500 dark:text-gray-400">
        {t("davom_etish_orqali_siz")}{" "}
        <Link
          href="/terms"
          className="text-blue-500 underline hover:text-blue-600"
        >
          {t("foydalanish_qoidalariga")}
        </Link>{" "}
        {t("rozilik_bildirgan_bolasiz")}
      </p>

      <Button
        className="w-full rounded-full gap-2"
        size="lg"
        onPress={onContinue}
        isPending={isPending}
        isDisabled={!isValidEmail}
      >
        {isPending ? <Spinner size="sm" color="current" /> : null}
        {t("davom_etish")}
      </Button>
    </div>
  );
};
