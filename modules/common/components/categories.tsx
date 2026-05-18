import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import classNames from "classnames";

import { HashtagIcon } from "@/modules/icons";

import { ConditionalRender } from "./conditional-render";

interface IProps {
  showTitle?: boolean;
  isIndustry?: boolean;
  categories?: { title?: string; id?: number }[];
}

export const Categories: React.FC<IProps> = ({
  categories,
  showTitle = true,
  isIndustry = false,
}) => {
  const t = useTranslations();

  return (
    <div>
      <ConditionalRender if={showTitle}>
        <div className="font-semibold text-xl">{t("kategoriyalar")}</div>
      </ConditionalRender>

      <div
        className={classNames("flex flex-wrap gap-2", {
          "mt-5": showTitle,
        })}
      >
        {categories?.map((item) => (
          <Link
            href={`/search?${isIndustry ? `topics=${item?.id}` : `categories=${item?.id}`}`}
            key={item?.id}
            className="text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer flex px-2.5 py-1.5 items-center gap-0.5 justify-center border border-[#E4E4E7] dark:border-gray-800 rounded-lg"
          >
            <HashtagIcon />
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
};
