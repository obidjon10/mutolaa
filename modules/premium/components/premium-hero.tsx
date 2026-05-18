"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@heroui/react";

import { useAppDispatch } from "@/lib";
import { useAuth } from "@/modules/auth";
import { ConditionalRender, setAuthRequiredModal } from "@/modules/common";
import { useMostReadBooks } from "@/modules/home";
import { CrownIcon } from "@/modules/icons";
import { setPlan } from "@/modules/payment";

import { BookCarousel } from "./book-carousel";

export const PremiumHero = () => {
  const t = useTranslations();
  const { push } = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAuth();
  const { mostReadBooks } = useMostReadBooks();
  const books = mostReadBooks?.results ?? [];

  const onOpenPayment = () => {
    if (isAuthenticated) {
      dispatch(
        setPlan({
          id: 1,
          name: "Oylik",
          price: "33000.00",
          duration: 1,
          description_list: [
            "Juda oddiy – har oyda qayta to‘lov;",
            "Premiumni sinab ko‘rish uchun qulay;",
          ],
          monthly_price: 33000,
          saved_money_percentage: 0,
        }),
      );
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
    <section
      className="relative overflow-hidden border border-gray-100 dark:border-transparent rounded-2xl px-8 pt-8 text-center bg-muted dark:bg-muted-dark bg-[url('/premium-background.webp')] dark:bg-[url('/premium-dark-background.webp')] bg-cover bg-center bg-no-repeat"
    >
      <div className="relative">
        <div className="mx-auto mb-6 flex size-18 items-center justify-center rounded-2xl bg-brand text-white">
          <CrownIcon size={40} />
        </div>

        <h1
          className="text-3xl text-gray-900 whitespace-pre-line font-medium leading-[134%] mx-auto dark:text-white sm:text-4xl"        >
          {t("bilim_bu_yangi_hashamat")}
        </h1>

        <p className="mx-auto mt-1 max-w-xl text-sm whitespace-pre-line text-muted-dark dark:text-gray-400 sm:text-base">
          {t("premium_subtitle")}
        </p>

        <Button
          onClick={onOpenPayment}
          className="mt-6 rounded-full font-semibold z-10"
        >
          {t("premiumga_otish")}
        </Button>

        <ConditionalRender if={books?.length > 0}>
          <BookCarousel books={books} />
        </ConditionalRender>
      </div>
    </section>
  );
};
