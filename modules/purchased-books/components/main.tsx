"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { useAuth } from "@/modules/auth";
import { ChevronRightIcon } from "@/modules/icons";
import { NotAuthSection } from "@/modules/my-library";

import { useMyPurchasedBooks } from "../hooks";

import { BookGrid } from "./book-grid";

interface IProps {
  initialIsAuthenticated?: boolean;
}

export const Main = ({ initialIsAuthenticated }: IProps) => {
  const t = useTranslations();
  const { back } = useRouter();
  const { isAuthenticated, isHydrated } = useAuth();

  const isAuth = isHydrated ? isAuthenticated : !!initialIsAuthenticated;
  const { books, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useMyPurchasedBooks(isAuth);

  if (!isAuth) {
    return (
      <div className="mx-auto my-4 mr-4 p-6 sm:p-8 rounded-2xl bg-white dark:bg-black shadow-card">
        <NotAuthSection />
      </div>
    );
  }

  return (
    <div className="mx-auto my-4 mr-4 p-6 sm:p-8 min-h-[94.3vh] rounded-2xl bg-white dark:bg-black shadow-card">
      <div
        className="flex items-center gap-3 mb-6 cursor-pointer w-fit"
        onClick={() => back()}
      >
        <div className="bg-muted dark:bg-muted-dark size-12 rounded-full flex items-center justify-center">
          <ChevronRightIcon size={24} className="rotate-180" />
        </div>
        <h1 className="text-2xl font-semibold">
          {t("xarid_qilgan_kitoblarim")}
        </h1>
      </div>

      <BookGrid
        books={books}
        isLoading={isLoading}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      />
    </div>
  );
};
