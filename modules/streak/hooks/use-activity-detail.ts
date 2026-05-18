import { useQuery } from "@tanstack/react-query";

import { $api } from "@/lib";

import { IActivityDetail } from "../models";

export const useActivityDetail = () => {
  const { data, ...args } = useQuery<IActivityDetail>({
    queryKey: ["activity-detail"],
    queryFn: async () => {
      const { data } = await $api.get(
        "/gamification/streak-activity/StreakActivityDetail/",
      );
      return data;
    },
  });

  return { activityDetail: data, ...args };
};
