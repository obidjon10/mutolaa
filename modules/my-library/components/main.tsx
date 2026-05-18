"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth, useProfile } from "@/modules/auth";
import { ConditionalRender, LastReadBookCard } from "@/modules/common";
import { AuthenticatedSection, useHeader } from "@/modules/home";

import { NotAuthSection } from "./not-auth-section";
import { TabsWrapper } from "./tabs";

interface IProps {
  initialIsAuthenticated?: boolean;
}

export const Main: React.FC<IProps> = ({ initialIsAuthenticated }) => {
  const { push } = useRouter();
  const { isAuthenticated, isHydrated } = useAuth();
  const { headerData, isLoading } = useHeader();

  const isAuth = isHydrated ? isAuthenticated : !!initialIsAuthenticated;
  const { data: user } = useProfile(isAuth);

  useEffect(() => {
    if (isAuth && user !== undefined && !user?.is_premium) {
      push("/premium");
    }
  }, [isAuth, user, push]);

  if (!isAuth) {
    return (
      <div className="mx-auto my-4 mr-4 p-6 sm:p-8 rounded-2xl bg-white dark:bg-black shadow-card">
        <NotAuthSection />
      </div>
    );
  }

  return (
    <div className="mx-auto my-4 mr-4 p-6 sm:p-8 rounded-2xl bg-white dark:bg-black shadow-card">
      <ConditionalRender if={!isLoading} else={<AuthenticatedSection onlyLastBookSkeleton />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <LastReadBookCard
            lastReadBook={headerData?.last_read_book}
            showDetailsLink
          />
        </div>
      </ConditionalRender>

      <TabsWrapper />
    </div>
  );
};
