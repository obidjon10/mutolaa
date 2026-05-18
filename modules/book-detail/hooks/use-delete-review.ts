import { useMutation, useQueryClient } from "@tanstack/react-query";

import { $api } from "@/lib";

export const useDeleteReview = (bookId?: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number): Promise<void> => {
      await $api.delete(`/web/book/BookReviewDelete/${id}/`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["book-reviews", bookId] });
      queryClient.invalidateQueries({ queryKey: ["book-detail"] });
    },
  });
};
