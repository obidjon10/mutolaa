import { useMutation, useQueryClient } from "@tanstack/react-query";

import { $api } from "@/lib";

import { paymentQueryKeys } from "../constants";
import { IVerifyCardResponse } from "../models";

export const useVerifyCard = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (params: {
      user_card_id: number;
      verification_code: string;
    }) => {
      const { data } = await $api.post<IVerifyCardResponse>(
        "/payment/card/VerifyUserCard/",
        params,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [paymentQueryKeys.USER_CARDS],
      });
    },
  });
};
