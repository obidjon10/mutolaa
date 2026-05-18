"use client";

import { useTranslations } from "next-intl";

import { Categories, ConditionalRender } from "@/modules/common";

import { useMarketHeader } from "../hooks";

import { Banners } from "./banners";
import { MainSection } from "./main-section";
import { BannerSkeleton, CategoriesSkeleton } from "./skeleton";

export const Main = () => {
  const t = useTranslations();
  const { marketHeader, isLoading } = useMarketHeader();

  return (
    <div className="mx-auto my-4 mr-4 rounded-2xl bg-white dark:bg-black py-8 shadow-card">
      <div className="text-center">
        <h1 className="font-medium text-4xl whitespace-pre-line">
          {t("barcha_kerakli_kitoblar_bir_joyda")}
        </h1>
        <p className="text-xl whitespace-pre-line">
          {t("mutolaa_market_saralangan")}
        </p>
      </div>
      <ConditionalRender if={!isLoading} else={<BannerSkeleton />}>
        <Banners banners={marketHeader?.banners} />
      </ConditionalRender>
      <div className="sm:px-8 px-6 mt-12">
        <div className="font-semibold text-xl mb-5">{t("sohalar")}</div>

        <ConditionalRender if={!isLoading} else={<CategoriesSkeleton />}>
          <Categories
            isIndustry
            showTitle={false}
            categories={marketHeader?.book_topics}
          />
        </ConditionalRender>
      </div>
      <MainSection />
    </div>
  );
};
