import { useQuery } from "@tanstack/react-query";

import { $api } from "@/lib";

import { IMarketHeader } from "../models";

export const useMarketHeader = () => {
  const { data, ...args } = useQuery<IMarketHeader>({
    queryKey: ["market-header"],
    queryFn: async () => {
      const { data } = await $api.get("/marketplace/Header/");

      return data;
    },
  });

  return { marketHeader: data, ...args };
};
