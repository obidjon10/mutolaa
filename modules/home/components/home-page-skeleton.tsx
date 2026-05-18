import Image from "next/image";
import { useTranslations } from "next-intl";

import { BookSkeleton, ConditionalRender } from "@/modules/common";

interface IProps {
  onlyLastBookSkeleton?: boolean;
}

export function AuthenticatedSection({ onlyLastBookSkeleton = false }: IProps) {
  const t = useTranslations();

  return (
    <div className="grid grid-cols-2 gap-6 px-6 sm:px-8">
      <div className="bg-muted dark:bg-muted-dark animate-pulse h-60 relative rounded-2xl overflow-hidden">
        <div className="flex gap-6 m-6">
          <BookSkeleton width={113} height={173} />
          <div className="flex flex-col mt-3">
            <div className="space-y-2">
              <div className="h-6 w-40 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />
              <div className="h-4 w-35 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />
            </div>
            <div className="flex items-center h-35.25 justify-between gap-2">
              <div className="size-4 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
              <div className="h-4 w-40.25 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
              <div className="h-4 w-8 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0">
          <Image
            width={708.4}
            height={225}
            loading="eager"
            alt={t("kitob_javoni")}
            src="/last-book-shelf.webp"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
      <ConditionalRender if={!onlyLastBookSkeleton}>
        <div className="bg-muted p-4 dark:bg-muted-dark h-60 relative rounded-2xl animate-pulse">
          <div className="flex items-center justify-between">
            <div className="h-6 w-40 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />
            <div className="h-6 w-30 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />
          </div>

          <div className="flex gap-7.5 mt-6">
            <div className="size-39 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />

            <div className="flex-1 gap-2">
              <div className="w-full h-19.5 rounded-2xl bg-gray-200 dark:bg-gray-700 animate-pulse" />

              <div className="flex items-center mt-2 gap-2">
                <div className="w-full h-19.5 rounded-2xl bg-gray-200 dark:bg-gray-700 animate-pulse" />
                <div className="w-full h-19.5 rounded-2xl bg-gray-200 dark:bg-gray-700 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </ConditionalRender>
    </div>
  );
}
