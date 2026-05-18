"use client";

import { useFinishedBooks } from "../../hooks";

import { BookList } from "./book-list";

export const FinishedBook: React.FC = () => {
  const { books, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useFinishedBooks();

  return (
    <BookList
      list={books}
      isLoading={isLoading}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
    />
  );
};
