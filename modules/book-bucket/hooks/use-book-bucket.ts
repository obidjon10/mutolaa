import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";

import { $api } from "@/lib";
import { IBook, IQueryResponse } from "@/modules/common";

const LIMIT = 20;

export const useBookBucket = (slug: string) => {
  const { data, ...args } = useInfiniteQuery<
    IQueryResponse<IBook>,
    Error,
    InfiniteData<IQueryResponse<IBook>, number>,
    string[],
    number
  >({
    queryKey: ["book-bucket", slug],
    queryFn: async ({ pageParam }) => {
      const { data } = await $api.get(`/web/home/BucketBooks/${slug}`, {
        params: { limit: LIMIT, offset: pageParam },
      });

      return data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      lastPage?.next ? lastPageParam + LIMIT : undefined,
  });

  const bookBucket = data?.pages?.flatMap((page) => page?.results ?? []) ?? [];
  const totalCount = data?.pages?.[0]?.count ?? 0;
  const title = data?.pages?.[0]?.title;

  return { bookBucket, totalCount, title, data, ...args };
};
