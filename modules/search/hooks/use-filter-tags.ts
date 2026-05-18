"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";

import { useCategories } from "@/modules/home";
import { useMarketHeader } from "@/modules/market";
import { usePublishersList } from "@/modules/market/hooks/use-publishers-list";

import { useAuthorsList } from "../../authors/hooks/use-authors-list";
import { DEFAULT_AGE_RANGE } from "../constants";

import { useDubbersList } from "./use-dubbers-list";
import { useFilterLabel } from "./use-filter-label-cache";

export interface IActiveFilterGroup {
  id: string;
  // `null` signals the label hasn't been resolved yet (paginated list hasn't
  // reached this id and no upstream page pre-seeded it via SearchLink). The
  // chip renders a skeleton in that state.
  firstLabel: string | null;
  allLabels: (string | null)[];
  onClear: () => void;
}

interface IParams {
  ageRange: [number, number];
  authorIds: number[];
  topicIds: number[];
  dubberIds: number[];
  categoryIds: number[];
  publisherIds: number[];
  setAgeRange: (value: [number, number]) => void;
  setAuthorIds: (value: number[]) => void;
  setTopicIds: (value: number[]) => void;
  setDubberIds: (value: number[]) => void;
  setCategoryIds: (value: number[]) => void;
  setPublisherIds: (value: number[]) => void;
}

export const useFilterTags = ({
  ageRange,
  authorIds,
  topicIds,
  dubberIds,
  categoryIds,
  publisherIds,
  setAgeRange,
  setAuthorIds,
  setTopicIds,
  setDubberIds,
  setCategoryIds,
  setPublisherIds,
}: IParams): IActiveFilterGroup[] => {
  const t = useTranslations();
  const { marketHeader } = useMarketHeader();
  const { categories } = useCategories();
  const { authors } = useAuthorsList();
  const { dubbers } = useDubbersList();
  const { publishers } = usePublishersList();
  const getLabel = useFilterLabel();

  return useMemo(() => {
    const groups: IActiveFilterGroup[] = [];

    const resolveLabels = (
      param: string,
      ids: number[],
      options: { id: number; label: string }[],
    ): (string | null)[] =>
      ids.map(
        (id) =>
          options.find((o) => o.id === id)?.label ?? getLabel(param, id) ?? null,
      );

    const pushGroup = (
      id: string,
      param: string,
      ids: number[],
      options: { id: number; label: string }[],
      onClear: () => void,
    ) => {
      if (!ids.length) return;
      const labels = resolveLabels(param, ids, options);
      groups.push({ id, firstLabel: labels[0], allLabels: labels, onClear });
    };

    const isDefaultAge =
      ageRange[0] === DEFAULT_AGE_RANGE[0] && ageRange[1] === DEFAULT_AGE_RANGE[1];

    if (!isDefaultAge) {
      const label = `${ageRange[0]}-${ageRange[1]} ${t("yosh")}`;
      groups.push({
        id: "age",
        firstLabel: label,
        allLabels: [label],
        onClear: () => setAgeRange(DEFAULT_AGE_RANGE),
      });
    }

    pushGroup(
      "topics",
      "topics",
      topicIds,
      marketHeader?.book_topics?.map((topic) => ({ id: topic.id, label: topic.title })) ?? [],
      () => setTopicIds([]),
    );

    pushGroup(
      "categories",
      "categories",
      categoryIds,
      categories?.map((c) => ({ id: c.id, label: c.title })) ?? [],
      () => setCategoryIds([]),
    );

    pushGroup(
      "authors",
      "authors",
      authorIds,
      authors.map((a) => ({ id: a.id, label: a.name })),
      () => setAuthorIds([]),
    );

    pushGroup(
      "dubbers",
      "dubbers",
      dubberIds,
      dubbers.map((d) => ({ id: d.id, label: d.name })),
      () => setDubberIds([]),
    );

    pushGroup(
      "publishers",
      "publishers",
      publisherIds,
      publishers.map((p) => ({ id: p.id, label: p.name })),
      () => setPublisherIds([]),
    );

    return groups;
  }, [
    ageRange, topicIds, categoryIds, authorIds, dubberIds, publisherIds,
    marketHeader, categories, authors, dubbers, publishers,
    t, getLabel,
    setAgeRange, setTopicIds, setCategoryIds, setAuthorIds, setDubberIds, setPublisherIds,
  ]);
};
