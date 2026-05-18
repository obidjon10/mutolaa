"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import {
  StaggerContainer,
  StaggerItem,
} from "@/modules/common";
import { ChevronRightIcon } from "@/modules/icons";

import { useCollections } from "../hooks";

import { CollectionCard, CollectionCardSkeleton } from "./card";

const SKELETON_COUNT = 12;

export const Main = () => {
  const t = useTranslations();
  const { push } = useRouter();
  const {
    collections,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useCollections();

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
      <div
        className="flex items-center gap-3 mb-8 cursor-pointer"
        onClick={() => push("/")}
      >
        <div className="bg-muted dark:bg-muted-dark size-8 rounded-full flex items-center justify-center">
          <ChevronRightIcon className="rotate-180" />
        </div>
        <h1 className="text-xl font-semibold">{t("toplamlar")}</h1>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-12">
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <CollectionCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-12">
          {collections.map((collection, i) => (
            <StaggerItem key={collection.id}>
              <CollectionCard {...collection} priority={i < 4} />
            </StaggerItem>
          ))}

          {/* Loading more skeletons */}
          {isFetchingNextPage &&
            Array.from({ length: 6 }).map((_, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <StaggerItem key={`loading-${i}`}>
                <CollectionCardSkeleton />
              </StaggerItem>
            ))}
        </StaggerContainer>
      )}

      <div ref={sentinelRef} className="h-1" />
    </div>
  );
};
