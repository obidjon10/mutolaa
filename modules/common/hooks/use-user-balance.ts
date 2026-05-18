import { useQuery } from "@tanstack/react-query";

import { $api } from "@/lib";

import { commonQueryKeys } from "../constants";
import { IUserBalance } from "../types";

export const useUserBalance = () => {
  const { data, ...args } = useQuery<IUserBalance>({
    queryKey: [commonQueryKeys.USER_BALANCE],
    queryFn: async () => {
      const { data } = await $api.get("/users/GetBalance/");

      return data;
    },
  });

  return { userBalance: data, ...args };
};
