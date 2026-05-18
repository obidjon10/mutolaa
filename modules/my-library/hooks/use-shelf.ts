import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";

import { $api } from "@/lib";
import { IBook, IQueryResponse } from "@/modules/common";

import { IShelf } from "../models";

const SHELF_LIMIT = 12;
const BOOKS_LIMIT = 10;

export const useShelfList = () => {
  const { data, ...args } = useInfiniteQuery<
    IQueryResponse<IShelf>,
    Error,
    InfiniteData<IQueryResponse<IShelf>, number>,
    string[],
    number
  >({
    queryKey: ["shelf-list"],
    queryFn: async ({ pageParam }) => {
      const { data } = await $api.get("/book/BookShelfList/", {
        params: { limit: SHELF_LIMIT, offset: pageParam },
      });
      return data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      lastPage?.next ? lastPageParam + SHELF_LIMIT : undefined,
  });

  const shelves = data?.pages?.flatMap((p) => p.results ?? []) ?? [];
  return { shelves, data, ...args };
};

export const useShelfBooks = (shelfId: number) => {
  const { data, ...args } = useInfiniteQuery<
    IQueryResponse<IBook>,
    Error,
    InfiniteData<IQueryResponse<IBook>, number>,
    (string | number)[],
    number
  >({
    queryKey: ["shelf-books", shelfId],
    queryFn: async ({ pageParam }) => {
      const { data } = await $api.get(
        `/book/BookShelfItemList/${shelfId}/`,
        { params: { limit: BOOKS_LIMIT, offset: pageParam } },
      );
      return data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      lastPage?.next ? lastPageParam + BOOKS_LIMIT : undefined,
  });

  const books = data?.pages?.flatMap((p) => p.results ?? []) ?? [];
  return { books, data, ...args };
};
