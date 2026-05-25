"use client";

import { useTranslations } from "next-intl";
import { Button, Skeleton } from "@heroui/react";

import { ConditionalRender } from "@/modules/common";
import {
  CalendarIcon,
  CircleExclamationIcon,
  ClockArrowRotateLeftIcon,
  CreditCardIcon,
  TriangleExclamationIcon,
} from "@/modules/icons";

import { SUBSCRIPTION_STATUS } from "../constants";
import { ISubscriptionDetail } from "../models";
import { daysUntil, formatPeriodDate, getDateParts } from "../utils";

interface IProps {
  subscription: ISubscriptionDetail;
  onCancelClick: () => void;
  onCardClick: () => void;
  onHistoryClick: () => void;
  onRestoreClick: () => void;
  onPayClick: () => void;
  isRestoring?: boolean;
  isPaying?: boolean;
}

type ViewType = "active" | "canceled" | "retry";

const resolveView = (subscription: ISubscriptionDetail): ViewType => {
  if (subscription.status === SUBSCRIPTION_STATUS.CANCELED) return "canceled";
  if (subscription.status === SUBSCRIPTION_STATUS.AWAITING_RETRY)
    return "retry";
  return "active";
};

export const SubscriptionCard = ({
  subscription,
  onCancelClick,
  onCardClick,
  onHistoryClick,
  onRestoreClick,
  onPayClick,
  isRestoring,
  isPaying,
}: IProps) => {
  const t = useTranslations();
  const view = resolveView(subscription);
  const isYearly = subscription.tariff.duration === 12;

  // Canceled subs display the validity-period end date (how long they retain
  // access); active/retry subs display the next-payment date.
  const displayDate =
    view === "canceled"
      ? (subscription.periods?.subscription_validity_period?.date_time ??
        subscription.end_time)
      : (subscription.periods?.next_payment_period?.date_time ??
        subscription.end_time);
  const formattedDate = formatPeriodDate(displayDate);
  const remainingDays = daysUntil(displayDate);
  const startParts = getDateParts(subscription.start_time);

  return (
    <div
      className="rounded-3xl bg-muted dark:bg-muted-dark p-2"
      style={
        isYearly
          ? {
              background:
                "radial-gradient(324.07% 100% at 50% 0%, #FFC49D 0%, #FFBD9D 36.82%, #FFA774 100%)",
            }
          : undefined
      }
    >
      <div className="mb-3 pt-2 pl-2 space-y-1">
        <h2 className="text-2xl font-bold">
          {subscription?.tariff?.name} {t("obuna")?.toLowerCase()}
        </h2>
        {startParts && (
          <p className="text-sm">
            {t("mutolaa_premium_faollashtirilgan", {
              day: startParts.day,
              month: startParts.month,
              year: startParts.year,
            })}
          </p>
        )}
      </div>

      <div className="rounded-2xl bg-white dark:bg-black p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-foreground-muted">{t("obuna")}</p>
            <p className="mt-1 text-xl font-semibold">
              {Math.floor(Number(subscription.tariff.price)).toLocaleString(
                "ru",
              )}{" "}
              UZS
            </p>
          </div>

          <ConditionalRender if={view === "active"}>
            <Button
              size="sm"
              onClick={onCancelClick}
              className="rounded-full bg-[#FF383C26] text-[#FF383C] font-medium text-sm"
            >
              {t("bekor_qilish")}
            </Button>
          </ConditionalRender>

          <ConditionalRender if={view === "canceled"}>
            <span className="text-sm text-brand inline-flex items-center gap-1">
              <CircleExclamationIcon className="text-brand" />
              {t("vaqtinchalik_ishlayapti")}
            </span>
          </ConditionalRender>

          <ConditionalRender if={view === "retry"}>
            <span className="text-sm text-red-500 inline-flex items-center gap-1">
              <CircleExclamationIcon className="text-red-500" />
              {t("kartada_mablag_yetarli_emas")}
            </span>
          </ConditionalRender>
        </div>

        <div className="my-5 h-px bg-[#E4E4E7] dark:bg-[#27272A]" />

        <div className="flex items-start justify-between">
          <div>
            <p className="text-foreground-muted">
              {view === "canceled"
                ? t("obuna_yakunlanish_sanasi")
                : t("keyingi_tolov_sanasi")}
            </p>
            <p className="mt-1 text-xl font-semibold">{formattedDate}</p>
          </div>

          <ConditionalRender if={view === "active"}>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-brand">
              <CalendarIcon className="text-brand" />
              {t("n_kun_qoldi", { days: remainingDays })}
            </span>
          </ConditionalRender>
        </div>

        <ConditionalRender if={view === "retry"}>
          <div className="mt-4 rounded-2xl bg-muted dark:bg-muted-dark p-3 flex items-center gap-3">
            <div className="flex items-start gap-2">
              <TriangleExclamationIcon className="shrink-0 text-[#F5A524] mt-0.5" />
              <div className="flex-1 text-sm">
                <p className="font-medium text-[#F5A524]">
                  {t("n_kun_ichida_tolovni_amalga_oshiring", {
                    days: subscription.cancel_remaining_day ?? 0,
                  })}
                </p>
                <p className="text-foreground-muted">
                  {t("aks_holda_obunangiz_bekor_qilinadi")}
                </p>
              </div>
            </div>
            <Button
              size="md"
              isPending={isPaying}
              className="rounded-full"
              onPress={onPayClick}
            >
              {t("tolov_qilish")}
            </Button>
          </div>
        </ConditionalRender>

        <ConditionalRender if={view === "canceled"}>
          <Button
            size="lg"
            isPending={isRestoring}
            onPress={onRestoreClick}
            className="mt-4 w-full bg-[#4ADE80] text-white rounded-full"
          >
            {t("obunani_tiklash")}
          </Button>
        </ConditionalRender>

        <ConditionalRender if={view === "active"}>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Button
              type="button"
              onClick={onCardClick}
              className="rounded-full bg-muted dark:bg-muted-dark w-full text-base font-medium text-brand"
            >
              <CreditCardIcon className="text-brand" size={20} />
              {subscription.card?.card_number ?? "—"}
            </Button>
            <Button
              type="button"
              onClick={onHistoryClick}
              className="rounded-full bg-muted dark:bg-muted-dark w-full text-base font-medium text-brand"
            >
              <ClockArrowRotateLeftIcon size={20} className="text-brand" />
              {t("tarix")}
            </Button>
          </div>
        </ConditionalRender>
      </div>
    </div>
  );
};

// Mirrors SubscriptionCard's layout so the loading state doesn't shift
// position when real data arrives.
export const SubscriptionCardSkeleton = () => (
  <div className="rounded-3xl bg-muted dark:bg-muted-dark p-2">
    <div className="mb-3 pt-2 pl-2 space-y-2">
      <Skeleton className="h-7 w-40 rounded-md" />
      <Skeleton className="h-4 w-64 rounded-md" />
    </div>
    <div className="rounded-2xl bg-white dark:bg-black p-4">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-4 w-16 rounded-md" />
          <Skeleton className="h-6 w-32 rounded-md" />
        </div>
        <Skeleton className="h-8 w-24 rounded-full" />
      </div>
      <div className="my-5 h-px bg-[#E4E4E7] dark:bg-[#27272A]" />
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-4 w-36 rounded-md" />
          <Skeleton className="h-6 w-32 rounded-md" />
        </div>
        <Skeleton className="h-5 w-24 rounded-md" />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <Skeleton className="h-10 rounded-full" />
        <Skeleton className="h-10 rounded-full" />
      </div>
    </div>
  </div>
);
