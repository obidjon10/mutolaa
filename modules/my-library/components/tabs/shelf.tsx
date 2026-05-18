"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Skeleton } from "@heroui/react";

import { ChevronRightIcon } from "@/modules/icons";

import { useShelfBooks, useShelfList } from "../../hooks";
import { IShelf } from "../../models";

import { BookList } from "./book-list";
import { ShelfCard } from "./shelf-card";

const SKELETON_COUNT = 6;

function ShelfBooks({ shelf, onBack }: { shelf: IShelf; onBack: () => void }) {
  const { books, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useShelfBooks(shelf.id);

  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-2 mb-6 text-sm font-semibold hover:opacity-70 transition-opacity cursor-pointer"
      >
        <div className="bg-muted dark:bg-muted-dark size-8 rounded-full flex items-center justify-center">
          <ChevronRightIcon className="rotate-180" />
        </div>
        {shelf.name}
      </button>
      <BookList
        list={books}
        isLoading={isLoading}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      />
    </div>
  );
}

function ShelfList({
  onSelectShelf,
}: {
  onSelectShelf: (shelf: IShelf) => void;
}) {
  const t = useTranslations();
  const sentinelRef = useRef<HTMLDivElement>(null);
  const { shelves, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useShelfList();

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
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <Skeleton key={i} className="h-44 rounded-2xl" />
        ))}
      </div>
    );
  }

  if (!isLoading && shelves.length === 0) {
    return (
      <p className="py-12 text-center text-foreground-muted">
        {t("hech_narsa_topilmadi")}
      </p>
    );
  }

  return (
    <>
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {shelves.map((shelf) => (
          <ShelfCard key={shelf.id} shelf={shelf} onSelect={onSelectShelf} />
        ))}
        {isFetchingNextPage &&
          Array.from({ length: 2 }).map((_, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <Skeleton key={`sk-${i}`} className="h-44 rounded-2xl" />
          ))}
      </div>
      <div ref={sentinelRef} />
    </>
  );
}

export const Shelf: React.FC = () => {
  const [selectedShelf, setSelectedShelf] = useState<IShelf | null>(null);

  if (selectedShelf) {
    return (
      <ShelfBooks shelf={selectedShelf} onBack={() => setSelectedShelf(null)} />
    );
  }

  return <ShelfList onSelectShelf={setSelectedShelf} />;
};
