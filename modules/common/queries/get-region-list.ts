import qs from "query-string";

import { $api } from "@/lib";

import type { IRegion } from "../types/region";

export interface IRegionListParams {
  parent?: number;
  is_region?: boolean;
  search?: string;
}

export const getRegionList = async (params: IRegionListParams = {}) => {
  const { data } = await $api.get<IRegion[]>(
    qs.stringifyUrl(
      { url: "/stats/web/RegionList/", query: params as qs.StringifiableRecord },
      { skipNull: true, skipEmptyString: true },
    ),
  );

  return data;
};
