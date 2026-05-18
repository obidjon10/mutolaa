import {
  InfiniteData,
  keepPreviousData,
  useInfiniteQuery,
} from "@tanstack/react-query";

import { $api } from "@/lib";
import { IQueryResponse } from "@/modules/common";

import { IPublisher } from "../models";

const PUBLISHER_LIMIT = 20;

interface IUsePublishersListParams {
  search?: string;
  limit?: number;
}

export const usePublishersList = ({
  search,
  limit = PUBLISHER_LIMIT,
}: IUsePublishersListParams = {}) => {
  const { data, ...args } = useInfiniteQuery<
    IQueryResponse<IPublisher>,
    Error,
    InfiniteData<IQueryResponse<IPublisher>, number>,
    (string | { search?: string; limit?: number })[],
    number
  >({
    queryKey: ["publishers", { search, limit }],
    queryFn: async ({ pageParam }) => {
      const response = await $api.get("/marketplace/PublisherList/", {
        params: { search, limit, offset: pageParam },
      });

      return response?.data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      lastPage?.next ? lastPageParam + limit : undefined,
    placeholderData: keepPreviousData,
  });

  const publishers = data?.pages?.flatMap((page) => page?.results ?? []) ?? [];
  const totalCount = data?.pages?.[0]?.count ?? 0;

  return { publishers, totalCount, data, ...args };
};
