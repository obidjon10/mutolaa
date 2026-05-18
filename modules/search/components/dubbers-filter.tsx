"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { useDubbersList } from "../hooks/use-dubbers-list";

import { CheckboxFilter } from "./checkbox-filter";
import { CheckboxFilterSkeleton } from "./checkbox-filter-skeleton";

interface IProps {
  value: number[];
  onChange: (value: number[]) => void;
}

export const DubbersFilter = ({ value, onChange }: IProps) => {
  const t = useTranslations();
  const [search, setSearch] = useState("");

  const {
    dubbers,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    totalCount,
    isLoading,
  } = useDubbersList({ search });

  const options = dubbers?.map((dubber) => ({
    id: dubber?.id,
    label: dubber?.name,
  }));

  if (isLoading) return <CheckboxFilterSkeleton />;

  return (
    <CheckboxFilter
      ariaLabel={t("suhandonlar")}
      options={options}
      value={value}
      onChange={onChange}
      searchPlaceholder={t("suhandonlarni_qidirish")}
      onSearchChange={setSearch}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      isFetchingNextPage={isFetchingNextPage}
      totalCount={totalCount}
    />
  );
};
