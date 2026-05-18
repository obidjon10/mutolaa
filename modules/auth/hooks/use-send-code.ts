import { useMutation } from "@tanstack/react-query";

import { $api, useAppDispatch } from "@/lib";

import { ISendCodeResponse } from "../models";
import { setMethod, setSession, setStep } from "../store";

export const useSendCode = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: async (params: {
      phone?: string;
      email?: string;
    }): Promise<ISendCodeResponse> => {
      const { data } = await $api.post<ISendCodeResponse>(
        "/web/users/SendAuthVerificationCode/",
        params,
      );

      return data;
    },
    onSuccess: (data, { email }) => {
      dispatch(setSession(data.session));
      dispatch(setMethod(email ? "email" : "phone"));
      dispatch(setStep("otp"));
    },
  });
};
