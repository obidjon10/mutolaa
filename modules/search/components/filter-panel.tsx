"use client";

import { useTranslations } from "next-intl";
import type { RefObject } from "react";

import type { ISearchFiltersState } from "../hooks/use-search-filters";
import { useTwoWayStickyScroll } from "../hooks/use-two-way-sticky";

// import { AgeFilter } from "./age-filter";
import { AuthorsFilter } from "./authors-filter";
import { CategoriesFilter } from "./categories-filter";
import { DubbersFilter } from "./dubbers-filter";
import { FilterSection } from "./filter-section";
import { PublishersFilter } from "./publishers-filter";
import { TopicsFilter } from "./topics-filter";

interface IProps extends Pick<
  ISearchFiltersState,
  | "ageRange"
  | "authorIds"
  | "topicIds"
  | "publisherIds"
  | "dubberIds"
  | "categoryIds"
> {
  clearAll: () => void;
  setTopicIds: (value: number[]) => void;
  setAuthorIds: (value: number[]) => void;
  setDubberIds: (value: number[]) => void;
  setCategoryIds: (value: number[]) => void;
  setPublisherIds: (value: number[]) => void;
  setAgeRange: (value: [number, number]) => void;
  stickyOffsetTopRef?: RefObject<HTMLElement | null>;
}

export const FilterPanel = ({
  clearAll,
  topicIds,
  // ageRange,
  authorIds,
  dubberIds,
  setTopicIds,
  categoryIds,
  // setAgeRange,
  publisherIds,
  setAuthorIds,
  setDubberIds,
  setCategoryIds,
  setPublisherIds,
  stickyOffsetTopRef,
}: IProps) => {
  const t = useTranslations();
  const stickyRef = useTwoWayStickyScroll<HTMLElement>({ offsetTopRef: stickyOffsetTopRef });

  return (
    <aside
      ref={stickyRef}
      className="rounded-2xl h-max bg-muted dark:bg-muted-dark p-2"
    >
      <div className="flex items-center p-2 justify-between pb-4 border-b border-gray-100 dark:border-[#27272A]">
        <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
          {t("filtr")}
        </h2>
        <button
          type="button"
          onClick={clearAll}
          className="text-sm cursor-pointer font-medium text-brand underline hover:text-orange-600 transition-colors"
        >
          {t("filtrlarni_tozalash")}
        </button>
      </div>

      <div className="mt-2 space-y-4">
        {/* <FilterSection title={t("yosh")}>
          <AgeFilter value={ageRange} onChange={setAgeRange} />
        </FilterSection> */}

        <FilterSection title={t("ruknlar")}>
          <CategoriesFilter value={categoryIds} onChange={setCategoryIds} />
        </FilterSection>

        <FilterSection title={t("mualliflar")}>
          <AuthorsFilter value={authorIds} onChange={setAuthorIds} />
        </FilterSection>

        <FilterSection title={t("suhandonlar")}>
          <DubbersFilter value={dubberIds} onChange={setDubberIds} />
        </FilterSection>

        <FilterSection title={t("sohalar")}>
          <TopicsFilter value={topicIds} onChange={setTopicIds} />
        </FilterSection>

        <FilterSection title={t("nashriyotlar")}>
          <PublishersFilter value={publisherIds} onChange={setPublisherIds} />
        </FilterSection>
      </div>
    </aside>
  );
};
