import { useMutation, useQueryClient } from "@tanstack/react-query";

import { $api } from "@/lib";

import type { IBookOrderResponse, IPurchaseBookPayload } from "../models";

export const usePurchaseBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: IPurchaseBookPayload) => {
      const { data } = await $api.post<IBookOrderResponse>(
        "/payment/book-order/PurchaseBook/",
        payload,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["book-detail"] });
    },
  });
};
