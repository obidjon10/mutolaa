import { useMutation } from "@tanstack/react-query";

import { $api } from "@/lib";

import type {
  IBookOrderCreatePayload,
  IBookOrderResponse,
} from "../models";

export const useBookOrderCreate = () =>
  useMutation({
    mutationFn: async (payload: IBookOrderCreatePayload) => {
      const { data } = await $api.post<IBookOrderResponse>(
        "/payment/book-order/BookOrderCreate/",
        payload,
      );
      return data;
    },
  });
