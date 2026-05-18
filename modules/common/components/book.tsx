"use client";

import { Link } from "@/i18n/navigation";
import {
  BookOpenIcon,
  CrownDiamondIcon,
  HeadphonesIcon,
} from "@/modules/icons";

import { BookCover } from "./book-cover";
import { ConditionalRender } from "./conditional-render";

interface IBookCardProps {
  title?: string;
  author?: string;
  cover?: string;
  slug?: string;
  width?: number;
  height?: number;
  hasAudiobook?: boolean;
  hasEbook?: boolean;
  isPremium?: boolean;
  discountPercentage?: number;
}

export function Book({
  title,
  author,
  cover,
  slug,
  hasEbook,
  isPremium,
  width = 200,
  height = 304,
  hasAudiobook,
  discountPercentage,
}: IBookCardProps) {
  return (
    <Link href={`/book/${slug}`} className="group flex flex-col bg-transparent">
      <div className="flex justify-center overflow-visible px-1 py-1 sm:px-2 sm:py-2">
        <BookCover
          cover={cover || ""}
          title={title || "BOOK TITLE"}
          width={width}
          height={height}
          fluid
          className="w-32 sm:w-36 md:w-40 lg:w-44 xl:w-50"
          sizes="(min-width: 1280px) 200px, (min-width: 1024px) 176px, (min-width: 768px) 160px, (min-width: 640px) 144px, 128px"
          interactive
        />
      </div>

      <div className="space-y-1 px-1 pb-1 pt-3 sm:px-2 text-center">
        <ConditionalRender if={title}>
          <p className="line-clamp-1 text-pretty font-medium text-foreground">
            {title}
          </p>
        </ConditionalRender>
        <ConditionalRender if={author}>
          <p className="line-clamp-1 text-sm font-medium text-foreground-muted">
            {author}
          </p>
        </ConditionalRender>

        <div className="mt-3 border border-muted dark:border-muted-dark p-2 rounded-full flex items-center justify-center divide-x divide-gray-100 dark:divide-muted-dark w-full">
          <ConditionalRender if={hasAudiobook}>
            <div className="px-3">
              <HeadphonesIcon className="text-foreground-muted" />
            </div>
          </ConditionalRender>
          <ConditionalRender if={hasEbook}>
            <div className="px-3">
              <BookOpenIcon className="text-foreground-muted" />
            </div>
          </ConditionalRender>
          <ConditionalRender if={isPremium}>
            <div className="px-3 flex items-center gap-2">
              <CrownDiamondIcon className="text-brand" />
              <ConditionalRender if={(discountPercentage || 0) === 0}>
                <p className="text-sm text-brand font-medium">Premium</p>
              </ConditionalRender>
            </div>
          </ConditionalRender>
          <ConditionalRender if={discountPercentage}>
            <div className="px-3 text-purple-600 font-medium">
              -{discountPercentage}%
            </div>
          </ConditionalRender>
        </div>
      </div>
    </Link>
  );
}

export function BookSkeleton({
  width = 200,
  height = 304,
  withoutBottom = false,
}: {
  width?: number;
  height?: number;
  withoutBottom?: boolean;
}) {
  return (
    <div className="flex flex-col bg-transparent animate-pulse">
      <div className="flex justify-center overflow-visible px-1 py-1 sm:px-2 sm:py-2">
        <div
          className="rounded-lg bg-gray-200 dark:bg-neutral-800 w-32 sm:w-36 md:w-40 lg:w-44 xl:w-50"
          style={{ aspectRatio: `${width} / ${height}` }}
        />
      </div>

      <ConditionalRender if={withoutBottom}>
        <div className="space-y-2 px-1 pb-1 pt-3 sm:px-2 flex flex-col items-center">
          <div className="h-5 bg-gray-200 dark:bg-neutral-800 rounded w-3/4" />
          <div className="h-4 bg-gray-200 dark:bg-neutral-800 rounded w-1/2" />

          <div className="mt-3 h-10 border border-muted dark:border-muted-dark bg-gray-100 dark:bg-neutral-800 p-2 rounded-full w-full" />
        </div>
      </ConditionalRender>
    </div>
  );
}
