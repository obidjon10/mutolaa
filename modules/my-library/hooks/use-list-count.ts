import { useQuery } from "@tanstack/react-query";

import { $api } from "@/lib";

import { IListCount } from "../models";

export const useListCount = () => {
  const { data, ...args } = useQuery<IListCount>({
    queryKey: ["list-count"],
    queryFn: async () => {
      const { data } = await $api.get("/book/MutolaaxonamListCount/");
      return data;
    },
  });

  return { listCount: data, ...args };
};
