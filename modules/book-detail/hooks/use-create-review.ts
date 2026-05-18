import { useMutation, useQueryClient } from "@tanstack/react-query";

import { $api } from "@/lib";

import type { IReview } from "../models";

interface IPayload {
  book: number;
  rating: number;
  comment?: string;
}

export const useCreateReview = (bookId?: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: IPayload): Promise<IReview> => {
      const { data } = await $api.post<IReview>(
        "/web/book/BookReviewCreate/",
        params,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["book-reviews", bookId] });
      queryClient.invalidateQueries({ queryKey: ["book-detail"] });
    },
  });
};
