"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@heroui/react";

import { LibraryBooksIcon } from "@/modules/icons";

export const NotAuthSection = () => {
  const t = useTranslations();
  const { push } = useRouter();

  return (
    <div className="flex flex-col items-center h-[87vh] justify-center py-24 text-center">
      <div className="size-24 rounded-full bg-muted dark:bg-muted-dark flex items-center justify-center mb-6">
        <LibraryBooksIcon size={44} className="text-[#A1A1AA]" />
      </div>
      <h2 className="text-xl font-semibold">
        {t("mutolaa_qilish_uchun_tizimga_kiring")}
      </h2>
      <p className="mt-3 text-sm text-foreground-muted max-w-xs mx-auto">
        {t("tizimga_kirish_uchun_tavsif")}
      </p>
      <Button
        className="mt-8 bg-brand text-white px-8"
        onPress={() => push("/login")}
      >
        {t("kirish")}
      </Button>
    </div>
  );
};
