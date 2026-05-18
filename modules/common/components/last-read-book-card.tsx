"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ProgressBar } from "@heroui/react";

import type { ILastReadBook } from "@/modules/home";
import { ArrowRightIcon, BookOpenIcon } from "@/modules/icons";

import { BookCover } from "./book-cover";

interface IProps {
  lastReadBook?: ILastReadBook | null;
  showDetailsLink?: boolean;
}

// Shelf surface sits ~32% above the image bottom; image renders full-width, so
// the surface lands at ~9% of card width from the bottom. Cap to 3rem so wide
// cards don't push the book past the card top (the card is overflow-hidden).
// Progress sits a bit higher than the book bottom — matches the Figma spacing.
const BOOK_BOTTOM = "pb-[min(9%,2rem)] sm:pb-[min(9%,2.5rem)] lg:pb-[min(9%,3rem)]";
const PROGRESS_BOTTOM = "pb-10 sm:pb-12 lg:pb-16 xl:pb-23";

export const LastReadBookCard: React.FC<IProps> = ({
  lastReadBook,
  showDetailsLink = false,
}) => {
  const t = useTranslations();
  const percentage = lastReadBook?.finished_percentage ?? 0;
  const href = `/book/${lastReadBook?.book?.slug}`;
  const wrapperClass =
    "group bg-muted dark:bg-muted-dark relative h-60 rounded-2xl overflow-hidden block";

  const body = (
    <>
      <Image
        width={2072}
        height={584}
        loading="eager"
        alt={t("kitob_javoni")}
        src="/last-book-shelf.webp"
        className="absolute inset-x-0 bottom-0 w-full h-auto pointer-events-none select-none"
      />

      <div className="absolute inset-0 flex gap-4 sm:gap-6 px-6 pt-6">
        <div className={`flex items-end shrink-0 ${BOOK_BOTTOM}`}>
          <BookCover
            cover={lastReadBook?.book?.image || ""}
            width={113}
            height={173}
            title={lastReadBook?.book?.title || "Last read book"}
            rounded="rounded-xs"
            fluid
            className="w-22 sm:w-24 lg:w-28"
            sizes="(min-width: 1024px) 112px, (min-width: 640px) 96px, 88px"
            interactive
          />
        </div>

        <div className={`flex flex-col flex-1 min-w-0 ${PROGRESS_BOTTOM}`}>
          <div className="min-w-0">
            <p className="font-semibold text-lg line-clamp-2 duration-300 group-hover:text-brand transition-colors">
              {lastReadBook?.book?.title}
            </p>
            <p className="mt-1 text-foreground-muted line-clamp-1">
              {lastReadBook?.book?.authors?.[0]?.name}
            </p>
          </div>

          <div className="mt-auto flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <BookOpenIcon className="text-foreground-muted shrink-0 mt-1" />
              <ProgressBar
                size="lg"
                value={percentage}
                className="flex-1 max-w-32 sm:max-w-36 lg:max-w-40 xl:max-w-60"
                aria-label="Reading progress"
              >
                <ProgressBar.Track className="bg-gray-200 dark:bg-neutral-700">
                  <ProgressBar.Fill />
                </ProgressBar.Track>
              </ProgressBar>
              <p className="font-medium text-foreground-muted shrink-0">
                {percentage}%
              </p>
            </div>

            {showDetailsLink && (
              <Link
                href={href}
                className="font-medium text-sm underline inline-flex items-center gap-1 self-start z-10"
              >
                {t("batafsil")}
                <ArrowRightIcon />
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );

  if (showDetailsLink) {
    return <div className={wrapperClass}>{body}</div>;
  }

  return (
    <Link href={href} className={wrapperClass}>
      {body}
    </Link>
  );
};
