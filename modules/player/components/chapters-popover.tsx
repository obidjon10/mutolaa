"use client";

import { Popover } from "@heroui/react";
import classNames from "classnames";

import { formatSecondsToTime } from "@/modules/common";
import { CollectionsIcon } from "@/modules/icons";

import { useAudioActions, useAudioPlayback } from "../context";

interface IProps {
  className?: string;
}

export const ChaptersPopover = ({ className }: IProps) => {
  const { chapters, currentChapterIndex } = useAudioPlayback();
  const { loadChapter } = useAudioActions();

  if (!chapters.length) {
    return <CollectionsIcon className={classNames("opacity-30", className)} />;
  }

  return (
    <Popover.Root>
      <Popover.Trigger>
        <button
          type="button"
          className={classNames(
            "transition-opacity hover:opacity-100",
            className,
          )}
          aria-label="Chapters"
        >
          <CollectionsIcon />
        </button>
      </Popover.Trigger>
      <Popover.Content
        placement="top"
        offset={8}
        className="z-50 overflow-hidden rounded-2xl border border-white/10 shadow-xl"
      >
        <Popover.Dialog className="outline-none p-2">
          <div className="max-h-72 w-64 overflow-y-auto space-y-1.5">
            {chapters.map((chapter, index) => {
              const active = index === currentChapterIndex;
              return (
                <button
                  key={chapter.id}
                  type="button"
                  onClick={() => loadChapter(index)}
                  className={classNames(
                    "flex w-full items-center rounded-full justify-between px-4 py-2.5 text-sm transition-colors",
                    active
                      ? "bg-muted dark:bg-muted-dark font-medium"
                      : " hover:bg-muted dark:hover:bg-muted-dark",
                  )}
                >
                  <span className="truncate text-left">{chapter.title}</span>
                  <span className="ml-3 shrink-0 tabular-nums text-xs">
                    {formatSecondsToTime(chapter.duration)}
                  </span>
                </button>
              );
            })}
          </div>
        </Popover.Dialog>
      </Popover.Content>
    </Popover.Root>
  );
};
