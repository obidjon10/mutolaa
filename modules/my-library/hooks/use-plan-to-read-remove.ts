import { useMutation, useQueryClient } from "@tanstack/react-query";

import { $api } from "@/lib";

export const usePlanToReadRemove = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookId: number) => {
      const { data } = await $api.delete(`/book/PlanToReadDelete/${bookId}/`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plan-to-read"] });
      queryClient.invalidateQueries({ queryKey: ["list-count"] });
    },
  });
};
