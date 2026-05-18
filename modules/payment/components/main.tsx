"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Tabs } from "@heroui/react";

import { useAppDispatch, useAppSelector } from "@/lib";
import { ConditionalRender } from "@/modules/common";
import { ChevronRightIcon } from "@/modules/icons";
import { usePremiumPlans } from "@/modules/premium";

import { type PaymentTabType, setActiveTab, setPlan } from "../store";

import { OneTimePayment } from "./one-time-payment";
import { Plans, PlansSkeleton } from "./plans";
import { Subscribe } from "./subscribe";
import { TotalSection } from "./total-section";

export const Main = () => {
  const t = useTranslations();
  const { push } = useRouter();
  const dispatch = useAppDispatch();
  const { plans, isLoading } = usePremiumPlans();
  const hasPlan = useAppSelector(({ payment }) => payment?.plan?.id);

  useEffect(() => {
    if (!hasPlan && !isLoading) {
      dispatch(setPlan(plans?.[0]));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plans, isLoading, hasPlan]);

  return (
    <div className="mx-auto my-4 mr-4 p-6 sm:p-8 rounded-2xl bg-white dark:bg-black shadow-card">
      <div
        className="flex items-center gap-3 mb-8 cursor-pointer"
        onClick={() => push("/premium")}
      >
        <div className="bg-muted dark:bg-muted-dark size-12 rounded-full flex items-center justify-center">
          <ChevronRightIcon size={24} className="rotate-180" />
        </div>
        <div>
          <h1 className="text-xl font-semibold">
            {t("mutolaa_premiumga_obuna_bo‘lish")}
          </h1>
          <p className="text-foreground-muted">
            {t("cheksiz_audio_ai_suhbat_offline_rejim_va_boshqa_imtiyozlar")}
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-131.5 mt-24 mb-18 bg-muted dark:bg-muted-dark rounded-3xl p-5">
        <div className="flex items-center gap-3">
          <ConditionalRender
            if={!isLoading}
            else={["monthly", "yearly"].map((k) => (
              <PlansSkeleton key={k} />
            ))}
          >
            {plans?.map((plan) => (
              <Plans key={plan?.id} plan={plan} />
            ))}
          </ConditionalRender>
        </div>

        <Tabs
          className="mt-8"
          variant="secondary"
          onSelectionChange={(key) =>
            dispatch(setActiveTab(key as PaymentTabType))
          }
        >
          <Tabs.ListContainer>
            <Tabs.List aria-label="Options">
              <Tabs.Tab id="subscribe">
                {t("obuna_bolish")}
                <Tabs.Indicator />
              </Tabs.Tab>
              <Tabs.Tab id="one_time_payment">
                {t("bir_marta_tolash")}
                <Tabs.Indicator />
              </Tabs.Tab>
            </Tabs.List>
          </Tabs.ListContainer>
          <Tabs.Panel className="pt-8 px-0" id="subscribe">
            <Subscribe />
          </Tabs.Panel>
          <Tabs.Panel className="pt-8" id="one_time_payment">
            <OneTimePayment />
          </Tabs.Panel>
        </Tabs>

        <TotalSection />
      </div>
    </div>
  );
};
