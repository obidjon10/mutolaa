import { useTranslations } from "next-intl";
import classNames from "classnames";

import { ConditionalRender } from "@/modules/common";

interface IProps {
  currentStreakDay?: number;
  nextGoalName?: string;
  startDate?: string;
  coinsCount?: number;
  isDetail?: boolean;
}

export const ActivityCards: React.FC<IProps> = ({
  coinsCount,
  currentStreakDay,
  nextGoalName,
  startDate,
  isDetail = false,
}) => {
  const t = useTranslations();

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="border border-[#E4E4E7] dark:border-[#27272A] h-19.5 rounded-xl p-2 w-full flex flex-col justify-between">
        <p className="text-foreground-muted text-sm">{t("joriy_korsatkich")}</p>
        <div className="flex items-end gap-1">
          <div className="text-xl font-semibold">{currentStreakDay}</div>
          <p className="text-sm mb-0.5">{t("kun")}</p>
        </div>
      </div>
      <div className="border border-[#E4E4E7] dark:border-[#27272A] h-19.5 rounded-xl p-2 w-full flex flex-col justify-between">
        <p className="text-foreground-muted text-sm">{t("keyingi_marra")}</p>
        <div className="flex items-end gap-2">
          <div className="text-xl font-semibold">{nextGoalName}</div>
        </div>
      </div>
      <ConditionalRender if={isDetail}>
        <div className="border border-[#E4E4E7] dark:border-[#27272A] h-19.5 rounded-xl p-2 w-full flex flex-col justify-between">
          <ConditionalRender if={startDate}>
            <p className="text-foreground-muted text-sm">{t("boshlangan")}</p>
          </ConditionalRender>
          <div className="flex items-end gap-1">
            <div
              className={classNames({
                "text-xl font-semibold": startDate,
                "text-base font-medium text-center": !startDate,
              })}
            >
              {startDate ?? t("faollik_hali_boshlanmagan")}
            </div>
          </div>
        </div>
        <div className="border border-[#E4E4E7] dark:border-[#27272A] h-19.5 rounded-xl p-2 w-full flex flex-col justify-between">
          <p className="text-foreground-muted text-sm">{t("yegilgan_biliglar")}</p>
          <div className="flex items-end gap-2">
            <div className="text-xl font-semibold">{coinsCount}</div>
            <p className="text-sm mb-0.5">{t("ta")}</p>
          </div>
        </div>
      </ConditionalRender>
    </div>
  );
};
