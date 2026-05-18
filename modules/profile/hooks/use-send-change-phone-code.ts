import { useMutation } from "@tanstack/react-query";

import { $api } from "@/lib";
import { ISendCodeResponse } from "@/modules/auth";

export const useSendChangePhoneCode = () =>
  useMutation({
    mutationFn: async (params: { phone: string }): Promise<ISendCodeResponse> => {
      const { data } = await $api.post<ISendCodeResponse>(
        "/web/users/SendCodeForChangePhone/",
        params,
      );
      return data;
    },
  });
