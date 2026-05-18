import { useMutation, useQueryClient } from "@tanstack/react-query";

import { $api } from "@/lib";

export const usePlanToReadCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookId: number) => {
      const { data } = await $api.post("/book/PlanToReadCreate/", {
        book: bookId,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plan-to-read"] });
      queryClient.invalidateQueries({ queryKey: ["list-count"] });
    },
  });
};
