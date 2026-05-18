import { useQuery } from "@tanstack/react-query";

import { $api } from "@/lib";

import { IHeader } from "../models";

export const useHeader = () => {
  const { data, ...args } = useQuery<IHeader>({
    queryKey: ["header-data"],
    queryFn: async () => {
      const { data } = await $api.get("/web/home/HeaderData/");
      return data;
    },
  });

  return { headerData: data, ...args };
};
