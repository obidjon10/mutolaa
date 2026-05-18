"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { ChevronRightIcon } from "@/modules/icons";

import { useStreakMainData } from "../hooks";

import { Activity } from "./activity";
import { Freeze } from "./freeze";
import { Milestones } from "./milestones";
import { Progress } from "./progress";
import { StreakSkeleton } from "./streak-skeleton";

export const Main = () => {
  const t = useTranslations();
  const { push } = useRouter();
  const { streak, isLoading } = useStreakMainData();

  return (
    <div className="mx-2 sm:mx-4 my-4 p-4 sm:p-6 lg:p-8 min-h-[94.5vh] rounded-xl bg-white dark:bg-black shadow-card">
      <div
        className="flex items-center gap-3 mb-6 sm:mb-8 cursor-pointer"
        onClick={() => push("/")}
      >
        <div className="bg-muted dark:bg-muted-dark size-8 rounded-full flex items-center justify-center">
          <ChevronRightIcon className="rotate-180" />
        </div>
        <h1 className="text-lg sm:text-xl font-semibold">
          {t("marra_faolligi")}
        </h1>
      </div>
      {isLoading ? (
        <StreakSkeleton />
      ) : (
        <div className="mt-8 sm:mt-12 lg:mt-16 flex flex-col lg:flex-row gap-y-10 lg:gap-x-10 xl:gap-x-16 pb-8 lg:pb-16">
          <div className="lg:flex-1 min-w-0">
            <Progress
              streakCoin={streak?.daily_plan?.daily_streak_coin}
              streakTime={streak?.daily_plan?.daily_remaining_streak_time}
              progressPercent={streak?.daily_plan?.progress_percent}
            />
            <Activity
              currentStreakDay={streak?.current_streak?.day}
              nextGoalName={streak?.next_goal_badge?.name}
              weekDays={streak?.week_days}
            />
          </div>
          <div className="lg:flex-1 min-w-0">
            <Milestones />
            <Freeze freezeCount={streak?.available_freeze_count} />
          </div>
        </div>
      )}
    </div>
  );
};
