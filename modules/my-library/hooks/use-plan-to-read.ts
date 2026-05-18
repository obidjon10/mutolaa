import {
  InfiniteData,
  useInfiniteQuery,
} from "@tanstack/react-query";

import { $api } from "@/lib";
import { IBook, IQueryResponse } from "@/modules/common";

const LIMIT = 10;

export const usePlanToReadList = () => {
  const { data, ...args } = useInfiniteQuery<
    IQueryResponse<IBook>,
    Error,
    InfiniteData<IQueryResponse<{ id?: number; book?: IBook }>, number>,
    string[],
    number
  >({
    queryKey: ["plan-to-read"],
    queryFn: async ({ pageParam }) => {
      const { data } = await $api.get("/book/PlanToReadList/", {
        params: { limit: LIMIT, offset: pageParam },
      });
      return data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      lastPage?.next ? lastPageParam + LIMIT : undefined,
  });

  const planToRead = data?.pages?.flatMap((p) => p.results ?? []) ?? [];
  return { planToRead, data, ...args };
};