import {
  InfiniteData,
  keepPreviousData,
  useInfiniteQuery,
} from "@tanstack/react-query";

import { $api } from "@/lib";
import { IDubber } from "@/modules/book-detail/models";
import { IQueryResponse } from "@/modules/common";

const DUBBER_LIMIT = 20;

interface IUseDubbersListParams {
  search?: string;
  limit?: number;
}

export const useDubbersList = ({
  search,
  limit = DUBBER_LIMIT,
}: IUseDubbersListParams = {}) => {
  const { data, ...args } = useInfiniteQuery<
    IQueryResponse<IDubber>,
    Error,
    InfiniteData<IQueryResponse<IDubber>, number>,
    (string | { search?: string; limit?: number })[],
    number
  >({
    queryKey: ["dubbers", { search, limit }],
    queryFn: async ({ pageParam }) => {
      const response = await $api.get("/book/DubberList/", {
        params: { search, limit, offset: pageParam },
      });

      return response?.data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      lastPage?.next ? lastPageParam + limit : undefined,
    placeholderData: keepPreviousData,
  });

  const dubbers = data?.pages?.flatMap((page) => page?.results ?? []) ?? [];
  const totalCount = data?.pages?.[0]?.count ?? 0;

  return { dubbers, totalCount, data, ...args };
};
