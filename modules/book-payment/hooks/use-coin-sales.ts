import { useQuery } from "@tanstack/react-query";

import type { ICoinSale } from "../models";

// TODO(backend): replace with real endpoint once available.
const MOCK_COIN_SALES: ICoinSale[] = [
  {
    id: 1,
    coin_amount: "100",
    discount_percentage: 10,
    is_active: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: 2,
    coin_amount: "200",
    discount_percentage: 20,
    is_active: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: 3,
    coin_amount: "300",
    discount_percentage: 30,
    is_active: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: 4,
    coin_amount: "400",
    discount_percentage: 40,
    is_active: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: 5,
    coin_amount: "500",
    discount_percentage: 50,
    is_active: true,
    created_at: "2026-01-01T00:00:00Z",
  },
];

export const useCoinSales = () => {
  const { data, ...args } = useQuery<ICoinSale[]>({
    queryKey: ["coin-sales"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return MOCK_COIN_SALES;
    },
    staleTime: Infinity,
  });

  return { coinSales: data ?? [], ...args };
};
