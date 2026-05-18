import { useMutation } from "@tanstack/react-query";

import { $api } from "@/lib";

import { IPromoCodeResponse } from "../models";

export const useCheckPromoCode = () =>
  useMutation({
    mutationFn: async (params: { tariff: number; promo_code: string }) => {
      const { data } = await $api.post<IPromoCodeResponse>(
        "/payment/CheckPromoCodeV2/",
        params,
      );

      return data;
    },
  });
