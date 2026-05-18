"use client";

import { Tag, TagGroup } from "@heroui/react";
import type { Key } from "react";

import type { IActiveFilterGroup } from "../hooks/use-filter-tags";

interface IProps {
  groups: IActiveFilterGroup[];
}

export const ActiveFiltersBar = ({ groups }: IProps) => {
  if (groups?.length === 0) return null;

  const handleRemove = (keys: Set<Key>) => {
    keys?.forEach((key) => {
      groups?.find((g) => g?.id === key)?.onClear();
    });
  };

  return (
    <TagGroup onRemove={handleRemove}>
      <TagGroup.List className="flex flex-wrap gap-2">
        {groups?.map((group) => {
          const extraCount = group?.allLabels?.length - 1;
          const isLoading = group.firstLabel === null;

          return (
            <Tag
              id={group?.id}
              key={group?.id}
              textValue={group?.firstLabel ?? ""}
              className="py-2 px-4 bg-muted dark:bg-muted-dark"
            >
              {isLoading ? (
                <span
                  aria-label="Loading filter label"
                  className="inline-block h-4 w-20 rounded bg-gray-200 dark:bg-neutral-700 animate-pulse"
                />
              ) : (
                <span className="cursor-default font-semibold">
                  {group.firstLabel}
                  {extraCount !== 0 ? `, +${extraCount}` : null}
                </span>
              )}
            </Tag>
          );
        })}
      </TagGroup.List>
    </TagGroup>
  );
};
