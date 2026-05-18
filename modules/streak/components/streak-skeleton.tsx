"use client";

import { Skeleton } from "@heroui/react";

/**
 * Loading state for the streak page. Mirrors `<Progress />`, `<Activity />`,
 * `<Milestones />`, and `<Freeze />` layouts byte-for-byte so swapping it for
 * the real content doesn't cause a layout shift.
 */
export const StreakSkeleton = () => (
    <div className="mt-8 sm:mt-12 lg:mt-16 flex flex-col lg:flex-row gap-y-10 lg:gap-x-10 xl:gap-x-16 pb-8 lg:pb-16">
      {/* ── Left column ─────────────────────────────────────────────── */}
      <div className="lg:flex-1 min-w-0">
        {/* Progress */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-x-10 lg:gap-x-16.5 mt-4">
          <Skeleton className="size-50 rounded-full" />
          <Skeleton className="size-40 sm:size-44 lg:size-50 rounded-full" />
        </div>

        {/* Activity */}
        <div className="mt-14">
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-32 rounded-md" />
            <Skeleton className="h-5 w-28 rounded-md" />
          </div>

          {/* Activity cards */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            <Skeleton className="h-19.5 rounded-xl" />
            <Skeleton className="h-19.5 rounded-xl" />
          </div>

          {/* Week-day row */}
          <div className="border border-[#E4E4E7] mt-4 dark:border-[#27272A] rounded-xl p-3 w-full flex items-center justify-between gap-1 sm:gap-4 lg:gap-10.5 lg:justify-start">
            {Array.from({ length: 7 }).map((_, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={i} className="space-y-2 flex flex-col items-center">
                <Skeleton className="h-3 w-5 rounded" />
                <Skeleton className="size-7.5 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right column ────────────────────────────────────────────── */}
      <div className="lg:flex-1 min-w-0">
        {/* Milestones */}
        <div>
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-40 rounded-md" />
            <Skeleton className="h-5 w-28 rounded-md" />
          </div>
          <div className="border border-[#E4E4E7] mt-4 dark:border-[#27272A] rounded-xl p-3 sm:p-4 w-full flex items-center justify-between gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={i} className="flex flex-col items-center gap-1">
                <Skeleton className="size-26.5 rounded-full" />
                <Skeleton className="h-4 w-12 rounded-lg mt-1" />
                <Skeleton className="h-5 w-14 rounded-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Freeze */}
        <div className="mt-9">
          <Skeleton className="h-5 w-20 rounded-md" />
          <div className="flex items-center mt-2 gap-4">
            <Skeleton className="h-19.5 rounded-xl flex-1" />
            <Skeleton className="h-19.5 rounded-xl flex-1" />
          </div>
          <div className="flex items-center mt-4 gap-2 sm:gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton
                // eslint-disable-next-line react/no-array-index-key
                key={i}
                className="flex-1 sm:flex-none sm:w-28.75 h-21 rounded-xl"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
