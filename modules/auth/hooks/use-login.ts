"use client";

import { useMutation } from "@tanstack/react-query";

import { $api } from "@/lib";

import { ILoginRequest, ILoginResponse } from "../models";

import { useAuth } from "./use-auth";

export const useLogin = () => {
  const { login } = useAuth();

  return useMutation({
    mutationFn: async (params: ILoginRequest): Promise<ILoginResponse> => {
      const { data } = await $api.post<ILoginResponse>(
        "/web/users/Login/",
        params,
      );
      return data;
    },
    onSuccess: (data) => {
      login({ access: data.access, refresh: data.refresh });
    },
  });
};
