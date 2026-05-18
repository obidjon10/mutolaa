"use client";

import { useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import {
  Book,
  BookSkeleton,
  StaggerContainer,
  StaggerItem,
} from "@/modules/common";
import { ChevronRightIcon } from "@/modules/icons";

import { useBookBucket } from "../hooks";

const SKELETON_COUNT = 12;

export const Main = () => {
  const t = useTranslations();
  const { push } = useRouter();
  const { slug } = useParams<{ slug: string }>();
  const {
    title,
    bookBucket,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useBookBucket(slug);

  const sentinelRef = useRef<HTMLDivElement>(null);

  // Infinite scroll
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

  return (
    <div className="mx-auto my-4 mr-4 p-6 sm:p-8 rounded-2xl bg-white dark:bg-black shadow-card">
      {/* Header */}
      <div
        className="flex items-center gap-3 mb-8 cursor-pointer"
        onClick={() => push("/")}
      >
        <div className="bg-muted dark:bg-muted-dark size-8 rounded-full flex items-center justify-center">
          <ChevronRightIcon className="rotate-180" />
        </div>
        {isLoading ? (
          <div className="h-7 w-48 rounded bg-gray-200 dark:bg-neutral-800 animate-pulse" />
        ) : (
          <h1 className="text-xl font-semibold">{title ?? t("toplamlar")}</h1>
        )}{" "}
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-6">
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <BookSkeleton key={i} />
          ))}
        </div>
      ) : (
        <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-8 lg:gap-y-12 pt-4">
          {bookBucket?.map((detail) => (
            <StaggerItem
              key={detail?.id}
              className="shrink-0 flex justify-center"
            >
              <Book
                hasAudiobook={detail?.has_audiobook}
                hasEbook={detail?.has_ebook}
                isPremium={detail?.is_premium}
                // discountPercentage={detail?.discount_percentage}
                title={detail?.title}
                author={detail?.title}
                cover={detail?.image}
                slug={detail?.slug}
                width={200}
              />
            </StaggerItem>
          ))}

          {/* Loading more skeletons */}
          {isFetchingNextPage &&
            Array.from({ length: 6 }).map((_, i) => (
              <StaggerItem
                // eslint-disable-next-line react/no-array-index-key
                key={`loading-${i}`}
                className="shrink-0 flex justify-center"
              >
                <BookSkeleton />
              </StaggerItem>
            ))}
        </StaggerContainer>
      )}

      {/* Sentinel for infinite scroll */}
      <div ref={sentinelRef} className="h-1" />
    </div>
  );
};
