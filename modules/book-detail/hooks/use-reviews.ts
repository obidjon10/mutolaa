import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";

import { $api } from "@/lib";
import { IQueryResponse } from "@/modules/common";

import type { IReview } from "../models";

const REVIEWS_LIMIT = 10;

export const useReviews = (bookId?: number) => {
  const { data, ...args } = useInfiniteQuery<
    IQueryResponse<IReview>,
    Error,
    InfiniteData<IQueryResponse<IReview>, number>,
    (string | number | undefined)[],
    number
  >({
    queryKey: ["book-reviews", bookId],
    queryFn: async ({ pageParam }) => {
      const { data } = await $api.get(
        `/web/book/BookReviewList/${bookId}/`,
        { params: { limit: REVIEWS_LIMIT, offset: pageParam } },
      );
      return data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      lastPage?.next ? lastPageParam + REVIEWS_LIMIT : undefined,
    enabled: !!bookId,
  });

  const results = data?.pages?.flatMap((page) => page?.results ?? []) ?? [];
  const totalCount = data?.pages?.[0]?.count ?? 0;

  return { reviews: { results, count: totalCount }, data, ...args };
};
