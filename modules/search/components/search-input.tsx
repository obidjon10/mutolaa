"use client";

import { useTranslations } from "next-intl";
import { SearchField } from "@heroui/react";
import type { Ref } from "react";

interface IProps {
  value: string;
  onChange: (value: string) => void;
  wrapperRef?: Ref<HTMLDivElement>;
}

export const SearchInput = ({ value, onChange, wrapperRef }: IProps) => {
  const t = useTranslations();

  return (
    <div ref={wrapperRef} className="sticky top-0 z-90 w-full rounded-t-2xl bg-white dark:bg-black p-6 sm:p-8">
      <SearchField name="search" value={value} onChange={onChange} autoFocus className="w-full">
        <SearchField.Group className="bg-muted dark:bg-muted-dark shadow-none h-11 rounded-xl">
          <SearchField.SearchIcon />
          <SearchField.Input id="page-search-input" placeholder={t("kitob_yoki_muallifni_izlang")} />
          <SearchField.ClearButton />
        </SearchField.Group>
      </SearchField>
    </div>
  );
};
