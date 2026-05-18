import { useMutation } from "@tanstack/react-query";

import { $api } from "@/lib";

import { ICorporateLead } from "../models";

export const useCorporateLead = () =>
  useMutation({
    mutationFn: async (body: ICorporateLead) => {
      const { data } = await $api.post(
        "/web/common/CorporateLeadCreate/",
        body,
      );
      return data;
    },
  });
