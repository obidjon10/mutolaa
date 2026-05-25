"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Switch, toast } from "@heroui/react";
import classNames from "classnames";

import { useTheme } from "@/lib/theme";
import { useAuth, useProfile } from "@/modules/auth";
import { ConditionalRender, useConfirm } from "@/modules/common";
import {
  BiligCoinIcon,
  CalendarIcon,
  CircleQuestionIcon,
  CopyTransparentIcon,
  CreditCardIcon,
  CrownIcon,
  LogoutIcon,
  MoonIcon,
  PersonIcon,
  ReceiptIcon,
} from "@/modules/icons";

import { ProfileRow } from "./profile-row";
import { ProfileSection } from "./profile-section";

const COPY_ID_LIMIT = 3;

export const ProfilePage = () => {
  const t = useTranslations();
  const { push } = useRouter();
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth();
  const confirm = useConfirm();

  const onLogout = () =>
    confirm({
      title: t("tizimdan_chiqishni_xohlaysizmi"),
      description: t("tizimdan_chiqish_tavsifi"),
      confirmText: t("tizimdan_chiqish"),
      type: "delete",
      onConfirm: () => {
        logout();
        push("/");
      },
    });

  const { data: user } = useProfile(isAuthenticated);
  const [copyIdCount, setCopyIdCount] = useState(0);

  const onCopyId = () => {
    if (!user?.id) return;
    if (copyIdCount >= COPY_ID_LIMIT) {
      toast.info(t("shuncha_nusxalaganingiz_yetmadimi"));
      return;
    }
    navigator.clipboard
      .writeText(String(user.id))
      .then(() => {
        setCopyIdCount((c) => c + 1);
        toast.success(t("id_nusxalandi"));
      })
      .catch(() => toast.danger(t("xatolik_yuz_berdi")));
  };

  return (
    <div className="bg-white dark:bg-black px-4 my-4 mr-4 rounded-2xl py-6 sm:px-8 sm:py-8">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
        {t("sozlamalar")}
      </h1>
      <p className="mt-1 text-gray-500 dark:text-gray-400">
        {t("hisobingizni_sozlang")}
      </p>
      <div className="mx-auto max-w-110 py-4">
        <div className="bg-muted dark:bg-muted-dark rounded-3xl p-3 flex items-center gap-6">
          <div
            className={classNames("size-16.5 relative shrink-0 rounded-full", {
              "p-0.5 bg-[linear-gradient(136.25deg,#F12711_-1.37%,#F5AF19_100.91%)]":
                user?.is_premium,
            })}
          >
            <div className="relative size-full rounded-full overflow-hidden">
              <Image
                fill
                sizes="66px"
                alt={user?.full_name || "USER NAME"}
                src={user?.avatar || "/profile.webp"}
                className="object-cover"
              />
            </div>
            <ConditionalRender if={user?.is_premium}>
              <div className="absolute bottom-0 -right-0.5 text-white size-6 flex items-center justify-center rounded-full bg-[linear-gradient(94.61deg,#F12711_-50%,#F5AF19_162.5%)]">
                <CrownIcon size={16} />
              </div>
            </ConditionalRender>
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-base font-semibold line-clamp-1">
              {user?.full_name}
            </p>
            <button
              type="button"
              onClick={onCopyId}
              className="mt-0.5 inline-flex cursor-pointer items-center gap-1 text-sm text-foreground-muted hover:text-gray-700 dark:hover:text-gray-200"
            >
              <span>ID: {user?.id}</span>
              <CopyTransparentIcon size={14} />
            </button>
            <div className="mt-0.5 flex items-center gap-1 text-sm text-gray-900 dark:text-white">
              <BiligCoinIcon size={16} />
              <span className="font-medium">
                {user?.coin_amount?.toLocaleString("ru") ?? 0}
              </span>
            </div>
          </div>
        </div>

        <ProfileSection title={t("shaxsiy_hisob")}>
          <ProfileRow
            icon={<PersonIcon />}
            label={t("shaxsiy_malumotlar")}
            value={t("foydalanuvchi_malumotlari")}
            onClick={() => push("/profile/personal")}
            hasArrow
            isLast
          />
        </ProfileSection>

        <ProfileSection title={t("tolov")}>
          <ProfileRow
            hasArrow
            icon={<CreditCardIcon />}
            label={t("saqlangan_kartalar")}
            onClick={() => push("/saved-cards")}
          />
          <ProfileRow
            hasArrow
            isLast={!user?.show_manage_subscription}
            icon={<ReceiptIcon />}
            label={t("tolov_tarixi")}
            onClick={() => push("/transaction-history")}
          />
          <ConditionalRender if={user?.show_manage_subscription}>
            <ProfileRow
              isLast
              hasArrow
              icon={<CalendarIcon />}
              label={t("obuna_boshqaruvi")}
              onClick={() => push("/manage-subscription")}
            />
          </ConditionalRender>
        </ProfileSection>

        <ProfileSection title={t("tizim")}>
          <ProfileRow
            icon={<MoonIcon size={16} />}
            label={t("tungi_rejim")}
            isLast
            trailing={
              <Switch
                size="sm"
                isSelected={theme === "dark"}
                onChange={toggleTheme}
              >
                <Switch.Control>
                  <Switch.Thumb />
                </Switch.Control>
              </Switch>
            }
          />
        </ProfileSection>

        <ProfileSection title={t("yordam_va_malumot")}>
          <ProfileRow
            isLast
            hasArrow
            icon={<CircleQuestionIcon />}
            onClick={() => push("/terms")}
            label={t("foydalanish_shartlari")}
          />
        </ProfileSection>

        <button
          type="button"
          onClick={onLogout}
          className="flex items-center gap-3 mt-6 cursor-pointer group"
        >
          <div className="size-9 rounded-full flex items-center justify-center transition-colors bg-muted dark:bg-muted-dark group-hover:text-red-500">
            <LogoutIcon />
          </div>
          <div className="underline font-medium text-sm group-hover:text-red-500 transition-colors">
            {t("tizimdan_chiqish")}
          </div>
        </button>
      </div>
    </div>
  );
};
