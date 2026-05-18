"use client";

import { usePlanToReadList } from "../../hooks";

import { BookList } from "./book-list";

export const PlanToRead: React.FC = () => {
  const { planToRead, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    usePlanToReadList();

  return (
    <BookList
      list={planToRead}
      isLoading={isLoading}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
    />
  );
};
