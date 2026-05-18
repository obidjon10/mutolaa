"use client";

import { Separator } from "@heroui/react";

import { useAuth } from "@/modules/auth";
import {
  Categories,
  ConditionalRender,
  Footer,
  LastReadBookCard,
} from "@/modules/common";

import { useCategories, useHeader } from "../hooks";

import { DiscoverSections } from "./discover-sections";
import { HeroSection } from "./hero-section";
import { AuthenticatedSection } from "./home-page-skeleton";
import { Streak } from "./streak";
import { TopSections } from "./top-sections";

interface IProps {
  initialIsAuthenticated?: boolean;
}

export const HomePage = ({ initialIsAuthenticated }: IProps) => {
  const { categories } = useCategories();
  const { isAuthenticated, isHydrated } = useAuth();
  const { headerData, isLoading } = useHeader();

  const isAuth = isHydrated ? isAuthenticated : !!initialIsAuthenticated;

  return (
    <div className="mx-auto my-4 mr-4 py-6 sm:py-8 rounded-2xl bg-white dark:bg-black shadow-card">
      <ConditionalRender if={isAuth} else={<HeroSection />}>
        <ConditionalRender if={!isLoading} else={<AuthenticatedSection />}>
          <div className="grid grid-cols-2 gap-6 px-6 sm:px-8">
            <ConditionalRender if={headerData?.last_read_book}>
              <LastReadBookCard lastReadBook={headerData?.last_read_book} />
            </ConditionalRender>
            <ConditionalRender if={headerData?.streak}>
              <Streak streak={headerData?.streak} />
            </ConditionalRender>
          </div>
        </ConditionalRender>
      </ConditionalRender>
      <div className="sm:px-8 px-6 mt-12">
        <Categories categories={categories} />
      </div>
      <TopSections />
      <DiscoverSections />
      <div className="mt-16 px-6 sm:px-8">
        <Separator />
      </div>
      <Footer />
    </div>
  );
};
