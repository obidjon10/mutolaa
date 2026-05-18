import { useQuery } from "@tanstack/react-query";

import { $api } from "@/lib";

import { paymentQueryKeys } from "../constants";
import { IUserCard } from "../models";

export const useCardList = () =>
  useQuery<IUserCard[]>({
    queryKey: [paymentQueryKeys.USER_CARDS],
    queryFn: async () => {
      const { data } = await $api.get<IUserCard[]>("/payment/card/List/");
      return data;
    },
  });
