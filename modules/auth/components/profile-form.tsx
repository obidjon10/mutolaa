"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Input } from "@heroui/react";

import { useUpdateProfile } from "../hooks";

export const ProfileForm = () => {
  const t = useTranslations();
  const [fullName, setFullName] = useState("");
  const updateProfile = useUpdateProfile();

  const onSubmit = () => {
    if (!fullName.trim()) return;

    updateProfile.mutate({ full_name: fullName.trim() });
  };

  return (
    <div className="mt-4 space-y-5">
      <div className="text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {t("ismingizni_kiriting_tavsif")}
        </p>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
          {t("ism_familiya")} <span className="text-red-500">*</span>
        </label>
        <Input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder={t("ismingizni_kiriting")}
          className="w-full h-9 rounded-xl bg-muted dark:bg-muted-dark shadow-none"
        />
      </div>

      {updateProfile.error && (
        <p className="text-sm text-red-500">{updateProfile.error.message}</p>
      )}

      <Button
        className="w-full rounded-full bg-orange-500 text-white hover:bg-orange-600"
        size="lg"
        onPress={onSubmit}
        isDisabled={!fullName.trim() || updateProfile.isPending}
      >
        {updateProfile.isPending ? t("yuklanmoqda") : t("saqlash")}
      </Button>
    </div>
  );
};
