import { useQuery } from "@tanstack/react-query";

import { IBook, IQueryResponse } from "@/modules/common";

import { queryKeys } from "../constants";
import { getMostReadBooks } from "../queries/get-most-read-books";

export const useMostReadBooks = ({
  page,
  page_size,
}: {
  page?: number;
  page_size?: number;
} = {}) => {
  const { data, ...args } = useQuery<IQueryResponse<IBook>>({
    queryKey: [queryKeys.MOST_READ_BOOKS, { page, page_size }],
    queryFn: getMostReadBooks({ page, page_size }),
  });

  return { mostReadBooks: data, ...args };
};
