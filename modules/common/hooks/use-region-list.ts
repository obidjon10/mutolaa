import { useQuery } from "@tanstack/react-query";

import { commonQueryKeys } from "../constants";
import { getRegionList, IRegionListParams } from "../queries/get-region-list";

type UseRegionListParamsType = IRegionListParams & {
  enabled?: boolean;
};

export const useRegionList = ({ enabled, ...params }: UseRegionListParamsType = {}) => {
  const { data, ...args } = useQuery({
    queryKey: [commonQueryKeys.REGION_LIST, params],
    queryFn: () => getRegionList(params),
    enabled,
  });

  return { regions: data ?? [], ...args };
};
