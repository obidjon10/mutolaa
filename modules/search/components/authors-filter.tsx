"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { useAuthorsList } from "@/modules/authors";

import { CheckboxFilter } from "./checkbox-filter";
import { CheckboxFilterSkeleton } from "./checkbox-filter-skeleton";

interface IProps {
  value: number[];
  onChange: (value: number[]) => void;
}

export const AuthorsFilter = ({ value, onChange }: IProps) => {
  const t = useTranslations();
  const [search, setSearch] = useState("");

  const {
    authors,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    totalCount,
    isLoading,
  } = useAuthorsList({ search });

  const options = authors?.map((author) => ({
    id: author?.id,
    label: author?.name,
  }));

  if (isLoading) return <CheckboxFilterSkeleton />;

  return (
    <CheckboxFilter
      ariaLabel={t("mualliflar")}
      options={options}
      value={value}
      onChange={onChange}
      searchPlaceholder={t("mualliflarni_qidirish")}
      onSearchChange={setSearch}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      isFetchingNextPage={isFetchingNextPage}
      totalCount={totalCount}
    />
  );
};
