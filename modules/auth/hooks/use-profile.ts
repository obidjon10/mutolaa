import { useQuery } from "@tanstack/react-query";

import { $api } from "@/lib";

import { IUser } from "../models";

export const useProfile = (enabled: boolean) =>
  useQuery({
    queryKey: ["profile"],
    queryFn: async (): Promise<IUser> => {
      const { data } = await $api.get<IUser>("/users/GetProfile/");
      return data;
    },
    enabled,
  });
