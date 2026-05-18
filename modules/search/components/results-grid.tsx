"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

import {
  Book,
  BookSkeleton,
  ConditionalRender,
  StaggerContainer,
  StaggerItem,
  useBookList,
} from "@/modules/common";

import { DEFAULT_AGE_RANGE } from "../constants";
import { useSearchFilters } from "../hooks";
import { ageRangeToList } from "../utils";

const SKELETON_COUNT = 6;

interface IProps {
  search: string;
  ageRange: [number, number];
  authorIds: number[];
  topicIds: number[];
  dubberIds: number[];
  categoryIds: number[];
  publisherIds: number[];
}

const isFullAgeRange = (range: [number, number]) =>
  range[0] === DEFAULT_AGE_RANGE[0] && range[1] === DEFAULT_AGE_RANGE[1];

export const ResultsGrid = ({
  search,
  topicIds,
  ageRange,
  authorIds,
  dubberIds,
  categoryIds,
  publisherIds,
}: IProps) => {
  const t = useTranslations();
  const sentinelRef = useRef<HTMLDivElement>(null);
  const { hasActiveFilters } = useSearchFilters();

  const { books, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useBookList({
      enabled: true,
      search: search || undefined,
      topics: topicIds.length ? topicIds : undefined,
      authors: authorIds.length ? authorIds : undefined,
      dubbers: dubberIds.length ? dubberIds : undefined,
      categories: categoryIds.length ? categoryIds : undefined,
      publisher__in: publisherIds.length ? publisherIds : undefined,
      age__in: isFullAgeRange(ageRange) ? undefined : ageRangeToList(ageRange),
    });

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-6">
          {Array.from({ length: SKELETON_COUNT }).map((_, idx) => (
            // eslint-disable-next-line react/no-array-index-key
            <BookSkeleton key={idx} width={180} height={270} />
          ))}
        </div>
      );
    }

    if (books.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-base font-medium text-gray-900 dark:text-gray-100">
            {t("hech_narsa_topilmadi")}
          </p>
          <p className="mt-1 text-sm text-foreground-muted dark:text-gray-400">
            {t("siz_izlagan_kitob_bizda_topilmadi")}
          </p>
        </div>
      );
    }

    return (
      <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-6">
        {books.map((book) => (
          <StaggerItem key={book.id}>
            <Book
              title={book.title}
              author={book.authors?.[0]?.name}
              cover={book.image}
              slug={book.slug}
              hasAudiobook={book.has_audiobook}
              hasEbook={book.has_ebook}
              isPremium={book.is_premium}
              discountPercentage={book.sale_percentage}
              width={180}
              height={270}
            />
          </StaggerItem>
        ))}

        {isFetchingNextPage
          ? Array.from({ length: 3 }).map((_, idx) => (
              <StaggerItem
                // eslint-disable-next-line react/no-array-index-key
                key={`loading-${idx}`}
              >
                <BookSkeleton width={180} height={270} />
              </StaggerItem>
            ))
          : null}
      </StaggerContainer>
    );
  };

  return (
    <section>
      <ConditionalRender if={!hasActiveFilters}>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-5">
          {t("sizga_tavsiya_etamiz")}
        </h2>
      </ConditionalRender>

      {renderContent()}

      <div ref={sentinelRef} className="h-1" />
    </section>
  );
};
