"use client";

import { useTranslations } from "next-intl";
import { Tabs } from "@heroui/react";

import { CorporateTab } from "./corporate-tab";
import { PrivateTab } from "./private-tab";

export const Plans = () => {
  const t = useTranslations();

  return (
    <section className="mt-32">
      <h2 className="text-center text-2xl whitespace-pre-line font-semibold">
        {t("sizga_mos_obunani_tanlang")}
      </h2>
      <p className="mx-auto mt-3 whitespace-pre-line font-medium max-w-xl text-center">
        {t("obuna_subtitle")}
      </p>

      <Tabs defaultSelectedKey="shaxsiy" className="mt-8">
        <div className="w-63.25 mx-auto">
          <Tabs.ListContainer>
            <Tabs.List
              aria-label="Options"
              className="bg-muted dark:bg-muted-dark w-full"
            >
              <Tabs.Tab id="private">
                {t("shaxsiy")}
                <Tabs.Indicator />
              </Tabs.Tab>
              <Tabs.Tab id="corporate">
                {t("korporativ")}
                <Tabs.Indicator />
              </Tabs.Tab>
            </Tabs.List>
          </Tabs.ListContainer>
        </div>

        <Tabs.Panel id="private">
          <PrivateTab />
        </Tabs.Panel>

        <Tabs.Panel id="corporate">
          <CorporateTab />
        </Tabs.Panel>
      </Tabs>
    </section>
  );
};
