"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Skeleton } from "@heroui/react";

import type { IBook } from "@/modules/common";
import { Book } from "@/modules/common";

interface IProps {
  books: IBook[];
  isLoading: boolean;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  fetchNextPage: () => void;
}

const INITIAL_SKELETON_COUNT = 8;
const NEXT_PAGE_SKELETON_COUNT = 4;

const SkeletonCard = () => (
  <div className="flex flex-col gap-2">
    <Skeleton className="aspect-3/4 rounded-lg" />
    <Skeleton className="h-4 w-3/4 rounded-lg" />
    <Skeleton className="h-3 w-1/2 rounded-lg" />
  </div>
);

export const BookGrid = ({
  books,
  isLoading,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: IProps) => {
  const t = useTranslations();
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef?.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-8">
        {Array.from({ length: INITIAL_SKELETON_COUNT }).map((_, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (books?.length === 0) {
    return (
      <p className="py-12 text-center text-foreground-muted">
        {t("hech_narsa_topilmadi")}
      </p>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-8">
        {books?.map((book) => (
          <Book
            key={book?.id}
            slug={book?.slug}
            title={book?.title}
            author={book?.authors?.[0]?.name}
            cover={book?.image}
            hasAudiobook={book?.has_audiobook}
            hasEbook={book?.has_ebook}
            isPremium={book?.is_premium}
            width={153}
            height={232}
          />
        ))}
        {isFetchingNextPage &&
          Array.from({ length: NEXT_PAGE_SKELETON_COUNT }).map((_, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <SkeletonCard key={`sk-${i}`} />
          ))}
      </div>
      <div ref={sentinelRef} />
    </>
  );
};
