import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";

import { DISCOVER_SECTION_LIMIT, queryKeys } from "../constants";
import { IDiscoverSectionListResponse } from "../models";
import { getDiscoverSectionList } from "../queries/get-discover-section-list";

interface IUseDiscoverSectionListParams {
  search?: string;
  limit?: number;
}

export const useDiscoverSectionList = ({
  search,
  limit = DISCOVER_SECTION_LIMIT,
}: IUseDiscoverSectionListParams = {}) => {
  const { data, ...args } = useInfiniteQuery<
    IDiscoverSectionListResponse,
    Error,
    InfiniteData<IDiscoverSectionListResponse, number>,
    (string | { search?: string; limit: number })[],
    number
  >({
    queryKey: [queryKeys.DISCOVER_SECTION_LIST, { search, limit }],
    queryFn: ({ pageParam }) =>
      getDiscoverSectionList({ search, limit, offset: pageParam })(),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      lastPage?.next ? lastPageParam + limit : undefined,
  });

  const discoverSections =
    data?.pages?.flatMap((page) => page?.results ?? []) ?? [];
  const totalCount = data?.pages?.[0]?.count ?? 0;

  return { discoverSections, totalCount, data, ...args };
};
