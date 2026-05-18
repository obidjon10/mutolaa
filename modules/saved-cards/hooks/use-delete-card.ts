import { useMutation, useQueryClient } from "@tanstack/react-query";

import { $api } from "@/lib";

import { paymentQueryKeys } from "../constants";

export const useDeleteCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (cardId: number) => {
      await $api.delete(`/payment/card/DeleteUserCard/${cardId}/`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [paymentQueryKeys.USER_CARDS],
      });
    },
  });
};
