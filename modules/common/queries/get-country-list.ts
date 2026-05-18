import qs from "query-string";

import { $api } from "@/lib";

import type { ICountry } from "../types/country";
import type { IQueryResponse } from "../types/query-response";

export interface ICountryListParams {
  search?: string;
  offset?: number;
  limit?: number;
}

export const getCountryList = async (params: ICountryListParams = {}) => {
  const { data } = await $api.get<IQueryResponse<ICountry>>(
    qs.stringifyUrl(
      { url: "/common/CountryList/", query: params as qs.StringifiableRecord },
      { skipNull: true, skipEmptyString: true },
    ),
  );

  return data;
};
