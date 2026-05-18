import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";

import { $api } from "@/lib";
import { IBook, IQueryResponse } from "@/modules/common";

const LIMIT = 10;

export const useFinishedBooks = () => {
  const { data, ...args } = useInfiniteQuery<
    IQueryResponse<IBook>,
    Error,
    InfiniteData<IQueryResponse<IBook>, number>,
    string[],
    number
  >({
    queryKey: ["finished-books"],
    queryFn: async ({ pageParam }) => {
      const { data } = await $api.get("/book/FinishedBookList/", {
        params: { limit: LIMIT, offset: pageParam },
      });
      return data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      lastPage?.next ? lastPageParam + LIMIT : undefined,
  });

  const books = data?.pages?.flatMap((p) => p.results ?? []) ?? [];
  return { books, data, ...args };
};
