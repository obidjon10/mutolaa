"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Skeleton } from "@heroui/react";

import { Book } from "@/modules/common";
import { IBook } from "@/modules/common/types/book";

interface IProps {
  list: { id?: number; book?: IBook }[];
  isLoading: boolean;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  fetchNextPage: () => void;
}

const SKELETON_COUNT = 8;

export function BookList({
  list,
  isLoading,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: IProps) {
  const t = useTranslations();
  const sentinelRef = useRef<HTMLDivElement>(null);

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

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={i} className="flex flex-col gap-2">
            <Skeleton className="aspect-3/4 rounded-lg" />
            <Skeleton className="h-4 w-3/4 rounded-lg" />
            <Skeleton className="h-3 w-1/2 rounded-lg" />
          </div>
        ))}
      </div>
    );
  }

  if (!isLoading && list?.length === 0) {
    return (
      <p className="py-12 text-center text-foreground-muted">
        {t("hech_narsa_topilmadi")}
      </p>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-8">
        {list?.map((list) => (
          <Book
            key={list?.id}
            hasAudiobook={list?.book?.has_audiobook}
            hasEbook={list?.book?.has_ebook}
            isPremium={list?.book?.is_premium}
            // discountPercentage={list?.book?.discount_percentage}
            title={list?.book?.title}
            author={list?.book?.title}
            cover={list?.book?.image}
            slug={list?.book?.slug}
            width={153}
            height={232}
          />
        ))}
        {isFetchingNextPage &&
          Array.from({ length: 4 }).map((_, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={`sk-${i}`} className="flex flex-col gap-2">
              <Skeleton className="aspect-3/4 rounded-lg" />
              <Skeleton className="h-4 w-3/4 rounded-lg" />
            </div>
          ))}
      </div>
      <div ref={sentinelRef} />
    </>
  );
}
