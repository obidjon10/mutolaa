"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { usePublishersList } from "@/modules/market/hooks/use-publishers-list";

import { CheckboxFilter } from "./checkbox-filter";
import { CheckboxFilterSkeleton } from "./checkbox-filter-skeleton";

interface IProps {
  value: number[];
  onChange: (value: number[]) => void;
}

export const PublishersFilter = ({ value, onChange }: IProps) => {
  const t = useTranslations();
  const [search, setSearch] = useState("");

  const {
    publishers,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    totalCount,
    isLoading,
  } = usePublishersList({ search });

  const options = publishers?.map((publisher) => ({
    id: publisher?.id,
    label: publisher?.name,
  }));

  if (isLoading) return <CheckboxFilterSkeleton />;

  return (
    <CheckboxFilter
      ariaLabel={t("nashriyotlar")}
      options={options}
      value={value}
      onChange={onChange}
      onSearchChange={setSearch}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      isFetchingNextPage={isFetchingNextPage}
      totalCount={totalCount}
    />
  );
};
