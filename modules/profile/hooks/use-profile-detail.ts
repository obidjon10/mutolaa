import { useQuery } from "@tanstack/react-query";

import { $api } from "@/lib";

import { IUserDetail } from "../models";


export const useProfileDetail = (enabled: boolean) =>
  useQuery({
    queryKey: ["profile-detail"],
    queryFn: async (): Promise<IUserDetail> => {
      const { data } = await $api.get<IUserDetail>(
        "/web/users/MyProfileDetail/",
      );
      return data;
    },
    enabled,
  });
