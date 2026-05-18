import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";

import { BOOK_LIST_LIMIT, commonQueryKeys } from "../constants";
import { getBookList, IBookListParams } from "../queries/get-book-list";
import type { IBook } from "../types/book";
import type { IQueryResponse } from "../types/query-response";

type UseBookListParamsType = Omit<IBookListParams, "limit" | "offset"> & {
  limit?: number;
  enabled?: boolean;
};

export const useBookList = ({
  limit = BOOK_LIST_LIMIT,
  enabled,
  ...filters
}: UseBookListParamsType = {}) => {
  const { data, ...args } = useInfiniteQuery<
    IQueryResponse<IBook>,
    Error,
    InfiniteData<IQueryResponse<IBook>, number>,
    (string | UseBookListParamsType)[],
    number
  >({
    queryKey: [commonQueryKeys.BOOK_LIST, { ...filters, limit }],
    queryFn: ({ pageParam }) =>
      getBookList({ ...filters, limit, offset: pageParam })(),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      lastPage?.next ? lastPageParam + limit : undefined,
    enabled,
  });

  const books = data?.pages?.flatMap((page) => page?.results ?? []) ?? [];
  const totalCount = data?.pages?.[0]?.count ?? 0;

  return { books, totalCount, data, ...args };
};
