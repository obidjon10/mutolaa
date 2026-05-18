import qs from "query-string";

import { $api } from "@/lib";

import { IDiscoverSectionListResponse } from "../models";

interface IDiscoverSectionListParams {
  search?: string;
  limit?: number;
  offset?: number;
}

export const getDiscoverSectionList =
  (params: IDiscoverSectionListParams = {}) =>
  async () => {
    const { data } = await $api.get<IDiscoverSectionListResponse>(
      qs.stringifyUrl(
        {
          url: "/web/home/DiscoverSectionList",
          query: params as qs.StringifiableRecord,
        },
        { skipNull: true, skipEmptyString: true },
      ),
    );

    return data;
  };
