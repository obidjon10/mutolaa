"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Checkbox, CheckboxGroup, SearchField } from "@heroui/react";
import classNames from "classnames";

import { ConditionalRender, useDebouncedValue } from "@/modules/common";
import { ChevronDownIcon } from "@/modules/icons";

import type { IFilterOption } from "../constants";

const INITIAL_VISIBLE_COUNT = 4;

interface IProps {
  options?: IFilterOption[];
  value: number[];
  onChange: (value: number[]) => void;
  searchPlaceholder?: string;
  ariaLabel: string;
  onSearchChange?: (value: string) => void;
  hasNextPage?: boolean;
  fetchNextPage?: () => void;
  isFetchingNextPage?: boolean;
  totalCount?: number;
}

export const CheckboxFilter = ({
  options,
  value,
  onChange,
  searchPlaceholder,
  ariaLabel,
  onSearchChange,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
  totalCount,
}: IProps) => {
  const t = useTranslations();
  const [query, setQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const filteredOptions = useMemo(() => {
    if (onSearchChange) return options; // Backend search
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return options;
    return options?.filter((option) =>
      option.label?.toLowerCase().includes(trimmed),
    );
  }, [options, query, onSearchChange]);

  const visibleOptions = isExpanded
    ? filteredOptions
    : filteredOptions?.slice(0, INITIAL_VISIBLE_COUNT);

  const canToggle = onSearchChange
    ? (totalCount || 0) > INITIAL_VISIBLE_COUNT
    : (options?.length || 0) > INITIAL_VISIBLE_COUNT;

  const handleToggle = useCallback(() => {
    setIsExpanded((prev) => {
      if (prev && !onSearchChange) setQuery("");
      return !prev;
    });
  }, [onSearchChange]);

  const debouncedQuery = useDebouncedValue(query, 500);

  useEffect(() => {
    if (onSearchChange) {
      onSearchChange(debouncedQuery);
    }
  }, [debouncedQuery, onSearchChange]);

  return (
    <div className="space-y-3 bg-white dark:bg-black p-3 rounded-2xl">
      <ConditionalRender if={isExpanded && searchPlaceholder}>
        <SearchField
          name={`${ariaLabel}-search`}
          value={query}
          onChange={setQuery}
        >
          <SearchField.Group className="bg-muted dark:bg-muted-dark shadow-none h-9 rounded-xl">
            <SearchField.SearchIcon />
            <SearchField.Input placeholder={searchPlaceholder} />
            <SearchField.ClearButton />
          </SearchField.Group>
        </SearchField>
      </ConditionalRender>

      <CheckboxGroup
        aria-label={ariaLabel}
        value={value?.map(String) ?? []}
        onChange={(next) => onChange(next.map(Number))}
        className={classNames(
          "flex flex-col divide-y divide-muted dark:divide-[#27272A] *:data-[slot=checkbox]:mt-0 *:data-[slot=checkbox]:py-3",
          {
            "max-h-70 overflow-y-auto pr-1": isExpanded,
          },
        )}
      >
        {visibleOptions?.map((option) => (
          <Checkbox
            key={option.id}
            value={String(option.id)}
            className="flex items-start gap-2.5 cursor-pointer text-sm"
            variant="secondary"
          >
            <Checkbox.Control className="size-5">
              <Checkbox.Indicator />
            </Checkbox.Control>
            <Checkbox.Content className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {option.label}
            </Checkbox.Content>
          </Checkbox>
        ))}
      </CheckboxGroup>

      <ConditionalRender if={canToggle}>
        <button
          type="button"
          onClick={handleToggle}
          className="flex items-center cursor-pointer gap-1 text-sm font-medium text-foreground-muted hover:text-brand transition-colors"
        >
          {isExpanded ? t("kichraytirish") : t("koproq")}
          <ChevronDownIcon
            size={16}
            className={classNames("transition-transform duration-200", {
              "rotate-180": isExpanded,
            })}
          />
        </button>
      </ConditionalRender>

      <ConditionalRender if={isExpanded && !!hasNextPage}>
        <button
          type="button"
          onClick={fetchNextPage}
          disabled={isFetchingNextPage}
          className="flex items-center w-full justify-center cursor-pointer gap-1 text-sm font-medium text-foreground-muted hover:text-brand transition-colors py-2 bg-muted dark:bg-[#27272A] rounded-xl"
        >
          {isFetchingNextPage ? "..." : t("yana_korsatish")}
        </button>
      </ConditionalRender>
    </div>
  );
};
