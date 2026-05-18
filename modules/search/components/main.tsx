"use client";

import { useRef } from "react";

import { useDebouncedValue } from "@/modules/common";

import { useSearchFilters } from "../hooks";
import { useFilterTags } from "../hooks/use-filter-tags";

import { ActiveFiltersBar } from "./active-filters-bar";
import { FilterPanel } from "./filter-panel";
import { ResultsGrid } from "./results-grid";
import { SearchInput } from "./search-input";

const SEARCH_DEBOUNCE_MS = 300;

export const Main = () => {
  const {
    search,
    clearAll,
    topicIds,
    ageRange,
    authorIds,
    dubberIds,
    setSearch,
    setTopicIds,
    categoryIds,
    setAgeRange,
    setAuthorIds,
    setDubberIds,
    publisherIds,
    setCategoryIds,
    setPublisherIds,
  } = useSearchFilters();

  const debouncedSearch = useDebouncedValue(search.trim(), SEARCH_DEBOUNCE_MS);
  const searchInputRef = useRef<HTMLDivElement>(null);

  const filterGroups = useFilterTags({
    ageRange,
    topicIds,
    authorIds,
    dubberIds,
    categoryIds,
    publisherIds,
    setAgeRange,
    setTopicIds,
    setAuthorIds,
    setDubberIds,
    setCategoryIds,
    setPublisherIds,
  });

  return (
    <div className="mx-auto h-max my-4 mr-4 rounded-2xl bg-white dark:bg-black shadow-card">
      <SearchInput value={search} onChange={setSearch} wrapperRef={searchInputRef} />

      <div className="mt-3 grid grid-cols-1 px-6 pb-6 sm:px-8 sm:pb-8 lg:grid-cols-[300px_1fr] gap-6">
        <FilterPanel
          clearAll={clearAll}
          ageRange={ageRange}
          topicIds={topicIds}
          authorIds={authorIds}
          dubberIds={dubberIds}
          categoryIds={categoryIds}
          setAgeRange={setAgeRange}
          setTopicIds={setTopicIds}
          publisherIds={publisherIds}
          setAuthorIds={setAuthorIds}
          setDubberIds={setDubberIds}
          setCategoryIds={setCategoryIds}
          setPublisherIds={setPublisherIds}
          stickyOffsetTopRef={searchInputRef}
        />

        <div className="flex flex-col gap-4">
          <ActiveFiltersBar groups={filterGroups} />
          <ResultsGrid
            topicIds={topicIds}
            ageRange={ageRange}
            authorIds={authorIds}
            dubberIds={dubberIds}
            search={debouncedSearch}
            categoryIds={categoryIds}
            publisherIds={publisherIds}
          />
        </div>
      </div>
    </div>
  );
};
