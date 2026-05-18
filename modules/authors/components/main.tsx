"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { ChevronRightIcon } from "@/modules/icons";

import { useAuthorsList } from "../hooks";

import { AuthorCard } from "./author-card";
import { AuthorSkeleton } from "./author-skeleton";

const SKELETON_COUNT = 28;

export const Main = () => {
  const t = useTranslations();
  const { push } = useRouter();
  const { authors, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useAuthorsList();

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
        <h1 className="text-xl font-semibold">{t("mualliflar")}</h1>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-6">
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <AuthorSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-8 lg:gap-y-12 pt-4">
          {authors?.map((author) => (
            <div
              key={author?.id}
              className="shrink-0 flex justify-center"
            >
              <AuthorCard
                authorId={author?.id}
                authorName={author?.name}
                authorImage={author?.image}
                bookCount={author?.book_count as number}
              />
            </div>
          ))}

          {/* Loading more skeletons */}
          {isFetchingNextPage &&
            Array.from({ length: 6 }).map((_, i) => (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={`loading-${i}`}
                className="shrink-0 flex justify-center"
              >
                <AuthorSkeleton />
              </div>
            ))}
        </div>
      )}

      {/* Sentinel for infinite scroll */}
      <div ref={sentinelRef} className="h-1" />
    </div>
  );
};
