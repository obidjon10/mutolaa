import { useMutation, useQueryClient } from "@tanstack/react-query";

import { $api } from "@/lib";

import type { IReview } from "../models";

interface IPayload {
  id: number;
  book: number;
  rating: number;
  comment?: string;
}

export const useUpdateReview = (bookId?: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...rest }: IPayload): Promise<IReview> => {
      const { data } = await $api.put<IReview>(
        `/web/book/BookReviewUpdate/${id}/`,
        rest,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["book-reviews", bookId] });
      queryClient.invalidateQueries({ queryKey: ["book-detail"] });
    },
  });
};
