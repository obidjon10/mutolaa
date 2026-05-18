"use client";

import { useTranslations } from "next-intl";

import { useMarketHeader } from "@/modules/market";

import { CheckboxFilter } from "./checkbox-filter";
import { CheckboxFilterSkeleton } from "./checkbox-filter-skeleton";

interface IProps {
  value: number[];
  onChange: (value: number[]) => void;
}

export const TopicsFilter = ({ value, onChange }: IProps) => {
  const t = useTranslations();
  const { marketHeader, isLoading } = useMarketHeader();

  if (isLoading) return <CheckboxFilterSkeleton />;

  return (
    <CheckboxFilter
      ariaLabel={t("sohalar")}
      options={marketHeader?.book_topics?.map((topic) => ({
        id: topic.id,
        label: topic.title,
      }))}
      value={value}
      onChange={onChange}
    />
  );
};
