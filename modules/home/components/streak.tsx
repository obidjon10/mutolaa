import Link from "next/link";
import { useTranslations } from "next-intl";

import { CircularProgress, formatSecondsToTime } from "@/modules/common";
import { ArrowRightIcon } from "@/modules/icons";
import { IStreak, WeekDay } from "@/modules/streak";

interface IProps {
  streak?: IStreak | null;
}

export const Streak: React.FC<IProps> = ({ streak }) => {
  const t = useTranslations();

  return (
    <div className="p-4 bg-muted dark:bg-muted-dark h-60 relative rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="font-semibold">{t("marradagi_faolligingiz")}</div>

        <Link
          href="/streak"
          className="text-sm cursor-pointer flex font-medium underline items-center gap-0.5"
        >
          {t("toliq_korsatish")}
          <ArrowRightIcon />
        </Link>
      </div>

      <div className="flex gap-7.5 mt-6">
        <CircularProgress
          value={streak?.daily_plan?.progress_percent}
          label={t("bugungi_reja")}
          time={formatSecondsToTime(
            streak?.daily_plan?.daily_remaining_streak_time as number,
          )}
          points={streak?.daily_plan?.daily_streak_coin}
        />
        <div className="flex-1 gap-2">
          <div className="bg-white dark:bg-black rounded-xl p-3 w-full flex items-center justify-between gap-2.5">
            {streak?.week_days?.map((day) => (
              <WeekDay key={day.date} day={day} />
            ))}
          </div>
          <div className="flex items-center mt-2 gap-2">
            <div className="bg-white dark:bg-black h-19.5 rounded-xl p-2 w-full flex flex-col justify-between">
              <p className="text-foreground-muted text-xs">{t("joriy_korsatkich")}</p>
              <div className="flex items-end gap-1">
                <div className="text-3xl font-semibold">
                  {streak?.current_streak?.day}
                </div>
                <p className="text-sm mb-0.5">{t("kun")}</p>
              </div>
            </div>
            <div className="bg-white dark:bg-black h-19.5 rounded-xl p-2 w-full flex flex-col justify-between">
              <p className="text-foreground-muted text-xs">{t("keyingi_marra")}</p>
              <div className="flex items-end gap-2">
                <div className="text-2xl font-semibold">
                  {streak?.next_goal_badge?.name}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
