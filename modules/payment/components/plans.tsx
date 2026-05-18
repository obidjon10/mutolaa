import { useTranslations } from "next-intl";
import classNames from "classnames";

import { useAppDispatch, useAppSelector } from "@/lib";
import { IPremiumPlans } from "@/modules/premium";

import { setPlan } from "../store";

interface IProps {
  plan: IPremiumPlans;
}

export const PlansSkeleton: React.FC = () => (
  <div className="bg-white border border-transparent dark:bg-black py-3 px-4 rounded-2xl w-full animate-pulse">
    <div className="rounded-full size-4 bg-muted dark:bg-muted-dark" />
    <div className="mt-3">
      <div className="h-7 w-24 bg-muted dark:bg-muted-dark rounded-md mb-0.5" />
      <div className="flex items-center gap-2">
        <div className="h-6 w-16 bg-muted dark:bg-muted-dark rounded-md" />
        <div className="h-4 w-20 bg-muted dark:bg-muted-dark rounded-md" />
      </div>
    </div>
  </div>
);

export const Plans: React.FC<IProps> = ({ plan }) => {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const isActive = useAppSelector(
    ({ payment }) => payment?.plan?.id === plan?.id,
  );

  return (
    <div
      onClick={() => dispatch(setPlan(plan))}
      className={classNames(
        "bg-white border transition-all duration-300 dark:bg-black py-3 px-4 cursor-pointer rounded-2xl w-full",
        {
          "border-transparent": !isActive,
          "border-brand": isActive,
        },
      )}
    >
      <div
        className={classNames(
          "rounded-full size-4 flex transition-all duration-300 items-center justify-center shadow-[0px_0px_1px_0px_var(--fieldshadow-2),0px_1px_2px_0px_var(--fieldshadow-2),0px_2px_4px_0px_var(--fieldshadow),inset_0px_var(--depth)_var(--depth)_0px_#FFFFFF1A] backdrop-blur-[0px]",
          {
            "border border-[#DEDEE000] bg-muted dark:bg-muted-dark":
              !isActive,
            "border-[0.5px] border-[#F54900] bg-brand": isActive,
          },
        )}
      >
        <div className="bg-muted size-1.5 dark:bg-muted-dark rounded-full" />
      </div>
      <div className="mt-3">
        <div className="font-semibold text-xl mb-0.5">
          {plan?.duration === 1 ? t("oylik_obuna") : t("yillik_obuna")}
        </div>
        <div className="flex items-center gap-2">
          <div className="font-semibold text-lg">
            {Number(plan?.price)?.toLocaleString("ru")}
          </div>
          <p className="text-foreground-muted text-sm">
            UZS / {plan?.duration === 1 ? t("oylik") : t("yillik")}
          </p>
        </div>
      </div>
    </div>
  );
};
