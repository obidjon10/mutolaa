"use client";

import { useTranslations } from "next-intl";
import { Tab, TabList, TabPanel, Tabs } from "@heroui/react";

import { useAppSelector } from "@/lib/hooks";

import { OtpForm } from "../otp-form";
import { ProfileForm } from "../profile-form";

import { Email } from "./email";
import { Phone } from "./phone";

export const AuthTabs = () => {
  const t = useTranslations();
  const step = useAppSelector(({ auth }) => auth.step);
  const method = useAppSelector(({ auth }) => auth.method);

  if (step === "otp") {
    return (
      <div className="mt-8 w-full">
        <OtpForm />
      </div>
    );
  }

  if (step === "profile") {
    return (
      <div className="mt-8 w-full">
        <ProfileForm />
      </div>
    );
  }

  return (
    <div className="mt-8 w-full">
      <Tabs className="w-full" variant="secondary" defaultSelectedKey={method}>
        <TabList className="flex w-full border-b border-gray-200 dark:border-gray-700">
          <Tab
            id="phone"
            className="flex-1 cursor-pointer pb-2 text-center text-sm font-medium text-gray-500 dark:text-gray-400 border-b-2 border-transparent data-selected:border-orange-500 data-selected:text-gray-900 dark:data-selected:border-white dark:data-selected:text-white transition-colors outline-none"
          >
            {t("telefon_raqam")}
          </Tab>
          <Tab
            id="email"
            className="flex-1 cursor-pointer pb-2 text-center text-sm font-medium text-gray-500 dark:text-gray-400 border-b-2 border-transparent data-selected:border-orange-500 data-selected:text-gray-900 dark:data-selected:border-white dark:data-selected:text-white transition-colors outline-none"
          >
            {t("elektron_pochta")}
          </Tab>
        </TabList>

        <TabPanel id="phone">
          <Phone />
        </TabPanel>

        <TabPanel id="email">
          <Email />
        </TabPanel>
      </Tabs>
    </div>
  );
};
