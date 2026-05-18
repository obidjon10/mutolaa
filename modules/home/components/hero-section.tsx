"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@heroui/react";

import { useFeaturedBooks } from "../hooks";

import { ShelfBookCard } from "./shelf-book-card";

export const HeroSection: React.FC = () => {
  const t = useTranslations();
  const { push } = useRouter();
  const { featuredBooks } = useFeaturedBooks();

  return (
    <section className="rounded-2xl bg-muted dark:bg-muted-dark p-4 text-center sm:p-6 mx-6 sm:mx-8">
      <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-200 sm:text-xl">
        {t("har_bir_sahifa")}
      </h1>
      <p className="mx-auto mt-1 max-w-lg text-sm font-medium text-gray-500 dark:text-gray-400 sm:text-sm">
        {t("hikoyalar_ichiga")}
      </p>
      <Button className="mt-6" onClick={() => push("/login")}>
        {t("mutolaani_boshlash")}
      </Button>

      {/*
        Wrapper spans the full inner section width so the shelf SVG has the
        most room to extend past the row of books. The SVG has ~8.7% transparent
        padding on each side, so the visible plank is 82.6% of the wrapper —
        keeping books capped well under that means there's always clear shelf
        on both sides of the outermost book, matching the Figma proportions.
      */}
      <div
        className="relative mt-11 mx-auto w-full"
        style={
          {
            "--shelf-book-w": "clamp(60px, 11vw, 220px)",
          } as React.CSSProperties
        }
      >
        <div className="flex justify-center gap-2 sm:gap-4">
          {featuredBooks?.slice(0, 5)?.map((book) => (
            <ShelfBookCard
              key={book?.id}
              title={book?.title}
              cover={book?.image}
              slug={book?.slug}
            />
          ))}
        </div>

        <Image
          width={966}
          height={62}
          loading="eager"
          alt={t("kitob_javoni")}
          style={{ marginTop: -20 }}
          src="/shelf.svg"
          sizes="(max-width: 640px) 95vw, (max-width: 1280px) 80vw, 70vw"
          className="block h-auto w-full object-contain"
        />
      </div>
    </section>
  );
};
