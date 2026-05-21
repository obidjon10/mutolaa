"use client";

import { Dropdown } from "@heroui/react";

import { ConditionalRender } from "@/modules/common";
import { XMarkIcon } from "@/modules/icons/x-mark-icon";

import type { IActiveFilterGroup } from "../hooks/use-filter-tags";

interface IProps {
  groups: IActiveFilterGroup[];
}

export const ActiveFiltersBar = ({ groups }: IProps) => {
  if (groups?.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {groups?.map((group) => {
        const extraCount = group?.allLabels?.length - 1;
        const isLoading = group.firstLabel === null;
        const hasMultiple = extraCount > 0;

        const labelText = (
          <>
            {group.firstLabel}
            {hasMultiple ? `, +${extraCount}` : null}
          </>
        );

        return (
          <div
            key={group?.id}
            className="inline-flex items-center gap-2 py-2 px-4 bg-muted dark:bg-muted-dark rounded-full"
          >
            <ConditionalRender
              if={isLoading}
              else={
                <ConditionalRender
                  if={hasMultiple}
                  else={
                    <span className="cursor-default font-semibold">
                      {labelText}
                    </span>
                  }
                >
                  <Dropdown>
                    <Dropdown.Trigger>
                      <span className="cursor-pointer font-semibold">
                        {labelText}
                      </span>
                    </Dropdown.Trigger>
                    <Dropdown.Popover
                      placement="bottom start"
                      className="rounded-xl"
                    >
                      {/* Display-only list — no onAction, items aren't actionable. */}
                      <Dropdown.Menu
                        aria-label={group.id}
                        className="p-1 min-w-48"
                      >
                        {group.allLabels.map((label, idx) => (
                          <Dropdown.Item
                            // eslint-disable-next-line react/no-array-index-key
                            key={idx}
                            id={`${group.id}-${idx}`}
                            textValue={label ?? ""}
                          >
                            {label ?? ""}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown.Popover>
                  </Dropdown>
                </ConditionalRender>
              }
            >
              <span
                aria-label="Loading filter label"
                className="inline-block h-4 w-20 rounded bg-gray-200 dark:bg-neutral-700 animate-pulse"
              />
            </ConditionalRender>
            <button
              type="button"
              onClick={group.onClear}
              aria-label={`Remove ${group.firstLabel ?? "filter"}`}
              className="cursor-pointer text-foreground-muted hover:text-foreground"
            >
              <XMarkIcon size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
