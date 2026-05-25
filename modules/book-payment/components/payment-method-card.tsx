"use client";

import { useTranslations } from "next-intl";
import { Tabs } from "@heroui/react";

import { useAppDispatch, useAppSelector } from "@/lib";

import type { BookPaymentTabType } from "../models";
import { setBookPaymentActiveTab } from "../store";

import { Providers } from "./providers";
import { SavedCard } from "./saved-card";

export const PaymentMethodCard = () => {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector(
    ({ bookPayment }) => bookPayment.activeTab,
  );

  return (
    <div className="bg-white dark:bg-black rounded-2xl p-4">
      <h3 className="font-semibold text-xl">{t("tolov_usuli")}</h3>

      <Tabs
        className="mt-3"
        variant="secondary"
        selectedKey={activeTab}
        onSelectionChange={(key) =>
          dispatch(setBookPaymentActiveTab(key as BookPaymentTabType))
        }
      >
        <Tabs.ListContainer>
          <Tabs.List aria-label={t("tolov_usuli")}>
            <Tabs.Tab
              id="card"
              className="text-sm font-medium text-foreground-muted! data-selected:text-foreground! dark:data-selected:text-white! transition-colors"
            >
              {t("bank_kartasi")}
              <Tabs.Indicator />
            </Tabs.Tab>
            <Tabs.Tab
              id="provider"
              className="text-sm font-medium text-foreground-muted! data-selected:text-foreground! dark:data-selected:text-white! transition-colors"
            >
              {t("tolov_tizimi")}
              <Tabs.Indicator />
            </Tabs.Tab>
          </Tabs.List>
        </Tabs.ListContainer>
        <Tabs.Panel className="pt-4 px-0" id="card">
          <SavedCard />
        </Tabs.Panel>
        <Tabs.Panel className="pt-4 px-0" id="provider">
          <Providers />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};
