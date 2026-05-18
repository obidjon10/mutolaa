import { useTranslations } from "next-intl";

import { IWeekDay } from "../models";

import { ActivityCards } from "./activity-cards";
import { ActivityModal } from "./activity-modal";
import { WeekDay } from "./week-day";

interface IProps {
  currentStreakDay?: number;
  nextGoalName?: string;
  weekDays?: IWeekDay[];
}

export const Activity: React.FC<IProps> = ({
  weekDays,
  nextGoalName,
  currentStreakDay,
}) => {
  const t = useTranslations();

  return (
    <div className="mt-14">
      <div className="flex items-center justify-between">
        <div className="font-semibold">{t("faolligingiz")}</div>
        <ActivityModal />
      </div>
      <ActivityCards
        nextGoalName={nextGoalName}
        currentStreakDay={currentStreakDay}
      />
      <div className="border border-[#E4E4E7] mt-4 dark:border-[#27272A] rounded-xl p-3 w-full flex items-center justify-between gap-1 sm:gap-4">
        {weekDays?.map((day) => (
          <WeekDay key={day.date} day={day} />
        ))}
      </div>
    </div>
  );
};
