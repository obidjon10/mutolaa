import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@heroui/react";
import classNames from "classnames";

import { useAppDispatch } from "@/lib";
import { useAuth } from "@/modules/auth";
import { ConditionalRender, setAuthRequiredModal } from "@/modules/common";
import { RocketIcon } from "@/modules/icons";
import { setPlan } from "@/modules/payment";

import { usePremiumPlans } from "../../hooks";
import { IPremiumPlans } from "../../models";

export const PrivateTab = () => {
  const t = useTranslations();
  const { push } = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAuth();
  const { plans } = usePremiumPlans();

  const onOpenPayment = (plan: IPremiumPlans) => () => {
    if (isAuthenticated) {
      dispatch(setPlan(plan));
      push("/payment");
    } else {
      dispatch(
        setAuthRequiredModal({
          visible: true,
          title: "premiumga_ulanish_uchun_tizimga_kiring",
          incomingPage: "/payment",
        }),
      );
    }
  };

  return (
    <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
      {plans?.map((plan) => (
        <div
          key={plan?.id}
          className={classNames("rounded-3xl p-1 ", {
            "bg-linear-to-br backdrop-blur-[144px] from-[#FFF7E3] dark:from-[#111113] to-[#FD8923]":
              plan?.duration === 12,
            "bg-muted dark:bg-muted-dark": plan?.duration !== 12,
          })}
        >
          <div className="flex items-center gap-2 m-3">
            <p style={{ fontFamily: "Georgia, serif" }} className="text-xl">
              {plan?.name}
            </p>
            <ConditionalRender if={plan?.duration === 12}>
              <div className="bg-white rounded-full p-1.5 flex items-center text-xs gap-0.5 text-brand">
                <RocketIcon /> {Math.floor(plan?.saved_money_percentage)}%
                {t("tejang")}
              </div>
            </ConditionalRender>
          </div>
          <div className="bg-white dark:bg-black rounded-3xl p-3 space-y-4">
            <p className="text-sm">{plan?.description_list?.[0]}</p>
            <div className="flex items-baseline justify-between">
              <div className="flex items-center gap-2">
                <span className="text-4xl font-semibold text-gray-900 dark:text-white">
                  {Math.floor(plan?.monthly_price)?.toLocaleString("ru")}
                </span>
                <span className="text-sm text-gray-500">
                  {t("uzs")} /<br /> {t("oylik")}
                </span>
              </div>
              <ConditionalRender if={plan?.duration === 12}>
                <p className="text-foreground-muted text-sm">
                  {Number(plan?.price)?.toLocaleString("ru")} {t("uzs")}
                </p>
              </ConditionalRender>
            </div>
            <Button
              variant={plan?.duration === 12 ? "primary" : "tertiary"}
              fullWidth
              onClick={onOpenPayment(plan)}
            >
              <ConditionalRender
                if={plan?.duration === 12}
                else={t("sinab_korish")}
              >
                {t("eng_yaxshisini_tanlash")}
              </ConditionalRender>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
