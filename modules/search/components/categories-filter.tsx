"use client";

import { useTranslations } from "next-intl";

import { useCategories } from "@/modules/home";

import { CheckboxFilter } from "./checkbox-filter";
import { CheckboxFilterSkeleton } from "./checkbox-filter-skeleton";

interface IProps {
  value: number[];
  onChange: (value: number[]) => void;
}

export const CategoriesFilter = ({ value, onChange }: IProps) => {
  const t = useTranslations();
  const { categories, isLoading } = useCategories();

  if (isLoading) return <CheckboxFilterSkeleton />;

  return (
    <CheckboxFilter
      ariaLabel={t("ruknlar")}
      options={categories?.map((category) => ({
        id: category?.id,
        label: category?.title,
      }))}
      value={value}
      onChange={onChange}
    />
  );
};
