import {
  InfiniteData,
  keepPreviousData,
  useInfiniteQuery,
} from "@tanstack/react-query";

import { $api } from "@/lib";
import { IAuthor, IQueryResponse } from "@/modules/common";

const AUTHOR_LIMIT = 20;

interface IUseAuthorsListParams {
  search?: string;
  limit?: number;
}

export const useAuthorsList = ({
  search,
  limit = AUTHOR_LIMIT,
}: IUseAuthorsListParams = {}) => {
  const { data, ...args } = useInfiniteQuery<
    IQueryResponse<IAuthor>,
    Error,
    InfiniteData<IQueryResponse<IAuthor>, number>,
    (string | { search?: string; limit?: number })[],
    number
  >({
    queryKey: ["authors", { search, limit }],
    queryFn: async ({ pageParam }) => {
      const response = await $api.get("/book/AuthorList/", {
        params: { search, limit, offset: pageParam },
      });

      return response?.data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      lastPage?.next ? lastPageParam + limit : undefined,
    placeholderData: keepPreviousData,
  });

  const authors = data?.pages?.flatMap((page) => page?.results ?? []) ?? [];
  const totalCount = data?.pages?.[0]?.count ?? 0;

  return { authors, totalCount, data, ...args };
};
