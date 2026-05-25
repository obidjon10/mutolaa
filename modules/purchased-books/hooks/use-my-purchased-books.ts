import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";

import { $api } from "@/lib";
import type { IBook, IQueryResponse } from "@/modules/common";

const LIMIT = 10;

export const useMyPurchasedBooks = (enabled = true) => {
  const { data, ...args } = useInfiniteQuery<
    IQueryResponse<IBook>,
    Error,
    InfiniteData<IQueryResponse<IBook>, number>,
    string[],
    number
  >({
    queryKey: ["my-purchased-books"],
    queryFn: async ({ pageParam }) => {
      const { data } = await $api.get("/marketplace/MyPurchasedBooks/", {
        params: { limit: LIMIT, offset: pageParam },
      });
      return data;
    },
    enabled,
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      lastPage?.next ? lastPageParam + LIMIT : undefined,
  });

  const books = data?.pages?.flatMap((p) => p?.results ?? []) ?? [];
  const totalCount = data?.pages?.[0]?.count ?? 0;
  return { books, totalCount, data, ...args };
};
