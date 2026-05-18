"use client"

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { $api, useAppSelector } from "@/lib";

import { IUser } from "../models";

export const useUpdateProfile = () => {
  const { push } = useRouter();
  const incomingPage = useAppSelector(({ auth }) => auth.incomingPage);

  return useMutation({
    mutationFn: async (params: { full_name: string }): Promise<IUser> => {
      const { data } = await $api.patch<IUser>(
        "/web/users/UpdateProfile/",
        params,
      );

      return data;
    },
    onSuccess: () => {
      if (incomingPage) {
        push(incomingPage);
      } else window.location.href = "/";
    },
  });
};
