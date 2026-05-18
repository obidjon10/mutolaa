import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button, Input, Spinner } from "@heroui/react";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { formatPhone, getApiErrorMessage } from "@/modules/common";

import { setPhone,useSendCode } from "../../";

export const Phone = () => {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const phone = useAppSelector(({ auth }) => auth.phone);
  const { mutate, error, isPending } = useSendCode();

  const onContinue = () => {
    const digits = phone.replace(/\s/g, "");
    if (digits.length !== 9) return;

    mutate({ phone: `+998${digits}` });
  };

  return (
    <div className="mt-4 space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
          {t("telefon_raqami")} <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-2">
          <div className="flex h-9 items-center rounded-xl bg-muted dark:bg-muted-dark px-3 text-sm text-gray-700 dark:text-gray-300">
            +998
          </div>
          <Input
            value={phone}
            onChange={(e) => dispatch(setPhone(formatPhone(e.target.value)))}
            onKeyDown={(e) => e.key === "Enter" && onContinue()}
            placeholder="00 000 00 00"
            className="flex-1 h-9 rounded-xl bg-muted dark:bg-muted-dark shadow-none"
          />
        </div>
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
        className="w-full rounded-full gap-2 bg-brand text-white hover:bg-orange-600"
        size="lg"
        onPress={onContinue}
        isPending={isPending}
        isDisabled={phone.replace(/\s/g, "").length !== 9}
      >
        {isPending ? <Spinner size="sm" color="current" /> : null}
        {t("davom_etish")}
      </Button>
    </div>
  );
};

