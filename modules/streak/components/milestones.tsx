"use client";

import { useTranslations } from "next-intl";
import { Skeleton } from "@heroui/react";

import { useBadgeList } from "../hooks";

import { BadgeCard } from "./badge-card";
import { MilestonesModal } from "./milestones-modal";

export const Milestones: React.FC = () => {
  const t = useTranslations();
  const { data: badges, isLoading } = useBadgeList();

  const firstGroup = badges?.[0];

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="font-semibold">{t("osish_marralari")}</div>
        <MilestonesModal badges={badges ?? []} />
      </div>
      <div className="border border-[#E4E4E7] mt-4 dark:border-[#27272A] rounded-xl p-3 sm:p-4 w-full flex items-center justify-between gap-2">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={i} className="flex flex-col items-center gap-1">
                <Skeleton className="size-26.5 rounded-full" />
                <Skeleton className="h-4 w-12 rounded-lg mt-1" />
                <Skeleton className="h-5 w-14 rounded-full" />
              </div>
            ))
          : firstGroup?.items.map((badge) => (
              <BadgeCard key={badge.id} badge={badge} />
            ))}
      </div>
    </div>
  );
};
