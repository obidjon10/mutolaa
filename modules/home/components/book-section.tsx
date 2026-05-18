"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

import { BookCard } from "@/modules/common";

import { useMostReadBooks } from "..";

export const BookSection = () => {
  const { mostReadBooks } = useMostReadBooks();
  const t = useTranslations();

  return (
    <section className="mt-10">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
          {t("boshlash_uchun_5_kitob")}
        </h2>
        <Link
          href="/books"
          className="text-sm font-medium text-gray-500 hover:text-orange-500 transition-colors"
        >
          {t("barchasi")} →
        </Link>
      </div>

      <div className="mt-5 flex gap-4 overflow-x-auto pb-4 -mx-1 px-1 scrollbar-hide">
        {mostReadBooks?.results?.slice(4, 10)?.map((book) => (
          <BookCard
            key={book.slug}
            author={book?.authors?.[0]?.name}
            cover={book?.image}
            slug={book?.slug}
            title={book?.title}
          />
        ))}
      </div>
    </section>
  );
};
