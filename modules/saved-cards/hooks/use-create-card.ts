import { useMutation } from "@tanstack/react-query";

import { $api } from "@/lib";

import { ICreateCardResponse } from "../models";

export const useCreateCard = () =>
  useMutation({
    mutationFn: async (params: {
      card_number: string;
      expire_date: string;
    }) => {
      const { data } = await $api.post<ICreateCardResponse>(
        "/payment/card/CreateUserCard/",
        params,
      );
      return data;
    },
  });
