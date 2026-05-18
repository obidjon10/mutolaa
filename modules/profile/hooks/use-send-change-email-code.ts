import { useMutation } from "@tanstack/react-query";

import { $api } from "@/lib";
import { ISendCodeResponse } from "@/modules/auth";

export const useSendChangeEmailCode = () =>
  useMutation({
    mutationFn: async (params: { email: string }): Promise<ISendCodeResponse> => {
      const { data } = await $api.post<ISendCodeResponse>(
        "/web/users/SendCodeForChangeEmail/",
        params,
      );
      return data;
    },
  });
