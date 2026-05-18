import { useQuery } from "@tanstack/react-query";

import { $api } from "@/lib";

import { IBookDetail } from "../models";

export const useBookDetail = (slug?: string) => {
  const { data, ...args } = useQuery<IBookDetail>({
    queryKey: ["book-detail", slug],
    queryFn: async () => {
      const { data } = await $api.get(`/web/book/BookDetail/${slug}`);

      return data;
    },
  });

  return { bookDetail: data, ...args };
};
