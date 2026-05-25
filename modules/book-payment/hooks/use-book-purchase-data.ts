import { useQuery } from "@tanstack/react-query";

import { $api } from "@/lib";

import type { IBookPurchaseData } from "../models";

export const bookPurchaseDataQueryKey = (slug?: string) =>
  ["book-purchase-data", slug] as const;

export const useBookPurchaseData = (slug?: string) => {
  const { data, ...args } = useQuery<IBookPurchaseData>({
    queryKey: bookPurchaseDataQueryKey(slug),
    queryFn: async () => {
      const { data } = await $api.get(`/web/book/BookPurchaseData/${slug}/`);
      return data;
    },
    enabled: !!slug,
  });

  return { purchaseData: data, ...args };
};
