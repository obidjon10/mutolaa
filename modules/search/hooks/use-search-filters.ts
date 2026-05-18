"use client";

import { useCallback, useMemo } from "react";
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  useQueryStates,
} from "nuqs";

import { AGE_BOUNDS, DEFAULT_AGE_RANGE } from "../constants";

export interface ISearchFiltersState {
  search: string;
  ageRange: [number, number];
  authorIds: number[];
  dubberIds: number[];
  topicIds: number[];
  categoryIds: number[];
  publisherIds: number[];
}

const SEARCH_FILTER_PARSERS = {
  q: parseAsString.withDefault(""),
  ageMin: parseAsInteger.withDefault(AGE_BOUNDS.min),
  ageMax: parseAsInteger.withDefault(AGE_BOUNDS.max),
  authors: parseAsArrayOf(parseAsInteger).withDefault([]),
  dubbers: parseAsArrayOf(parseAsInteger).withDefault([]),
  topics: parseAsArrayOf(parseAsInteger).withDefault([]),
  categories: parseAsArrayOf(parseAsInteger).withDefault([]),
  publishers: parseAsArrayOf(parseAsInteger).withDefault([]),
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export const useSearchFilters = () => {
  const [values, setValues] = useQueryStates(SEARCH_FILTER_PARSERS, {
    history: "replace",
    shallow: true,
    scroll: false,
    clearOnDefault: true,
  });

  const ageRange = useMemo<[number, number]>(() => {
    const min = clamp(values.ageMin, AGE_BOUNDS.min, AGE_BOUNDS.max);
    const max = clamp(values.ageMax, AGE_BOUNDS.min, AGE_BOUNDS.max);
    return min <= max ? [min, max] : [max, min];
  }, [values.ageMin, values.ageMax]);

  const setSearch = useCallback(
    (search: string) => {
      setValues({ q: search });
    },
    [setValues],
  );

  const setAgeRange = useCallback(
    ([min, max]: [number, number]) => {
      setValues({ ageMin: min, ageMax: max });
    },
    [setValues],
  );

  const setAuthorIds = useCallback(
    (authorIds: number[]) => {
      setValues({ authors: authorIds });
    },
    [setValues],
  );

  const setTopicIds = useCallback(
    (topicIds: number[]) => {
      setValues({ topics: topicIds });
    },
    [setValues],
  );

  const setCategoryIds = useCallback(
    (categoryIds: number[]) => {
      setValues({ categories: categoryIds });
    },
    [setValues],
  );

  const setPublisherIds = useCallback(
    (publisherIds: number[]) => {
      setValues({ publishers: publisherIds });
    },
    [setValues],
  );

  const setDubberIds = useCallback(
    (dubberIds: number[]) => {
      setValues({ dubbers: dubberIds });
    },
    [setValues],
  );

  const clearAll = useCallback(() => {
    setValues(null);
  }, [setValues]);

  const hasActiveFilters = useMemo(() => {
    const isDefaultAge =
      ageRange[0] === DEFAULT_AGE_RANGE[0] &&
      ageRange[1] === DEFAULT_AGE_RANGE[1];
    return (
      values.q.length > 0 ||
      !isDefaultAge ||
      values.authors.length > 0 ||
      values.topics.length > 0 ||
      values.categories.length > 0 ||
      values.dubbers.length > 0 ||
      values.publishers.length > 0
    );
  }, [
    ageRange,
    values.q,
    values.authors,
    values.topics,
    values.categories,
    values.dubbers,
    values.publishers,
  ]);

  return {
    ageRange,
    search: values.q,
    topicIds: values.topics,
    dubberIds: values.dubbers,
    authorIds: values.authors,
    categoryIds: values.categories,
    publisherIds: values.publishers,
    clearAll,
    setSearch,
    setTopicIds,
    setAgeRange,
    setAuthorIds,
    setDubberIds,
    setCategoryIds,
    setPublisherIds,
    hasActiveFilters,
  };
};
