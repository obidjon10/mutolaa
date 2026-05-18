"use client";

import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { BookCard } from "@/modules/common";
import { useMostReadBooks } from "@/modules/home";

export const MostReadBooks = () => {
  const t = useTranslations();
  const { mostReadBooks } = useMostReadBooks();
  const books = mostReadBooks?.results?.slice(0, 4) ?? [];

  if (books.length === 0) return null;

  return (
    <section className="mt-10">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          {t("oxshash_kitoblar")}
        </h2>
        <Link
          href="/books"
          className="text-sm font-medium text-gray-500 hover:text-orange-500 transition-colors"
        >
          {t("barchasi")} →
        </Link>
      </div>

      <div className="mt-5 flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {books.map((book) => (
          <BookCard
            key={book.slug}
            author={book.authors?.[0]?.name}
            cover={book.image}
            slug={book.slug}
            title={book.title}
          />
        ))}
      </div>
    </section>
  );
};
