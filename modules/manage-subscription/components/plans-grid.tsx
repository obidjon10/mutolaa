"use client";

import { useTranslations } from "next-intl";
import { Button, Skeleton } from "@heroui/react";

import { ConditionalRender } from "@/modules/common";
import { IPremiumPlans, usePremiumPlans } from "@/modules/premium";

// Figma gradient for the yearly plan card.
const YEARLY_GRADIENT =
  "radial-gradient(324.07% 100% at 50% 0%, #FFC49D 0%, #FFBD9D 36.82%, #FF975B 100%)";

interface IProps {
  activeTariffId: number | null;
  onChange: (tariffId: number) => void;
  isChanging?: boolean;
  changingId?: number | null;
}

export const PlansGrid = ({
  activeTariffId,
  onChange,
  isChanging,
  changingId,
}: IProps) => {
  const { plans, isLoading } = usePremiumPlans();

  if (isLoading) {
    return <PlansGridSkeleton />;
  }

  // Only show the OTHER plan(s) — the user is on activeTariffId already.
  const otherPlans = plans?.filter((plan) => plan.id !== activeTariffId) ?? [];

  return (
    <div className="space-y-4">
      {otherPlans.map((plan) => (
        <PlanCard
          key={plan.id}
          plan={plan}
          isChanging={isChanging && changingId === plan.id}
          onChange={() => onChange(plan.id)}
        />
      ))}
    </div>
  );
};

interface IPlanCardProps {
  plan: IPremiumPlans;
  isChanging?: boolean;
  onChange: () => void;
}

function PlanCard({ plan, isChanging, onChange }: IPlanCardProps) {
  const t = useTranslations();
  const monthlyPrice = Math.floor(plan.monthly_price).toLocaleString("ru");
  const totalPrice = Math.floor(Number(plan.price)).toLocaleString("ru");
  const savedPercentage = Math.floor(plan.saved_money_percentage ?? 0);
  const isYearly = plan.duration === 12;
  const showDiscountBadge = isYearly && savedPercentage > 0;

  return (
    <div
      className="rounded-3xl p-1 bg-muted dark:bg-muted-dark"
      style={isYearly ? { background: YEARLY_GRADIENT } : undefined}
    >
      <div className="flex items-center gap-2 p-3">
        <h3 className="text-xl font-semibold">
         {plan?.name} {t("obuna")?.toLowerCase()}
        </h3>
        <ConditionalRender if={showDiscountBadge}>
          <span className="text-xs py-1 px-2.5 rounded-full bg-brand text-white font-medium">
            -{savedPercentage}% {t("chegirma")}
          </span>
        </ConditionalRender>
      </div>

      <div className="rounded-2xl bg-white dark:bg-black p-3">
        <p className="font-medium">
          {isYearly ? t("uzoq_muddatli_obuna") : t("qisqa_muddatli_obuna")}
        </p>
        <div className="mt-4 flex items-end justify-between">
          <div className="flex items-center gap-2">
            <span className="text-4xl font-bold">{monthlyPrice}</span>
            <span className="text-foreground-muted leading-tight">
              UZS /<br />
              {t("oylik")}
            </span>
          </div>
          <ConditionalRender if={isYearly}>
            <span className="text-xs text-foreground-muted pb-1">
              {totalPrice} UZS
            </span>
          </ConditionalRender>
        </div>
        <Button
          onPress={onChange}
          size="lg"
          isPending={isChanging}
          className="mt-4 w-full rounded-full"
          variant={isYearly ? "primary" : "tertiary"}
        >
          {t("obunani_yangilash")}
        </Button>
      </div>
    </div>
  );
}

// Mirrors a single plan card's layout so swap-in to real data doesn't shift.
export const PlansGridSkeleton = () => (
  <div className="space-y-4">
    <div className="rounded-3xl p-1 bg-muted dark:bg-muted-dark">
      <div className="flex items-center gap-2 p-3">
        <Skeleton className="h-6 w-40 rounded-md" />
      </div>
      <div className="rounded-2xl bg-white dark:bg-black p-3 space-y-4">
        <Skeleton className="h-5 w-44 rounded-md" />
        <div className="flex items-end justify-between">
          <Skeleton className="h-10 w-36 rounded-md" />
          <Skeleton className="h-4 w-20 rounded-md" />
        </div>
        <Skeleton className="h-12 w-full rounded-full" />
      </div>
    </div>
  </div>
);
