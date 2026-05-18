import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";

import { commonQueryKeys } from "../constants";
import {
  getCountryList,
  ICountryListParams,
} from "../queries/get-country-list";
import type { ICountry } from "../types/country";
import type { IQueryResponse } from "../types/query-response";

const DEFAULT_LIMIT = 30;

type UseCountryListParamsType = Omit<ICountryListParams, "limit" | "offset"> & {
  limit?: number;
  enabled?: boolean;
};

export const useCountryList = ({
  limit = DEFAULT_LIMIT,
  enabled,
  ...filters
}: UseCountryListParamsType = {}) => {
  const { data, ...args } = useInfiniteQuery<
    IQueryResponse<ICountry>,
    Error,
    InfiniteData<IQueryResponse<ICountry>, number>,
    (string | UseCountryListParamsType)[],
    number
  >({
    queryKey: [commonQueryKeys.COUNTRY_LIST, { ...filters, limit }],
    queryFn: ({ pageParam }) =>
      getCountryList({ ...filters, limit, offset: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      lastPage?.next ? lastPageParam + limit : undefined,
    enabled,
  });

  const countries = data?.pages?.flatMap((page) => page?.results ?? []) ?? [];
  const totalCount = data?.pages?.[0]?.count ?? 0;

  return { countries, totalCount, data, ...args };
};
