import { useMutation, useQueryClient } from "@tanstack/react-query";

import { $api } from "@/lib";

import { ICreateOrderResponse, ISubscribePremiumResponse } from "../models";

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      tariff: number;
      provider: string;
      promo_code_text?: string;
    }) => {
      const { data } = await $api.post<ICreateOrderResponse>(
        "/payment/PremiumOrderCreateV2/",
        params,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};

export const useSubscribePremium = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      tariff: number;
      card: number;
      promo_code_text?: string;
    }) => {
      const { data } = await $api.post<ISubscribePremiumResponse>(
        "/payment/premium-subscription/SubscribePremium/",
        params,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};
